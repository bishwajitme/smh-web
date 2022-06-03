import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let article = Immutable.fromJS({});

function setAll (articleArray) {
  article = articleArray.reduce((memo, articleItem) => {
    const ID = articleItem.get('ID');
    return memo.setIn([ID], articleItem);
  }, article).sortBy(articleItem => {
    return -(new Date(articleItem.get('date')).getTime());
  });
}

function setByID (articleItem) {
  const ID = articleItem.get('ID');
  article = article.setIn([ID], articleItem);
}

const ArticleStore = mcFly.createStore({
  getAll: function () {
    return article;
  },
  getSome: function (quantity) {
    if (!quantity) {
      return article;
    }
    return article.take(quantity);
  },
  getFromList: function (list) {
    let articles = Immutable.fromJS({});
    list.map(item => {
      article.map(art => {
        if (art.get('ID') === item) {
          articles = articles.set(art.get('ID'), art);
        }
      });
    });
    return articles;
  },
  getBySlug: function (slug) {
    return article.filter((art) => {
      if (art.get('slug') === slug) {
        return art;
      }
    }).first();
  },
  getByType: function (type) {
    return article.filter((art) => {
      if (art.get('type') === type) {
        return art;
      }
    });
  },
}, function (payload) {

  const _article = article;

  switch (payload.actionType) {

    case actionTypes.ARTICLE_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    case actionTypes.ARTICLE_BY_SLUG_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    case actionTypes.ARTICLE_BY_TYPE_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    case actionTypes.ARTICLE_BY_ID_FETCH_SUCCESS:
      setByID(payload.data);
      break;

    default:
      return true;
  }

  if (_article !== article) {
    ArticleStore.emitChange();
  }

  return true;
});

export default ArticleStore;
