'use strict';

import HttpService from './http-service.js';

const PhonesService = {
  loadPhones(filter) {
    let promise = HttpService.send('/phones');

    let promise2 = promise
      .then((phones) => {
        const filteredPhones = this._filter(phones, filter.query);
        const sortedPhones = this._sort(filteredPhones, filter.order);

        return sortedPhones;
      });

    return promise2;
  },

  loadPhone(phoneId) {
    return HttpService.send(`/phones/${ phoneId }`);
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