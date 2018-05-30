import Component from '../../component.js';

export default class Search extends Component {
  constructor({ element }) {
    super({ element });

    this._element = element;

    this._render();

    this._element.addEventListener('keyup', this._onSearchInput.bind(this));
  }

  _onSearchInput(event) {
    let search = event.target.value;
    this._trigger('searchInput', search);
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input>
    `;
  }
}