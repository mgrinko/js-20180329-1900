"use strict"

export default class MainComponent {
    constructor({ element }) {
        this._element = element;
    }

    on(eventName, callback) {
        this._element.addEventListener(eventName, callback);
    }
}
