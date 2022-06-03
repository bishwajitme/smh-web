import React from 'react';
import styles from './SignupBadge.less';

class SignupBadge extends React.Component {

  render () {
    const text = this.props.text || '';

    return (
      <div className={styles.base}>
        <p className={styles.text}>
          {text}
        </p>
      </div>
    );
  }
}

SignupBadge.propTypes = {
  text: React.PropTypes.string,
};

export default SignupBadge;
