'use strict'

export default class Sorter {

    constructor(element) {
        this._element = element;
        this._render();
        this._onInput = this._onInput.bind(this);
        this._element.addEventListener('input', this._onInput);
        this.currentFilterFunction = this._chooseSort('age');
    }

    sort(phones) {
        return phones.sort(this.currentFilterFunction);
    }   

    _render() {
        this._element.innerHTML = `
            Sort by:
            <select>
            <option value="name">Alphabetical</option>
            <option value="age" selected>Newest</option>
            </select>
        `;
    }

    _onInput(event) {   
        
        this.currentFilterFunction = this._chooseSort(event.target.value);

        let customEvent = new CustomEvent('filterUpdate', {
            bubbles: true
        });
        this._element.dispatchEvent(customEvent);
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