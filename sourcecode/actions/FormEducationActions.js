import mcFly from '../flux/mcFly';
import Immutable from 'immutable';
import actionTypes from '../constants/actionTypes.js';
import config from 'webpack-config-loader!conf';
import XMLHttpRequestPromise from 'xhr-promise';

const FormEducationActions = mcFly.createActions({

  fetchIndex() {

    const xhrPromise = new XMLHttpRequestPromise();
    return xhrPromise.send({
        method: 'GET',
        url: config.hostname + config.formGetEndpoint +
        '&key=' + config.formKey,
      //'?ApiKey=' + config.formKey + '&ApiChannel=' + config.formChannel,
      })
      .then((results) => {
        if (results.status !== 200) {
          throw new Error('request failed');
        }
        const payload = xhrPromise.getXHR();
        const data = Immutable.fromJS(JSON.parse(payload.responseText));
        return {
          actionType: actionTypes.FORM_EDUCATIONS_INDEX_FETCH_SUCCESS,
          data: data,
        };
      })
      .catch(function (e) {

      });

  },

});

export default FormEducationActions;
