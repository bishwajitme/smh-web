import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleCardList.less';
import ArticleActions from '../../actions/ArticleActions';
import ArticleStore from '../../stores/ArticleStore';

class ArticleCardList extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    ArticleStore.addListener('change', this.onStoreChange);
    ArticleActions.fetchIndex();
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.getState(nextProps));
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    return {
      articles: ArticleStore.getFromList(props.articles),
    };
  }

  render () {
    const {articles} = this.state;

    const listItems = articles.map((item, key) => {
      return (<li className={styles.listItem} key={key}>
        <ArticleCard content={item} />
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

ArticleCardList.propTypes = {
  articles: React.PropTypes.object,
};

export default ArticleCardList;
