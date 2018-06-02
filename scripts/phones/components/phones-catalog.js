'use strict';

import BaseComponent from "./BaseComponent.js";

export default class PhonesCatalogue extends BaseComponent{
  constructor({ element}) {
    super(element);

    this._sort = 'name';
    this._filtr = null;

    this._onPhoneClick = this._onPhoneClick.bind(this);
    this._element.addEventListener('click', this._onPhoneClick);
  }

  SetPhones(phones){
      this._phones = phones;
      this._render();
  }


  _onPhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneElement.dataset.phoneId
    });
    this.Trigger(customEvent);
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${
          this._phones
            .map((phone) => `
              <li class="thumbnail"
                  data-element="phone"
                  data-phone-id="${ phone.id }">
                  
                <a href="#!/phones/${ phone.id }"
                   class="thumb">
                  <img alt="${ phone.name }"
                       src="${ phone.imageUrl }">
                </a>
                
                <a href="#!/phones/${ phone.id }">
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