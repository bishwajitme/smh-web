import React from 'react';
import {Link} from 'react-router';
import styles from './SiteID.less';
import config from 'webpack-config-loader!conf';

class SiteID extends React.Component {

  render () {
    return (
      <Link to='/' className={styles.base}>
        <img
          className={styles.logo}
          src={config.hostname + config.assetsPath + config.logo.srcMain}
          alt={config.logo.alt}/>
      </Link>
    );
  }
}

SiteID.propTypes = {
  slug: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default SiteID;
