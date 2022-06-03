import React from 'react';
import OptionsActions from '../../actions/OptionsActions.js';
import OptionsStore from '../../stores/OptionsStore.js';
import SignupForm from '../SignupForm/SignupForm.js';
import SignupBadge from '../SignupBadge/SignupBadge.js';
import styles from './Signup.less';

class Signup extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
    this.onOptionsStoreChange = this.onOptionsStoreChange.bind(this);
  }

  componentDidMount () {
    OptionsActions.fetchOptions();
    OptionsStore.addListener('change', this.onOptionsStoreChange);
  }

  componentWillUnmount () {
    OptionsStore.removeListener('change', this.onOptionsStoreChange);
  }

  onOptionsStoreChange () {
    this.setState(this.getState());
  }

  getState () {
    return {
      options: OptionsStore.getOptions(),
    };
  }

  render () {
    //const title = this.props.content.get('signup_title');
    //const body = this.props.content.get('signup_body') || '';

    const options = this.state.options;

    if (!options) {
      return false;
    }

    const heading = options.get('form_heading');
    const text = options.get('form_text');
    const badgeText = options.get('form_badge');

    return (
      <div className={styles.base} id='intresseanmalan'>
        <div className={styles.badge}>
          <SignupBadge text={badgeText} />
        </div>
        <div className={styles.background}>
          <section className={styles.section}>
            <header className={styles.header}>
              <h1 className={styles.title}>{heading}</h1>
              <p className={styles.text}>{text}</p>
            </header>
            <div className={styles.form}>
              <SignupForm formOptions={options} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  content: React.PropTypes.object,
};

export default Signup;
