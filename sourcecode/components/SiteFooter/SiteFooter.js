import React from 'react';
import {Link} from 'react-router';
import config from 'webpack-config-loader!conf';
import OptionsStore from '../../stores/OptionsStore';
import OptionsActions from '../../actions/OptionsActions.js';
import styles from './SiteFooter.less';

class SiteFooter extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState();
    this.onOptionsStoreChange = this.onOptionsStoreChange.bind(this);
  }

  componentDidMount () {
    OptionsStore.addListener('change', this.onOptionsStoreChange);
    OptionsActions.fetchOptions();
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
    const options = this.state.options;

    if (!options.size) {
      return false;
    }

    const email = this.state.options.get('epostadress');
    const phone = this.state.options.get('telefonnummer');
    const fax = this.state.options.get('faxnummer');
    const information = this.state.options.get('information');

    const facebookURL = this.state.options.get('facebook_url');
    const linkedinURL = this.state.options.get('linkedin_url');

    return (
      <footer className={styles.base}>
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <img src={config.hostname + config.assetsPath + config.logo.srcMono}
                 alt={config.logo.alt}/>
          </div>
          <div className={styles.info}>
            <h3>Kort om {config.sitename}</h3>

            <p>{information}</p>
            <p>
              <Link to={config.aboutLink}>
                Läs mer om {config.sitename}
              </Link>
              <br/>
              <Link to='/cookie-policy'>Cookie policy</Link>
            </p>
          </div>
          <div className={styles.contact}>
            <h3>Kontakt</h3>

            {phone ? <p>Växel: <a href={'tel:' + phone}>{phone}</a></p>  : false}

            {fax ? <p>Fax: {fax}</p> : false}

            {email ? <p>E-post: <a href={'mailto:' + email}>{email}</a></p> : false}

            <div className={styles.socialIcons}>
              <a href={facebookURL}
                 title={'Gå till ' + facebookURL}
                 className={styles.facebook} target="_blank">
              </a>
              <a href={linkedinURL}
                 title={'Gå till ' + linkedinURL}
                 className={styles.linkedIn} target="_blank">
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

SiteFooter.propTypes = {
  params: React.PropTypes.object,
};

export default SiteFooter;
