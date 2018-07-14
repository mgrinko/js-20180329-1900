'use strict'

export default class PhonesSearch {

    constructor({element}) {
        this._element = element;
        this._render();
        this._onKeyUp = this._onKeyUp.bind(this);
        this._element.addEventListener('keyup', this._onKeyUp);
    }

    _render() {
        this._element.innerHTML = `
        Search:
        <input>
        `
        this._elementInput = this._element.querySelector('input');
    }

    _onKeyUp() {
        let customEvent = new CustomEvent('filterUpdate', {
            bubbles: true
        });
        this._element.dispatchEvent(customEvent);
    }

    search(phones) {
        let updatedPhonesBase = [];
        for(let i = 0; i < phones.length; i++) {
            let phoneName = phones[i].name.toLowerCase();
            let inputValue = this._elementInput.value.toLowerCase();
            if(phoneName.indexOf(inputValue) !== -1) {
                updatedPhonesBase.push(phones[i]);
            }
        } 
        return updatedPhonesBase;
    }
};