import React from 'react';
import ArticleCard from '../ArticleCard/ArticleCard.js';
import styles from './ArticleList.less';

class ArticleListCards extends React.Component {

  render () {
    const articles = this.props.articles;
    if (!articles) {
      return false;
    }

    const context = this.props.context;
    const articleCards = articles.map((article) => {
      return (
        <li key={article.get('slug')} className={styles.listItem}>
          <ArticleCard content={article}/>
        </li>
      );
    }).toArray();

    return (
      <ul className={styles.base} data-context={context}>
        {articleCards}
      </ul>
    );
  }
}

ArticleListCards.propTypes = {
  articles: React.PropTypes.object,
  context: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default ArticleListCards;
