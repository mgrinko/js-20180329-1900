'use strict';

const PhonesService = {
  loadPhones(filter, callback) {
    this._sendRequest('/api/phones', (phones) => {
      const filteredPhones = this._filter(phones, filter.query);
      const sortedPhones = this._sort(filteredPhones, filter.order);

      callback(sortedPhones);
    });
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`/api/phones/${ phoneId }`, callback);
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

    xhr.open(method, url, true);

    xhr.send();

    xhr.onload = () => {
      let data = JSON.parse(xhr.responseText);

      callback(data);
    };
  }
};

export default PhonesService;