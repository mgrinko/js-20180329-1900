'use strict';

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
        debugger;
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

    loadPhones(filter, callback) {
        let promise = this._sendRequest('/api/phones');

        let promise2 = promise
            .then((phones) => {
                const filteredPhones = this._filter(phones, filter.query);
                const sortedPhones = this._sort(filteredPhones, filter.order);

                return sortedPhones;
            });

        return promise2;
    },


    loadPhone(phoneId, callback) {
       return this._sendRequest(`/api/phones/${ phoneId }`);


    },

    _sendRequest(url) {
        return new Promise(
            (resolve, reject) => {
                let xhr = new XMLHttpRequest();

                xhr.open('GET', url, true);

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

    _sorting(phones, sort) {

        if (!sort) {
            return phones;
        }
        let type = sort.type;
        let value = sort.order;

        if (type == 'number') {
           return this._sortNumber(phones,value);
        }

        if (type == 'text') {
          return  this._sortText(phones,value);
        }

        if (type == 'date') {
          return this._sortDate(phones,value);
        }

    },

    _sortNumber(phones,value) {
      return phones.sort((phone1, phone2) => {
            return phone1[value] - phone2[value];
        });
    },

    _sortText(phones,value) {
       return phones.sort((phone1, phone2) => {
            return phone1[value].localeCompare(phone2[value]);
        });
    },

    _sortDate(value) {
    },

    _search(phones,query) {
        if (!query) {
            return phones;
        }

        let normalizedQuery = query.toLowerCase();

        return phones.filter((phone) => {
            return phone.name.toLowerCase().includes(normalizedQuery);
        });
    }

};

export default PhonesService;