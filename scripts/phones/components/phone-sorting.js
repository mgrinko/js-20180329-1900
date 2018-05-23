'use strict';


import MainComponent from "./main-component";

export default class PhoneSorting extends MainComponent {
    constructor({element, phones}) {
        super(element);
        this._element = element;

        this._element.addEventListener('change', this._changeSelectedItem.bind(this));
    }

    _changeSelectedItem(event) {
        let selectedIndex = event.target.selectedIndex;

        let customEvent = new CustomEvent('phoneSorting', {
            detail: {
                value: this._element.value,
                type: this._element.options[selectedIndex].dataset.type
            }
        });
        this._element.dispatchEvent(customEvent);
    }

}
