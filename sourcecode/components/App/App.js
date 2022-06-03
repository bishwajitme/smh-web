import dataLayer from '../dataLayer/dataLayer.js';
import React from 'react';
import SiteHeader from './../SiteHeader/SiteHeader.js';
import SiteFooter from './../SiteFooter/SiteFooter.js';
import CookieBanner from './../CookieBanner/CookieBanner.js';
import {getCookie, setCookie} from './../../utils/cookieCheck';
import styles from './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBanner: getCookie()
    };
    this.onCookieConsent = this.onCookieConsent.bind(this);
  }

  onCookieConsent () {
    this.setState({showBanner: false});
    dataLayer.push({event: 'gtm:cookie-consent'});
    setCookie();
  }

  componentDidMount() {
    //TagManagerEvent
    dataLayer.push({event: 'gtm:app-load'});
  }

  componentDidUpdate() {
    //TagManagerEvent
    dataLayer.push({event: 'gtm:app-update'});
  }

  render() {
    return (
      <div className={styles.base}>
        {this.state.showBanner ? <CookieBanner onClick={() => this.onCookieConsent()} /> : false}
        <div className={`${styles.page} ${this.state.showBanner ? styles.bannerVisible : ''}`}>
          <SiteHeader/>
          {this.props.children}
          <SiteFooter/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
