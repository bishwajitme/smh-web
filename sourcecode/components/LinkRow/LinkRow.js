import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import styles from './LinkRow.less';

class LinkRow extends React.Component {

  render () {
    const links = this.props.links.map((link, index) => {
      const type = link.get('acf_fc_layout');
      const name = link.get('link_name');
      const color = link.get('link_color');
      const target = link.get('link_target');

      if (type === 'external_link') {
        return (<a
          key={index}
          href={target}
          className={styles.link}
          target='_blank'
          data-link-color={color}>{name}</a>);
      } else if (type === 'internal_link') {
        const URI = getSlugFromURL(target) || '';
        return (
          <Link
            key={index}
            to={URI}
            className={styles.link}
            data-link-color={color}>
            {name}
          </Link>
        );
      }
    }).toArray();

    return (
      <section className={styles.base}>
        {links}
      </section>
    );
  }
}

LinkRow.propTypes = {
  links: React.PropTypes.object,
};

export default LinkRow;
