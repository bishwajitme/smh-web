import mcFly from '../flux/mcFly';
import getQueryParams from '../utils/getQueryParams.js';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';
import createValueFrom from '../utils/createValueFrom.js';
import decodeURL from '../utils/decodeURL.js';

let educations = Immutable.fromJS({});

function setAll (educationsArray) {
  educations = educationsArray.reduce((memo, education) => {
    const id = education.get('ID');
    return memo.set(id, education);
  }, educations).sortBy(education => education.get('title'));
}

function filterEducations (all, filters) {
  if (!all) {
    return false;
  }
  // Go through all filters
  filters.map((val, key) => {
    let filterFunction = function () {
      return '';
    };


    if (key === 'utbildningstyp') {
      filterFunction = function (education) {
        return education.acf.meta_establishment.filter((typ) => {
          return createValueFrom(
              decodeURL(typ.post_title)) === createValueFrom(decodeURL(val));
        });
      };
    } else if (key === 'studieort') {
      filterFunction = function (education) {
        return education.acf.meta_location.filter((ort) => {
          return createValueFrom(
              decodeURL(ort.post_title)) === createValueFrom(decodeURL(val));
        });
      };
    }

    all = all.filter((education) => {
      education = education.toJS();

      const filtered = filterFunction(education);

      if (filtered.length) {
        return education;
      } else {
        return false;
      }
    });

  });

  // Group educations by Establishment
  return all.groupBy((education) => {
    return education.getIn(['acf', 'meta_establishment'])
      .first()
      .get('post_date');
  }).sortBy((list, key) => {
    return key;
  }).reverse();
}

const EducationStore = mcFly.createStore({
  getAll: function () {
    return filterEducations(educations, Immutable.Map({}));
  },
  getFiltered: function () {
    const filters = Immutable.fromJS(getQueryParams());
    return filterEducations(educations, filters);
  },
  getBySlug: function (slug) {
    return educations.filter((edu) => {
      if (edu.get('slug') === slug) {
        return edu;
      }
    }).first();
  },
}, function (payload) {

  const _educations = educations;

  switch (payload.actionType) {

    case actionTypes.EDUCATIONS_INDEX_FETCH_SUCCESS:
      setAll(payload.data);
      break;

    default:
      return true;
  }

  if (_educations !== educations) {
    EducationStore.emitChange();
  }

  return true;
});

export default EducationStore;
