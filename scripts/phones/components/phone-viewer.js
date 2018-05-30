'use strict';

import MainComponent from '../../main-component.js';

export default class PhoneViewer extends MainComponent {
    constructor({ element }) {
        super({ element });

        this._phone = null;

        this._element.addEventListener('click', this._onBackButtonClick.bind(this));
        this._element.addEventListener('click', this._onAddButtonClick.bind(this));
    }

    show(phone) {
        this._phone = phone;
        this._render();

        super.show();

        this._element.querySelector(".phone-thumbs").addEventListener('click', (event) => {
            let target = event.target;

            if (target.tagName != 'IMG') {
                return;
            }
           this._element.querySelector("#mainImg").src = target.src;

        });

    }
    _onAddButtonClick() {
        let addButton = event.target.closest('[data-element="add-button"]');

        if (!addButton) {
            return;
        }

        this._trigger('add', this._phone.id);
    }

    _onBackButtonClick() {
        let backButton = event.target.closest('[data-element="back-button"]');

        if (!backButton) {
            return;
        }

        this._trigger('back');
    }

    _render() {
        let phone = this._phone;

        this._element.innerHTML = `
      <h2>Phone details</h2>

      <div>
        <img class="phone" id = "mainImg" src="${ this._phone.images[0] }">

        <button data-element="back-button">Back to list</button>
        <button data-element="add-button">Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li>
              <img src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;


    }
}