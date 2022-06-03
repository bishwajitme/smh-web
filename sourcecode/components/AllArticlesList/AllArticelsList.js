import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleList from './../ArticleList/ArticleList.js';
import styles from './AllArticlesList.less';

class AllArticlesList extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onStoreChange);
    ArticleActions.fetchByType(this.props.type);
  }

  componentWillReceiveProps (nextProps) {
    ArticleActions.fetchByType(nextProps.type);
    this.setState(this.getState(nextProps));
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const type = props.type;
    return {
      articles: ArticleStore.getByType(type),
    };
  }

  render () {
    const articles = this.state.articles;

    if (!articles) {
      return false;
    }

    const sorting = this.props.sorting;

    let sortedArticles = articles;

    // if (sorting === 'date') {
    //   sortedArticles = articles.sortBy(article => article.get('date'));
    // } else if (sorting === 'alfa') {
    //   sortedArticles = articles.sortBy(article => article.get('title'));
    // }

    return (
      <div className={styles.base}>
        <ArticleList articles={sortedArticles}
                     context='articleListPage'
                     type={this.props.type}/>
      </div>
    );
  }
}

AllArticlesList.propTypes = {
  sorting: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default AllArticlesList;
