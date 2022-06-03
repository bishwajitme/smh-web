import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';

const MenuActions = mcFly.createActions({

  fetchIndex() {
    return WP.get('/menu/')
      .then(function (data) {
        return {
          actionType: actionTypes.MENU_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {});
  },

  fetchByID(id) {
    return WP.get('/menus/' + id)
      .then(function (data) {
        return {
          actionType: actionTypes.MENU_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {});
  },

});

export default MenuActions;
