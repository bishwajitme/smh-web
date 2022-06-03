import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import styles from './BlockLinks.less';
import classNames from 'classnames/bind';

class BlockLinks extends React.Component {

  render () {

    const cx = classNames.bind(styles);

    const internalLinkStyle = cx('link', 'internal');
    const externalLinkStyle = cx('link', 'external');

    const blocks = this.props.content;

    if (!blocks.size) {
      return false;
    }

    //Map props
    const block = blocks.map((item, index) => {
      //Cache
      const linkText = item.get('link_text');
      const bgImg = item.get('bg_image');
      const link = getSlugFromURL(item.get('link_url'));
      const layoutOption = item.get('acf_fc_layout');

      //Create inline style
      const bgImgStyle = {
        backgroundImage: 'url(' + bgImg + ')',
      };

      const blockLink = (layoutOption === 'external_link') ?
        (
          <a href={link}
             style={bgImgStyle}
             className={externalLinkStyle}>
            <span className={styles.linkText}>{linkText}</span>
          </a>
        )
        : (
        <Link to={link}
              style={bgImgStyle}
              className={internalLinkStyle}>
          <span className={styles.linkText}>{linkText}</span>
        </Link>
      );

      return (
        <div className={styles.block} key={index}>
          {blockLink}
        </div>
      );
    }).toArray();

    return (
      <div className={styles.base}>
        {block}
      </div>
    );
  }
}

BlockLinks.propTypes = {
  content: React.PropTypes.object,
};

export default BlockLinks;
