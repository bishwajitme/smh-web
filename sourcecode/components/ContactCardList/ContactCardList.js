import React from 'react';
import ContactCard from '../ContactCard/ContactCard';
import styles from './ContactCardList.less';

class ContactCardList extends React.Component {

  render () {
    const {contacts} = this.props;

    const listItems = contacts.map((item, key) => {
      return (<li className={styles.listItem} key={key}>
        <ContactCard content={item} />
      </li>)
    }).toArray();

    return (
      <div className={styles.base}>
        <section className={styles.content}>
          <ul className={styles.list} data-context={'listPageList'}>
            {listItems}
          </ul>
        </section>
      </div>
    );
  }
}

ContactCardList.propTypes = {
  contacts: React.PropTypes.object,
};

export default ContactCardList;
