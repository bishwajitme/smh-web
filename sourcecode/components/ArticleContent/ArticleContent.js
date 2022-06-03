import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import ArticleContentLinks from '../ArticleContentLinks/ArticleContentLinks.js';
import wrapVideo from '../../utils/wrapVideo.js';
import styles from './ArticleContent.less';

class ArticleContent extends React.Component {

  render () {
    const articleContent = this.props.content;

    if (!articleContent.size) {
      return false;
    }

    const content = createMarkup(articleContent.getIn(
      ['acf', 'article_content'])
    );

    if (content.__html) {
      content.__html = wrapVideo(content.__html);
    }

    const links = articleContent.getIn(['acf', 'article_content_links']) || {};

    return (
      <article className={styles.base}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={content}></div>
        </div>
        <ArticleContentLinks links={links}/>
      </article>
    );
  }
}

ArticleContent.propTypes = {
  content: React.PropTypes.object,
};

export default ArticleContent;
