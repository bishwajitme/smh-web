import React from 'react';
import {Link} from 'react-router';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import createMarkup from '../../utils/createMarkup.js';
import styles from './ContactCard.less';

class ContactCard extends React.Component {
  render () {
    const content = this.props.content;
    const name = content.get('card_contact_name');
    const title = content.get('card_contact_title');
    const phone = content.get('card_contact_phone');
    const email = content.get('card_contact_email');
    const image = {
      backgroundImage: 'url(' + content.getIn(
        ['card_contact_image', 'sizes', 'medium']
      ) + ')',
    };

    return (
      <article className={styles.base}>
        <div className={styles.image} style={image}></div>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.heading}>{name}</h1>
          </header>
          <p className={styles.title}>{title}</p>
          <a href={`tel:${phone}`} className={styles.phone}>{phone}</a>
          <a href={`mailto:${email}`} className={styles.email}>{email}</a>
        </div>
      </article>
    );
  }
}

ContactCard.propTypes = {
  content: React.PropTypes.object
};

export default ContactCard;
