'use strict';

import BaseComponent from "./BaseComponent.js";

export default class PhonesCatalogue extends BaseComponent{
  constructor({ element, phones }) {
    super(element);
    this._phones = phones;
    this._sort = 'name';
    this._filtr = null;

    this._onPhoneClick = this._onPhoneClick.bind(this);

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
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
            .sort((f1, f2)=>{
                  return f1[this._sort] > f2[this._sort] ? 1 : -1;
            })
              .filter((phone)=>{
                return !this._filtr || phone.name.toLowerCase().indexOf(this._filtr) > -1;
              })                         
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

  Sort(sortVal){
    if (sortVal){
        this._sort = sortVal.toLowerCase();
    }
    this._render();
  }

  Filtr(filtr){
    this._filtr = filtr.toLowerCase();
    this._render();
  }
}