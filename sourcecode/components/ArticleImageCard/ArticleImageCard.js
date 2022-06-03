import React from 'react';
import styles from './ArticleImageCard.less';

class ArticleImageCard extends React.Component {

  render () {
    const image = {
      backgroundImage: 'url(' + this.props.source + ')',
    };
    return (
      <div className={styles.base} style={image}></div>
    );
  }
}

ArticleImageCard.propTypes = {
  source: React.PropTypes.string,
};

export default ArticleImageCard;
