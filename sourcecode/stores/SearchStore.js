import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let search = Immutable.fromJS({});

function setFilter (data) {
  if (data.value.value.length) {
    search = search.set(data.key, {
      value: data.value.value,
      title: data.value.title,
  });
  } else {
    search = search.delete(data.key);
  }
}

function resetFilters () {
  search = search.clear();
}

const SearchStore = mcFly.createStore({
  getFilters: function () {
    return search;
  },
  getFilter: function (filter) {
    return search.get(filter);
  },
}, function (payload) {

  const _search = search;

  switch (payload.actionType) {

    case actionTypes.SEARCH_FILTER_SET:
      setFilter(payload.data);
      break;

    case actionTypes.SEARCH_FILTERS_RESET:
      resetFilters();
      break;

    default:
      return true;
  }

  if (!Immutable.is(search, _search)) {
    SearchStore.emitChange();
  }

  return true;
});

export default SearchStore;
