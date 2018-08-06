'use strict';
import Component from "../component.js";

export default class Sorter extends Component{

    constructor(element) {
        super({element});

        this._render();
        this._onInput = this._onInput.bind(this);
        this._element.addEventListener('input', this._onInput);
    }  

    _render() {
        this._element.innerHTML = `
            Sort by:
            <select data-element="select-options">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
            </select>
        `;
    }

    _onInput() {   
        
        let selectValue = this._element.value;

        if(selectValue) {
            this._trigger('userSortUpdate', selectValue);
        }
    }
}