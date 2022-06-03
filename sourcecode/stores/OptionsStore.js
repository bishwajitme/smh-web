import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let options = Immutable.fromJS({});

function addOptions(data) {
  options = data;
}

const OptionsStore = mcFly.createStore({
  getOptions: function () {
    return options;
  },
}, function (payload) {

  const _options = options;

  switch (payload.actionType) {
    case actionTypes.OPTIONS_FETCH_SUCCESS:
    case actionTypes.OPTIONS_FETCH_FAIL:
      addOptions(payload.data);
      break;

    default:
      return true;
  }

  if (_options !== options) {
    OptionsStore.emitChange();
  }

  return true;
});

export default OptionsStore;
