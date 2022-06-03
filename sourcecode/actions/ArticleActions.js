import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import WP from '../api/WP.js';

const ArticleActions = mcFly.createActions({

  fetchIndex() {
    return WP.get('/posts/?type[]=nyheter' +
      '&type[]=utbildningar' +
      '&type[]=intervjuer' +
      '&type[]=studieorter' +
      '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.ARTICLE_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ARTICLE_INDEX_FETCH_FAIL,
          data: data,
        };
      });
  },
  fetchByType(type) {
    return WP.get('/posts/?type[]=' + type + '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_TYPE_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_TYPE_FETCH_FAIL,
          data: data,
        };
      });
  },
  fetchByTypeAndTakeSome(type, num) {
    return WP.get('/posts/?type[]=' + type + '&filter[posts_per_page]=' + num)
      .then(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_TYPE_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_TYPE_FETCH_FAIL,
          data: data,
        };
      });
  },
  fetchBySlug(slug) {
    return WP.get('/posts/?type[]=nyheter' +
      '&type[]=utbildningar' +
      '&type[]=intervjuer' +
      '&type[]=studieorter' +
      '&filter[name]=' + slug +
      '&filter[posts_per_page]=-1')
      .then(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_SLUG_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_SLUG_FETCH_FAIL,
          data: data,
        };
      });
  },
  fetchByID(id) {
    return WP.get('/posts/' + id)
      .then(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_ID_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (data) {
        return {
          actionType: actionTypes.ARTICLE_BY_ID_FETCH_FAIL,
          data: data,
        };
      });
  },
});

export default ArticleActions;
