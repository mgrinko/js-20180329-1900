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

    this._filter = {
      query: '',
      order: 'name',
    };

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();

    this._refreshPhones();
  }

  async _refreshPhones() {
    let phones = await PhonesService.loadPhones(this._filter);

    this._catalog.setPhones(phones);
  }

  _initCatalog() {
    this._catalog = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
    });

    this._catalog.on('phoneSelected', async (event) => {
      let phoneId = event.detail;

      Promise.all([
        PhonesService.loadPhone(phoneId),
        PhonesService.loadPhones(this._filter),
      ])
        .then(([phone, data]) => {
          this._viewer.show(phone);
          this._catalog.hide();

          console.log(data);
        })
        .catch(alert);

    });

    this._catalog.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalog.show();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]'),
    });

    this._sorter = new Sorter({
      element: this._element.querySelector('[data-component="sorter"]'),
    });

    this._search.on('search', (event) => {
      this._filter.query = event.detail;
      this._refreshPhones()
    });

    this._sorter.on('changeOrder', (event) => {
      this._filter.order = event.detail;
      this._refreshPhones()
    });
  }
}
