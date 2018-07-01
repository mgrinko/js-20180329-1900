'use strict';

export default class Sorter {
    constructor ({element}) {
        this._element = element;

        this._render();
    }

    _render() {
        this._element.innerHTML = `
        <p>
            Sort by:
            <select data-component="phones-filter">
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        `;
    }
}