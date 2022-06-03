import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import styles from './ArticleContentLinks.less';

class ArticleContentLinks extends React.Component {

  render () {
    if (!this.props.links.size) {
      return false;
    }

    const links = this.props.links.map((link, index) => {
      const name = link.get('link_name');
      const type = link.get('acf_fc_layout');

      if (type === 'external_link' || type === 'document_link') {
        const URL = link.get('link_target');
        return (<li key={index} className={styles['link--' + type]}>
          <a href={URL} target='_blank'>
            {name}
            <span className={styles.icon}></span>
          </a>
        </li>);
      } else if (type === 'internal_link') {
        const target = link.get('link_target');
        const URL = getSlugFromURL(target);
        return (<li key={index} className={styles['link--' + type]}>
          <Link to={URL}>{name}</Link>
        </li>);
      }
    }).toArray();

    return (
      <ul className={styles.base}>
        {links}
      </ul>
    );
  }
}

ArticleContentLinks.propTypes = {
  links: React.PropTypes.object,
};

export default ArticleContentLinks;
