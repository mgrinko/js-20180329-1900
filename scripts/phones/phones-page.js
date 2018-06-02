'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import PhoneViewer from './components/phones-viewer.js';
import ShoppingCart from "./components/ShoppingCart.js";

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._catalogue = new PhonesCatalogue({
          element: this._element.querySelector('[data-component="phones-catalog"]')
    });

    PhonesService.getPhones().then((phones)=>{
      this._phones = phones;
      this._catalogue.SetPhones(phones)
    });

    this._phoneViewer = new PhoneViewer(
        this._element.querySelector('[data-component="phone-viewer"]')
    );

    this._basket = new ShoppingCart(
        this._element.querySelector('[data-component="phones-shoppingCart"]')
    );

    this._sortSelect = this._element.querySelector('[data-component="phones-sort"]');
    this._sortSelect.addEventListener('change', (function(){
        let sortBy = this._sortSelect.value;
        this._catalogue.SetPhones(PhonesService.sortPhones(this._phones, sortBy));
    }).bind(this));

    this._filter = this._element.querySelector('[data-component="phones-filter"');
    this._filter.addEventListener('input', (event)=>{
        this._catalogue.SetPhones(PhonesService.filterPhones(this._phones, event.target.value));
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;
      PhonesService.getPhoneById(phoneId).then((phone)=>{
          this._catalogue.Hide();
          this._phoneViewer.Show(phone);
      });
    });

    this._phoneViewer.on('onBackButtonClicked', ()=>{
      this._phoneViewer.Hide();
      this._catalogue.Show();
    });

    this._phoneViewer.on('BusketButtonClicked', (event)=>{
        let phone = event.detail;
        this._basket.AddToBasket(phone);
    });

  }
}
