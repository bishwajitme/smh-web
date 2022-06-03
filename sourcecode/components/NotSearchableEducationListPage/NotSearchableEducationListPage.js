import React from 'react';
import EducationStore from '../../stores/EducationStore';
import EducationActions from '../../actions/EducationActions';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import PageStore from '../../stores/PageStore';
import PageActions from '../../actions/PageActions.js';
import SearchActions from '../../actions/SearchActions.js';
import EducationList from './../EducationList/EducationList.js';
import NoHits from '../NoHits/NoHits.js';
import Immutable from 'immutable';
import getQueryParams from '../../utils/getQueryParams.js';
import decodeURL from '../../utils/decodeURL.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './NotSearchableEducationListPage.less';

class NotSearchEducationListPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    EducationStore.addListener('change', this.onStoreChange);
    EducationActions.fetchIndex();
    this.handleQueryParams();

    const slug = this.props.location.pathname.replace('/', '');
    PageStore.addListener('change', this.onStoreChange);
    PageActions.fetchBySlug(slug);

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    EducationStore.removeListener('change', this.onStoreChange);
    PageStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  handleQueryParams () {
    const queryParams = Immutable.fromJS(getQueryParams());
    if (queryParams.size) {
      queryParams.map((val, key) => {
        const title = decodeURL(val);
        SearchActions.setFilter(key, {
          title: title,
          value: val,
        });
      });
    } else {
      SearchActions.resetFilters();
    }
  }

  componentWillReceiveProps (newProps) {
    this.handleQueryParams();
    this.setState(this.getState(newProps));

    if (this.props.location.pathname !== newProps.location.pathname) {

    }
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const slug = props.location.pathname.replace('/', '');
    return {
      educations: EducationStore.getFiltered(),
      page: PageStore.getBySlug(slug),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const educations = this.state.educations;
    const page = this.state.page;
    const options = this.state.options;

    if (!educations) {
      return false;
    }

    //Check if options & page exists to continue with meta tag rendering
    if ( options.size > 0 && page ) {
      updateMeta( page, options );
    }

    const lists = this.state.educations.map((list, type) => {

      list = list.filter((item) => {
        const status = item.getIn(['acf', 'status']);
        return status === 'notSearchable';
      });

      if (list.size) {
        return <EducationList key={type} educations={list}/>;
      }
    }).filter(l => l);

    return (
      <div className={styles.base}>
        <div className={styles.heading}>
          <h1>Ej sökbara utbildningar</h1>
        </div>
        <div className={styles.lists}>
          {(lists.size) ? false : <NoHits />}
          {lists.toArray()}
        </div>
      </div>
    );
  }
}

NotSearchEducationListPage.propTypes = {
  location: React.PropTypes.object,
  'location.pathname': React.PropTypes.object,
};

export default NotSearchEducationListPage;
