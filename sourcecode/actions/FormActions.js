import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';

const FormActions = mcFly.createActions({

  setInput(key, value, valid) {
    return {
      actionType: actionTypes.FORM_INPUT_SET,
      data: {
        key: key,
        value: value,
        valid: valid,
      },
    };
  },
});

export default FormActions;
