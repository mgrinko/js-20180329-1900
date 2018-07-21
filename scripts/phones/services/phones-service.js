'use strict';


const PhonesService = {
  loadPhones(callback, search, sort) {
    this._sendRequest(`https://surho.github.io/js-20180329-1900/api/phones`, callback, search, sort);
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`https://surho.github.io/js-20180329-1900//api/phones/${phoneId}`, callback)
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