'use strict';

let BASE_API_URL = 'https://mgrinko.github.io/js-20180329-1900/api';

const HttpService = {
  send(url) {
    return fetch(BASE_API_URL + url + '.json')
      .then((result) => result.json());
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
};

export default HttpService;
