'use strict';

export default class PhonesSorting {
  constructor({element, phones, phonesCatalogue}) {
    this._element = element;
    this._phones = phones;
    this._phonesCatalogue = phonesCatalogue;

    this._element.addEventListener('change', this._onSorting.bind(this));
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _onSorting(event) {
    let customEvent = new CustomEvent('phoneSorting', {
      detail: event.target.value
    });

    this._element.dispatchEvent(customEvent);
  }
}