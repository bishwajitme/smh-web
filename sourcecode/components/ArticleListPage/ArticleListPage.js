import React, { Component, PropTypes } from 'react';
import getSlugFromURL from '../../utils/getSlugFromURL.js';
import PageStore from '../../stores/PageStore.js';
import PageActions from '../../actions/PageActions.js';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import AllArticlesList from '../AllArticlesList/AllArticelsList.js';
import BlockLinks from './../BlockLinks/BlockLinks.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './ArticleListPage.less';

class ArticleListPage extends Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    PageStore.addListener('change', this.onStoreChange);
    PageActions.fetchBySlug(this.props.route.name);

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    PageStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    PageActions.fetchBySlug(nextProps.route.name);
    this.setState(this.getState(nextProps));
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const type = props.route.name;
    return {
      page: PageStore.getBySlug(type),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const page = this.state.page;
    const options = this.state.options;

    if (!page) {
      return <div></div>;
    }

    if ( options.size > 0 ) {
      updateMeta( page, options );
    }

    const title = page.get('title');
    const blockLinksContent = page.getIn(['acf', 'block_link']) || {};
    const sorting = page.getIn(['acf', 'sorting']) || '';

    const url = window.location.href;
    const contentClasss = getSlugFromURL(url);
    let contentClass = contentClasss.substring(1);
  if(contentClass==''){
     contentClass = 'homepage';
  }
  contentClass = 'con_cls_'+ contentClass;

    return (
      <div id={contentClass} className={styles.base}>
        <header className={styles.header}>
          <h1 className={styles.heading}>{title}</h1>
        </header>
        <section className={styles.list}>
          <AllArticlesList type={this.props.route.type}
                           context='articleListPage'
                           sorting={sorting}/>
        </section>
        <aside className={styles.aside}>
          <BlockLinks content={blockLinksContent}/>
        </aside>
      </div>
    );
  }
}

ArticleListPage.propTypes = {
  route: React.PropTypes.object,
  'route.type': React.PropTypes.string,
  'route.wp_slug': React.PropTypes.string,
};

export default ArticleListPage;
