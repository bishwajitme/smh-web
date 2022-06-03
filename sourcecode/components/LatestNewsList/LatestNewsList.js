import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleList from './../ArticleList/ArticleList.js';
import {Link} from 'react-router';
import styles from './LatestNewsList.less';

class LatestNewsList extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onStoreChange);
    ArticleActions.fetchByTypeAndTakeSome('nyheter', 3);
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState () {
    return {
      articles: ArticleStore.getByType('nyheter'),
    };
  }

  render () {
    const articles = this.state.articles.take(3);

    return (
       <section className={styles.base}>
         <header className={styles.header}>
           <h1 className={styles.heading}>Senaste nyheterna</h1>
           <Link to='/nyheter' className={styles.link}>
             Se alla nyheter
           </Link>
         </header>
         <ArticleList articles={articles}
                      context='latestNewsList'
                      className={styles.articleContainer}/>
       </section>
     );


    //const articlesByType = this.state.articlesByType;
    //if (!articlesByType) {
    //  return false;
    //}

    //const quantity = this.props.quantity || '';
    //
    //const articles = articlesByType.map((article) => {
    //  return article.get('ID');
    //}).take(quantity).toArray();
    //
    //return (
    //  <section>
    //    <header className={styles.header}>
    //      <h1 className={styles.heading}>Nyheter</h1>
    //      <Link to='/nyheter' className={styles.link}>Se alla nyheter</Link>
    //    </header>
    //    <ArticleList articles={articles}/>
    //  </section>
    //);
  }
}

LatestNewsList.propTypes = {};

export default LatestNewsList;
