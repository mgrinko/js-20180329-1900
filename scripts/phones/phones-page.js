'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhoneSorting from './components/phone-sorting.js'
import PhoneSearch from "./components/phone-search";

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: PhonesService.getPhones(),
    });
    this._phoneSorting = new PhoneSorting({
        element: this._element.querySelector('[data-component="phone-sorting"]'),
        phones: PhonesService.getPhones(),
    });
    this._phoneSearch = new PhoneSearch ({
        element: this._element.querySelector('[data-component="phone-search"]'),
    });
    // this._catalogue._element.addEventListener('phoneSelected', (event) => {
    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      console.log(phoneId);
    });

    this._phoneSorting.on('phoneSorting', (event) => {
        this._catalogue._sorting(event)
        this._catalogue._render();
    });

    this._phoneSearch.on('phoneSearch', (event) => {
      this._catalogue._search(event);
    });
  }
}
