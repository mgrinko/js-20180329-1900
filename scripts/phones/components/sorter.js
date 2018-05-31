'use strict';

import Component from '../../component.js';

export default class Sorter extends Component{
  constructor({ element }) {
    super({ element });

    this._order = 'name';
    this._render();

    this.on('change', (event) => {
      this._order = event.target.value;

      this._trigger('changeOrder', this._order);
    });
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