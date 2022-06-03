import React from 'react';
import styles from './EducationMeta.less';
import classNames from 'classnames/bind';

class EducationMeta extends React.Component {

  render () {
    const meta = this.props.meta;
    const context = this.props.context || '';
    let locations = meta.get('meta_location');
    locations = (locations) ? locations.reduce((memo, location) => {
      const name = location.get('post_title');
      const separator = (memo) ? ', ' : '';
      return memo + separator + name;
    }, '') : '';

    let educationType = meta.get('meta_establishment') || [];
    educationType = (context === 'page')
      ? educationType.first().get('post_title')
      : '';

    const educationDeadline = meta.get('meta_deadline') || '';
    const educationStart = meta.get('meta_start_date') || '';
    const educationScope = meta.get('meta_scope');
    const educationPoints = meta.get('meta_points');
    const educationVacancies = meta.get('meta_vacancies');

    const cx = classNames.bind(styles);

    const baseStyles = cx({
      base: true,
      context: context,
    });

    const listStyles = cx({
      listItem: true,
      context: context,
    });

    //const listStyles = cx('listItem', 'context');

    return (
      <ul className={baseStyles}>

        {educationType ?
          <li className={listStyles}>
            <div className={styles.title}>
              <div className={styles.heading}>Utbildningstyp:</div>
            </div>
            <div className={styles.info}>{educationType}</div>
          </li> : ''}

        {locations.length ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <span>Studieort: </span>
            </div>
            <div className={styles.info}>{locations}</div>
          </li> : ''}

        {educationDeadline ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <div className={styles.heading}>Sista ansökningsdag:</div>
            </div>
            <div className={styles.info}>{educationDeadline}</div>
          </li> : ''}


        {educationStart ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <span>Utbildningsstart: </span>
            </div>
            <div className={styles.info}>{educationStart}</div>
          </li> : ''}

        {educationScope ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <span>Omfattning: </span>
            </div>
            <div className={styles.info}>{educationScope}</div>
          </li> : ''}

        {educationPoints ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <span>YH-poäng: </span>
            </div>
            <div className={styles.info}>{educationPoints}</div>
          </li> : ''}

        {educationVacancies ?
          <li className={styles.listItem}>
            <div className={styles.title}>
              <span>Antal platser: </span>
            </div>
            <div className={styles.info}>{educationVacancies}</div>
          </li> : ''}
      </ul>
    );
  }
}

EducationMeta.propTypes = {
  context: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export default EducationMeta;
