export default class BaseComponent{
    constructor(element){
        this._element = element;
    }

    Hide() {
        this._element.classList.add('js-hidden');
    }

    Show(){
        this._element.classList.remove('js-hidden');
    }

    Trigger(customEvent){
        this._element.dispatchEvent(customEvent);
    }

    on(eventName, callback) {
        this._element.addEventListener(eventName, callback);
    }
}