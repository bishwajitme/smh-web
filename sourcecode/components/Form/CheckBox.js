import React from 'react';
import {Link} from 'react-router';
import Immutable from 'immutable';
import FormActions from '../../actions/FormActions.js';
import validate from '../../utils/validateForm.js';
import styles from './CheckBox.less';
import classNames from 'classnames/bind';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: '',
      message: false,
    };
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    FormActions.setInput(this.props.name, false, false);
  }

  validateInput() {
    const ref = this.refs.input;
    const key = ref.name;
    const valid = !ref.checked;
    this.setState({valid: !this.state.valid, message: false})
    FormActions.setInput(key, valid, valid);
  }

  render() {
    const { message, valid } = this.state;
    const { validateInput } = this;
    const { validationMessage, label, name } = this.props;
    const cx = classNames.bind(styles);

    const inputBoxWrapperStyle = cx({
      inputBoxWrapper: true,
      valid: valid === true,
      invalid: valid === false,
    });

    return (
      <div className={styles.base}>
        {(message === true)
          ? <span className={styles.validationMessage}>
              {validationMessage}
            </span>
          : null }
        <div className={inputBoxWrapperStyle}>
          <div className={styles.inputBox}>
            <input ref='input'
                   type='checkbox'
                   name={name}
                   className={styles.input}
                   data-gtm-type='input-checkbox'
                   checked={valid}
                   data-gtm-valid={valid}
            />
          <span onClick={validateInput} tabIndex={0}></span>
            <label className={styles.label}>
              <span onClick={validateInput}>{label}</span>
              <Link to="/cookie-policy" target="_blank">Läs mer här</Link>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

CheckBox.propTypes = {
  ref: React.PropTypes.string,
  name: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  validate: React.PropTypes.array,
  label: React.PropTypes.string,
};

export default CheckBox;
