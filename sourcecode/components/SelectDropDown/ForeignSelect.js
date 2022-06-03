import React from 'react';
import ReactDOM from 'react-dom';
import SearchActions from '../../actions/SearchActions.js';
import SearchStore from '../../stores/SearchStore.js';
import encodeURL from '../../utils/encodeURL.js';
import decodeURL from '../../utils/decodeURL.js';
import getKeyDown from '../../utils/getKeyDown.js';
import styles from './ForeignSelect.less';
import classNames from 'classnames/bind';

class ForeignSelect extends React.Component {

  constructor (props) {
    super(props);
    const selected = SearchStore.getFilter(this.props.type) || {title: ''};
    this.state = {
      isOpen: false,
      selected: selected.title,
    };

    this.setFilter = this.setFilter.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.onSearchStoreChange = this.onSearchStoreChange.bind(this);
  }

  componentDidMount () {
    SearchStore.addListener('change', this.onSearchStoreChange);
    document.addEventListener('click', this.handleBlur);
  }

  componentWillUnmount () {
    SearchStore.removeListener('change', this.onSearchStoreChange);
    document.removeEventListener('click', this.handleBlur);
  }

  onSearchStoreChange () {
    const selected = SearchStore.getFilter(this.props.type) || {title: ''};
    this.setState({selected: selected.title});
  }

  getActiveCSSClass () {
    const ul = ReactDOM.findDOMNode(this.refs.base).children[1].children;
    const active = [].filter.call(ul, function (item) {
      return item.classList.contains(styles.active);
    });
    return active[0];
  }

  handleKeys (e) {
    const keyDown = getKeyDown(e);

    if (keyDown === 'up' || keyDown === 'down' || keyDown === 'enter') {

      if (!this.state.isOpen) {
        this.toggleOpen();
      }

      const active = this.getActiveCSSClass();
      e.preventDefault(); //Don't scroll page while open

      if (keyDown === 'up') {
        if (active.previousSibling) {
          active.classList.remove(styles.active);
          active.previousSibling.classList.add(styles.active);
        }
      }

      if (keyDown === 'down') {
        if (active.nextSibling) {
          active.classList.remove(styles.active);
          active.nextSibling.classList.add(styles.active);
        }
      }

      if (keyDown === 'enter') {
        this.setState({
          selected: active.getAttribute('data-title') || '',
        });

        this.toggleOpen();

        const title = active.getAttribute('data-title') || '';
        this.setFilter(title);
      }
    }

    if (keyDown === 'tab') {
      this.setState({isOpen: false});
    }
  }

  toggleOpen () {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleBlur (e) {
    if (ReactDOM.findDOMNode(this).contains(e.target) || !this.state.isOpen) {
      return;
    }
    this.setState({isOpen: false});
  }

  handleSelection (e) {
    const title = e.target.getAttribute('data-title') || '';
    this.setState({selected: title || ''});
    this.setFilter(title);
    this.toggleOpen();
  }

  setFilter (title) {
    SearchActions.setFilter(this.props.type, {
      title: title,
      value: encodeURL(title),
    });
  }

  render () {
    let currentFilter = SearchStore.getFilter(this.props.type);
    currentFilter = (currentFilter) ? decodeURL(currentFilter.value) : '';

    let defaultText = 'Välj ' + this.props.label;
    // if(this.props.label == 'utbildningstyp'){
    //   defaultText = "YH-utbildning";
    // }

    const cx = classNames.bind(styles);

    const items = this.props.list.map((item) => {
      const title = item.get('title');
      const activeListStyle = cx({ active: currentFilter === title });
      return (
        <li
          key={title}
          data-title={title}
          onClick={this.handleSelection}
          className={activeListStyle}
          >
          {title}
        </li>
      );
    });

    const baseStyles = cx({
      base: true,
      open: this.state.isOpen === true,
      closed: this.state.isOpen === false,
    });


    const activeListStyle = cx({ active: this.state.selected === '' });

    return (
      <div className={baseStyles} ref='base'>
        <div tabIndex='0'
             onFocus={this.toggleOpen}
             onKeyDown={this.handleKeys}
             className={styles.selectBox}
          >
          {this.state.selected ? this.state.selected : defaultText}
          <span className={styles.icon}></span>
        </div>
        <ul>
          <li data-title=''
              onClick={this.handleSelection}
              className={activeListStyle}
            >{defaultText}</li>
          {items}
        </ul>
      </div>
    );
  }

}

ForeignSelect.propTypes = {
  label: React.PropTypes.string, //What should be in the default option value
  list: React.PropTypes.object, //The list of values
  type: React.PropTypes.string,//"establishment" & 'location' for SearchStore
};

export default ForeignSelect;
