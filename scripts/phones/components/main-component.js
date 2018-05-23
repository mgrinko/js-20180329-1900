export default class MainComponent {
	constructor({element}) {
		this._element = element;
	}

	on(eventName, callback) {
		this._element.addEventListener(eventName, callback);
	}

	debounced(delay, callback) {
	  let timerId;
	  return function (...args) {
	    clearTimeout(timerId);

	    timerId = setTimeout(() => {
	      callback(...args);
	    }, delay);
	  }
	}
}