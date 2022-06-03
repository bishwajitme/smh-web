import mcFly from '../flux/mcFly';
import Immutable from 'immutable';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';

const EducationActions = mcFly.createActions({

  fetchIndex() {
    return WP.get('/posts/?type[]=utbildningar' + '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.EDUCATIONS_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.EDUCATIONS_INDEX_FETCH_FAIL,
          data: data,
        };
      });
  },

  fetchBySlug(slug) {
    return WP.get('/posts/?type=[]utbildningar&filter[name]=' + slug
      + '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.EDUCATION_CURRENT_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.EDUCATION_CURRENT_FETCH_FAIL,
          data: Immutable.fromJS({
            slug: slug,
            error: data,
          }),
        };
      });
  },

});

export default EducationActions;
