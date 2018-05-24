'use strict';

export default class Component {

    constructor({ element }) {
        this._element = element;
    }

    on(event, callback) {
        this._element.addEventListener(event, callback)
    }

}