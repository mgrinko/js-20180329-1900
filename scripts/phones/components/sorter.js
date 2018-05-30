'use strict';

import Component from '../../component.js';

export default class Sorter extends Component {
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._render();

    this._element.addEventListener('change', this._onSortSelect.bind(this));
  }

  _onSortSelect(event) {
    let sortBy = event.target.value;
    this._trigger('sortSelected', sortBy);
  } 

  _render() {
    this._element.innerHTML = `
      Sort by:
      <select>
        <option value="name">Alphabetical</option>
        <option value="age">Newest</option>
      </select>
    `;
  }
}