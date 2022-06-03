import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let locations = Immutable.fromJS([]);

function setAll (data) {
  locations = data;
}

const LocationStore = mcFly.createStore({
  getAll: function () {
    return locations;
  },
}, function (payload) {

  const _locations = locations;

  switch (payload.actionType) {

    case actionTypes.LOCATIONS_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    default:
      return true;
  }

  if (_locations !== locations) {
    LocationStore.emitChange();
  }

  return true;
});

export default LocationStore;
