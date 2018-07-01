'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhonesSearch from './components/search.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneViewer from './components/phone-viewer.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._phonesBase = PhonesService.getPhones();

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: this._phonesBase,
    });

    this._search = new PhonesSearch({
      element: document.querySelector('[data-component="phones-search"]'),
      phones: PhonesService.getPhones()
    });

    this._filter= new PhonesFilter(
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
       this._catalogue.hide();
       this._viewer.show();
    });

    this._catalogue.on('add', (event) => {
      console.log(event.detail);
      this._cart.addItem(event.detail);
   });

    this._viewer.on('back', (event) => {
      this._catalogue.show();
      this._viewer.hide();
    });

    this._element.addEventListener('searchUpdate', (event) => {
      this._phonesBase = event.detail;
      this._catalogue.updateCatalogue(this._phonesBase);
    });

    this._element.addEventListener('sortUpdate', (event) => {
      let sortSelected = event.detail;
      this._phonesBase.sort(sortSelected);
      this._catalogue.updateCatalogue(this._phonesBase);

    });


  }
}

