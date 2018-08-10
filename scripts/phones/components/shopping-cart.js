'use strict'

import Component from'../component.js';

export default class ShoppingCart extends Component {
    constructor ({element}) {
        super({element});
        this._items = [];
        this._render();
        this.on('click', this._onClick.bind(this), '[data-element = "remove"]');
    };

    _onClick(event) {
        let itemToRemove = event.target.closest('li');
        this._trigger('remove', itemToRemove);

    }

    removeItem(item) {
        let itemName = item.querySelector('.cart__item-name').textContent;
        let itemNum = this._items.indexOf(itemName);

        if(itemNum != -1) {
            this._items.splice(itemNum, 1);
        }

        item.remove();
    }

    addItem(item) {
        this._items = [
            ...this._items,
            item
        ];

        this._render();
    };

    _render() {
        this._element.innerHTML = `
        <p>Shopping Cart</p>
          <ul>
            ${ 
                this._items.length > 0 
                ? this._getItemsHtml() 
                : '<p>no items yet</p>' 
            }
          </ul>
        `;
    };

    _getItemsHtml() {
        let html = '';

        for (let item of this._items) {
            html += `<li class="cart__item"><p class="cart__item-name">${item}<p><span data-element="remove">☓<span></li>`;
        }

        return html;
    }
}