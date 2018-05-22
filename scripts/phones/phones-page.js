'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhonesSorting from './components/phones-sorting.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    PhonesService.then(phones => {
      this._catalogue = new PhonesCatalogue({
        element: this._element.querySelector('[data-component="phones-catalog"]'),
        phones
      });

      // this._catalogue._element.addEventListener('phoneSelected', (event) => {
      this._catalogue.on('phoneSelected', (event) => {
        let phoneId = event.detail;

        console.log(phoneId);
      });

      this._sorting = new PhonesSorting({
        element: this._element.querySelector('[data-component="phones-sorting"]')
      });

      this._sorting.on('phoneSorting', (event) => {
        this._catalogue
          ._sort(event.detail)
          ._render();
      });
    });

  }
}
