import dataLayer from '../dataLayer/dataLayer.js';
import React from 'react';
import TextInput from '../Form/TextInput.js';
import EducationSelect from '../EducationSelect/EducationSelect.js';
import SignupFormSent from '../SignupFormSent/SignupFormSent.js';
import FormStore from '../../stores/FormStore.js';
import CheckBox from '../Form/CheckBox.js';
import SubmitButton from '../Form/SubmitButton.js';
import xhr from 'xhr';
import styles from './SignupForm.less';
import config from 'webpack-config-loader!conf';

class SignupForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      formValid: '',
      formSent: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();

    const formData = {
      ApiKey: config.formKey,
      Channel: config.formChannel,
    };
    const formInputs = FormStore.get();
    //console.log('formInputs', formInputs)

    const valid = !formInputs.filter(item => {
      formData[item.key] = item.value;

      if (item.valid === false) {
        this.refs[item.key].setState({valid: false, message: true});
      }
      return item.valid === false;
    }).size;

    const showThankYouMessage = function () {
      this.setState({formSent: 'success'});
    }.bind(this);

    const showErrorMessage = function () {
      this.setState({formSent: 'error'});
    }.bind(this);

    delete formData.PUL;

    if (valid) {
      xhr({
        useXDR: true,
        url: config.hostname + config.formPostEndpoint,
        method: 'POST',
        json: formData,
      }, function (err, resp, body) {
        if (!err) {
          //TagManagerEvent
          dataLayer.push({event: 'signupform:sent'});
          showThankYouMessage();
        } else {
          showErrorMessage();
        }
      });
    }
  }

  render () {
    const options = this.props.formOptions;
    const successText = options.get('form_thankyou_message');
    const errorText = options.get('form_error_message');

    return (
      <div>
        {(this.state.formSent)
          ? <SignupFormSent status={this.state.formSent}
                            successText={successText}
                            errorText={errorText}/>
          : <form onSubmit={this.onSubmit}
                  className={styles.base}
                  data-gtm='form-intresseanmalan'
                  noValidate='novalidate'>
          <div className={styles.textInput}>
            <TextInput ref='FirstName'
                       name='FirstName'
                       placeholder='Förnamn'
                       validationMessage='Förnamn är obligatoriskt'
                       validate={['required']}/>
          </div>
          <div className={styles.textInput}>
            <TextInput ref='LastName'
                       name='LastName'
                       placeholder='Efternamn'
                       validationMessage='Efternamn är obligatoriskt'
                       validate={['required']}/>
          </div>
          <div className={styles.textInput}>
            <TextInput ref='Email'
                       name='Email'
                       type='email'
                       placeholder='E-post'
                       validationMessage='En giltig e-postadress
                       är obligatoriskt'
                       validate={['email']}/>
          </div>
          <div className={styles.textInput}>
            <TextInput ref='Phone'
                       name='Phone'
                       placeholder='Telefonnummer'
                       validationMessage='Ett giltigt telefonnummer är
                       obligatoriskt'
                       validate={['phone']}/>
          </div>
          <div className={styles.educations}>
            <EducationSelect
              ref='Enquiries'
              name='Enquiries'
              validationMessage='Minst en utbildning måste väljas'
              setEducations={this.setEducations}/>
          </div>
          <div>
            <CheckBox ref='PUL'
                      name='PUL'
                      validationMessage='Ditt samtycke krävs för att göra en intresseanmälan'
                      validate={['required']}
                      label={`Jag godkänner hantering av mina personuppgifter. `}
            />
          </div>
          <div className={styles.button}>
            <SubmitButton text='Skicka intresseanmälan'/>
          </div>
        </form>
        }
      </div>
    );
  }
}

SignupForm.propTypes = {
  formOptions: React.PropTypes.object,
};

export default SignupForm;
