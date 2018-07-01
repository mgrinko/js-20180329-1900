'use strict'

export default class PhonesSearch {

    constructor({element, phones}) {
        this._element = element;
        this._render();
        this.phones = phones;
        this.updatedPhonesBase = [];
        this._updatePhonesBase = this._updatePhonesBase.bind(this);
        this._element.addEventListener('keyup', this._updatePhonesBase);
    }

    _render() {
        this._element.innerHTML = `
        Search:
        <input>
        `
    }

    _updatePhonesBase(event) {
        this.updatedPhonesBase = [];

        for(let i = 0; i < this.phones.length; i++) {
            let phoneName = this.phones[i].id.toLowerCase();
            let inputValue = this.element.value.toLowerCase();
            if(phoneName.indexOf(inputValue) !== -1) {
                this.updatedPhonesBase .push(this.phones[i]);
            }
        }

        let customEvent = new CustomEvent('searchUpdate', {
            detail: this.updatedPhonesBase,
            bubbles: true
        })

        this.element.dispatchEvent(customEvent);
        
    }
};