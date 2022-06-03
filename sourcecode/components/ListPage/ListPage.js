import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import ArticleCardList from '../ArticleCardList/ArticleCardList';
import ContactCardList from '../ContactCardList/ContactCardList';
import styles from './ListPage.less';

class ListPage extends React.Component {

  render () {
    const {page} = this.props;
    const title = createMarkup(page.get('title'));
    const preamble = createMarkup(page.getIn(['acf', 'card_list_preamble']));
    const listType = page.getIn(['acf', 'card_list_type']);

    let list;
    if (listType === 'articles') {
      const articles = page.getIn(['acf', 'card_list_articles']);
      list = <ArticleCardList articles={articles} />;
    } else if (listType === 'contacts') {
      const contacts = page.getIn(['acf', 'card_list_contacts']);
      list = <ContactCardList contacts={contacts}/>
    }

    return (
      <div className={styles.base}>
        <header className={styles.header}>
          <h1 dangerouslySetInnerHTML={title}></h1>
          <p className={styles.preamble} dangerouslySetInnerHTML={preamble}></p>
        </header>
        <section className={styles.content}>
          {list}
        </section>
      </div>
    );
  }
}

ListPage.propTypes = {
  page: React.PropTypes.object,
};

export default ListPage;
