'use strict';
import MainComponent from './main-component.js';

export default class PhonesSorting extends MainComponent {
  constructor({element, phones, phonesCatalogue}) {
    super(element);
    
    this._element = element;
    this._phones = phones;
    this._phonesCatalogue = phonesCatalogue;

    this._element.addEventListener('change', this._onSorting.bind(this));
  }

  _onSorting(event) {
    let customEvent = new CustomEvent('phoneSorting', {
      detail: event.target.value
    });

    this._element.dispatchEvent(customEvent);
  }
}