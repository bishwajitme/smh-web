import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import styles from './SubmenuItem.less';

class SubmenuItem extends React.Component {

  render () {
    const pageLink = this.props.page;
    if (!pageLink.size) {
      return false;
    }

    const title = pageLink.get('title');

    const linkProps = {
      to: getSlugFromURL(pageLink.get('url')),
      className: styles.link,
      activeClassName: styles.linkActive,
    };

    return (
      <li className={styles.item}>
        <Link {...linkProps}>{title}</Link>
      </li>
    );
  }
}

SubmenuItem.propTypes = {
  page: React.PropTypes.object,
};

export default SubmenuItem;
