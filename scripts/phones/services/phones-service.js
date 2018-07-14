'use strict';


const PhonesService = {
  loadPhones(callback, search, filter) {
    this._sendRequest(`api/phones`, callback, search, filter);
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`api/phones/${phoneId}`, callback)
  },

_sendRequest(url, callback, search, filter, {method = 'GET'} = {} ) {

    let xhr = new XMLHttpRequest;

    xhr.open('GET', url, true);

    xhr.send();

    xhr.onload = () => {

      let data = JSON.parse(xhr.responseText);
      if(filter) data = filter(data)
      if(search) data = search(data);

      callback(data);
    }
  }
};



export default PhonesService;