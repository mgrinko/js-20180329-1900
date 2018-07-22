'use strict';

const BASE_API_URL = 'https://surho.github.io/js-20180329-1900/api'

const PhonesService = {
  loadPhones(callback, search, sort) {
    this._sendRequest(`/phones`, callback, search, sort);
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`/phones/${phoneId}`, callback)
  },

_sendRequest(url, callback, search, sort, {method = 'GET'} = {} ) {

    let xhr = new XMLHttpRequest;

    let fullUrl = BASE_API_URL + url + '.json';

    xhr.open('GET', fullUrl, true);

    xhr.send();

    xhr.onload = () => {

      let data = JSON.parse(xhr.responseText);
      if(sort) data = sort(data)
      if(search) data = search(data);

      callback(data);
      
    }
  }
};



export default PhonesService;