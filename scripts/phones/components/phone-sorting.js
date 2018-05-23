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
            this._sortText(value);

        }
        if (type == 'date') {
            this._sortDate(value);

        }

    }

    _sortNumber(value) {
        this._phones.sort((phone1, phone2) => {
           return phone1[value] - phone2[value];
        });
    }

    _sortText(value) {
        this._phones.sort((phone1, phone2) => {
            return phone1[value].localeCompare(phone2[value]);
        });
    }

    _sortDate(value) {


    }


}
