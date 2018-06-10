'use strict';

const PhonesService = {

    loadPhones(filter, callback) {
        this._sendRequest('/api/phones', (phones) => {
            const filteredPhones = this._search(phones,filter.query);
            const sortedPhones = this._sorting(filteredPhones, filter.sort);

            callback(sortedPhones);
        });
    },


    loadPhone(phoneId, callback) {
        this._sendRequest(`/api/phones/${ phoneId }`, callback);
    },

    _sendRequest(url, callback, { method = 'GET' } = {}) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.send();

        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        };
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