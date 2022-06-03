import React from 'react';
import EducationStore from '../../stores/EducationStore';
import EducationActions from '../../actions/EducationActions';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import HeroBlock from '../HeroBlock/HeroBlock.js';
import EducationContent from '../EducationContent/EducationContent.js';
import EducationMeta from '../EducationMeta/EducationMeta.js';
import EducationTabs from '../EducationTabs/EducationTabs.js';
import EducationDocument from '../EducationDocument/EducationDocument.js';
import EducationArticleRow from '../EducationArticleRow/EducationArticleRow.js';
import Signup from '../Signup/Signup.js';
import SocialShare from '../SocialShare/SocialShare.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './EducationPage.less';

class EducationPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    EducationStore.addListener('change', this.onStoreChange);
    EducationActions.fetchIndex();

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    EducationStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  componentWillReceiveProps (props) {
    this.setState(this.getState(props));
    EducationActions.fetchIndex();
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const slug = props.routeParams.slug;
    return {
      education: EducationStore.getBySlug(slug),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const education = this.state.education;
    const options = this.state.options;

    if (!education) {
      return false;
    }

    //Check if options exists to continue with meta tag rendering
    //education already checked
    if ( options.size > 0 ) {
      updateMeta(education, options);
    }

    //const heroTag = education.getIn(['acf', 'meta_establishment'])
    //  .first().get('post_title');
    const heroContent = education.get('acf').filter((val, key, item) => {
      if (/^hero_/.test(key)) {
        return item;
      }
    });

    const metaContent = education.get('acf').filter((val, key, item) => {
      if (/^meta_/.test(key)) {
        return item;
      }
    });

    const articleRowContent = education.get('acf').filter((val, key, item) => {
      if (/^article_row/.test(key)) {
        return item;
      }
    });

    const documentContent = education.get('acf').filter((val, key, item) => {
      if (/^education_document/.test(key)) {
        return item;
      }
    });

    const tabs = education.getIn(['acf', 'education_info_tabs']);
    const tabsContent = (tabs && tabs !== '0') ? tabs : {};

    const signupContent = education.get('acf').filter((val, key, item) => {
      if (/^signup_/.test(key)) {
        return item;
      }
    });

    return (
      <div className={styles.base}>
        <div className={styles.heroBlock}>
          <HeroBlock content={heroContent}/>
        </div>
        <div className={styles.content}>
          <EducationContent content={education} />
        </div>
        <div className={styles.sidebar}>
          <div className={styles.meta}>
            <EducationMeta meta={metaContent} context='page' />
          </div>
          <SocialShare />
        </div>
        <div className={styles.tabs}>
          <EducationTabs tabs={tabsContent} />
        </div>
        <div className={styles.document}>
          <EducationDocument content={documentContent} />
        </div>
        <div className={styles.articleRow}>
          <EducationArticleRow content={articleRowContent}/>
        </div>
        <div className={styles.signup}>
          <Signup content={signupContent}/>
        </div>
      </div>
    );
  }
}

EducationPage.propTypes = {
  routeParams: React.PropTypes.object,
  'routeParams.slug': React.PropTypes.string,
};

export default EducationPage;
