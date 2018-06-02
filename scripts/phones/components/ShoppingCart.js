import BaseComponent from "./BaseComponent.js";

export default class ShoppingCart extends BaseComponent{
    constructor(element){
        super(element);
        this._phones = [];

        this._element.addEventListener('click', (event)=>{
            let delButton = event.target.closest('[data-element="del-button"]');
            if (!delButton) {
                return;
            }
            let item = event.target.closest('[data-phone-id]');
            if (!item){
                return;
            }
            this.RemoveFromBasket(item.dataset.phoneId);
        });

        this._render();
    }

    AddToBasket(phone){
        if (this._phones.findIndex((ph)=>{return ph.id === phone.id;}) > -1){
            alert('Already in basket!');
        }
        else{
            this._phones.push(phone);
            this._render();
        }
    }

    _render(){
        this._element.innerHTML = `
        <p>Shopping Cart</p>
          <ul>
            ${this._phones.map((phone)=>{return `<li><div data-phone-id="${phone.id}"><span>${phone.name} </span><button data-element="del-button">Remove</button></div></li>`}).join('')} 
          </ul>
        `;
    }

    RemoveFromBasket(phoneId){
        let index = this._phones.findIndex((phone)=>{return phone.id === phoneId;});
        this._phones.splice(index,1);
        this._render();
    }
}