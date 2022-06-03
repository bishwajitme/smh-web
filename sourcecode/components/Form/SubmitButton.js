import React from 'react';
import styles from './SubmitButton.less';

class SubmitButton extends React.Component {

  render () {
    const text = this.props.text || 'Skicka';
    return (
      <input type='submit'
             className={styles.input}
             value={text} />
    );
  }
}

SubmitButton.propTypes = {
  text: React.PropTypes.string,
};

export default SubmitButton;
