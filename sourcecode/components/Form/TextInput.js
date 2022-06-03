import React from 'react';
import Immutable from 'immutable';
import FormActions from '../../actions/FormActions.js';
import validate from '../../utils/validateForm.js';
import styles from './TextInput.less';
import classNames from 'classnames/bind';

class TextInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      valid: '',
      message: false,
    };
    this.validateInput = this.validateInput.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }

  componentDidMount () {
    FormActions.setInput(this.props.name, '', false);
  }

  validateInput () {
    const ref = this.refs.input;
    const toValidate = Immutable.fromJS(this.props.validate);
    const value = ref.value;
    const key = ref.name;
    const valid = validate(toValidate, value);
    this.setState({valid: valid});
    FormActions.setInput(key, value, valid);
  }

  removeMessage () {
    this.setState({message: false});
  }

  render () {
    const placeholder = this.props.placeholder || '';
    const type = this.props.type || 'text';
    const name = this.props.name || '';
    const onblur = (this.props.validate)
      ? this.validateInput
      : '';
    const message = this.state.message;
    const validationMessage = this.props.validationMessage;

    const cx = classNames.bind(styles);
    const baseStyles = cx({
      base: true,
      valid: this.state.valid === true,
      invalid: this.state.valid === false,
    });

    return (
      <div className={baseStyles}>
        {(message === true)
          ? <span className={styles.validationMessage}
                  onClick={() => this.removeMessage()}>
              {validationMessage}
            </span>
          : ''}
        <div className={styles.placeholder}>{placeholder + ':'}</div>
        <input ref='input'
               type={type}
               name={name}
               className={styles.input}
               placeholder={placeholder}
               onBlur={onblur}
               data-gtm-type='input-text'
               onFocus={this.removeMessage}
               onChange={this.removeMessage}
               onClick={this.removeMessage}
               valid={this.state.valid}
               data-gtm-valid={this.state.valid}/>
      </div>
    );
  }
}

TextInput.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  validate: React.PropTypes.array,
  validationMessage: React.PropTypes.string,
};

export default TextInput;
