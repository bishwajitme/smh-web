import React from 'react';
import PageStore from '../../stores/PageStore';
import Page404 from '../Page404/Page404.js';
import PageActions from '../../actions/PageActions.js';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import createMarkup from '../../utils/createMarkup.js';
import ImageCarousel from '../ImageCarousel/ImageCarousel.js';
import ArticleContent from '../ArticleContent/ArticleContent.js';
import ArticleSidebar from '../ArticleSidebar/ArticleSidebar.js';
import SpecialPage from '../SpecialPage/SpecialPage.js';
import ListPage from '../ListPage/ListPage.js';
import Submenu from '../Submenu/Submenu.js';
import SocialShare from '../SocialShare/SocialShare.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './Page.less';

class Page extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    const slug = this.props.location.pathname.replace('/', '');
    PageStore.addListener('change', this.onStoreChange);
    PageActions.fetchBySlug(slug);

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    PageStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  componentWillReceiveProps (nextProps) {
    const slug = nextProps.location.pathname.replace('/', '');
    PageActions.fetchBySlug(slug);
    this.setState(this.getState(nextProps));
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const slug = props.location.pathname.replace('/', '');
    return {
      page: PageStore.getBySlug(slug),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const page = this.state.page;
    const options = this.state.options;
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (!page || !options) {
      return false;
    }

    if (page === '404') {
      return (
        <Page404 {...this.props}/>
      );
    }

    if ( page.getIn(['acf', 'is_hidden']) && isLoggedIn === 'false' ) {
      return (
        <p className={styles.hidden}>This page is hidden, please <a href="/wp-login.php">login</a> to view this page.</p>
      );
    }

    //Check if options exists to continue with meta tag rendering
    //page already checked
    if ( options.size > 0 ) {
      updateMeta(page, options);
    }

    const pageID = page.get('ID');
    const title = createMarkup(page.get('title'));


    // If page is of category special or list
    const pageCategories = page.getIn(['terms', 'category']);
    if (pageCategories && !!pageCategories.find(cat => cat.get('slug') === 'specialsida')) {
      return <SpecialPage page={page} />;
    } else if (pageCategories && !!pageCategories.find(cat => cat.get('slug') === 'listsida')) {
      return <ListPage page={page} />;
    }

    // else render normally
    const sidebarContent = page.get('acf').filter((val, key) => {
      if (/^article_sidebar_/.test(key)) {
        return val;
      }
    });

    const carouselImages = page.getIn(['acf', 'images']);
    const isFullWidth = page.getIn(['acf', 'full_width_page']);


    return (
      <div className={styles.base}>
        <header className={`${styles.header} ${isFullWidth ? styles.isFullWidth : ''}`}>
          {carouselImages ? <ImageCarousel images={carouselImages}/> : false}
          <h1 dangerouslySetInnerHTML={title}></h1>
        </header>
        <aside className={styles.aside}>
          <Submenu parent={pageID} />
          <ArticleSidebar pageID={pageID} content={sidebarContent}/>
        </aside>
        <section className={styles.content}>
          <ArticleContent content={page}/>
          <SocialShare title={'Dela sidan:'} />
        </section>
      </div>
    );
  }
}

Page.propTypes = {
  location: React.PropTypes.object,
  'location.pathname': React.PropTypes.string,
};

export default Page;
