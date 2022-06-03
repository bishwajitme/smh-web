import React from 'react';
import createKeyFrom from '../../utils/createKeyFrom.js';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import LinkButton from '../LinkButton/LinkButton.js';
import styles from './HeroBlockLinks.less';

class HeroBlockLinks extends React.Component {

  render () {
    const links = this.props.links.map((link) => {
      const key = createKeyFrom(link.get('link_name'));
      const linkProps = {};
      linkProps.text = link.get('link_name');
      const type = link.get('acf_fc_layout');

      if (type === 'external_link') {
        linkProps.to = link.get('link_target');
        linkProps.type = 'external';
      } else if (type === 'internal_link') {
        linkProps.to = getSlugFromURL(link.get('link_target')) || '';
        linkProps.type = 'internal';
      } else if (type === 'document_link') {
        linkProps.to = link.get('link_target').first().get('post_name');
        linkProps.type = 'document';
      } else if (type === 'anchor_link') {
        linkProps.to = getSlugFromURL(link.get('link_target')) || '';
        linkProps.type = 'anchor';
      }

      return (
        <span
          key={key}
          className={styles.link}
          >
          <LinkButton {...linkProps} />
        </span>
      );
    }).toArray();

    return (
      <div className={styles.wrap}>
        {links}
      </div>
    );
  }
}

HeroBlockLinks.propTypes = {
  links: React.PropTypes.object,
};

export default HeroBlockLinks;
