'use strict';

const BASE_API_URL = 'https://surho.github.io/js-20180329-1900/api';

const HttpService = {
    send(url) {
        return fetch(BASE_API_URL + url + `.json`)
        .then(response => response.json())
    }
};

export default HttpService;