import React from 'react';
import styles from './Page404.less';

class Page404 extends React.Component {

  render () {
    return (
      <section className={styles.base}>
        <div className={styles.box}>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.text}>
            Vi kunde inte hitta sidan "/{this.props.routeParams.splat}"
          </p>
          <p className={styles.text}>
          Sidan du eftersökte hittades inte. Kontrollera att du har angivit rätt adress i adressfältet.
          </p>
        </div>
      </section>
    );
  }
}

Page404.propTypes = {
  params: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  'routeParams.splat': React.PropTypes.string,
};

export default Page404;
