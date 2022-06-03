import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';

const EstablishmentActions = mcFly.createActions({

  fetchIndex() {
    return WP.get('/posts/?type[]=utbildningstyper'
      + '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.ESTABLISHMENT_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ESTABLISHMENT_INDEX_FETCH_FAIL,
          data: data,
        };
      });
  },
});

export default EstablishmentActions;
