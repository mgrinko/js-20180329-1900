'use strict';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  on(eventName, callback, selector = '') {
    this._element.addEventListener(eventName, (event) => {
      if (!selector) {
        callback(event);
        return;
      }

      let element = event.target.closest(selector);

      if (!element || !this._element.contains(element)) {
        return;
      }

      callback(event);
    });
  }

  hide() {
    this._element.classList.add('js-hidden');
  }

  show() {
    this._element.classList.remove('js-hidden');
  }

  _trigger(eventName, detail) {
    let customEvent = new CustomEvent(eventName, { detail });

    this._element.dispatchEvent(customEvent);
  }
}