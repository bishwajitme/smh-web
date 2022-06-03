import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let pages = Immutable.fromJS({});

function addPage(data) {
  pages = pages.set(data.slug, data.page);
}

function add404(slug) {
  pages = pages.set(slug, '404');
}


const PageStore = mcFly.createStore({
  getBySlug: function (slug) {
    return pages.get(slug);
  },
}, function (payload) {

  const _pages = pages;

  switch (payload.actionType) {

    case actionTypes.PAGE_FETCH_SUCCESS:
      addPage(payload.data);
      break;

    case actionTypes.PAGE_FETCH_FAIL:
      add404(payload.data);
      break;

    default:
      return true;
  }

  if (!Immutable.is(pages, _pages)) {
    PageStore.emitChange();
  }

  return true;
});

export default PageStore;
