import React from 'react';
import ForeignSelect from './ForeignSelect.js';
import NativeSelect from './NativeSelect.js';
import styles from './SelectDropDown.less';
import isMobileBrowser from '../../utils/isMobileBrowser.js';

//Should determine which of these to render to screen
//isMobile? -> render NativeSelect

class SelectDropDown extends React.Component {

  constructor (props) {
    super(props);
  }

  checkRender(props) {
    if ( isMobileBrowser() ) {
      return (
        <NativeSelect className={styles.nativeContainer}
          label={props.label}
          list={props.list}
          type={props.type}
        />
      );
    } else {
      return (
        <ForeignSelect
          label={props.label}
          list={props.list}
          type={props.type}
        />
      );
    }
  }

  render () {
    const element = this.checkRender(this.props);
    return (
      <div className={styles.base}>
        {element}
      </div>
    );
  }
}

SelectDropDown.propTypes = {
  label: React.PropTypes.string, //What should be in the default option value
  list: React.PropTypes.object, //The list of values
  type: React.PropTypes.string,//"establishment" & 'location' for SearchStore
};

export default SelectDropDown;
