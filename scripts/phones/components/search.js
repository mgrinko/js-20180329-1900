import Component from '../../component.js';

export default class Search extends Component {
  constructor({ element }) {
    super({ element });

    this._query = '';
    this._render();

    this.on('input', (event) => {
      this._query = event.target.value;
      this._trigger('search', this._query);
    });
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input>
    `;
  }
}