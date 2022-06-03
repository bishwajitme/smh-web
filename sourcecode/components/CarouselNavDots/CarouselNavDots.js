import React from 'react';
import styles from './CarouselNavDots.less';
import classNames from 'classnames/bind';

class CarouselNavDots extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const cx = classNames.bind(styles);

    const link = this.props.images.map((item, i) => {

      const activeStyle = cx({
        active: this.props.current === i,
      });

      return (
        <a href='#'
           className={activeStyle}
           title={item.get('text')}
           key={i}
           data-index={i}
           onClick={this.props.onClick}></a>
      );
    });

    return (
      <div className={styles.base}>
        {link}
      </div>
    );

  }
}

CarouselNavDots.propTypes = {
  current: React.PropTypes.number,
  images: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export default CarouselNavDots;
