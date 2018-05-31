'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._phone = null;

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onimgSmallClick.bind(this));
  }

  show(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  
  _onimgSmallClick(event) {
    let imgSmall = event.target.closest('[data-element="phone-small"]');
    
    if (!imgSmall) {
      return;
    }
    let phoneLarge = this._element.querySelector('[data-element="phone-large"]');
      phoneLarge.src = imgSmall.src;
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
        <img class="phone" src="${phone.images[0]}" data-element="phone-large">

        <button data-element="back-button">Back to list</button>
        <button>Add to basket</button>
    
        <h1>${phone.name}</h1>
    
        <p>${phone.description}</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li >
              <img data-element="phone-small" src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}