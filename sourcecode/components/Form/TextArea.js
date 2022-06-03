import React from 'react';
import styles from './TextArea.less';

class TextArea extends React.Component {

  render () {
    const placeholder = this.props.placeholder || '';
    const rows = this.props.rows || 5;
    return (
      <textarea className={styles.input}
                placeholder={placeholder}
                rows={rows} />
    );
  }
}

TextArea.propTypes = {
  params: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  rows: React.PropTypes.number,
};

export default TextArea;
