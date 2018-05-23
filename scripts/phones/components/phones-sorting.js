'use strict';
import MainComponent from './main-component.js';

export default class PhonesSorting extends MainComponent {
  constructor({element}) {
    super(element);

    this._element = element;

    this._element.addEventListener('change', this._onSorting.bind(this));
  }

  _onSorting(event) {
    let customEvent = new CustomEvent('phoneSorting', {
      detail: event.target.value
    });

    this._element.dispatchEvent(customEvent);
  }
}