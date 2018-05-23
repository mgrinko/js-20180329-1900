"use strict"
import MainComponent from "./main-component";

export default class PhoneSearch extends MainComponent {
    constructor({element}) {
        super(element);

        this._element = element;

        this._element.addEventListener('input', this._onInput.bind(this));
    }

    _onInput() {
        let customEvent = new CustomEvent('phoneSearch', {
            detail: this._element.value
        });

        this._element.dispatchEvent(customEvent);
    }

}
