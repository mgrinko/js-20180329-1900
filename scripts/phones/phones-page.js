'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhonesSearch from './components/search.js';
import Sorter from './components/sorter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneViewer from './components/phone-viewer.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    PhonesService.loadPhones((phones) => {
      this._catalogue.setPhones(phones);
    });

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
    });

    this._search = new PhonesSearch({
      element: document.querySelector('[data-component="phones-search"]'),
    });

    this._sorter= new Sorter(
      document.querySelector('[data-component="phones-filter"')
    );

    this._cart = new ShoppingCart(
      {element: document.querySelector('[data-component="shopping-cart"]')}
    )

    this._viewer = new PhoneViewer(
      {element: document.querySelector('[data-component="phone-viewer"]')
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;
      PhonesService.loadPhone(phoneId, (phone) => {
        this._catalogue.hide();
        this._viewer.show(phone);
      })
    });

    this._catalogue.on('add', (event) => {
      this._cart.addItem(event.detail);
    });

    this._viewer.on('add', (event) => {
      this._cart.addItem(event.detail);
    });

    this._viewer.on('back', () => {
      this._catalogue.show();
      this._viewer.hide();
    });

    this._cart.on('remove', (event) => {
      this._cart.removeItem(event.detail);
    });

    this._element.addEventListener('filterUpdate', (event) => {
      PhonesService.loadPhones((phones) => {
        this._catalogue.setPhones(phones);
      },
      (phones) => {
        return this._search.search(phones);
      },
      (phones) => {
        return this._sorter.sort(phones);
      }
    )

    });

  }
}

