import React, { Component, PropTypes } from 'react';
import { ShareButtons } from 'react-share';
import * as Icons from '../../utils/svgIcons';
import styles from './SocialShare.less';

class SocialShare extends Component {
  render () {
    const shareTitle = this.props.title || '';
    const url = window.location.href;
    const title = document.title || 'EC Utbildning';
    const { FacebookShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      EmailShareButton,
    } = ShareButtons;

    
    console.log('url --> ', url);

    return (
      <div className={`${styles.base} ${styles[this.props.color]}`}>
        {
          shareTitle ? <p className={styles.shareTitle}>{shareTitle}</p> : null
        }
        <div className={styles.wrap}>
          <FacebookShareButton quote={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.facebook}`}>
              {Icons.facebook}
            </div>
          </FacebookShareButton>
          <TwitterShareButton title={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.twitter}`}>
              {Icons.twitter}
            </div>
          </TwitterShareButton>
          <LinkedinShareButton title={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.linkedin}`}>
              {Icons.linkedin}
            </div>
          </LinkedinShareButton>
          <EmailShareButton subject={title} body={url} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.mail}`}>
              {Icons.mail}
            </div>
          </EmailShareButton>
        </div>
      </div>
    );
  }
}

SocialShare.propTypes = {
  color: PropTypes.string,
};

export default SocialShare;
