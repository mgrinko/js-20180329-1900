'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhonesSorter from './components/phones-sorter.js'
import PhonesSearch from './components/phones-search.js';
import ShoppingCart from './components/shopping-cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._phoneSearch = new PhonesSearch({ element: this._element.querySelector('[data-component="phone-search"]') });
    this._phoneSearch.on('searchQueryChanged', (event) => {
        const filteredPhones = this._phoneSearch.filter({query: event.detail.query, phones: PhonesService.getPhones()});
        this._catalogue.renderPhones(this._phoneSorter.sortByCurrentOption(filteredPhones))
    });

    this._phoneSorter = new PhonesSorter({ element: this._element.querySelector('[data-component="phone-sorter"]') });
    this._phoneSorter.on('sortingSelected', (event) => {
        const phones = PhonesService.getPhones();
        const sortedPhones = this._phoneSorter.sortBy({propertyName: event.detail.propertyName, phones: this._phoneSearch.filterByCurrentQuery(phones)});
        this._catalogue.renderPhones(sortedPhones);
    });

    this._shoppingCart = new ShoppingCart({ element: this._element.querySelector('[data-component="shopping-cart"]') });
    this._shoppingCart.on('cartPhoneSelected', (event) => {
        this._shoppingCart.removePhoneFromCart(event.detail.cartPhonePosition);
    })

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: this._phoneSorter.sortByCurrentOption(PhonesService.getPhones()),
    });

    // this._catalogue._element.addEventListener('phoneSelected', (event) => {
    this._catalogue.on('phoneSelected', (event) => {
      const phoneId = event.detail;
      this._shoppingCart.addPhoneToCart(phoneId);
    });
  }
}
