'use strict';
import MainComponent from './main-component.js';

export default class PhonesCatalogue extends MainComponent{
  constructor({ element, phones }) {
    super(element);

    this._element = element;
    this._phones = phones;
    this._onPhoneClick = this._onPhoneClick.bind(this);

    this
      ._sort(document.querySelector('[data-component="phones-sorting"]').value)
      ._render();

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

    this._element.dispatchEvent(customEvent);
  }

  _sort(value) {
    this._phones.sort((a, b) => {
      var textA = a[value].toString().toUpperCase();
      var textB = b[value].toString().toUpperCase();

      return textA.localeCompare(textB, undefined, {numeric: true, sensitivity: 'base'})
    });

    return this;
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