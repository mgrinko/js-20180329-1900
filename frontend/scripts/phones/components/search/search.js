import Component from '../../../component.js';
import template from 'raw-loader!./search.html';

import './search.css';

export default class Search extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this.on('input', (event) => {
      this._trigger('search', event.target.value);
    });
  }

  _render() {
    this._element.innerHTML = template;
  }
}