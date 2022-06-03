import React from 'react';
import SearchActions from '../../actions/SearchActions.js';
import SearchStore from '../../stores/SearchStore.js';
import encodeURL from '../../utils/encodeURL.js';
import styles from './NativeSelect.less';

class NativeSelect extends React.Component {

  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.onSearchStoreChange = this.onSearchStoreChange.bind(this);
  }

  componentDidMount () {
    SearchStore.addListener('change', this.onSearchStoreChange);
    const selected = SearchStore.getFilter(this.props.type) || {};
    this.refs.select.value = selected.value || '';
  }

  componentWillUnmount () {
    SearchStore.removeListener('change', this.onSearchStoreChange);
  }

  onSearchStoreChange () {
    const selected = SearchStore.getFilter(this.props.type) || {};
    this.refs.select.value = selected.value || '';
  }

  setFilter (e) {
    const title = e.target.value || '';
    SearchActions.setFilter(this.props.type, {
      title: title,
      value: encodeURL(title),
    });
  }

  render() {
    const label = this.props.label;
    const items = this.props.list.map(item => {
      const title = item.get('title');
      const slug = encodeURL(title);
      return (<option
        key={slug}
        value={slug}
        >{title}</option>);
    });

    let defaultText = 'Välj ' + this.props.label;
    // if(this.props.label == 'utbildningstyp'){
    //   defaultText = "YH-utbildning";
    // }

    return (
      <div className={styles.base}>
        <span className={styles.icon}></span>
        <select className={styles.select}
                onChange={this.setFilter}
                ref='select'>
          <option value=''>{defaultText}</option>
          {items}
        </select>
      </div>
    );
  }

}

NativeSelect.propTypes = {
  label: React.PropTypes.string, //What should be in the default option value
  list: React.PropTypes.object, //The list of values
  type: React.PropTypes.string,//"establishment" & 'location' for SearchStore
};

export default NativeSelect;
