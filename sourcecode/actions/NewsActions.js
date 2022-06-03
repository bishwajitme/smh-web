import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';
import Immutable from 'immutable';

const NewsActions = mcFly.createActions({

  fetchIndex() {
    return WP.get('/posts?type[]=nyhet')
      .then(function (data) {
        return {
          actionType: actionTypes.NEWS_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.NEWS_INDEX_FETCH_FAIL,
          data: data,
        };
      });
  },
  fetchBySlug(slug) {
    return WP.get('/posts(?type[]=nyhet&filter[name]=' + slug
      + '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.PAGE_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.PAGE_FETCH_FAIL,
          data: Immutable.fromJS({
            slug: slug,
            error: data,
          }),
        };
      });
  },
});

export default NewsActions;
