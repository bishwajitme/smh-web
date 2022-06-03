import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let formEducations = Immutable.fromJS({});

function setAll (formEducationsArray) {
  formEducations = formEducationsArray.reduce((memo, education) => {
    const id = education.get('Id');
    return memo.set(id, education);
  }, formEducations);
}

const FormEducationStore = mcFly.createStore({
  getAll: function () {
    return formEducations;
  },
}, function (payload) {

  const _formEducations = formEducations;

  switch (payload.actionType) {
    case actionTypes.FORM_EDUCATIONS_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    default:
      return true;
  }

  if (_formEducations !== formEducations) {
    FormEducationStore.emitChange();
  }

  return true;
});

export default FormEducationStore;
