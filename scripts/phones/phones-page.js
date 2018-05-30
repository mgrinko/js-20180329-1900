'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import Sorting from './components/sorting.js';
import Searching from './components/searching.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._renderCatalogue(PhonesService.getPhones());

    this._sorting = new Sorting({
      element: this._element.querySelector('[data-component="sorting"]')
    });

    this._searching = new Searching({
      element: this._element.querySelector('[data-component="searching"]')
    });

    // this._catalogue._element.addEventListener('phoneSelected', (event) => {
    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      console.log(phoneId);
    });

    this._sorting.on('sortSelected', (event) => {
      let sortBy = event.detail;

        let phones = PhonesService.getPhones().sort(function(a, b) {
          if (a[sortBy] > b[sortBy]) {
              return 1;
            }
            if (a[sortBy] < b[sortBy]) {
              return -1;
            }

            return 0;
        });

        this._renderCatalogue(phones);

    });

    this._searching.on('searchInput', (event) => {
      let search = event.detail.toLowerCase();

      let phones = PhonesService.getPhones();
      let searchPhones = [];

      setTimeout(() => {
        for(let phone in phones) {  
          let lowName = phones[phone].name.toLowerCase();

          if(lowName.indexOf(search) !== -1) {
            searchPhones.push(phones[phone]);
          }
        }

        this._renderCatalogue(searchPhones);
      }, 1000);

    });

  }

  _renderCatalogue(phones) {
    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: phones
    });
  }
}
