
'use strict';

const BASE_API_URL = 'https://surho.github.io/js-20180329-1900/api';

const PhonesService = {
  async loadPhones(filter) {
    let phones = await this._sendRequest(`/phones`);
    let searchedPhones = this.search(filter, phones);
    let sortedPhones = this.sort(filter, searchedPhones);;

    return sortedPhones
  },

  async loadPhone(phoneId) {
    let phone = await this._sendRequest(`/phones/${phoneId}`)
    return phone;
  },

  sort(searchOptions, phones) {
        let sortedPhones = [];
        if(searchOptions.order === 'name') {
            sortedPhones = phones.sort((a, b) => {
            if(a.id < b.id) return -1;
            if(a.id > b.id) return 1;
            return 0;
          });
        }

        if(searchOptions.order === 'age') {
          sortedPhones = phones.sort((a, b) => {
              return +a.age - +b.age
          });
        }
        return sortedPhones;
  },

  search(searchOptions, phones) {
    let searchedPhones = [];
    for(let i = 0; i < phones.length; i++) {
        let phoneName = phones[i].name.toLowerCase();
        let inputValue = searchOptions.searchValue.toLowerCase();
        if(phoneName.indexOf(inputValue) !== -1) {
          searchedPhones.push(phones[i]);
        }
    } 

    return searchedPhones;
  },

  _sendRequest(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest;

      let fullUrl = BASE_API_URL + url + '.json';

      xhr.open('GET', fullUrl, true);

      xhr.send();

      xhr.onload = () => {

        let data = JSON.parse(xhr.responseText);
        resolve(data)    
      }
    })
  }
};




export default PhonesService;