'use strict';
import MainComponent from './main-component.js';

export default class PhonesSearch extends MainComponent {
  constructor({element}) {
    super(element);

    this._element = element;

    this._element.addEventListener('input', this.debounced(300, this._onSearch.bind(this)) );
  }

  _onSearch(event) {
    let customEvent = new CustomEvent('phoneSearch', {
      detail: event.target.value
    });

    this._element.dispatchEvent(customEvent);
  }
}