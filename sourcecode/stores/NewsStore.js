import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let news = Immutable.fromJS({});

function setAll (newsArray) {
  news = newsArray.reduce((memo, newsItem) => {
    const slug = newsItem.get('slug');
    return memo.set(slug, newsItem);
  }, news);
}
//
//function setPage (newsItem) {
//  news = news.set('current', newsItem);
//}

const NewsStore = mcFly.createStore({
  getAll: function () {
    return news;
  },
  getSome: function (quantity) {
    if (!quantity) {
      return news;
    }
    return news.take(quantity);
  },
  getBySlug: function (slug) {
    return news.get(slug);
  },
}, function (payload) {

  const _news = news;

  switch (payload.actionType) {

    case actionTypes.NEWS_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    //case actionTypes.PAGE_FETCH_SUCCESS:
    //  setPage(payload.data);
    //  break;

    default:
      return true;
  }

  if (_news !== news) {
    NewsStore.emitChange();
  }

  return true;
});

export default NewsStore;
