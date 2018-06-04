'use strict';

import Component from '../../../component.js';
import templateFunction from './phones-catalog.hbs';

export default class PhonesCatalogue extends Component{
  constructor({ element }) {
    super({ element });

    this._phones = [];
    this._render();

    this._element.addEventListener('click', this._onDetailsTriggerClick.bind(this));
    this._element.addEventListener('click', this._onAddButtonClick.bind(this));
  }

  setPhones(phones) {
    this._phones = phones;
    this._render();
  }

  _onDetailsTriggerClick(event) {
    let trigger = event.target.closest('[data-element="details-trigger"]');

    if (!trigger) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');

    this._trigger('phoneSelected', phoneElement.dataset.phoneId);
  }

  _onAddButtonClick(event) {
    let addButton = event.target.closest('[data-element="add-button"]');

    if (!addButton) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');

    this._trigger('add', phoneElement.dataset.phoneId);
  }

  _render() {
    this._element.innerHTML = templateFunction({
      phones: this._phones,
    });
  }
}
