import React from 'react';
import PageStore from '../../stores/PageStore';
import PageActions from '../../actions/PageActions.js';
import OptionsStore from '../../stores/OptionsStore.js';
import OptionsActions from '../../actions/OptionsActions.js';
import Submenu from '../Submenu/Submenu.js';
import Signup from '../Signup/Signup.js';
import updateMeta from '../../utils/updateMeta.js';
import styles from './SignupPage.less';

class SignupPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount () {
    const slug = this.props.location.pathname;
    PageStore.addListener('change', this.onStoreChange);
    PageActions.fetchBySlug(slug);

    OptionsStore.addListener('change', this.onStoreChange);
    OptionsActions.fetchOptions();
  }

  componentWillUnmount () {
    PageStore.removeListener('change', this.onStoreChange);
    OptionsStore.removeListener('change', this.onStoreChange);
  }

  onStoreChange () {
    const props = this.props;
    this.setState(this.getState(props));
  }

  getState (props) {
    const slug = props.location.pathname;
    return {
      page: PageStore.getBySlug(slug),
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    const page = this.state.page;
    const options = this.state.options;

    if (!page) {
      return false;
    }

    if ( options.size > 0 ) {
      updateMeta( page, options );
    }

    const pageID = page.get('ID');
    const title = page.get('title');

    //const heroContent = page.get('acf').filter((val, key, item) => {
    //  if (/^hero_/.test(key)) {
    //    return item;
    //  }
    //});
    const signupContent = page.get('acf').filter((val, key, item) => {
      if (/^signup_/.test(key)) {
        return item;
      }
    });

    return (
      <div className={styles.base}>
        <div className={styles.submenu}>
          <Submenu parent={pageID} parentName={title}/>
        </div>
        <div className={styles.signup}>
          <Signup content={signupContent}/>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  location: React.PropTypes.object,
  'location.pathname': React.PropTypes.string,
  route: React.PropTypes.object,
};

export default SignupPage;
