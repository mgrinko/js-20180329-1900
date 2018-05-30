'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';

import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Search from './components/search.js';
import Sorter from './components/sorter.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
    });

    this._sorter = new Sorter({
      element: this._element.querySelector('[data-component="sorter"]')
    });

    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]')
    });

    PhonesService.loadPhones((phones) => {
      this._catalogue.setPhones(phones);
    });

    // this._catalogue._element.addEventListener('phoneSelected', (event) => {
    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      PhonesService.loadPhone(phoneId, (phone) => {
        this._viewer.show(phone);
        this._catalogue.hide();
      });
    });

    this._catalogue.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });

    this._sorter.on('sortSelected', (event) => {
      let sortBy = event.detail;
      PhonesService.loadPhones((phones) => {
        phones.sort(function(a, b) {
        if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }

          return 0;
        });

        this._catalogue.setPhones(phones);
      });
    });

    this._search.on('searchInput', (event) => {
      let search = event.detail.toLowerCase();
      let searchPhones = [];

      PhonesService.loadPhones((phones) => {
        for(let phone in phones) {  
          let lowName = phones[phone].name.toLowerCase();

          if(lowName.indexOf(search) !== -1) {
            searchPhones.push(phones[phone]);
          }
        }

        this._catalogue.setPhones(searchPhones);
      });

    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });

    this._viewer.on('add', () => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });


    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });

  }

  _renderCatalogue(phones) {
    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: phones
    });
  }
}
