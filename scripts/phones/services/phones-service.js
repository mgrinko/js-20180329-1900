'use strict';

let BASE_API_URL = 'https://mgrinko.github.io/js-20180329-1900/api';

class MyPromise {
  constructor(behaviourFunction) {
    behaviourFunction(this._resolve.bind(this), this._reject.bind(this));

    this._status ='pending';
    this._result = null;

    this._successCallbacks = [];
    this._errorCallbacks = [];
  }

  then(callback) {
    if (this._status === 'fulfilled') {
      callback(this._result);
    } else {
      this._successCallbacks.push(callback);
    }
  }

  catch(errorCallback) {
    this._errorCallbacks.push(errorCallback);
  }

  _resolve(data) {
    if (this._status !== 'pending') {
      return;
    }

    this._status = 'fulfilled';
    this._result = data;

    this._successCallbacks.forEach((callback) => {
      callback(data);
    });
  }

  _reject(error) {
    if (this._status !== 'pending') {
      return;
    }

    this._status = 'rejected';
    this._result = error;

    this._errorCallbacks.forEach((callback) => {
      callback(error);
    });
  }
}

const PhonesService = {
  loadPhones(filter) {
    let promise = this._sendRequest('/phones');

    let promise2 = promise
      .then((phones) => {
        const filteredPhones = this._filter(phones, filter.query);
        const sortedPhones = this._sort(filteredPhones, filter.order);

        return sortedPhones;
      });

    return promise2;
  },

  loadPhone(phoneId) {
    return this._sendRequest(`/phones/${ phoneId }`);
  },

  _sendRequest(url) {
    return new Promise(
      (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let fullUrl = BASE_API_URL + url + '.json';

        xhr.open('GET', fullUrl, true);

        xhr.send();

        xhr.onload = () => {
          let data = JSON.parse(xhr.responseText);

          resolve(data);
        };

        xhr.onerror = () => {
          reject(xhr.status + xhr.statusText);
        };
      }
    );
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