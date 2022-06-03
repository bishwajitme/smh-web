import React from 'react';
import {Link} from 'react-router';
import styles from './CookieBanner.less';

class CookieBanner extends React.Component {
  render() {
    return (
      <div className={styles.base} ref='banner'>
        <div className={styles.inner}>
          <p>
            På den här hemsidan använder vi cookies för att din upplevelse av webbplatsen ska bli så bra som möjligt. Genom att godkänna accepterar du att cookies används enligt vår policy.
          </p>
          <div className={styles.btnContainer}>
            <Link to='/cookie-policy' className={styles.read}>Läs mer</Link>
            <button id={'cookie-consent'} onClick={this.props.onClick} className={styles.ok}>
              Tillåt cookies
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CookieBanner.propTypes = {
  onClick: React.PropTypes.func,
};

export default CookieBanner;
