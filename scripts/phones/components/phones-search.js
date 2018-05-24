'use strict';

import Component from "../../common/component.js";
import { debounce } from "../../common/utils.js";

export default class PhonesSearch extends Component {

    constructor({ element }) {
        super({ element });

        this._onSearchQueryChanged = this._onSearchQueryChanged.bind(this);
        this._render();
        this._currentQuery = '';
        this._searchInput = this._element.querySelector('[data-component="phone-search-input"]');
        this._searchInput.addEventListener('input', debounce(this._onSearchQueryChanged, 500));
    }

    _onSearchQueryChanged(event) {
        this._currentQuery = event.target.value;
        const customEvent = new CustomEvent('searchQueryChanged', {
            bubbles: true,
            detail: { query: this._currentQuery }
        });

        this._searchInput.dispatchEvent(customEvent)
    }

    _render() {
        this._element.innerHTML = `
             Search:
            <input data-component="phone-search-input">
        `
    }

    filterByCurrentQuery(phones) {
        return this.filter({query: this._currentQuery, phones: phones});
    }

    filter({query, phones}) {
        return phones.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()))
    }

}