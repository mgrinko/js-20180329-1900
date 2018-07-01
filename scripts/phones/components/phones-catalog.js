'use strict';

import Component from'../component.js';

export default class PhonesCatalogue extends Component {
  constructor({ element, phones }) {
    super({element});
    this._phones = phones;

    this.updateCatalogue =  this.updateCatalogue.bind(this);

    this._render();
    this._element.addEventListener('click', this._onDetailsTriggerClick.bind(this));
    this._element.addEventListener('click', this._onAddButtonClick.bind(this));
  }

  _onDetailsTriggerClick(event) {
    let trigger = event.target.closest('[data-element="details-trigger"]');
    let phoneElement =  event.target.closest('[data-element="phone"]');

    if (!trigger) {
      return;
    };

    this._trigger('phoneSelected', {detail: phoneElement.dataset.phoneId});
  }

  _onAddButtonClick(event) {
    let addButton = event.target.closest('[data-element="add-button"]');
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!addButton) {
      return;
    };

    this._trigger('add', phoneElement.dataset.phoneId);
  }

  updateCatalogue(phones) {
    this._phones = phones;
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones" data-element="phones">
      
        ${
          this._phones
            .map((phone) => `
              <li class="thumbnail"
                  data-element="phone"
                  data-phone-id="${ phone.id }">
                  
                <a href="#!/phones/${ phone.id }"
                   data-element="details-trigger"
                   class="thumb">
                  <img alt="${ phone.name }"
                       src="${ phone.imageUrl }">
                </a>

                <div class="phones__btn-buy-wrapper">
                  <a class="btn btn-success" data-element="add-button">Add</a>
                </div>
                
                <a href="#!/phones/${ phone.id }"
                   data-element="details-trigger">
                  ${ phone.name }
                </a>
                
                <p>${ phone.snippet }</p>
              </li> 
            `)
            .join('')
        }
             
      </ul>    
    `;
  }
}