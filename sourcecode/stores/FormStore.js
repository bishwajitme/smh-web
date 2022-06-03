import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let form = Immutable.fromJS({});

function setInput (data) {
  const key = data.key;
  const value = data.value;
  const valid = data.valid;
  form = form.set(key, {key, value, valid});
}

const FormStore = mcFly.createStore({
  get: function () {
    return form;
  },
}, function (payload) {

  const _form = form;

  switch (payload.actionType) {
    case actionTypes.FORM_INPUT_SET:
      setInput(payload.data);
      break;

    default:
      return true;
  }

  if (_form !== form) {
    FormStore.emitChange();
  }

  return true;
});

export default FormStore;
