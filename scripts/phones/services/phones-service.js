'use strict';


const PhonesService = {
  loadPhones(callback, search, sort) {
    this._sendRequest(`http://localhost:3000//api/phones.json`, callback, search, sort);
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`http://localhost:3000///api/phones/${phoneId}.json`, callback)
  },

_sendRequest(url, callback, search, sort, {method = 'GET'} = {} ) {

    let xhr = new XMLHttpRequest;

    xhr.open('GET', url, true);

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