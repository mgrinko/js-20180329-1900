'use strict';

let BASE_API_URL = 'https://mgrinko.github.io/js-20180329-1900/api';

const PhonesService = {
  loadPhones(filter, callback) {
    let promise = this._sendRequest('/phones');

    promise.then((phones) => {
      const filteredPhones = this._filter(phones, filter.query);
      const sortedPhones = this._sort(filteredPhones, filter.order);

      callback(sortedPhones);
    });
  },

  loadPhone(phoneId, callback) {
    // this._sendRequest(`/phones/${ phoneId }`, callback);
    const promise = this._sendRequest(`/phones/${ phoneId }`);

    promise.then(callback);
  },

  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],

      then(callback) {
        this._successCallbacks.push(callback);
      },

      resolve(data) {
        this._successCallbacks.forEach((callback) => {
          callback(data);
        });
      }
    };


    let xhr = new XMLHttpRequest();
    let fullUrl = BASE_API_URL + url + '.json';

    xhr.open('GET', fullUrl, true);

    xhr.send();

    xhr.onload = () => {
      let data = JSON.parse(xhr.responseText);

      promise.resolve(data);
    };


    return promise;
  },

  _filter(phones, query) {
    if (!query) {
      return phones;
    }

    let normalizedQuery = query.toLowerCase();

    return phones.filter((phone) => {
      return phone.name.toLowerCase().includes(normalizedQuery);
    });
  },

  _sort(phones, orderField) {
    return phones.sort((phoneA, phoneB) => {
      return (phoneA[orderField] > phoneB[orderField])
        ? 1
        : -1;
    });
  }
};

export default PhonesService;