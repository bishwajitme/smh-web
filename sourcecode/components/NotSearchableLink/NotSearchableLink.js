import React from 'react';
import LinkButton from '../LinkButton/LinkButton';
import styles from './NotSearchableLink.less';
// import classNames from 'classnames/bind';

class NotSearchableLink extends React.Component {

  render() {
    return (
      <section className={styles.base}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Ej sökbara utbildningar</h1>
          <p className={styles.text}>Går du redan en av våra utbildningar? Här finns information om ej sökbara utbildningar.</p>
          <LinkButton type={'internal'} to={'/ej-sokbara'} text={'Ej sökbara utbildningar'} />
        </div>
      </section>
    );
  }
}

NotSearchableLink.propTypes = {
  text: React.PropTypes.string,
  to: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default NotSearchableLink;
