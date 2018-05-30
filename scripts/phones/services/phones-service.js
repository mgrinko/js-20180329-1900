'use strict';

const PhonesService = {

    phones: null,

    query: null,

    loadPhones(callback, query) {
        this.query = query;
        this._sendRequest('/api/phones', callback);
    },

    loadPhone(phoneId, callback) {
        this._sendRequest(`/api/phones/${ phoneId }`, callback);
    },

    _sendRequest(url, callback, { method = 'GET' } = {}) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.send();

        xhr.onload = () => {
            this.phones = JSON.parse(xhr.responseText);
            if(this.query !== undefined ) {
                this.changeData();
            }
            callback(this.phones);
        };
    },

    changeData() {
        if(this.query.value === "sort") {
            this.sorting(this.query)
        }

        if(this.query.value === "search") {
            this.search(this.query)
        }

    },
    sorting() {
        let type = this.query.detail.type;
        let value = this.query.detail.value;

        if (type == 'number') {
            this._sortNumber(value);
        }

        if (type == 'text') {
            this._sortText(value);
        }

        if (type == 'date') {
            this._sortDate(value);
        }
    },

    _sortNumber(value) {
        this.phones.sort((phone1, phone2) => {
            return phone1[value] - phone2[value];
        });
    },

    _sortText(value) {
        this.phones.sort((phone1, phone2) => {
            return phone1[value].localeCompare(phone2[value]);
        });
    },

    _sortDate(value) {
    },

    search() {
        let findPhones = [];
        this.phones.forEach((phone) => {
            if(phone.id.toUpperCase().includes(this.query.detail.value.toUpperCase())) {
                findPhones.push(phone);
            }
        });
        this.phones = findPhones;
    }

};

export default PhonesService;