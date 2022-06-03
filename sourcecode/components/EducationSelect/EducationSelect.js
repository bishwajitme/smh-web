import React from 'react';
import FormEducationStore from '../../stores/FormEducationStore';
import FormEducationActions from '../../actions/FormEducationActions';
import FormActions from '../../actions/FormActions.js';
import createKeyFrom from '../../utils/createKeyFrom.js';
import decodeHTML from '../../utils/decodeHTML.js';
import getKeyDown from '../../utils/getKeyDown.js';
import EducationSelectBox from '../Form/EducationSelectBox.js';
import Immutable from 'immutable';
import styles from './EducationSelect.less';
import classNames from 'classnames/bind';

class EducationSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.getState();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    FormActions.setInput(this.props.name, '', false);
    FormEducationStore.addListener('change', this.onStoreChange);
    FormEducationActions.fetchIndex();
  }

  componentWillUnmount () {
    FormEducationStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    this.setState(this.getState());
  }

  getState () {
    //Fetch data before creating the state object
    //Other parts of the object depend on this data to be able to run
    const educations = FormEducationStore.getAll();

    //Create state
    return {
      educations: educations,
      checkboxes: this.createArray(educations),
      selected: 0,
      valid: '',
      message: false,
      open: false,
    };
  }

  createArray (data) { //Refactor to store?
    let index = -1;
    //Iterates over all educations and then checks each location
    //Ex. Business Intelligence + Göteborg & Business Intelligence + Örebro
    //Returns an immutable list with all unique combinations. EX:
    //{key: <string>, checked: <bool>, selected: <bool>, label: <string>}
    return data.reduce((collection, item) => {
      const educationTitle = decodeHTML(item.get('Name'));
      const educationId = item.get('Id');
      const locations = item.get('Locations');

      return collection.concat(locations.map((location) => {
        const locationTitle = location.get('Name');
        const locationId = location.get('Id');
        index++;
        if (this.state) {
          this.state.total = index;
        }
        return Immutable.fromJS({
          key: createKeyFrom(educationTitle + locationTitle),
          checked: false,
          index: index,
          education: educationId,
          location: locationId,
          educationTitle: educationTitle,
          locationTitle: locationTitle,
          label: educationTitle + ' (' + locationTitle + ')',
        });
      }));//End concat + map
    }, Immutable.List());//End reduce
  }

  validate () {
    this.setState({message: false});
    const Enquiries = [];

    this.state.checkboxes.filter((item) => {
      return item.get('checked');
    }).map((item) => {
      Enquiries.push({
        EducationId: item.get('education'),
        LocationId: item.get('location'),
      });
    });

    const valid = !!Enquiries.length;
    const message = valid ? false : 'Minst en utbildning måste väljas';
    this.setState({valid, message});
    FormActions.setInput('Enquiries', Enquiries, valid);
  }

  removeMessage () {
    this.setState({message: false});
  }

  toggleCheck (index) {
    const checkbox = this.state.checkboxes.get(index);
    const value = checkbox.get('checked');
    const toggled = checkbox.set('checked', !value);
    const _checkboxes = this.state.checkboxes.setIn([index], toggled);
    this.setState({checkboxes: _checkboxes});
  }

  handleClick (e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({open: !this.state.open});
  }

  handleKeys (e) {
    const key = getKeyDown(e);

    if (key === 'up' || key === 'down') {
      e.preventDefault();
      if (key === 'down' && this.state.selected < this.state.total) {
        this.setState({selected: this.state.selected + 1});
      }
      if (key === 'up' && this.state.selected > 0) {
        this.setState({selected: this.state.selected - 1});
      }
    }

    if (key === 'enter') {
      if (!this.state.open) {
        this.setState({open: !this.state.open});
      } else {
        const selected = this.state.selected;
        this.toggleCheck(selected);
      }
    }
  }

  render () {
    if (!this.state.educations.size) {
      return false;
    }

    const numberChecked = this.state.checkboxes.filter((item) => {
      return item.get('checked');
    }).size;
    const message = this.state.message;
    const validationMessage = this.props.validationMessage;

    let topLevelLabel = 'Välj Utbildningar';
    if (numberChecked === 1) {
      topLevelLabel = `${numberChecked} utbildning vald`;
    } else if (numberChecked > 1) {
      topLevelLabel = `${numberChecked} utbildningar valda`;
    }

    const cx = classNames.bind(styles);

    const toggleBarStyles = cx({
      toggle: true,
      open: this.state.open === true,
      closed: this.state.open === false,
      valid: this.state.valid === true,
      invalid: this.state.valid === false,
    });

    const listStyles = cx({
      list: true,
      open: this.state.open === true,
      closed: this.state.open === false,
    });

    return (
      <div className={styles.base}
           onKeyDown={(e) => this.handleKeys(e)}
           onBlur={() => this.validate()}
           onFocus={() => this.removeMessage()}
           onClick={() => this.removeMessage()}
           tabIndex='0'>
        {(message === true)
          ? <span className={styles.validationMessage}
                  onClick={() => {
                    this.handleClick();
                    this.removeMessage();
                  }}>
              {validationMessage}
            </span>
          : ''}
        <div className={toggleBarStyles}
             onClick={(e) => this.handleClick(e)}>
          {topLevelLabel}
        </div>
        <div className={listStyles}
             data-gtm='education-select'>
          {this.state.checkboxes.map((item) => {
            return (
              <EducationSelectBox
                key={item.get('key')}
                label={item.get('label')}
                education={item.get('educationTitle')}
                location={item.get('locationTitle')}
                checked={item.get('checked')}
                selected={(item.get('index') === this.state.selected)}
                onClick={() => this.toggleCheck(item.get('index'))}/>
            );
          })}
        </div>
      </div>
    );
  }
}

EducationSelect.propTypes = {
  name: React.PropTypes.string,
  setEducations: React.PropTypes.func,
  validationMessage: React.PropTypes.string,
};

export default EducationSelect;
