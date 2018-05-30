'use strict';

import Component from '../../component.js';

export default class ShoppingCart extends Component{
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._items = [];

    this._render();

    this._element.addEventListener('click', this._onRemoveButtonClick.bind(this));
  }

  _onRemoveButtonClick(event) {
    let removeButton = event.target.closest('[data-element="remove-button"]');

    if (!removeButton) {
      return;
    }

    this._trigger('remove', removeButton.dataset.itemId);
  }

  addItem(item) {
    this._items = [
      ...this._items,
      item
    ];

    this._render();
  }

  removeItem(item) {
    this._items.splice(item, 1);

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${this._items.length > 0
          ? this._getItemsHtml()
          : '<p>No items yet</p>'
        }
      </ul>
    `;
  }

  _getItemsHtml() {
    let html = '';

    for (let item of this._items) {
      html += `
        <li>${ item } <button data-element="remove-button" data-item-id="${ this._items.indexOf(item) }">x</button></li>
      `;
    }

    return html;
  }
}