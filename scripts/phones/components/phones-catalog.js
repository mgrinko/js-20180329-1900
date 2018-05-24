'use strict';

export default class PhonesCatalogue {
  constructor({ element, phones }) {
    this._element = element;
    this._phones = phones;
    this._sort = 'name';

    this._onPhoneClick = this._onPhoneClick.bind(this);

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
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

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${
          this._phones
            .sort((f1, f2)=>{
                  return f1[this._sort] > f2[this._sort] ? 1 : -1;
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
}