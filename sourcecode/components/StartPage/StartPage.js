import React from 'react';
import PageStore from '../../stores/PageStore';
import PageActions from '../../actions/PageActions';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import LinkRow from '../LinkRow/LinkRow.js';
import HeroBlock from '../HeroBlock/HeroBlock.js';
import ImageCarousel from '../ImageCarousel/ImageCarousel.js';
import LatestNewsList from '../LatestNewsList/LatestNewsList.js';
import BlockLinks from '../BlockLinks/BlockLinks.js';
import InterviewsRow from '../InterviewsRow/InterviewsRow.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './StartPage.less';

class StartPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    PageStore.addListener('change', this.onStoreChange);
    PageActions.fetchBySlug('start');

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    PageStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    //const props = this.props;
    this.setState(this.getState());
  }

  getState () {
    return {
      startPage: PageStore.getBySlug('start'),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const startPage = this.state.startPage;
    const options = this.state.options;

    if (!startPage || !startPage.size) {
      return false;
    }

    //Check if options exists to continue with meta tag rendering
    //startPage already checked
    if ( options.size > 0 ) {
      updateMeta(startPage, options);
    }

    const carouselImages = startPage.getIn(['acf', 'images']);

    const heroContent = startPage.get('acf').filter((val, key, item) => {
      if (/^hero_/.test(key)) {
        return item;
      }
    });


    const linkRowLinks = this.state.startPage.getIn(['acf', 'link_row']);

    const interviewsContent = startPage.get('acf').filter((val, key, item) => {
      if (/^article_row/.test(key)) {
        return item;
      }
    });

    const blockLinks = startPage.getIn(['acf', 'block_link']);

    return (
      <div className={styles.base}>

        <div className={styles.LinkRow}>
          <LinkRow links={linkRowLinks}/>
        </div>

        <div className={styles.HeroBlock}>
          <HeroBlock content={heroContent}/>
        </div>

        <div className={styles.LatestNewsList}>
          <LatestNewsList />
        </div>
        <div className={styles.BlockLinks}>
          <BlockLinks content={blockLinks}/>
        </div>
        <div id="home_interview_row" className={styles.InterviewsRow}>
          <InterviewsRow content={interviewsContent}/>
        </div>
      </div>
    );
  }
}

StartPage.propTypes = {
  params: React.PropTypes.object,
  'params.slug': React.PropTypes.string,
};

export default StartPage;
