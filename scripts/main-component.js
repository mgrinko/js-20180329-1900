"use strict"

export default class MainComponent {
    constructor({element}) {
        this._element = element;
    }

    on(eventName, callback) {
        this._element.addEventListener(eventName, callback);
    }

    _trigger(eventName, detail) {
        let customEvent = new CustomEvent(eventName, { detail });

        this._element.dispatchEvent(customEvent);
    }
    hide() {
        this._element.classList.add('js-hidden');
    }

    show() {
        this._element.classList.remove('js-hidden');
    }

}
