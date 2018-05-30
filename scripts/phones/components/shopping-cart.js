'use strict';

export default class ShoppingCart {
    constructor({ element }) {
        this._element = element;

        this._items = [];

        this._render();

        this._element.addEventListener('click', this._onDeleteItem.bind(this));
    }

    _onDeleteItem() {

        if (event.target.tagName != 'SPAN') {
            return;
        }

        let phoneName = event.target.parentNode.innerText;
        this._items.forEach((item,i) => {
          if(item == phoneName.trim()) {
              this._items.splice(this._items.indexOf(i), 1);
          }
        });

        this._render();

    }
    addItem(item) {
        this._items = [
            ...this._items,
            item
        ];

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
        <li>${ item } <span class="glyphicon glyphicon-remove"></span></li>
      `;
        }

        return html;
    }
}