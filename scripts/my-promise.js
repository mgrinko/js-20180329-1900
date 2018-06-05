'use strict';

class MyPromise {
  constructor(behaviourFunction) {
    behaviourFunction(this._resolve.bind(this), this._reject.bind(this));

    this._status ='pending';
    this._result = null;

    this._successCallbacks = [];
    this._errorCallbacks = [];
  }

  then(callback) {
    if (this._status === 'fulfilled') {
      callback(this._result);
    } else {
      this._successCallbacks.push(callback);
    }
  }

  catch(errorCallback) {
    this._errorCallbacks.push(errorCallback);
  }

  _resolve(data) {
    if (this._status !== 'pending') {
      return;
    }

    this._status = 'fulfilled';
    this._result = data;

    this._successCallbacks.forEach((callback) => {
      callback(data);
    });
  }

  _reject(error) {
    if (this._status !== 'pending') {
      return;
    }

    this._status = 'rejected';
    this._result = error;

    this._errorCallbacks.forEach((callback) => {
      callback(error);
    });
  }
}
