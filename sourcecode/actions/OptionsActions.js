import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';

const OptionsActions = mcFly.createActions({

  fetchOptions() {
    return WP.get('/acf/options/')
      .then(function (data) {
        return {
          actionType: actionTypes.OPTIONS_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.OPTIONS_FETCH_FAIL,
          data: data,
        };
      });
  },

});

export default OptionsActions;
