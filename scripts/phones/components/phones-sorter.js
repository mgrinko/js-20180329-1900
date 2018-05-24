'use strict';

import Component from "../../common/component.js";

export default class PhonesSorter extends Component {

    constructor({ element }) {
        super({ element });
        this._onSortingSelected = this._onSortingSelected.bind(this);

        this._render();
        this._sorter = this._element.querySelector('[data-component="phone-sorter-select"]');
        this._sorter.addEventListener('change', this._onSortingSelected);
        this._currentSortOption = this._sorter.value;
    }

    _onSortingSelected(event) {
        this._currentSortOption = event.target.value;

        const customEvent = new CustomEvent('sortingSelected', {
            bubbles: true,
            detail: { propertyName: this._currentSortOption }
        });

        this._sorter.dispatchEvent(customEvent);
    }

    _render() {
        this._element.innerHTML = `
            Sort by:
            <select data-component="phone-sorter-select">
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
        `
    }

    sortByCurrentOption(phones) {
        return this.sortBy({propertyName: this._currentSortOption, phones: phones});
    }

    sortByAge(phones) {
        return phones.sort((previous, next) => previous.age - next.age)
    }

    sortByName(phones) {
        return phones.sort((previous, next)  => {
            if (previous.name < next.name) {
                return -1;
            }
            if (previous.name > next.name) {
                return 1;
            }

            return 0;
        })
    }

    sortBy({propertyName, phones}) {
        if ('age' === propertyName) {
            return this.sortByAge(phones);
        } else {
            return this.sortByName(phones)
        }

    }

}