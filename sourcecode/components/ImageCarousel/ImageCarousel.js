import React from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';
import CarouselNav from './../CarouselNav/CarouselNav.js';
import CarouselNavDots from './../CarouselNavDots/CarouselNavDots.js';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import styles from './ImageCarousel.less';

class ImageCarousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 0,
    };

    this.handleTransition = this.handleTransition.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.slideTo = this.slideTo.bind(this);
  }

  handleTransition() {
    this.setState({current: this.refs.ReactSwipe.swipe.getPos()});
  }

  prev(e) {
    e.preventDefault();
    this.refs.ReactSwipe.swipe.prev();
  }

  next(e) {
    e.preventDefault();
    this.refs.ReactSwipe.swipe.next();
  }

  slideTo(e) {
    e.preventDefault();
    const index = Number(e.target.getAttribute('data-index'));
    this.refs.ReactSwipe.swipe.slide(index, 300);
  }

  render() {
    const isMobile = window.innerWidth <= 500 || window.innerHeight <= 500;
    const {images} = this.props;

    const itemsHasText = images.filter(item => item.get('text')).size;

    const items = images.map((item, i) => {
      const image = item.get('image');
      const video = item.get('video');
      const text = item.get('text');
      const link = getSlugFromURL(item.get('link'));

      const inline = {backgroundImage: 'url(' + image + ')'};

      if (video && !isMobile) {
        return (
          <div key={i} className={itemsHasText ? styles.itemsHasText : ''}>
            <div className={styles.videoContainer}>
              <video poster={image} muted autoPlay loop>
                <source src={video} type="video/mp4"/>
              </video>
            </div>
            {link ? <Link to={link} className={styles.link}>
                <div>
                  <h2>{text}</h2>
                </div>
              </Link> :
              <span className={styles.link}>
                <div>
                  <h2>{text}</h2>
                </div>
              </span>
            }
          </div>
        );
      }

      return (
        <div key={i} className={itemsHasText ? styles.itemsHasText : ''}>
          {link ? <Link to={link} className={styles.link}>
              <div style={inline}>
                <h2>{text}</h2>
              </div>
            </Link> :
            <span className={styles.link}>
                <div style={inline}>
                  <h2>{text}</h2>
                </div>
              </span>
          }
        </div>
      );
    });

    return (
      <div className={styles.base}>
        {(this.props.images.size > 1) ?
          <div>
            <ReactSwipe className={styles.swipeReact}
                        callback={this.handleTransition}
                        ref='ReactSwipe'>
              {items}
            </ReactSwipe>
            <CarouselNav onNext={this.next} onPrev={this.prev}/>
            <CarouselNavDots images={this.props.images}
                             onClick={this.slideTo}
                             current={this.state.current}/>
          </div> :
          <div className={styles.singleImage}>
            {items}
          </div>
        }
      </div>
    );
  }
}

ImageCarousel.propTypes = {
  images: React.PropTypes.object,
};

export default ImageCarousel;
