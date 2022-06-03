import React from 'react';
import {Link} from 'react-router';
import SearchStore from '../../stores/SearchStore.js';
import encodeURL from '../../utils/encodeURL.js';
import styles from './SearchButton.less';

class SearchButton extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    SearchStore.addListener('change', this.onStoreChange);
  }

  componentWillUnmount () {
    SearchStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    this.setState(this.getState());
  }

  getState () {
    return {
      params: SearchStore.getFilters(),
    };
  }

  render () {
    const params = this.state.params;

    const query = {};
    const establishment = params.get('utbildningstyp');
    query.utbildningstyp = (establishment) ? establishment.value : '';
    const location = params.get('studieort');
    query.studieort = (location) ? encodeURL(location.title) : null;

    const linkProps = {
      id: 'search-button',
      to: '/utbildningar',
      query: query,
    };

    return (
      <Link className={styles.base} {...linkProps}>Sök</Link>
    );
  }
}

SearchButton.propTypes = {
};

export default SearchButton;
