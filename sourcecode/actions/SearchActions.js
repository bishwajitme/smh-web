import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';

const SearchActions = mcFly.createActions({

  setFilter(key, value) {
    return {
      actionType: actionTypes.SEARCH_FILTER_SET,
      data: {
        key: key,
        value: value,
      },
    };
  },

  resetFilters() {
    return {
      actionType: actionTypes.SEARCH_FILTERS_RESET,
    };
  },
});

export default SearchActions;
