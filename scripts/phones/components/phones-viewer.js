'use strict';
import BaseComponent from "./BaseComponent.js";

export default class PhonesViewer extends BaseComponent{
    constructor(element) {
        super(element);
        this._phone = null;
    }

    Show(phone){
        this._phone = phone;
        this._render();
        this._backbutton = this._element.querySelector('[data-element="back-button"]');
        this._backbutton.addEventListener('click', ()=>this.Trigger(new CustomEvent('onBackButtonClicked')));
        this._element.querySelector('[data-element="basket-button"]').addEventListener('click', ()=>this.Trigger(new CustomEvent('BusketButtonClicked', {detail: phone})));
        super.Show();
    }

    _render() {
        let phone = this._phone;

        this._element.innerHTML =
      `<h2>Phone details</h2>
      <div>
        <img class="phone" src="${ phone.imageUrl }">
        <button data-element="back-button">Back to list</button>
        <button data-element="basket-button">Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.snippet }</p>
        
        
      </div>`;

    }
}