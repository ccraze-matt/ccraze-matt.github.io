'use strict';
var slice = [].slice;

(function() {

  /*
   * noop is a no-operation function.
   * an empty placeholder for situations that require
   * a function, but for which you don't want real
   * function to run.
   *
   * this just lets me use a shorter syntax for an
   * empty function. `noop` rather than `function () {}`.
   *
   * i'm a tad unhappy with coffeescript's options for
   * creating empty functions. if I use the thin arrow alone
   * to make the empty function, coffeelint may object if
   * `no_empty_functions` is enabled. i don't actually want
   * to return `undefined` (or void 0), but that seems
   * to be the minimum function allowed in coffeescript while
   * not creating an error-prone or lint-collecting empty
   * function.
   */
  var $m, after, append, before, classes, debounce, extend, has, isArray, isBoolean, isDate, isElementLike, isInfinity, isNaN, isNumber, isObject, isRegExp, isString, isUndefined, isValidDate, listen, log, noop, objToString, prepend, q, q1, qId, randomInt, ready, remove, root, throttle, trim;
  noop = function() {};

  /**
   *
   * Define `log` as convenience alias to console.log, either via `bind`
   * or `apply`, or as noop if `console` does not exist.
   *
   * @return {function} An alias for console.log or noop.
   *
   */
  if (typeof Function.prototype.bind !== 'undefined') {
    log = console.log.bind(console);
  } else if (typeof (typeof console !== "undefined" && console !== null ? console.log : void 0) === 'function') {
    log = function(args) {
      return console.log.apply(console, args);
    };
  } else {
    log = noop;
  }

  /*
   * `has` will hold feature-detected booleans.
   */
  has = {
    addEventListener: !!(typeof EventTarget !== "undefined" && EventTarget !== null ? EventTarget.prototype.addEventListener : void 0)
  };

  /*
   * ready() will either
   * -1- run the function immediately (if
   *     the document is already loaded or if document is not
   *     a global in the current environment), or
   * -2- add the function to the queue of functions
   *     waiting to run when DOMContentLoaded is fired.
   *
   * DONE: make compatible with IE8. Need attachEvent.
   *
   * I don't think this is properly compatible with IE6 and IE7.
   * And seems to not work for kindle experimental browser either,
   * however, jQuery's ready runction works for both of these cases.
   *
   * Stolen and enhanced mostly from http://youmightnotneedjquery.com/
   */
  ready = function(fn) {
    if (!document || document.readyState !== 'loading') {
      return fn();
    } else if (has.addEventListener) {
      return document.addEventListener('DOMContentLoaded', fn);
    } else {
      return document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') {
          return fn();
        }
      });
    }
  };

  /*
   * noop is a no-operation function.
   * an empty placeholder for situations that require
   * a function, but for which you don't want real
   * function to run.
   *
   * this just lets me use a shorter syntax for an
   * empty function. `noop` rather than `function () {}`.
   *
   * i'm a tad unhappy with coffeescript's options for
   * creating empty functions. if I use the thin arrow alone
   * to make the empty function, coffeelint may object if
   * `no_empty_functions` is enabled. i don't actually want
   * to return `undefined` (or void 0), but that seems
   * to be the minimum function allowed in coffeescript while
   * not creating an error-prone or lint-collecting empty
   * function.
   */
  noop = function() {};

  /*
   * create a static method shortcut to the
   * Object's toString method.
   */
  objToString = Object.prototype.toString;

  /*
   *
   * BEGIN type testing
   *
   * original logic for type testing mostly from
   * http://stackoverflow.com/a/17141149/1298086
   *
   * Do we want to answer "true" for the object version
   * of these primitives? They can still be used in the same
   * contexts as the primitives, right? and that's what these
   * tests are all about.???
   *
   * TODO - use polyfilled native functions.
   *
   */
  isNaN = function(x) {
    return x !== +x;
  };
  isRegExp = function(x) {
    return x === RegExp(x);
  };
  isUndefined = function(x) {
    return x === [][0];
  };

  /*
   * modified from original to answer true for numbers
   * constructed with the Number constructor.
   * e.g. `new Number()`.
   *
   * Similar to our treatment of isArray, we should
   * use the native `Number.isNumber` and polyfill it
   * with the logic from this function.
   */
  isNumber = function(x) {
    return x.valueOf() === x + 0;
  };

  /*
   * modified from original to answer true for booleans
   * constructed with the Boolean constructor.
   * e.g. `new Boolean()`.
   */
  isBoolean = function(x) {
    return x.valueOf() === !!x.valueOf();
  };

  /*
   * I made these up, and I'm not sure how backward-compatible
   * they are.
   */
  isInfinity = function(x) {
    return x === 1 / 0 || x === -1 / 0;
  };

  /*
   * see polyfill below for browsers/engines not
   * supporting Array.isArray().
   */
  isArray = function(x) {
    return Array.isArray(x);
  };

  /*
   * polyfill for Array.isArray()
   * which is required by our isArray() function, but is
   * only available in IE since v9.
   * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Browser_compatibility
   */
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return objToString.call(arg) === '[object Array]';
    };
  }

  /*
   * from: http://stackoverflow.com/a/14706877/1298086
   */
  isObject = function(x) {
    return x === Object(x);
  };

  /*
   * modified isString test from
   * http://stackoverflow.com/a/9436948/1298086
   * see for a comparison of methods.
   *
   * modified from original to answer true for strings
   * constructed with the String constructor.
   * e.g. `new String(123)`.
   */

  /*
  isString = (x) ->
    return x.valueOf() == x+""
   */
  isString = function(x) {
    return typeof x === 'string' || x instanceof String;
  };

  /*
   * instanceof is significantly faster than
   * objToString, so we'll optimize for the case
   * where x originated from the same frame/document/root
   * where this function is running. i.e., check instanceof
   * first.
   * see also http://jsperf.com/isdate/2
   *
   * also worth consideration, duck typing is faster
   * than instanceof. see http://jsperf.com/isdate-duck-typing-vs-instanceof/3
   * but I don't trust ducktyping quite as much...
   */
  isDate = function(x) {
    return x instanceof Date || objToString.call(x) === '[object Date]';
  };

  /*
   * this isn't exactly type-testing, but here it lies.
   */
  isElementLike = function(x) {
    return !!(x && x.nodeType === 1);
  };

  /*
   * END type testing
   */
  isValidDate = function(x) {
    if (!isDate(x)) {
      return false;
    }
    x = x.getTime();
    return x === x;
  };

  /*
   * randomInt should return a random integer inclusively
   * between n1 and n2.
   * TODO - do we need to make sure n1 and n2 are both integers?
   * what's the effect of using floats for n1 and/or n2?
   */
  randomInt = function(n1, n2) {
    return Math.floor(Math.random() * (Math.max(n1, n2) - Math.min(n1, n2) + 1)) + Math.min(n1, n2);
  };

  /*
   * Establish the root object.
   *
   * In the browser, the "window" (aka "self") is the root object.
   * On the server, "global" is the root object.
   *
   * We use self instead of window for WebWorker support.
   * For web worker insights, see
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
   * and http://www.html5rocks.com/en/tutorials/workers/basics/.
   * Essentially, in a browser context, self === window, and in a web worker
   * window is underfined, however self is the worker's global object.
   *
   * But do we really want to add $m to the global object on the server?
   * I think I'd rather add it to module.exports if module.exports exists.
   *
   * Code explanation:
   * -- if self is an object and has a self property, set root = self.
   * --NO-- otherwise, if module exists, module.exports is an object, and exports is the same object as module.exports, then set root = module.exports
   * -- otherwise, if global is an object and has a global property, set root = global.
   *
   */
  root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global);

  /*
   * multi-stolen extend() from
   * http://youmightnotneedjquery.com/#deep_extend
   * and https://github.com/unclechu/node-deep-extend/blob/master/lib/deep-extend.js
   * and https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
   *
   * jquery's version is much simpler.
   * http://james.padolsey.com/jquery/#v=2.1.3&fn=jQuery.extend
   * I need to look at that more closely.
   *
   * look at these too:
   * http://stackoverflow.com/q/171251/1298086
   * http://stackoverflow.com/a/16178864/1298086
   */
  extend = (function() {
    var copyKnownType, findKnownObject, isKnownType, knownObjects;
    isKnownType = function(val) {
      if (val instanceof Date || val instanceof RegExp || ((typeof HTMLElement !== "undefined" && HTMLElement !== null) && val instanceof HTMLElement)) {
        return true;
      } else {
        return false;
      }
    };
    copyKnownType = function(val) {
      if (val instanceof Date) {
        return new Date(val.getTime());
      } else if (val instanceof RegExp) {
        return new RegExp(val);
      } else if (val instanceof HTMLElement) {
        return val;
      } else {
        throw new Error('Unexpected situation');
      }
    };

    /*
    // TODO - I don't think this knownObjects tracker
    //        is working as expected. I need more playtime
    //        to test it. It should work for complex cyclic
    //        objects such as HTMLElements and Nodes,
    //        but it fails.
     */
    knownObjects = [];
    findKnownObject = function(obj) {

      /* search through existing known objects. */
      var j, knownObject, len;
      for (j = 0, len = knownObjects.length; j < len; j++) {
        knownObject = knownObjects[j];
        if (obj === knownObject) {

          /* console.log('found knownObject:', obj, knownObject); */
          return knownObjects[i];
        }
      }

      /*
      // otherwise, push this object onto our knownObjects
      // so we can recognize it when we see it again.
       */
      knownObjects.push(obj);

      /*
      // and return false indicating that we did not
      // find this object.
       */
      return false;
    };
    return function() {
      var j, k, key, knownObject, len, len1, out, ref, source, sources;
      out = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];

      /* console.log('starting extend', arguments); */
      if (out == null) {
        out = {};
      }
      for (j = 0, len = sources.length; j < len; j++) {
        source = sources[j];
        if (!isObject(source)) {
          return;
        }
        ref = Object.keys(source);
        for (k = 0, len1 = ref.length; k < len1; k++) {
          key = ref[k];
          if (isKnownType(source[key])) {
            out[key] = copyKnownType(source[key]);
          } else if (isObject(source[key]) && !isArray(source[key])) {
            knownObject = findKnownObject(source[key]);
            if (knownObject) {
              out[key] = knownObject;
            } else {
              if (!isObject(out[key]) || isArray(out[key])) {
                out[key] = {};
              }
              extend(out[key], source[key]);
            }
          } else {
            out[key] = source[key];
          }
        }
      }
      return out;
    };
  })();

  /*
   * TODO
   * - merge: merge 2 objects, returning the result. Like extend(),
   *          but without mutating any of the input objects.
   *
   * - equals: compare any 2 values for equality. should accept
   *           scalars as well as any object type. include deep
   *           comparisons.
   *           see http://stackoverflow.com/q/1068834/1298086
   *               http://underscorejs.org/docs/underscore.html#section-117
   *               http://www.explainjs.com/explain?src=https://raw.githubusercontent.com/lodash/lodash/master/lodash.src.js (search for "function isEmpty")
   *               http://www.explainjs.com/explain?src=http://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.js (search for "function equals")
   *               https://github.com/emberjs/ember.js/blob/master/packages/ember-runtime/lib/core.js (for date comparison and for use of objects' own isEqual functions)
   *               https://github.com/substack/node-deep-equal
   */

  /*
   * BEGIN HTML Helpers
   *
   * For prepend() and append(), it'd be nice to return a reference to
   * the new element(s) that get created. But without
   * Element.insertAdjacentHTML returning the created elements, it's
   * compilcated. Creating the HTML in a documentFragmenet doesn't seem
   * to help either.
   *
   * TODO: consider creating the elements in the real DOM and then
   *   moving them to their destination after obtaining a reference to
   *   their nodelist.
   *
   */
  qId = function(id) {
    return document.getElementById(id);
  };
  q1 = function(selector) {
    return document.querySelector(selector);
  };
  q = function(selector) {
    return document.querySelectorAll(selector);
  };
  prepend = function(to, content) {
    if (isString(content)) {
      return to.insertAdjacentHTML('afterBegin', content);
    } else {
      return to.insertBefore(content, to.firstChild || null);
    }
  };
  append = function(to, content) {
    if (isString(content)) {
      return to.insertAdjacentHTML('beforeEnd', content);
    } else {
      return to.appendChild(content);
    }
  };
  before = function(newNode, siblingNode) {
    return siblingNode.parentNode.insertBefore(newNode, siblingNode);
  };
  after = function(newNode, siblingNode) {
    return siblingNode.parentNode.insertBefore(newNode, siblingNode.nextSibling);
  };
  remove = function(whichNode) {
    var ref;
    return ((ref = whichNode.parentNode) != null ? ref.removeChild(whichNode) : void 0) || false;
  };

  /*
   * END HTML Helpers
   */

  /*
   * BEGIN Utility Funcs
   */

  /**
   *
   */

  /**
   *
   * Delay the function call until in stops being called.
   * i.e., as long as I'm continuing to call the function
   * returned by debounce, ignore me. When I stop asking,
   * then execute the call.
   *
   * The version below can from David Walsh, who referenced underscore's
   * debounce funtion (a rather old version of it now).
   * http://davidwalsh.name/function-debounce
   *
   * Underscore's description:
   * Returns a function, that, as long as it continues to be invoked,
   * will not be triggered. The function will be called after it stops
   * being called for N milliseconds. If `immediate` is passed, trigger
   * the function on the leading edge, instead of the trailing.
   *
   * A bit more insight:
   * - [The Difference Between Throttling and Debouncing | CSS-Tricks](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
   * - [Debounce and Throttle: a visual explanation | Drupal motion](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
   *
   * For reference:
   * - [lodash/debounce.js at 3.10.1-npm · lodash/lodash](https://github.com/lodash/lodash/blob/3.10.1-npm/function/debounce.js)
   * - [underscore.js debounce function](http://underscorejs.org/docs/underscore.html#section-83)
   *
   *
   * @param  {function} func       function to protect with debounce
   *
   * @param  {integer}  wait       minimum milliseconds to wait before
   *                               believe the requests have idled.
   *
   * @param  {boolean}  immediate  if true, "trigger the function on the
   *                               leading edge, instead of the trailing".
   *                               I haven't used this, and I'm not sure
   *                               I understand it.
   *
   * @return {function}            effectively the same function that was
   *                               passed in, but protected from quickly
   *                               repeated invocation.
   *
   */
  debounce = function(func, wait, immediate) {
    var timeout;
    timeout = null;
    return function() {
      var args, callNow, context, later;
      context = this;
      args = arguments;
      later = function() {
        timeout = null;
        if (!immediate) {
          return func.apply(context, args);
        }
      };
      callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        return func.apply(context, args);
      }
    };
  };

  /*
   * From underscore.js, line 805 as of 2015-sep-25
   * https://github.com/jashkenas/underscore/blob/master/underscore.js#L805
   *
   * Returns a function, that, when invoked, will only be triggered at
   * most once during a given window of time. Normally, the throttled
   * function will run as much as it can, without ever going more than
   * once per `wait` duration; but if you'd like to disable the execution
   * on the leading edge, pass `{leading: false}`. To disable execution
   * on the trailing edge, ditto.
   *
   * Alternative implementations of throttle:
   * - [Simple Throttle Function | Jonathan Sampson](http://sampsonblog.com/749/simple-throttle-function)
   * - [lodash/throttle.js at 3.10.1-npm · lodash/lodash](https://github.com/lodash/lodash/blob/3.10.1-npm/function/throttle.js)
   * - [Throttling function calls](https://remysharp.com/2010/07/21/throttling-function-calls)
   *
   * See also the debounce function for links into further insight.
   *
   * TODO:
   * - maybe allow other scopes for execution of the function?
   *   or I guess we can just bind the function before wrapping it
   *   in the throttle.
   * - allow default `wait` value?
   *
   */
  throttle = function(func, wait, options) {
    var args, context, later, previous, result, timeout;
    context = null;
    args = null;
    result = null;
    timeout = null;
    previous = 0;
    if (!options) {
      options = {};
    }
    later = function() {
      var ref;
      previous = (ref = options.leading === false) != null ? ref : {
        0: Date.now()
      };
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) {
        return context = args = null;
      }
    };
    return function() {
      var now, remaining;
      now = Date.now();
      if (!previous && options.leading === false) {
        previous = now;
      }
      remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /*
   * END Utility Funcs
   */

  /*
   * BEGIN Event Management
   */
  listen = {
    on: function(el, eventName, handler, namespace) {
      log('on', el, eventName, namespace);
      if (has.addEventListener) {
        return el.addEventListener(eventName, handler);
      } else {
        return alert('no addEventListener');
      }
    },
    listeners: []
  };

  /*
   *
   * BEGIN minimalist html class features.
   * has, add, remove, toggle
   *
   */
  classes = {

    /**
     *
     * Determine if the given element has the given classname.
     * Should return true if the className is empty.
     * meaningless bug: if the given className is 2 classes separated by a
     * space and those 2 classes appear in that order in the element's
     * className property, `has` returns true. We should probably check
     * to be sure that there are no spaces, or maybe just return true
     * if both classes are individually appear in the element's
     * className.
     *
     * @param  {HTMLElement}  el        Any object with string className property
     * @param  {string}  className A string to be matched against the element's clasName property
     * @return {Boolean}           true if the given className is found in the element's className property
     *
     */
    has: function(el, className) {
      return (new RegExp('\\b' + className + '\\b')).test(el.className);
    },
    add: function(el, className) {
      if (!classes.has(el, className)) {
        el.className += ' ' + className;
      }
      return el;
    },
    remove: function(el, className) {
      if (classes.has(el, className)) {
        el.className = trim(el.className.replace(new RegExp('\\s*\\b' + className + '\\b\\s*', 'g'), ' '));
      }
      return el;
    },
    toggle: function(el, className) {
      if (classes.has(el, className)) {
        classes.remove(el, className);
      } else {
        classes.add(el, className);
      }
      return el;
    }
  };
  if (String.prototype.trim) {
    trim = function(str) {
      return str.trim();
    };
  } else {
    trim = function(str) {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }

  /*
   * create a clean-slate $m object and
   * assign its export-intended public properties
   */
  $m = {};

  /*
   * principle public functions.
   */
  $m.ready = ready;
  $m.noop = noop;
  $m.randomInt = randomInt;
  $m.objToString = objToString;
  $m.root = root;
  $m.isNumber = isNumber;
  $m.isNaN = isNaN;
  $m.isInfinity = isInfinity;
  $m.isArray = isArray;
  $m.isString = isString;
  $m.isRegExp = isRegExp;
  $m.isBoolean = isBoolean;
  $m.isObject = isObject;
  $m.isUndefined = isUndefined;
  $m.isDate = isDate;
  $m.isElementLike = isElementLike;
  $m.isValidDate = isValidDate;
  $m.qId = qId;
  $m.q1 = q1;
  $m.q = q;
  $m.prepend = prepend;
  $m.append = append;
  $m.before = before;
  $m.after = after;
  $m.remove = remove;
  $m.listen = listen;
  $m.classes = classes;
  $m.debounce = debounce;
  $m.throttle = throttle;
  $m.extend = extend;
  $m.log = log;
  $m.trim = trim;

  /*
   * aliases for compatibility with older
   * version of a similar library.
   * TODO - these should be deprecated, and therefore
   *        should they no longer enumerable as
   *        publicized public methods.
   */
  $m.isRegex = isRegExp;
  $m.isNum = isNumber;
  $m.isObj = isObject;
  $m.isBool = isBoolean;
  $m.isInfinite = isInfinity;

  /*
   * put $m on the root object
   * er, on the exportTarget, which is either the root object or
   * module.exports.
   */
  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = $m;
  } else {
    root.$m = $m;
  }

  /*
   * return $m for consumption
   */
  return $m;
})();

//# sourceMappingURL=$m.js.map
