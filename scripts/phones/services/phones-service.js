'use strict';

const PhonesService = {

    data: null,

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
            this.data = JSON.parse(xhr.responseText);
            if(this.query !== undefined ) {
                this.changeData();
            }
            callback(this.data);
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
        this.data.sort((phone1, phone2) => {
            return phone1[value] - phone2[value];
        });
    },

    _sortText(value) {
        this.data.sort((phone1, phone2) => {
            return phone1[value].localeCompare(phone2[value]);
        });
    },

    _sortDate(value) {
    }

};

export default PhonesService;