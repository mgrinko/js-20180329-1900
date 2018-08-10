'use strict';
import Component from "../component.js";

export default class PhonesSearch extends Component {

    constructor({element}) {
        super({element});

        this._render();
        this._onKeyUp = this._onKeyUp.bind(this);
        this.on('keyup', this._onKeyUp);
    }

    _render() {
        this._element.innerHTML = `
        Search:
        <input>
        `
        this._elementInput = this._element.querySelector('input');
    }

    _onKeyUp() {
        let elementInputValue = this._elementInput.value;
        this._trigger('userSearchUpdate', elementInputValue);
    }
};