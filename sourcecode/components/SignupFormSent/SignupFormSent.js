import React from 'react';
import createMarkup from '../../utils/createMarkup.js';
import styles from './SignupFormSent.less';
import classNames from 'classnames/bind';

class SignupFormSent extends React.Component {

  render () {

    const status = this.props.status;
    let message;
    if (status === 'success') {
      message = this.props.successText;
    } else if (status === 'error') {
      message = this.props.errorText;
    }
    message = createMarkup(message);

    const cx = classNames.bind(styles);
    const messageStyles = cx({
      message: true,
      success: status === 'success',
      error: status === 'error',
    });

    return (
      <div className={styles.base}>
        <div className={messageStyles}
           dangerouslySetInnerHTML={message}></div>
      </div>
    );
  }
}

SignupFormSent.propTypes = {
  errorText: React.PropTypes.string,
  status: React.PropTypes.string,
  successText: React.PropTypes.string,
};

export default SignupFormSent;
