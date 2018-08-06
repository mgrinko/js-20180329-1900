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

    this._filter = {
      searchValue: '',
      order: 'name'
    }

    this._initCatalogue();
    this._initSearch();
    this._initSorter();
    this._initCart();
    this._initViewer();
    this._refreshPhones();
    
  }

  _initViewer() {

    this._viewer = new PhoneViewer(
      {element: document.querySelector('[data-component="phone-viewer"]')
    });

    this._viewer.on('add', (event) => {
      this._cart.addItem(event.detail);
    });

    this._viewer.on('back', () => {
      this._catalogue.show();
      this._viewer.hide();
    });
  }

  _initCart() {

    this._cart = new ShoppingCart(
      {element: document.querySelector('[data-component="shopping-cart"]')}
    );

    this._cart.on('remove', (event) => {
      this._cart.removeItem(event.detail);
    });

  }

  _initSorter() {

    this._sorter= new Sorter(
      document.querySelector('[data-component="phones-filter"')
    );

    this._sorter.on('userSortUpdate', (event) => {
      this._filter.order = event.detail;
      this._refreshPhones()
    });

  }

  _initSearch() {

    this._search = new PhonesSearch({
      element: document.querySelector('[data-component="phones-search"]'),
    });

    this._search.on('userSearchUpdate', (event) => {
      this._filter.searchValue = event.detail;
      this._refreshPhones()
    });

  }

  _initCatalogue() {

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
    });

    this._catalogue.on('add', (event) => {
      this._cart.addItem(event.detail);
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;
      PhonesService.loadPhone(phoneId, (phone) => {
        this._catalogue.hide();
        this._viewer.show(phone);
      })
    });

  }

  _refreshPhones() {
    const callback = (phones) => {
      this._catalogue.setPhones(phones);
    } 
    PhonesService.loadPhones(this._filter, callback);
  };
}

