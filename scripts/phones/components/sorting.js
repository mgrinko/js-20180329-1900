'use strict';

import MainComponent from "../../main-component.js";

export default class Sorting extends MainComponent {
    constructor({element}) {
        super(element);

        this._element = element;

        this._element.addEventListener('change', this._changeSelectedItem.bind(this));


        this._render();
    }

    _render() {
        this._element.innerHTML = `
            Sort by:
            <select>
                <option value="name" data-type="text">Alphabetical</option>
                 <option value="age" data-type="number">Newest</option>
            </select>
    `;
    }
    _changeSelectedItem(event) {
        let selectedIndex = event.target.selectedIndex;
        let select = this._element.querySelector("select");

        this._trigger('phoneSorting',  {
            value: select.value,
            type: select.options[selectedIndex].dataset.type
        });
    }

}
