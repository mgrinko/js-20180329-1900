'use strict';
import BaseComponent from "./BaseComponent.js";

export default class PhonesViewer extends BaseComponent{
    constructor(element) {
        super(element);
        this._phone = null;
        this._element.addEventListener('click',(event)=> {
            let backbutton = event.target.closest('[data-element="back-button"]');
            if (!backbutton){
                return;
            }
            this.Trigger(new CustomEvent('onBackButtonClicked'));
        });

        this._element.addEventListener('click',(event)=> {
            let basketbutton = event.target.closest('[data-element="basket-button"]');
            if (!basketbutton){
                return;
            }
            this.Trigger(new CustomEvent('BusketButtonClicked', {detail: this._phone}));
        });

        this._element.addEventListener('click',(event)=> {
            let img = event.target.closest('[data-element="smallPicture"]');
            if (!img){
                return;
            }
            this._element.querySelector('[data-element="BigPicture"]').src = this._phone.images[img.dataset.imageindex];
        });
    }

    Show(phone){
        this._phone = phone;
        this._render();
        super.Show();
    }

    _render() {
        let phone = this._phone;

        this._element.innerHTML = `
      <h2>Phone details</h2>
      <div>
        <img data-element="BigPicture" class="phone" src="${ phone.images[0] }">
        <button data-element="back-button">Back to list</button>
        <button data-element="basket-button">Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl, index) => `
            <li>
              <img data-element="smallPicture" data-imageIndex="${index}" src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    }
}