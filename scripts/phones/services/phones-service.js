'use strict';

let BASE_API_URL = 'https://mgrinko.github.io/js-20180329-1900/api';

const PhonesService = {
  loadPhones(filter, callback) {
    this._sendRequest('/phones', (phones) => {
      const filteredPhones = this._filter(phones, filter.query);
      const sortedPhones = this._sort(filteredPhones, filter.order);

      callback(sortedPhones);
    });
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`/phones/${ phoneId }`, callback);
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
  },

  _sendRequest(url, callback, { method = 'GET' } = {}) {
    let xhr = new XMLHttpRequest();
    let fullUrl = BASE_API_URL + url + '.json';

    xhr.open(method, fullUrl, true);

    xhr.send();

    xhr.onload = () => {
      let data = JSON.parse(xhr.responseText);

      callback(data);
    };
  }
};

export default PhonesService;