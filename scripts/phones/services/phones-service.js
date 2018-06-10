'use strict';

const PhonesService = {

    loadPhones(filter, callback) {
        let promise = this._sendRequest('/api/phones');
        promise.then((phones) => {
            const filteredPhones = this._search(phones,filter.query);
            const sortedPhones = this._sorting(filteredPhones, filter.sort);

            callback(sortedPhones);
        });

        setTimeout(() => {
            promise.then((phones) => console.log(phones));
        }, 2000);
    },


    loadPhone(phoneId, callback) {
       const promise = this._sendRequest(`/api/phones/${ phoneId }`);
       promise.then(callback);

    },

    _sendRequest(url) {
        let promise = {
            _successCallbacks: [],
            _errorCallbacks:[],
            _status:'pending',
            _result: null,

            then(callback) {
                if(this._status === 'fulfilled') {
                    callback(this._result);
                } else {
                    this._successCallbacks.push(callback);
                }
            },
            catch() {
                this._errorCallbacks.push(callback);
            },
            resolve(data) {
                this._status = 'fulfilled';
                this._result = data;
                this._successCallbacks.forEach((callback) => {
                    callback(data);
                })
            },
            reject(error) {
                this._status = 'rejected';
                this._result = error;
                this._errorCallbacks.forEach((callback) => {
                    callback(error);
                })
            }
        };
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.send();

        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            promise.resolve(data);
        };

        xhr.onerror = () => {
            promise.reject(xhr.status + xhr.statusText);
        }
        return promise;
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