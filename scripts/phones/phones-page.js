'use strict';

import PhonesService from './services/phones-service.js';
import FilterService from './services/filter-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhonesSorting from './components/phones-sorting.js';
import PhonesSearch from './components/phones-search.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._sorting = new PhonesSorting({
      element: this._element.querySelector('[data-component="phones-sorting"]')
    });

    this._search = new PhonesSearch({
      element: this._element.querySelector('[data-component="phones-search"]')
    });

    PhonesService.then(phones => {
      this._catalogue = new PhonesCatalogue({
        element: this._element.querySelector('[data-component="phones-catalog"]'),
        phones: phones
      });

      this._sorting.on('phoneSorting', (event) => {
        this._catalogue
          ._sort(event.detail)
          ._render();
      });

      this._search.on('phoneSearch', (event) => {
        let isEmpty = FilterService.filter({
            query: event.detail, 
            phones: phones, 
            element: this._element.querySelector('[data-component="phones-catalog"]')
        });

        this._element.querySelector('[data-search-info]').classList.toggle('hidden', isEmpty);
      });
    });

  }
}
