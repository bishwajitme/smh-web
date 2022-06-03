import React from 'react';
import {Link} from 'react-router';
import styles from './SubmenuRoot.less';
import getSlugFromUrl from '../../utils/getSlugFromURL';

class SubmenuRoot extends React.Component {

  render () {
    const root = this.props.root;
    const name = root.get('title');

    const linkProps = {
      to: getSlugFromUrl(root.get('url')),
      className: styles.link,
      activeClassName: styles.linkActive,
    };

    return (
      <Link {...linkProps}>{name}</Link>
    );
  }
}

SubmenuRoot.propTypes = {
  root: React.PropTypes.object,
};

export default SubmenuRoot;
