import React from 'react';
import SearchStore from '../../stores/SearchStore.js';
import ResetSearchButton from '../ResetSearchButton/ResetSearchButton.js';
import styles from './NoHits.less';

class NoHits extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState();
  }

  componentWillReceiveProps () {
    this.setState(this.getState());
  }

  getState () {
    return {
      filter: SearchStore.getFilters(),
    };
  }

  render () {
    const filter = this.state.filter;

    if (!filter.size) {
      return false;
    }

    const establishment = filter.get('utbildningstyp');
    const establishmentText = (establishment)
      ? <span className={styles.emph}>
      {establishment.title.toLowerCase()}ar
    </span>
      : ' utbildningar';

    const location = filter.get('studieort');
    const locationText = (location)
      ? <span>i <span className={styles.emph}>{location.title}</span></span>
      : '';

    return (
      <div className={styles.base}>
        <p className={styles.text}>
          Hittade inga {establishmentText} {locationText}
        </p>
        <ResetSearchButton />
      </div>
    );
  }
}
export default NoHits;
