'use strict';


import MainComponent from "./main-component";

export default class PhoneSorting extends MainComponent {
    constructor({element, phones}) {
        super(element);
        this._element = element;
        this._phones = phones;

        this._element.addEventListener('change', this._changeSelectedItem.bind(this));
    }

    _changeSelectedItem(event) {

        let selectedIndex = event.target.selectedIndex;
        this._sort(event.target.value, this._element.options[selectedIndex].dataset.type);

        let customEvent = new CustomEvent('phoneSorting');
        this._element.dispatchEvent(customEvent);
    }

    _sort(value, type) {

        if (type == 'number') {
            this._sortNumber(value);
        }

        if (type == 'text') {
            this._sortText();

        }
        if (type == 'date') {
            this._sortDate();

        }

    }

    _sortNumber(value) {

        this._phones.sort((phone1, phone2) => {
            console.log(phone1);
            console.log(phone2);
           return phone1.value - phone2.value;
        });
    }

    _sortText() {
        this._phones.sort((phone1, phone2) => {
            return phone1.value.toLowerCase() > phone2.value.toLowerCase();
        });
    }

    _sortDate() {


    }


}
