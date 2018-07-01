'use strict'

export default class PhonesFilter {

    constructor(element) {
        this.element = element;
        this._onInput = this._onInput.bind(this);
        // this.element.addEventListener('input', this._onInput);
    }


    _onInput(event) {

        let customEvent = new CustomEvent('sortUpdate', {
            detail: this._chooseSort(event.target.value),
            bubbles: true
        });

        this.element.dispatchEvent(customEvent);

    }

    _chooseSort(name) {
        switch (name) {
            case 'name':
            return function(a, b) {
                if(a.id < b.id) return -1;
                if(a.id > b.id) return 1;
                return 0;
            };
            break;

            case 'age':
            return function(a, b) {
                return +a.age - +b.age
            }
        }
    };

}