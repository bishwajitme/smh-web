import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let establishments = Immutable.fromJS([]);

function setAll (data) {
  establishments = data;
}

const EstablishmentStore = mcFly.createStore({
  getAll: function () {
    return establishments;
  },
}, function (payload) {

  const _establishments = establishments;

  switch (payload.actionType) {

    case actionTypes.ESTABLISHMENT_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    default:
      return true;
  }

  if (_establishments !== establishments) {
    EstablishmentStore.emitChange();
  }

  return true;
});

export default EstablishmentStore;
