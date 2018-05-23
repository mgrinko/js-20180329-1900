'use strict';
import MainComponent from "./main-component";

export default class PhonesCatalogue extends  MainComponent {
  constructor({ element, phones }) {
    super(element)

    this._phones = phones;
    this._element = element;

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

    this._element.dispatchEvent(customEvent);
  }

  _search(event) {
    let query = event.detail;
      
    [].forEach.call(this._element.querySelectorAll('.thumbnail'), function(element) {
        if(element.hidden) {
          element.hidden = false;
        }
    });

    this._phones.forEach((phone) => {
       if(!phone.id.includes(query)) {
         let element =  this._element.querySelector(`[data-phone-id="${phone.id}"]`);
           element.hidden = true;
       }
    });

  }
    _sorting(event) {
        let type = event.detail.type;
        let value = event.detail.value;

        if (type == 'number') {
            this._sortNumber(value);
        }

        if (type == 'text') {
            this._sortText(value);
        }

        if (type == 'date') {
            this._sortDate(value);
        }

    }

    _sortNumber(value) {
        this._phones.sort((phone1, phone2) => {
            return phone1[value] - phone2[value];
        });
    }

    _sortText(value) {
        this._phones.sort((phone1, phone2) => {
            return phone1[value].localeCompare(phone2[value]);
        });
    }

    _sortDate(value) { }

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