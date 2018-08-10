'use strict';

import Component from'../component.js';

export default class PhonesCatalogue extends Component {
  constructor({ element}) {
    super({element});
    this._phones = [];
    this._render();
    this.on('click', this._onDetailsTriggerClick.bind(this), '[data-element="details-trigger"]');
    this.on('click', this._onAddButtonClick.bind(this), '[data-element="add-button"]');
  }

  setPhones(phones) {
    this._phones = phones;
    this._render();
  }
  _onDetailsTriggerClick(event) {
    let phoneElement =  event.target.closest('[data-element="phone"]');
    this._trigger('phoneSelected', phoneElement.dataset.phoneId);
  }

  _onAddButtonClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');
    this._trigger('add', phoneElement.dataset.phoneId);
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