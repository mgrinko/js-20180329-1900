'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._phone = null;

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onAddButtonClick.bind(this));
    this._element.addEventListener('click', this._onSelectPictureClick.bind(this));    

  }

  show(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  setPicture(url) {
    this._element.querySelector('.phone').src = url;
  }

  _onBackButtonClick() {
    let backButton = event.target.closest('[data-element="back-button"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }

  _onAddButtonClick(event) {
    let addButton = event.target.closest('[data-element="add-button"]');

    if (!addButton) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone');

    this._trigger('add', phoneElement.dataset.phoneId);
  }

  _onSelectPictureClick() {
    let selectPicture = event.target.closest('[data-element="select-picture"]');

    if(!selectPicture) {
      return;
    }

    this._trigger('selectPicture', selectPicture.src);
  }

  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
      <h2>Phone details</h2>

      <div data-element="phone"
           data-phone-id="${ phone.id }">

        <img class="phone" src="${ phone.images[0] }">

        <button data-element="back-button">Back to list</button>
        <button data-element="add-button">Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li>
              <img data-element="select-picture" src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}