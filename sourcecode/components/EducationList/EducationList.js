import React from 'react';
import SearchStore from '../../stores/SearchStore.js';
import EducationCard from '../EducationCard/EducationCard.js';
import Immutable from 'immutable';
import getQueryParams from '../../utils/getQueryParams.js';
import decodeURL from '../../utils/decodeURL.js';
import styles from './EducationList.less';

class EducationsList extends React.Component {

  getLocation () {
    return SearchStore.getFilters('studieort');
  }

  shouldComponentUpdate (nextProps) {
    return !Immutable.is(nextProps.educations, this.props.educations);
  }

  render () {
    let educations = this.props.educations;
    const listTitle = educations.first()
      .getIn(['acf', 'meta_establishment'])
      .first()
      .get('post_title');


    const locationState = decodeURL(getQueryParams().studieort);
    const location = (locationState)
      ? `i ${locationState}`
      : '';

    educations = educations.map((item) => {
      return (
        <li key={item.get('ID')}>
          <EducationCard content={item}/>
        </li>
      );
    }).toArray();

    return (
      <div>
        <h2 className={styles.header}>{listTitle}ar {location}</h2>
        <ul className={styles.list}>
          {educations}
        </ul>
      </div>
    );
  }
}

EducationsList.propTypes = {
  educations: React.PropTypes.object,
};

export default EducationsList;
