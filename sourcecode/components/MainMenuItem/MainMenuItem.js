import React from 'react';
import {Link} from 'react-router';
import styles from './MainMenuItem.less';

import decodeHTML from "../../utils/decodeHTML"

class MenuItem extends React.Component {


  render() {
    const URI = this.props.slug;
    const label = this.props.title;

    const linkProps = {
      to: URI,
      className: styles.link,
      activeClassName: styles.linkActive,
    };

    return (
      <li className={styles.base}>
        <Link {...linkProps} onClick={this.props.onClick}>
          <span>{decodeHTML(label)}</span>
        </Link>
      </li>
    );
  }
}

MenuItem.propTypes = {
  description: React.PropTypes.string,
  onClick: React.PropTypes.func,
  slug: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default MenuItem;
