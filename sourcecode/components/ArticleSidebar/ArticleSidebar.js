import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleList from '../ArticleList/ArticleList.js';
import ArticleSidebarLinks from '../ArticleSidebarLinks/ArticleSidebarLinks.js';
import styles from './ArticleSidebar.less';

class ArticleSidebar extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onArticleStoreChange = this.onArticleStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onArticleStoreChange);
    ArticleActions.fetchIndex();
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onArticleStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.getState(nextProps));
  }

  onArticleStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const list = props.content.get('article_sidebar_article_list') || [];
    return {
      articles: ArticleStore.getFromList(list),
    };
  }

  render () {
    const content = this.props.content;

    if (!content.size) {
      return false;
    }

    let title = content.get('article_sidebar_heading');
    title = (title) ? (<h1 className={styles.heading}>{title}</h1>) : '';
    const articles = this.state.articles;
    const links = content.get('article_sidebar_links');

    return (
      <div className={styles.base}>
        {title}
        <div className={styles.articleList}>
          <ArticleList articles={articles} context='articleSidebar'/>
        </div>
        <div>
          <ArticleSidebarLinks links={links} />
        </div>
      </div>
    );
  }
}

ArticleSidebar.propTypes = {
  content: React.PropTypes.object,
};

export default ArticleSidebar;
