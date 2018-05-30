'use strict';

export default class Searching {
	constructor({ element }) {
		this._element = element;

		this._onSearchInput = this._onSearchInput.bind(this);

		this._render();

		this._element.addEventListener('keyup', this._onSearchInput);
	}

	on(eventName, callback) {
		this._element.addEventListener(eventName, callback);
	}

	_render() {
		this._element.innerHTML += `
            <input>
		`;
	}
	
	_onSearchInput(event) {
	  let search = event.target.value;
	  let customEvent = new CustomEvent('searchInput', {
	    detail: search
	  });

	  this._element.dispatchEvent(customEvent);
	}	
}