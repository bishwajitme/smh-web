import React from 'react';
import ArticleCard from '../ArticleCard/ArticleCard.js';
import ArticleImageCard from '../ArticleImageCard/ArticleImageCard.js';
import styles from './ArticleRow.less';

class ArticleRow extends React.Component {

  render () {
    const context = this.props.context;
    const articles = this.props.articles.map((article) => {
      return (
        <li key={article.get('slug')} className={styles.listItem}>
          <ArticleCard content={article}/>
        </li>
      );
    }).toArray();

    //Add images to articleCards list
    const images = this.props.images.map(image => {
      const src = image.getIn(
        ['image', 'sizes', 'card-placeholder']
      );

      return (
        <li key={src} className={styles.listItemImage}>
          <ArticleImageCard source={src}/>
        </li>
      );
    });

    return (
      <ul className={styles.base} data-context={context}>
        {articles}
        {images}
      </ul>
    );
  }
}

ArticleRow.propTypes = {
  articles: React.PropTypes.object,
  context: React.PropTypes.string,
  images: React.PropTypes.array,
};

export default ArticleRow;
