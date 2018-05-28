'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._phone = null;

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onAddImgClick.bind(this));
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

  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
      <h2>Phone details</h2>

      <div>
        <img class="phone" src="${ phone.images[0] }" data-element="largeImg">

        <button data-element="back-button">Back to list</button>
        <button>Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs" id="thumbs" >
          ${phone.images.map((imageUrl) => `
            <li data-element="thumbs-img">
              <img src="${ imageUrl }>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  _onAddImgClick() {
    let largeImg = event.target.closest('[data-element="thumbs-img"]');
   {

      if (!largeImg) {
       
        return;
      }
  
      largeImg = largeImg.parentNode;
    }
  
    

    function onAddImgClick(src, title) {
      largeImg.src = src;
      largeImg.alt = title;
    }
  }
}
