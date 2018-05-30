'use strict';

export default class Sorting {
	constructor({ element }) {
		this._element = element;

		this._onSortSelect = this._onSortSelect.bind(this);

		this._render();

		this._element.addEventListener('change', this._onSortSelect);
	}

	on(eventName, callback) {
		this._element.addEventListener(eventName, callback);
	}

	_render() {
		this._element.innerHTML += `
			<select data-element="sort">
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
		`;
	}
	
	_onSortSelect(event) {
	  let sortBy = event.target.value;
	  let customEvent = new CustomEvent('sortSelected', {
	    detail: sortBy
	  });

	  this._element.dispatchEvent(customEvent);
	}	
}