import React from 'react';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions.js';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import ImageCarousel from '../ImageCarousel/ImageCarousel.js';
import ArticleContent from '../ArticleContent/ArticleContent.js';
import ArticleSidebar from '../ArticleSidebar/ArticleSidebar.js';
import createMarkup from '../../utils/createMarkup.js';
import Submenu from '../Submenu/Submenu.js';
import SocialShare from '../SocialShare/SocialShare.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './ArticlePage.less';

class ArticlePage extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    const slug = this.props.routeParams.slug;
    ArticleStore.addListener('change', this.onStoreChange);
    ArticleActions.fetchBySlug(slug);

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    ArticleStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    ArticleActions.fetchBySlug(nextProps.routeParams.slug);
    this.setState(this.getState(nextProps));
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const slug = props.routeParams.slug;
    return {
      article: ArticleStore.getBySlug(slug),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const article = this.state.article;
    const options = this.state.options;

    if (!article) {
      return false;
    }

    //Check if options exists to continue with meta tag rendering
    //article already checked
    if ( options.size > 0 ) {
      updateMeta(article, options);
    }

    const articleID = article.get('ID');
    const title = createMarkup(article.get('title'));
    const sidebarContent = article.get('acf').filter((val, key) => {
      if (/^article_sidebar_/.test(key)) {
        return val;
      }
    });

    const carouselImages = article.getIn(['acf', 'images']);
    const isFullWidth = article.getIn(['acf', 'full_width_page']);

    return (
      <div className={styles.base}>
        <header className={`${styles.header} ${isFullWidth ? styles.isFullWidth : ''}`}>
          {carouselImages ? <ImageCarousel images={carouselImages}/> : false}
          <h1 dangerouslySetInnerHTML={title}></h1>
        </header>
        <section className={styles.content}>
          <ArticleContent content={article}/>
          <SocialShare title={'Dela sidan:'} />
        </section>
        <aside className={styles.aside}>
          <Submenu parent={articleID}/>
          <ArticleSidebar content={sidebarContent}/>
        </aside>
      </div>
    );
  }
}

ArticlePage.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.object,
  'route.type': React.PropTypes.string,
  routeParams: React.PropTypes.object,
  'routeParams.slug': React.PropTypes.string,
};

export default ArticlePage;
