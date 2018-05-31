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

  _onBackButtonClick() {
    let backButton = event.target.closest('[data-element="back-button"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }

  _onimgSmallClick(event) {
    let imgSmall = event.target.closest('[data-element="phone-small"]');
    
    if (!imgSmall) {
      return;
    }

    this._trigger('add', imgSmall.dataset.phoneImgSrc);
 
  }
  
  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
      <h2>Phone details</h2>

      <div>
        <img class="phone" src="${phone.images[0]}" data-element="phone-big">

        <button data-element="back-button">Back to list</button>
        <button>Add to basket</button>
    
        <h1>${phone.name}</h1>
    
        <p>${phone.description}</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li data-element="phone-small">
              <img src="${ imageUrl }" data-element="phone-imgSrc">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}