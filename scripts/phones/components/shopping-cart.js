'use strict';

import Component from "../../common/component.js";

export default class ShoppingCart extends Component {

    constructor({ element }) {
        super({ element });
        this._phones = [];
        this._render();
        this._onPhoneClick = this._onPhoneClick.bind(this);
        this._element.addEventListener('click', this._onPhoneClick);
    }

    _onPhoneClick(event) {
        let phoneElement = event.target.closest('[data-element="cartPhone"]');

        if (!phoneElement) {
            return;
        }

        let customEvent = new CustomEvent('cartPhoneSelected', {
            detail: { cartPhonePosition: phoneElement.dataset.cartPhonePosition }
        });

        this._element.dispatchEvent(customEvent);
    }

    _render(){
        const phones = this._phones;
        this._element.innerHTML = `
            <p>Shopping Cart</p>
              <ul>
                ${ !phones ? '<li data-element="cartPhone">Cart is empty</li>' :
                   phones
                       .map((phone, index) => `<li data-element="cartPhone" data-cart-phone-position="${ index }" >${ phone }</li>` )
                       .join('')
                }
              </ul>
        `
    }

    addPhoneToCart(phone) {
        this._phones.push(phone);
        this._render();
    }

    removePhoneFromCart(removedPosition){
        this._phones = this._phones.filter((cartPhone, index) => index !== +removedPosition);
        this._render();
    }

}