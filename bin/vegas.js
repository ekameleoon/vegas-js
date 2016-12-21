/* VEGAS JS - version 1.0.7 - Opensource Licences : MPL 1.1/GPL 2.0/LGPL 2.1 - Follow me on Twitter! @ekameleon */
(function (global, factory) {
                  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
                  typeof define === 'function' && define.amd ? define(['exports'], factory) :
                  (factory((global.vegas = global.vegas || {})));
}(this, (function (exports) { 'use strict';

function ucFirst(str) {
    if (!(str instanceof String || typeof str === 'string') || str === "") {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
}

if (!(Date.now && Date.prototype.getTime)) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError('Function.prototype.bind called on incompatible ' + this);
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function fNOP() {},
            fBound = function fBound() {
            return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };
}
if (Function.prototype.name === undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function get() {
            return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
        }
    });
}

if (Math.sign === undefined) {
    Math.sign = function (x) {
        return x < 0 ? -1 : x > 0 ? 1 : +x;
    };
}

if (Object.assign === undefined) {
    (function () {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

exports.global = exports.global || null;
if (!exports.global) {
    try {
        exports.global = window;
    } catch (e) {}
}
if (!exports.global) {
    try {
        exports.global = document;
    } catch (e) {}
}
if (!exports.global) {
    exports.global = {};
}

var performance$1 = exports.global.performance || {};
Object.defineProperty(exports.global, 'performance', { value: performance$1, configurable: true, writable: true });
performance$1.now = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow;
if (!(exports.global.performance && exports.global.performance.now)) {
                  (function () {
                                    var startTime = Date.now();
                                    exports.global.performance.now = function () {
                                                      return Date.now() - startTime;
                                    };
                  })();
}

var ONE_FRAME_TIME = 16;
var lastTime = Date.now();
var vendors = ['ms', 'moz', 'webkit', 'o'];
var len = vendors.length;
for (var x = 0; x < len && !exports.global.requestAnimationFrame; ++x) {
    var p = vendors[x];
    exports.global.requestAnimationFrame = exports.global[p + 'RequestAnimationFrame'];
    exports.global.cancelAnimationFrame = exports.global[p + 'CancelAnimationFrame'] || exports.global[p + 'CancelRequestAnimationFrame'];
}
if (!exports.global.requestAnimationFrame) {
    exports.global.requestAnimationFrame = function (callback) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'is not a function');
        }
        var currentTime = Date.now();
        var delay = ONE_FRAME_TIME + lastTime - currentTime;
        if (delay < 0) {
            delay = 0;
        }
        lastTime = currentTime;
        return setTimeout(function () {
            lastTime = Date.now();
            callback(performance$1.now());
        }, delay);
    };
}
if (!exports.global.cancelAnimationFrame) {
    exports.global.cancelAnimationFrame = function (id) {
        return clearTimeout(id);
    };
}
var cancelAnimationFrame = exports.global.cancelAnimationFrame;
var requestAnimationFrame = exports.global.requestAnimationFrame;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

if (exports.global && typeof exports.global.Uint32Array !== "function" && _typeof(exports.global.Uint32Array) !== "object") {
    var CheapArray = function CheapArray(type) {
        var proto = [];
        exports.global[type] = function (arg) {
            var i;
            if (typeof arg === "number") {
                Array.call(this, arg);
                this.length = arg;
                for (i = 0; i < this.length; i++) {
                    this[i] = 0;
                }
            } else {
                Array.call(this, arg.length);
                this.length = arg.length;
                for (i = 0; i < this.length; i++) {
                    this[i] = arg[i];
                }
            }
        };
        exports.global[type].prototype = proto;
        exports.global[type].constructor = exports.global[type];
    };
    CheapArray('Float32Array');
    CheapArray('Uint32Array');
    CheapArray('Uint16Array');
    CheapArray('Int16Array');
    CheapArray('ArrayBuffer');
}

function trace(context) {
    if (console) {
        console.log(context);
    }
}

function dumpArray(value) {
    var prettyprint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var indentor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "    ";
    indent = isNaN(indent) ? 0 : indent;
    prettyprint = Boolean(prettyprint);
    if (!indentor) {
        indentor = "    ";
    }
    var source = [];
    var i;
    var l = value.length;
    for (i = 0; i < l; i++) {
        if (value[i] === undefined) {
            source.push("undefined");
            continue;
        }
        if (value[i] === null) {
            source.push("null");
            continue;
        }
        if (prettyprint) {
            indent++;
        }
        source.push(dump(value[i], prettyprint, indent, indentor));
        if (prettyprint) {
            indent--;
        }
    }
    if (prettyprint) {
        var spaces = [];
        for (i = 0; i < indent; i++) {
            spaces.push(indentor);
        }
        var decal = "\n" + spaces.join("");
        return decal + "[" + decal + indentor + source.join("," + decal + indentor) + decal + "]";
    } else {
        return "[" + source.join(",") + "]";
    }
}

function dumpDate(date /*Date*/) {
    var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    timestamp = Boolean(timestamp);
    if (timestamp) {
        return "new Date(" + String(date.valueOf()) + ")";
    } else {
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        var h = date.getHours();
        var mn = date.getMinutes();
        var s = date.getSeconds();
        var ms = date.getMilliseconds();
        var data = [y, m, d, h, mn, s, ms];
        data.reverse();
        while (data[0] === 0) {
            data.splice(0, 1);
        }
        data.reverse();
        return "new Date(" + data.join(",") + ")";
    }
}

function dumpObject(value) {
    var prettyprint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var indentor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "    ";
    indent = isNaN(indent) ? 0 : indent;
    prettyprint = Boolean(prettyprint);
    if (!indentor) {
        indentor = "    ";
    }
    var source = [];
    for (var member in value) {
        if (value.hasOwnProperty(member)) {
            if (value[member] === undefined) {
                source.push(member + ":" + "undefined");
                continue;
            }
            if (value[member] === null) {
                source.push(member + ":" + "null");
                continue;
            }
            if (prettyprint) {
                indent++;
            }
            source.push(member + ":" + dump(value[member], prettyprint, indent, indentor));
            if (prettyprint) {
                indent--;
            }
        }
    }
    source = source.sort();
    if (prettyprint) {
        var spaces = [];
        for (var i = 0; i < indent; i++) {
            spaces.push(indentor);
        }
        var decal = '\n' + spaces.join('');
        return decal + '{' + decal + indentor + source.join(',' + decal + indentor) + decal + '}';
    } else {
        return '{' + source.join(',') + '}';
    }
}

function toUnicodeNotation(num) {
    var hex = num.toString(16);
    while (hex.length < 4) {
        hex = "0" + hex;
    }
    return hex;
}

function dumpString(value) {
    var code;
    var quote = "\"";
    var str = "";
    var ch = "";
    var pos = 0;
    var len = value.length;
    while (pos < len) {
        ch = value.charAt(pos);
        code = value.charCodeAt(pos);
        if (code > 0xFF) {
            str += "\\u" + toUnicodeNotation(code);
            pos++;
            continue;
        }
        switch (ch) {
            case "\b":
                {
                    str += "\\b";
                    break;
                }
            case "\t":
                {
                    str += "\\t";
                    break;
                }
            case "\n":
                {
                    str += "\\n";
                    break;
                }
            case "\x0B":
                {
                    str += "\\v";
                    break;
                }
            case "\f":
                {
                    str += "\\f";
                    break;
                }
            case "\r":
                {
                    str += "\\r";
                    break;
                }
            case "\"":
                {
                    str += "\\\"";
                    break;
                }
            case "'":
                {
                    str += "\\\'";
                    break;
                }
            case "\\":
                {
                    str += "\\\\";
                    break;
                }
            default:
                {
                    str += ch;
                }
        }
        pos++;
    }
    return quote + str + quote;
}

function dump(o, prettyprint, indent, indentor) {
    indent = isNaN(indent) ? 0 : indent;
    prettyprint = Boolean(prettyprint);
    if (!indentor) {
        indentor = "    ";
    }
    if (o === undefined) {
        return "undefined";
    } else if (o === null) {
        return "null";
    } else if (typeof o === "string" || o instanceof String) {
        return dumpString(o);
    } else if (typeof o === "boolean" || o instanceof Boolean) {
        return o ? "true" : "false";
    } else if (typeof o === "number" || o instanceof Number) {
        return o.toString();
    } else if (o instanceof Date) {
        return dumpDate(o);
    } else if (o instanceof Array) {
        return dumpArray(o, prettyprint, indent, indentor);
    } else if (o.constructor && o.constructor === Object) {
        return dumpObject(o, prettyprint, indent, indentor);
    } else if ("toSource" in o) {
        return o.toSource(indent);
    } else {
        return "<unknown>";
    }
}

function isBoolean(object) {
  return typeof object === 'boolean' || object instanceof Boolean;
}

var isFloat = function isFloat(value) {
  return Number(value) === value && value % 1 !== 0;
};

var isInt = function isInt(value) {
  return Number(value) === value && value % 1 === 0;
};

function isNumber(object) {
  return typeof object === 'number' || object instanceof Number;
}

var isUint = function isUint(value) {
  return Number(value) === value && value % 1 === 0 && value >= 0;
};

function isString(object) {
  return typeof object === 'string' || object instanceof String;
}

var contains = function contains(array, value) {
  return array instanceof Array ? array.indexOf(value) > -1 : false;
};

function initialize() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var ar = [];
    elements = elements > 0 ? Math.abs(elements) : 0;
    if (elements > 0) {
        for (var i = 0; i < elements; i++) {
            ar[i] = value;
        }
    }
    return ar;
}

function pierce(ar, index /*uint*/, flag) {
  index = index > 0 ? Math.abs(index) : 0;
  flag = Boolean(flag);
  var item = ar[index];
  ar.splice(index, 1);
  return flag ? ar : item;
}

function repeat(ar, count /*uint*/) {
    var result = null;
    if (ar instanceof Array) {
        count = count > 0 ? count : 0;
        if (count > 0) {
            result = [];
            for (var i = 0; i < count; i++) {
                result = result.concat(ar);
            }
        } else {
            result = [].concat(ar);
        }
    }
    return result;
}

function rotate(ar) {
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (ar instanceof Array && ar.length > 0) {
        amount %= ar.length;
        if (amount > 0) {
            ar.unshift.apply(ar, ar.splice(-amount, amount));
        } else if (amount < 0) {
            ar.push.apply(ar, ar.splice(0, -amount));
        }
    } else {
        ar = null;
    }
    return ar;
}

function shuffle(ar) {
    if (ar instanceof Array) {
        var item = void 0;
        var rdm = void 0;
        var tmp = [];
        var len = ar.length;
        var index = len - 1;
        for (var i = 0; i < len; i++) {
            rdm = Math.round(Math.random() * index);
            item = ar[rdm];
            ar.splice(rdm, 1);
            tmp[tmp.length] = item;
            index--;
        }
        while (--len > -1) {
            ar[len] = tmp[len];
        }
    } else {
        ar = null;
    }
    return ar;
}

function sortOn(ar, propName, options) {
    var sort = function sort(o1, o2) {
        var v1 = propName in o1 ? o1[propName] : '';
        var v2 = propName in o2 ? o2[propName] : '';
        switch (options) {
            case Array.CASEINSENSITIVE:
            case Array.CASEINSENSITIVE | Array.RETURNINDEXEDARRAY:
                {
                    v1 = typeof v1 === "string" || v1 instanceof String ? v1.toLowerCase() : v1;
                    v2 = typeof v2 === "string" || v2 instanceof String ? v2.toLowerCase() : v2;
                    break;
                }
            case Array.NUMERIC:
            case Array.NUMERIC | Array.RETURNINDEXEDARRAY:
                {
                    v1 = Number(v1);v2 = Number(v2);
                    v1 = isNaN(v1) ? 0 : v1;
                    v2 = isNaN(v2) ? 0 : v2;
                    break;
                }
            case Array.DESCENDING:
            case Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    var _ref = [v2, v1];
                    v1 = _ref[0];
                    v2 = _ref[1];
                    break;
                }
            case Array.CASEINSENSITIVE | Array.DESCENDING:
            case Array.CASEINSENSITIVE | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    v1 = typeof v1 === "string" || v1 instanceof String ? v1.toLowerCase() : v1;
                    v2 = typeof v2 === "string" || v2 instanceof String ? v2.toLowerCase() : v2;
                    var _ref2 = [v2, v1];
                    v1 = _ref2[0];
                    v2 = _ref2[1];
                    break;
                }
            case Array.NUMERIC | Array.DESCENDING:
            case Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    v1 = Number(v1);v2 = Number(v2);
                    v1 = isNaN(v1) ? 0 : v1;
                    v2 = isNaN(v2) ? 0 : v2;
                    var _ref3 = [v2, v1];
                    v1 = _ref3[0];
                    v2 = _ref3[1];
                    break;
                }
            case Array.UNIQUESORT:
                {
                    if (v1 === v2) {
                        return;
                    }
                    break;
                }
        }
        if (v1 < v2) {
            return -1;
        } else if (v1 > v2) {
            return 1;
        } else {
            return 0;
        }
    };
    switch (options) {
        case Array.RETURNINDEXEDARRAY:
        case Array.RETURNINDEXEDARRAY | Array.NUMERIC:
        case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE:
        case Array.RETURNINDEXEDARRAY | Array.NUMERIC | Array.DESCENDING:
        case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE | Array.DESCENDING:
            {
                var tmp = [].concat(ar);
                tmp.sort(sort);
                var result = [];
                var l = ar.length;
                for (var i = 0; i < l; i++) {
                    result.push(tmp.indexOf(ar[i]));
                }
                return result;
            }
        default:
            {
                return ar.sort(sort);
            }
    }
}
Array.CASEINSENSITIVE = 1;
Array.DESCENDING = 2;
Array.NUMERIC = 16;
Array.RETURNINDEXEDARRAY = 8;
Array.UNIQUESORT = 4;

function spliceInto(inserted, container, position /*Number*/, count /*Number*/) {
    inserted.unshift(position, count);
    try {
        container.splice.apply(container, inserted);
    } finally {
        inserted.splice(0, 2);
    }
}

function swap(ar) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var clone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (ar instanceof Array) {
        if (clone) {
            ar = [].concat(ar);
        }
        var value = ar[from];
        ar[from] = ar[to];
        ar[to] = value;
        return ar;
    }
    return null;
}

/**
 * The {@link core.arrays} package is a modular <b>JavaScript</b> library that provides extra <code>Array</code> methods.
 * @summary The {@link core.arrays} package is a modular <b>JavaScript</b> library that provides extra <code>Array</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.arrays
 * @memberof core
 */
var arrays = Object.assign({
    contains: contains,
    initialize: initialize,
    pierce: pierce,
    repeat: repeat,
    rotate: rotate,
    shuffle: shuffle,
    sortOn: sortOn,
    spliceInto: spliceInto,
    swap: swap
});

function compare(charA, charB) {
    var a = charA.charAt(0);
    var b = charB.charAt(0);
    if (caseValue(a) < caseValue(b)) {
        return -1;
    }
    if (caseValue(a) > caseValue(b)) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
function caseValue(str) {
    return str.toLowerCase().valueOf() === str.valueOf() ? 0 : 1;
}

function isAlpha(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z";
}

function isAlphaOrDigit(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z" || "0" <= c && c <= "9";
}

function isASCII(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return c.charCodeAt(0) <= 255;
}

function isContained(c, charset) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    var l = charset.length;
    for (var i = 0; i < l; i++) {
        if (c === charset.charAt(i)) {
            return true;
        }
    }
    return false;
}

function isDigit(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "9";
}

function isHexDigit(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "9" || "A" <= c && c <= "F" || "a" <= c && c <= "f";
}

function isIdentifierStart(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z" || c === "_" || c === "$";
}

var lineTerminators = ["\n",
"\r",
"\u2028",
"\u2929"];

function isLineTerminator(c) {
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    var l = lineTerminators.length;
    while (--l > -1) {
        if (c === lineTerminators[l]) {
            return true;
        }
    }
    return false;
}

function isLower(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "a" <= c && c <= "z";
}

function isOctalDigit(c) {
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "7";
}

var operators = ["*", "/", "%", "+", "-", "«", "»", ">", "<", "›", "&", "^", "|"];

function isOperator(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return operators.indexOf(c) > -1;
}

var symbols = [" ",
"!",
"\"",
"#",
"$",
"%",
"&",
"\'",
"(",
")",
"*",
"+",
",",
"-",
".",
"/",
":",
";",
"<",
"=",
">",
"?",
"@",
"[",
"\\",
"]",
"^",
"_",
"`",
"{",
"|",
"}",
"~"];

function isSymbol(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return symbols.indexOf(c) > -1;
}

function isUnicode(c) {
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return c.charCodeAt(0) > 255;
}

function isUpper(c) {
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z";
}

var whiteSpaces = ["\t",
"\n",
"\x0B",
"\f",
"\r",
" ",
"\xA0",
"\u1680",
"\u180E",
"\u2000",
"\u2001",
"\u2002",
"\u2003",
"\u2004",
"\u2005",
"\u2006",
"\u2007",
"\u2008",
"\u2009",
"\u200A",
"\u200B",
"\u2028",
"\u2029",
"\u202F",
"\u205F",
"\u3000"];

function isWhiteSpace(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (index > 0) {
        c = c.charAt(index);
    }
    return whiteSpaces.indexOf(c) > -1;
}

/**
 * The {@link core.chars} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods to validate and transform the basic characters.
 * <p>You can use this library for example to parse a string (JSON, csv, etc.).</p>
 * @summary The {@link core.chars} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods to validate and transform a basic character.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.chars
 * @memberof core
 */
var chars = Object.assign({
    compare: compare,
    isAlpha: isAlpha,
    isAlphaOrDigit: isAlphaOrDigit,
    isASCII: isASCII,
    isContained: isContained,
    isDigit: isDigit,
    isHexDigit: isHexDigit,
    isIdentifierStart: isIdentifierStart,
    isLineTerminator: isLineTerminator,
    isLower: isLower,
    isOctalDigit: isOctalDigit,
    isOperator: isOperator,
    isSymbol: isSymbol,
    isUnicode: isUnicode,
    isUpper: isUpper,
    isWhiteSpace: isWhiteSpace,
    lineTerminators: lineTerminators,
    operators: operators,
    symbols: symbols,
    whiteSpaces: whiteSpaces
});

var distance = function distance(color1, color2) {
  return Math.pow((color1 >> 16 & 0xFF) - (color2 >> 16 & 0xFF), 2) + Math.pow((color1 >> 8 & 0xFF) - (color2 >> 8 & 0xFF), 2) + Math.pow((color1 & 0xFF) - (color2 & 0xFF), 2);
};

var equals = function equals(color1, color2) {
  var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;
  var dist = Math.pow((color1 >> 16 & 0xFF) - (color2 >> 16 & 0xFF), 2) + Math.pow((color1 >> 8 & 0xFF) - (color2 >> 8 & 0xFF), 2) + Math.pow((color1 & 0xFF) - (color2 & 0xFF), 2);
  return dist <= tolerance * (255 * 255 * 3) << 0;
};

var fade = function fade() {
    var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xFFFFFF;
    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (ratio <= 0) {
        return from;
    } else if (ratio >= 1) {
        return to;
    }
    var r = from >> 16;
    var g = from >> 8 & 0xFF;
    var b = from & 0xFF;
    r += ((to >> 16) - r) * ratio;
    g += ((to >> 8 & 0xFF) - g) * ratio;
    b += ((to & 0xFF) - b) * ratio;
    return r << 16 | g << 8 | b;
};

var isLittleEndian = function isLittleEndian() {
    var a = new ArrayBuffer(4);
    var b = new Uint8Array(a);
    var c = new Uint32Array(a);
    b[0] = 0xa1;
    b[1] = 0xb2;
    b[2] = 0xc3;
    b[3] = 0xd4;
    if (c[0] === 0xd4c3b2a1) {
        return true;
    }
    if (c[0] === 0xa1b2c3d4) {
        return false;
    } else {
        return null;
    }
};
var littleEndian = isLittleEndian();

var max = 0xFF;
var fromARGB = function fromARGB(a, r, g, b) {
  r = Math.min(Math.max(r, 0), max);
  g = Math.min(Math.max(g, 0), max);
  b = Math.min(Math.max(b, 0), max);
  a = isNaN(a) ? 0 : a;
  a = 0xFF * Math.max(Math.min(a, 1), 0);
  return littleEndian ? (a << 24 | b << 16 | g << 8 | r) >>> 0 : (r << 24 | g << 16 | b << 8 | a) >>> 0;
};

var getAlpha = function getAlpha(color) {
  return color >> 24 & 0xFF;
};

var getBlue = function getBlue(color) {
  return color & 0xFF;
};

var getGreen = function getGreen(color) {
  return color >> 8 & 0xFF;
};

var getRed = function getRed(color) {
  return color >> 16 & 0xFF;
};

var isUnique = function isUnique(color, colors) {
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;
    if (!(colors instanceof Array) || colors.length === 0) {
        return true;
    }
    tolerance = tolerance * (255 * 255 * 3) << 0;
    var cur = void 0;
    var distance = void 0;
    var len = colors.length;
    for (var i = 0; i < len; i++) {
        cur = colors[i];
        distance = Math.pow((color >> 16 & 0xFF) - (cur >> 16 & 0xFF), 2) + Math.pow((color >> 8 & 0xFF) - (cur >> 8 & 0xFF), 2) + Math.pow((color & 0xFF) - (cur & 0xFF), 2);
        if (distance <= tolerance) {
            return false;
        }
    }
    return true;
};

var toHex = function toHex(value) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
    var upper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (!(Number(value) === value && value % 1 === 0 && value >= 0)) {
        throw new TypeError('toHex failed, the value parameter must be an upper integer.');
    }
    prefix = typeof prefix === 'string' || prefix instanceof String ? prefix : '#';
    upper = upper === true;
    var gb = void 0;
    var r = value >> 16;gb = value ^ r << 16;
    var g = gb >> 8;
    var b = gb ^ g << 8;
    return prefix + hex(r, upper) + hex(g, upper) + hex(b, upper);
};
function hex(value) {
    var upper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var hex = value.toString(16);
    hex = hex.length % 2 === 0 ? hex : "0" + hex;
    return upper ? hex.toUpperCase() : hex;
}

var uniques = function uniques(colors) {
    var maximum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xFFFFFF;
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;
    var result = [];
    for (var i = 0; i < colors.length && result.length < maximum; i++) {
        if (isUnique(colors[i], result, tolerance)) {
            result.push(colors[i]);
        }
    }
    return result;
};

/**
 * The {@link core.colors} package is a modular <b>JavaScript</b> library that provides extra <b>rgb color</b> methods.
 * @summary The {@link core.colors} package is a modular <b>JavaScript</b> library that provides extra <b>rgb color</b> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.colors
 * @memberof core
 */
var colors = Object.assign({
    distance: distance,
    equals: equals,
    fade: fade,
    fromARGB: fromARGB,
    getAlpha: getAlpha,
    getBlue: getBlue,
    getGreen: getGreen,
    getRed: getRed,
    isUnique: isUnique,
    toHex: toHex,
    uniques: uniques
});

var ONE_DAY_MS = 86400000;

var after = function after(date1, date2) {
    if (!(date1 instanceof Date && date2 instanceof Date)) {
        throw new TypeError('after() failed, the passed-in date arguments must be valid Date objects.');
    }
    return date1.valueOf() > date2.valueOf();
};

var before = function before(date1, date2) {
    if (!(date1 instanceof Date && date2 instanceof Date)) {
        throw new TypeError('after() failed, the passed-in date arguments must be valid Date objects.');
    }
    return date1.valueOf() < date2.valueOf();
};

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInMonth = function daysInMonth() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (!(date instanceof Date)) {
        date = new Date();
    }
    var y = date.getFullYear();
    var m = date.getMonth();
    if ((y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) && m === 1) {
        return 29;
    }
    return monthDays[m];
};

var leapYear = function leapYear(date) {
    var year = void 0;
    if (date instanceof Date) {
        year = date.getFullYear();
    } else if (date instanceof Number || typeof date === 'number') {
        year = date;
    } else {
        throw new TypeError('leapYear failed, the passed-in date argument must be a valid Date object or an integer representing the year to evaluates.');
    }
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

var yesterday = function yesterday() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  date = date instanceof Date ? date : new Date();
  return new Date(date.valueOf() - ONE_DAY_MS);
};

/**
 * The {@link core.date} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @summary The {@link core.date} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.date
 * @memberof core
 */
var date = Object.assign({
  ONE_DAY_MS: ONE_DAY_MS,
  after: after,
  before: before,
  daysInMonth: daysInMonth,
  leapYear: leapYear,
  yesterday: yesterday
});

var backIn = function backIn(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
    if (isNaN(s)) {
        s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

var backInOut = function backInOut(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
    if (isNaN(s)) {
        s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};

var backOut = function backOut(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
    if (isNaN(s)) {
        s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

var bounceOut = function bounceOut(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
};

var bounceIn = function bounceIn(t, b, c, d) {
  return c - bounceOut(d - t, 0, c, d) + b;
};

var bounceInOut = function bounceInOut(t, b, c, d) {
  return t < d / 2 ? bounceIn(t * 2, 0, c, d) * 0.5 + b : bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

var circularIn = function circularIn(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};

var circularInOut = function circularInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

var circularOut = function circularOut(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};

var cubicIn = function cubicIn(t, b, c, d) {
  return c * (t /= d) * t * t + b;
};

var cubicInOut = function cubicInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

var cubicOut = function cubicOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};

var elasticIn = function elasticIn(t, b, c, d) {
    var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var p = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var s;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};

var elasticInOut = function elasticInOut(t, b, c, d) {
    var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var p = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var s;
    if (t === 0) {
        return b;
    }
    if ((t /= d / 2) === 2) {
        return b + c;
    }
    if (!p) {
        p = d * (0.3 * 1.5);
    }
    if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
};

var elasticOut = function elasticOut(t, b, c, d) {
    var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var p = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var s;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};

var expoIn = function expoIn(t, b, c, d) {
  return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};

var expoInOut = function expoInOut(t, b, c, d) {
    if (t === 0) {
        return b;
    }
    if (t === d) {
        return b + c;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

var expoOut = function expoOut(t, b, c, d) {
  return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

var linear = function linear(t, b, c, d) {
  return c * t / d + b;
};

var quarticIn = function quarticIn(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
};

var quarticInOut = function quarticInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

var quarticOut = function quarticOut(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

var quinticIn = function quinticIn(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
};

var quinticInOut = function quinticInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};

var quinticOut = function quinticOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};

var regularIn = function regularIn(t, b, c, d) {
  return c * (t /= d) * t + b;
};

var regularInOut = function regularInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
};

var regularOut = function regularOut(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

var sineIn = function sineIn(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};

var sineInOut = function sineInOut(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

var sineOut = function sineOut(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

/**
 * The {@link system.transitions} package use the {@link core.easings} library who contains all the easing functions to create the specific <b>tweening</b> effects.
 * <p>These easings functions provide different flavors of math-based motion under a consistent API.</p>
 *
 * |  easing   |                         description                         |  in  | out  | inout  |
 * |:--------: |:----------------------------------------------------------: |:---: |:---: |:-----: |
 * |  linear   | simple linear tweening : no easing, no acceleration         |  -   |  -   |   -    |
 * |   back    | back easing : overshooting cubic easing: (s+1)*t^3 - s*t^2  | yes  | yes  |  yes   |
 * |  bounce   | bounce easing : exponentially decaying parabolic bounce     | yes  | yes  |  yes   |
 * | circular  | circular easing : sqrt(1-t^2)                               | yes  | yes  |  yes   |
 * |   cubic   | cubic easing : t^3                                          | yes  | yes  |  yes   |
 * |  elastic  | elastic easing : exponentially decaying sine wave           | yes  | yes  |  yes   |
 * |   expo    | exponential easing : 2^t                                    | yes  | yes  |  yes   |
 * |   quad    | quadratic easing : t^2                                      | yes  | yes  | yes    |
 * |  quartic  | quartic easing : t^4                                        | yes  | yes  |  yes   |
 * |  quintic  | quintic easing : t^5                                        | yes  | yes  |  yes   |
 * |  regular  | regular easing                                              | yes  | yes  |  yes   |
 * |   sine    | sinusoidal easing : sin(t)                                  | yes  | yes  |  yes   |
 * @summary The {@link core.easings} library contains all the easing functions to create the specific tweening effects.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @namespace core.easings
 * @memberof core
 * @tutorial system.transitions
 * @see {@link system.transitions|system.transition library}
 */
var easings = Object.assign({
    backIn: backIn,
    backInOut: backInOut,
    backOut: backOut,
    bounceIn: bounceIn,
    bounceInOut: bounceInOut,
    bounceOut: bounceOut,
    circularIn: circularIn,
    circularInOut: circularInOut,
    circularOut: circularOut,
    cubicIn: cubicIn,
    cubicInOut: cubicInOut,
    cubicOut: cubicOut,
    elasticIn: elasticIn,
    elasticInOut: elasticInOut,
    elasticOut: elasticOut,
    expoIn: expoIn,
    expoInOut: expoInOut,
    expoOut: expoOut,
    linear: linear,
    quarticIn: quarticIn,
    quarticInOut: quarticInOut,
    quarticOut: quarticOut,
    quinticIn: quinticIn,
    quinticInOut: quinticInOut,
    quinticOut: quinticOut,
    regularIn: regularIn,
    regularInOut: regularInOut,
    regularOut: regularOut,
    sineIn: sineIn,
    sineInOut: sineInOut,
    sineOut: sineOut
});

var aop = function aop(func) {
    var begin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var scope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return function () {
        try {
            if (begin !== null && begin instanceof Function) {
                begin();
            }
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return func.apply(scope, args);
        } finally {
            if (end !== null && end instanceof Function) {
                end();
            }
        }
    };
};

/**
 * The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @summary The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.functors
 * @memberof core
 */
var functors = Object.assign({
  aop: aop
});

var RAD2DEG = 180 / Math.PI;

var acosD = function acosD(ratio) {
  return Math.acos(ratio) * RAD2DEG;
};

var acosHm = function acosHm(x) {
  return Math.log(x - Math.sqrt(x * x - 1));
};

var acosHp = function acosHp(x) {
  return Math.log(x + Math.sqrt(x * x - 1));
};

var angleOfLine = function angleOfLine(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * RAD2DEG;
};

var asinD = function asinD(ratio) {
  return Math.asin(ratio) * RAD2DEG;
};

var asinH = function asinH(x) {
  return Math.log(x + Math.sqrt(x * x + 1));
};

var atan2D = function atan2D(y, x) {
  return Math.atan2(y, x) * RAD2DEG;
};

var atanD = function atanD(angle) {
  return Math.atan(angle) * RAD2DEG;
};

var atanH = function atanH(x) {
  return Math.log((1 + x) / (1 - x)) / 2;
};

var DEG2RAD = Math.PI / 180;

var bearing = function bearing(latitude1, longitude1, latitude2, longitude2) {
  latitude1 = latitude1 * DEG2RAD;
  latitude2 = latitude2 * DEG2RAD;
  var dLng = (longitude2 - longitude1) * DEG2RAD;
  var y = Math.sin(dLng) * Math.cos(latitude2);
  var x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(dLng);
  return (Math.atan2(y, x) * RAD2DEG + 360) % 360;
};

var clamp = function clamp(value, min, max) {
    if (isNaN(value)) {
        return NaN;
    }
    if (isNaN(min)) {
        min = value;
    }
    if (isNaN(max)) {
        max = value;
    }
    return Math.max(Math.min(value, max), min);
};

var berp = function berp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = clamp(amount, 0, 1);
    amount = (Math.sin(amount * Math.PI * (0.2 + 2.5 * amount * amount * amount)) * Math.pow(1 - amount, 2.2) + amount) * (1 + 1.2 * (1 - amount));
    return start + (end - start) * amount;
};

var bounce = function bounce(amount) {
  return Math.abs(Math.sin(6.28 * (amount + 1) * (amount + 1)) * (1 - amount));
};

var cartesianToPolar = function cartesianToPolar(vector, degrees) {
  return { angle: Math.atan2(vector.y, vector.x) * (Boolean(degrees) ? RAD2DEG : 1), radius: Math.sqrt(vector.x * vector.x + vector.y * vector.y) };
};

function ceil(n) {
    var floatCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (isNaN(n)) {
        return NaN;
    }
    var r = 1;
    var i = -1;
    while (++i < floatCount) {
        r *= 10;
    }
    return Math.ceil(n * r) / r;
}

var clerp = function clerp(start, end, amount) {
    var max = 360;
    var half = 180;
    var diff = end - start;
    if (diff < -half) {
        return start + (max - start + end) * amount;
    } else if (diff > half) {
        return start - (max - end + start) * amount;
    } else {
        return start + (end - start) * amount;
    }
};

var cosD = function cosD(angle) {
  return Math.cos(angle * DEG2RAD);
};

var coserp = function coserp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = 1 - Math.cos(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

var cosH = function cosH(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};

var degreesToRadians = function degreesToRadians(angle) {
  return angle * DEG2RAD;
};

var distance$1 = function distance$1(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

function distanceByObject(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

var EARTH_RADIUS_IN_METERS = 6371000;

var EPSILON = 0.000000001;

var factorial = function factorial(value) {
    if (value === 0) {
        return 1;
    }
    var result = value;
    while (--value) {
        result *= value;
    }
    return result;
};

var fibonacci = function fibonacci(value) {
    var i = 1;
    var j = 0;
    for (var k = 1; k <= value; k++) {
        var _ref = [j, i + j];
        i = _ref[0];
        j = _ref[1];
    }
    return j;
};

var finalBearing = function finalBearing(latitude1, longitude1, latitude2, longitude2) {
  latitude1 = latitude1 * DEG2RAD;
  latitude2 = latitude2 * DEG2RAD;
  var dLng = (longitude2 - longitude1) * DEG2RAD;
  var y = Math.sin(dLng) * Math.cos(latitude2);
  var x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(dLng);
  return (Math.atan2(y, x) * RAD2DEG + 180) % 360;
};

function fixAngle(angle) {
    if (isNaN(angle)) {
        angle = 0;
    }
    angle %= 360;
    return angle < 0 ? angle + 360 : angle;
}

var floor = function floor(n) {
    var floatCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (isNaN(n)) {
        return NaN;
    }
    var r = 1;
    var i = -1;
    while (++i < floatCount) {
        r *= 10;
    }
    return Math.floor(n * r) / r;
};

var gcd = function gcd(i1, i2) {
    if (i2 === 0) {
        return i1;
    } else if (i1 === i2) {
        return i1;
    } else {
        var t;
        while (i2 !== 0) {
            t = i2;
            i2 = i1 % i2;
            i1 = t;
        }
        return i1;
    }
};

var haversine = function haversine(latitude1, longitude1, latitude2, longitude2) {
    var radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : EARTH_RADIUS_IN_METERS;
    if (isNaN(radius)) {
        radius = EARTH_RADIUS_IN_METERS;
    }
    var dLat = (latitude2 - latitude1) * DEG2RAD;
    var dLng = (longitude2 - longitude1) * DEG2RAD;
    var a = Math.sin(dLat * 0.5) * Math.sin(dLat * 0.5) + Math.cos(latitude1 * DEG2RAD) * Math.cos(latitude2 * DEG2RAD) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = Number((2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * radius).toFixed(3));
    return c === c ? c : 0;
};

var hermite = function hermite(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = amount * amount * (3 - 2 * amount);
    return (1 - amount) * start + amount * end;
};

var hypothenuse = function hypothenuse(x, y) {
  return Math.sqrt(x * x + y * y);
};

var interpolate = function interpolate(value, min, max) {
  return min + (max - min) * value;
};

var isEven = function isEven(value) {
  return value % 2 === 0;
};

var isOdd = function isOdd(value) {
  return value % 2 !== 0;
};

var LAMBDA = 0.57721566490143;

var lerp = function lerp(start, end, amount) {
    if (start === end) {
        return start;
    }
    return (1 - amount) * start + amount * end;
};

function log10(value) {
  return Math.log(value) / Math.LN10;
}

function logN(value, base) {
  return Math.log(value) / Math.log(base);
}

var normalize = function normalize(value, minimum, maximum) {
  return (value - minimum) / (maximum - minimum);
};

var map = function map(value, min1, max1, min2, max2) {
  return interpolate(normalize(value, min1, max1), min2, max2);
};

var midPoint = function midPoint(latitude1, longitude1, latitude2, longitude2) {
    var dLng = (longitude2 - longitude1) * DEG2RAD;
    latitude1 = latitude1 * DEG2RAD;
    longitude1 = longitude1 * DEG2RAD;
    latitude2 = latitude2 * DEG2RAD;
    var bx = Math.cos(latitude2) * Math.cos(dLng);
    var by = Math.cos(latitude2) * Math.sin(dLng);
    var point = {
        x: Math.atan2(Math.sin(latitude1) + Math.sin(latitude2), Math.sqrt((Math.cos(latitude1) + bx) * (Math.cos(latitude1) + bx) + by * by)) * RAD2DEG,
        y: (longitude1 + Math.atan2(by, Math.cos(latitude1) + bx)) * RAD2DEG
    };
    return point;
};

var MILE_TO_METER = 1609;

function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}

var nearlyEquals = function nearlyEquals(value1, value2) {
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.000001;
    if (isNaN(tolerance)) {
        tolerance = 0.000001;
    } else if (tolerance < 0) {
        tolerance = 0;
    }
    return Math.abs(value1 - value2) <= tolerance;
};

var percentage = function percentage(value, maximum) {
  var p = value / maximum * 100;
  return isNaN(p) || !isFinite(p) ? NaN : p;
};

var PHI = 1.61803398874989;

var PI2 = Math.PI * 2;

var polarToCartesian = function polarToCartesian(vector, degrees) {
    var angle = vector.angle;
    var radius = vector.radius;
    if (degrees) {
        angle *= DEG2RAD;
    }
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

var replaceNaN = function replaceNaN(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return isNaN(value) ? defaultValue : value;
};

var round = function round(n) {
    var floatCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (isNaN(n)) {
        return NaN;
    }
    var r = 1;
    var i = -1;
    while (++i < floatCount) {
        r *= 10;
    }
    return Math.round(n * r) / r;
};

var sign = function sign(n) {
    if (isNaN(n)) {
        throw new TypeError("sign failed, the passed-in value not must be NaN.");
    }
    return n < 0 ? -1 : 1;
};

var sinD = function sinD(angle) {
  return Math.sin(angle * DEG2RAD);
};

var sinerp = function sinerp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = Math.sin(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

var sinH = function sinH(x) {
  return (Math.exp(x) - Math.exp(-x)) * 0.5;
};

var tanD = function tanD(angle) {
  return Math.tan(angle * DEG2RAD);
};

var tanH = function tanH(x) {
  return sinH(x) / cosH(x);
};

function vincenty(latitude1, longitude1, latitude2, longitude2)
{
    var a = 6378137;
    var b = 6356752.3142;
    var f = 1 / 298.257223563;
    var L = (longitude2 - longitude1) * DEG2RAD;
    var U1 = Math.atan((1 - f) * Math.tan(latitude1 * DEG2RAD));
    var U2 = Math.atan((1 - f) * Math.tan(latitude2 * DEG2RAD));
    var sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2);
    var lambda = L;
    var lambdaP = 2 * Math.PI;
    var iterLimit = 20;
    var cosLambda;
    var sinLambda;
    var cosSigma;
    var sinSigma;
    var sigma;
    var sinAlpha;
    var cosSqAlpha;
    var cos2SigmaM;
    var C;
    do {
        sinLambda = Math.sin(lambda);
        cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma === 0) {
            return 0;
        }
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) {
            cos2SigmaM = 0;
        }
        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
    if (iterLimit === 0) {
        return NaN;
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    s = Number(s.toFixed(3));
    return s;
}

function wrap(angle) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 360;
    var range = max - min;
    if (range <= 0) {
        return 0;
    }
    var result = (angle - min) % range;
    if (result < 0) {
        result += range;
    }
    return result + min;
}

/**
 * The {@link core.maths} package is a modular <b>JavaScript</b> library that provides extra <code>mathematics</code> methods and implementations.
 * @summary The {@link core.maths} package is a modular <b>JavaScript</b> library that provides extra <code>mathematics</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.maths
 * @memberof core
 */
var maths = Object.assign({
    acosD: acosD,
    acosHm: acosHm,
    acosHp: acosHp,
    angleOfLine: angleOfLine,
    asinD: asinD,
    asinH: asinH,
    atan2D: atan2D,
    atanD: atanD,
    atanH: atanH,
    bearing: bearing,
    berp: berp,
    bounce: bounce,
    cartesianToPolar: cartesianToPolar,
    ceil: ceil,
    clamp: clamp,
    clerp: clerp,
    cosD: cosD,
    coserp: coserp,
    cosH: cosH,
    DEG2RAD: DEG2RAD,
    degreesToRadians: degreesToRadians,
    distance: distance$1,
    distanceByObject: distanceByObject,
    EARTH_RADIUS_IN_METERS: EARTH_RADIUS_IN_METERS,
    EPSILON: EPSILON,
    factorial: factorial,
    fibonacci: fibonacci,
    finalBearing: finalBearing,
    fixAngle: fixAngle,
    floor: floor,
    gcd: gcd,
    haversine: haversine,
    hermite: hermite,
    hypothenuse: hypothenuse,
    interpolate: interpolate,
    isEven: isEven,
    isOdd: isOdd,
    LAMBDA: LAMBDA,
    lerp: lerp,
    littleEndian: littleEndian,
    log10: log10,
    logN: logN,
    map: map,
    midPoint: midPoint,
    MILE_TO_METER: MILE_TO_METER,
    modulo: modulo,
    nearlyEquals: nearlyEquals,
    normalize: normalize,
    percentage: percentage,
    PHI: PHI,
    PI2: PI2,
    polarToCartesian: polarToCartesian,
    RAD2DEG: RAD2DEG,
    replaceNaN: replaceNaN,
    round: round,
    sign: sign,
    sinD: sinD,
    sinerp: sinerp,
    sinH: sinH,
    tanD: tanD,
    tanH: tanH,
    vincenty: vincenty,
    wrap: wrap
});

function toInt(num) {
  return num - num % 1;
}

function toUint(num) {
  num -= num % 1;
  return num < 0 ? -num : num;
}

/**
 * The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @summary The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
var numbers = Object.assign({
  toInt: toInt,
  toUint: toUint,
  toUnicodeNotation: toUnicodeNotation
});

function forEach(object, callback) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var breaker = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!object) {
        return;
    }
    if ("forEach" in object && object.forEach instanceof Function) {
        object.forEach(callback, context);
    } else {
        for (var key in object) {
            if (key in object) {
                if (breaker !== null) {
                    if (callback.call(context, object[key], key, object) === breaker) {
                        return;
                    }
                } else {
                    callback.call(context, object[key], key, object);
                }
            }
        }
    }
}

function fuse(src, srcPos, dest, destPos, length) {
    if (!src) {
        throw new ReferenceError("fuse failed, if either src is null.");
    }
    if (!dest) {
        dest = src;
    }
    if (destPos < 0) {
        destPos = dest.length;
    }
    while (length > 0) {
        dest[destPos] = src[srcPos];
        srcPos++;
        destPos++;
        length--;
    }
}

function members(o) {
    var byValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    byValue = Boolean(byValue === true);
    var members = [];
    if (byValue) {
        for (var prop in o) {
            if (o.hasOwnProperty(prop)) {
                members.push(o[prop]);
            }
        }
    } else {
        for (var member in o) {
            if (o.hasOwnProperty(member)) {
                members.push(member);
            }
        }
    }
    return members.length > 0 ? members : null;
}

function merge(target, source) {
    var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (overwrite === null || overwrite === undefined) {
        overwrite = true;
    }
    if (source === null || source === undefined) {
        source = {};
    }
    for (var prop in source) {
        if (!(prop in target) || overwrite) {
            target[prop] = source[prop];
        }
    }
    return target;
}

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra <code>Object</code> methods and implementations.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra <code>Object</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.objects
 * @memberof core
 */
var objects = Object.assign({
  forEach: forEach,
  fuse: fuse,
  members: members,
  merge: merge
});

function generateUUID() {
  var d = new Date().getTime();
  return pattern.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}
var pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.random
 * @memberof core
 */
var random = Object.assign({
  generateUUID: generateUUID
});

function getDefinitionByName(name) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (name instanceof String || typeof name === 'string') {
        name = name.split('.');
        if (name.length > 0) {
            try {
                var o = domain || exports.global;
                name.forEach(function (element) {
                    if (o.hasOwnProperty(element)) {
                        o = o[element];
                    } else {
                        return undefined;
                    }
                });
                return o;
            } catch (e) {
            }
        }
    }
    return undefined;
}

function invoke(c) {
        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!(c instanceof Function)) {
                return null;
        }
        if (a === null || !(a instanceof Array) || a.length === 0) {
                return new c();
        }
        switch (a.length) {
                case 0:
                        return new c();
                case 1:
                        return new c(a[0]);
                case 2:
                        return new c(a[0], a[1]);
                case 3:
                        return new c(a[0], a[1], a[2]);
                case 4:
                        return new c(a[0], a[1], a[2], a[3]);
                case 5:
                        return new c(a[0], a[1], a[2], a[3], a[4]);
                case 6:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5]);
                case 7:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
                case 8:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
                case 9:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
                case 10:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
                case 11:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10]);
                case 12:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11]);
                case 13:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]);
                case 14:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13]);
                case 15:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14]);
                case 16:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
                case 17:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16]);
                case 18:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]);
                case 19:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18]);
                case 20:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19]);
                case 21:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20]);
                case 22:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21]);
                case 23:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22]);
                case 24:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23]);
                case 25:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24]);
                case 26:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25]);
                case 27:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26]);
                case 28:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27]);
                case 29:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28]);
                case 30:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28], a[29]);
                case 31:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28], a[29], a[30]);
                case 32:
                        return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28], a[29], a[30], a[31]);
                default:
                        return null;
        }
}

/**
 * The {@link core.reflect} package is a modular <b>JavaScript</b> library that provides extra methods to to obtain information about loaded objects or generate it.
 * @summary The {@link core.reflect} package is a modular <b>JavaScript</b> library that provides extra methods to to obtain information about loaded objects or generate it.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.reflect
 * @memberof core
 */
var reflect = Object.assign({
  getDefinitionByName: getDefinitionByName,
  invoke: invoke
});

function between(source, left, right) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    if (!(left instanceof String || typeof left === 'string') || left === "") {
        return source;
    }
    var start = source.indexOf(left);
    var end = source.indexOf(right, start + left.length);
    if (end < 0 || !(right instanceof String || typeof right === 'string') || right === "") {
        return source.substring(start + left.length);
    }
    return source.slice(start + left.length, end);
}

function camelCase(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/-\D/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
}

function capitalize(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
    });
}

function center(source) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : " ";
    if (source === null || !(source instanceof String || typeof source === 'string')) {
        return "";
    }
    if (separator === null || !(separator instanceof String || typeof separator === 'string')) {
        separator = " ";
    }
    var len = source.length;
    if (len <= size) {
        len = size - len;
        var remain = len % 2 === 0 ? "" : separator;
        var pad = "";
        var count = Math.floor(len / 2);
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                pad = pad.concat(separator);
            }
        } else {
            pad = separator;
        }
        return pad + source + pad + remain;
    } else {
        return source;
    }
}

function trim(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces;
    }
    var i;
    var l;
    l = source.length;
    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {}
    source = source.substring(i);
    l = source.length;
    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}
    source = source.substring(0, i + 1);
    return source;
}

function clean(source) {
    if (source === null || !(source instanceof String || typeof source === 'string')) {
        return "";
    }
    return trim(source.replace(/\s+/g, ' '));
}

function compare$1(str1, str2) {
    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (!(typeof str1 === 'string' || str1 instanceof String)) {
        throw new TypeError('Bad arguments, the compare function failed, the first argument must be a string value.');
    }
    if (!(typeof str2 === 'string' || str2 instanceof String)) {
        throw new TypeError('Bad arguments, the compare function failed, the second argument must be a string value.');
    }
    if (str1 === str2) {
        return 0;
    }
    strict = Boolean(strict);
    if (!strict) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
    }
    if (str1.length === str2.length) {
        var local = str1.localeCompare(str2);
        if (local === 0) {
            return 0;
        } else if (local < 0) {
            return -1;
        }
        return 1;
    } else if (str1.length > str2.length) {
        return 1;
    } else {
        return -1;
    }
}

function endsWith(source, value) {
    if (!(source instanceof String || typeof source === 'string') || !(value instanceof String || typeof value === 'string') || source.length < value.length) {
        return false;
    }
    if (value === "") {
        return true;
    }
    return source.lastIndexOf(value) === source.length - value.length;
}

function fastformat(pattern) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }
    if (pattern === null || !(pattern instanceof String || typeof pattern === 'string')) {
        return "";
    }
    if (args.length > 0) {
        args = [].concat.apply([], args);
        var len = args.length;
        for (var i = 0; i < len; i++) {
            pattern = pattern.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
    }
    return pattern;
}

function fastformatDate() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
    if (!(date instanceof Date)) {
        date = new Date();
    }
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var exp = date.getFullYear() + separator;
    if (month < 10) {
        exp += "0";
    }
    exp += month + separator;
    if (day < 10) {
        exp += "0";
    }
    exp += day;
    return exp;
}

function pad(source) {
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var ch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : " ";
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    var left = amount >= 0;
    var width = amount > 0 ? amount : -amount;
    if (width < source.length || width === 0) {
        return source;
    }
    if (ch === null) {
        ch = " ";
    } else if (ch.length > 1) {
        ch = ch.charAt(0);
    }
    while (source.length !== width) {
        if (left) {
            source = ch + source;
        } else {
            source += ch;
        }
    }
    return source;
}

function format(pattern) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }
    if (pattern === null || !(pattern instanceof String || typeof pattern === 'string')) {
        return "";
    }
    var formatted = pattern;
    var len = args.length;
    var words = {};
    if (len === 1 && args[0] instanceof Array) {
        args = args[0];
    } else if (args[0] instanceof Array) {
        var a = args[0];
        args.shift();
        args = a.concat(args);
    } else if (args[0] instanceof Object && String(args[0]) === "[object Object]") {
        words = args[0];
        if (len > 1) {
            args.shift();
        }
    }
    var search = new RegExp("{([a-z0-9,:\\-]*)}", "m");
    var result = search.exec(formatted);
    var part;
    var token;
    var c;
    var pos;
    var dirty = false;
    var padding = 0;
    var buffer = [];
    while (result !== null) {
        part = result[0];
        token = result[1];
        pos = token.indexOf(",");
        if (pos > 0) {
            padding = Number(token.substr(pos + 1));
            token = token.substring(0, pos);
        }
        c = token.charAt(0);
        if ("0" <= c && c <= "9") {
            formatted = formatted.replace(part, pad(String(args[token]), padding));
        } else if (token === "" || token.indexOf(":") > -1) {
            buffer.push(part);
            formatted = formatted.replace(new RegExp(part, "g"), '\uFFFC' + (buffer.length - 1));
            dirty = true;
        } else if ("a" <= c && c <= "z") {
            if (token in words || words.hasOwnProperty(token)) {
                formatted = formatted.replace(new RegExp(part, "g"), pad(String(words[token]), padding));
            }
        } else {
            throw new Error("core.strings.format failed, malformed token \"" + part + "\", can not start with \"" + c + "\"");
        }
        result = search.exec(formatted);
    }
    if (dirty) {
        var i;
        var bl = buffer.length;
        for (i = 0; i < bl; i++) {
            formatted = formatted.replace(new RegExp('\uFFFC' + i, "g"), buffer[i]);
        }
    }
    return formatted;
}

function hyphenate(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/[A-Z]/g, function (match) {
        return '-' + match.charAt(0).toLowerCase();
    });
}

function indexOfAny(source, anyOf) {
    var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return -1;
    }
    if (!(anyOf instanceof Array)) {
        return -1;
    }
    startIndex = startIndex > 0 ? 0 : startIndex;
    count = count < 0 ? -1 : count;
    var l = source.length;
    var endIndex = void 0;
    if (count < 0 || count > l - startIndex) {
        endIndex = l - 1;
    } else {
        endIndex = startIndex + count - 1;
    }
    for (var i = startIndex; i <= endIndex; i++) {
        if (anyOf.indexOf(source[i]) > -1) {
            return i;
        }
    }
    return -1;
}

function insert(source) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    if (!(value instanceof String || typeof value === 'string') || value === "") {
        return source;
    }
    var strA = "";
    var strB = "";
    if (index < 0) {
        index = source.length - Math.abs(index) + 1;
    } else if (index === 0) {
        return value + source;
    } else if (index >= source.length) {
        return source + value;
    }
    strA = source.substr(0, index);
    strB = source.substr(index);
    return strA + value + strB;
}

function lastIndexOfAny(source, anyOf) {
    var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return -1;
    }
    if (!(anyOf instanceof Array) || anyOf.length === 0) {
        return -1;
    }
    if (startIndex < 0) {
        return -1;
    } else if (isNaN(startIndex) || startIndex > source.length) {
        startIndex = source.length;
    }
    count = count > 0 ? count : 0;
    var endIndex = Math.max(startIndex - count, 0);
    source = source.slice(endIndex, startIndex);
    var len = anyOf.length;
    for (var i = 0; i < len; i++) {
        var index = source.lastIndexOf(anyOf[i], startIndex);
        if (index > -1) {
            return endIndex + index;
        }
    }
    return -1;
}

function repeat$1(source) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    count = isNaN(count) ? 0 : count;
    if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
        throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (source.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
    }
    if (count === 0) {
        return "";
    }
    var result = '';
    for (;;) {
        if ((count & 1) === 1) {
            result += source;
        }
        count >>>= 1;
        if (count === 0) {
            break;
        }
        source += source;
    }
    return result;
}

function startsWith(source, value) {
    if (!(source instanceof String || typeof source === 'string') || !(value instanceof String || typeof value === 'string') || source.length < value.length) {
        return false;
    }
    if (value === "") {
        return true;
    }
    if (source.charAt(0) !== value.charAt(0)) {
        return false;
    }
    return source.indexOf(value) === 0;
}

function trimEnd(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces;
    }
    var i;
    var l = source.length;
    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}
    return source.substring(0, i + 1);
}

function trimStart(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces;
    }
    var i;
    var l = source.length;
    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {}
    return source.substring(i);
}

function truncate(source) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var prune = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    length = length > 0 ? length : 0;
    if (!(prune instanceof String || typeof prune === 'string')) {
        prune = '...';
    }
    if (source.length <= length) {
        return source;
    }
    var template = source.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, function (c) {
        return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
    });
    if (template.slice(template.length - 2).match(/\w\w/)) {
        template = template.replace(/\s*\S+$/, '');
    } else {
        template = trimEnd(template.slice(0, template.length - 1));
    }
    return (template + prune).length > source.length ? source : source.slice(0, template.length) + prune;
}

function ucWords(str) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
    if (!(str instanceof String || typeof str === 'string') || str === "") {
        return '';
    }
    var ar = str.split(separator);
    var l = ar.length;
    while (--l > -1) {
        ar[l] = ar[l].charAt(0).toUpperCase() + ar[l].substring(1);
    }
    return ar.join(separator);
}

var versionUUID = function versionUUID(uuid) {
  return uuid.charAt(14) | 0;
};

function validateUUID(source) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return false;
    }
    source = source.toLowerCase();
    if (!pattern$1.test(source)) {
        return false;
    }
    if (!version) {
        version = versionUUID(source);
    } else if (versionUUID(source) !== version) {
        return false;
    }
    switch (version) {
        case 1:
        case 2:
            {
                return true;
            }
        case 3:
        case 4:
            {
                return ['8', '9', 'a', 'b'].indexOf(source.charAt(19)) !== -1;
            }
        default:
            {
                throw new Error('Invalid version provided.');
            }
    }
}
var pattern$1 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @summary The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @namespace core.strings
 * @memberof core
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var strings = Object.assign({
    between: between,
    camelCase: camelCase,
    capitalize: capitalize,
    center: center,
    clean: clean,
    compare: compare$1,
    endsWith: endsWith,
    fastformat: fastformat,
    fastformatDate: fastformatDate,
    format: format,
    hyphenate: hyphenate,
    indexOfAny: indexOfAny,
    insert: insert,
    lastIndexOfAny: lastIndexOfAny,
    pad: pad,
    repeat: repeat$1,
    startsWith: startsWith,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    ucFirst: ucFirst,
    ucWords: ucWords,
    validateUUID: validateUUID,
    versionUUID: versionUUID
});

/**
 * The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies : arrays, strings, chars, objects, numbers, maths, date, colors, etc.
 * <p>You can consider a library as a set of functions organized into classes, here with a <strong>"core"</strong> library in some cases we organize the functions in the package definitions without assembling them into a class.</p>
 * <p>Those functions are allowed to reuse the builtin types (Object, Array, Date, etc.), the Javascript API classes and packages, but nothing else.</p>
 * @summary The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core
 * @version 1.0.7
 * @since 1.0.0
 */
var core = Object.assign({
    global: exports.global,
    dump: dump,
    cancelAnimationFrame: cancelAnimationFrame,
    requestAnimationFrame: requestAnimationFrame,
    isBoolean: isBoolean,
    isFloat: isFloat,
    isInt: isInt,
    isNumber: isNumber,
    isString: isString,
    isUint: isUint,
    arrays: arrays,
    chars: chars,
    colors: colors,
    date: date,
    easings: easings,
    functors: functors,
    maths: maths,
    numbers: numbers,
    objects: objects,
    random: random,
    reflect: reflect,
    strings: strings
});

function Enum(value, name) {
    Object.defineProperties(this, {
        _name: {
            value: typeof name === "string" || name instanceof String ? name : "",
            enumerable: false,
            writable: true,
            configurable: true
        },
        _value: {
            value: isNaN(value) ? 0 : value,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}
Enum.prototype = Object.create(Object.prototype);
Enum.prototype.constructor = Enum;
Enum.prototype.equals = function (object) {
    if (object === this) {
        return true;
    }
    if (object instanceof Enum) {
        return object.toString() === this.toString() && object.valueOf() === this.valueOf();
    }
    return false;
};
Enum.prototype.toString = function () {
    return this._name;
};
Enum.prototype.valueOf = function () {
    return this._value;
};

function isEquatable(target) {
  if (target) {
    return target.equals && target.equals instanceof Function || target instanceof Equatable;
  }
  return false;
}
function Equatable() {}
Equatable.prototype = Object.create(Object.prototype);
Equatable.prototype.constructor = Equatable;
Equatable.prototype.equals = function (object) {
};

function isEvaluable(target) {
  if (target) {
    return target instanceof Evaluable || 'eval' in target && target.eval instanceof Function;
  }
  return false;
}
function Evaluable() {}
Evaluable.prototype = Object.create(Object.prototype);
Evaluable.prototype.constructor = Evaluable;
Evaluable.prototype.eval = function (value) {};

function isFormattable(target) {
  if (target) {
    return target instanceof Formattable || 'format' in target && target.format instanceof Function;
  }
  return false;
}
function Formattable() {}
Formattable.prototype = Object.create(Object.prototype);
Formattable.prototype.constructor = Formattable;
Formattable.prototype.format = function (value) {
};

function isIdentifiable(target) {
    if (target) {
        return target instanceof Identifiable || 'id' in target;
    }
    return false;
}
function Identifiable() {
    Object.defineProperties(this, {
        id: { value: null, enumerable: true, writable: true }
    });
}
Identifiable.prototype = Object.create(Object.prototype, {
    constructor: { value: Identifiable, writable: true }
});

function isIterator(target) {
  if (target) {
    return target instanceof Iterator ||
    Boolean(target['delete']) && target.delete instanceof Function && Boolean(target['hasNext']) && target.hasNext instanceof Function && Boolean(target['key']) && target.key instanceof Function && Boolean(target['next']) && target.next instanceof Function && Boolean(target['reset']) && target.reset instanceof Function && Boolean(target['seek']) && target.seek instanceof Function
    ;
  }
  return false;
}
function Iterator() {}
Iterator.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: Iterator },
  delete: { writable: true, value: function value() {} },
  hasNext: { writable: true, value: function value() {} },
  key: { writable: true, value: function value() {} },
  next: { writable: true, value: function value() {} },
  reset: { writable: true, value: function value() {} },
  seek: { writable: true, value: function value(position) {} },
  toString: {
    writable: true, value: function value() {
      if (!('__clazzname__' in this.constructor)) {
        Object.defineProperty(this.constructor, '__clazzname__', { value: this.constructor.name });
      }
      return '[' + this.constructor.__clazzname__ + ']';
    }
  }
});

function isOrderedIterator(target) {
  var bool = false;
  if (target) {
    bool = target instanceof OrderedIterator || 'hasNext' in target && target.hasNext instanceof Function && 'hasPrevious' in target && target.hasPrevious instanceof Function && 'key' in target && target.key instanceof Function && 'next' in target && target.next instanceof Function && 'previous' in target && target.previous instanceof Function && 'remove' in target && target.remove instanceof Function && 'reset' in target && target.reset instanceof Function && 'seek' in target && target.seek instanceof Function;
  }
  return bool;
}
function OrderedIterator() {}
OrderedIterator.prototype = Object.create(Iterator.prototype);
OrderedIterator.prototype.constructor = OrderedIterator;
OrderedIterator.prototype.hasPrevious = function () {};
OrderedIterator.prototype.previous = function () {};
OrderedIterator.prototype.toString = function () {
  return '[OrderedIterator]';
};

function isValidator(target) {
  if (target) {
    if (target instanceof Validator) {
      return true;
    }
    return 'supports' in target && target.supports instanceof Function && 'validate' in target && target.validate instanceof Function;
  }
  return false;
}
function Validator() {}
Validator.prototype = Object.create(Object.prototype);
Validator.prototype.constructor = Validator;
Validator.prototype.supports = function (value) {};
Validator.prototype.validate = function (value) /*void*/{};

function KeyValuePair() {}
KeyValuePair.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: KeyValuePair },
  length: { get: function get() {
      return 0;
    } },
  clear: { value: function value() {}, writable: true },
  clone: { value: function value() {
      return new KeyValuePair();
    }, writable: true },
  delete: { value: function value(key) {}, writable: true },
  forEach: { value: function value(callback) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    }, writable: true },
  get: { value: function value(key) {
      return null;
    }, writable: true },
  has: { value: function value(key) {
      return false;
    }, writable: true },
  hasValue: { value: function value(_value) {
      return false;
    }, writable: true },
  isEmpty: { value: function value() {
      return false;
    }, writable: true },
  iterator: { value: function value() /*Iterator*/{
      return null;
    }, writable: true },
  keyIterator: { value: function value() /*Iterator*/{
      return null;
    }, writable: true },
  keys: { value: function value() {
      return null;
    }, writable: true },
  set: { value: function value(key, _value2) {}, writable: true },
  setAll: { value: function value(map /*KeyValuePair*/) {}, writable: true },
  toString: { value: function value() {
      return '[' + this.constructor.name + ']';
    }, writable: true },
  values: { value: function value() {}, writable: true }
});

function Property() {}
Property.prototype = Object.create(Object.prototype);
Property.prototype.constructor = Property;

function Attribute() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  this.name = name instanceof String || typeof name === 'string' ? name : null;
  this.value = value;
}
Attribute.prototype = Object.create(Property.prototype);
Attribute.prototype.constructor = Attribute;
Attribute.prototype.toString = function () {
  return "[Attribute]";
};

function Method() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.name = name instanceof String || typeof name === 'string' ? name : null;
  this.args = args instanceof Array ? args : null;
}
Method.prototype = Object.create(Property.prototype);
Method.prototype.constructor = Method;
Method.prototype.toString = function () {
  return "[Method]";
};

function ArrayIterator(array) {
    if (!(array instanceof Array)) {
        throw new ReferenceError(this + " constructor failed, the passed-in Array argument not must be 'null'.");
    }
    Object.defineProperties(this, {
        _a: { value: array, writable: true },
        _k: { value: -1, writable: true }
    });
}
ArrayIterator.prototype = Object.create(Iterator.prototype, {
    constructor: { value: ArrayIterator },
    delete: { value: function value() {
            return this._a.splice(this._k--, 1)[0];
        } },
    hasNext: { value: function value() {
            return this._k < this._a.length - 1;
        } },
    key: { value: function value() {
            return this._k;
        } },
    next: { value: function value() {
            return this._a[++this._k];
        } },
    reset: { value: function value() {
            this._k = -1;
        } },
    seek: { value: function value(position) {
            position = Math.max(Math.min(position - 1, this._a.length), -1);
            this._k = isNaN(position) ? -1 : position;
        } }
});

function MapIterator(map) {
    if (map && map instanceof KeyValuePair) {
        Object.defineProperties(this, {
            _m: { value: map, writable: true },
            _i: { value: new ArrayIterator(map.keys()), writable: true },
            _k: { value: null, writable: true }
        });
    } else {
        throw new ReferenceError(this + " constructor failed, the passed-in KeyValuePair argument not must be 'null'.");
    }
}
MapIterator.prototype = Object.create(Iterator.prototype, {
    constructor: { writable: true, value: MapIterator },
    delete: { value: function value() {
            this._i.delete();
            return this._m.delete(this._k);
        } },
    hasNext: { value: function value() {
            return this._i.hasNext();
        } },
    key: { value: function value() {
            return this._k;
        } },
    next: { value: function value() {
            this._k = this._i.next();
            return this._m.get(this._k);
        } },
    reset: { value: function value() {
            this._i.reset();
        } },
    seek: { value: function value(position) {
            throw new Error("This Iterator does not support the seek() method.");
        } }
});

function MapEntry(key, value) {
  this.key = key;
  this.value = value;
}
MapEntry.prototype = Object.create(Object.prototype);
MapEntry.prototype.constructor = MapEntry;
MapEntry.prototype.clone = function () {
  return new MapEntry(this.key, this.value);
};
MapEntry.prototype.toString = function () {
  return "[MapEntry key:" + this.key + " value:" + this.value + "]";
};

function MapFormatter() {}
MapFormatter.prototype = Object.create(Object.prototype);
MapFormatter.prototype.constructor = MapFormatter;
MapFormatter.prototype.format = function (value) {
    if (value && value instanceof KeyValuePair) {
        var r = "{";
        var keys = value.keys();
        var len = keys.length;
        if (len > 0) {
            var values = value.values();
            for (var i = 0; i < len; i++) {
                r += keys[i] + ':' + values[i];
                if (i < len - 1) {
                    r += ",";
                }
            }
        }
        r += "}";
        return r;
    } else {
        return "{}";
    }
};
var formatter = new MapFormatter();

function ArrayMap() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    Object.defineProperties(this, {
        _keys: {
            value: [],
            writable: true
        },
        _values: {
            value: [],
            writable: true
        }
    });
    if (keys === null || values === null) {
        this._keys = [];
        this._values = [];
    } else {
        var b = keys instanceof Array && values instanceof Array && keys.length > 0 && keys.length === values.length;
        this._keys = b ? [].concat(keys) : [];
        this._values = b ? [].concat(values) : [];
    }
}
ArrayMap.prototype = Object.create(KeyValuePair.prototype, {
    constructor: { writable: true, value: ArrayMap },
    length: { get: function get() {
            return this._keys.length;
        } }
});
ArrayMap.prototype.constructor = ArrayMap;
ArrayMap.prototype.clear = function () {
    this._keys = [];
    this._values = [];
};
ArrayMap.prototype.clone = function () {
    return new ArrayMap(this._keys, this._values);
};
ArrayMap.prototype.delete = function (key) {
    var v = null;
    var i = this.indexOfKey(key);
    if (i > -1) {
        v = this._values[i];
        this._keys.splice(i, 1);
        this._values.splice(i, 1);
    }
    return v;
};
ArrayMap.prototype.forEach = function (callback) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
    }
    var l = this._keys.length;
    for (var i = 0; i < l; i++) {
        callback.call(thisArg, this._values[i], this._keys[i], this);
    }
};
ArrayMap.prototype.get = function (key) {
    return this._values[this.indexOfKey(key)];
};
ArrayMap.prototype.getKeyAt = function (index) {
    return this._keys[index];
};
ArrayMap.prototype.getValueAt = function (index /*uint*/) {
    return this._values[index];
};
ArrayMap.prototype.has = function (key) {
    return this.indexOfKey(key) > -1;
};
ArrayMap.prototype.hasValue = function (value) {
    return this.indexOfValue(value) > -1;
};
ArrayMap.prototype.indexOfKey = function (key) {
    var l = this._keys.length;
    while (--l > -1) {
        if (this._keys[l] === key) {
            return l;
        }
    }
    return -1;
};
ArrayMap.prototype.indexOfValue = function (value) {
    var l = this._values.length;
    while (--l > -1) {
        if (this._values[l] === value) {
            return l;
        }
    }
    return -1;
};
ArrayMap.prototype.isEmpty = function () {
    return this._keys.length === 0;
};
ArrayMap.prototype.iterator = function () {
    return new MapIterator(this);
};
ArrayMap.prototype.keyIterator = function ()
{
    return new ArrayIterator(this._keys);
};
ArrayMap.prototype.keys = function () {
    return this._keys.concat();
};
ArrayMap.prototype.set = function (key, value) {
    var r = null;
    var i = this.indexOfKey(key);
    if (i < 0) {
        this._keys.push(key);
        this._values.push(value);
    } else {
        r = this._values[i];
        this._values[i] = value;
    }
    return r;
};
ArrayMap.prototype.setAll = function (map) {
    if (!map || !(map instanceof KeyValuePair)) {
        return;
    }
    var keys = map.keys();
    var values = map.values();
    var l = keys.length;
    for (var i = 0; i < l; i = i - -1) {
        this.put(keys[i], values[i]);
    }
};
ArrayMap.prototype.setKeyAt = function (index, key) {
    if (index >= this._keys.length) {
        throw new RangeError("ArrayMap.setKeyAt(" + index + ") failed with an index out of the range.");
    }
    if (this.containsKey(key)) {
        return null;
    }
    var k = this._keys[index];
    if (k === undefined) {
        return null;
    }
    var v = this._values[index];
    this._keys[index] = key;
    return new MapEntry(k, v);
};
ArrayMap.prototype.setValueAt = function (index, value) {
    if (index >= this._keys.length) {
        throw new RangeError("ArrayMap.setValueAt(" + index + ") failed with an index out of the range.");
    }
    var v = this._values[index];
    if (v === undefined) {
        return null;
    }
    var k = this._keys[index];
    this._values[index] = value;
    return new MapEntry(k, v);
};
ArrayMap.prototype.toString = function () {
    return formatter.format(this);
};
ArrayMap.prototype.values = function () {
    return this._values.concat();
};

/**
 * The {@link system.data} library provides a framework unified for representing and manipulating <b>collections</b>, enabling them to be manipulated independently of the details of their representation.
 * <p>It reduces programming effort while increasing performance. It enables interoperability among unrelated APIs, reduces effort in designing and learning new APIs, and fosters software reuse.</p>
 * <p>The framework is based on a serie of interfaces. It includes implementations of these interfaces and algorithms to manipulate them.</p></br>
 * <p>An <strong>abstract data type</strong> (<b>ADT</b>) is a model for a certain class of data structures that have similar behavior; or for certain data types of one or more programming languages that have similar semantics. The collections framework is a unified architecture for representing and manipulating collections, allowing them to be manipulated independently of the details of their representation. It reduces programming effort while increasing performance.</p>
 * <p>Originaly the {@link system.data} collection framework is loosely inspired on the <b>JAVA Collections Framework</b> and the <b>Jakarta Collections Framework</b> but with the new ES6 standard we change the basic implementation of the new <b>VEGAS</b> framework in the JS version of the library.</p>
 * <p>This framework is inspired on interfaces to defines the different types of collections : * Map * Bag * Collections * Iterator * Set * Queue & Stack... </p>
 * @summary The {@link system.data} library provides a framework unified for representing and manipulating <b>collections</b>.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.data
 * @memberof system
 */
var data = Object.assign({
  isIdentifiable: isIdentifiable,
  isIterator: isIterator,
  isOrderedIterator: isOrderedIterator,
  isValidator: isValidator,
  Identifiable: Identifiable,
  Iterator: Iterator,
  KeyValuePair: KeyValuePair,
  OrderedIterator: OrderedIterator,
  Property: Property,
  Validator: Validator,
  Attribute: Attribute,
  Method: Method,
  iterators: {
    ArrayIterator: ArrayIterator,
    MapIterator: MapIterator
  },
  maps: {
    ArrayMap: ArrayMap
  }
});

function ConcurrencyError(message, fileName, lineNumber) {
  this.name = 'ConcurrencyError';
  this.message = message || 'concurrency error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}
ConcurrencyError.prototype = Object.create(Error.prototype);
ConcurrencyError.prototype.constructor = ConcurrencyError;

function InvalidChannelError(message, fileName, lineNumber) {
  this.name = 'InvalidChannelError';
  this.message = message || 'invalid channel error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}
InvalidChannelError.prototype = Object.create(Error.prototype);
InvalidChannelError.prototype.constructor = InvalidChannelError;

function InvalidFilterError(message, fileName, lineNumber) {
  this.name = 'InvalidFilterError';
  this.message = message || 'invalid filter error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}
InvalidFilterError.prototype = Object.create(Error.prototype);
InvalidFilterError.prototype.constructor = InvalidFilterError;

function NonUniqueKeyError(key, pattern, fileName, lineNumber) {
  this.name = 'NonUniqueKeyError';
  this.key = key;
  this.pattern = pattern || NonUniqueKeyError.PATTERN;
  this.message = fastformat(this.pattern, key);
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}
NonUniqueKeyError.PATTERN = "attempting to insert the key '{0}'";
NonUniqueKeyError.prototype = Object.create(Error.prototype);
NonUniqueKeyError.prototype.constructor = NonUniqueKeyError;

function NoSuchElementError(message, fileName, lineNumber) {
  this.name = 'NoSuchElementError';
  this.message = message || 'no such element error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}
NoSuchElementError.prototype = Object.create(Error.prototype);
NoSuchElementError.prototype.constructor = NoSuchElementError;

/**
 * The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>), rather than part of the Javascript core language. The <strong>Javascript</strong> core language is the part of the language that complies with the <strong>ECMAScript</strong> standard.
 * @summary The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>).
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.errors
 * @memberof system
 */
var errors = Object.assign({
  ConcurrencyError: ConcurrencyError,
  InvalidChannelError: InvalidChannelError,
  InvalidFilterError: InvalidFilterError,
  NonUniqueKeyError: NonUniqueKeyError,
  NoSuchElementError: NoSuchElementError
});

function MultiEvaluator() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Object.defineProperties(this, {
        autoClear: { value: false, writable: true },
        _evaluators: { value: [], writable: true }
    });
    if (elements instanceof Array && elements.length > 0) {
        this.add.apply(this, elements);
    }
}
MultiEvaluator.prototype = Object.create(Evaluable.prototype, {
    length: {
        get: function get() {
            return this._evaluators.length;
        }
    },
    add: { value: function value() {
            if (this.autoClear) {
                this.clear();
            }
            for (var _len = arguments.length, evaluators = Array(_len), _key = 0; _key < _len; _key++) {
                evaluators[_key] = arguments[_key];
            }
            var l = evaluators.length;
            if (l > 0) {
                var c, i, j;
                var e;
                for (i = 0; i < l; i++) {
                    e = evaluators[i];
                    if (e instanceof Evaluable) {
                        this._evaluators.push(e);
                    } else if (e instanceof Array) {
                        c = e.length;
                        for (j = 0; j < c; j++) {
                            if (e[j] instanceof Evaluable) {
                                this._evaluators.push(e[j]);
                            }
                        }
                    }
                }
            }
        } },
    clear: { value: function value() {
            this._evaluators = [];
        } },
    eval: { value: function value(_value) {
            this._evaluators.forEach(function (element) {
                if (element instanceof Evaluable) {
                    _value = element.eval(_value);
                }
            });
            return _value;
        } },
    remove: { value: function value(evaluator) {
            if (evaluator instanceof Evaluable) {
                var index = this._evaluators.indexOf(evaluator);
                if (index > -1) {
                    this._evaluators.splice(index, 1);
                    return true;
                }
            }
            return false;
        } }
});
MultiEvaluator.prototype.constructor = MultiEvaluator;
MultiEvaluator.prototype.toString = function () {
    return "[MultiEvaluator]";
};

function PropertyEvaluator(target) {
    Object.defineProperties(this, {
        separator: { value: ".", writable: true },
        target: { value: target, writable: true, configurable: true },
        throwError: { value: false, writable: true },
        undefineable: { value: null, writable: true }
    });
}
PropertyEvaluator.prototype = Object.create(Evaluable.prototype);
PropertyEvaluator.prototype.constructor = PropertyEvaluator;
PropertyEvaluator.prototype.eval = function (o) {
    if (o !== null && (typeof o === "string" || o instanceof String) && this.target !== null) {
        var exp = String(o);
        if (exp.length > 0) {
            var value = this.target;
            var members = exp.split(this.separator);
            var len = members.length;
            for (var i = 0; i < len; i++) {
                if (members[i] in value) {
                    value = value[members[i]];
                } else {
                    if (this.throwError) {
                        throw new EvalError(this + " eval failed with the expression : " + o);
                    }
                    return this.undefineable;
                }
            }
            return value;
        }
    }
    return this.undefineable;
};
PropertyEvaluator.prototype.toString = function () {
    return "[PropertyEvaluator]";
};

function RomanNumber() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    Object.defineProperties(this, {
        _num: { value: 0, writable: true }
    });
    if (typeof value === "string" || value instanceof String) {
        this._num = RomanNumber.parseRomanString(value);
    } else if (typeof value === "number" || value instanceof Number) {
        if (value > RomanNumber.MAX) {
            throw new RangeError("Max value for a RomanNumber is " + RomanNumber.MAX);
        }
        if (value < RomanNumber.MIN) {
            throw new RangeError("Min value for a RomanNumber is " + RomanNumber.MIN);
        }
        this._num = value;
    }
}
Object.defineProperties(RomanNumber, {
    MAX: { value: 3999, enumerable: true },
    MIN: { value: 0, enumerable: true },
    NUMERIC: { value: [1000, 500, 100, 50, 10, 5, 1], enumerable: true },
    ROMAN: { value: ["M", "D", "C", "L", "X", "V", "I"], enumerable: true },
    parse: {
        value: function value(num) {
            var MAX = RomanNumber.MAX;
            var MIN = RomanNumber.MIN;
            var NUMERIC = RomanNumber.NUMERIC;
            var ROMAN = RomanNumber.ROMAN;
            var n /*uint*/ = 0;
            var r = "";
            if (typeof num === "number" || num instanceof Number) {
                if (num > RomanNumber.MAX) {
                    throw new RangeError("Max value for a RomanNumber is " + MAX);
                } else if (num < RomanNumber.MIN) {
                    throw new RangeError("Min value for a RomanNumber is " + MIN);
                }
                n = num;
            }
            var i;
            var rank;
            var bellow;
            var roman;
            var romansub;
            var size = NUMERIC.length;
            for (i = 0; i < size; i++) {
                if (n === 0) {
                    break;
                }
                rank = NUMERIC[i];
                roman = ROMAN[i];
                if (String(rank).charAt(0) === "5") {
                    bellow = rank - NUMERIC[i + 1];
                    romansub = ROMAN[i + 1];
                } else {
                    bellow = rank - NUMERIC[i + 2];
                    romansub = ROMAN[i + 2];
                }
                if (n >= rank || n >= bellow) {
                    while (n >= rank) {
                        r += roman;
                        n -= rank;
                    }
                }
                if (n > 0 && n >= bellow) {
                    r += romansub + roman;
                    n -= bellow;
                }
            }
            return r;
        }
    },
    parseRomanString: {
        value: function value(roman) {
            var NUMERIC = RomanNumber.NUMERIC;
            var ROMAN = RomanNumber.ROMAN;
            if (roman === null || roman === "") {
                return 0;
            }
            roman = roman.toUpperCase();
            var n /*uint*/ = 0;
            var pos = 0;
            var ch = "";
            var next = "";
            var ich;
            var inext;
            while (pos >= 0) {
                ch = roman.charAt(pos);
                next = roman.charAt(pos + 1);
                if (ch === "") {
                    break;
                }
                ich = ROMAN.indexOf(ch);
                inext = ROMAN.indexOf(next);
                if (ich < 0) {
                    return 0;
                } else if (ich <= inext || inext === -1) {
                    n += NUMERIC[ich];
                } else {
                    n += NUMERIC[inext] - NUMERIC[ich];
                    pos++;
                }
                pos++;
            }
            return n;
        }
    }
});
RomanNumber.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: RomanNumber },
    parse: { value: function value(_value) {
            return RomanNumber.parse(typeof _value === "number" || _value instanceof Number ? _value : this._num);
        } },
    toString: { value: function value() {
            return this.parse(this._num);
        } },
    valueOf: { value: function value()
        {
            return this._num;
        } }
});

function RomanEvaluator() {}
RomanEvaluator.prototype = Object.create(Evaluable.prototype);
RomanEvaluator.prototype.constructor = RomanEvaluator;
RomanEvaluator.prototype.eval = function (value) {
  if (typeof value === 'string' || value instanceof String) {
    return RomanNumber.parseRomanString(value);
  } else if (typeof value === 'number' || value instanceof Number) {
    return RomanNumber.parse(value);
  } else {
    return null;
  }
};
RomanEvaluator.prototype.toString = function () {
  return "[RomanEvaluator]";
};

/**
 * The {@link system.evaluators} library contains classes to evaluates some objects with a collection of specific strategies.
 * @summary The {@link system.evaluators} library contains classes to evaluates some objects.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.evaluators
 * @memberof system
 */
var evaluators = Object.assign({
  MultiEvaluator: MultiEvaluator,
  PropertyEvaluator: PropertyEvaluator,
  RomanEvaluator: RomanEvaluator
});

function Event(type) {
  var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  Object.defineProperties(this, {
    _bubbles: { writable: true, value: Boolean(bubbles) },
    _cancelable: { writable: true, value: Boolean(cancelable) },
    _constructorName: { writable: true, value: null },
    _currentTarget: { writable: true, value: null },
    _defaultPrevented: { writable: true, value: false },
    _eventPhase: { writable: true, value: 0 },
    _propagationStopped: { writable: true, value: false },
    _immediatePropagationStopped: { writable: true, value: false },
    _target: { writable: true, value: null },
    _type: { writable: true, value: type instanceof String || typeof type === 'string' ? type : null }
  });
}
Event.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: Event },
  bubbles: { get: function get() {
      return this._bubbles;
    } },
  cancelable: { get: function get() {
      return this._cancelable;
    } },
  currentTarget: { get: function get() {
      return this._currentTarget;
    } },
  eventPhase: { get: function get() {
      return this._eventPhase;
    } },
  target: { get: function get() {
      return this._target;
    } },
  timestamp: { value: new Date().valueOf() },
  type: { get: function get() {
      return this._type;
    } },
  clone: { writable: true, value: function value() {
      return new Event(this._type, this._bubbles, this._cancelable);
    } },
  formatToString: { value: function value(className) {
      if (!className) {
        if (!this._constructorName) {
          this._constructorName = this.constructor.name;
        }
        className = this._constructorName;
      }
      var ar = [];
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      var len = rest.length;
      for (var i = 0; i < len; ++i) {
        if (rest[i] in this) {
          ar.push(rest[i] + ":" + this[rest[i]]);
        }
      }
      return "[" + className + " " + ar.join(' ') + "]";
    } },
  isDefaultPrevented: { value: function value() {
      return this._defaultPrevented;
    } },
  isImmediatePropagationStopped: { value: function value() {
      return this._immediatePropagationStopped;
    } },
  isPropagationStopped: { value: function value() {
      return this._propagationStopped;
    } },
  preventDefault: { value: function value() {
      if (this._cancelable) {
        this._defaultPrevented = true;
      }
    } },
  stopImmediatePropagation: { value: function value() {
      this._immediatePropagationStopped = true;
    } },
  stopPropagation: { value: function value() {
      this._propagationStopped = true;
    } },
  toString: { writable: true, value: function value() {
      return this.formatToString(null, "type", "bubbles", "cancelable");
    } },
  withTarget: { value: function value(target) {
      var event = this.target ? this.clone() : this;
      event._target = target;
      return event;
    } },
  withCurrentTarget: { value: function value(currentTarget) {
      this._currentTarget = currentTarget;
      return this;
    } }
});
Object.defineProperties(Event, {
  ACTIVATE: { value: "activate" },
  ADDED: { value: "added" },
  ADDED_TO_STAGE: { value: "addedToStage" },
  CANCEL: { value: "cancel" },
  CHANGE: { value: "change" },
  CLEAR: { value: "clear" },
  CLICK: { value: "click" },
  CLOSE: { value: "close" },
  COMPLETE: { value: "complete" },
  CONNECT: { value: "connect" },
  COPY: { value: "copy" },
  CUT: { value: "cut" },
  DEACTIVATE: { value: "deactivate" },
  FULLSCREEN: { value: "fullScreen" },
  INIT: { value: "init" },
  OPEN: { value: "open" },
  PASTE: { value: "paste" },
  REMOVED: { value: "removed" },
  REMOVED_FROM_STAGE: { value: "removedFromStage" },
  RENDER: { value: "render" },
  RESIZE: { value: "resize" },
  SCROLL: { value: "scroll" },
  SELECT: { value: "select" },
  UNLOAD: { value: "unload" }
});

function EventListener() {}
EventListener.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: EventListener },
  handleEvent: { writable: true, value: function value() {} },
  toString: { writable: true, value: function value() {
      return '[' + this.constructor.name + ']';
    } }
});

var EventPhase = Object.defineProperties({}, {
  AT_TARGET: { value: 2, enumerable: true },
  BUBBLING_PHASE: { value: 3, enumerable: true },
  CAPTURING_PHASE: { value: 1, enumerable: true },
  NONE: { value: 0, enumerable: true }
});

function IEventDispatcher() {}
IEventDispatcher.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: IEventDispatcher },
  addEventListener: { writable: true, value: function value(type, listener) {
      var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    } },
  dispatchEvent: { writable: true, value: function value(event) {} },
  hasEventListener: { writable: true, value: function value(type) {} },
  removeEventListener: { writable: true, value: function value(type, listener) {
      var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    } },
  willTrigger: { writable: true, value: function value(type) {} }
});

function EventDispatcher(target) {
    Object.defineProperties(this, {
        target: { writable: true, value: target instanceof IEventDispatcher ? target : null },
        _captureListeners: { value: {} },
        _listeners: { value: {} }
    });
}
EventDispatcher.prototype = Object.create(IEventDispatcher.prototype, {
    constructor: { writable: true, value: EventDispatcher },
    addEventListener: { writable: true, value: function value(type, listener) {
            var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            if (!(type instanceof String || typeof type === 'string')) {
                throw new TypeError(this + " addEventListener failed, the type argument must be a valid String expression.");
            }
            if (!(listener instanceof Function || listener instanceof EventListener)) {
                throw new TypeError(this + " addEventListener failed, the listener must be a valid Function or EventListener reference.");
            }
            var collection = useCapture ? this._captureListeners : this._listeners;
            var entry = {
                type: type,
                listener: listener,
                useCapture: useCapture,
                priority: priority
            };
            if (!(type in collection)) {
                collection[type] = [entry];
            } else {
                collection[type].push(entry);
            }
            collection[type].sort(this.compare);
        } },
    dispatchEvent: { writable: true, value: function value(event) {
            if (!(event instanceof Event)) {
                throw new TypeError(this + " dispatchEvent failed, the event argument must be a valid Event object.");
            }
            event = event.withTarget(this.target || this);
            var ancestors = this.createAncestorChain();
            event._eventPhase = EventPhase.CAPTURING_PHASE;
            EventDispatcher.internalHandleCapture(event, ancestors);
            if (!event.isPropagationStopped()) {
                event._eventPhase = EventPhase.AT_TARGET;
                event.withCurrentTarget(event._target);
                var listeners = this._listeners[event.type];
                if (this._listeners[event.type]) {
                    EventDispatcher.processListeners(event, listeners);
                }
            }
            if (event.bubbles && !event.isPropagationStopped()) {
                event._eventPhase = EventPhase.BUBBLING_PHASE;
                EventDispatcher.internalHandleBubble(event, ancestors);
            }
            return !event.isDefaultPrevented();
        } },
    hasEventListener: { writable: true, value: function value(type) {
            return Boolean(this._listeners[type] || this._captureListeners[type]);
        } },
    removeEventListener: { writable: true, value: function value(type, listener) {
            var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            if (!(type instanceof String || typeof type === 'string')) {
                throw new TypeError(this + " removeEventListener failed, the type must be a valid String expression.");
            }
            if (!(listener instanceof Function || listener instanceof EventListener)) {
                throw new TypeError(this + " removeEventListener failed, the listener must be a valid Function or EventListener reference.");
            }
            var collection = useCapture ? this._captureListeners : this._listeners;
            var listeners = collection[type];
            if (listeners && listeners.length > 0) {
                var len = listeners.length;
                for (var i = 0; i < len; ++i) {
                    if (listeners[i].listener === listener) {
                        if (len === 1) {
                            delete collection[type];
                        } else {
                            listeners.splice(i, 1);
                        }
                        break;
                    }
                }
            }
        } },
    toString: { writable: true, value: function value() {
            var exp = '[' + this.constructor.name;
            if (this.target) {
                exp += ' target:' + this.target;
            }
            return exp + ']';
        } },
    willTrigger: { writable: true, value: function value(type) {
            var parents = this.createAncestorChain();
            if (parents instanceof Array && parents.length > 0) {
                var parent = void 0;
                var len = parents.length;
                while (--len > -1) {
                    parent = parents[len];
                    if (parent instanceof IEventDispatcher && parent.hasEventListener(type)) {
                        return true;
                    }
                }
            }
            return this.hasEventListener(type);
        } },
    createAncestorChain: { writable: true, value: function value() {
            return null;
        } },
    compare: { value: function value(entry1, entry2) {
            if (entry1.priority > entry2.priority) {
                return -1;
            } else if (entry1.priority < entry2.priority) {
                return 1;
            } else {
                return 0;
            }
        } },
    processCapture: { value: function value(event) {
            event.withCurrentTarget(this.target || this);
            var listeners = this._captureListeners[event.type];
            if (listeners) {
                EventDispatcher.processListeners(event, listeners);
            }
        } },
    processBubble: { value: function value(event) {
            event.withCurrentTarget(this.target || this);
            var listeners = this._listeners[event.type];
            if (listeners) {
                EventDispatcher.processListeners(event, listeners);
            }
        } }
});
Object.defineProperties(EventDispatcher, {
    processListeners: { value: function value(event, listeners) {
            if (listeners instanceof Array && listeners.length > 0) {
                var len = listeners.length;
                var listener = void 0;
                for (var i = 0; i < len; ++i) {
                    listener = listeners[i].listener;
                    var flag = void 0;
                    if (listener instanceof EventListener) {
                        flag = listener.handleEvent(event);
                    } else {
                        flag = listener(event);
                    }
                    if (flag === false) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    if (event.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
        } },
    internalHandleCapture: { value: function value(event, ancestors) {
            if (!(ancestors instanceof Array) || ancestors.length <= 0) {
                return;
            }
            var dispatcher = void 0;
            var len = ancestors.length - 1;
            for (var i = len; i >= 0; i--) {
                dispatcher = ancestors[i];
                dispatcher.processCapture(event);
                if (event.isPropagationStopped()) {
                    break;
                }
            }
        } },
    internalHandleBubble: { value: function value(event, ancestors) {
            if (!ancestors || ancestors.length <= 0) {
                return;
            }
            var dispatcher = void 0;
            var len = ancestors.length;
            for (var i = 0; i < len; i++) {
                dispatcher = ancestors[i];
                dispatcher.processBubble(event);
                if (event.isPropagationStopped()) {
                    break;
                }
            }
        } }
});

/**
 * The {@link system.events} package provides a W3C Event Model implementation.
 * @summary The {@link system.events} package provides an W3C Event Model library.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.events
 * @memberof system
 * @example <caption>Basic usage with a <code>callback</code> function</caption>
 * var click = function( event )
 * {
 *     trace( "click: " + event ) ;
 * };
 *
 * var dispatcher = new EventDispatcher() ;
 *
 * dispatcher.addEventListener( Event.CLICK , click ) ;
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 * @example <caption>Use the W3C DOM {@link system.events.EventListener|EventListener} interface</caption>
 * var Click = function( name )
 * {
 *     this.name = name ;
 * }
 *
 * Click.prototype = Object.create( EventListener.prototype ,
 * {
 *     constructor : { value : Click } ,
 *     handleEvent : { value : function( event )
 *     {
 *         trace( this + ' ' + this.name + ' event:' + event ) ;
 *     }}
 * });
 *
 * var click1 = new Click( '#1') ;
 * var click2 = new Click( '#2') ;
 *
 * var dispatcher = new EventDispatcher() ;
 *
 * dispatcher.addEventListener( Event.CLICK , click1 ) ;
 * dispatcher.addEventListener( Event.CLICK , click2 ) ;
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 *
 * dispatcher.removeEventListener( Event.CLICK , click2 ) ;
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 */
var events = Object.assign({
  Event: Event,
  EventDispatcher: EventDispatcher,
  EventListener: EventListener,
  EventPhase: EventPhase,
  IEventDispatcher: IEventDispatcher
});

function ExpressionFormatter() {
    Object.defineProperties(this, {
        expressions: { value: new ArrayMap() },
        _beginSeparator: { value: '{', writable: true },
        _endSeparator: { value: '}', writable: true },
        _pattern: { value: "{0}((\\w+\)|(\\w+)((.\\w)+|(.\\w+))){1}" },
        _reg: { value: null, writable: true }
    });
    this._reset();
}
Object.defineProperties(ExpressionFormatter, {
    MAX_RECURSION: { value: 200, enumerable: true }
});
ExpressionFormatter.prototype = Object.create(Formattable.prototype, {
    constructor: { value: ExpressionFormatter },
    beginSeparator: {
        get: function get() {
            return this._beginSeparator;
        },
        set: function set(str) {
            this._beginSeparator = str || "{";
            this._reset();
        }
    },
    endSeparator: {
        get: function get() {
            return this._endSeparator;
        },
        set: function set(str) {
            this._endSeparator = str || "}";
            this._reset();
        }
    },
    length: {
        get: function get() {
            return this.expressions.length;
        }
    },
    clear: {
        value: function value() {
            this.expressions.clear();
        }
    },
    format: {
        value: function value(_value) {
            return this._format(String(_value), 0);
        }
    },
    set: {
        value: function value(key, _value2) {
            if (key === '' || !(key instanceof String || typeof key === 'string')) {
                return false;
            }
            if (_value2 === '' || !(_value2 instanceof String || typeof _value2 === 'string')) {
                return false;
            }
            this.expressions.set(key, _value2);
            return true;
        }
    },
    toString: { value: function value() {
            return '[ExpressionFormatter]';
        } },
    _reset: {
        value: function value() {
            this._reg = new RegExp(fastformat(this._pattern, this.beginSeparator, this.endSeparator), "g");
        }
    },
    _format: { value: function value(str) {
            var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if (depth >= ExpressionFormatter.MAX_RECURSION) {
                return str;
            }
            var m = str.match(this._reg);
            if (m === null) {
                return str;
            }
            var l = m.length;
            if (l > 0) {
                var exp = void 0;
                var key = void 0;
                for (var i = 0; i < l; i++) {
                    key = m[i].substr(1);
                    key = key.substr(0, key.length - 1);
                    if (this.expressions.has(key)) {
                        exp = this._format(this.expressions.get(key), depth + 1);
                        this.expressions.set(key, exp);
                        str = str.replace(m[i], exp) || exp;
                    }
                }
            }
            return str;
        } }
});

/**
 * The {@link system.formatters} library contains classes to format objects to a specific string expression.
 * @summary The {@link system.formatters} library contains classes to format objects to a specific string expression.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.formatters
 * @memberof system
 */
var formatters = Object.assign({
  ExpressionFormatter: ExpressionFormatter
});

function Receiver() {}
Receiver.prototype = Object.create(Object.prototype, {
  constructor: { writable: true, value: Receiver },
  receive: { writable: true, value: function value() {} },
  toString: { writable: true, value: function value() {
      return "[Receiver]";
    } }
});

function Signaler() {}
Signaler.prototype = Object.create(Object.prototype, {
    length: {
        get: function get() {
            return 0;
        }
    }
});
Signaler.prototype.constructor = Signaler;
Signaler.prototype.connect = function (receiver)
{
    var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var autoDisconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
}
;Signaler.prototype.connected = function () {}
;Signaler.prototype.disconnect = function (receiver) {}
;Signaler.prototype.emit = function ()
{}
;Signaler.prototype.hasReceiver = function (receiver) {
};

function SignalEntry(receiver) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  this.auto = auto;
  this.receiver = receiver;
  this.priority = priority;
}
SignalEntry.prototype = Object.create(Object.prototype);
SignalEntry.prototype.constructor = SignalEntry;
SignalEntry.prototype.toString = function () {
  return '[SignalEntry]';
};

function Signal() {
    Object.defineProperties(this, {
        proxy: { value: null, configurable: true, writable: true },
        receivers: { value: [] }
    });
}
Signal.prototype = Object.create(Signaler.prototype, {
    constructor: { value: Signal, writable: true },
    length: { get: function get() {
            return this.receivers.length;
        } },
    connect: { value: function value(receiver) {
            var _this = this;
            var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var autoDisconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            if (receiver === null) {
                return false;
            }
            autoDisconnect = autoDisconnect === true;
            priority = priority > 0 ? priority - priority % 1 : 0;
            if (typeof receiver === "function" || receiver instanceof Function || receiver instanceof Receiver || "receive" in receiver) {
                var _ret = function () {
                    if (_this.hasReceiver(receiver)) {
                        return {
                            v: false
                        };
                    }
                    _this.receivers.push(new SignalEntry(receiver, priority, autoDisconnect));
                    var i = void 0;
                    var j = void 0;
                    var a = _this.receivers;
                    var swap = function swap(j, k) {
                        var temp = a[j];
                        a[j] = a[k];
                        a[k] = temp;
                        return true;
                    };
                    var swapped = false;
                    var l = a.length;
                    for (i = 1; i < l; i++) {
                        for (j = 0; j < l - i; j++) {
                            if (a[j + 1].priority > a[j].priority) {
                                swapped = swap(j, j + 1);
                            }
                        }
                        if (!swapped) {
                            break;
                        }
                    }
                    return {
                        v: true
                    };
                }();
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
            return false;
        } },
    connected: { value: function value() {
            return this.receivers.length > 0;
        } },
    disconnect: { value: function value(receiver) {
            if (receiver === null) {
                if (this.receivers.length > 0) {
                    this.receivers = [];
                    return true;
                } else {
                    return false;
                }
            }
            if (this.receivers.length > 0) {
                var l = this.receivers.length;
                while (--l > -1) {
                    if (this.receivers[l].receiver === receiver) {
                        this.receivers.splice(l, 1);
                        return true;
                    }
                }
            }
            return false;
        } },
    emit: { value: function value() {
            var l = this.receivers.length;
            if (l === 0) {
                return;
            }
            var i = void 0;
            var r = [];
            var a = this.receivers.slice();
            var e = void 0;
            var slot;
            for (i = 0; i < l; i++) {
                e = a[i];
                if (e.auto) {
                    r.push(e);
                }
            }
            if (r.length > 0) {
                l = r.length;
                while (--l > -1) {
                    i = this.receivers.indexOf(r[l]);
                    if (i > -1) {
                        this.receivers.splice(i, 1);
                    }
                }
            }
            l = a.length;
            for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
                values[_key] = arguments[_key];
            }
            for (i = 0; i < l; i++) {
                slot = a[i].receiver;
                if (slot instanceof Function || typeof receiver === "function") {
                    slot.apply(this.proxy || this, values);
                } else if (slot instanceof Receiver || "receive" in slot && slot.receive instanceof Function) {
                    slot.receive.apply(this.proxy || slot, values);
                }
            }
        } },
    hasReceiver: { value: function value(receiver) {
            if (receiver === null) {
                return false;
            }
            if (this.receivers.length > 0) {
                var l = this.receivers.length;
                while (--l > -1) {
                    if (this.receivers[l].receiver === receiver) {
                        return true;
                    }
                }
            }
            return false;
        } },
    toArray: { value: function value() {
            var r = [];
            var l = this.receivers.length;
            if (l > 0) {
                for (var i = 0; i < l; i++) {
                    r.push(this.receivers[i].receiver);
                }
            }
            return r;
        } },
    toString: { value: function value() {
            return '[Signal]';
        } }
});

function LoggerLevel(value, name) {
    Enum.call(this, value, name);
}
LoggerLevel.prototype = Object.create(Enum.prototype);
LoggerLevel.prototype.constructor = LoggerLevel;
Object.defineProperties(LoggerLevel, {
    ALL: { value: new LoggerLevel(1, 'ALL'), enumerable: true },
    CRITICAL: { value: new LoggerLevel(16, 'CRITICAL'), enumerable: true },
    DEBUG: { value: new LoggerLevel(2, 'DEBUG'), enumerable: true },
    DEFAULT_LEVEL_STRING: { value: 'UNKNOWN', enumerable: true },
    ERROR: { value: new LoggerLevel(8, 'ERROR'), enumerable: true },
    INFO: { value: new LoggerLevel(4, 'INFO'), enumerable: true },
    NONE: { value: new LoggerLevel(0, 'NONE'), enumerable: true },
    WARNING: { value: new LoggerLevel(6, 'WARNING'), enumerable: true },
    WTF: { value: new LoggerLevel(32, 'WTF'), enumerable: true },
    get: {
        value: function value(_value) {
            var levels = [LoggerLevel.ALL, LoggerLevel.CRITICAL, LoggerLevel.DEBUG, LoggerLevel.ERROR, LoggerLevel.INFO, LoggerLevel.NONE, LoggerLevel.WARNING, LoggerLevel.WTF];
            var l = levels.length;
            while (--l > -1) {
                if (levels[l]._value === _value) {
                    return levels[l];
                }
            }
            return null;
        }
    },
    getLevelString: {
        value: function value(_value2) {
            if (LoggerLevel.validate(_value2)) {
                return _value2.toString();
            } else {
                return LoggerLevel.DEFAULT_LEVEL_STRING;
            }
        }
    },
    validate: {
        value: function value(level /*LoggerLevel*/) {
            var levels = [LoggerLevel.ALL, LoggerLevel.CRITICAL, LoggerLevel.DEBUG, LoggerLevel.ERROR, LoggerLevel.INFO, LoggerLevel.NONE, LoggerLevel.WARNING, LoggerLevel.WTF];
            return levels.indexOf(level) > -1;
        }
    }
});

function LoggerEntry(message, level, channel) {
  this.channel = channel;
  this.level = level instanceof LoggerLevel ? level : LoggerLevel.ALL;
  this.message = message;
}
LoggerEntry.prototype = Object.create(Object.prototype);
LoggerEntry.prototype.constructor = LoggerEntry;

function Logger(channel) {
    Signal.call(this);
    Object.defineProperties(this, {
        _entry: { value: new LoggerEntry(null, null, channel), writable: true }
    });
}
Logger.prototype = Object.create(Signal.prototype, {
    constructor: { writable: true, value: Logger },
    channel: { get: function get() {
            return this._entry.channel;
        } },
    critical: { value: function value(context) {
            for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                options[_key - 1] = arguments[_key];
            }
            this._log(LoggerLevel.CRITICAL, context, options);
        } },
    debug: { value: function value(context) {
            for (var _len2 = arguments.length, options = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                options[_key2 - 1] = arguments[_key2];
            }
            this._log(LoggerLevel.DEBUG, context, options);
        } },
    error: { value: function value(context) {
            for (var _len3 = arguments.length, options = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                options[_key3 - 1] = arguments[_key3];
            }
            this._log(LoggerLevel.ERROR, context, options);
        } },
    info: { value: function value(context) {
            for (var _len4 = arguments.length, options = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                options[_key4 - 1] = arguments[_key4];
            }
            this._log(LoggerLevel.INFO, context, options);
        } },
    log: { value: function value(context) {
            for (var _len5 = arguments.length, options = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                options[_key5 - 1] = arguments[_key5];
            }
            this._log(LoggerLevel.ALL, context, options);
        } },
    warning: {
        value: function value(context) {
            for (var _len6 = arguments.length, options = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                options[_key6 - 1] = arguments[_key6];
            }
            this._log(LoggerLevel.WARNING, context, options);
        }
    },
    wtf: { value: function value(context) {
            for (var _len7 = arguments.length, options = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                options[_key7 - 1] = arguments[_key7];
            }
            this._log(LoggerLevel.WTF, context, options);
        } },
    toString: { value: function value() {
            return '[Logger]';
        } },
    _log: {
        value: function value(level /*LoggerLevel*/, context, options)
        {
            if (this.connected()) {
                if ((typeof context === "string" || context instanceof String) && options instanceof Array) {
                    var len = options.length;
                    for (var i = 0; i < len; i++) {
                        context = String(context).replace(new RegExp("\\{" + i + "\\}", "g"), options[i]);
                    }
                }
                this._entry.message = context;
                this._entry.level = level;
                this.emit(this._entry);
            }
        }
    }
});

var strings$1 = Object.defineProperties({}, {
  CHARS_INVALID: { value: "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\", enumerable: true },
  CHAR_PLACEMENT: { value: "'*' must be the right most character.", enumerable: true },
  EMPTY_FILTER: { value: "filter must not be null or empty.", enumerable: true },
  ERROR_FILTER: { value: "Error for filter '{0}'.", enumerable: true },
  DEFAULT_CHANNEL: { value: "", enumerable: true },
  ILLEGALCHARACTERS: { value: "[]~$^&/\\(){}<>+=`!#%?,:;'\"@", enumerable: true },
  INVALID_CHARS: { value: "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@", enumerable: true },
  INVALID_LENGTH: { value: "Channels must be at least one character in length.", enumerable: true },
  INVALID_TARGET: { value: "Log, Invalid target specified.", enumerable: true }
});

function LoggerTarget() {
    Object.defineProperties(this, {
        _count: { value: 0, writable: true },
        _factory: { value: null, writable: true },
        _filters: { value: ["*"], writable: true },
        _level: { value: LoggerLevel.ALL, writable: true }
    });
    this.factory = Log;
}
LoggerTarget.prototype = Object.create(Receiver.prototype, {
    constructor: { value: LoggerTarget, writable: true },
    factory: {
        get: function get() {
            return this._factory;
        },
        set: function set(factory) {
            if (this._factory) {
                this._factory.removeTarget(this);
            }
            this._factory = factory instanceof LoggerFactory ? factory : Log;
            this._factory.addTarget(this);
        }
    },
    filters: {
        get: function get() {
            return [].concat(this._filters);
        },
        set: function set(value)
        {
            var filters = [];
            if (value && value instanceof Array && value.length > 0) {
                var filter;
                var length = value.length;
                for (var i = 0; i < length; i++) {
                    filter = value[i];
                    if (filters.indexOf(filter) === -1) {
                        this._checkFilter(filter);
                        filters.push(filter);
                    }
                }
            } else {
                filters.push('*');
            }
            if (this._count > 0) {
                this._factory.removeTarget(this);
            }
            this._filters = filters;
            if (this._count > 0) {
                this._factory.addTarget(this);
            }
        }
    },
    level: {
        get: function get() {
            return this._level;
        },
        set: function set(value /*LoggerLevel*/)
        {
            this._factory.removeTarget(this);
            this._level = value || LoggerLevel.ALL;
            this._factory.addTarget(this);
        }
    },
    addFilter: {
        value: function value(channel) {
            this._checkFilter(channel);
            var index = this._filters.indexOf(channel);
            if (index === -1) {
                this._filters.push(channel);
                return true;
            }
            return false;
        }
    },
    addLogger: {
        value: function value(logger) {
            if (logger && logger instanceof Logger) {
                this._count++;
                logger.connect(this);
            }
        }
    },
    logEntry: {
        value: function value(entry)
        {
        }
    },
    receive: {
        value: function value(entry) {
            if (entry instanceof LoggerEntry) {
                if (this._level === LoggerLevel.NONE) {
                    return;
                } else if (entry.level.valueOf() >= this._level.valueOf()) {
                    this.logEntry(entry);
                }
            }
        }
    },
    removeFilter: {
        value: function value(channel) {
            if (channel && (typeof channel === "string" || channel instanceof String) && channel !== "") {
                var index = this._filters.indexOf(channel);
                if (index > -1) {
                    this._filters.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    },
    removeLogger: {
        value: function value(logger /*Logger*/)
        {
            if (logger instanceof Logger) {
                this._count--;
                logger.disconnect(this);
            }
        }
    },
    _checkFilter: {
        value: function value(filter)
        {
            if (filter === null) {
                throw new InvalidFilterError(strings$1.EMPTY_FILTER);
            }
            if (this._factory.hasIllegalCharacters(filter)) {
                throw new InvalidFilterError(fastformat(strings$1.ERROR_FILTER, filter) + strings$1.CHARS_INVALID);
            }
            var index = filter.indexOf("*");
            if (index >= 0 && index !== filter.length - 1) {
                throw new InvalidFilterError(fastformat(strings$1.ERROR_FILTER, filter) + strings$1.CHAR_PLACEMENT);
            }
        }
    },
    toString: { value: function value() {
            return '[LoggerTarget]';
        } }
});

function LoggerFactory() {
    Object.defineProperties(this, {
        _loggers: { value: new ArrayMap(), writable: true },
        _targetLevel: { value: LoggerLevel.NONE, writable: true },
        _targets: { value: [], writable: true }
    });
}
LoggerFactory.prototype = Object.create(Receiver.prototype, {
    constructor: { value: LoggerFactory },
    addTarget: { value: function value(target /*LoggerTarget*/)
        {
            if (target && target instanceof LoggerTarget) {
                var channel;
                var log;
                var filters = target.filters;
                var it /*Iterator*/ = this._loggers.iterator();
                while (it.hasNext()) {
                    log = it.next();
                    channel = it.key();
                    if (this._channelMatchInFilterList(channel, filters)) {
                        target.addLogger(log);
                    }
                }
                this._targets.push(target);
                if (this._targetLevel === LoggerLevel.NONE || target.level.valueOf() < this._targetLevel.valueOf()) {
                    this._targetLevel = target.level;
                }
            } else {
                throw new Error(strings$1.INVALID_TARGET);
            }
        } },
    flush: { value: function value()
        {
            this._loggers.clear();
            this._targets = [];
            this._targetLevel = LoggerLevel.NONE;
        } },
    getLogger: { value: function value(channel)
        {
            this._checkChannel(channel);
            var logger = this._loggers.get(channel);
            if (!logger) {
                logger = new Logger(channel);
                this._loggers.set(channel, logger);
            }
            var target = void 0;
            var len = this._targets.length;
            for (var i = 0; i < len; i++) {
                target = this._targets[i];
                if (this._channelMatchInFilterList(channel, target.filters)) {
                    target.addLogger(logger);
                }
            }
            return logger;
        } },
    hasIllegalCharacters: { value: function value(_value) {
            return indexOfAny(_value, strings$1.ILLEGALCHARACTERS.split("")) !== -1;
        } },
    isAll: { value: function value() {
            return this._targetLevel === LoggerLevel.ALL;
        } },
    isCritical: { value: function value() {
            return this._targetLevel === LoggerLevel.CRITICAL;
        } },
    isDebug: { value: function value() {
            return this._targetLevel === LoggerLevel.DEBUG;
        } },
    isError: { value: function value() {
            return this._targetLevel === LoggerLevel.ERROR;
        } },
    isInfo: { value: function value() {
            return this._targetLevel === LoggerLevel.INFO;
        } },
    isWarning: { value: function value() {
            return this._targetLevel === LoggerLevel.WARNING;
        } },
    isWtf: { value: function value() {
            return this._targetLevel === LoggerLevel.WTF;
        } },
    removeTarget: {
        value: function value(target) {
            if (target && target instanceof LoggerTarget) {
                var log;
                var filters = target.filters;
                var it = this._loggers.iterator();
                while (it.hasNext()) {
                    log = it.next();
                    var c = it.key();
                    if (this._channelMatchInFilterList(c, filters)) {
                        target.removeLogger(log);
                    }
                }
                var len = this._targets.length;
                for (var i = 0; i < len; i++) {
                    if (target === this._targets[i]) {
                        this._targets.splice(i, 1);
                        i--;
                    }
                }
                this._resetTargetLevel();
            } else {
                throw new Error(strings$1.INVALID_TARGET);
            }
        }
    },
    toString: { value: function value() {
            return '[LoggerFactory]';
        } },
    _channelMatchInFilterList: {
        value: function value(channel, filters) {
            var filter;
            var index = -1;
            var len = filters.length;
            for (var i = 0; i < len; i++) {
                filter = filters[i];
                index = filter.indexOf("*");
                if (index === 0) {
                    return true;
                }
                index = index < 0 ? index = channel.length : index - 1;
                if (channel.substring(0, index) === filter.substring(0, index)) {
                    return true;
                }
            }
            return false;
        }
    },
    _checkChannel: {
        value: function value(channel)
        {
            if (channel === null || channel.length === 0) {
                throw new InvalidChannelError(strings$1.INVALID_LENGTH);
            }
            if (this.hasIllegalCharacters(channel) || channel.indexOf("*") !== -1) {
                throw new InvalidChannelError(strings$1.INVALID_CHARS);
            }
        }
    },
    _resetTargetLevel: {
        value: function value()
        {
            var t;
            var min /*LoggerLevel*/ = LoggerLevel.NONE;
            var len = this._targets.length;
            for (var i = 0; i < len; i++) {
                t = this._targets[i];
                if (min === LoggerLevel.NONE || t.level.valueOf() < min.valueOf()) {
                    min = t.level;
                }
            }
            this._targetLevel = min;
        }
    }
});

var Log = new LoggerFactory();

var logger = Log.getLogger("system.ioc.logger");

var MagicReference = Object.defineProperties({}, {
  CONFIG: { value: "#config", enumerable: true },
  INIT: { value: "#init", enumerable: true },
  LOCALE: { value: "#locale", enumerable: true },
  PARAMS: { value: "#params", enumerable: true },
  ROOT: { value: "#root", enumerable: true },
  STAGE: { value: "#stage", enumerable: true },
  THIS: { value: "#this", enumerable: true }
});

var ObjectAttribute = Object.defineProperties({}, {
  ARGUMENTS: { value: 'args', enumerable: true },
  CONFIG: { value: 'config', enumerable: true },
  CONFIGURATION: { value: 'configuration', enumerable: true },
  EVALUATORS: { value: 'evaluators', enumerable: true },
  FACTORY: { value: 'factory', enumerable: true },
  IDENTIFY: { value: 'identify', enumerable: true },
  I18N: { value: 'i18n', enumerable: true },
  IMPORTS: { value: 'imports', enumerable: true },
  LAZY_INIT: { value: 'lazyInit', enumerable: true },
  LOCALE: { value: 'locale', enumerable: true },
  LOCK: { value: 'lock', enumerable: true },
  NAME: { value: 'name', enumerable: true },
  OBJECT_DEPENDS_ON: { value: 'dependsOn', enumerable: true },
  OBJECT_DESTROY_METHOD_NAME: { value: 'destroy', enumerable: true },
  OBJECT_FACTORY_LOGIC: { value: 'factoryLogic', enumerable: true },
  OBJECT_FACTORY_METHOD: { value: 'factoryMethod', enumerable: true },
  OBJECT_FACTORY_PROPERTY: { value: 'factoryProperty', enumerable: true },
  OBJECT_FACTORY_REFERENCE: { value: 'factoryReference', enumerable: true },
  OBJECT_FACTORY_VALUE: { value: 'factoryValue', enumerable: true },
  OBJECT_GENERATES: { value: 'generates', enumerable: true },
  OBJECT_ID: { value: 'id', enumerable: true },
  OBJECT_INIT_METHOD_NAME: { value: 'init', enumerable: true },
  OBJECT_LISTENERS: { value: 'listeners', enumerable: true },
  OBJECT_PROPERTIES: { value: 'properties', enumerable: true },
  OBJECT_RECEIVERS: { value: 'receivers', enumerable: true },
  OBJECT_SCOPE: { value: 'scope', enumerable: true },
  OBJECT_SINGLETON: { value: 'singleton', enumerable: true },
  OBJECT_STATIC_FACTORY_METHOD: { value: 'staticFactoryMethod', enumerable: true },
  OBJECT_STATIC_FACTORY_PROPERTY: { value: 'staticFactoryProperty', enumerable: true },
  OBJECTS: { value: 'objects', enumerable: true },
  RESOURCE: { value: 'resource', enumerable: true },
  TYPE: { value: 'type', enumerable: true },
  TYPE_ALIAS: { value: 'alias', enumerable: true },
  TYPE_ALIASES: { value: 'typeAliases', enumerable: true },
  TYPE_EXPRESSION: { value: 'typeExpression', enumerable: true },
  REFERENCE: { value: 'ref', enumerable: true },
  VALUE: { value: 'value', enumerable: true }
});

function ObjectArgument(value) {
    var policy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "value";
    var evaluators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    Object.defineProperties(this, {
        _policy: { value: null, writable: true },
        policy: {
            get: function policy() {
                return this._policy;
            },
            set: function set(str) {
                switch (str) {
                    case ObjectAttribute.REFERENCE:
                    case ObjectAttribute.CONFIG:
                    case ObjectAttribute.LOCALE:
                        {
                            this._policy = str;
                            break;
                        }
                    default:
                        {
                            this._policy = ObjectAttribute.VALUE;
                        }
                }
            }
        }
    });
    this.policy = policy;
    this.value = value;
    this.evaluators = evaluators instanceof Array ? [].concat(evaluators) : null;
}
ObjectArgument.prototype = Object.create(Object.prototype, {
    constructor: { value: ObjectArgument },
    toString: { value: function value() {
            return '[ObjectArgument]';
        } }
});

function ConfigEvaluator(config /*ObjectConfig*/) {
    PropertyEvaluator.call(this);
    this.config = config instanceof ObjectConfig ? config : null;
    Object.defineProperties(this, {
        target: {
            get: function get() {
                return this.config !== null ? this.config.config : null;
            }
        }
    });
}
ConfigEvaluator.prototype = Object.create(PropertyEvaluator.prototype, {
    constructor: { value: ConfigEvaluator },
    toString: { value: function value() {
            return '[ConfigEvaluator]';
        } }
});

function LocaleEvaluator(config) {
    PropertyEvaluator.call(this);
    this.config = config instanceof ObjectConfig ? config : null;
    Object.defineProperties(this, {
        target: {
            get: function get() {
                return this.config !== null ? this.config.locale : null;
            }
        }
    });
}
LocaleEvaluator.prototype = Object.create(PropertyEvaluator.prototype, {
    constructor: { value: LocaleEvaluator },
    toString: { value: function value() {
            return '[LocaleEvaluator]';
        } }
});

function isLockable(target) {
    if (target) {
        if (target instanceof Lockable) {
            return true;
        } else {
            return Boolean(target['isLocked']) && target.isLocked instanceof Function && Boolean(target['lock']) && target.lock instanceof Function && Boolean(target['unlock']) && target.unlock instanceof Function;
        }
    }
    return false;
}
function Lockable() {
    Object.defineProperties(this, {
        __lock__: { writable: true, value: false }
    });
}
Lockable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Lockable },
    isLocked: { writable: true, value: function value() {
            return this.__lock__;
        } },
    lock: { writable: true, value: function value() {
            this.__lock__ = true;
        } },
    unlock: { writable: true, value: function value() {
            this.__lock__ = false;
        } },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function createArguments(a) {
    if (!(a instanceof Array) || a.length === 0) {
        return null;
    } else {
        var args = [];
        var o;
        var evaluators;
        var conf;
        var i18n;
        var ref;
        var value;
        var l = a.length;
        for (var i = 0; i < l; i++) {
            o = a[i];
            if (o !== null) {
                conf = ObjectAttribute.CONFIG in o ? String(o[ObjectAttribute.CONFIG]) : null;
                i18n = ObjectAttribute.LOCALE in o ? String(o[ObjectAttribute.LOCALE]) : null;
                ref = ObjectAttribute.REFERENCE in o ? String(o[ObjectAttribute.REFERENCE]) : null;
                value = ObjectAttribute.VALUE in o ? o[ObjectAttribute.VALUE] : null;
                evaluators = ObjectAttribute.EVALUATORS in o ? o[ObjectAttribute.EVALUATORS] : null;
                if (ref !== null && ref.length > 0) {
                    args.push(new ObjectArgument(ref, ObjectAttribute.REFERENCE, evaluators));
                } else if (conf !== null && conf.length > 0) {
                    args.push(new ObjectArgument(conf, ObjectAttribute.CONFIG, evaluators));
                } else if (i18n !== null && i18n.length > 0) {
                    args.push(new ObjectArgument(i18n, ObjectAttribute.LOCALE, evaluators));
                } else {
                    args.push(new ObjectArgument(value, ObjectAttribute.VALUE, evaluators));
                }
            }
        }
        return args.length > 0 ? args : null;
    }
}

var ObjectOrder = Object.defineProperties({}, {
  AFTER: { value: "after", enumerable: true },
  BEFORE: { value: "before", enumerable: true },
  NONE: { value: "none", enumerable: true },
  NOW: { value: "now", enumerable: true }
});

function ObjectListener(dispatcher, type) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "after";
  Object.defineProperties(this, {
    dispatcher: { value: dispatcher, writable: true },
    method: { value: method, writable: true },
    order: {
      get: function get() {
        return this._order;
      },
      set: function set(value) {
        this._order = value === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER;
      }
    },
    type: { value: type, writable: true },
    useCapture: { value: Boolean(useCapture), writable: true },
    _order: { value: order === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER, writable: true }
  });
}
Object.defineProperties(ObjectListener, {
  DISPATCHER: { value: "dispatcher", enumerable: true },
  METHOD: { value: "method", enumerable: true },
  ORDER: { value: "order", enumerable: true },
  USE_CAPTURE: { value: "useCapture", enumerable: true },
  TYPE: { value: "type", enumerable: true }
});
ObjectListener.prototype = Object.create(Object.prototype, {
  constructor: { value: ObjectListener },
  toString: { value: function value() {
      var s = '[ObjectListener';
      if (this.signal) {
        s += ' dispatcher:"' + this.dispatcher + '"';
      }
      if (this.slot) {
        s += ' type:"' + this.type + '"';
      }
      if (this.method) {
        s += ' method:"' + this.method + '"';
      }
      if (this._order) {
        s += ' order:"' + this._order + '"';
      }
      s += ']';
      return s;
    } }
});

function createListeners(factory) {
    if (!factory) {
        return null;
    }
    var a = null;
    if (factory instanceof Array) {
        a = factory;
    } else if (ObjectAttribute.OBJECT_LISTENERS in factory && factory[ObjectAttribute.OBJECT_LISTENERS] instanceof Array) {
        a = factory[ObjectAttribute.OBJECT_LISTENERS];
    }
    if (a === null || a.length === 0) {
        return null;
    }
    var def;
    var dispatcher;
    var type;
    var listeners = [];
    var id = String(factory[ObjectAttribute.OBJECT_ID]);
    var len = a.length;
    for (var i = 0; i < len; i++) {
        def = a[i];
        if (def !== null && ObjectListener.DISPATCHER in def && ObjectListener.TYPE in def) {
            dispatcher = def[ObjectListener.DISPATCHER];
            if (!(dispatcher instanceof String || typeof dispatcher === 'string') || dispatcher.length === 0) {
                continue;
            }
            type = def[ObjectListener.TYPE];
            if (!(type instanceof String || typeof type === 'string') || type.length === 0) {
                continue;
            }
            listeners.push(new ObjectListener(dispatcher, type, def[ObjectListener.METHOD], def[ObjectListener.USE_CAPTURE] === true, def[ObjectListener.ORDER] === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER));
        } else {
            if (logger && logger instanceof Logger) {
                logger.warning("ObjectBuilder.createListeners failed, a listener definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}", id, i, dump(def));
            }
        }
    }
    return listeners.length > 0 ? listeners : null;
}

function ObjectStrategy() {}
ObjectStrategy.prototype = Object.create(Object.prototype, {
  constructor: { value: ObjectStrategy, writable: true },
  toString: { value: function value() {
      return "[ObjectStrategy]";
    }, writable: true }
});

function ObjectProperty(name, value) {
    var policy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "value";
    var evaluators = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    Object.defineProperties(this, {
        evaluators: { value: evaluators instanceof Array ? evaluators : null, writable: true },
        name: { value: name, writable: true },
        policy: {
            get: function get() {
                return this._policy;
            },
            set: function set(str) {
                switch (str) {
                    case ObjectAttribute.ARGUMENTS:
                    case ObjectAttribute.REFERENCE:
                    case ObjectAttribute.CONFIG:
                    case ObjectAttribute.LOCALE:
                        {
                            this._policy = str;
                            break;
                        }
                    default:
                        {
                            this._policy = ObjectAttribute.VALUE;
                        }
                }
            }
        },
        value: { value: value, writable: true },
        _policy: { value: null, writable: true }
    });
    this.policy = policy;
}
ObjectProperty.prototype = Object.create(ObjectStrategy.prototype, {
    constructor: { value: ObjectProperty, writable: true },
    toString: { value: function value() {
            return '[ObjectProperty]';
        }, writable: true }
});

function createProperties(factory) {
    if (!factory) {
        return null;
    }
    var a = null;
    if (factory instanceof Array) {
        a = factory;
    } else if (ObjectAttribute.OBJECT_PROPERTIES in factory && factory[ObjectAttribute.OBJECT_PROPERTIES] instanceof Array) {
        a = factory[ObjectAttribute.OBJECT_PROPERTIES];
    }
    if (!(a instanceof Array) || a.length === 0) {
        return null;
    }
    var properties = [];
    var id = String(factory[ObjectAttribute.OBJECT_ID]);
    var len = a.length;
    var prop = null;
    for (var i = 0; i < len; i++) {
        prop = a[i];
        var args = null;
        var conf = null;
        var i18n = null;
        var name = null;
        var ref = null;
        var value = null;
        var evaluators = null;
        if (prop && ObjectAttribute.NAME in prop) {
            name = prop[ObjectAttribute.NAME];
            if (!(name instanceof String || typeof name === 'string') || name.length === '') {
                continue;
            }
            if (ObjectAttribute.EVALUATORS in prop) {
                evaluators = prop[ObjectAttribute.EVALUATORS] instanceof Array ? prop[ObjectAttribute.EVALUATORS] : null;
            }
            if (ObjectAttribute.ARGUMENTS in prop) {
                args = prop[ObjectAttribute.ARGUMENTS] || null;
            }
            if (ObjectAttribute.CONFIG in prop) {
                conf = prop[ObjectAttribute.CONFIG] || null;
            }
            if (ObjectAttribute.LOCALE in prop) {
                i18n = prop[ObjectAttribute.LOCALE] || null;
            }
            if (ObjectAttribute.REFERENCE in prop) {
                ref = prop[ObjectAttribute.REFERENCE] || null;
            }
            if (ObjectAttribute.VALUE in prop) {
                value = prop[ObjectAttribute.VALUE];
            }
            if (args && args instanceof Array) {
                properties.push(new ObjectProperty(name, createArguments(args), ObjectAttribute.ARGUMENTS));
            } else if ((ref instanceof String || typeof ref === 'string') && ref !== '') {
                properties.push(new ObjectProperty(name, ref, ObjectAttribute.REFERENCE, evaluators));
            } else if ((conf instanceof String || typeof conf === 'string') && conf !== '') {
                properties.push(new ObjectProperty(name, conf, ObjectAttribute.CONFIG, evaluators));
            } else if ((i18n instanceof String || typeof i18n === 'string') && i18n !== '') {
                properties.push(new ObjectProperty(name, i18n, ObjectAttribute.LOCALE, evaluators));
            } else {
                properties.push(new ObjectProperty(name, value, ObjectAttribute.VALUE, evaluators));
            }
        } else {
            if (logger && logger instanceof Logger) {
                logger.warning("ObjectBuilder.createProperties failed, a property definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}", id, i, dump(prop));
            }
        }
    }
    return properties.length > 0 ? properties : null;
}

function ObjectReceiver(signal) {
  var slot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var autoDisconnect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "after";
  Object.defineProperties(this, {
    autoDisconnect: { value: autoDisconnect, writable: true },
    order: {
      get: function get() {
        return this._order;
      },
      set: function set(value) {
        this._order = value === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER;
      }
    },
    priority: { value: priority, writable: true },
    signal: { value: signal, writable: true },
    slot: { value: slot, writable: true },
    _order: { value: order === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER, writable: true }
  });
}
Object.defineProperties(ObjectReceiver, {
  AUTO_DISCONNECT: { value: "autoDisconnect", enumerable: true },
  ORDER: { value: "order", enumerable: true },
  PRIORITY: { value: "priority", enumerable: true },
  SIGNAL: { value: "signal", enumerable: true },
  SLOT: { value: "slot", enumerable: true }
});
ObjectReceiver.prototype = Object.create(Object.prototype, {
  constructor: { value: ObjectReceiver },
  toString: { value: function value() {
      var s = '[ObjectReceiver';
      if (this.signal) {
        s += ' signal:"' + this.signal + '"';
      }
      if (this.slot) {
        s += ' slot:"' + this.slot + '"';
      }
      if (this._order) {
        s += ' order:"' + this._order + '"';
      }
      s += ']';
      return s;
    } }
});

function createReceivers(factory) {
    if (!factory) {
        return null;
    }
    var a = null;
    if (factory instanceof Array) {
        a = factory;
    } else if (ObjectAttribute.OBJECT_RECEIVERS in factory && factory[ObjectAttribute.OBJECT_RECEIVERS] instanceof Array) {
        a = factory[ObjectAttribute.OBJECT_RECEIVERS];
    }
    if (a === null || a.length === 0) {
        return null;
    }
    var def;
    var receivers = [];
    var signal;
    var id = String(factory[ObjectAttribute.OBJECT_ID]);
    var len = a.length;
    for (var i = 0; i < len; i++) {
        def = a[i];
        if (def !== null && ObjectReceiver.SIGNAL in def) {
            signal = def[ObjectReceiver.SIGNAL];
            if (!(signal instanceof String || typeof signal === 'string') || signal.length === 0) {
                continue;
            }
            receivers.push(new ObjectReceiver(signal, def[ObjectReceiver.SLOT], isNaN(def[ObjectReceiver.PRIORITY]) ? 0 : def[ObjectReceiver.PRIORITY], def[ObjectReceiver.AUTO_DISCONNECT] === true, def[ObjectReceiver.ORDER] === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER));
        } else {
            if (logger && logger instanceof Logger) {
                logger.warning("ObjectBuilder.createReceivers failed, a receiver definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}", id, i, dump(def));
            }
        }
    }
    return receivers.length > 0 ? receivers : null;
}

function ObjectMethod(name, args) {
  Object.defineProperties(this, {
    args: { value: args, writable: true },
    name: { value: name, writable: true }
  });
}
ObjectMethod.prototype = Object.create(ObjectStrategy.prototype, {
  constructor: { value: ObjectMethod, writable: true },
  toString: { value: function value() {
      return '[ObjectMethod]';
    }, writable: true }
});

function ObjectFactoryMethod(factory, name, args) {
    ObjectMethod.call(name, args);
    Object.defineProperties(this, {
        factory: { value: factory, writable: true }
    });
}
Object.defineProperties(ObjectFactoryMethod, {
    build: {
        value: function value(o)
        {
            if (o === null) {
                return null;
            }
            if (ObjectAttribute.FACTORY in o && ObjectAttribute.NAME in o) {
                return new ObjectFactoryMethod(o[ObjectAttribute.FACTORY || null], o[ObjectAttribute.NAME || null], createArguments(o[ObjectAttribute.ARGUMENTS] || null));
            } else {
                return null;
            }
        }
    }
});
ObjectFactoryMethod.prototype = Object.create(ObjectMethod.prototype, {
    constructor: { value: ObjectFactoryMethod, writable: true },
    toString: { value: function value() {
            return '[ObjectFactoryMethod]';
        }, writable: true }
});

function ObjectFactoryProperty(factory, name) {
    var evaluators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    ObjectProperty.call(name, null, null, evaluators);
    Object.defineProperties(this, {
        factory: { value: factory, writable: true }
    });
}
Object.defineProperties(ObjectFactoryProperty, {
    build: {
        value: function value(o)
        {
            if (o === null) {
                return null;
            }
            if (ObjectAttribute.FACTORY in o && ObjectAttribute.NAME in o) {
                return new ObjectFactoryProperty(o[ObjectAttribute.FACTORY] || null, o[ObjectAttribute.NAME] || null, o[ObjectAttribute.EVALUATORS] || null);
            } else {
                return null;
            }
        }
    }
});
ObjectFactoryProperty.prototype = Object.create(ObjectProperty.prototype, {
    constructor: { value: ObjectFactoryProperty, writable: true },
    toString: { value: function value() {
            return '[ObjectFactoryProperty]';
        }, writable: true }
});

function ObjectReference(ref) {
    Object.defineProperties(this, {
        ref: { value: ref instanceof String || typeof ref === 'string' ? ref : null, writable: true }
    });
}
ObjectReference.prototype = Object.create(ObjectStrategy.prototype, {
    constructor: { value: ObjectReference },
    toString: { value: function value() {
            return '[ObjectReference]';
        } }
});

function ObjectStaticFactoryMethod(type, name, args) {
    ObjectMethod.call(name, args);
    Object.defineProperties(this, {
        type: { value: type, writable: true }
    });
}
Object.defineProperties(ObjectStaticFactoryMethod, {
    build: {
        value: function value(o)
        {
            if (o === null) {
                return null;
            }
            if (ObjectAttribute.TYPE in o && ObjectAttribute.NAME in o) {
                return new ObjectStaticFactoryMethod(o[ObjectAttribute.TYPE] || null, o[ObjectAttribute.NAME] || null, createArguments(o[ObjectAttribute.ARGUMENTS] || null));
            } else {
                return null;
            }
        }
    }
});
ObjectStaticFactoryMethod.prototype = Object.create(ObjectMethod.prototype, {
    constructor: { value: ObjectStaticFactoryMethod, writable: true },
    toString: { value: function value() {
            return '[ObjectStaticFactoryMethod]';
        }, writable: true }
});

function ObjectStaticFactoryProperty(name, type) {
    var evaluators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    ObjectProperty.call(name, null, null, evaluators);
    Object.defineProperties(this, {
        type: { value: type, writable: true }
    });
}
Object.defineProperties(ObjectStaticFactoryProperty, {
    build: {
        value: function value(o) {
            if (o === null) {
                return null;
            }
            if (ObjectAttribute.TYPE in o && ObjectAttribute.NAME in o) {
                return new ObjectStaticFactoryProperty(o[ObjectAttribute.NAME] || null, o[ObjectAttribute.TYPE] || null, o[ObjectAttribute.EVALUATORS] || null);
            } else {
                return null;
            }
        }
    }
});
ObjectStaticFactoryProperty.prototype = Object.create(ObjectProperty.prototype, {
    constructor: { value: ObjectStaticFactoryProperty, writable: true },
    toString: { value: function value() {
            return '[ObjectStaticFactoryProperty]';
        }, writable: true }
});

function ObjectValue(value) {
    Object.defineProperties(this, {
        value: { value: value, writable: true }
    });
}
ObjectValue.prototype = Object.create(ObjectStrategy.prototype, {
    constructor: { value: ObjectValue },
    toString: { value: function value() {
            return '[ObjectValue]';
        } }
});

function createStrategy(o) {
    switch (true) {
        case ObjectAttribute.OBJECT_FACTORY_METHOD in o:
            {
                return ObjectFactoryMethod.build(o[ObjectAttribute.OBJECT_FACTORY_METHOD]);
            }
        case ObjectAttribute.OBJECT_FACTORY_PROPERTY in o:
            {
                return ObjectFactoryProperty.build(o[ObjectAttribute.OBJECT_FACTORY_PROPERTY]);
            }
        case ObjectAttribute.OBJECT_STATIC_FACTORY_METHOD in o:
            {
                return ObjectStaticFactoryMethod.build(o[ObjectAttribute.OBJECT_STATIC_FACTORY_METHOD]);
            }
        case ObjectAttribute.OBJECT_STATIC_FACTORY_PROPERTY in o:
            {
                return ObjectStaticFactoryProperty.build(o[ObjectAttribute.OBJECT_STATIC_FACTORY_PROPERTY]);
            }
        case ObjectAttribute.OBJECT_FACTORY_REFERENCE in o:
            {
                return ObjectReference.build(o[ObjectAttribute.OBJECT_FACTORY_REFERENCE]);
            }
        case ObjectAttribute.OBJECT_FACTORY_VALUE in o:
            {
                return ObjectValue.build(o[ObjectAttribute.OBJECT_FACTORY_VALUE]);
            }
        default:
            {
                return null;
            }
    }
}

var ObjectScope = Object.defineProperties({}, {
  PROTOTYPE: { value: "prototype", enumerable: true },
  SINGLETON: { value: "singleton", enumerable: true },
  SCOPES: { value: ["prototype", "singleton"], enumerable: true },
  validate: { value: function value(scope) {
      return ObjectScope.SCOPES.indexOf(scope) > -1;
    } }
});

function ObjectDefinition(id, type) {
    var singleton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var lazyInit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (id === null || id === undefined) {
        throw new ReferenceError(this + " constructor failed, the 'id' value passed in argument not must be empty or 'null' or 'undefined'.");
    }
    if (type === null || type === undefined) {
        throw new ReferenceError(this + " constructor failed, the string 'type' passed in argument not must be empty or 'null' or 'undefined'.");
    }
    Object.defineProperties(this, {
        afterListeners: { get: function get() {
                return this._afterListeners;
            } },
        afterReceivers: { get: function get() {
                return this._afterReceivers;
            } },
        beforeListeners: { get: function get() {
                return this._beforeListeners;
            } },
        beforeReceivers: { get: function get() {
                return this._beforeReceivers;
            } },
        constructorArguments: { value: null, enumerable: true, writable: true },
        dependsOn: {
            enumerable: true,
            get: function get() {
                return this._dependsOn;
            },
            set: function set(ar) {
                this._dependsOn = ar instanceof Array && ar.length > 0 ? ar.filter(this._filterStrings) : null;
            }
        },
        destroyMethodName: { value: null, enumerable: true, writable: true },
        generates: {
            enumerable: true,
            get: function get() {
                return this._generates;
            },
            set: function set(ar) {
                this._generates = ar instanceof Array && ar.length > 0 ? ar.filter(this._filterStrings) : null;
            }
        },
        id: { value: id, enumerable: true, writable: true },
        identify: { value: false, enumerable: true, writable: true },
        initMethodName: { value: null, enumerable: true, writable: true },
        lazyInit: {
            get: function get() {
                return this._lazyInit;
            },
            set: function set(flag) {
                this._lazyInit = flag instanceof Boolean || typeof flag === 'boolean' ? flag : false;
            }
        },
        listeners: {
            set: function set(ar) {
                this._afterListeners = [];
                this._beforeListeners = [];
                if (ar === null || !(ar instanceof Array)) {
                    return;
                }
                var r;
                var l = ar.length;
                if (l > 0) {
                    for (var i = 0; i < l; i++) {
                        r = ar[i];
                        if (r instanceof ObjectListener) {
                            if (r.order === ObjectOrder.AFTER) {
                                this._afterListeners.push(r);
                            } else {
                                this._beforeListeners.push(r);
                            }
                        }
                    }
                }
            }
        },
        lock: { value: false, enumerable: true, writable: true },
        properties: { value: null, enumerable: true, writable: true },
        receivers: {
            set: function set(ar) {
                this._afterReceivers = [];
                this._beforeReceivers = [];
                if (ar === null || !(ar instanceof Array)) {
                    return;
                }
                var r;
                var l = ar.length;
                if (l > 0) {
                    for (var i = 0; i < l; i++) {
                        r = ar[i];
                        if (r instanceof ObjectReceiver) {
                            if (r.order === ObjectOrder.AFTER) {
                                this._afterReceivers.push(r);
                            } else {
                                this._beforeReceivers.push(r);
                            }
                        }
                    }
                }
            }
        },
        singleton: {
            get: function get() {
                return this._singleton;
            }
        },
        scope: {
            get: function get() {
                return this._scope;
            },
            set: function set(scope) {
                this._scope = ObjectScope.validate(scope) ? scope : ObjectScope.PROTOTYPE;
                this._singleton = Boolean(this._scope === ObjectScope.SINGLETON);
            }
        },
        strategy: {
            enumerable: true,
            get: function get() {
                return this._strategy;
            },
            set: function set(strategy) {
                this._strategy = strategy instanceof ObjectStrategy ? strategy : null;
            }
        },
        type: { value: type, enumerable: true, writable: true },
        _afterListeners: { value: null, writable: true },
        _beforeListeners: { value: null, writable: true },
        _dependsOn: { value: null, writable: true },
        _generates: { value: null, writable: true },
        _lazyInit: { value: lazyInit && singleton, writable: true },
        _singleton: { value: Boolean(singleton), writable: true },
        _scope: { value: Boolean(singleton) ? ObjectScope.SINGLETON : ObjectScope.PROTOTYPE, writable: true },
        _strategy: { value: null, writable: true }
    });
}
ObjectDefinition.prototype = Object.create(Identifiable.prototype, {
    constructor: { value: Identifiable, enumerable: true, writable: true },
    toString: { value: function value() {
            return "[ObjectDefinition]";
        } },
    _filterStrings: {
        value: function value(item) {
            return (typeof item === 'string' || item instanceof String) && item.length > 0;
        }
    }
});

function createObjectDefinition(o) {
    var definition = new ObjectDefinition(o[ObjectAttribute.OBJECT_ID] || null, o[ObjectAttribute.TYPE] || null, o[ObjectAttribute.OBJECT_SINGLETON] || false, o[ObjectAttribute.LAZY_INIT] || false);
    if (ObjectAttribute.IDENTIFY in o && (o[ObjectAttribute.IDENTIFY] instanceof Boolean || typeof o[ObjectAttribute.IDENTIFY] === 'boolean')) {
        definition.identify = o[ObjectAttribute.IDENTIFY];
    }
    if (ObjectAttribute.LOCK in o && (o[ObjectAttribute.LOCK] instanceof Boolean || typeof o[ObjectAttribute.LOCK] === 'boolean')) {
        definition.lock = o[ObjectAttribute.LOCK];
    }
    if (ObjectAttribute.ARGUMENTS in o && o[ObjectAttribute.ARGUMENTS] instanceof Array) {
        definition.constructorArguments = createArguments(o[ObjectAttribute.ARGUMENTS]);
    }
    if (ObjectAttribute.OBJECT_DESTROY_METHOD_NAME in o) {
        definition.destroyMethodName = o[ObjectAttribute.OBJECT_DESTROY_METHOD_NAME];
    }
    if (ObjectAttribute.OBJECT_INIT_METHOD_NAME in o) {
        definition.initMethodName = o[ObjectAttribute.OBJECT_INIT_METHOD_NAME];
    }
    if (ObjectAttribute.OBJECT_SCOPE in o) {
        definition.scope = o[ObjectAttribute.OBJECT_SCOPE];
    }
    if (ObjectAttribute.OBJECT_DEPENDS_ON in o && o[ObjectAttribute.OBJECT_DEPENDS_ON] instanceof Array) {
        definition.dependsOn = o[ObjectAttribute.OBJECT_DEPENDS_ON];
    }
    if (ObjectAttribute.OBJECT_GENERATES in o && o[ObjectAttribute.OBJECT_GENERATES] instanceof Array) {
        definition.generates = o[ObjectAttribute.OBJECT_GENERATES];
    }
    var listeners = createListeners(o);
    if (listeners) {
        definition.listeners = listeners;
    }
    var properties = createProperties(o);
    if (properties) {
        definition.properties = properties;
    }
    var receivers = createReceivers(o);
    if (receivers) {
        definition.receivers = receivers;
    }
    var strategy = createStrategy(o);
    if (strategy) {
        definition.factoryStrategy = strategy;
    }
    return definition;
}

function isRunnable(target) {
    if (target) {
        if (target instanceof Runnable) {
            return true;
        }
        return Boolean(target['run']) && target.run instanceof Function;
    }
    return false;
}
function Runnable() {}
Runnable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Runnable },
    run: { writable: true, value: function value() {
        } },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

var TaskPhase = Object.defineProperties({}, {
  ERROR: { value: 'error', enumerable: true },
  DELAYED: { value: 'delayed', enumerable: true },
  FINISHED: { value: 'finished', enumerable: true },
  INACTIVE: { value: 'inactive', enumerable: true },
  RUNNING: { value: 'running', enumerable: true },
  STOPPED: { value: 'stopped', enumerable: true },
  TIMEOUT: { value: 'timeout', enumerable: true }
});

function Action() {
  Object.defineProperties(this, {
    finishIt: { value: new Signal() },
    startIt: { value: new Signal() },
    __lock__: { writable: true, value: false },
    _phase: { writable: true, value: TaskPhase.INACTIVE },
    _running: { writable: true, value: false }
  });
}
Action.prototype = Object.create(Runnable.prototype, {
  constructor: { writable: true, value: Action },
  phase: { get: function get() {
      return this._phase;
    } },
  running: { get: function get() {
      return this._running;
    } },
  clone: { writable: true, value: function value() {
      return new Action();
    } },
  isLocked: { writable: true, value: function value() {
      return this.__lock__;
    } },
  lock: { writable: true, value: function value() {
      this.__lock__ = true;
    } },
  notifyFinished: { writable: true, value: function value() {
      this._running = false;
      this._phase = TaskPhase.FINISHED;
      this.finishIt.emit(this);
      this._phase = TaskPhase.INACTIVE;
    } },
  notifyStarted: { writable: true, value: function value() {
      this._running = true;
      this._phase = TaskPhase.RUNNING;
      this.startIt.emit(this);
    } },
  unlock: { writable: true, value: function value() {
      this.__lock__ = false;
    } }
});

function Task() {
  Action.call(this);
  Object.defineProperties(this, {
    changeIt: { value: new Signal() },
    clearIt: { value: new Signal() },
    infoIt: { value: new Signal() },
    looping: { value: false, writable: true },
    loopIt: { value: new Signal() },
    pauseIt: { value: new Signal() },
    progressIt: { value: new Signal() },
    resumeIt: { value: new Signal() },
    stopIt: { value: new Signal() },
    timeoutIt: { value: new Signal() }
  });
}
Task.prototype = Object.create(Action.prototype, {
  constructor: { writable: true, value: Task },
  clone: { writable: true, value: function value() {
      return new Task();
    } },
  notifyChanged: { writable: true, value: function value() {
      if (!this.__lock__) {
        this.changeIt.emit(this);
      }
    } },
  notifyCleared: { writable: true, value: function value() {
      if (!this.__lock__) {
        this.clearIt.emit(this);
      }
    } },
  notifyInfo: { writable: true, value: function value(info) {
      if (!this.__lock__) {
        this.infoIt.emit(this, info);
      }
    } },
  notifyLooped: { writable: true, value: function value() {
      this._phase = TaskPhase.RUNNING;
      if (!this.__lock__) {
        this.loopIt.emit(this);
      }
    } },
  notifyPaused: { writable: true, value: function value() {
      this._running = false;
      this._phase = TaskPhase.STOPPED;
      if (!this.__lock__) {
        this.pauseIt.emit(this);
      }
    } },
  notifyProgress: { writable: true, value: function value() {
      if (!this.__lock__) {
        this.progressIt.emit(this);
      }
    } },
  notifyResumed: { writable: true, value: function value() {
      this._phase = TaskPhase.RUNNING;
      if (!this.__lock__) {
        this.resumeIt.emit(this);
      }
    } },
  notifyStopped: { writable: true, value: function value() {
      this._running = false;
      this._phase = TaskPhase.STOPPED;
      if (!this.__lock__) {
        this.stopIt.emit(this);
      }
    } },
  notifyTimeout: { writable: true, value: function value() {
      this._running = false;
      this._phase = TaskPhase.TIMEOUT;
      if (!this.__lock__) {
        this.timeoutIt.emit(this);
      }
    } },
  resume: { writable: true, value: function value() {} },
  reset: { writable: true, value: function value() {} },
  start: { writable: true, value: function value() {
      this.run();
    } },
  stop: { writable: true, value: function value() {} }
});

function ObjectDefinitionContainer() {
    Task.call(this);
    Object.defineProperties(this, {
        _map: { writable: true, value: new ArrayMap() }
    });
}
ObjectDefinitionContainer.prototype = Object.create(Task.prototype, {
    constructor: { configurable: true, writable: true, value: ObjectDefinitionContainer },
    numObjectDefinition: { get: function get() {
            return this._map.length;
        } },
    addObjectDefinition: {
        value: function value(definition) {
            if (definition instanceof ObjectDefinition) {
                this._map.set(definition.id, definition);
            } else {
                throw new ReferenceError(this + " addObjectDefinition failed, the specified object definition must be an ObjectDefinition object.");
            }
        }
    },
    clearObjectDefinition: {
        value: function value() {
            this._map.clear();
        }
    },
    clone: {
        value: function value() {
            return new ObjectDefinitionContainer();
        }
    },
    getObjectDefinition: {
        value: function value(id)
        {
            if (this._map.has(id)) {
                return this._map.get(id);
            } else {
                throw new ReferenceError(this + " getObjectDefinition failed, the specified object definition don't exist : " + id);
            }
        }
    },
    hasObjectDefinition: {
        value: function value(id) {
            return this._map.has(id);
        }
    },
    removeObjectDefinition: {
        value: function value(id) {
            if (this._map.has(id)) {
                this._map.delete(id);
            } else {
                throw new ReferenceError(this + " removeObjectDefinition failed, the specified object definition don't exist : " + id);
            }
        }
    }
});

function ObjectFactory() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var objects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ObjectDefinitionContainer.call(this);
    Object.defineProperties(this, {
        objects: { value: objects instanceof Array ? objects : null, writable: true },
        bufferSingletons: { value: [], writable: true },
        _config: { value: null, writable: true },
        _evaluator: { value: new MultiEvaluator() },
        _singletons: { value: new ArrayMap() }
    });
    this.config = config;
}
ObjectFactory.prototype = Object.create(ObjectDefinitionContainer.prototype, {
    constructor: { value: ObjectFactory },
    config: {
        get: function get() {
            return this._config;
        },
        set: function set(config) {
            if (this._config) {
                this._config.referenceEvaluator.factory = null;
            }
            this._config = config instanceof ObjectConfig ? config : new ObjectConfig();
            this._config.referenceEvaluator.factory = this;
        }
    },
    singletons: { get: function get() {
            return this._singletons;
        } },
    clone: { value: function value() {
            return new ObjectFactory(this.config, [].concat(this.objects));
        } },
    hasSingleton: { value: function value(id) {
            return this._singletons.has(id);
        } },
    getObject: { value: function value(id) {
            if (!(id instanceof String || typeof id === 'string')) {
                return null;
            }
            var instance;
            try {
                var definition = this.getObjectDefinition(id);
                if (!(definition instanceof ObjectDefinition)) {
                    throw new Error(this + " getObject( " + id + " ) method failed, the object isn't register in the container.");
                }
                if (definition.singleton) {
                    instance = this._singletons.get(id) || null;
                }
                if (!instance) {
                    try {
                        var type = this.config.typeEvaluator.eval(definition.type);
                        if (definition.strategy) {
                            instance = this.createObjectWithStrategy(definition.strategy);
                        } else if (type instanceof Function) {
                            instance = invoke(type, this.createArguments(definition.constructorArguments));
                        }
                    } catch (e) {
                        this.warn(this + " failed to create a new object, can't convert the instance with the specified type \"" + definition.type + "\" in the object definition \"" + definition.id + "\", this type don't exist in the application, or arguments limit exceeded, you can pass a maximum of 32 arguments.");
                    }
                    if (instance) {
                        if (definition.singleton) {
                            this._singletons.set(id, instance);
                        }
                        this.dependsOn(definition);
                        this.populateIdentifiable(instance, definition);
                        var flag = isLockable(instance) && (definition.lock === true || this.config.lock === true && definition.lock !== false);
                        if (flag) {
                            instance.lock();
                        }
                        if (definition.beforeListeners instanceof Array && definition.beforeListeners.length > 0) {
                            this.registerListeners(instance, definition.beforeListeners);
                        }
                        if (definition.beforeReceivers instanceof Array && definition.beforeReceivers.length > 0) {
                            this.registerReceivers(instance, definition.beforeReceivers);
                        }
                        this.populateProperties(instance, definition);
                        if (definition.afterListeners instanceof Array && definition.afterListeners.length > 0) {
                            this.registerListeners(instance, definition.afterListeners);
                        }
                        if (definition.afterReceivers instanceof Array && definition.afterReceivers.length > 0) {
                            this.registerReceivers(instance, definition.afterReceivers);
                        }
                        if (flag) {
                            instance.unlock();
                        }
                        this.invokeInitMethod(instance, definition);
                        this.generates(definition);
                    }
                }
            } catch (e) {
                this.warn(this + " getObject failed with the id '" + id + "' : " + e.toString());
            }
            return instance || null;
        } },
    isDirty: { value: function value() {
            return this.bufferSingletons && this.bufferSingletons instanceof Array && this.bufferSingletons.length > 0;
        } },
    isLazyInit: { value: function value(id) {
            if (this.hasObjectDefinition(id)) {
                return this.getObjectDefinition(id).lazyInit;
            } else {
                return false;
            }
        } },
    isSingleton: { value: function value(id) {
            if (this.hasObjectDefinition(id)) {
                return this.getObjectDefinition(id).singleton;
            } else {
                return false;
            }
        } },
    removeSingleton: { value: function value(id) {
            if (this.isSingleton(id) && this._singletons.has(id)) {
                this.invokeDestroyMethod(this._singletons.get(id), this.getObjectDefinition(id));
                this._singletons.delete(id);
            }
        } },
    run: { value: function value() {
            if (this.running) {
                return;
            }
            this.notifyStarted();
            if (arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof Array) {
                this.objects = arguments.length <= 0 ? undefined : arguments[0];
            }
            if (this.bufferSingletons === null) {
                this.bufferSingletons = [];
            }
            if (this.objects instanceof Array && this.objects.length > 0) {
                var definition;
                var init;
                while (this.objects.length > 0) {
                    init = this.objects.shift();
                    if (init !== null) {
                        definition = createObjectDefinition(init);
                        this.addObjectDefinition(definition);
                        if (definition.singleton && !definition.lazyInit) {
                            if (this.hasObjectDefinition(definition.id)) {
                                this.bufferSingletons.push(String(definition.id));
                            }
                        }
                    } else {
                        this.warn(this + " create new object definition failed with a 'null' or 'undefined' object.");
                    }
                }
            }
            if (this.bufferSingletons instanceof Array && this.bufferSingletons.length > 0 && !this._config.lazyInit && !this.isLocked()) {
                var size = this.bufferSingletons.length;
                for (var i = 0; i < size; i++) {
                    this.getObject(this.bufferSingletons[i]);
                }
                this.bufferSingletons = null;
            }
            this.notifyFinished();
        } },
    warn: { value: function value() {
            if (this.config.useLogger && logger) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                logger.warning.apply(null, args);
            }
        } },
    createArguments: { value: function value() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            if (args === null || !(args instanceof Array) || args.length === 0) {
                return null;
            }
            var len = args.length;
            var i;
            var stack = [];
            var item;
            var value;
            for (i = 0; i < len; i++) {
                item = args[i];
                if (item instanceof ObjectArgument) {
                    value = item.value;
                    try {
                        if (item.policy === ObjectAttribute.REFERENCE) {
                            value = this._config.referenceEvaluator.eval(value);
                        } else if (item.policy === ObjectAttribute.CONFIG) {
                            value = this._config.configEvaluator.eval(value);
                        } else if (item.policy === ObjectAttribute.LOCALE) {
                            value = this._config.localeEvaluator.eval(value);
                        }
                        if (item.evaluators !== null && item.evaluators.length > 0) {
                            value = this.eval(value, item.evaluators);
                        }
                        stack.push(value);
                    } catch (e) {
                        this.warn(this + " createArguments failed : " + e.toString());
                    }
                }
            }
            return stack;
        } },
    createObjectWithStrategy: { value: function value(strategy) {
            if (strategy instanceof ObjectStrategy) {
                return null;
            }
            var args;
            var instance = null;
            var type;
            var factory;
            var ref;
            var name;
            var factoryMethod;
            if (strategy instanceof ObjectMethod) {
                factoryMethod = strategy;
                name = factoryMethod.name;
                args = this.createArguments(factoryMethod.args);
                if (factoryMethod instanceof ObjectStaticFactoryMethod) {
                    type = this.config.typeEvaluator.eval(factoryMethod.type);
                    if (type !== null && name && name in type && type[name] instanceof Function) {
                        instance = type[name].apply(null, args);
                    }
                } else if (factoryMethod instanceof ObjectFactoryMethod) {
                    factory = factoryMethod.factory;
                    ref = this.getObject(factory);
                    if (ref !== null && name && name in ref && ref[name] instanceof Function) {
                        instance = ref[name].apply(null, args);
                    }
                }
            } else if (strategy instanceof ObjectProperty) {
                var factoryProperty = strategy;
                name = factoryProperty.name;
                if (factoryProperty instanceof ObjectStaticFactoryProperty) {
                    type = this.config.typeEvaluator.eval(factoryProperty.type);
                    if (type && name && name in type) {
                        instance = type[name];
                    }
                } else if (factoryProperty instanceof ObjectFactoryProperty) {
                    factory = factoryProperty.factory;
                    if (factory && this.hasObjectDefinition(factory)) {
                        ref = this.getObject(factory);
                        if (ref && name && name in ref) {
                            instance = ref[name];
                        }
                    }
                }
            } else if (strategy instanceof ObjectValue) {
                instance = strategy.value;
            } else if (strategy instanceof ObjectReference) {
                instance = this._config.referenceEvaluator.eval(strategy.ref);
            }
            return instance;
        } },
    dependsOn: { value: function value(definition) {
            if (definition instanceof ObjectDefinition && definition.dependsOn instanceof Array && definition.dependsOn.length > 0) {
                var id;
                var len = definition.dependsOn.length;
                for (var i = 0; i < len; i++) {
                    id = definition.dependsOn[i];
                    if (this.hasObjectDefinition(id)) {
                        this.getObject(id);
                    }
                }
            }
        } },
    eval: { value: function value(_value) {
            var evaluators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (!(evaluators instanceof Array) || evaluators.length === 0) {
                return _value;
            }
            this._evaluator.clear();
            var o;
            var s = evaluators.length;
            var a = [];
            for (var i = 0; i < s; i++) {
                o = evaluators[i];
                if (o === null) {
                    continue;
                }
                if (o instanceof String || typeof o === 'string') {
                    o = this.getObject(o);
                }
                if (o instanceof Evaluable) {
                    a.push(o);
                }
            }
            if (a.length > 0) {
                this._evaluator.add(a);
                _value = this._evaluator.eval(_value);
                this._evaluator.clear();
            }
            return _value;
        } },
    generates: { value: function value(definition /*ObjectDefinition*/) {
            if (definition instanceof ObjectDefinition && definition.generates !== null) {
                var id;
                var ar = definition.generates;
                var len = ar.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        id = ar[i];
                        if (this.hasObjectDefinition(id)) {
                            this.getObject(id);
                        }
                    }
                }
            }
        } },
    invokeDestroyMethod: { value: function value(o) {
            var definition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (definition && definition instanceof ObjectDefinition) {
                var name = definition.destroyMethodName || null;
                if (name === null && this.config !== null) {
                    name = this.config.defaultDestroyMethod;
                }
                if (name && name in o && o[name] instanceof Function) {
                    o[name].call(o);
                }
            }
        } },
    invokeInitMethod: { value: function value(o) {
            var definition /*ObjectDefinition*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (definition && definition instanceof ObjectDefinition) {
                var name = definition.initMethodName || null;
                if (name === null && this.config) {
                    name = this.config.defaultInitMethod || null;
                }
                if (name && name in o && o[name] instanceof Function) {
                    o[name].call(o);
                }
            }
        } },
    populateIdentifiable: { value: function value(o) {
            var definition /*ObjectDefinition*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (definition && definition instanceof ObjectDefinition) {
                if (definition.singleton && isIdentifiable(o)) {
                    if (definition.identify === true || this.config.identify === true && definition.identify !== false) {
                        o.id = definition.id;
                    }
                }
            }
        } },
    populateProperties: { value: function value(o) {
            var definition /*ObjectDefinition*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (definition && definition instanceof ObjectDefinition) {
                var properties = definition.properties;
                if (properties && properties instanceof Array && properties.length > 0) {
                    var id = definition.id;
                    var size = properties.length;
                    for (var i = 0; i < size; i++) {
                        this.populateProperty(o, properties[i], id);
                    }
                }
            }
        } },
    populateProperty: { value: function value(o, prop /*ObjectProperty*/, id) {
            if (o === null) {
                this.warn(this + " populate a new property failed, the object not must be 'null' or 'undefined', see the factory with the object definition '" + id + "'.");
                return;
            }
            var name = prop.name;
            var value = prop.value;
            if (name === MagicReference.INIT) {
                if (prop.policy === ObjectAttribute.REFERENCE && (value instanceof String || typeof value === 'string')) {
                    value = this._config.referenceEvaluator.eval(value);
                } else if (prop.policy === ObjectAttribute.CONFIG) {
                    value = this.config.configEvaluator.eval(value);
                } else if (prop.policy === ObjectAttribute.LOCALE) {
                    value = this.config.localeEvaluator.eval(value);
                }
                if (prop.evaluators && prop.evaluators.length > 0) {
                    value = this.eval(value, prop.evaluators);
                }
                if (value) {
                    for (var member in value) {
                        if (value.hasOwnProperty(member)) {
                            o[member] = value[member];
                        }
                    }
                } else {
                    this.warn(this + " populate a new property failed with the magic name #init, the object to enumerate not must be null, see the factory with the object definition '" + id + "'.");
                }
                return;
            }
            if (!(name in o)) {
                this.warn(this + " populate a new property failed with the name:" + name + ", this property don't exist in the object:" + o + ", see the factory with the object definition '" + id + "'.");
                return;
            }
            if (o[name] instanceof Function) {
                if (prop.policy === ObjectAttribute.ARGUMENTS) {
                    o[name].apply(o, this.createArguments(value));
                    return;
                } else if (prop.policy === ObjectAttribute.VALUE) {
                    o[name]();
                    return;
                }
            }
            try {
                if (prop.policy === ObjectAttribute.REFERENCE) {
                    value = this._config.referenceEvaluator.eval(value);
                } else if (prop.policy === ObjectAttribute.CONFIG) {
                    value = this.config.configEvaluator.eval(value);
                } else if (prop.policy === ObjectAttribute.LOCALE) {
                    value = this.config.localeEvaluator.eval(value);
                }
                if (prop.evaluators && prop.evaluators.length > 0) {
                    value = this.eval(value, prop.evaluators);
                }
                o[name] = value;
            } catch (e) {
                this.warn(this + " populateProperty failed with the name '" + name + "' in the object '" + o + ", see the factory with the object definition '" + id + "' error: " + e.toString());
            }
        } },
    registerListeners: { value: function value(o, listeners) {
            if (o === null || listeners === null) {
                return;
            }
            var size = listeners.length;
            if (size > 0) {
                var dispatcher;
                var method;
                var listener;
                for (var i = 0; i < size; i++) {
                    try {
                        method = null;
                        listener = listeners[i];
                        dispatcher = this._config.referenceEvaluator.eval(listener.dispatcher);
                        if (dispatcher !== null && listener.type !== null) {
                            if (listener.method && listener.method in o && o[listener.method] instanceof Function) {
                                method = o[listener.method];
                            } else if ('handleEvent' in o && o.handleEvent instanceof Function) {
                                method = o.handleEvent;
                            }
                            if (method !== null) {
                                dispatcher.addEventListener(listener.type, method, listener.useCapture);
                            }
                        }
                    } catch (e) {
                        this.warn(this + " registerListeners failed with the target '" + o + "' , in the collection of this listeners at {" + i + "} : " + e.toString());
                    }
                }
            }
        } },
    registerReceivers: { value: function value(o) {
            var receivers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (!(receivers instanceof Array) || receivers.length === 0) {
                return;
            }
            var slot, signaler, receiver;
            var len = receivers.length;
            for (var i = 0; i < len; i++) {
                try {
                    receiver = receivers[i];
                    signaler = this._config.referenceEvaluator.eval(receiver.signal);
                    slot = null;
                    if (signaler instanceof Signaler) {
                        if ((receiver.slot instanceof String || typeof receiver.slot === 'string') && receiver.slot in o && o[receiver.slot] instanceof Function) {
                            slot = o[receiver.slot];
                        } else if (o instanceof Receiver) {
                            slot = o.receive;
                        }
                        if (slot instanceof Receiver || slot instanceof Function) {
                            signaler.connect(slot, receiver.priority, receiver.autoDisconnect);
                        }
                    }
                } catch (e) {
                    this.warn(this + " registerReceivers failed with the target '" + o + "' , in the collection of this receivers at {" + i + "} : " + e.toString());
                }
            }
        } }
});

function ReferenceEvaluator(factory) {
    Object.defineProperties(this, {
        factory: { value: factory instanceof ObjectFactory ? factory : null, writable: true },
        separator: { value: ".", writable: true },
        undefineable: { value: null, writable: true },
        throwError: {
            get: function get() {
                return this._propEvaluator.throwError;
            },
            set: function set(flag) {
                this._propEvaluator.throwError = flag;
            }
        },
        _propEvaluator: { value: new PropertyEvaluator(), writable: true }
    });
}
ReferenceEvaluator.prototype = Object.create(Evaluable.prototype, {
    constructor: { value: ReferenceEvaluator },
    eval: { value: function value(o) {
            if (this.factory instanceof ObjectFactory && (o instanceof String || typeof o === 'string')) {
                var exp = String(o);
                if (exp.length > 0) {
                    var root;
                    try {
                        root = this.factory.config.root;
                    } catch (e) {
                    }
                    switch (exp) {
                        case MagicReference.CONFIG:
                            {
                                return this.factory.config.config;
                            }
                        case MagicReference.LOCALE:
                            {
                                return this.factory.config.locale;
                            }
                        case MagicReference.PARAMS:
                            {
                                return this.factory.config.parameters;
                            }
                        case MagicReference.THIS:
                            {
                                return this.factory;
                            }
                        case MagicReference.ROOT:
                            {
                                return root;
                            }
                        case MagicReference.STAGE:
                            {
                                var stage = this.factory.config.stage;
                                if (stage !== null) {
                                    return stage;
                                } else if (root && "stage" in root && root.stage !== null) {
                                    return root.stage;
                                } else {
                                    return this.undefineable;
                                }
                                break;
                            }
                        default:
                            {
                                var members = exp.split(this.separator);
                                if (members.length > 0) {
                                    var ref = members.shift();
                                    var value = this.factory.getObject(ref);
                                    if (value && members.length > 0) {
                                        this._propEvaluator.target = value;
                                        value = this._propEvaluator.eval(members.join("."));
                                        this._propEvaluator.target = null;
                                    }
                                    return value;
                                }
                            }
                    }
                }
            }
            return this.undefineable;
        } },
    toString: { value: function value() {
            return "[ReferenceEvaluator]";
        } }
});

var TypePolicy = Object.defineProperties({}, {
  ALIAS: { value: "alias", enumerable: true },
  ALL: { value: "all", enumerable: true },
  EXPRESSION: { value: "expression", enumerable: true },
  NONE: { value: "none", enumerable: true }
});

function TypeEvaluator() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Object.defineProperties(this, {
        config: { value: config instanceof ObjectConfig ? config : null, writable: true },
        throwError: { value: false, writable: true }
    });
}
TypeEvaluator.prototype = Object.create(Evaluable.prototype, {
    constructor: { value: TypeEvaluator },
    eval: { value: function value(o) {
            if (o instanceof Function) {
                return o;
            } else if (o instanceof String || typeof o === 'string') {
                var type = String(o);
                var config = this.config;
                if (config && config instanceof ObjectConfig) {
                    var policy = config.typePolicy;
                    if (policy !== TypePolicy.NONE) {
                        if (policy === TypePolicy.ALL || policy === TypePolicy.ALIAS) {
                            var aliases = config.typeAliases;
                            if (aliases instanceof ArrayMap && aliases.has(type)) {
                                type = aliases.get(type);
                            }
                        }
                        if (policy === TypePolicy.ALL || policy === TypePolicy.EXPRESSION) {
                            if (config.typeExpression instanceof ExpressionFormatter) {
                                type = config.typeExpression.format(type);
                            }
                        }
                    }
                }
                try {
                    var func = getDefinitionByName(type, config.domain);
                    if (func instanceof Function) {
                        return func;
                    }
                } catch (e) {
                    if (this.throwError) {
                        throw new EvalError(this + " eval failed : " + e.toString());
                    }
                }
            }
            return null;
        } },
    toString: { value: function value() {
            return "[TypeEvaluator]";
        } }
});

function ObjectConfig() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Object.defineProperties(this, {
        config: {
            get: function get() {
                return this._config;
            },
            set: function set(init) {
                for (var prop in init) {
                    if (init.hasOwnProperty(prop)) {
                        this._config[prop] = init[prop];
                    }
                }
            }
        },
        configEvaluator: {
            get: function get() {
                return this._configEvaluator;
            }
        },
        defaultDestroyMethod: { value: null, writable: true, enumerable: true },
        defaultInitMethod: { value: null, writable: true, enumerable: true },
        domain: { value: null, writable: true, enumerable: true },
        identify: { value: false, writable: true, enumerable: true },
        lazyInit: { value: false, writable: true, enumerable: true },
        locale: {
            get: function get() {
                return this._locale;
            },
            set: function set(init) {
                for (var prop in init) {
                    if (init.hasOwnProperty(prop)) {
                        this._locale[prop] = init[prop];
                    }
                }
            }
        },
        localeEvaluator: {
            get: function get() {
                return this._localeEvaluator;
            }
        },
        lock: { value: false, writable: true, enumerable: true },
        parameters: { value: null, writable: true, enumerable: true },
        referenceEvaluator: {
            get: function get() {
                return this._referenceEvaluator;
            }
        },
        root: { value: null, writable: true, enumerable: true },
        stage: { value: null, writable: true, enumerable: true },
        throwError: {
            get: function get() {
                return this._configEvaluator.throwError && this._localeEvaluator.throwError && this._typeEvaluator.throwError && this._referenceEvaluator.throwError;
            },
            set: function set(flag) {
                this._configEvaluator.throwError = flag;
                this._localeEvaluator.throwError = flag;
                this._referenceEvaluator.throwError = flag;
                this._typeEvaluator.throwError = flag;
            }
        },
        typeAliases: {
            get: function get() {
                return this._typeAliases;
            },
            set: function set(aliases) {
                if (aliases instanceof ArrayMap) {
                    var next;
                    var key;
                    var it = aliases.iterator();
                    while (it.hasNext()) {
                        next = it.next();
                        key = it.key();
                        this._typeAliases.set(key, next);
                    }
                } else if (aliases instanceof Array) {
                    var item;
                    var len = aliases.length;
                    if (len > 0) {
                        while (--len > -1) {
                            item = aliases[len];
                            if (item !== null && ObjectAttribute.TYPE_ALIAS in item && ObjectAttribute.TYPE in item) {
                                this._typeAliases.set(String(item[ObjectAttribute.TYPE_ALIAS]), String(item[ObjectAttribute.TYPE]));
                            }
                        }
                    }
                }
            }
        },
        typeEvaluator: {
            get: function get() {
                return this._typeEvaluator;
            }
        },
        typeExpression: {
            get: function get() {
                return this._typeExpression;
            },
            set: function set(expressions /*ExpressionFormatter|Array*/) {
                if (expressions instanceof ExpressionFormatter) {
                    this._typeExpression = expressions;
                } else if (expressions instanceof Array) {
                    if (this._typeExpression === null) {
                        this._typeExpression = new ExpressionFormatter();
                    }
                    var item;
                    var len = expressions.length;
                    if (len > 0) {
                        while (--len > -1) {
                            item = expressions[len];
                            if (item !== null && ObjectAttribute.NAME in item && ObjectAttribute.VALUE in item) {
                                this._typeExpression.set(String(item[ObjectAttribute.NAME]), String(item[ObjectAttribute.VALUE]));
                            }
                        }
                    }
                } else {
                    this._typeExpression = new ExpressionFormatter();
                }
            }
        },
        typePolicy: {
            get: function get() {
                return this._typePolicy;
            },
            set: function set(policy) {
                switch (policy) {
                    case TypePolicy.ALIAS:
                    case TypePolicy.EXPRESSION:
                    case TypePolicy.ALL:
                        {
                            this._typePolicy = policy;
                            break;
                        }
                    default:
                        {
                            this._typePolicy = TypePolicy.NONE;
                        }
                }
            }
        },
        useLogger: { value: false, writable: true, enumerable: true },
        _config: { value: {}, writable: true },
        _configEvaluator: { value: new ConfigEvaluator(this), writable: true },
        _locale: { value: {}, writable: true },
        _localeEvaluator: { value: new LocaleEvaluator(this), writable: true },
        _referenceEvaluator: { value: new ReferenceEvaluator(), writable: true },
        _typeAliases: { value: new ArrayMap(), writable: true },
        _typeEvaluator: { value: new TypeEvaluator(this), writable: true },
        _typeExpression: { value: new ExpressionFormatter(), writable: true },
        _typePolicy: { value: TypePolicy.NONE, writable: true }
    });
    this.throwError = false;
    this.initialize(init);
}
ObjectConfig.prototype = Object.create(Object.prototype, {
    constructor: { value: ObjectConfig },
    initialize: { value: function value(init) {
            if (init === null) {
                return;
            }
            for (var prop in init) {
                if (this.hasOwnProperty(prop)) {
                    this[prop] = init[prop];
                }
            }
        } },
    setConfigTarget: { value: function value() {
            var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            this._config = o || {};
        } },
    setLocaleTarget: { value: function value() {
            var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            this._locale = o || {};
        } },
    toString: { value: function value() {
            return '[ObjectConfig]';
        } }
});

function Parameters(parameters) {
    Object.defineProperties(this, {
        parameters: { value: parameters, writable: true },
        _evaluators: { value: new MultiEvaluator(), writable: true }
    });
    this._evaluators.autoClear = true;
}
Parameters.prototype = Object.create(Object.prototype, {
    constructor: { value: Parameters },
    contains: { value: function value(name) {
            return this.parameters && name && name in this.parameters && this.parameters[name] !== null;
        } },
    get: { value: function value(name) {
            if (this.parameters && this.contains(name)) {
                for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    rest[_key - 1] = arguments[_key];
                }
                if (rest.length === 0) {
                    return this.parameters[name];
                } else {
                    this._evaluators.add(rest);
                    return this._evaluators.eval(this.parameters[name]);
                }
            } else {
                return null;
            }
        } },
    toString: { value: function value() {
            return '[Parameters]';
        } }
});

/**
 * The {@link system.ioc} library provides a simple and strong implementation of the <strong>Inversion of Control</strong> (<b>{@link https://en.wikipedia.org/wiki/Inversion_of_control|IoC}</b>) principle.
 * <p><b>IoC</b> is also known as <b>dependency injection</b> (DI). It is a process whereby objects define their dependencies, that is, the other objects they work with, only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.</p>
 * <p> The container then injects those dependencies when it creates the <b>object definitions</b>. This process is fundamentally the inverse, hence the name Inversion of Control (IoC), of the <b>object definition</b> itself controlling the instantiation or location of its dependencies by using direct construction of classes, or a more complex mechanism.</p>
 * @summary The {@link system.ioc} library provides a simple et strong implementation of the <strong>Inversion of Control</strong> (<b>{@link https://en.wikipedia.org/wiki/Inversion_of_control|IoC}</b>) principle.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.ioc
 * @memberof system
 * @example
 * var Point = function( x , y )
 * {
 *     this.x = x ;
 *     this.y = y ;
 *     console.log("constructor:" + this.toString() ) ;
 * };
 *
 * Point.prototype.test = function( message = null )
 * {
 *     console.log( 'test:' + this.toString() + " message:" + message ) ;
 * }
 *
 * Point.prototype.toString = function()
 * {
 *     return "[Point x:" + this.x + " y:" + this.y + "]" ;
 * } ;
 *
 * var ObjectFactory = system.ioc.ObjectFactory ;
 *
 * var factory = new ObjectFactory();
 * var config  = factory.config ;
 *
 * config.setConfigTarget
 * ({
 *     origin : { x : 10 , y : 20 }
 * })
 *
 * config.setLocaleTarget
 * ({
 *     messages :
 *     {
 *         test : 'test'
 *     }
 * })
 *
 * var objects =
 * [
 *     {
 *         id   : "position" ,
 *         type : "Point" ,
 *         args : [ { value : 2 } , { ref : 'origin.y' }],
 *         properties :
 *         [
 *             { name : "x" , ref   :'origin.x' } ,
 *             { name : "y" , value : 100       }
 *         ]
 *     },
 *     {
 *         id         : "origin" ,
 *         type       : "Point" ,
 *         singleton  : true ,
 *         args       : [ { config : 'origin.x' } , { value : 20 }] ,
 *         properties :
 *         [
 *             { name : 'test' , args : [ { locale : 'messages.test' } ] }
 *         ]
 *     }
 * ];
 *
 * factory.run( objects );
 *
 * trace( factory.getObject('position') ) ;
 */
var ioc = Object.assign({
  logger: logger,
  MagicReference: MagicReference,
  ObjectArgument: ObjectArgument,
  ObjectAttribute: ObjectAttribute,
  ObjectConfig: ObjectConfig,
  ObjectDefinition: ObjectDefinition,
  ObjectDefinitionContainer: ObjectDefinitionContainer,
  ObjectFactory: ObjectFactory,
  ObjectListener: ObjectListener,
  ObjectMethod: ObjectMethod,
  ObjectOrder: ObjectOrder,
  ObjectProperty: ObjectProperty,
  ObjectReceiver: ObjectReceiver,
  ObjectScope: ObjectScope,
  Parameters: Parameters,
  TypePolicy: TypePolicy
});

function isLoggable(target) {
    if (target) {
        return target instanceof Loggable || 'logger' in target && (target.logger === null || target.logger instanceof Logger);
    }
    return false;
}
function Loggable() {
    Object.defineProperties(this, {
        _logger: { value: null, writable: true }
    });
}
Loggable.prototype = Object.create(Object.prototype, {
    constructor: { value: Loggable },
    logger: {
        get: function get() {
            return this._logger;
        },
        set: function set(logger) {
            this._logger = logger instanceof Logger ? logger : null;
        }
    }
});

function LineFormattedTarget() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    LoggerTarget.call(this);
    Object.defineProperties(this, {
        _lineNumber: { value: 1, writable: true }
    });
    this.includeChannel = false;
    this.includeDate = false;
    this.includeLevel = false;
    this.includeLines = false;
    this.includeMilliseconds = false;
    this.includeTime = false;
    this.separator = " ";
    if (init) {
        for (var prop in init) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = init[prop];
            }
        }
    }
}
LineFormattedTarget.prototype = Object.create(LoggerTarget.prototype, {
    constructor: { value: LineFormattedTarget, writable: true },
    internalLog: { value: function value(message, level /*LoggerLevel*/)
        {
        } },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } },
    logEntry: { value: function value(entry) {
            var message = this.formatMessage(entry.message, LoggerLevel.getLevelString(entry.level), entry.channel, new Date());
            this.internalLog(message, entry.level);
        } },
    resetLineNumber: { value: function value() {
            this._lineNumber = 1;
        } },
    formatDate: {
        value: function value(d /*Date*/) {
            var date = "";
            date += this.getDigit(d.getDate());
            date += "/" + this.getDigit(d.getMonth() + 1);
            date += "/" + d.getFullYear();
            return date;
        }
    },
    formatLevel: {
        value: function value(level) {
            return '[' + level + ']';
        }
    },
    formatLines: {
        value: function value() {
            return "[" + this._lineNumber++ + "]";
        }
    },
    formatMessage: {
        value: function value(message, level, channel, date /*Date*/) {
            var msg = "";
            if (this.includeLines) {
                msg += this.formatLines() + this.separator;
            }
            if (this.includeDate || this.includeTime) {
                date = date || new Date();
                if (this.includeDate) {
                    msg += this.formatDate(date) + this.separator;
                }
                if (this.includeTime) {
                    msg += this.formatTime(date) + this.separator;
                }
            }
            if (this.includeLevel) {
                msg += this.formatLevel(level || "") + this.separator;
            }
            if (this.includeChannel) {
                msg += (channel || "") + this.separator;
            }
            msg += message;
            return msg;
        }
    },
    formatTime: {
        value: function value(d /*Date*/) {
            var time = "";
            time += this.getDigit(d.getHours());
            time += ":" + this.getDigit(d.getMinutes());
            time += ":" + this.getDigit(d.getSeconds());
            if (this.includeMilliseconds) {
                time += ":" + this.getDigit(d.getMilliseconds());
            }
            return time;
        }
    },
    getDigit: {
        value: function value(n /*Number*/) {
            if (isNaN(n)) {
                return "00";
            }
            return (n < 10 ? "0" : "") + n;
        }
    }
});

function ConsoleTarget() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    LineFormattedTarget.call(this, init);
}
ConsoleTarget.prototype = Object.create(LineFormattedTarget.prototype, {
    constructor: { value: ConsoleTarget },
    internalLog: {
        value: function value(message, level)
        {
            if (console) {
                switch (level) {
                    case LoggerLevel.CRITICAL:
                        {
                            console.trace(message);
                            break;
                        }
                    case LoggerLevel.DEBUG:
                        {
                            if (console.debug) {
                                console.debug(message);
                            } else if (console.trace) {
                                console.trace(message);
                            }
                            break;
                        }
                    case LoggerLevel.ERROR:
                        {
                            console.error(message);
                            break;
                        }
                    case LoggerLevel.INFO:
                        {
                            console.info(message);
                            break;
                        }
                    case LoggerLevel.WARNING:
                        {
                            console.warn(message);
                            break;
                        }
                    default:
                    case LoggerLevel.ALL:
                        {
                            console.log(message);
                            break;
                        }
                }
            } else {
                throw new new ReferenceError('The console reference is unsupported.')();
            }
        }
    }
});

function TraceTarget() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    LineFormattedTarget.call(this, init);
}
TraceTarget.prototype = Object.create(LineFormattedTarget.prototype, {
    constructor: { value: TraceTarget },
    internalLog: { value: function value(message, level)
        {
            trace(message);
        } }
});

/**
 * The {@link system.logging} library defines functions and classes which implement a flexible event logging system for applications and libraries.
 * @summary The {@link system.logging} library defines functions and classes which implement a flexible event logging system for applications and libraries.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logging
 * @memberof system
 * @example
 * var logger = Log.getLogger('channel') ;
 *
 * var target = new ConsoleTarget
 * ({
 *     includeChannel      : true  ,
 *     includeDate         : false ,
 *     includeLevel        : true  ,
 *     includeLines        : true  ,
 *     includeMilliseconds : true  ,
 *     includeTime         : true
 * }) ;
 *
 * target.filters = ['*'] ;
 * target.level   = LoggerLevel.ALL ;
 *
 * logger.debug( 'hello {0}, love it.' , 'VEGAS' ) ;
 * logger.critical( 'hello {0}, it\'s critical.' , 'VEGAS' ) ;
 * logger.info( 'hello, my name is {0}' , 'VEGAS' ) ;
 * logger.error( 'hello {0}, an error is invoked.' , 'VEGAS' ) ;
 * logger.warning( 'hello {0}, don\'t forget me.' , 'VEGAS' ) ;
 * logger.wtf( 'hello {0} ! WHAT ??' , 'VEGAS' ) ;
 */
var logging = Object.assign({
  isLoggable: isLoggable,
  Log: Log,
  Loggable: Loggable,
  Logger: Logger,
  LoggerEntry: LoggerEntry,
  LoggerFactory: LoggerFactory,
  LoggerLevel: LoggerLevel,
  LoggerTarget: LoggerTarget,
  targets: Object.assign({
    ConsoleTarget: ConsoleTarget,
    LineFormattedTarget: LineFormattedTarget,
    TraceTarget: TraceTarget
  })
});

function isRule(target) {
    if (target) {
        return target instanceof Rule || 'eval' in target && target.eval instanceof Function;
    }
    return false;
}
function Rule() {}
Rule.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Rule },
    eval: { writable: true, value: function value() {
        } },
    toString: { value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function BooleanRule(condition) {
  Object.defineProperties(this, {
    condition: { value: condition, enumerable: true, writable: true }
  });
}
BooleanRule.prototype = Object.create(Rule.prototype);
BooleanRule.prototype.constructor = BooleanRule;
BooleanRule.prototype.eval = function () {
  return this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition);
};

function ElseIf() {
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.rule = rule instanceof Rule ? rule : new BooleanRule(rule);
    this.then = then;
}
ElseIf.prototype = Object.create(Rule.prototype, {
    constructor: { value: ElseIf, writable: true },
    eval: { writable: true, value: function value() {
            if (this.rule && this.rule instanceof Rule) {
                return this.rule.eval();
            } else {
                return false;
            }
        } }
});

function EmptyString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.value = value;
}
EmptyString.prototype = Object.create(Rule.prototype);
EmptyString.prototype.constructor = EmptyString;
EmptyString.prototype.eval = function () {
  return this.value === "";
};

function ElseIfEmptyString() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ElseIf.call(this, new EmptyString(value), then);
}
ElseIfEmptyString.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfEmptyString }
});

function Equals() {
    var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.value1 = value1;
    this.value2 = value2;
}
Equals.prototype = Object.create(Rule.prototype);
Equals.prototype.constructor = Equals;
Equals.prototype.eval = function () {
    if (this.value1 === this.value2) {
        return true;
    } else if (this.value1 instanceof Rule && this.value2 instanceof Rule) {
        return this.value1.eval() === this.value2.eval();
    } else if (isEquatable(this.value1)) {
        return this.value1.equals(this.value2);
    } else {
        return false;
    }
};

function ElseIfEquals(value1, value2) {
    var then = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    ElseIf.call(this, new Equals(value1, value2), then);
}
ElseIfEquals.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfEquals }
});

function False() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  this.condition = condition;
}
False.prototype = Object.create(Rule.prototype);
False.prototype.constructor = False;
False.prototype.eval = function () {
  return (this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition)) === false;
};

function ElseIfFalse(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ElseIf.call(this, new False(value), then);
}
ElseIfFalse.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfFalse }
});

function Null() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  this.value = value;
  this.strict = Boolean(strict);
}
Null.prototype = Object.create(Rule.prototype);
Null.prototype.constructor = Null;
Null.prototype.eval = function () {
  if (this.strict) {
    return this.value === null;
  } else {
    return this.value == null;
  }
};

function ElseIfNull(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    ElseIf.call(this, new Null(value, strict), then);
}
ElseIfNull.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfNull }
});

function True() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.condition = condition;
}
True.prototype = Object.create(Rule.prototype);
True.prototype.constructor = True;
True.prototype.eval = function () {
  return (this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition)) === true;
};

function ElseIfTrue(condition) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ElseIf.call(this, new True(condition), then);
}
ElseIfTrue.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfTrue }
});

function Undefined() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  this.value = value;
}
Undefined.prototype = Object.create(Rule.prototype);
Undefined.prototype.constructor = Undefined;
Undefined.prototype.eval = function () {
  return this.value === undefined;
};

function ElseIfUndefined(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ElseIf.call(this, new Undefined(value), then);
}
ElseIfUndefined.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfUndefined }
});

function Zero() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  this.value = value;
}
Zero.prototype = Object.create(Rule.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.eval = function () {
  return this.value === 0;
};

function ElseIfZero(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    ElseIf.call(this, new Zero(value), then);
}
ElseIfZero.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfZero }
});

function IfTask()
{
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    Action.call(this);
    Object.defineProperties(this, {
        errorIt: { value: new Signal() },
        throwError: { value: false, writable: true, enumerable: true },
        _done: { value: false, writable: true },
        _elseIfTasks: { value: [] },
        _elseTask: {
            value: elseTask instanceof Action ? elseTask : null,
            writable: true
        },
        _rule: {
            value: rule instanceof Rule ? rule : new BooleanRule(rule),
            writable: true
        },
        _thenTask: {
            value: thenTask instanceof Action ? thenTask : null,
            writable: true
        }
    });
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfTask.prototype = Object.create(Action.prototype, {
    constructor: { writable: true, value: IfTask },
    elseIfTask: { get: function get() {
            return this._elseIfTask;
        } },
    elseTask: { get: function get() {
            return this._elseTask;
        } },
    rule: {
        get: function get() {
            return this._rule;
        },
        set: function set(rule) {
            this._rule = rule instanceof Rule ? rule : new BooleanRule(rule);
        }
    },
    thenTask: { get: function get() {
            return this._thenTask;
        } },
    addElse: { value: function value(action) {
            if (this._elseTask) {
                throw new Error(this + " addElse failed, you must not nest more than one <else> into <if>");
            } else if (action instanceof Action) {
                this._elseTask = action;
            }
            return this;
        } },
    addElseIf: { value: function value()
        {
            for (var _len2 = arguments.length, elseIfTask = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                elseIfTask[_key2] = arguments[_key2];
            }
            if (elseIfTask && elseIfTask.length > 0) {
                var ei;
                var len = elseIfTask.length;
                for (var i = 0; i < len; i++) {
                    ei = null;
                    if (elseIfTask[i] instanceof ElseIf) {
                        ei = elseIfTask[i];
                    } else if ((elseIfTask[i] instanceof Rule || isBoolean(elseIfTask[i])) && elseIfTask[i + 1] instanceof Action) {
                        ei = new ElseIf(elseIfTask[i], elseIfTask[i + 1]);
                        i++;
                    }
                    if (ei) {
                        this._elseIfTasks.push(ei);
                    }
                }
            }
            return this;
        } },
    addRule: { value: function value(rule)
        {
            if (this._rule) {
                throw new Error(this + " addRule failed, you must not nest more than one <condition> into <if>");
            } else {
                this._rule = rule instanceof Rule ? rule : new BooleanRule(rule);
            }
            return this;
        } },
    addThen: { value: function value(action) {
            if (this._thenTask) {
                throw new Error(this + " addThen failed, you must not nest more than one <then> into <if>");
            } else if (action instanceof Action) {
                this._thenTask = action;
            }
            return this;
        } },
    clear: { value: function value() {
            this._rule = null;
            this._elseIfTasks.length = 0;
            this._elseTask = null;
            this._thenTask = null;
            return this;
        } },
    deleteElseIf: { value: function value()
        {
            this._elseIfTasks.length = 0;
            return this;
        } },
    deleteElse: { value: function value()
        {
            this._elseTask = null;
            return this;
        } },
    deleteRule: { value: function value() {
            this._rule = null;
            return this;
        } },
    deleteThen: { value: function value()
        {
            this._thenTask = null;
            return this;
        } },
    notifyError: { value: function value(message)
        {
            this._running = false;
            this._phase = TaskPhase.ERROR;
            this.errorIt.emit(message, this);
            if (this.throwError) {
                throw new Error(message);
            }
        } },
    run: { value: function value() {
            if (this.running) {
                return;
            }
            this._done = false;
            this.notifyStarted();
            if (!this._rule || !(this._rule instanceof Rule)) {
                this.notifyError(this + " run failed, the 'conditional rule' of the task not must be null.");
                this.notifyFinished();
                return;
            }
            if (this._rule.eval()) {
                if (this._thenTask instanceof Action) {
                    this._execute(this._thenTask);
                } else if (this.throwError) {
                    this.notifyError(this + " run failed, the 'then' action not must be null.");
                }
            } else {
                if (this._elseIfTasks.length > 0) {
                    var ei;
                    var len = this._elseIfTasks.length;
                    for (var i = 0; i < len && !this._done; i++) {
                        ei = this._elseIfTasks[i];
                        if (ei instanceof ElseIf && ei.eval()) {
                            this._execute(ei.then);
                        }
                    }
                }
                if (!this._done && this._elseTask) {
                    this._execute(this._elseTask);
                }
            }
            if (!this._done) {
                if (this.throwError) {
                    this.notifyError(this + " run failed, the 'then' action not must be null.");
                } else {
                    this.notifyFinished();
                }
            }
        } },
    _execute: { value: function value(action /*Action*/) {
            if (action instanceof Action) {
                action.finishIt.connect(this._finishTask.bind(this), 1, true);
                action.run();
            }
        } },
    _finishTask: {
        value: function value() {
            this._done = true;
            this.notifyFinished();
        }
    }
});

function IfEmptyString(value)
{
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    IfTask.call(this, new EmptyString(value), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfEmptyString.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfEmptyString }
});

function IfEquals(value1, value2)
{
    var thenTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var elseTask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    IfTask.call(this, new Equals(value1, value2), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        elseIfTasks[_key - 4] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfEquals.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfEquals }
});

function IfFalse(condition)
{
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    IfTask.call(this, new False(condition), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfFalse.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfFalse }
});

function IfNull(value)
{
    var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var thenTask /*Action*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var elseTask /*Action*/ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    IfTask.call(this, new Null(value, strict), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        elseIfTasks[_key - 4] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfNull.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfNull }
});

function IfTrue(condition)
{
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    IfTask.call(this, new True(condition), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfTrue.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfTrue }
});

function IfUndefined(value)
{
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    IfTask.call(this, new Undefined(value), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfUndefined.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfUndefined }
});

function IfZero(value)
{
    var thenTask /*Action*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask /*Action*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    IfTask.call(this, new Zero(value), thenTask, elseTask);
    for (var _len = arguments.length, elseIfTasks = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elseIfTasks[_key - 3] = arguments[_key];
    }
    if (elseIfTasks.length > 0) {
        this.addElseIf.apply(this, elseIfTasks);
    }
}
IfZero.prototype = Object.create(IfTask.prototype, {
    constructor: { writable: true, value: IfZero }
});

/**
 * The {@link system.logics} library perform some tasks based on whether a given condition holds <code>true</code> or not.
 * <p>This task is heavily based on the Condition framework that can be found in the {@link system.rules} library.</p>
 * <p>In addition to the {@link system.rules.Rule|Rule} condition, you can specify three different child actions based on the {@link system.process.Action|Action} :  <code>elseif</code>, <code>then</code> and <code>else</code>. All three subelements are optional. Both <code>then</code> and <code>else</code> must not be used more than once inside the if task. Both are containers for tasks, just like {@link system.process.BatchTask|BatchTask} and {@link system.process.Chain|Chain} tasks.</p>
 * @summary The {@link system.logics} library perform some tasks based on whether a given condition holds <code>true</code> or not.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logics
 * @memberof system
 * @example
 * // -------- Imports
 *
 * var IfTask      = system.logics.IfTask ;
 * var Do          = system.process.Do ;
 * var ElseIf      = system.logics.ElseIf ;
 * var EmptyString = system.rules.EmptyString ;
 * var Equals      = system.rules.Equals ;
 *
 * // -------- init
 *
 * var task ;
 *
 * var do1 = new Do() ;
 * var do2 = new Do() ;
 * var do3 = new Do() ;
 * var do4 = new Do() ;
 *
 * do1.something = function() { trace("do1 ###") } ;
 * do2.something = function() { trace("do2 ###") } ;
 * do3.something = function() { trace("do3 ###") } ;
 * do4.something = function() { trace("do4 ###") } ;
 *
 * // -------- behaviors
 *
 * var error = function( message , action  )
 * {
 *     trace( "error:" + action + " message:" + message ) ;
 * };
 *
 * var finish = function( action )
 * {
 *     trace( "finish: " + action ) ;
 * };
 *
 * var start = function( action )
 * {
 *     trace( "start: " + action ) ;
 * };
 *
 * trace(' -------- test 1');
 *
 * task = new IfTask( new EmptyString('') , do1 , do2 ) ;
 *
 * task.finishIt.connect(finish) ;
 * task.errorIt.connect(error) ;
 * task.startIt.connect(start) ;
 *
 * task.run() ;
 *
 * task.clear() ;
 *
 * trace(' -------- test 2');
 *
 * task.clear() ;
 *
 * task.rule = new Equals(1,2) ;
 *
 * task.addThen( do1 )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 3 : <elseIf>');
 *
 * task.clear() ;
 *
 * task.addRule( new Equals(1,2) )
 *     .addThen( do1 )
 *     .addElseIf
 *     (
 *         new ElseIf( new Equals(2,1) , do3 ) ,
 *         new ElseIf( new Equals(2,2) , do4 )
 *     )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 4 : <then> is already register');
 *
 * task.clear() ;
 * task.throwError = true ;
 *
 * try
 * {
 *     task.addThen( do1 )
 *         .addElse( do2 )
 *         .addThen( do3 )
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 5 : <rule> is not defined');
 *
 * try
 * {
 *     task.run() ;
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 6 : <rule> is not defined and throwError = false');
 *
 * task.throwError = false ;
 *
 * task.run() ;
 */
var logics = Object.assign({
  ElseIf: ElseIf,
  ElseIfEmptyString: ElseIfEmptyString,
  ElseIfEquals: ElseIfEquals,
  ElseIfFalse: ElseIfFalse,
  ElseIfNull: ElseIfNull,
  ElseIfTrue: ElseIfTrue,
  ElseIfUndefined: ElseIfUndefined,
  ElseIfZero: ElseIfZero,
  IfEmptyString: IfEmptyString,
  IfEquals: IfEquals,
  IfFalse: IfFalse,
  IfNull: IfNull,
  IfTask: IfTask,
  IfTrue: IfTrue,
  IfUndefined: IfUndefined,
  IfZero: IfZero
});

function Model() {
    Lockable.call(this);
}
Model.prototype = Object.create(Lockable.prototype, {
    constructor: { writable: true, value: Model },
    supports: { writable: true, value: function value(_value) {
            return _value === _value;
        } },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } },
    validate: { writable: true, value: function value(_value2)
        {
            if (!this.supports(_value2)) {
                throw new Error(this + " validate(" + _value2 + ") is mismatch.");
            }
        } }
});

function ChangeModel() {
    Model.call(this);
    Object.defineProperties(this, {
        beforeChanged: { value: new Signal() },
        changed: { value: new Signal() },
        cleared: { value: new Signal() },
        security: { value: true, writable: true },
        _current: { value: null, writable: true }
    });
}
ChangeModel.prototype = Object.create(Model.prototype, {
    constructor: { writable: true, value: ChangeModel },
    current: {
        get: function get() {
            return this._current;
        },
        set: function set(o) {
            if (o === this._current && this.security) {
                return;
            }
            if (o) {
                this.validate(o);
            }
            if (this._current) {
                this.notifyBeforeChange(this._current);
            }
            this._current = o;
            if (this._current) {
                this.notifyChange(this._current);
            }
        }
    },
    clear: { writable: true, value: function value() {
            this._current = null;
            this.notifyClear();
        } },
    notifyBeforeChange: { value: function value(_value) {
            if (!this.isLocked()) {
                this.beforeChanged.emit(_value, this);
            }
        } },
    notifyChange: { value: function value(_value2) {
            if (!this.isLocked()) {
                this.changed.emit(_value2, this);
            }
        } },
    notifyClear: { value: function value() {
            if (!this.isLocked()) {
                this.cleared.emit(this);
            }
        } }
});

function MemoryModel() {
    ChangeModel.call(this);
    Object.defineProperties(this, {
        enableErrorChecking: { writable: true, value: false },
        header: { value: new MemoryEntry(), writable: true },
        _reduced: { value: false, writable: true },
        size: { value: 0, writable: true }
    });
    this.header.next = this.header.previous = this.header;
}
MemoryModel.prototype = Object.create(ChangeModel.prototype, {
    constructor: { writable: true, value: MemoryModel },
    current: {
        get: function get() {
            return this._current;
        },
        set: function set(o) {
            if (o === this._current && this.security) {
                return;
            }
            if (o) {
                this.validate(o);
            }
            if (this._current) {
                this.notifyBeforeChange(this._current);
            }
            this._current = o;
            if (this._current) {
                this.add(this._current);
                this.notifyChange(this._current);
            }
        }
    },
    length: { get: function get() {
            return this.size;
        } },
    reduced: { get: function get() {
            return this._reduced;
        } },
    back: { value: function value() {
            var old = this.last();
            if (old) {
                this._reduced = true;
                this.notifyBeforeChange(old);
                this._reduced = false;
            }
            this.removeLast();
            this._current = this.last();
            if (this._current) {
                this.notifyChange(this._current);
            }
            return old;
        } },
    backTo: { value: function value() {
            var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            if (pos < 1) {
                pos = 1;
            }
            if (this.size > 1) {
                if (pos < this.size) {
                    this._reduced = true;
                    var old = this.last();
                    if (old) {
                        this.notifyBeforeChange(old);
                    }
                    while (pos !== this.size) {
                        this.removeLast();
                    }
                    this._reduced = false;
                    this._current = this.last();
                    if (this._current) {
                        this.notifyChange(this._current);
                    }
                    return old;
                } else {
                    if (this.enableErrorChecking) {
                        throw new RangeError(this + " backTo failed, the passed-in index '" + pos + "' is out of bounds (" + this.size + ".");
                    } else {
                        return null;
                    }
                }
            } else {
                if (this.enableErrorChecking) {
                    throw new NoSuchElementError(this + " backTo failed, the length of the memory model must be greater than 1 element.");
                } else {
                    return null;
                }
            }
        } },
    clear: { value: function value() {
            if (this.size > 0) {
                var e = this.header.next;
                var next;
                while (e !== this.header) {
                    next = e.next;
                    e.next = e.previous = null;
                    e.element = null;
                    e = next;
                }
                this.header.next = this.header.previous = this.header;
                this.size = 0;
            }
            ChangeModel.prototype.clear.call(this);
        } },
    first: { value: function value() {
            if (this.size > 0) {
                return this.header.next.element;
            } else {
                if (this.enableErrorChecking) {
                    throw new NoSuchElementError(this + " first method failed, the memory is empty.");
                } else {
                    return null;
                }
            }
        } },
    home: { value: function value() {
            if (this.size > 1) {
                var old = this.header.previous.element;
                if (old) {
                    this.notifyBeforeChange(old);
                }
                var top = this.header.next;
                while (this.header.previous !== top) {
                    this.removeEntry(this.header.previous);
                }
                this._current = this.last();
                if (this._current) {
                    this.notifyChange(this._current);
                }
                return old;
            } else {
                if (this.enableErrorChecking) {
                    throw new NoSuchElementError(this + " home failed, the length of the memory model must be greater than 1 element.");
                } else {
                    return null;
                }
            }
        } },
    isEmpty: { value: function value() {
            return this.size === 0;
        } },
    last: { value: function value() {
            if (this.size > 0) {
                return this.header.previous.element;
            } else {
                if (this.enableErrorChecking) {
                    throw new NoSuchElementError(this + " last method failed, the memory is empty.");
                } else {
                    return null;
                }
            }
        } },
    add: { value: function value(element) {
            this.addBefore(element, this.header);
            return element;
        } },
    addBefore: { value: function value(element, entry) {
            var e = new MemoryEntry(element, entry, entry.previous);
            e.previous.next = e;
            e.next.previous = e;
            this.size++;
            return e;
        } },
    removeEntry: { value: function value(entry) {
            if (entry === this.header) {
                if (this.enableErrorChecking) {
                    throw new NoSuchElementError(this + " removeEntry failed.");
                } else {
                    return null;
                }
            }
            var result = entry.element;
            entry.previous.next = entry.next;
            entry.next.previous = entry.previous;
            entry.next = entry.previous = null;
            entry.element = null;
            this.size--;
            return result;
        } },
    removeLast: { value: function value() {
            return this.removeEntry(this.header.previous);
        } }
});
function MemoryEntry() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var next /*MemoryEntry*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var previous /*MemoryEntry*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.element = element;
    this.next = next;
    this.previous = previous;
}

function ArrayModel() {
    var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    ChangeModel.call(this);
    Object.defineProperties(this, {
        added: { value: new Signal() },
        removed: { value: new Signal() },
        updated: { value: new Signal() },
        _array: { writable: true, value: factory instanceof Array ? factory : [] }
    });
}
ArrayModel.prototype = Object.create(ChangeModel.prototype, {
    constructor: { writable: true, value: ArrayModel },
    length: { get: function get() {
            return this._array.length;
        } },
    add: { value: function value(entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " add method failed, the passed-in argument not must be 'null'.");
            }
            this.validate(entry);
            this._array.push(entry);
            this.notifyAdd(this._array.length - 1, entry);
        } },
    addAt: { value: function value(index, entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " add method failed, the passed-in argument not must be 'null'.");
            }
            this.validate(entry);
            this._array.splice(index, 0, entry);
            this.notifyAdd(index, entry);
        } },
    clear: { value: function value() {
            this._array.length = 0;
            ChangeModel.prototype.clear.call(this);
        } },
    get: { value: function value(index) {
            return this._array[index];
        } },
    has: { value: function value(entry) {
            return this._array.indexOf(entry) > -1;
        } },
    isEmpty: { value: function value() {
            return this._array.length === 0;
        } },
    notifyAdd: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.added.emit(index, entry, this);
            }
        } },
    notifyRemove: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.removed.emit(index, entry, this);
            }
        } },
    notifyUpdate: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.updated.emit(index, entry, this);
            }
        } },
    remove: { value: function value(entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " remove method failed, the entry passed in argument not must be null.");
            }
            var index = this._array.indexOf(entry);
            if (index > -1) {
                this.removeAt(index);
            } else {
                throw new ReferenceError(this + " remove method failed, the entry is not register in the model.");
            }
        } },
    removeAt: { value: function value(index) {
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            count = count > 1 ? count : 1;
            var old = this._array.splice(index, count);
            if (old) {
                this.notifyRemove(index, old);
            }
        } },
    removeRange: { value: function value(fromIndex, toIndex) {
            if (fromIndex === toIndex) {
                return null;
            }
            return this.removeAt(fromIndex, toIndex - fromIndex);
        } },
    setArray: { value: function value(ar) {
            this._array = ar instanceof Array ? ar : [];
        } },
    updateAt: { value: function value(index, entry) {
            this.validate(entry);
            var old = this._array[index];
            if (old) {
                this._array[index] = entry;
                this.notifyUpdate(index, old);
            }
        } },
    toArray: { value: function value() {
            return this._array;
        } }
});

function MapModel() {
    var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
    ChangeModel.call(this);
    Object.defineProperties(this, {
        added: { value: new Signal() },
        removed: { value: new Signal() },
        updated: { value: new Signal() },
        _map: { writable: true, value: factory instanceof KeyValuePair ? factory : new ArrayMap() },
        _primaryKey: {
            value: !(key instanceof String || typeof key === 'string') || key === "" ? MapModel.DEFAULT_PRIMARY_KEY : key,
            writable: true
        }
    });
}
Object.defineProperty(MapModel, 'DEFAULT_PRIMARY_KEY', { value: "id" });
MapModel.prototype = Object.create(ChangeModel.prototype, {
    constructor: { writable: true, value: MapModel },
    length: { get: function get() {
            return this._map.length;
        } },
    primaryKey: {
        get: function get() {
            return this._primaryKey;
        },
        set: function set(key) {
            if (key === this._primaryKey) {
                return;
            }
            this._primaryKey = !(key instanceof String || typeof key === 'string') || key === "" ? MapModel.DEFAULT_PRIMARY_KEY : key;
            if (this._map.length > 0) {
                this._map.clear();
            }
        }
    },
    add: { value: function value(entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " add method failed, the passed-in argument not must be 'null'.");
            }
            this.validate(entry);
            if (this._primaryKey in entry) {
                if (!this._map.has(entry[this._primaryKey])) {
                    this._map.set(entry[this._primaryKey], entry);
                    this.notifyAdd(entry);
                } else {
                    throw new ReferenceError(this + " add method failed, the passed-in entry is already register in the model with the specified primary key, you must remove this entry before add a new entry.");
                }
            } else {
                throw new ReferenceError(this + " add method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.");
            }
        } },
    clear: { value: function value() {
            this._map.clear();
            ChangeModel.prototype.clear.call(this);
        } },
    get: { value: function value(key) {
            return this._map.get(key);
        } },
    getByProperty: { value: function value(propName, _value) {
            if (propName === null || !(propName instanceof String || typeof propName === 'string')) {
                return null;
            }
            var datas = this._map.values();
            var size = datas.length;
            try {
                if (size > 0) {
                    while (--size > -1) {
                        if (datas[size][propName] === _value) {
                            return datas[size];
                        }
                    }
                }
            } catch (er) {
            }
            return null;
        } },
    has: { value: function value(entry) {
            return this._map.hasValue(entry);
        } },
    hasByProperty: { value: function value(propName, _value2) {
            if (propName === null || !(propName instanceof String || typeof propName === 'string')) {
                return false;
            }
            var datas = this._map.values();
            var size = datas.length;
            if (size > 0) {
                while (--size > -1) {
                    if (datas[size][propName] === _value2) {
                        return true;
                    }
                }
            }
            return false;
        } },
    hasKey: { value: function value(key) {
            return this._map.has(key);
        } },
    isEmpty: { value: function value() {
            return this._map.isEmpty();
        } },
    iterator: { value: function value() {
            return this._map.iterator();
        } },
    keyIterator: { value: function value() {
            return this._map.keyIterator();
        } },
    notifyAdd: { value: function value(entry) {
            if (!this.isLocked()) {
                this.added.emit(entry, this);
            }
        } },
    notifyRemove: { value: function value(entry) {
            if (!this.isLocked()) {
                this.removed.emit(entry, this);
            }
        } },
    notifyUpdate: { value: function value(entry) {
            if (!this.isLocked()) {
                this.updated.emit(entry, this);
            }
        } },
    remove: { value: function value(entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " remove method failed, the entry passed in argument not must be null.");
            }
            if (this._primaryKey in entry) {
                if (this._map.has(entry[this._primaryKey])) {
                    this._map.delete(entry[this._primaryKey]);
                    this.notifyRemove(entry);
                } else {
                    throw new ReferenceError(this + " remove method failed, no entry register in the model with the specified primary key.");
                }
            } else {
                throw new ReferenceError(this + " remove method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.");
            }
        } },
    setMap: { value: function value(map) {
            this._map = map instanceof KeyValuePair ? map : new ArrayMap();
        } },
    update: { value: function value(entry) {
            if (this._primaryKey in entry) {
                if (this._map.has(entry[this._primaryKey])) {
                    this._map.set(entry[this._primaryKey], entry);
                    this.notifyUpdate(entry);
                } else {
                    throw new ReferenceError(this + " update method failed, no entry register in the model with the specified primary key.");
                }
            } else {
                throw new ReferenceError(this + " update method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.");
            }
        } },
    toMap: { value: function value() {
            return this._map;
        } }
});

/**
 * The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @summary The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.models
 * @memberof system
 * @example
 * var beforeChanged = function( value , model )
 * {
 *     trace( "before:" + value + " current:" + model.current ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "change:" + value + " current:" + model.current ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "clear current:" + model.current ) ;
 * }
 *
 * var model = new ChangeModel() ;
 *
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * model.current = "hello" ;
 * model.current = "world" ;
 * model.current = null ;
 */
var models = Object.assign({
  ChangeModel: ChangeModel,
  MemoryModel: MemoryModel,
  Model: Model,
  arrays: Object.assign({
    ArrayModel: ArrayModel
  }),
  maps: Object.assign({
    MapModel: MapModel
  })
});

function PRNG() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    Object.defineProperties(this, {
        _value: { value: 1, writable: true }
    });
    this.value = value > 0 ? value : Math.random() * 0X7FFFFFFE;
}
PRNG.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: PRNG },
    value: {
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            value = value > 1 ? value : 1;
            value = value > 0X7FFFFFFE ? 0X7FFFFFFE : value;
            this._value = value;
        }
    },
    randomInt: { value: function value() {
            this._value = this._value * 16807 % 2147483647;
            return this._value;
        } },
    randomIntByMinMax: { value: function value() {
            var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            if (isNaN(min)) {
                min = 0;
            }
            if (isNaN(max)) {
                max = 1;
            }
            min -= 0.4999;
            max += 0.4999;
            this._value = this._value * 16807 % 2147483647;
            return Math.round(min + (max - min) * this._value / 2147483647);
        } },
    randomIntByRange: { value: function value(r) {
            var min = r.min - 0.4999;
            var max = r.max + 0.4999;
            this._value = this._value * 16807 % 2147483647;
            return Math.round(min + (max - min) * this._value / 2147483647);
        } },
    randomNumber: { value: function value()
        {
            this._value = this._value * 16807 % 2147483647;
            return this._value / 2147483647;
        } },
    randomNumberByMinMax: { value: function value(min, max) {
            if (isNaN(min)) {
                min = 0;
            }
            if (isNaN(max)) {
                max = 1;
            }
            this._value = this._value * 16807 % 2147483647;
            return min + (max - min) * this._value / 2147483647;
        } },
    randomNumberByRange: { value: function value(r /*Range*/)
        {
            this._value = this._value * 16807 % 2147483647;
            return r.min + (r.max - r.min) * this._value / 2147483647;
        } },
    toString: { value: function value() {
            return String(this._value);
        } },
    valueOf: { value: function value() {
            return this._value;
        } }
});

function Range() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
    var writable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (max < min) {
        throw new RangeError("The Range constructor failed, the 'max' argument is < of 'min' argument");
    }
    Object.defineProperties(this, {
        max: { writable: writable, value: isNaN(max) ? NaN : max },
        min: { writable: writable, value: isNaN(min) ? NaN : min }
    });
}
Range.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Range },
    clamp: { value: function value(_value) {
            if (isNaN(_value)) {
                return NaN;
            }
            var mi = this.min;
            var ma = this.max;
            if (isNaN(mi)) {
                mi = _value;
            }
            if (isNaN(ma)) {
                ma = _value;
            }
            return Math.max(Math.min(_value, ma), mi);
        } },
    clone: { writable: true, value: function value() {
            return new Range(this.min, this.max);
        } },
    combine: { value: function value() {
            var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            if (!(range instanceof Range)) {
                return this.clone();
            } else {
                return new Range(Math.min(this.min, range.min), Math.max(this.max, range.max));
            }
        } },
    contains: { value: function value(_value2) {
            return !(_value2 > this.max || _value2 < this.min);
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Range) {
                return o.min === this.min && o.max === this.max;
            } else {
                return false;
            }
        } },
    expand: { value: function value() {
            var lowerMargin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var upperMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if (isNaN(lowerMargin)) {
                lowerMargin = 1;
            }
            if (isNaN(upperMargin)) {
                upperMargin = 1;
            }
            var delta = this.max - this.min;
            return new Range(this.min - delta * lowerMargin, this.max + delta * upperMargin);
        } },
    getCentralValue: { value: function value() {
            return (this.min + this.max) / 2;
        } },
    getRandomFloat: { value: function value() {
            return Math.random() * (this.max - this.min) + this.min;
        } },
    getRandomInteger: { value: function value() {
            return Math.floor(Math.random() * (this.max - this.min) + this.min);
        } },
    isOutOfRange: { value: function value(_value3) {
            return _value3 > this.max || _value3 < this.min;
        } },
    overlap: { value: function value(range) {
            return this.max >= range.min && range.max >= this.min;
        } },
    size: { value: function value() {
            return this.max - this.min;
        } },
    toString: { writable: true, value: function value() {
            return "[Range min:" + this.min + " max:" + this.max + "]";
        } }
});
Object.defineProperties(Range, {
    COLOR: { value: new Range(-255, 255, false), enumerable: true },
    DEGREE: { value: new Range(0, 360, false), enumerable: true },
    PERCENT: { value: new Range(0, 100, false), enumerable: true },
    RADIAN: { value: new Range(0, Math.PI * 2, false), enumerable: true },
    UNITY: { value: new Range(0, 1, false), enumerable: true }
});

/**
 * The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @summary The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.numeric
 * @memberof system
 */
var numeric = Object.assign({
  PRNG: PRNG,
  Range: Range,
  RomanNumber: RomanNumber
});

function ActionEntry(action) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  this.action = action;
  this.auto = Boolean(auto);
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}
ActionEntry.prototype = Object.create(Object.prototype, {
  constructor: { value: ActionEntry },
  toString: { value: function value() {
      return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]";
    } }
});

function Batch() {
    var _this = this;
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Object.defineProperties(this, {
        _entries: {
            value: [],
            enumerable: false,
            writable: true,
            configurable: false
        }
    });
    if (init && init instanceof Array && init.length > 0) {
        init.forEach(function (element) {
            if (element instanceof Runnable) {
                _this.add(element);
            }
        });
    }
}
Batch.prototype = Object.create(Runnable.prototype, {
    constructor: { writable: true, value: Batch },
    length: {
        get: function get() {
            return this._entries.length;
        }
    },
    add: { writable: true, value: function value(command) {
            if (command && command instanceof Runnable) {
                this._entries.push(command);
                return true;
            }
            return false;
        } },
    clear: { writable: true, value: function value() {
            this._entries.length = 0;
        } },
    clone: { writable: true, value: function value() {
            var b = new Batch();
            var l = this._entries.length;
            for (var i = 0; i < l; i++) {
                b.add(this._entries[i]);
            }
            return b;
        } },
    contains: { writable: true, value: function value(command) {
            if (command instanceof Runnable) {
                var l = this._entries.length;
                while (--l > -1) {
                    if (this._entries[l] === command) {
                        return true;
                    }
                }
            }
            return false;
        } },
    get: { writable: true, value: function value(key) {
            return this._entries[key];
        } },
    indexOf: { writable: true, value: function value(command, fromIndex /*uint*/) {
            if (isNaN(fromIndex)) {
                fromIndex = 0;
            }
            fromIndex = fromIndex > 0 ? Math.round(fromIndex) : 0;
            if (command instanceof Runnable) {
                var l = this._entries.length;
                var i = fromIndex;
                for (i; i < l; i++) {
                    if (this._entries[i] === command) {
                        return i;
                    }
                }
            }
            return -1;
        } },
    isEmpty: { writable: true, value: function value() {
            return this._entries.length === 0;
        } },
    remove: { writable: true, value: function value(command) {
            var index = this.indexOf(command);
            if (index > -1) {
                this._entries.splice(index, 1);
                return true;
            }
            return false;
        } },
    run: { writable: true, value: function value() {
            var l = this._entries.length;
            if (l > 0) {
                var i = -1;
                while (++i < l) {
                    this._entries[i].run();
                }
            }
        } },
    stop: { writable: true, value: function value() {
            var l = this._entries.length;
            if (l > 0) {
                this._entries.forEach(function (element) {
                    if (element instanceof Runnable && 'stop' in element && element.stop instanceof Function) {
                        element.stop();
                    }
                });
            }
        } },
    toArray: { writable: true, value: function value() {
            return this._entries.slice();
        } },
    toString: { writable: true, value: function value() {
            var r = "[Batch";
            var l = this._entries.length;
            if (l > 0) {
                r += '[';
                this._entries.forEach(function (element, index) {
                    r += element;
                    if (index < l - 1) {
                        r += ",";
                    }
                });
                r += ']';
            }
            r += "]";
            return r;
        } }
});

function TaskGroup() {
    var _this = this;
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    Task.call(this);
    Object.defineProperties(this, {
        verbose: { value: false, writable: true },
        _actions: { value: [], writable: true },
        _next: { value: null, writable: true, configurable: true },
        _stopped: { value: false, writable: true },
        _mode: { value: TaskGroup.NORMAL, writable: true }
    });
    if (typeof mode === "string" || mode instanceof String) {
        this.mode = mode;
    }
    if (actions && actions instanceof Array && actions.length > 0) {
        actions.forEach(function (action) {
            if (action instanceof Action) {
                _this.add(action);
            }
        });
    }
}
Object.defineProperties(TaskGroup, {
    EVERLASTING: { value: 'everlasting', enumerable: true },
    NORMAL: { value: 'normal', enumerable: true },
    TRANSIENT: { value: 'transient', enumerable: true }
});
TaskGroup.prototype = Object.create(Task.prototype, {
    constructor: { writable: true, value: TaskGroup },
    length: {
        get: function get() {
            return this._actions.length;
        },
        set: function set(value) {
            if (this._running) {
                throw new Error(this + " length property can't be changed, the batch process is in progress.");
            }
            this.dispose();
            var old /*uint*/ = this._actions.length;
            this._actions.length = value;
            var l = this._actions.length;
            if (l > 0) {
                var e;
                while (--l > -1) {
                    e = this._actions[l];
                    if (e && e.action && this._next) {
                        e.action.finishIt.connect(this._next);
                    }
                }
            } else if (old > 0) {
                this.notifyCleared();
            }
        }
    },
    mode: {
        get: function get() {
            return this._mode;
        },
        set: function set(value) {
            this._mode = value === TaskGroup.TRANSIENT || value === TaskGroup.EVERLASTING ? value : TaskGroup.NORMAL;
        }
    },
    stopped: {
        get: function get() {
            return this._stopped;
        }
    },
    add: { value: function value(action) {
            var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var autoRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            if (this._running) {
                throw new Error(this + " add failed, the process is in progress.");
            }
            if (action && action instanceof Action) {
                autoRemove = Boolean(autoRemove);
                priority = priority > 0 ? Math.round(priority) : 0;
                if (this._next) {
                    action.finishIt.connect(this._next);
                }
                this._actions.push(new ActionEntry(action, priority, autoRemove));
                var i;
                var j;
                var a = this._actions;
                var swap = function swap(j, k) {
                    var temp = a[j];
                    a[j] = a[k];
                    a[k] = temp;
                    return true;
                };
                var swapped = false;
                var l = a.length;
                for (i = 1; i < l; i++) {
                    for (j = 0; j < l - i; j++) {
                        if (a[j + 1].priority > a[j].priority) {
                            swapped = swap(j, j + 1);
                        }
                    }
                    if (!swapped) {
                        break;
                    }
                }
                return true;
            }
            return false;
        } },
    clone: { writable: true, value: function value() {
            return new TaskGroup(this._mode, this._actions.length > 0 ? this._actions : null);
        } },
    contains: { writable: true, value: function value(action) {
            if (action && action instanceof Action) {
                if (this._actions.length > 0) {
                    var e;
                    var l = this._actions.length;
                    while (--l > -1) {
                        e = this._actions[l];
                        if (e && e.action === action) {
                            return true;
                        }
                    }
                }
            }
            return false;
        } },
    dispose: { writable: true, value: function value() {
            var _this2 = this;
            if (this._actions.length > 0) {
                this._actions.forEach(function (entry) {
                    if (entry instanceof ActionEntry) {
                        entry.action.finishIt.disconnect(_this2._next);
                    }
                });
            }
        } },
    get: { writable: true, value: function value(index /*uint*/) {
            if (this._actions.length > 0 && index < this._actions.length) {
                var entry = this._actions[index];
                if (entry) {
                    return entry.action;
                }
            }
            return null;
        } },
    isEmpty: { writable: true, value: function value() {
            return this._actions.length === 0;
        } },
    next: { writable: true, value: function value(action /*Action*/) {
        } },
    remove: { writable: true, value: function value(action) {
            var _this3 = this;
            if (this._running) {
                throw new Error(this + " remove failed, the process is in progress.");
            }
            this.stop();
            if (this._actions.length > 0) {
                if (action && action instanceof Action) {
                    var e;
                    var l = this._actions.length;
                    this._actions.forEach(function (element) {
                        if (element && element instanceof ActionEntry && element.action === action) {
                            if (_this3._next) {
                                e.action.finishIt.disconnect(_this3._next);
                            }
                            _this3._actions.splice(l, 1);
                            return true;
                        }
                    });
                } else {
                    this.dispose();
                    this._actions.length = 0;
                    this.notifyCleared();
                    return true;
                }
            }
            return false;
        } },
    toArray: { writable: true, value: function value() {
            if (this._actions.length > 0) {
                var output = [];
                if (this._actions.length > 0) {
                    this._actions.forEach(function (element) {
                        if (element && element instanceof ActionEntry && element.action) {
                            output.push(element.action);
                        }
                    });
                }
                return output;
            } else {
                return [];
            }
        } },
    toString: { writable: true, value: function value() {
            var s = "[" + this.constructor.name;
            if (Boolean(this.verbose)) {
                if (this._actions.length > 0) {
                    s += "[";
                    var i;
                    var e;
                    var l = this._actions.length;
                    var r = [];
                    for (i = 0; i < l; i++) {
                        e = this._actions[i];
                        r.push(e && e.action ? e.action : null);
                    }
                    s += r.toString();
                    s += "]";
                }
            }
            s += "]";
            return s;
        } }
});

function BatchTaskNext(batch) {
    this.batch = batch;
}
BatchTaskNext.prototype = Object.create(Receiver.prototype, {
    constructor: { value: BatchTaskNext },
    receive: { value: function value(action) {
            var batch = this.batch;
            var mode = batch.mode;
            var actions = batch._actions;
            var currents = batch._currents;
            if (action && currents.has(action)) {
                var entry = currents.get(action);
                if (mode !== TaskGroup.EVERLASTING) {
                    if (mode === TaskGroup.TRANSIENT || entry.auto && mode === TaskGroup.NORMAL) {
                        var e;
                        var l = actions.length;
                        while (--l > -1) {
                            e = actions[l];
                            if (e && e.action === action) {
                                action.finishIt.disconnect(this);
                                actions.splice(l, 1);
                                break;
                            }
                        }
                    }
                }
                currents.delete(action);
            }
            if (batch._current !== null) {
                batch.notifyChanged();
            }
            batch._current = action;
            batch.notifyProgress();
            if (currents.length === 0) {
                batch._current = null;
                batch.notifyFinished();
            }
        } }
});

function BatchTask() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    TaskGroup.call(this, mode, actions);
    Object.defineProperties(this, {
        _current: { value: null, writable: true },
        _currents: { value: new ArrayMap(), writable: true },
        _next: { value: new BatchTaskNext(this) }
    });
}
BatchTask.prototype = Object.create(TaskGroup.prototype, {
    current: { get: function get() {
            return this._current;
        } }
});
BatchTask.prototype.constructor = BatchTask;
BatchTask.prototype.clone = function () {
    return new BatchTask(this._mode, this._actions.length > 0 ? this._actions : null);
};
BatchTask.prototype.resume = function ()
{
    if (this._stopped) {
        this._running = true;
        this._stopped = false;
        this.notifyResumed();
        if (this._actions.length > 0) {
            var a;
            var e;
            var l = this._actions.length;
            while (--l > -1) {
                e = this._actions[l];
                if (e) {
                    a = e.action;
                    if (a) {
                        if ("resume" in a) {
                            a.resume();
                        } else {
                            this.next(a);
                        }
                    }
                }
            }
        }
    } else {
        this.run();
    }
};
BatchTask.prototype.run = function ()
{
    var _this = this;
    if (!this._running) {
        this.notifyStarted();
        this._currents.clear();
        this._stopped = false;
        this._current = null;
        if (this._actions.length > 0) {
            var actions = [];
            this._actions.forEach(function (entry) {
                if (entry && entry.action) {
                    actions.push(entry.action);
                    _this._currents.set(entry.action, entry);
                }
            });
            actions.forEach(function (action) {
                action.run();
            });
        } else {
            this.notifyFinished();
        }
    }
};
BatchTask.prototype.stop = function ()
{
    if (this._running) {
        if (this._actions.length > 0) {
            var a = void 0;
            var e = void 0;
            var l = this._actions.length;
            while (--l > -1) {
                e = this._actions[l];
                if (e) {
                    a = e.action;
                    if (a) {
                        if ("stop" in a) {
                            a.stop();
                        }
                    }
                }
            }
        }
        this._running = false;
        this._stopped = true;
        this.notifyStopped();
    }
};

function Cache() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    Action.call(this);
    Object.defineProperties(this, {
        target: { value: target, writable: true },
        _queue: { value: [], writable: true }
    });
    if (init && init instanceof Array && init.length > 0) {
        init.forEach(function (prop) {
            if (prop instanceof Property) {
                this._queue.push(prop);
            }
        });
    }
}
Cache.prototype = Object.create(Action.prototype, {
    constructor: { writable: true, value: Cache },
    length: {
        get: function get() {
            return this._queue.length;
        }
    }
});
Cache.prototype.add = function (property) {
    if (property instanceof Property) {
        this._queue.push(property);
    }
    return this;
};
Cache.prototype.addAttribute = function (name, value)
{
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        this._queue.push(new Attribute(name, value));
    }
    return this;
};
Cache.prototype.addMethod = function (name)
{
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        this._queue.push(new Method(name, args));
    }
    return this;
};
Cache.prototype.addMethodWithArguments = function (name, args) {
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        this._queue.push(new Method(name, args));
    }
    return this;
};
Cache.prototype.clear = function () {
    this._queue.length = 0;
};
Cache.prototype.clone = function () {
    return new Cache(this.target, this._queue);
};
Cache.prototype.isEmpty = function () {
    return this._queue.length === 0;
};
Cache.prototype.run = function () {
    this.notifyStarted();
    if (this.target) {
        var l = this._queue.length;
        if (l > 0) {
            var item;
            var name;
            for (var i = 0; i < l; i++) {
                item = this._queue.shift();
                if (item instanceof Method) {
                    name = item.name;
                    if (name && name in this.target) {
                        if (this.target[name] instanceof Function) {
                            this.target[name].apply(this.target, item.args);
                        }
                    }
                } else if (item instanceof Attribute) {
                    name = item.name;
                    if (name in this.target) {
                        this.target[name] = item.value;
                    }
                }
            }
        }
    }
    this.notifyFinished();
};

function ChainNext() {
    var chain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.chain = chain;
}
ChainNext.prototype = Object.create(Receiver.prototype, {
    constructor: { value: ChainNext },
    receive: { value: function value() {
            if (this.chain === null) {
                return;
            }
            var chain = this.chain;
            var mode = chain._mode;
            if (chain._current) {
                if (mode !== TaskGroup.EVERLASTING) {
                    if (mode === TaskGroup.TRANSIENT || chain._current.auto && mode === TaskGroup.NORMAL) {
                        chain._current.action.finishIt.disconnect(this);
                        chain._position--;
                        chain._actions.splice(this._position, 1);
                    }
                }
                chain.notifyChanged();
                chain._current = null;
            }
            if (chain._actions.length > 0) {
                if (chain.hasNext()) {
                    chain._current = chain._actions[chain._position++];
                    chain.notifyProgress();
                    if (chain._current && chain._current.action) {
                        chain._current.action.run();
                    } else {
                        this.receive();
                    }
                } else if (this.looping) {
                    chain._position = 0;
                    if (chain.numLoop === 0) {
                        chain.notifyLooped();
                        chain._currentLoop = 0;
                        this.receive();
                    } else if (chain._currentLoop < chain.numLoop) {
                        chain._currentLoop++;
                        chain.notifyLooped();
                        this.receive();
                    } else {
                        chain._currentLoop = 0;
                        chain.notifyFinished();
                    }
                } else {
                    chain._currentLoop = 0;
                    chain._position = 0;
                    chain.notifyFinished();
                }
            } else {
                chain.notifyFinished();
            }
        } }
});

function Chain() {
    var looping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var numLoop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'normal';
    var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    TaskGroup.call(this, mode, actions);
    Object.defineProperties(this, {
        looping: { value: Boolean(looping), writable: true },
        numLoop: {
            value: numLoop > 0 ? Math.round(numLoop) : 0,
            writable: true
        },
        _current: { value: null, writable: true },
        _currentLoop: { value: 0, writable: true },
        _position: { value: 0, writable: true },
        _next: { value: new ChainNext(this) }
    });
}
Chain.prototype = Object.create(TaskGroup.prototype, {
    constructor: { writable: true, value: Chain },
    current: { get: function get() {
            return this._current ? this._current.action : null;
        } },
    currentLoop: { get: function get() {
            return this._currentLoop;
        } },
    position: { get: function get() {
            return this._position;
        } },
    clone: { writable: true, value: function value() {
            return new Chain(this.looping, this.numLoop, this._mode, this._actions.length > 0 ? this._actions : null);
        } },
    element: { writable: true, value: function value() {
            return this.hasNext() ? this._actions[this._position].action : null;
        } },
    hasNext: { writable: true, value: function value() {
            return this._position < this._actions.length;
        } },
    resume: { writable: true, value: function value() {
            if (this._stopped) {
                this._running = true;
                this._stopped = false;
                this.notifyResumed();
                if (this._current && this._current.action) {
                    if ("resume" in this._current.action) {
                        this._current.action.resume();
                    }
                } else {
                    this._next.receive();
                }
            } else {
                this.run();
            }
        } },
    run: { writable: true, value: function value() {
            if (!this._running) {
                this.notifyStarted();
                this._current = null;
                this._stopped = false;
                this._position = 0;
                this._currentLoop = 0;
                this._next.receive();
            }
        } },
    stop: { writable: true, value: function value() {
            if (this._running) {
                if (this._current && this._current.action) {
                    if ('stop' in this._current.action && this._current.action instanceof Function) {
                        this._current.action.stop();
                        this._running = false;
                        this._stopped = true;
                        this.notifyStopped();
                    }
                }
            }
        } }
});

function Do() {
    Action.call(this);
}
Do.prototype = Object.create(Action.prototype, {
    constructor: { writable: true, value: Do },
    clone: { writable: true, value: function value() {
            return new Do();
        } },
    something: { enumerable: true, writable: true, value: function value() {
        } },
    run: { writable: true, value: function value() {
            this.notifyStarted();
            if ('something' in this && this.something instanceof Function) {
                this.something();
            }
            this.notifyFinished();
        } }
});

function FrameTimer() {
    Task.call(this);
    Object.defineProperties(this, {
        deltaTime: { value: 1, writable: true },
        elapsedMS: { value: 1 / FPMS, writable: true },
        fps: { get: function get() {
                return 1000 / this.elapsedMS;
            } },
        minFPS: {
            get: function get() {
                return 1000 / this._maxElapsedMS;
            },
            set: function set(fps) {
                this._maxElapsedMS = 1 / Math.min(Math.max(0, fps) / 1000, FPMS);
            }
        },
        lastTime: { value: 0, writable: true },
        speed: { value: 1, writable: true },
        _requestID: { value: null, writable: true },
        _maxElapsedMS: { value: 100, writable: true },
        _stopped: { value: false, writable: true }
    });
}
FrameTimer.prototype = Object.create(Task.prototype, {
    constructor: { value: FrameTimer, writable: true },
    stopped: { get: function get() {
            return this._stopped;
        } },
    clone: { value: function value() {
            return new FrameTimer();
        } },
    resume: { value: function value() {
            if (this._stopped) {
                this._running = true;
                this._stopped = false;
                this.notifyResumed();
                this._requestID = requestAnimationFrame(this._next.bind(this));
            }
        } },
    reset: { value: function value() {
            this.stop();
            this._stopped = false;
        } },
    run: { value: function value() {
            if (!this._running) {
                this._stopped = false;
                this.lastTime = performance.now();
                this.notifyStarted();
                this._requestID = requestAnimationFrame(this._next.bind(this));
            }
        } },
    stop: { value: function value() {
            if (this._running && !this._stopped) {
                this._running = false;
                this._stopped = true;
                cancelAnimationFrame(this._requestID);
                this._requestID = null;
                this.notifyStopped();
            }
        } },
    toString: { value: function value() {
            return '[FrameTimer]';
        } },
    _next: { value: function value() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : performance.now();
            if (this._requestID !== null && (this._stopped || !this._running)) {
                cancelAnimationFrame(this._requestID);
                this._requestID = null;
                return;
            }
            var elapsedMS = void 0;
            if (time > this.lastTime) {
                elapsedMS = this.elapsedMS = time - this.lastTime;
                if (elapsedMS > this._maxElapsedMS) {
                    elapsedMS = this._maxElapsedMS;
                }
                this.deltaTime = elapsedMS * FPMS * this.speed;
                this.notifyProgress();
            } else {
                this.deltaTime = this.elapsedMS = 0;
            }
            this.lastTime = time;
            this._requestID = requestAnimationFrame(this._next.bind(this));
        } }
});
var FPMS = 0.06;

function Lock(target) {
    Action.call(this);
    this.target = target;
}
Lock.prototype = Object.create(Action.prototype, {
    constructor: { writable: true, value: Lock },
    clone: { writable: true, value: function value() {
            return new Lock(this.target);
        } },
    run: { writable: true, value: function value() {
            this.notifyStarted();
            if (isLockable(this.target) && !this.target.isLocked()) {
                this.target.lock();
            }
            this.notifyFinished();
        } }
});

function Priority() {
    Object.defineProperties(this, {
        priority: {
            get: function get() {
                return this._priority;
            },
            set: function set(value) {
                this._priority = value > 0 || value < 0 ? value : 0;
            }
        },
        _priority: { writable: true, value: 0 }
    });
}
Priority.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Priority },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function isResetable(target) {
    if (target) {
        if (target instanceof Resetable) {
            return true;
        }
        return Boolean(target['reset']) && target.reset instanceof Function;
    }
    return false;
}
function Resetable() {}
Resetable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Resetable },
    reset: { writable: true, value: function value() {} },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function isResumable(target) {
    if (target) {
        if (target instanceof Resumable) {
            return true;
        }
        return Boolean(target['resume']) && target.resume instanceof Function;
    }
    return false;
}
function Resumable() {}
Resumable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Resumable },
    resume: { writable: true, value: function value() {} },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function isStartable(target) {
    if (target) {
        if (target instanceof Startable) {
            return true;
        }
        return Boolean(target['start']) && target.start instanceof Function;
    }
    return false;
}
function Startable() {}
Startable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Startable },
    start: { writable: true, value: function value() {} },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function isStoppable(target) {
    if (target) {
        if (target instanceof Stoppable) {
            return true;
        }
        return Boolean(target['stop']) && target.stop instanceof Function;
    }
    return false;
}
function Stoppable() {}
Stoppable.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Stoppable },
    stop: { writable: true, value: function value() {} },
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function TimeoutPolicy(value, name) {
  Enum.call(this, value, name);
}
TimeoutPolicy.prototype = Object.create(Enum.prototype);
TimeoutPolicy.prototype.constructor = TimeoutPolicy;
Object.defineProperties(TimeoutPolicy, {
  INFINITY: { value: new TimeoutPolicy(0, 'infinity'), enumerable: true },
  LIMIT: { value: new TimeoutPolicy(1, 'limit'), enumerable: true }
});

function Timer() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var repeatCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    Task.call(this);
    Object.defineProperties(this, {
        _count: { value: 0, writable: true },
        _delay: { value: delay > 0 ? delay : 0, writable: true },
        _itv: { value: 0, writable: true },
        _repeatCount: { value: repeatCount > 0 ? repeatCount : 0, writable: true },
        _stopped: { value: false, writable: true },
        _useSeconds: { value: Boolean(useSeconds), writable: true }
    });
}
Timer.prototype = Object.create(Task.prototype, {
    constructor: { value: Timer, writable: true },
    currentCount: { get: function get() {
            return this._count;
        } },
    delay: {
        get: function get() {
            return this._delay;
        },
        set: function set(value) {
            if (this._running) {
                throw new Error(this + " the 'delay' property can't be changed during the running phase.");
            }
            this._delay = value > 0 ? value : 0;
        }
    },
    repeatCount: {
        get: function get() {
            return this._repeatCount;
        },
        set: function set(value) {
            this._repeatCount = value > 0 ? value : 0;
        }
    },
    stopped: { get: function get() {
            return this._stopped;
        } },
    useSeconds: {
        get: function get() {
            return this._useSeconds;
        },
        set: function set(flag) {
            if (this._running) {
                throw new Error(this + " the 'useSeconds' property can't be changed during the running phase.");
            }
            this._useSeconds = Boolean(flag);
        }
    },
    clone: { value: function value() {
            return new Timer(this._delay, this._repeatCount);
        } },
    resume: { value: function value() {
            if (this._stopped) {
                this._running = true;
                this._stopped = false;
                this._itv = setInterval(this._next.bind(this), this._useSeconds ? this._delay * 1000 : this._delay);
                this.notifyResumed();
            }
        } },
    reset: { value: function value() {
            if (this.running) {
                this.stop();
            }
            this._count = 0;
        } },
    run: { value: function value() {
            if (!this._running) {
                this._count = 0;
                this._stopped = false;
                this.notifyStarted();
                this._itv = setInterval(this._next.bind(this), this._useSeconds ? this._delay * 1000 : this._delay);
            }
        } },
    stop: { value: function value() {
            if (this._running && !this._stopped) {
                this._running = false;
                this._stopped = true;
                clearInterval(this._itv);
                this.notifyStopped();
            }
        } },
    _next: { value: function value() {
            this._count++;
            this.notifyProgress();
            if (this._repeatCount > 0 && this._repeatCount === this._count) {
                clearInterval(this._itv);
                this.notifyFinished();
            }
        } }
});

function Unlock(target) {
    Action.call(this);
    this.target = target;
}
Unlock.prototype = Object.create(Action.prototype, {
    constructor: { writable: true, value: Unlock },
    clone: { writable: true, value: function value() {
            return new Unlock(this.target);
        } },
    run: { writable: true, value: function value() {
            this.notifyStarted();
            if (isLockable(this.target) && this.target.isLocked()) {
                this.target.unlock();
            }
            this.notifyFinished();
        } }
});

/**
 * The {@link system.process} library allow you to create and manage asynchronous operations in your applications.
 * @summary The {@link system.process} library allow you to create and manage asynchronous operations in your applications.
 * @namespace system.process
 * @memberof system
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var process = Object.assign({
    isLockable: isLockable,
    isResetable: isResetable,
    isResumable: isResumable,
    isRunnable: isRunnable,
    isStartable: isStartable,
    isStoppable: isStoppable,
    Action: Action,
    ActionEntry: ActionEntry,
    Batch: Batch,
    BatchTask: BatchTask,
    Cache: Cache,
    Chain: Chain,
    Do: Do,
    FrameTimer: FrameTimer,
    Lock: Lock,
    Lockable: Lockable,
    Priority: Priority,
    Resetable: Resetable,
    Resumable: Resumable,
    Runnable: Runnable,
    Startable: Startable,
    Stoppable: Stoppable,
    Task: Task,
    TaskGroup: TaskGroup,
    TaskPhase: TaskPhase,
    TimeoutPolicy: TimeoutPolicy,
    Timer: Timer,
    Unlock: Unlock
});

function And(rule1 /*Rule*/, rule2 /*Rule*/) {
    Object.defineProperties(this, {
        rules: { value: [], enumerable: true },
        length: { get: function get() {
                return this.rules instanceof Array ? this.rules.length : 0;
            } }
    });
    if (!(rule1 instanceof Rule) || !(rule2 instanceof Rule)) {
        throw new ReferenceError(this + ' constructor failed, the two rules in argument must be defined.');
    }
    this.add(rule1);
    this.add(rule2);
    for (var _len = arguments.length, rules = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rules[_key - 2] = arguments[_key];
    }
    if (rules && rules.length > 0) {
        var len = rules.length;
        for (var i = 0; i < len; i++) {
            if (rules[i] instanceof Rule) {
                this.add(rules[i]);
            }
        }
    }
}
And.prototype = Object.create(Rule.prototype);
And.prototype.constructor = And;
And.prototype.add = function (rule) {
    if (rule instanceof Rule) {
        this.rules.push(rule);
    }
    return this;
};
And.prototype.clear = function () {
    this.rules.length = 0;
    return this;
};
And.prototype.eval = function () {
    if (this.rules.length > 0) {
        var b = this.rules[0].eval();
        var l = this.rules.length;
        for (var i = 1; i < l; i++) {
            b = b && this.rules[i].eval();
        }
        return b;
    } else {
        return false;
    }
};

function DivBy() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  this.value1 = value1;
  this.value2 = value2;
}
DivBy.prototype = Object.create(Rule.prototype);
DivBy.prototype.constructor = DivBy;
DivBy.prototype.eval = function () {
  return this.value1 % this.value2 === 0;
};

function Even() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  this.value = value;
}
Even.prototype = Object.create(Rule.prototype);
Even.prototype.constructor = Even;
Even.prototype.eval = function () {
  return this.value % 2 === 0;
};

function GreaterOrEqualsThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  this.value1 = value1;
  this.value2 = value2;
}
GreaterOrEqualsThan.prototype = Object.create(Rule.prototype);
GreaterOrEqualsThan.prototype.constructor = GreaterOrEqualsThan;
GreaterOrEqualsThan.prototype.eval = function () {
  return this.value1 >= this.value2;
};

function GreaterThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  this.value1 = value1;
  this.value2 = value2;
}
GreaterThan.prototype = Object.create(Rule.prototype);
GreaterThan.prototype.constructor = GreaterThan;
GreaterThan.prototype.eval = function () {
  return this.value1 > this.value2;
};

function IsBoolean() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.value = value;
}
IsBoolean.prototype = Object.create(Rule.prototype);
IsBoolean.prototype.constructor = IsBoolean;
IsBoolean.prototype.eval = function () {
  return typeof this.value === 'boolean' || this.value instanceof Boolean;
};

function IsNaN() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  this.value = value;
  this.strict = Boolean(strict);
}
IsNaN.prototype = Object.create(Rule.prototype);
IsNaN.prototype.constructor = IsNaN;
IsNaN.prototype.eval = function () {
  if (this.strict) {
    return isNaN(this.value);
  } else {
    return !(this.value instanceof Number || typeof this.value === 'number') || isNaN(this.value);
  }
};

function IsNumber() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.value = value;
}
IsNumber.prototype = Object.create(Rule.prototype);
IsNumber.prototype.constructor = IsNumber;
IsNumber.prototype.eval = function () {
  return typeof this.value === 'number' || this.value instanceof Number;
};

function IsString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.value = value;
}
IsString.prototype = Object.create(Rule.prototype);
IsString.prototype.constructor = IsString;
IsString.prototype.eval = function () {
  return typeof this.value === 'string' || this.value instanceof String;
};

function LessOrEqualsThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  this.value1 = value1;
  this.value2 = value2;
}
LessOrEqualsThan.prototype = Object.create(Rule.prototype);
LessOrEqualsThan.prototype.constructor = LessOrEqualsThan;
LessOrEqualsThan.prototype.eval = function () {
  return this.value1 <= this.value2;
};

function LessThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  this.value1 = value1;
  this.value2 = value2;
}
LessThan.prototype = Object.create(Rule.prototype);
LessThan.prototype.constructor = LessThan;
LessThan.prototype.eval = function () {
  return this.value1 < this.value2;
};

function Not() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  this.condition = condition;
}
Not.prototype = Object.create(Rule.prototype);
Not.prototype.constructor = Not;
Not.prototype.eval = function () {
  return !(this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition));
};

function NotEquals() {
    var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.value1 = value1;
    this.value2 = value2;
}
NotEquals.prototype = Object.create(Rule.prototype);
NotEquals.prototype.constructor = NotEquals;
NotEquals.prototype.eval = function () {
    if (this.value1 === this.value2) {
        return false;
    } else if (this.value1 instanceof Rule && this.value2 instanceof Rule) {
        return this.value1.eval() !== this.value2.eval();
    } else if (isEquatable(this.value1)) {
        return !this.value1.equals(this.value2);
    } else {
        return true;
    }
};

function Odd() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  this.value = value;
}
Odd.prototype = Object.create(Rule.prototype);
Odd.prototype.constructor = Odd;
Odd.prototype.eval = function () {
  return this.value % 2 !== 0;
};

function Or(rule1 /*Rule*/, rule2 /*Rule*/) {
    Object.defineProperties(this, {
        rules: { value: [], enumerable: true },
        length: { get: function get() {
                return this.rules instanceof Array ? this.rules.length : 0;
            } }
    });
    if (!(rule1 instanceof Rule) || !(rule2 instanceof Rule)) {
        throw new ReferenceError(this + ' constructor failed, the two rules in argument must be defined.');
    }
    this.add(rule1);
    this.add(rule2);
    for (var _len = arguments.length, rules = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rules[_key - 2] = arguments[_key];
    }
    if (rules && rules.length > 0) {
        var len = rules.length;
        for (var i = 0; i < len; i++) {
            if (rules[i] instanceof Rule) {
                this.add(rules[i]);
            }
        }
    }
}
Or.prototype = Object.create(Rule.prototype);
Or.prototype.constructor = Or;
Or.prototype.add = function (rule) {
    if (rule instanceof Rule) {
        this.rules.push(rule);
    }
    return this;
};
Or.prototype.clear = function () {
    this.rules.length = 0;
    return this;
};
Or.prototype.eval = function () {
    if (this.rules.length > 0) {
        var b = this.rules[0].eval();
        var l = this.rules.length;
        for (var i = 1; i < l; i++) {
            b = b || this.rules[i].eval();
        }
        return b;
    } else {
        return false;
    }
};

/**
 * The {@link system.rules} library defines a set of functions and classes to evaluate some basic or complex conditions in your applications.
 * @summary The {@link system.rules} library defines a set of functions and classes to evaluate some basic or complex conditions in your applications.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.rules
 * @memberof system
 */
var rules = Object.assign({
    isRule: isRule,
    And: And,
    BooleanRule: BooleanRule,
    DivBy: DivBy,
    EmptyString: EmptyString,
    Equals: Equals,
    Even: Even,
    False: False,
    GreaterOrEqualsThan: GreaterOrEqualsThan,
    GreaterThan: GreaterThan,
    IsBoolean: IsBoolean,
    IsNaN: IsNaN,
    IsNumber: IsNumber,
    IsString: IsString,
    LessOrEqualsThan: LessOrEqualsThan,
    LessThan: LessThan,
    Odd: Odd,
    Not: Not,
    NotEquals: NotEquals,
    Null: Null,
    Or: Or,
    Rule: Rule,
    True: True,
    Undefined: Undefined,
    Zero: Zero
});

/**
 * The {@link system.signals} library is light-weight, strongly-typed messaging tools. Wire your application with better APIs and less boilerplate than W3C DOMEvents..
 * <p><b>Concept: </b>
 * <ul>
 * <li>A Signal is essentially a minimal emiter specific to one event, with its own <code>array</code> of receivers/slots ({@link system.signals.Receiver|Receiver} or <code>Function</code>).</li>
 * <li>A Signal gives an event a concrete membership in a class.</li>
 * <li>Receivers subscribe to real objects, not to string-based channels.</li>
 * <li>Event string constants are no longer needed.</li>
 * <li>Signals are inspired by {@link https://en.wikipedia.org/wiki/Signals_and_slots|signals/slots in Qt}.</li>
 * <ul>
 * @summary The {@link system.signals} library is light-weight, strongly-typed messaging tools.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.signals
 * @memberof system
 * @example
 * function Slot( name )
 * {
 *     this.name = name ;
 * }
 *
 * Slot.prototype = Object.create( system.signals.Receiver.prototype );
 * Slot.prototype.constructor = Slot;
 *
 * Slot.prototype.receive = function ( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * Slot.prototype.toString = function ()
 * {
 *     return "[Slot name:" + this.name + "]" ;
 * }
 *
 * var slot1 = new Slot("slot1") ;
 *
 * var slot2 = function( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * var signal = new system.signals.Signal() ;
 *
 * //signal.proxy = slot1 ;
 *
 * signal.connect( slot1 , 0 ) ;
 * signal.connect( slot2 , 2 ) ;
 *
 * signal.emit( "hello world" ) ;
 */
var signals = Object.assign({
  Receiver: Receiver,
  SignalEntry: SignalEntry,
  Signaler: Signaler,
  Signal: Signal
});

function MotionNextFrame(motion) {
    this.motion = motion instanceof Motion ? motion : null;
}
MotionNextFrame.prototype = Object.create(Receiver.prototype, {
    constructor: { value: MotionNextFrame },
    receive: { value: function value() {
            if (this.motion) {
                this.motion.setTime(this.motion.useSeconds ? (performance$1.now() - this.motion._startTime) / 1000 : this.motion._time + 1);
            }
        } }
});

function Transition() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Task.call(this);
    Object.defineProperties(this, {
        _id: { value: id, writable: true }
    });
}
Transition.prototype = Object.create(Task.prototype, {
    constructor: { value: Transition, writable: true },
    id: {
        get: function get() {
            return this._id;
        },
        set: function set(value) {
            this._id = value;
        }
    },
    clone: { writable: true, value: function value() {
            return new Transition(this.id);
        } },
    equals: { writable: true, value: function value(o) {
            if (o === this) {
                return true;
            } else if (o && o instanceof Transition) {
                return o.id === this.id;
            } else {
                return false;
            }
        } },
    toString: { value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

function Motion() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Transition.call(this, id);
    Object.defineProperties(this, {
        useSeconds: { writable: true, value: false },
        _duration: { writable: true, value: 0 },
        _fps: { writable: true, value: NaN },
        _nextFrame: { value: new MotionNextFrame(this) },
        _prevTime: { writable: true, value: NaN },
        _startTime: { writable: true, value: NaN },
        _stopped: { writable: true, value: false },
        _target: { writable: true, value: null },
        _time: { writable: true, value: NaN },
        _timer: { writable: true, value: null }
    });
    this.setTimer(new FrameTimer());
}
Motion.prototype = Object.create(Transition.prototype, {
    constructor: { value: Motion, writable: true },
    duration: {
        get: function get() {
            return this._duration;
        },
        set: function set(value) {
            this._duration = isNaN(value) || value <= 0 ? 0 : value;
        }
    },
    fps: {
        get: function get() {
            return this._fps;
        },
        set: function set(value) {
            if (this._timer && this._timer._running) {
                this._timer.stop();
            }
            this._fps = value > 0 ? value : NaN;
            if (isNaN(this._fps)) {
                this.setTimer(new FrameTimer());
            } else {
                this.setTimer(new Timer(1000 / this._fps));
            }
        }
    },
    prevTime: {
        get: function get() {
            return this._prevTime;
        }
    },
    stopped: {
        get: function get() {
            return this._stopped;
        }
    },
    target: {
        get: function get() {
            return this._target;
        },
        set: function set(value) {
            this._target = value;
        }
    },
    clone: { writable: true, value: function value() {
            return new Motion(this.id);
        } },
    nextFrame: { value: function value() {
            this.setTime(this.useSeconds ? (performance$1.now() - this._startTime) / 1000 : this._time + 1);
        } },
    prevFrame: { value: function value() {
            if (!this.useSeconds) {
                this.setTime(this._time - 1);
            }
        } },
    resume: { writable: true, value: function value() {
            if (this._stopped && this._time !== this._duration) {
                this._stopped = false;
                this.fixTime();
                this.startInterval();
                this.notifyResumed();
            } else {
                this.run();
            }
        } },
    rewind: { value: function value() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this._time = time > 0 ? time : 0;
            this.fixTime();
            this.update();
        } },
    run: { writable: true, value: function value() {
            this._stopped = false;
            this.notifyStarted();
            this.rewind();
            this.startInterval();
        } },
    setTime: { value: function value(time) {
            this._prevTime = this._time;
            if (time > this._duration) {
                time = this._duration;
                if (this.looping) {
                    this.rewind(time - this._duration);
                    this.notifyLooped();
                } else {
                    if (this.useSeconds) {
                        this._time = this._duration;
                        this.update();
                    }
                    this.stop();
                    this.notifyFinished();
                }
            } else if (time < 0) {
                this.rewind();
            } else {
                this._time = time;
                this.update();
            }
        } },
    startInterval: { value: function value() {
            this._timer.start();
            this._running = true;
        } },
    stop: { value: function value() {
            if (this._running) {
                this.stopInterval();
                this._stopped = true;
                this.notifyStopped();
            }
        } },
    stopInterval: { value: function value() {
            this._timer.stop();
            this._running = false;
        } },
    update: { writable: true, value: function value() {
        } },
    fixTime: { value: function value() {
            if (this.useSeconds) {
                this._startTime = performance$1.now() - this._time * 1000;
            }
        } },
    setTimer: { value: function value(_value) {
            if (this._timer) {
                if (this._timer instanceof Task) {
                    if (this._timer._running) {
                        this._timer.stop();
                    }
                    this._timer.progressIt.disconnect(this._nextFrame);
                }
                this._timer = null;
            }
            this._timer = _value instanceof Task ? _value : new Timer();
            if (this._timer) {
                this._timer.progressIt.connect(this._nextFrame);
            }
        } }
});

function TweenUnit() {
    var easing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var auto = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    Motion.call(this, id);
    Object.defineProperties(this, {
        position: { writable: true, value: 0 },
        _change: { writable: true, value: 1 },
        _easing: { writable: true, value: easing instanceof Function ? easing : linear }
    });
    this.duration = duration;
    this.useSeconds = useSeconds;
    if (auto) {
        this.run();
    }
}
TweenUnit.prototype = Object.create(Motion.prototype, {
    constructor: { value: TweenUnit, writable: true },
    easing: {
        get: function get() {
            return this._easing;
        },
        set: function set(value) {
            this._easing = value instanceof Function ? value : linear;
        }
    },
    clone: { writable: true, value: function value() {
            return new TweenUnit(this.easing, this.duration, this.useSeconds);
        } },
    set: { value: function value(easing) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            this.duration = duration;
            this.useSeconds = useSeconds;
            this.easing = easing;
        } },
    update: { writable: true, value: function value() {
            if (this._easing) {
                this.position = this._easing(this._time, 0, this._change, this._duration);
                this.notifyChanged();
            } else {
                this.position = null;
            }
        } }
});

function Tween(init) {
    TweenUnit.call(this);
    this.position = null;
    Object.defineProperties(this, {
        _begin: { writable: true, value: null },
        _changed: { writable: true, value: false },
        _easings: { writable: true, value: null },
        _from: { writable: true, value: null },
        _target: { writable: true, value: null },
        _to: { writable: true, value: null }
    });
    if (init) {
        for (var prop in init) {
            if (prop in this) {
                this[prop] = init[prop];
            }
        }
        if ('auto' in init && init.auto === true) {
            this.run();
        }
    }
}
Tween.prototype = Object.create(TweenUnit.prototype, {
    constructor: { value: TweenUnit, writable: true },
    easings: {
        get: function get() {
            return this._easings;
        },
        set: function set(value) {
            this._easings = value;
        }
    },
    from: {
        get: function get() {
            return this._from;
        },
        set: function set(value) {
            this._from = value;
            this._changed = true;
        }
    },
    target: {
        get: function get() {
            return this._target;
        },
        set: function set(value) {
            this._target = value;
            this._changed = true;
        }
    },
    to: {
        get: function get() {
            return this._to;
        },
        set: function set(value) {
            this._to = value;
            this._changed = true;
        }
    },
    clone: { writable: true, value: function value() {
            return new Tween({
                duration: this.duration,
                easing: this.easing,
                easings: this.easings,
                from: this.from,
                target: this.target,
                to: this.to,
                useSeconds: this.useSeconds
            });
        } },
    notifyFinished: { value: function value() {
            this._changed = true;
            this._running = false;
            this._phase = TaskPhase.FINISHED;
            this.finishIt.emit(this);
            this._phase = TaskPhase.INACTIVE;
        } },
    run: { writable: true, value: function value() {
            var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            if (to) {
                this.to = to;
            }
            this._changed = true;
            this._stopped = false;
            this.position = null;
            this.notifyStarted();
            this.rewind();
            this.startInterval();
        } },
    update: { writable: true, value: function value() {
            if (this._changed) {
                this._changed = false;
                if (!this._target) {
                    throw new Error(this + " update failed, the 'target' property not must be null.");
                }
                if (!this._to) {
                    throw new Error(this + " update failed, the 'to' property not must be null.");
                }
                if (this._from) {
                    this._begin = this._from;
                } else {
                    this._begin = {};
                    for (var prop in this._to) {
                        if (prop in this._target) {
                            this._begin[prop] = this._target[prop];
                        }
                    }
                }
            }
            this.position = {};
            for (var _prop in this._to) {
                if (_prop in this._target) {
                    var e = this._easings && _prop in this._easings && this.easings[_prop] instanceof Function ? this.easings[_prop] : this._easing;
                    this._target[_prop] = this.position[_prop] = e(this._time, this._begin[_prop], this._to[_prop] - this._begin[_prop], this._duration);
                }
            }
            this.notifyChanged();
        } }
});

/**
 * The {@link system.transitions} library is a simple animations toolkit to use in your projects, your games, your websites.
 * @summary The {@link system.transitions} library is a simple animations toolkit to use in your projects, your games, your websites.
 * @namespace system.transitions
 * @memberof system
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @see For more usage, read the {@tutorial system.transitions} tutorial.
 * @example <caption>Javascript script</caption>
 * "use strict" ;
 *
 * window.onload = function()
 * {
 *     if( !vegas )
 *     {
 *         throw new Error( "The VEGAS library is not found." ) ;
 *     }
 *
 *     // ----- imports
 *
 *     var global   = vegas.global ; // jshint ignore:line
 *     var trace    = vegas.trace  ; // jshint ignore:line
 *     var core     = vegas.core   ; // jshint ignore:line
 *     var system   = vegas.system ; // jshint ignore:line
 *
 *     var Tween = system.transitions.Tween ;
 *
 *     // ----- behaviors
 *
 *     var change = function( tween )
 *     {
 *         trace( 'progress ' + core.dump(tween.target) ) ;
 *         render() ;
 *     }
 *
 *     var finish = function()
 *     {
 *         trace( 'finish' ) ;
 *         // tween.duration = 120 ;
 *         // tween.from = null ;
 *         // tween.to   = tween.to === to ? from : to ;
 *         // tween.run() ;
 *     }
 *
 *     var start = function()
 *     {
 *         trace( 'start' ) ;
 *     }
 *
 *     // ----- initialize
 *
 *     var canvas  = document.getElementById('canvas') ;
 *     var context = canvas.getContext('2d');
 *
 *     canvas.width  = 800;
 *     canvas.height = 600;
 *
 *     var color   = '#FF0000' ;
 *     var radius  = 25;
 *
 *     var from    = { x : 100 , y : 100 } ;
 *     var to      = { x : 500 , y : 400 } ;
 *     var target  = { x : 0   , y : 0 } ;
 *
 *     var easings = null ;
 *
 *     easings = { x : core.easings.backOut , y : core.easings.sineOut } ;
 *
 *     var tween = new Tween
 *     ({
 *         auto       : false,
 *         duration   : 48 ,
 *         useSeconds : false ,
 *         easing     : core.easings.backOut,
 *         easings    : easings,
 *         from       : from ,
 *         target     : target ,
 *         to         : to
 *     }) ;
 *
 *     //tween.easing = core.easings.cubicOut ;
 *     //tween.easing = core.easings.elasticOut ;
 *     //tween.easing = core.easings.sineOut ;
 *
 *     // tween.fps = 60  ; // use an internal Timer instance or a FrameTimer instance if fps is NaN
 *
 *     tween.looping = true ;
 *
 *     tween.finishIt.connect( finish ) ;
 *     tween.changeIt.connect( change ) ;
 *     tween.startIt.connect( start ) ;
 *
 *     // ----- render
 *
 *     var render = function()
 *     {
 *         var width  = canvas.width ;
 *         var height = canvas.height ;
 *
 *         context.clearRect(0, 0, width, height);
 *
 *         context.fillStyle = '#333333' ;
 *         context.fillRect(0, 0, width, height );
 *
 *         context.beginPath();
 *         context.arc( target.x, target.y, radius, 0, Math.PI * 2, false );
 *         context.closePath();
 *         context.fillStyle = color ;
 *         context.fill();
 *     }
 *
 *     render() ;
 *
 *     tween.run() ;
 * }
 */
var transitions = Object.assign({
  Motion: Motion,
  Transition: Transition,
  Tween: Tween,
  TweenUnit: TweenUnit
});

/**
 * The {@link system} library is the root package for the <strong>VEGAS JS</strong> framework. It is the starting point of our RIA framework structure : signals, data, IoC, logger, tasks, transitions, logics, rules, models, etc.
 * <p><b>Dependencies :</b> The {@link system} framework reuse the module and building blocks of the {@link core} library.</p>
 * @summary The {@link system} library is the root package for the <strong>VEGAS JS</strong> framework.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system
 * @version 1.0.7
 * @since 1.0.0
 */
var system = Object.assign({
    Enum: Enum,
    Equatable: Equatable,
    Evaluable: Evaluable,
    Formattable: Formattable,
    isEvaluable: isEvaluable,
    isFormattable: isFormattable,
    data: data,
    errors: errors,
    evaluators: evaluators,
    events: events,
    formatters: formatters,
    ioc: ioc,
    logging: logging,
    logics: logics,
    models: models,
    numeric: numeric,
    process: process,
    rules: rules,
    signals: signals,
    transitions: transitions
});

function isDirectionable(target) {
  if (target) {
    return target instanceof Directionable || 'direction' in target;
  }
  return false;
}
function Directionable() {
  this.direction = null;
}
Directionable.prototype = Object.create(Object.prototype);
Directionable.prototype.constructor = Directionable;

var Align = Object.defineProperties({}, {
    NONE: { enumerable: true, value: 0 },
    CENTER: { enumerable: true, value: 1 },
    LEFT: { enumerable: true, value: 2 },
    RIGHT: { enumerable: true, value: 4 },
    TOP: { enumerable: true, value: 8 },
    BOTTOM: { enumerable: true, value: 16 },
    REVERSE: { enumerable: true, value: 32 },
    BOTTOM_LEFT: { enumerable: true, value: 16 | 2 },
    BOTTOM_RIGHT: { enumerable: true, value: 16 | 4 },
    CENTER_LEFT: { enumerable: true, value: 3 },
    CENTER_RIGHT: { enumerable: true, value: 5 },
    TOP_LEFT: { enumerable: true, value: 10 },
    TOP_RIGHT: { enumerable: true, value: 12 },
    LEFT_BOTTOM: { enumerable: true, value: 50 },
    RIGHT_BOTTOM: { enumerable: true, value: 52 },
    LEFT_TOP: { enumerable: true, value: 8 | 2 | 32 },
    RIGHT_TOP: { enumerable: true, value: 8 | 4 | 32 },
    toNumber: { value: function value(str) {
            var none = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if (str === null || !(str instanceof String || typeof str === 'string')) {
                return none;
            }
            str = str.toLowerCase();
            return str in Align.stringToNumber ? Align.stringToNumber[str] : none;
        } },
    toString: { value: function value(_value) {
            switch (_value) {
                case Align.NONE:
                    return "none";
                case Align.BOTTOM:
                    return "b";
                case Align.BOTTOM_LEFT:
                    return "bl";
                case Align.BOTTOM_RIGHT:
                    return "br";
                case Align.CENTER:
                    return "c";
                case Align.CENTER_LEFT:
                    return "cl";
                case Align.CENTER_RIGHT:
                    return "cr";
                case Align.LEFT:
                    return "l";
                case Align.LEFT_BOTTOM:
                    return "lb";
                case Align.LEFT_TOP:
                    return "lt";
                case Align.RIGHT:
                    return "r";
                case Align.RIGHT_TOP:
                    return "rt";
                case Align.RIGHT_BOTTOM:
                    return "rb";
                case Align.TOP:
                    return "t";
                case Align.TOP_LEFT:
                    return "tl";
                case Align.TOP_RIGHT:
                    return "tr";
                default:
                    return "";
            }
        } },
    validate: { value: function value(_value2) {
            return Align.alignments.indexOf(_value2) > -1;
        } }
});
Object.defineProperty(Align, 'alignments', { value: [Align.BOTTOM, Align.BOTTOM_LEFT, Align.BOTTOM_RIGHT, Align.CENTER, Align.CENTER_LEFT, Align.CENTER_RIGHT, Align.LEFT, Align.LEFT_BOTTOM, Align.LEFT_TOP, Align.RIGHT, Align.RIGHT_BOTTOM, Align.RIGHT_TOP, Align.TOP, Align.TOP_LEFT, Align.TOP_RIGHT, Align.NONE] });
Object.defineProperty(Align, 'stringToNumber', { value: {
        "b": Align.BOTTOM,
        "bl": Align.BOTTOM_LEFT,
        "br": Align.BOTTOM_RIGHT,
        "c": Align.CENTER,
        "cl": Align.CENTER_LEFT,
        "cr": Align.CENTER_RIGHT,
        "l": Align.LEFT,
        "lb": Align.LEFT_BOTTOM,
        "lt": Align.LEFT_TOP,
        "none": Align.NONE,
        "r": Align.RIGHT,
        "rb": Align.RIGHT_BOTTOM,
        "rt": Align.RIGHT_TOP,
        "t": Align.TOP,
        "tl": Align.TOP_LEFT,
        "tr": Align.TOP_RIGHT
    } });

var ArcType = Object.defineProperties({}, {
  CHORD: { enumerable: true, value: 'chord' },
  NONE: { enumerable: true, value: 'none' },
  PIE: { enumerable: true, value: 'pie' }
});

function Border() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
    Object.defineProperties(this, {
        value: { value: side, writable: true }
    });
}
Object.defineProperties(Border, {
    ALL: { enumerable: true, value: 30 },
    NONE: { enumerable: true, value: 0 },
    BOTTOM: { enumerable: true, value: 16 },
    LEFT: { enumerable: true, value: 2 },
    NO_BORDER: { enumerable: true, value: 0 },
    RIGHT: { enumerable: true, value: 4 },
    TOP: { enumerable: true, value: 8 }
});
Border.prototype = Object.create(Object.prototype, {
    enableBorderSide: { value: function value(side) {
            this.toggleBorder(side, true);
        } },
    disableBorderSide: { value: function value(side) {
            this.toggleBorder(side, false);
        } },
    hasBorder: { value: function value(type) {
            return Boolean(type & this.value);
        } },
    hasBorders: { value: function value() {
            return this.hasBorder(Border.TOP) || this.hasBorder(Border.BOTTOM) || this.hasBorder(Border.LEFT) || this.hasBorder(Border.RIGHT);
        } },
    toggleBorder: { value: function value(side) {
            var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var old = this.value;
            this.value = flag ? this.value | side : this.value & ~side;
            return old !== this.value;
        } },
    toString: { value: function value() {
            return "[Border " + this.value + "]";
        } },
    valueOf: { value: function value() {
            return this.value;
        } }
});

function CardinalDirection() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var azimut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    Object.defineProperties(this, {
        _value: { value: value, writable: true },
        _name: { value: name, writable: true },
        _azimut: { value: azimut, writable: true }
    });
}
CardinalDirection.prototype = Object.create(Object.prototype, {
    azimut: { value: function value() {
            return this._azimut;
        } },
    toString: { value: function value() {
            return this._name;
        } },
    valueOf: { value: function value() {
            return this._value;
        } }
});
Object.defineProperties(CardinalDirection, {
    E: { enumerable: true, value: new CardinalDirection(Math.PI / 2, "E", 90) },
    ENE: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 8, "ENE", 67.5) },
    ESE: { enumerable: true, value: new CardinalDirection(5 * Math.PI / 8, "ESE", 112.5) },
    N: { enumerable: true, value: new CardinalDirection(0, "N", 0) },
    NE: { enumerable: true, value: new CardinalDirection(Math.PI / 4, "NE", 45) },
    NNE: { enumerable: true, value: new CardinalDirection(Math.PI / 8, "NNE", 22.5) },
    NNW: { enumerable: true, value: new CardinalDirection(15 * Math.PI / 8, "NNW", 337.5) },
    NW: { enumerable: true, value: new CardinalDirection(7 * Math.PI / 4, "NW", 315) },
    S: { enumerable: true, value: new CardinalDirection(Math.PI, "S", 180) },
    SE: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 4, "SE", 135) },
    SSE: { enumerable: true, value: new CardinalDirection(7 * Math.PI / 8, "SSE", 157.5) },
    SSW: { enumerable: true, value: new CardinalDirection(9 * Math.PI / 8, "SSW", 202.5) },
    SW: { enumerable: true, value: new CardinalDirection(5 * Math.PI / 4, "SW", 225) },
    W: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 2, "W", 270) },
    WNW: { enumerable: true, value: new CardinalDirection(13 * Math.PI / 8, "WNW", 292.5) },
    WSW: { enumerable: true, value: new CardinalDirection(11 * Math.PI / 8, "WSW", 247.5) }
});
Object.defineProperties(CardinalDirection, {
    ALL: { enumerable: true, value: [CardinalDirection.N, CardinalDirection.E, CardinalDirection.S, CardinalDirection.W, CardinalDirection.NE, CardinalDirection.SE, CardinalDirection.NW, CardinalDirection.SW, CardinalDirection.NNE, CardinalDirection.NNW, CardinalDirection.SSE, CardinalDirection.SSW, CardinalDirection.ENE, CardinalDirection.ESE, CardinalDirection.WNW, CardinalDirection.WSW] },
    DIAGONALS: { value: [CardinalDirection.NE, CardinalDirection.SE, CardinalDirection.NW, CardinalDirection.SW] },
    ORTHOGONALS: { value: [CardinalDirection.N, CardinalDirection.E, CardinalDirection.S, CardinalDirection.W] },
    isDiagonal: { value: function value(direction) {
            return CardinalDirection.DIAGONALS.indexOf(direction) > -1;
        } },
    isOrthogonal: { value: function value(direction) {
            return CardinalDirection.ORTHOGONALS.indexOf(direction) > -1;
        } }
});

function Corner() {
    var tl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var tr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var br = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var bl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    Object.defineProperties(this, {
        bl: { value: bl === true, writable: true, enumerable: true },
        br: { value: br === true, writable: true, enumerable: true },
        tl: { value: tl === true, writable: true, enumerable: true },
        tr: { value: tr === true, writable: true, enumerable: true }
    });
}
Corner.prototype = Object.create(Object.prototype, {
    clone: { value: function value() {
            return new Corner(this.tl, this.tr, this.br, this.bl);
        } },
    equals: { value: function value(o) {
            if (o === this) {
                return true;
            } else if (o instanceof Corner) {
                return this.tl === o.tl && o.tr === this.tr && o.bl === this.bl && o.br === this.br;
            } else {
                return false;
            }
        } },
    toString: { value: function value() {
            return "[Corner tl:" + this.tl + " tr:" + this.tr + " br:" + this.br + " bl:" + this.bl + "]";
        } }
});

var Direction = Object.defineProperties({}, {
  BACKWARD: { enumerable: true, value: 'backward' },
  BOTH: { enumerable: true, value: 'both' },
  DOWN: { enumerable: true, value: 'down' },
  FORWARD: { enumerable: true, value: 'forward' },
  HORIZONTAL: { enumerable: true, value: 'horizontal' },
  LEFT: { enumerable: true, value: 'left' },
  NONE: { enumerable: true, value: 'none' },
  RIGHT: { enumerable: true, value: 'right' },
  UP: { enumerable: true, value: 'up' },
  VERTICAL: { enumerable: true, value: 'vertical' }
});

var DirectionOrder = Object.defineProperties({}, {
  NORMAL: { enumerable: true, value: 'normal' },
  REVERSE: { enumerable: true, value: 'reverse' }
});

var LayoutBufferMode = Object.defineProperties({}, {
  AUTO: { enumerable: true, value: 'auto' },
  NORMAL: { enumerable: true, value: 'normal' }
});

function Dimension() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    Object.defineProperties(this, {
        height: { value: isNaN(height) ? 0 : height, writable: true },
        width: { value: isNaN(width) ? 0 : width, writable: true }
    });
}
Dimension.prototype = Object.create(Object.prototype, {
    clone: { writable: true, value: function value() {
            return new Dimension(this.width, this.height);
        } },
    copyFrom: { value: function value(source) {
            this.width = source.width;
            this.height = source.height;
            return this;
        } },
    decrease: { value: function value() {
            var dWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.width -= isNaN(dWidth) ? 0 : dWidth;
            this.height -= isNaN(dHeight) ? 0 : dHeight;
            return this;
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Dimension) {
                return o.width === this.width && o.height === this.height;
            } else {
                return false;
            }
        } },
    increase: { value: function value() {
            var dWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.width += isNaN(dWidth) ? 0 : dWidth;
            this.height += isNaN(dHeight) ? 0 : dHeight;
            return this;
        } },
    isEmpty: { writable: true, value: function value() {
            return this.width <= 0 || this.height <= 0;
        } },
    setTo: { writable: true, value: function value() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.width = width;
            this.height = height;
            return this;
        } },
    toObject: { writable: true, value: function value() {
            return { width: this.width, height: this.height };
        } },
    toString: { writable: true, value: function value() {
            return "[Dimension width:" + this.width + " height:" + this.height + "]";
        } }
});

function Vector2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    Object.defineProperties(this, {
        x: { value: isNaN(x) ? 0 : x, writable: true },
        y: { value: isNaN(y) ? 0 : y, writable: true }
    });
}
Vector2D.prototype = Object.create(Object.prototype, {
    clone: { writable: true, value: function value() {
            return new Vector2D(this.x, this.y);
        } },
    copyFrom: { writable: true, value: function value(source) {
            if (!(source instanceof Vector2D)) {
                throw TypeError(this + ' copyFrom failed, the passed-in source argument must be an Vector2D object.');
            }
            this.x = source.x;
            this.y = source.y;
            return this;
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Vector2D) {
                return o.x === this.x && o.y === this.y;
            } else {
                return false;
            }
        } },
    setTo: { writable: true, value: function value() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
        } },
    toObject: { writable: true, value: function value() {
            return { x: this.x, y: this.y };
        } },
    toString: { writable: true, value: function value() {
            return "[Vector2D x:" + this.x + " y:" + this.y + "]";
        } }
});

function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    Vector2D.call(this, x, y);
}
Point.prototype = Object.create(Vector2D.prototype, {
    angle: {
        get: function get() {
            return atan2D(this.y, this.x);
        },
        set: function set(value) {
            var len = Math.sqrt(this.x * this.x + this.y * this.y);
            this.x = len * cosD(value);
            this.y = len * sinD(value);
        }
    },
    length: {
        get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    },
    abs: { writable: true, value: function value() {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
        } },
    add: { writable: true, value: function value(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
        } },
    angleBetween: { value: function value(point) {
            return acosD(this.dot(point) / (Math.sqrt(this.x * this.x + this.y * this.y) * Math.sqrt(point.x * point.x + point.y * point.y)));
        } },
    clone: { writable: true, value: function value() {
            return new Point(this.x, this.y);
        } },
    cross: { writable: true, value: function value(point) {
            return this.x * point.y - this.y * point.x;
        } },
    dot: { writable: true, value: function value(point) {
            return this.x * point.x + this.y * point.y;
        } },
    getNormal: { value: function value() {
            return new Point(-this.y, this.x);
        } },
    getProjectionLength: { value: function value(point) {
            var len = point.dot(point);
            return len === 0 ? 0 : Math.abs(this.dot(point) / len);
        } },
    isPerpTo: { writable: true, value: function value(point) {
            return this.dot(point) === 0;
        } },
    max: { writable: true, value: function value(point) {
            return new Point(Math.max(this.x, point.x), Math.max(this.y, point.y));
        } },
    min: { writable: true, value: function value(point) {
            return new Point(Math.min(this.x, point.x), Math.min(this.y, point.y));
        } },
    negate: { writable: true, value: function value() {
            this.x = -this.x;
            this.y = -this.y;
        } },
    normalize: { writable: true, value: function value() {
            var thickness = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            if (isNaN(thickness)) {
                thickness = 1;
            }
            var l = Math.sqrt(this.x * this.x + this.y * this.y);
            if (l > 0) {
                l = thickness / l;
                this.x *= l;
                this.y *= l;
            } else {
                throw new Error(this + " normalize method failed with a zero-length vector or a illegal NaN value.");
            }
        } },
    offset: { writable: true, value: function value() {
            var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.x += isNaN(dx) ? 0 : dx;
            this.y += isNaN(dy) ? 0 : dy;
        } },
    rotate: { value: function value(angle) {
            var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var ax = 0;
            var ay = 0;
            if (anchor) {
                if (anchor instanceof Point || 'x' in anchor && 'y' in anchor) {
                    ax = isNaN(anchor.x) ? 0 : anchor.x;
                    ay = isNaN(anchor.y) ? 0 : anchor.y;
                }
            }
            var dx = this.x - ax;
            var dy = this.y - ay;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            this.x = ax + (cos * dx + sin * dy);
            this.y = ay + (cos * dy - sin * dx);
        } },
    scale: { value: function value(_value) {
            this.x *= isNaN(_value) ? 0 : _value;
            this.y *= isNaN(_value) ? 0 : _value;
        } },
    subtract: { writable: true, value: function value(point) {
            this.x -= point.x;
            this.y -= point.y;
        } },
    swap: { value: function value(point) {
            var tx = this.x;
            var ty = this.y;
            this.x = point.x;
            this.y = point.y;
            point.x = tx;
            point.y = ty;
        } },
    toString: { writable: true, value: function value() {
            return "[Point x:" + this.x + " y:" + this.y + "]";
        } }
});
Object.defineProperties(Point, {
    distance: { value: function value(p1, p2) {
            var x = p1.x - p2.x;
            var y = p1.y - p2.y;
            return Math.sqrt(x * x + y * y);
        } },
    getMiddle: { value: function value(p1, p2) {
            return new Point((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
        } },
    interpolate: { value: function value(p1, p2) {
            var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            if (isNaN(level)) {
                level = 0;
            }
            level = Math.max(Math.min(level, 1), 0);
            if (level === 0) {
                return p2;
            } else if (level === 1) {
                return p1;
            } else {
                return new Point(p2.x + level * (p1.x - p2.x), p2.y + level * (p1.y - p2.y));
            }
        } },
    polar: { value: function value(len, angle) {
            return new Point(len * Math.cos(angle), len * Math.sin(angle));
        } }
});

function Rectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    Object.defineProperties(this, {
        x: { value: isNaN(x) ? 0 : x, writable: true },
        y: { value: isNaN(y) ? 0 : y, writable: true }
    });
    Dimension.call(this, width, height);
}
Rectangle.prototype = Object.create(Dimension.prototype, {
    bottom: {
        get: function get() {
            return this.y + this.height;
        },
        set: function set(value) {
            this.height = value - this.y;
        }
    },
    bottomLeft: {
        get: function get() {
            return new Point(this.x, this.y + this.height);
        },
        set: function set(point) {
            this.width = this.width + (this.x - point.x);
            this.height = point.y - this.y;
            this.x = point.x;
        }
    },
    bottomRight: {
        get: function get() {
            return new Point(this.x + this.width, this.y + this.height);
        },
        set: function set(point) {
            this.width = point.x - this.x;
            this.height = point.y - this.y;
        }
    },
    center: {
        get: function get() {
            return new Point(this.x + this.width * 0.5, this.y + this.height * 0.5);
        },
        set: function set(point) {
            this.x = point.x - this.width * 0.5;
            this.y = point.y - this.height * 0.5;
        }
    },
    left: {
        get: function get() {
            return this.x;
        },
        set: function set(value) {
            this.width = this.width + (this.x - value);
            this.x = value;
        }
    },
    right: {
        get: function get() {
            return this.x + this.width;
        },
        set: function set(value) {
            this.width = value - this.x;
        }
    },
    size: {
        get: function get() {
            return new Point(this.width, this.height);
        },
        set: function set(point) {
            this.width = point.x;
            this.height = point.y;
        }
    },
    top: {
        get: function get() {
            return this.x + this.width;
        },
        set: function set(value) {
            this.height = this.height + (this.y - value);
            this.y = value;
        }
    },
    topLeft: {
        get: function get() {
            return new Point(this.x, this.y);
        },
        set: function set(point) {
            this.width = this.width + (this.x - point.x);
            this.height = this.height + (this.y - point.y);
            this.x = point.x;
            this.y = point.y;
        }
    },
    topRight: {
        get: function get() {
            return new Point(this.x + this.width, this.y);
        },
        set: function set(point) {
            this.width = point.x - this.x;
            this.height = this.height + (this.y - point.y);
            this.y = point.y;
        }
    },
    clone: { writable: true, value: function value() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        } },
    contains: { value: function value(x, y) {
            return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
        } },
    containsPoint: { value: function value(point) {
            return this.x <= point.x && this.x + this.width > point.x && this.y <= point.y && this.y + this.height > point.y;
        } },
    containsRect: { value: function value(rec) {
            var a = rec.x + rec.width;
            var b = rec.y + rec.height;
            var c = this.x + this.width;
            var d = this.y + this.height;
            return rec.x >= this.x && rec.x < c && rec.y >= this.y && rec.y < d && a > this.x && a <= c && b > this.y && b <= d;
        } },
    copyFrom: { value: function value(rec) {
            this.x = rec.x;
            this.y = rec.y;
            this.width = rec.width;
            this.height = rec.height;
            return this;
        } },
    equals: { writable: true, value: function value(toCompare) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var flag = strict ? toCompare instanceof Rectangle : 'x' in toCompare && 'y' in toCompare && 'width' in toCompare && 'height' in toCompare;
            if (flag) {
                return toCompare.x === this.x && toCompare.y === this.y && toCompare.width === this.width && toCompare.height === this.height;
            } else {
                return false;
            }
        } },
    inflate: { value: function value(dx, dy) {
            this.x -= dx;
            this.y -= dy;
            this.width += 2 * dx;
            this.height += 2 * dy;
            return this;
        } },
    inflatePoint: { value: function value(point) {
            this.x -= point.x;
            this.y -= point.y;
            this.width += 2 * point.x;
            this.height += 2 * point.y;
            return this;
        } },
    intersection: { value: function value(toIntersect) {
            var rec = new Rectangle();
            if (this.isEmpty() || toIntersect.isEmpty()) {
                rec.setTo();
                return rec;
            }
            rec.x = Math.max(this.x, toIntersect.x);
            rec.y = Math.max(this.y, toIntersect.y);
            rec.width = Math.min(this.x + this.width, toIntersect.x + toIntersect.width) - rec.x;
            rec.height = Math.min(this.y + this.height, toIntersect.y + toIntersect.height) - rec.y;
            if (rec.width <= 0 || rec.height <= 0) {
                rec.setTo();
            }
            return rec;
        } },
    intersects: { value: function value(toIntersect) {
            return !this.intersection(toIntersect).isEmpty();
        } },
    offset: { writable: true, value: function value() {
            var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.x += dx;
            this.y += dy;
            return this;
        } },
    offsetPoint: { writable: true, value: function value(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
        } },
    setTo: { writable: true, value: function value() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        } },
    toObject: { value: function value() {
            return { x: this.x, y: this.y, width: this.width, height: this.height };
        } },
    toString: { value: function value() {
            return "[Rectangle x:" + this.x + " y:" + this.y + " width:" + this.width + " height:" + this.height + "]";
        } },
    union: { value: function value(toUnion) {
            if (!(toUnion instanceof Rectangle)) {
                return null;
            }
            if (this.width <= 0 || this.height <= 0) {
                return toUnion.clone();
            } else if (toUnion.width <= 0 || toUnion.height <= 0) {
                return this.clone();
            } else {
                var rec = new Rectangle();
                rec.x = Math.min(this.x, toUnion.x);
                rec.y = Math.min(this.y, toUnion.y);
                rec.width = Math.max(this.x + this.width, toUnion.x + toUnion.width) - rec.x;
                rec.height = Math.max(this.y + this.height, toUnion.y + toUnion.height) - rec.y;
                return rec;
            }
        } }
});

function Layout() {
    Object.defineProperties(this, {
        renderer: { value: new Signal() },
        updater: { value: new Signal() },
        _align: { value: Align.TOP_LEFT, writable: true },
        _bufferMode: { value: LayoutBufferMode.AUTO, writable: true },
        _bounds: { value: new Rectangle() },
        _container: { value: null, writable: true }
    });
}
Layout.prototype = Object.create(Task.prototype, {
    align: {
        get: function get() {
            return this._align;
        },
        set: function set(value) {
            this._align = value;
        }
    },
    bounds: {
        get: function get() {
            return this._bounds;
        }
    },
    bufferMode: {
        get: function get() {
            return this._bufferMode;
        },
        set: function set(value) {
            if (this._bufferMode === value) {
                return;
            }
            this._bufferMode = value === LayoutBufferMode.AUTO ? LayoutBufferMode.AUTO : LayoutBufferMode.NORMAL;
        }
    },
    container: {
        get: function get() {
            return this._container;
        },
        set: function set(target) {
            this._container = target;
        }
    },
    measuredHeight: { get: function get() {
            return this._bounds.height;
        } },
    measuredWidth: { get: function get() {
            return this._bounds.width;
        } },
    initialize: { writable: true, value: function value() {
            var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        } },
    measure: { writable: true, value: function value() {} },
    render: { writable: true, value: function value() {} },
    run: { writable: true, value: function value() {
            if (this.isLocked()) {
                return;
            }
            this.notifyStarted();
            if (this._bufferMode === LayoutBufferMode.AUTO && this._container) {
                this.initialize(this._container);
            }
            this.measure();
            this.render();
            this.update();
        } },
    update: { writable: true, value: function value() {} }
});

var Orientation = Object.defineProperties({}, {
    BOTTOM_TO_TOP: { enumerable: true, value: 4 },
    NONE: { enumerable: true, value: 0 },
    LEFT_TO_RIGHT: { enumerable: true, value: 1 },
    RIGHT_TO_LEFT: { enumerable: true, value: 2 },
    TOP_TO_BOTTOM: { enumerable: true, value: 8 },
    LEFT_TO_RIGHT_BOTTOM_TO_TOP: { enumerable: true, value: 5 },
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: { enumerable: true, value: 9 },
    RIGHT_TO_LEFT_BOTTOM_TO_TOP: { enumerable: true, value: 6 },
    RIGHT_TO_LEFT_TOP_TO_BOTTOM: { enumerable: true, value: 10 }
});
Object.defineProperties(Orientation, {
    ALL: { value: [Orientation.NONE, Orientation.BOTTOM_TO_TOP, Orientation.LEFT_TO_RIGHT, Orientation.RIGHT_TO_LEFT, Orientation.TOP_TO_BOTTOM, Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP, Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM, Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP, Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM] },
    toString: { value: function value(_value) {
            var byDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";
            switch (_value) {
                case Orientation.BOTTOM_TO_TOP:
                    return "btt";
                case Orientation.LEFT_TO_RIGHT:
                    return "ltr";
                case Orientation.RIGHT_TO_LEFT:
                    return "rtl";
                case Orientation.TOP_TO_BOTTOM:
                    return "ttb";
                case Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP:
                    return "ltrbtt";
                case Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM:
                    return "ltrttb";
                case Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP:
                    return "rtlbtt";
                case Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM:
                    return "rtlttb";
                case Orientation.NONE:
                    return "none";
                default:
                    return byDefault;
            }
        } },
    validate: { value: function value(_value2) {
            return Orientation.ALL.indexOf(_value2) > -1;
        } }
});

var Position = Object.defineProperties({}, {
  ABSOLUTE: { enumerable: true, value: 'absolute' },
  FIXED: { enumerable: true, value: 'fixed' },
  NORMAL: { enumerable: true, value: 'normal' },
  RELATIVE: { enumerable: true, value: 'relative' },
  STATIC: { enumerable: true, value: 'static' }
});

var ZOrder = Object.defineProperties({}, {
  BACK: { enumerable: true, value: 0 },
  FRONT: { enumerable: true, value: 1 }
});

function RGB() {
    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    Object.defineProperties(this, {
        _blue: { writable: true, enumerable: true, value: b },
        _green: { writable: true, enumerable: true, value: g },
        _red: { writable: true, enumerable: true, value: r }
    });
}
Object.defineProperties(RGB, {
    maximum: { value: 0xFF },
    fromNumber: { value: function value(_value) {
            return new RGB().fromNumber(_value);
        } }
});
RGB.prototype = Object.create(Object.prototype, {
    b: {
        get: function get() {
            return this._blue;
        },
        set: function set(value) {
            this._blue = Math.max(Math.min(isNaN(value) ? 0 : value, 0xFF), 0);
        }
    },
    g: {
        get: function get() {
            return this._green;
        },
        set: function set(value) {
            this._green = Math.max(Math.min(isNaN(value) ? 0 : value, 0xFF), 0);
        }
    },
    luminance: {
        get: function get() {
            return 0.299 * this._red + 0.587 * this._green + 0.114 * this._blue;
        },
        set: function set(value) {
            value = normalize(value, 0, 0xFF);
            var l = 0.299 * this._red + 0.587 * this._green + 0.114 * this._blue;
            this._red = l + (this._red - l) * (1 - value);
            this._green = l + (this._green - l) * (1 - value);
            this._blue = l + (this._blue - l) * (1 - value);
        }
    },
    r: {
        get: function get() {
            return this._red;
        },
        set: function set(value) {
            this._red = Math.max(Math.min(isNaN(value) ? 0 : value, 0xFF), 0);
        }
    },
    clone: { value: function value() {
            return new RGB(this._red, this._green, this._blue);
        } },
    difference: { value: function value() {
            this._red = RGB.maximum - this._red;
            this._green = RGB.maximum - this._green;
            this._blue = RGB.maximum - this._blue;
        } },
    distance: { value: function value(rgb) {
            if (!(rgb instanceof RGB)) {
                return 0;
            }
            return Math.pow(this._red - rgb._red, 2) + Math.pow(this._green - rgb._green, 2) + Math.pow(this._blue - rgb._blue, 2);
        } },
    equals: { value: function value(o) {
            if (o === this) {
                return true;
            } else if (o instanceof RGB) {
                return this._red === o._red && o._green === this._green && o._blue === this._blue;
            } else {
                return false;
            }
        } },
    fromNumber: { value: function value(_value2) {
            var gb = void 0;
            this._red = _value2 >> 16;
            gb = _value2 ^ this._red << 16;
            this._green = gb >> 8;
            this._blue = gb ^ this._green << 8;
            return this;
        } },
    interpolate: { value: function value(to) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var p = clamp(isNaN(level) ? 1 : level, 0, 1);
            var q = 1 - p;
            return new RGB(this._red * q + to._red * p, this._green * q + to._green * p, this._blue * q + to._blue * p);
        } },
    interpolateToNumber: { value: function value(to) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var p = clamp(isNaN(level) ? 1 : level, 0, 1);
            var q = 1 - p;
            var r = this._red * q + to._red * p;
            var g = this._green * q + to._green * p;
            var b = this._blue * q + to._blue * p;
            return r << 16 | g << 8 | b;
        } },
    setTo: { value: function value() {
            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            this._red = r;
            this._green = g;
            this._blue = b;
            return this;
        } },
    toHexString: { value: function value() {
            var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#";
            var upper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            return prefix + hex(this._red, upper) + hex(this._green, upper) + hex(this._blue, upper);
        } },
    toString: { value: function value() {
            return "[RGB r:" + this._red + " g:" + this._green + " b:" + this._blue + " hex:" + this.toHexString() + "]";
        } },
    valueOf: { writable: true, value: function value() {
            return this._red << 16 | this._green << 8 | this._blue;
        } }
});

/**
 * The {@link graphics.colors} library is a set of classes and utilities for color operations.
 * @summary The {@link graphics.colors} library is a set of classes and utilities for colors operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.colors
 * @memberof graphics
 */
var colors$1 = Object.assign({
  RGB: RGB
});

var StageAspectRatio = Object.defineProperties({}, {
  ANY: { enumerable: true, value: 'any' },
  LANDSCAPE: { enumerable: true, value: 'landscape' },
  PORTRAIT: { enumerable: true, value: 'portrait' }
});

var StageDisplayState = Object.defineProperties({}, {
  FULL_SCREEN: { enumerable: true, value: 'fullScreen' },
  FULL_SCREEN_INTERACTIVE: { enumerable: true, value: 'fullScreenInteractive' },
  NORMAL: { enumerable: true, value: 'normal' }
});

var StageOrientation = Object.defineProperties({}, {
  DEFAULT: { enumerable: true, value: 'default' },
  ROTATED_LEFT: { enumerable: true, value: 'rotatedLeft' },
  ROTATED_RIGHT: { enumerable: true, value: 'rotatedRight' },
  UNKNOWN: { enumerable: true, value: 'unknown' },
  UPSIDE_DOWN: { enumerable: true, value: 'upsideDown' }
});

function Stage() {
    Object.defineProperties(this, {
        fullScreen: { value: new Signal() },
        orientationChange: { value: new Signal() },
        resize: { value: new Signal() },
        _allowFullScreen: { writable: true, value: false },
        _aspectRatio: { writable: true, value: StageAspectRatio.ANY },
        _displayState: { writable: true, value: StageDisplayState.NORMAL },
        _fullScreenExit: { writable: true, value: null },
        _fullScreenHeight: { writable: true, value: null },
        _fullScreenInteractive: { writable: true, value: false },
        _fullScreenRequest: { writable: true, value: null },
        _fullScreenWidth: { writable: true, value: null },
        _height: { writable: true, value: null },
        _launchedFromHomeScreen: { writable: true, value: false },
        _orientation: { writable: true, value: StageOrientation.UNKNOWN },
        _pixelRatio: { writable: true, value: 1 },
        _supportedOrientations: { writable: true, value: null },
        _supportsOrientationChange: { writable: true, value: false },
        _width: { writable: true, value: null }
    });
    this.__initialize__();
}
Stage.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Stage },
    allowFullScreen: { get: function get() {
            return this._allowFullScreen;
        } },
    allowFullScreenInteractive: { get: function get() {
            return this._fullScreenInteractive;
        } },
    aspectRatio: { get: function get() {
            return this._aspectRatio;
        } },
    displayState: {
        get: function get() {
            return this._displayState;
        },
        set: function set(state) {
            if (this._displayState !== state) {
                this._displayState = state;
                switch (this._displayState) {
                    case StageDisplayState.FULL_SCREEN:
                        {
                            document.documentElement[this._fullScreenRequest]();
                            break;
                        }
                    case StageDisplayState.FULL_SCREEN_INTERACTIVE:
                        {
                            document.documentElement[this._fullScreenRequest](Element.ALLOW_KEYBOARD_INPUT);
                            break;
                        }
                    case StageDisplayState.NORMAL:
                    default:
                        {
                            document[this._fullScreenExit]();
                            break;
                        }
                }
                this.notifyFullScreen(this._displayState);
            }
        }
    },
    fullScreenHeight: { get: function get() {
            return this._fullScreenHeight;
        } },
    fullScreenWidth: { get: function get() {
            return this._fullScreenWidth;
        } },
    height: { get: function get() {
            return this._height;
        } },
    launchedFromHomeScreen: { get: function get() {
            return this._launchedFromHomeScreen;
        } },
    orientation: { get: function get() {
            return this._orientation;
        } },
    pixelRatio: { get: function get() {
            return this._pixelRatio;
        } },
    width: { get: function get() {
            return this._width;
        } },
    getDeviceOrientation: { writable: true, value: function value() {
            if (window.screen.orientation && window.screen.orientation.type) {
                switch (window.screen.orientation.type) {
                    case 'portrait-secondary':
                        {
                            this._orientation = StageOrientation.UPSIDE_DOWN;
                            this._aspectRatio = StageAspectRatio.PORTRAIT;
                            break;
                        }
                    case 'landscape-primary':
                        {
                            this._orientation = StageOrientation.ROTATED_LEFT;
                            this._aspectRatio = StageAspectRatio.LANDSCAPE;
                            break;
                        }
                    case 'landscape-secondary':
                        {
                            this._orientation = StageOrientation.ROTATED_RIGHT;
                            this._aspectRatio = StageAspectRatio.LANDSCAPE;
                            break;
                        }
                    case 'portrait-primary':
                    default:
                        {
                            this._orientation = StageOrientation.DEFAULT;
                            this._aspectRatio = StageAspectRatio.PORTRAIT;
                            break;
                        }
                }
            } else if (window.orientation !== undefined) {
                switch (window.orientation) {
                    case 180:
                        {
                            this._orientation = StageOrientation.UPSIDE_DOWN;
                            this._aspectRatio = StageAspectRatio.PORTRAIT;
                            break;
                        }
                    case 90:
                        {
                            this._orientation = StageOrientation.ROTATED_LEFT;
                            this._aspectRatio = StageAspectRatio.LANDSCAPE;
                            break;
                        }
                    case -90:
                        {
                            this._orientation = StageOrientation.ROTATED_RIGHT;
                            this._aspectRatio = StageAspectRatio.LANDSCAPE;
                            break;
                        }
                    case 0:
                    default:
                        {
                            this._orientation = StageOrientation.DEFAULT;
                            this._aspectRatio = StageAspectRatio.PORTRAIT;
                        }
                }
            }
        } },
    getViewportSize: { writable: true, value: function value() {
            this._width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            this._height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            return { width: this._width, height: this._height };
        } },
    notifyFullScreen: { writable: true, value: function value() {
            this.fullScreen.emit(this._displayState, this);
        } },
    notifyOrientationChange: { writable: true, value: function value() {
            this.getDeviceOrientation();
            this.orientationChange.emit(this);
        } },
    notifyResized: { writable: true, value: function value() {
            this.getViewportSize();
            this.resize.emit(this);
        } },
    __initialize__: { writable: true, value: function value() {
            if (navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches) {
                this._launchedFromHomeScreen = true;
            }
            this._pixelRatio = window.devicePixelRatio || 1;
            this.getViewportSize();
            this._fullScreenWidth = window.screen.width;
            this._fullScreenHeight = window.screen.height;
            if (window.orientation || window.screen.orientation) {
                this._supportsOrientationChange = true;
                this.getDeviceOrientation();
            } else {
                this._supportsOrientationChange = false;
            }
            var fullscreen = ['requestFullscreen', 'requestFullScreen', 'webkitRequestFullscreen', 'webkitRequestFullScreen', 'msRequestFullscreen', 'msRequestFullScreen', 'mozRequestFullScreen', 'mozRequestFullscreen'];
            var cancel = ['cancelFullScreen', 'exitFullscreen', 'webkitCancelFullScreen', 'webkitExitFullscreen', 'msCancelFullScreen', 'msExitFullscreen', 'mozCancelFullScreen', 'mozExitFullscreen'];
            var len = fullscreen.length;
            for (var i = 0; i < len; i++) {
                if (document.documentElement[fullscreen[i]] && document[cancel[i]]) {
                    this._allowFullScreen = true;
                    this._fullScreenRequest = fullscreen[i];
                    this._fullScreenExit = cancel[i];
                    break;
                }
            }
            if (window.Element && Element.ALLOW_KEYBOARD_INPUT) {
                this._fullScreenInteractive = true;
            }
            if (this._allowFullScreen === true) {
                window.addEventListener("fullscreenchange", this.notifyFullScreen.bind(this), false);
            }
            if (this._supportsOrientationChange === true) {
                window.addEventListener("orientationchange", this.notifyOrientationChange.bind(this), false);
            }
            window.addEventListener("resize", this.notifyResized.bind(this), false);
        } }
});

/**
 * The {@link graphics.display} library is a set of classes and utilities for display Operations.
 * @summary The {@link graphics.display} library is a set of classes and utilities for Geometry Operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.display
 * @memberof graphics
 */
var display = Object.assign({
  Stage: Stage,
  StageAspectRatio: StageAspectRatio,
  StageDisplayState: StageDisplayState,
  StageOrientation: StageOrientation
});

function AspectRatio() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var lock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var verbose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    Object.defineProperties(this, {
        _aspW: { value: 0, writable: true },
        _aspH: { value: 0, writable: true },
        _gcd: { value: 0, writable: true },
        _h: { value: isInt(height) ? height : 0, writable: true },
        __lock__: { value: lock === true, writable: true },
        verbose: { value: verbose === true, writable: true },
        _w: { value: isInt(width) ? width : 0, writable: true }
    });
    this._GCD();
}
AspectRatio.prototype = Object.create(Dimension.prototype, {
    gcd: { get: function get() {
            return this._gcd;
        } },
    height: {
        get: function get() {
            return this._h;
        },
        set: function set(value) {
            this._h = isInt(value) ? value : 0;
            if (this.__lock__) {
                this._w = floor(this._h * this._aspW / this._aspH, 0);
            } else {
                this._GCD();
            }
        }
    },
    width: {
        get: function get() {
            return this._w;
        },
        set: function set(value) {
            this._w = isInt(value) ? value : 0;
            if (this.__lock__) {
                this._h = floor(this._w * this._aspH / this._aspW, 0);
            } else {
                this._GCD();
            }
        }
    },
    clone: { writable: true, value: function value() {
            return new AspectRatio(this.width, this.height, this.__lock__);
        } },
    copyFrom: { value: function value(source) {
            this.width = source.width;
            this.height = source.height;
            return this;
        } },
    isLocked: { writable: true, value: function value() {
            return this.__lock__;
        } },
    lock: { writable: true, value: function value() {
            this.__lock__ = true;
        } },
    toString: { writable: true, value: function value() {
            if (this.verbose === true) {
                return "[AspectRatio width:" + this._w + " height:" + this._h + " ratio:[" + this._aspW + ":" + this._aspH + "]]";
            } else {
                this.verbose = false;
                return this._aspW + ":" + this._aspH;
            }
        } },
    unlock: { writable: true, value: function value() {
            this.__lock__ = false;
        } },
    _GCD: { value: function value() {
            this._gcd = gcd(this._w, this._h);
            this._aspW = floor(this._w / this._gcd, 0);
            this._aspH = floor(this._h / this._gcd, 0);
            if (isNaN(this._aspW)) {
                this._aspW = 0;
            }
            if (isNaN(this._aspH)) {
                this._aspH = 0;
            }
        } }
});

function Circle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    Vector2D.call(this, x, y);
    Object.defineProperties(this, {
        _diameter: { value: 0, writable: true },
        _radius: { value: radius > 0 ? radius : 0, writable: true },
        _radiusSquared: { value: 0, writable: true }
    });
    this._diameter = 2 * this._radius;
    this._radiusSquared = this._radius * this._radius;
}
Circle.prototype = Object.create(Vector2D.prototype, {
    area: { get: function get() {
            return this._radius > 0 ? Math.PI * this._radius * this._radius : 0;
        } },
    bottom: { get: function get() {
            return this.y + this._radius;
        } },
    circumference: { get: function get() {
            return 2 * Math.PI * this._radius;
        } },
    diameter: {
        get: function get() {
            return this._diameter;
        },
        set: function set(value) {
            this._diameter = value > 0 ? value : 0;
            this._radius = this._diameter * 0.5;
            this._radiusSquared = this._radius * this._radius;
        }
    },
    left: { get: function get() {
            return this.x - this._radius;
        } },
    radius: {
        get: function get() {
            return this._radius;
        },
        set: function set(value) {
            this._radius = value > 0 ? value : 0;
            this._diameter = 2 * this._radius;
            this._radiusSquared = this._radius * this._radius;
        }
    },
    radiusSquared: { get: function get() {
            return this._radiusSquared;
        } },
    right: { get: function get() {
            return this.x + this._radius;
        } },
    top: { get: function get() {
            return this.y - this._radius;
        } },
    circumferencePoint: { value: function value(angle) {
            var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            if (!point) {
                point = new Point();
            }
            point.x = this.x + this._radius * Math.cos(angle);
            point.y = this.y + this._radius * Math.sin(angle);
            return point;
        } },
    clone: { writable: true, value: function value() {
            return new Circle(this.x, this.y, this.radius);
        } },
    contains: { writable: true, value: function value(x, y) {
            if (this._radius <= 0 || x < this.x - this._radius ||
            x > this.x + this._radius ||
            y < this.y - this._radius ||
            y > this.y + this._radius
            ) {
                    return false;
                } else {
                var dx = (this.x - x) * (this.x - x);
                var dy = (this.y - y) * (this.y - y);
                return dx + dy <= this._diameter;
            }
        } },
    copyFrom: { writable: true, value: function value(source) {
            if (!(source instanceof Circle)) {
                throw TypeError(this + ' copyFrom failed, the passed-in source argument must be an Circle object.');
            }
            this.x = source.x;
            this.y = source.y;
            this.radius = source.radius;
            return this;
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Circle) {
                return o.x === this.x && o.y === this.y && o.radius === this.radius;
            } else {
                return false;
            }
        } },
    getBounds: { writable: true, value: function value() {
            return new Rectangle(this.x - this._radius, this.y - this._radius, this._diameter, this._diameter);
        } },
    metaball: { value: function value(tx, ty) {
            return this._radiusSquared / ((this.x - tx) * (this.x - tx) + (this.y - ty) * (this.y - ty));
        } },
    setTo: { writable: true, value: function value() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
            this.radius = radius > 0 ? radius : 0;
        } },
    translate: { writable: true, value: function value(x, y) {
            this.x += x;
            this.y += y;
        } },
    toObject: { writable: true, value: function value() {
            return { x: this.x, y: this.y, radius: this.radius };
        } },
    toString: { writable: true, value: function value() {
            return "[Circle x:" + this.x + " y:" + this.y + " radius:" + this.radius + "]";
        } }
});

function ColorTransform() {
    var redMultiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var greenMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var blueMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var alphaMultiplier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var redOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var greenOffset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var blueOffset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var alphaOffset = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    Object.defineProperties(this, {
        alphaOffset: { value: isNaN(alphaOffset) ? 0 : alphaOffset, writable: true },
        blueOffset: { value: isNaN(blueOffset) ? 0 : blueOffset, writable: true },
        greenOffset: { value: isNaN(greenOffset) ? 0 : greenOffset, writable: true },
        redOffset: { value: isNaN(redOffset) ? 0 : redOffset, writable: true },
        _alphaMultiplier: { value: isNaN(alphaMultiplier) ? 0 : alphaMultiplier, writable: true },
        _blueMultiplier: { value: isNaN(blueMultiplier) ? 0 : blueMultiplier, writable: true },
        _greenMultiplier: { value: isNaN(greenMultiplier) ? 0 : greenMultiplier, writable: true },
        _redMultiplier: { value: isNaN(redMultiplier) ? 0 : redMultiplier, writable: true },
        _tint: { value: 0xFFFFFFFF, writable: true }
    });
}
ColorTransform.prototype = Object.create(Object.prototype, {
    alphaMultiplier: {
        get: function get() {
            return this._alphaMultiplier;
        },
        set: function set(value) {
            this._alphaMultiplier = value;
            this._tint = this._redMultiplier * 0xff << 0 | this._greenMultiplier * 0xff << 8 | this._blueMultiplier * 0xff << 16 | this._alphaMultiplier * 0xff << 24;
        }
    },
    blueMultiplier: {
        get: function get() {
            return this._blueMultiplier;
        },
        set: function set(value) {
            this._blueMultiplier = value;
            this._tint = this._redMultiplier * 0xff << 0 | this._greenMultiplier * 0xff << 8 | this._blueMultiplier * 0xff << 16 | this._alphaMultiplier * 0xff << 24;
        }
    },
    greenMultiplier: {
        get: function get() {
            return this._greenMultiplier;
        },
        set: function set(value) {
            this._greenMultiplier = value;
            this._tint = this._redMultiplier * 0xff << 0 | this._greenMultiplier * 0xff << 8 | this._blueMultiplier * 0xff << 16 | this._alphaMultiplier * 0xff << 24;
        }
    },
    redMultiplier: {
        get: function get() {
            return this._redMultiplier;
        },
        set: function set(value) {
            this.redMultiplier = value;
            this._tint = this._redMultiplier * 0xff << 0 | this._greenMultiplier * 0xff << 8 | this._blueMultiplier * 0xff << 16 | this._alphaMultiplier * 0xff << 24;
        }
    },
    color: {
        get: function get() {
            return this.redOffset << 16 | this.greenOffset << 8 | this.blueOffset;
        },
        set: function set(value) {
            this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
            this.redOffset = value >> 16 & 255;
            this.greenOffset = value >> 8 & 255;
            this.blueOffset = value & 255;
        }
    },
    tint: { get: function get() {
            return this._tint;
        } },
    clone: { writable: true, value: function value() {
            return new ColorTransform(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
        } },
    concat: { value: function value(color) {
            this.redMultiplier *= color.redMultiplier;
            this.greenMultiplier *= color.greenMultiplier;
            this.blueMultiplier *= color.blueMultiplier;
            this.alphaMultiplier *= color.alphaMultiplier;
            this.redOffset += color.redOffset;
            this.greenOffset += color.greenOffset;
            this.blueOffset += color.blueOffset;
            this.alphaOffset += color.alphaOffset;
        } },
    copyFrom: { value: function value(color) {
            this.redMultiplier = color.redMultiplier;
            this.greenMultiplier = color.greenMultiplier;
            this.blueMultiplier = color.blueMultiplier;
            this.alphaMultiplier = color.alphaMultiplier;
            this.redOffset = color.redOffset;
            this.greenOffset = color.greenOffset;
            this.blueOffset = color.blueOffset;
            this.alphaOffset = color.alphaOffset;
        } },
    setTo: { value: function value() {
            var redMultiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var greenMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var blueMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var alphaMultiplier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var redOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var greenOffset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
            var blueOffset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
            var alphaOffset = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
            this.redMultiplier = redMultiplier;
            this.greenMultiplier = greenMultiplier;
            this.blueMultiplier = blueMultiplier;
            this.alphaMultiplier = alphaMultiplier;
            this.redOffset = redOffset;
            this.greenOffset = greenOffset;
            this.blueOffset = blueOffset;
            this.alphaOffset = alphaOffset;
        } },
    toObject: { writable: true, value: function value() {
            var object = {
                redMultiplier: this.redMultiplier,
                greenMultiplier: this.greenMultiplier,
                blueMultiplier: this.blueMultiplier,
                alphaMultiplier: this.alphaMultiplier,
                redOffset: this.redOffset,
                greenOffset: this.greenOffset,
                blueOffset: this.blueOffset,
                alphaOffset: this.alphaOffset
            };
            return object;
        } },
    toString: { writable: true, value: function value() {
            return "[ColorTransform redMultiplier:" + this.redMultiplier + " greenMultiplier:" + this.greenMultiplier + " blueMultiplier:" + this.blueMultiplier + " alphaMultiplier:" + this.alphaMultiplier + " redOffset:" + this.redOffset + " greenOffset:" + this.greenOffset + " blueOffset:" + this.blueOffset + " alphaOffset:" + this.alphaOffset + "]";
        } }
});

function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    Object.defineProperties(this, {
        a: { value: isNaN(a) ? 0 : a, writable: true },
        b: { value: isNaN(b) ? 0 : b, writable: true },
        c: { value: isNaN(c) ? 0 : c, writable: true },
        d: { value: isNaN(d) ? 0 : d, writable: true },
        tx: { value: isNaN(tx) ? 0 : tx, writable: true },
        ty: { value: isNaN(ty) ? 0 : ty, writable: true }
    });
}
Object.defineProperties(Matrix, {
    MAGIC_GRADIENT_FACTOR: { value: 1638.4 }
});
Matrix.prototype = Object.create(Object.prototype, {
    clone: { writable: true, value: function value() {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        } },
    concat: { value: function value(matrix) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            this.a = matrix.a * a + matrix.c * b;
            this.b = matrix.b * a + matrix.d * b;
            this.c = matrix.a * c + matrix.c * d;
            this.d = matrix.b * c + matrix.d * d;
            this.tx = matrix.a * tx + matrix.c * ty + matrix.tx;
            this.ty = matrix.b * tx + matrix.d * ty + matrix.ty;
        } },
    copyFrom: { value: function value(matrix) {
            this.a = matrix.a;
            this.b = matrix.b;
            this.c = matrix.c;
            this.d = matrix.d;
            this.tx = matrix.tx;
            this.ty = matrix.ty;
        } },
    createBox: { value: function value(scaleX, scaleY) {
            var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var tx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var ty = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            if (rotation === 0) {
                this.a = this.d = 1;
                this.b = this.c = 0;
            } else {
                this.a = Math.cos(rotation);
                this.b = Math.sin(rotation);
                this.c = -this.b;
                this.d = this.a;
            }
            if (scaleX !== 1) {
                this.a *= scaleX;
                this.c *= scaleX;
            }
            if (scaleY !== 1) {
                this.b *= scaleY;
                this.d *= scaleY;
            }
            this.tx = tx;
            this.ty = ty;
        } },
    createGradientBox: { value: function value(width, height) {
            var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var tx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var ty = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            this.createBox(width / Matrix.MAGIC_GRADIENT_FACTOR, height / Matrix.MAGIC_GRADIENT_FACTOR, rotation, tx + width * 0.5, ty + height * 0.5);
        } },
    deltaTransformPoint: { value: function value(point) {
            return new Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Matrix) {
                return o.a === this.a && o.b === this.b && o.c === this.c && o.d === this.d && o.tx === this.tx && o.ty === this.ty;
            } else {
                return false;
            }
        } },
    identity: { value: function value() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        } },
    invert: { value: function value() {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var det = a * d - c * b;
            this.a = d / det;
            this.b = -b / det;
            this.c = -c / det;
            this.d = a / det;
            this.tx = -(this.a * tx + this.c * ty);
            this.ty = -(this.b * tx + this.d * ty);
        } },
    rotate: { value: function value(angle) {
            if (isNaN(angle)) {
                angle = 0;
            }
            if (angle !== 0) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var a = this.a;
                var b = this.b;
                var c = this.c;
                var d = this.d;
                var tx = this.tx;
                var ty = this.ty;
                this.a = a * cos - b * sin;
                this.b = a * sin + b * cos;
                this.c = c * cos - d * sin;
                this.d = c * sin + d * cos;
                this.tx = tx * cos - ty * sin;
                this.ty = tx * sin + ty * cos;
            }
        } },
    scale: { value: function value(sx, sy) {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        } },
    setTo: { value: function value() {
            var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        } },
    toObject: { writable: true, value: function value() {
            return { a: this.a, b: this.b, c: this.c, d: this.d, tx: this.tx, ty: this.ty };
        } },
    toString: { writable: true, value: function value() {
            return "[Matrix a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty + "]";
        } },
    transformPoint: { value: function value(point) {
            return new Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);
        } },
    translate: { value: function value(dx, dy) {
            this.tx += dx;
            this.ty += dy;
        } }
});

function Vector3D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    Vector2D.call(this, x, y);
    Object.defineProperties(this, {
        z: { value: isNaN(z) ? 0 : z, writable: true },
        w: { value: isNaN(w) ? 0 : w, writable: true }
    });
}
Vector3D.prototype = Object.create(Vector2D.prototype, {
    length: { get: function get() {
            var r = this.x * this.x + this.y * this.y + this.z * this.z;
            if (r <= 0) {
                return 0;
            }
            return Math.sqrt(r);
        } },
    lengthSquared: { get: function get() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        } },
    add: { writable: true, value: function value(vector) {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;
            return this;
        } },
    clone: { writable: true, value: function value() {
            return new Vector3D(this.x, this.y, this.z, this.w);
        } },
    copyFrom: { writable: true, value: function value(source) {
            if (!(source instanceof Vector3D)) {
                throw TypeError(this + ' copyFrom failed, the passed-in source argument must be an Vector3D object.');
            }
            this.x = source.x;
            this.y = source.y;
            this.z = source.z;
            return this;
        } },
    crossProduct: { value: function value(vector) {
            return new Vector3D(vector.y * this.z - vector.z * this.y, vector.z * this.x - vector.x * this.z, vector.x * this.y - vector.y * this.x);
        } },
    dotProduct: { writable: true, value: function value(vector) {
            return this.x * vector.x + this.y * vector.y + this.z * vector.z;
        } },
    equals: { writable: true, value: function value(o) {
            if (o instanceof Vector3D) {
                return o.x === this.x && o.y === this.y && o.z === this.z && o.w === this.w;
            } else {
                return false;
            }
        } },
    negate: { writable: true, value: function value() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        } },
    project: { writable: true, value: function value() {
            var t = 1 / this.w;
            this.x *= t;
            this.y *= t;
            this.z *= t;
            return this;
        } },
    setTo: { writable: true, value: function value() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
            this.z = isNaN(z) ? 0 : z;
        } },
    subtract: { writable: true, value: function value(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            this.z -= vector.z;
        } },
    toObject: { writable: true, value: function value() {
            return { x: this.x, y: this.y, z: this.z, w: this.w };
        } },
    toString: { writable: true, value: function value() {
            return "[Vector3D x:" + this.x + " y:" + this.y + " z:" + this.z + "]";
        } }
});
Object.defineProperties(Vector3D, {
    X_AXIS: { value: new Vector3D(1, 0, 0) },
    Y_AXIS: { value: new Vector3D(0, 1, 0) },
    Z_AXIS: { value: new Vector3D(0, 0, 1) },
    angleBetween: { value: function value(v1, v2) {
            var dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
            return Math.acos(dot / (v1.length * v2.length));
        } },
    distance: { value: function value(v1, v2) {
            var x = v1.x - v2.x;
            var y = v1.y - v2.y;
            var z = v1.z - v2.z;
            var r = x * x + y * y + z * z;
            if (r <= 0) {
                r = 0;
            }
            return Math.sqrt(r);
        } }
});

/**
 * The {@link graphics.geom} library is a set of classes and utilities for Geometry Operations.
 * @summary The {@link graphics.geom} library is a set of classes and utilities for Geometry Operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.geom
 * @memberof graphics
 */
var geom = Object.assign({
    AspectRatio: AspectRatio,
    Circle: Circle,
    ColorTransform: ColorTransform,
    Dimension: Dimension,
    Matrix: Matrix,
    Point: Point,
    Rectangle: Rectangle,
    Vector2D: Vector2D,
    Vector3D: Vector3D
});

/**
 * The {@link graphics} package is an intuitive graphics API to manipulate all display objects in your applications. Offers a lot of powerful functionality to create and work with graphics, colors and geometrics objects, all neatly wrapped up in a well designed, consistent and clean programming interface.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics
 * @version 1.0.7
 * @since 1.0.7
 */
var graphics = Object.assign({
    isDirectionable: isDirectionable,
    Align: Align,
    ArcType: ArcType,
    Border: Border,
    CardinalDirection: CardinalDirection,
    Corner: Corner,
    Direction: Direction,
    Directionable: Directionable,
    DirectionOrder: DirectionOrder,
    Layout: Layout,
    LayoutBufferMode: LayoutBufferMode,
    Orientation: Orientation,
    Position: Position,
    ZOrder: ZOrder,
    colors: colors$1,
    display: display,
    geom: geom
});

var Device = Object.defineProperties({}, {
  DESKTOP: { enumerable: true, value: "desktop" },
  MOBILE: { enumerable: true, value: "mobile" },
  TV: { enumerable: true, value: "tv" }
});

function Os() {
    Object.defineProperties(this, {
        _name: { writable: true, value: null },
        _type: { writable: true, value: null },
        _version: { writable: true, value: null }
    });
    this.__initialize__();
}
Os.prototype = Object.create(Object.prototype, {
    constructor: { writable: true, value: Os },
    name: { get: function get() {
            return this._name;
        } },
    type: { get: function get() {
            return this._type;
        } },
    version: { get: function get() {
            return this._version;
        } },
    __initialize__: { writable: true, value: function value() {
            var ua = navigator.userAgent;
            var name = "";
            var type = "";
            var version = "";
            if (/iPad/.test(ua)) {
                name = Os.IPAD;
                type = Device.MOBILE;
                if (/CPU OS ([\w\.-_]+)/.test(ua)) {
                    version = RegExp.$1;
                }
            } else if (/iPod/.test(ua)) {
                name = Os.IPOD;
                type = Device.MOBILE;
                if (/CPU iPhone OS ([\w\.-_]+)/.test(ua)) {
                    version = RegExp.$1;
                }
            } else if (/iPhone/.test(ua)) {
                name = Os.IPHONE;
                type = Device.MOBILE;
                if (/CPU iPhone OS ([\w\.-_]+)/.test(ua)) {
                    version = RegExp.$1;
                }
            } else if (/Macintosh/.test(ua)) {
                name = Os.MAC;
                type = Device.DESKTOP;
                if (/Mac OS X ([\w\.-_]+)/.test(ua)) {
                    version = RegExp.$1;
                }
            } else if (/Windows Phone ([\w\.-]+)/.test(ua)) {
                name = Os.WINDOWS;
                type = Device.MOBILE;
                version = RegExp.$1;
            } else if (/Windows ([\w\. ]+)/.test(ua)) {
                name = Os.WINDOWS;
                type = Device.DESKTOP;
                version = RegExp.$1;
            } else if (/Android ([\w\.-]+)/.test(ua)) {
                name = Os.ANDROID;
                type = Device.MOBILE;
                version = RegExp.$1;
            } else if (/Linux/.test(ua)) {
                name = Os.LINUX;
                type = Device.DESKTOP;
            }
            this._name = name;
            this._type = type;
            this._version = version;
        } }
});
Object.defineProperties(Os, {
    ANDROID: { value: 'Android', enumerable: true },
    IPAD: { value: 'iPad', enumerable: true },
    IPOD: { value: 'iPod', enumerable: true },
    IPHONE: { value: 'iPhone', enumerable: true },
    LINUX: { value: 'Linux', enumerable: true },
    MAC: { value: 'Mac', enumerable: true },
    WINDOWS: { value: 'Windows', enumerable: true },
    WINDOWS_PHONE: { value: 'Windows Phone', enumerable: true }
});

function Browser() {
    Object.defineProperties(this, {
        _name: { writable: true, value: null },
        _version: { writable: true, value: null }
    });
    this.__initialize__();
}
Browser.prototype = Object.create(Object.prototype, {
    constructor: { value: Browser },
    name: { get: function get() {
            return this._name;
        } },
    version: { get: function get() {
            return this._version;
        } },
    __initialize__: { writable: true, value: function value() {
            var os = new Os();
            var ua = navigator.userAgent;
            var name = "";
            var version = "";
            if (/Arora\/([\w\.-]+)/.test(ua)) {
                name = Browser.ARORA;
                version = RegExp.$1;
            } else if (/Edge\/([\w\.-]+)/.test(ua)) {
                name = Browser.EDGE;
                version = RegExp.$1;
            } else if (/Opera\/([\w\.-]+)/.test(ua)) {
                name = Browser.OPERA;
                version = RegExp.$1;
            } else if (/OPR\/([\w\.-]+)/.test(ua)) {
                name = Browser.OPERA;
                version = RegExp.$1;
            } else if (/Silk\/([\w\.-]+)/.test(ua)) {
                name = Browser.SILK;
                version = RegExp.$1;
            } else if (/Chrome\/([\w\.-]+)/.test(ua) && os.name !== Os.WINDOWS_PHONE) {
                name = Browser.CHROME;
                version = RegExp.$1;
            } else if (/CriOS\/([\w\.-]+)/.test(ua)) {
                name = Browser.CHROME;
                version = RegExp.$1;
            } else if (/Epiphany\/([\w\.-]+)/.test(ua)) {
                name = Browser.EPIPHANY;
                version = RegExp.$1;
            } else if (/Firefox\D+([\w\.-]+)/.test(ua)) {
                name = Browser.FIREFOX;
                version = RegExp.$1;
            } else if (/FxiOS\/([\w\.-]+)/.test(ua)) {
                name = Browser.FIREFOX;
                version = RegExp.$1;
            } else if (/AppleWebKit/.test(ua) && (os.name === Os.IPAD || os.name === Os.IPOD || os.name === Os.IPHONE)) {
                name = Browser.SAFARI;
                version = "embeded";
            } else if (/MSIE ([\w\.-]+)/.test(ua)) {
                name = Browser.IE;
                version = RegExp.$1;
            } else if (/Midori\/([\w\.-]+)/.test(ua)) {
                name = Browser.MIDORI;
                version = RegExp.$1;
            } else if (/Safari/.test(ua) && os.name !== Os.WINDOWS_PHONE) {
                name = Browser.SAFARI;
                if (/Version\/([\w\.-]+)/.test(ua)) {
                    version = RegExp.$1;
                }
            } else if (/Trident\/(\d+\.\d+)(.*)rv:([\w\.-]+)/.test(ua)) {
                name = Browser.TRIDENT;
                version = RegExp.$3;
            }
            this._name = name;
            this._version = version;
        } }
});
Object.defineProperties(Browser, {
    ARORA: { value: 'Arora', enumerable: true },
    CHROME: { value: 'Chrome', enumerable: true },
    EPIPHANY: { value: 'Epiphany', enumerable: true },
    FIREFOX: { value: 'Firefox', enumerable: true },
    IE: { value: 'ie', enumerable: true },
    MIDORI: { value: 'Midori', enumerable: true },
    OPERA: { value: 'Opera', enumerable: true },
    SAFARI: { value: 'Safari', enumerable: true },
    TRIDENT: { value: 'Trident', enumerable: true },
    EDGE: { value: 'Edge', enumerable: true },
    SILK: { value: 'Silk', enumerable: true }
});

/**
 * The {@link screens} package is .
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace screens
 * @version 1.0.7
 * @since 1.0.7
 */
var screens = Object.assign({
  Browser: Browser,
  Device: Device,
  Os: Os
});

var version = '1.0.7';
var metas = Object.defineProperties({}, {
    name: { enumerable: true, value: ucFirst('vegas-js') },
    description: { enumerable: true, value: "VEGAS JS - Opensource Framework" },
    version: { enumerable: true, value: version },
    license: { enumerable: true, value: "MPL-2.0 OR GPL-2.0+ OR LGPL-2.1+" },
    url: { enumerable: true, value: 'https://bitbucket.org/ekameleon/vegas-js' }
});
var skip = false;
function sayHello() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var link = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    if (skip) {
        return;
    }
    try {
        if (navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var args = ['\n %c %c %c ' + name + ' ' + version + ' %c %c ' + link + ' %c %c\n\n', 'background: #ff0000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'color: #F7FF3C; background: #000000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'color: #F7FF3C; background: #ff0000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'background: #ff0000; padding:5px 0;'];
            window.console.log.apply(console, args);
        } else if (window.console) {
            window.console.log(name + ' ' + version + ' - ' + link);
        }
    } catch (error) {
    }
}
function skipHello() {
    skip = true;
}
try {
    if (window) {
        window.addEventListener('load', function load() {
            window.removeEventListener("load", load, false);
            sayHello(metas.name, metas.version, metas.url);
        }, false);
    }
} catch (error) {
}

exports.version = version;
exports.metas = metas;
exports.sayHello = sayHello;
exports.skipHello = skipHello;
exports.trace = trace;
exports.core = core;
exports.system = system;
exports.graphics = graphics;
exports.screens = screens;

Object.defineProperty(exports, '__esModule', { value: true });

})));
