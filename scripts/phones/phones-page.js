'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;


    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: PhonesService.getPhones(),
    });

    this._sortSelect = this._element.querySelector('[data-component="phones-sort"]');
    this._sortSelect.onchange = _sortChanged.bind(this);
    function _sortChanged(){
        let sortVal = this._sortSelect.value;
        this._catalogue.Sort(sortVal);
    };

    //так и не понял, почему в этом варианте обработчик вообще не вызывается
    /*this._sortSelect.addEventListener('onchange', (function () {
        let sortVal = this._sortSelect.value;
        this._catalogue.Sort(sortVal);
    }).bind(this));*/


      // this._catalogue._element.addEventListener('phoneSelected', (event) => {
    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;
      console.log(phoneId);
    });


  }
}
