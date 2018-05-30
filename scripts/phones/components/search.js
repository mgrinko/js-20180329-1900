"use strict"

import MainComponent  from '../../main-component.js';

export default class Search extends MainComponent {
    constructor({element}) {
        super(element);

        this._element = element;

        this._element.addEventListener('input', this._onInput.bind(this));

        this._render();
    }

    _render() {
        this._element.innerHTML = `
           Search:
           <input>
        `;
    }

    _onInput() {
        let customEvent = new CustomEvent('phoneSearch', {
            detail: this._element.value
        });

        this.element.dispatchEvent(customEvent);
    }

}
