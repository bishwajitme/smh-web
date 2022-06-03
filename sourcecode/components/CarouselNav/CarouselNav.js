import React from 'react';
import styles from './CarouselNav.less';

class CarouselNav extends React.Component {
  render () {
    return (
      <div className={styles.base}>
          <a href='#' className={styles.prev} onClick={this.props.onPrev}>
            <span className={styles.iconLeft}></span>
          </a>
          <a href='#' className={styles.next} onClick={this.props.onNext}>
            <span className={styles.iconRight}></span>
          </a>
      </div>
    );
  }
}

CarouselNav.propTypes = {
  onNext: React.PropTypes.func,
  onPrev: React.PropTypes.func,
};

export default CarouselNav;
