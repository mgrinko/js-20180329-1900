/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

var _phonesPage = _interopRequireDefault(__webpack_require__(2));

new _phonesPage.default({
  element: document.querySelector('[data-page-container]')
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(6));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _phonesService = _interopRequireDefault(__webpack_require__(9));

var _phonesCatalog = _interopRequireDefault(__webpack_require__(11));

var _search = _interopRequireDefault(__webpack_require__(19));

var _sorter = _interopRequireDefault(__webpack_require__(20));

var _shoppingCart = _interopRequireDefault(__webpack_require__(21));

var _phoneViewer = _interopRequireDefault(__webpack_require__(26));

var PhonesPage =
/*#__PURE__*/
function () {
  function PhonesPage(_ref) {
    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhonesPage);
    this._element = element;
    this._filter = {
      searchValue: '',
      order: 'name'
    };

    this._initCatalogue();

    this._initSearch();

    this._initSorter();

    this._initCart();

    this._initViewer();

    this._refreshPhones();
  }

  (0, _createClass2.default)(PhonesPage, [{
    key: "_initViewer",
    value: function _initViewer() {
      var _this = this;

      this._viewer = new _phoneViewer.default({
        element: document.querySelector('[data-component="phone-viewer"]')
      });

      this._viewer.on('add', function (event) {
        _this._cart.addItem(event.detail);
      });

      this._viewer.on('back', function () {
        _this._catalogue.show();

        _this._viewer.hide();
      });
    }
  }, {
    key: "_initCart",
    value: function _initCart() {
      var _this2 = this;

      this._cart = new _shoppingCart.default({
        element: document.querySelector('[data-component="shopping-cart"]')
      });

      this._cart.on('remove', function (event) {
        _this2._cart.removeItem(event.detail);
      });
    }
  }, {
    key: "_initSorter",
    value: function _initSorter() {
      var _this3 = this;

      this._sorter = new _sorter.default(document.querySelector('[data-component="phones-filter"'));

      this._sorter.on('userSortUpdate', function (event) {
        _this3._filter.order = event.detail;

        _this3._refreshPhones();
      });
    }
  }, {
    key: "_initSearch",
    value: function _initSearch() {
      var _this4 = this;

      this._search = new _search.default({
        element: document.querySelector('[data-component="phones-search"]')
      });

      this._search.on('userSearchUpdate', function (event) {
        _this4._filter.searchValue = event.detail;

        _this4._refreshPhones();
      });
    }
  }, {
    key: "_initCatalogue",
    value: function _initCatalogue() {
      var _this5 = this;

      this._catalogue = new _phonesCatalog.default({
        element: this._element.querySelector('[data-component="phones-catalog"]')
      });

      this._catalogue.on('add', function (event) {
        _this5._cart.addItem(event.detail);
      });

      this._catalogue.on('phoneSelected',
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(event) {
          var phoneId, phone;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  phoneId = event.detail;
                  _context.next = 3;
                  return _phonesService.default.loadPhone(phoneId);

                case 3:
                  phone = _context.sent;

                  _this5._catalogue.hide();

                  _this5._viewer.show(phone);

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_refreshPhones",
    value: function () {
      var _refreshPhones2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var phones;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _phonesService.default.loadPhones(this._filter);

              case 2:
                phones = _context2.sent;

                this._catalogue.setPhones(phones);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _refreshPhones() {
        return _refreshPhones2.apply(this, arguments);
      };
    }()
  }]);
  return PhonesPage;
}();

exports.default = PhonesPage;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(5);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(6));

var _httpRequest = _interopRequireDefault(__webpack_require__(10));

var PhonesService = {
  loadPhones: function () {
    var _loadPhones = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(filter) {
      var phones, searchedPhones, sortedPhones;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _httpRequest.default.send("/phones");

            case 2:
              phones = _context.sent;
              searchedPhones = this.search(filter, phones);
              sortedPhones = this.sort(filter, searchedPhones);
              ;
              return _context.abrupt("return", sortedPhones);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function loadPhones(_x) {
      return _loadPhones.apply(this, arguments);
    };
  }(),
  loadPhone: function () {
    var _loadPhone = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(phoneId) {
      var phone;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _httpRequest.default.send("/phones/".concat(phoneId));

            case 2:
              phone = _context2.sent;
              return _context2.abrupt("return", phone);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function loadPhone(_x2) {
      return _loadPhone.apply(this, arguments);
    };
  }(),
  sort: function sort(searchOptions, phones) {
    var sortedPhones = [];

    if (searchOptions.order === 'name') {
      sortedPhones = phones.sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    }

    if (searchOptions.order === 'age') {
      sortedPhones = phones.sort(function (a, b) {
        return +a.age - +b.age;
      });
    }

    return sortedPhones;
  },
  search: function search(searchOptions, phones) {
    var searchedPhones = [];

    for (var i = 0; i < phones.length; i++) {
      var phoneName = phones[i].name.toLowerCase();
      var inputValue = searchOptions.searchValue.toLowerCase();

      if (phoneName.indexOf(inputValue) !== -1) {
        searchedPhones.push(phones[i]);
      }
    }

    return searchedPhones;
  },
  _sendRequest: function _sendRequest(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      var fullUrl = BASE_API_URL + url + '.json';
      xhr.open('GET', fullUrl, true);
      xhr.send();

      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        resolve(data);
      };
    });
  }
};
var _default = PhonesService;
exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var BASE_API_URL = 'https://surho.github.io/js-20180329-1900/api';
var HttpService = {
  send: function send(url) {
    return fetch(BASE_API_URL + url + ".json").then(function (response) {
      return response.json();
    });
  }
};
var _default = HttpService;
exports.default = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(12));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(15));

var _inherits2 = _interopRequireDefault(__webpack_require__(16));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(18));

var PhonesCatalogue =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhonesCatalogue, _Component);

  function PhonesCatalogue(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhonesCatalogue);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhonesCatalogue).call(this, {
      element: element
    }));
    _this._phones = [];

    _this._render();

    _this.on('click', _this._onDetailsTriggerClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '[data-element="details-trigger"]');

    _this.on('click', _this._onAddButtonClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '[data-element="add-button"]');

    return _this;
  }

  (0, _createClass2.default)(PhonesCatalogue, [{
    key: "setPhones",
    value: function setPhones(phones) {
      this._phones = phones;

      this._render();
    }
  }, {
    key: "_onDetailsTriggerClick",
    value: function _onDetailsTriggerClick(event) {
      var phoneElement = event.target.closest('[data-element="phone"]');

      this._trigger('phoneSelected', phoneElement.dataset.phoneId);
    }
  }, {
    key: "_onAddButtonClick",
    value: function _onAddButtonClick(event) {
      var phoneElement = event.target.closest('[data-element="phone"]');

      this._trigger('add', phoneElement.dataset.phoneId);
    }
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n      <ul class=\"phones\" data-element=\"phones\">\n      \n        ".concat(this._phones.map(function (phone) {
        return "\n              <li class=\"thumbnail\"\n                  data-element=\"phone\"\n                  data-phone-id=\"".concat(phone.id, "\">\n                  \n                <a href=\"#!/phones/").concat(phone.id, "\"\n                   data-element=\"details-trigger\"\n                   class=\"thumb\">\n                  <img alt=\"").concat(phone.name, "\"\n                       src=\"").concat(phone.imageUrl, "\">\n                </a>\n\n                <div class=\"phones__btn-buy-wrapper\">\n                  <a class=\"btn btn-success\" data-element=\"add-button\">Add</a>\n                </div>\n                \n                <a href=\"#!/phones/").concat(phone.id, "\"\n                   data-element=\"details-trigger\">\n                  ").concat(phone.name, "\n                </a>\n                \n                <p>").concat(phone.snippet, "</p>\n              </li> \n            ");
      }).join(''), "\n             \n      </ul>    \n    ");
    }
  }]);
  return PhonesCatalogue;
}(_component.default);

exports.default = PhonesCatalogue;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(13);

var assertThisInitialized = __webpack_require__(14);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(17);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var Component =
/*#__PURE__*/
function () {
  function Component(_ref) {
    var element = _ref.element;
    (0, _classCallCheck2.default)(this, Component);
    this._element = element;
  }

  (0, _createClass2.default)(Component, [{
    key: "on",
    value: function on(eventName, callback, selector) {
      var _this = this;

      this._element.addEventListener(eventName, function (event) {
        if (!selector) {
          callback(event);
          return;
        }

        var element = event.target.closest(selector);

        if (!element || !_this._element.contains(element)) {
          return;
        }

        callback(event);
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this._element.classList.add('js-hidden');
    }
  }, {
    key: "show",
    value: function show() {
      this._element.classList.remove('js-hidden');
    }
  }, {
    key: "_trigger",
    value: function _trigger(eventName, detail) {
      var customEvent = new CustomEvent(eventName, {
        detail: detail
      });

      this._element.dispatchEvent(customEvent);
    }
  }]);
  return Component;
}();

exports.default = Component;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(12));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(15));

var _inherits2 = _interopRequireDefault(__webpack_require__(16));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(18));

var PhonesSearch =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhonesSearch, _Component);

  function PhonesSearch(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhonesSearch);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhonesSearch).call(this, {
      element: element
    }));

    _this._render();

    _this._onKeyUp = _this._onKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    _this.on('keyup', _this._onKeyUp);

    return _this;
  }

  (0, _createClass2.default)(PhonesSearch, [{
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n        Search:\n        <input>\n        ";
      this._elementInput = this._element.querySelector('input');
    }
  }, {
    key: "_onKeyUp",
    value: function _onKeyUp() {
      var elementInputValue = this._elementInput.value;

      this._trigger('userSearchUpdate', elementInputValue);
    }
  }]);
  return PhonesSearch;
}(_component.default);

exports.default = PhonesSearch;
;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(12));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(15));

var _inherits2 = _interopRequireDefault(__webpack_require__(16));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(18));

var Sorter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sorter, _Component);

  function Sorter(element) {
    var _this;

    (0, _classCallCheck2.default)(this, Sorter);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Sorter).call(this, {
      element: element
    }));

    _this._render();

    _this._onInput = _this._onInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    _this._element.addEventListener('input', _this._onInput);

    return _this;
  }

  (0, _createClass2.default)(Sorter, [{
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n            Sort by:\n            <select data-element=\"select-options\">\n            <option value=\"name\">Alphabetical</option>\n            <option value=\"age\">Newest</option>\n            </select>\n        ";
    }
  }, {
    key: "_onInput",
    value: function _onInput() {
      var selectValue = this._element.value;

      if (selectValue) {
        this._trigger('userSortUpdate', selectValue);
      }
    }
  }]);
  return Sorter;
}(_component.default);

exports.default = Sorter;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(22));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(12));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(15));

var _inherits2 = _interopRequireDefault(__webpack_require__(16));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(18));

var ShoppingCart =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ShoppingCart, _Component);

  function ShoppingCart(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, ShoppingCart);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ShoppingCart).call(this, {
      element: element
    }));
    _this._items = [];

    _this._render();

    _this.on('click', _this._onClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '[data-element = "remove"]');

    return _this;
  }

  (0, _createClass2.default)(ShoppingCart, [{
    key: "_onClick",
    value: function _onClick(event) {
      var itemToRemove = event.target.closest('li');

      this._trigger('remove', itemToRemove);
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      var itemName = item.querySelector('.cart__item-name').textContent;

      var itemNum = this._items.indexOf(itemName);

      if (itemNum != -1) {
        this._items.splice(itemNum, 1);
      }

      item.remove();
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      this._items = (0, _toConsumableArray2.default)(this._items).concat([item]);

      this._render();
    }
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n        <p>Shopping Cart</p>\n          <ul>\n            ".concat(this._items.length > 0 ? this._getItemsHtml() : '<p>no items yet</p>', "\n          </ul>\n        ");
    }
  }, {
    key: "_getItemsHtml",
    value: function _getItemsHtml() {
      var html = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          html += "<li class=\"cart__item\"><p class=\"cart__item-name\">".concat(item, "<p><span data-element=\"remove\">\u2613<span></li>");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return html;
    }
  }]);
  return ShoppingCart;
}(_component.default);

exports.default = ShoppingCart;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(23);

var iterableToArray = __webpack_require__(24);

var nonIterableSpread = __webpack_require__(25);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7));

var _createClass2 = _interopRequireDefault(__webpack_require__(8));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(12));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(15));

var _get2 = _interopRequireDefault(__webpack_require__(27));

var _inherits2 = _interopRequireDefault(__webpack_require__(16));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(14));

var _component = _interopRequireDefault(__webpack_require__(18));

var PhoneViewer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhoneViewer, _Component);

  function PhoneViewer(_ref) {
    var _this;

    var element = _ref.element;
    (0, _classCallCheck2.default)(this, PhoneViewer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PhoneViewer).call(this, {
      element: element
    }));
    _this._phone = null;

    _this.on('click', _this._onBackButtonClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '[data-element="back-button"');

    _this.on('click', _this._onAddButtonClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '[data-element="add-button"]');

    _this.on('click', _this._onThumbClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), '.phone-item');

    return _this;
  }

  (0, _createClass2.default)(PhoneViewer, [{
    key: "show",
    value: function show(phone) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(PhoneViewer.prototype), "show", this).call(this);
      this._phone = phone;

      this._render();
    }
  }, {
    key: "_onBackButtonClick",
    value: function _onBackButtonClick() {
      this._trigger('back');
    }
  }, {
    key: "_onAddButtonClick",
    value: function _onAddButtonClick() {
      this._trigger('add', this._phone.name);
    }
  }, {
    key: "_onThumbClick",
    value: function _onThumbClick() {
      var thumbImage = event.target.closest('img');

      if (thumbImage) {
        var bigImage = document.querySelector('.phone');
        bigImage.src = thumbImage.src;
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      this._element.innerHTML = "\n    <div>\n        <h2>Phone details</h2>\n        <div>\n          <img class=\"phone\" src=\"".concat(this._phone.images[0], "\">\n      \n          <button data-element=\"back-button\">Back</button>\n          <button data-element=\"add-button\">Add to basket</button>\n      \n      \n          <h1>").concat(this._phone.name, "</h1>\n      \n          <p>").concat(this._phone.description, "</p>\n      \n          <ul class=\"phone-thumbs\">\n            ").concat(this._phone.images.map(function (phone) {
        return "<li class=phone-item><img src=\"".concat(phone, "\"></li>");
      }).join(''), "\n          </ul>\n      \n          <ul class=\"specs\">\n            <li>\n              <span>Availability and Networks</span>\n              <dl>\n                <dt>Availability</dt>\n                <dd></dd>\n              </dl>\n            </li>\n            <li>\n              <span>Battery</span>\n              <dl>\n                <dt>Type</dt>\n                <dd>Other ( mAH)</dd>\n                <dt>Talk Time</dt>\n                <dd>24 hours</dd>\n                <dt>Standby time (max)</dt>\n                <dd>336 hours</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Storage and Memory</span>\n              <dl>\n                <dt>RAM</dt>\n                <dd>1000MB</dd>\n                <dt>Internal Storage</dt>\n                <dd>32000MB</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Connectivity</span>\n              <dl>\n                <dt>Network Support</dt>\n                <dd></dd>\n                <dt>WiFi</dt>\n                <dd>802.11 b/g/n</dd>\n                <dt>Bluetooth</dt>\n                <dd>Bluetooth 2.1</dd>\n                <dt>Infrared</dt>\n                <dd>\u2718</dd>\n                <dt>GPS</dt>\n                <dd>\u2713</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Android</span>\n              <dl>\n                <dt>OS Version</dt>\n                <dd>Android 3.0</dd>\n                <dt>UI</dt>\n                <dd>Honeycomb</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Size and Weight</span>\n              <dl>\n                <dt>Dimensions</dt>\n                <dd>249.1 mm (w)</dd>\n                <dd>167.8 mm (h)</dd>\n                <dd>12.9 mm (d)</dd>\n                <dt>Weight</dt>\n                <dd>708.0 grams</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Display</span>\n              <dl>\n                <dt>Screen size</dt>\n                <dd>10.1 inches</dd>\n                <dt>Screen resolution</dt>\n                <dd>WXGA (1200 x 800)</dd>\n                <dt>Touch screen</dt>\n                <dd>\u2713</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Hardware</span>\n              <dl>\n                <dt>CPU</dt>\n                <dd>1 GHz Dual Core Tegra 2</dd>\n                <dt>USB</dt>\n                <dd>USB 2.0</dd>\n                <dt>Audio / headphone jack</dt>\n                <dd>3.5mm</dd>\n                <dt>FM Radio</dt>\n                <dd>\u2718</dd>\n                <dt>Accelerometer</dt>\n                <dd>\u2713</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Camera</span>\n              <dl>\n                <dt>Primary</dt>\n                <dd>5.0 megapixels</dd>\n                <dt>Features</dt>\n                <dd>Flash, Video</dd>\n              </dl>\n            </li>\n            <li>\n              <span>Additional Features</span>\n              <dd>Sensors: proximity, ambient light, barometer, gyroscope</dd>\n            </li>\n          </ul>\n        </div>\n      </div>");
    }
  }]);
  return PhoneViewer;
}(_component.default);

exports.default = PhoneViewer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(15);

var superPropBase = __webpack_require__(28);

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(15);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map