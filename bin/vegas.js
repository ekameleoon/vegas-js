/* VEGAS version 1.0.6 */
(function (global, factory) {
                  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
                  typeof define === 'function' && define.amd ? define(['exports'], factory) :
                  (factory((global.vegas = global.vegas || {})));
}(this, (function (exports) { 'use strict';

/* jshint -W079 */
if (!(Date.now && Date.prototype.getTime)) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

/*jshint laxbreak: true*/
/*jshint freeze: false*/
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
    // Missing in IE9-11.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
    Object.defineProperty(Function.prototype, 'name', {
        get: function get() {
            return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
        }
    });
}

if (Math.sign === undefined) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    Math.sign = function (x) {
        return x < 0 ? -1 : x > 0 ? 1 : +x;
    };
}

if (Object.assign === undefined) {
    // Missing in IE.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
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

/**
 * The global namespace (reference to the global scope of the application).
 * @name global
 * @namespace global
 * @instance
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */

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

/* jshint -W079 */
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

/* jshint -W079 */
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

/**
 * A basic trace() function based on the console.log method.
 * @static
 */

function trace(context) {
    if (console) {
        console.log(context);
    }
}

/**
 * The string expression of the current VEGAS version.
 * @static
 */

var version = '1.0.6';

var library = 'VEGAS JS';
var link = 'https://bitbucket.org/ekameleon/vegas-js';
var skip = false;

/**
 * Logs out the version and renderer information for this running instance of VEGAS JS.
 * If you don't want to see this message you can run `vegas.skipHello()` before creating your application.
 * @static
 */
function sayHello() {
    if (skip) {
        return;
    }
    try {
        if (navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var args = ['\n %c %c %c ' + library + ' ' + version + ' %c %c ' + link + ' %c %c\n\n', 'background: #ff0000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'color: #F7FF3C; background: #000000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'color: #F7FF3C; background: #ff0000; padding:5px 0;', 'background: #AA0000; padding:5px 0;', 'background: #ff0000; padding:5px 0;'];

            window.console.log.apply(console, args);
        } else if (window.console) {
            window.console.log(library + ' ' + version + ' - ' + link);
        }
    } catch (error) {
        // do nothing
    }
}

/**
 * Skips the hello message of renderers that are created after this is run.
 */
function skipHello() {
    skip = true;
}

try {
    if (window) {
        window.addEventListener('load', function load() {
            window.removeEventListener("load", load, false);
            sayHello();
        }, false);
    }
} catch (error) {
    // do nothing
}

/**
 * Dumps a string representation of any Array reference.
 * @name dumpArray
 * @memberof core
 * @function
 * @instance
 * @param {Array} value - The Array to dump.
 * @param {boolean} [prettyprint=false] boolean option to output a pretty printed string
 * @param {number} [indent=0] initial indentation
 * @param {string} [indentor=    ] initial string used for the indent.
 * @return The dump string representation of any Array reference.
 */
function dumpArray(value /*Array*/) {
    var prettyprint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var indentor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "    ";

    indent = isNaN(indent) ? 0 : indent;
    prettyprint = Boolean(prettyprint);

    if (!indentor) {
        indentor = "    ";
    }

    var source /*Array*/ = [];

    var i;
    var l /*int*/ = value.length;

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
        var spaces /*Array*/ = [];
        for (i = 0; i < indent; i++) {
            spaces.push(indentor);
        }
        var decal /*String*/ = "\n" + spaces.join("");
        return decal + "[" + decal + indentor + source.join("," + decal + indentor) + decal + "]";
    } else {
        return "[" + source.join(",") + "]";
    }
}

/**
 * Dumps a string representation of any Date reference.
 * @name dumpDate
 * @memberof core
 * @function
 * @instance
 * @param {Date} value - A Date object to dump.
 * @param {boolean} [timestamp=false] - The optional timestamp flag.
 * @return The string representation of any Date reference.
 */

function dumpDate(date /*Date*/) /*String*/
{
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

/**
 * Dumps a string representation of an object.
 * @name dumpObject
 * @memberof core
 * @function
 * @instance
 * @param {Object} value - An object to dump.
 * @param {boolean} [prettyprint=false] - The option to output a pretty printed string.
 * @param {number} [indent=0] - The initial indentation value.
 * @param {string} [indentor=    ] - The initial string used for the indent.
 * @return The string expression of the dump.
 */
function dumpObject(value) {
    var prettyprint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var indentor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "    ";

    indent = isNaN(indent) ? 0 : indent;

    prettyprint = Boolean(prettyprint);

    if (!indentor) {
        indentor = "    ";
    }

    var source /*Array*/ = [];

    for (var member /*String*/ in value) {
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

/**
 * Returns the unicode string notation of the specified numeric value.
 * @name toUnicodeNotation
 * @memberof core.numbers
 * @function
 * @param {number} num - The number to transform in a unicode string.
 * @return The unicode string notation of the specified numeric value.
 * @example
 * trace( toUnicodeNotation(  0) ) ; // "0000"
 * trace( toUnicodeNotation( 10) ) ; // "000a"
 * trace( toUnicodeNotation( 15) ) ; // "000f"
 * trace( toUnicodeNotation( 16) ) ; // "0010"
 * trace( toUnicodeNotation(255) ) ; // "00ff"
 */

function toUnicodeNotation(num) {
    var hex = num.toString(16);
    while (hex.length < 4) {
        hex = "0" + hex;
    }
    return hex;
}

/**
 * Dumps a string representation of any String value.
 * @name dumpString
 * @memberof core
 * @function
 * @instance
 * @param {string} str a String to transform.
 * @return The dump string representation of any String value.
 */
function dumpString(value /*String*/) /*String*/
{
    var code;
    var quote /*String*/ = "\"";
    var str /*String*/ = "";
    var ch /*String*/ = "";
    var pos /*int*/ = 0;
    var len /*int*/ = value.length;
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
                // backspace
                {
                    str += "\\b";
                    break;
                }
            case "\t":
                // horizontal tab
                {
                    str += "\\t";
                    break;
                }
            case "\n":
                // line feed
                {
                    str += "\\n";
                    break;
                }
            case "\x0B":
                // vertical tab /* TODO: check the VT bug */
                {
                    str += "\\v"; //str += "\\u000B" ;
                    break;
                }
            case "\f":
                // form feed
                {
                    str += "\\f";
                    break;
                }
            case "\r":
                // carriage return
                {
                    str += "\\r";
                    break;
                }
            case "\"":
                // double quote
                {
                    str += "\\\"";
                    break;
                }
            case "'":
                // single quote
                {
                    str += "\\\'";
                    break;
                }
            case "\\":
                // backslash
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

/**
 * Dumps a string representation of any object reference.
 * @name dump
 * @memberof core
 * @function
 * @instance
 * @param {*} value - Any object to dump.
 * @param {boolean} [prettyprint=false] boolean option to output a pretty printed string
 * @param {number} [indent=0] initial indentation
 * @param {string} [indentor=    ] initial string used for the indent.
 * @return The string expression of the dump.
 * @example
 * var object =
 * {
 *     name   : "vegas" ,
 *     count  : 10 ,
 *     time   : new Date() ,
 *     flag   : true ,
 *     values : [1,2,3]
 * } ;
 * trace( dump( object ) ) ;
 */
function dump(o, prettyprint /*Boolean*/, indent /*int*/, indentor /*String*/) /*String*/
{
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

/* jshint -W079 */

/* jshint -W079 */

/**
 * Indicates if the specific object is a Boolean.
 * @name isBoolean
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a Boolean.
 */

function isBoolean(object) {
  return typeof object === 'boolean' || object instanceof Boolean;
}

/**
 * Indicates if the specific object is a Number.
 * @name isNumber
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a Number.
 */

function isNumber(object) {
  return typeof object === 'number' || object instanceof Number;
}

/**
 * Indicates if the specific object is a String.
 * @name isString
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a String.
 */

function isString(object) {
  return typeof object === 'string' || object instanceof String;
}

/**
 * Determines whether the specified object exists as an element in an Array object.
 * @name contains
 * @memberof core.arrays
 * @function contains
 * @param {Array} ar - The search Array.
 * @param {*} value - The object to find in the array.
 * @return <code>true</code> if the specified object exists as an element in the array ; otherwise, <code>false</code>.
 * @example
 * var ar = [2, 3, 4] ;
 * trace( contains( ar , 3 ) ) ; // true
 * trace( contains( ar , 5 ) ) ; // false
 */

var contains = function contains(array /*Array*/, value) {
  return array instanceof Array ? array.indexOf(value) > -1 : false;
};

/**
 * Initializes a new Array with an arbitrary number of elements (index), with every element containing the passed parameter value or by default the null value.
 * @name initialize
 * @memberof core.arrays
 * @function
 * @param {number} [elements=1] - The number of elements to fill the Array.
 * @param {*} [value=null] - The value to inject in the Array.
 * @return A new Array with an arbitrary number of elements (index), with every element containing the passed parameter value or by default the null value.
 * @example
 * ar = initialize( 3 ) ;
 * trace( ar ) ; // [ null , null , null ]
 *
 * ar = initialize( 3 , 0 ) ;
 * trace( ar ) ; // [ 0 , 0 , 0 ]
 *
 * ar = initialize( 3 , true ) ;
 * trace( ar ) ; // [ true , true , true ]
 *
 * ar = initialize(  4 , "" ) ;
 * trace( ar ) ; // [ "" ,"" ,"" ,"" ]
 */

function initialize() /*Array*/
{
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

/**
 * Splices an array (removes an element) and returns either the entire array or the removed element.
 * @memberof core.arrays
 * @name pierce
 * @function
 * @param {Array} ar - The array to pierce.
 * @param {number} index - The index of the array element to remove from the array (default 0).
 * @param {boolean} flag - A boolean <code>true</code> to return a new spliced array of false to return the removed element.
 * @return The newly spliced array or the removed element in function of the flag parameter.
 * @example
 * var ar = [0,1,2,3,4,5] ;
 *
 * trace( ar ) ; // 0,1,2,3,4,5
 *
 * trace( "pierce( ar, 1 ) : " + pierce( ar, 1 ) ) ; // pierce(ar,1) : 1
 * trace( "pierce( ar, 1 ) : " + pierce( ar, 1 ) ) ; // pierce(ar,1) : 2
 *
 * trace( ar ) ; // 0,3,4,5
 *
 * trace( pierce( ar, 1 , true ) ) ; // 0,4,5
 */

function pierce(ar /*Array*/, index /*uint*/, flag /*Boolean*/) {
  index = index > 0 ? Math.abs(index) : 0;
  flag = Boolean(flag);
  var item = ar[index];
  ar.splice(index, 1);
  return flag ? ar : item;
}

/**
 * Returns a new Array who contains the specified Array elements repeated count times.
 * @name repeat
 * @memberof core.arrays
 * @function
 * @param {Array} ar - The array to repeat.
 * @param {number} count - The number of repeat.
 * @return {Array} A new Array who contains the specified Array elements repeated count times.
 * @example
 * trace( repeat( [2, 3, 4] , 0 ) ) ; // 2,3,4
 * trace( repeat( [2, 3, 4] , 3 ) ) ; // 2,3,4,2,3,4,2,3,4
 */

function repeat(ar /*Array*/, count /*uint*/) /*Array*/
{
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

/**
 * @name rotate
 * @memberof core.arrays
 * @instance
 * @function
 * @description Rotates an Array in-place. After calling this method, the element at index i will be the element previously at <strong>index (i - n) % array.length</strong>,
 * for all values of i between 0 and array.length - 1, inclusive.
 * For example, suppose list comprises [l, o, v, e]. After invoking rotate(array, 1) (or rotate(array, -3)), array will comprise [e,l,o,v].
 * @param {Array} ar - The array to rotate.
 * @param {number} [amount=1] The amount to rotate.
 * @return {Array} The rotated Array reference.
 * @example
 * var array = ["l","o","v","e"] ;
 *
 * trace( dump( rotate( array ,  1 ) ) ) ; // ["e","l","o","v"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["l","o","v","e"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["o","v","e","l"]
 * trace( dump( rotate( array ,  3 ) ) ) ; // ["v","e","l","o"]
 */

function rotate(ar /*Array*/) /*Array*/
{
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

/**
 * Shuffles an array.
 * @name shuffle
 * @memberof core.arrays
 * @function
 * @param {Array} ar - The array to shuffle.
 * @return {Array} the shuffled array.
 * @example
 * var = [0,1,2,3,4,5,6,7,8,9] ;
 * trace( ar ) ;
 * shuffle( ar ) ;
 * trace( ar ) ;
 */

function shuffle(ar /*Array*/) /*Array*/
{
    if (ar instanceof Array) {
        var item = void 0;
        var rdm = void 0;
        var tmp /*Array*/ = [];
        var len /*int*/ = ar.length;
        var index /*int*/ = len - 1;
        for (var i /*int*/ = 0; i < len; i++) {
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

/*jslint bitwise: true */
/**
 * Sorts the elements in an array according to one or more fields in the array.
 * The array should have the following characteristics:
 * <ul>
 * <li>The array is an indexed array, not an associative array.</li>
 * <li>Each element of the array holds an object with one or more properties.</li>
 * <li>All of the objects have at least one property in common, the values of which can be used to sort the array. Such a property is called a field.</li>
 * </ul>
 * @name sortOn
 * @memberof core.arrays
 * @instance
 * @function
 * @example
 * var echo = function( a )
 * {
 *     var l = a.length ;
 *     for (var i = 0; i < l; i++)
 *     {
 *         trace( ">> " + a[i].name + " :: " + a[i].num ) ;
 *     }
 * }
 *
 * trace ("---- Array") ;
 * var a =
 * [
 *     { name:"test 0" , num:6 } ,
 *     { name:"Test 1" , num:8 } ,
 *     { name:"test 2" , num:4 } ,
 *     { name:"test 3" , num:10 }
 * ] ;
 *
 * echo(a) ;
 *
 * trace ("---- sort num Array.NUMERIC | Array.DESCENDING") ;
 *
 * var r = sortOn( a , "num", Array.NUMERIC | Array.DESCENDING) ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name") ;
 *
 * sortOn( a , "name") ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name Array.CASEINSENSITIVE") ;
 *
 * sortOn( a , "name", Array.CASEINSENSITIVE) ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name Array.RETURNINDEXEDARRAY") ;
 *
 * //var result = sortOn( a , "name", Array.CASESEINSENTIVE | Array.RETURNINDEXEDARRAY) ;
 * //var result = sortOn( a , "name", Array.RETURNINDEXEDARRAY) ;
 * //trace (result) :
 *
 * var result = sortOn( a , "num", Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * var result = sortOn( a , "num", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * var result = sortOn( a , "name", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * trace ("---- sort name Array.UNIQUESORT") ;
 *
 * a.push({ name:"test 1" , num:60 } ) ;
 *
 * sortOn( a , "name", Array.UNIQUESORT ) ;
 *
 * echo(a) ;
 */

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

/**
 * In the sorting methods, this constant specifies case-insensitive sorting. You can use this constant for the options parameter in the sort() or sortOn() method.
 * <p>he value of this constant is 1.</p>
 */
Array.CASEINSENSITIVE = 1;

/**
 * In the sorting methods, this constant specifies descending sort order. You can use this constant for the options parameter in the sort() or sortOn() method.
 * <p>The value of this constant is 2.</p>
 */
Array.DESCENDING = 2;

/**
 * In the sorting methods, this constant specifies numeric (instead of character-string) sorting. Including it in the options parameter causes the sort() and sortOn() methods to sort numbers as numeric values, not as strings of numeric characters.
 * <p>Without the NUMERIC constant, sorting treats each array element as a character string and produces the results in Unicode order.</p>
 * <p>For example, given the Array of values [2005, 7, 35], if the NUMERIC constant is not included in the options parameter, the sorted Array is [2005, 35, 7], but if the NUMERIC constant is included, the sorted Array is [7, 35, 2005].</p>
 * <p>The value of this constant is 16.</p>
 */
Array.NUMERIC = 16;

/**
 * Specifies that a sort returns an indexed array as a result of calling the sort() or sortOn() method.
 * <p>You can use this constant for the options parameter in the sort() or sortOn() method. This provides preview or copy functionality by returning an array that represents the results of the sort and leaves the original array unmodified.</p>
 * <p>The value of this constant is 8.</p>
 */
Array.RETURNINDEXEDARRAY = 8;

/**
 * In the sorting methods, this constant specifies the unique sorting requirement.
 * <p>You can use this constant for the options parameter in the sort() or sortOn() method. The unique sorting option aborts the sort if any two elements or fields being sorted have identical values.</p>
 * <p>The value of this constant is 4.</p>
 */
Array.UNIQUESORT = 4;

/**
 * Splice one array into another.
 * @name spliceInto
 * @memberof core.arrays
 * @function
 * @param {array} inserted - The Array of values inserted in the Array container.
 * @param {array} container - The container modified in place.
 * @param {number} position - The position in the container to inserted the Array of chars.
 * @param {number} count - The count value to replaced values.
 * @example
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * trace( "inserted  : " + inserted  ) ;
 * trace( "container : " + container ) ;
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 0 ) : " + container ) ; // 1,2,3,4,5,6,7,8
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container, 0 , 4 ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 4 ) : " + container ) ; // 1,2,3,4
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container, 0 , 2 ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 2 ) : " + container ) ; // 1,2,3,4,7,8
 */

function spliceInto(inserted /*Array*/, container /*Array*/, position /*Number*/, count /*Number*/) {
    inserted.unshift(position, count);
    try {
        container.splice.apply(container, inserted);
    } finally {
        inserted.splice(0, 2);
    }
}

/**
 * Swaps two indexed values in a specific array representation.
 * @name swap
 * @memberof core.arrays
 * @function
 * @param {Array} ar - The Array of values to change.
 * @param {number} [from=0] The first index position to swap.
 * @param {number} [to=0] The second index position to swap.
 * @param {boolean} [clone=false] Returns a swaped clone of the passed-in array.
 * @example
 * var ar = [ 1 , 2 , 3 , 4 ] ;
 * trace( ar ) ; // 1,2,3,4
 * swap( ar , 1 , 3 ) ;
 * trace( ar ) ; // 1,4,3,2
 */

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 * Compares the two caracteres passed in argument for order.
 * @name compare
 * @memberof core.chars
 * @function
 * @param {string} charA - The first char to compare.
 * @param {string} charB - The second char to compare.
 * @return {number} <p>
 * <li>-1 if charA is "lower" than (less than, before, etc.) charB ;</li>
 * <li> 1 if charA is "higher" than (greater than, after, etc.) charB ;</li>
 * <li> 0 if charA and charB are equal.</li>
 * </p>
 */

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

/**
 * @name isAlpha
 * @function
 * @memberof core.chars
 * @description Indicates if the specified character is an alpha (A-Z or a-z) character.
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is an alpha character.
 */

function isAlpha(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z";
}

/**
 * Indicates if the specified character is an alpha (A-Z or a-z) or a digit character.
 * @name isAlphaOrDigit
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an alpha or digit character.
 * @example
 * trace( isAlphaOrDigit( "Z" ) ) ; // true
 * trace( isAlphaOrDigit( "a" ) ) ; // true
 * trace( isAlphaOrDigit( "0" ) ) ; // true
 * trace( isAlphaOrDigit( "9" ) ) ; // true
 * trace( isAlphaOrDigit( "+" ) ) ; // false
 */

function isAlphaOrDigit(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z" || "0" <= c && c <= "9";
}

/**
 * Indicates if the specified character is an ASCII character.
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is a ASCII character.
 * @memberof core.chars
 * @name isASCII
 * @function
 * @example
 * trace( isASCII( "Z" ) ) ; // true
 * trace( isASCII( "a" ) ) ; // true
 * trace( isASCII( "+" ) ) ; // true
 */

function isASCII(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return c.charCodeAt(0) <= 255;
}

/**
 * Indicates if the specified character is a digit.
 * @name isContained
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} index - The optional index to evaluate a specific character in the passed-in expression.
 * @param charset The list of characters to evaluate.
 * @return True if the specified character is a digit.
 */

function isContained(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var charset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

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

/**
 * Indicates if the specified character is a digit.
 * @name isDigit
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is a digit.
 * @example
 * trace( isDigit( "Z" ) ) ; // false
 * trace( isDigit( "+" ) ) ; // false
 * trace( isDigit( "0" ) ) ; // true
 * trace( isDigit( "9" ) ) ; // true
 */

function isDigit(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "9";
}

/**
 * Indicates if the specified character is a hexadecimal digit.
 * @name isHexDigit
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <true> if the specified character is an hexadecimal digit.
 * @example
 * trace( isHexDigit( "Z" ) ) ; // false
 * trace( isHexDigit( "+" ) ) ; // false
 * trace( isHexDigit( "0" ) ) ; // true
 * trace( isHexDigit( "1" ) ) ; // true
 * trace( isHexDigit( "2" ) ) ; // true
 * trace( isHexDigit( "9" ) ) ; // true
 * trace( isHexDigit( "A" ) ) ; // true
 * trace( isHexDigit( "F" ) ) ; // true
 */

function isHexDigit(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "9" || "A" <= c && c <= "F" || "a" <= c && c <= "f";
}

/**
 * Indicates if the specified character is a start identifier : <strong>UnicodeLetter, $, _ or the \ unicode escape sequence.</strong>
 * @name isIdentifierStart
 * @memberof core.chars
 * @function
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/Ecma-262.pdf">ECMA-262 spec 7.6 (PDF)</a>
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an identifier start character.
 */

function isIdentifierStart(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z" || "a" <= c && c <= "z" || c === "_" || c === "$";
}

/**
 * Like white space characters, line terminator characters are used to improve source text readability and to separate tokens (indivisible lexical units) from each other.
 * However, unlike white space characters, line terminators have some influence over the behaviour of the syntactic grammar.
 * In general, line terminators may occur between any two tokens, but there are a few places where they are forbidden by the syntactic grammar.
 * A line terminator cannot occur within any token, not even a string.
 * Line terminators also affect the process of automatic semicolon insertion.
 * <p>ECMAScript specification.</p>
 * @name lineTerminators
 * @memberof core.chars
 * @const
 * @type {Array}
 */

var lineTerminators = ["\n" /*LF : Line Feed*/
, "\r" /*CR : Carriage Return*/
, "\u2028" /*LS : Line Separator*/
, "\u2929" /*PS : Paragraphe Separator*/
];

/**
 * @description Indicates if the specified character is a line terminator :
 * * "\n" - u000A - LF : Line Feed
 * * "\r" - u000D - CR : Carriage Return
 * * ???  - u2028 - LS : Line Separator
 * * ???  - u2029 - PS : Paragraphe Separator
 * @name isLineTerminator
 * @memberof core.chars
 * @function
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/Ecma-262.pdf">ECMA-262 spec 7.3 (PDF)</a>
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a line terminator defines in the core.chars.lineTerminators collection.
 * @example
 * trace( isLineTerminator( "h" ) ) ; // false
 * trace( isLineTerminator( "\n" ) ) ; // true
 */
function isLineTerminator(c /*String*/) /*Boolean*/
{
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

/**
 * Indicates if the character is lowercase.
 * @name isLower
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is lowercase.
 * @example
 * trace( isLower( "a" ) ) ; // true
 * trace( isLower( "A" ) ) ; // false
 * trace( isLower( "-" ) ) ; // false
 * trace( isLower( "#" ) ) ; // false
 * trace( isLower( "1" ) ) ; // false
 */

function isLower(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "a" <= c && c <= "z";
}

/**
 * Indicates if the specified character is an octal digit. The octal numeral system, or oct for short, is the <strong>base-8</strong> number system, and uses the digits <code>0</code> to <code>7</code>.
 * @name isOctalDigit
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an octal digit.
 * @example
 * var chars =
 * [
 *     "0" , "1" , "2" , "3" , "4" ,
 *     "5" , "6" , "7" , "8" , "A" , "a" , "$"
 * ] ;
 * for( var i = 0 ; i<chars.length ; i++ )
 * {
 *     trace( chars[i] + " isOctalDigit " + isOctalDigit( chars[i] ) ) ;
 * }
 */

function isOctalDigit(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "0" <= c && c <= "7";
}

/**
 * The collection representation of all operators characters.
 * @name operators
 * @memberof core.chars
 * @const
 * @type {Array}
 */

var operators = ["*", "/", "%", "+", "-", "«", "»", ">", "<", "›", "&", "^", "|"];

/**
 * Indicates if the passed-in string value is a operator digit.
 * @name isOperator
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a operator digit.
 * @example
 * trace( isOperator( "a" ) ) ; // false
 * trace( isOperator( "+" ) ) ; // true
 */
function isOperator(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return operators.indexOf(c) > -1;
}

/**
 * The collection representation of all ASCII symbols characters.
 * @name symbols
 * @memberof core.chars
 * @const
 * @type {Array}
 */

var symbols = [" ", // The "space" unicode character
"!", // The "!" unicode character
"\"", // The quotation marks
"#", // The number sign
"$", // The "$" unicode character
"%", // The percent unicode character
"&", // The ampersand unicode character
"\'", // The apostrophe unicode character
"(", // The "(" unicode character
")", // The ")" unicode character
"*", // The asterisk closing single quotation mark, acute accent unicode character
"+", // The plus unicode character
",", // The comma unicode character
"-", // The minus (hyphen) unicode character
".", // The decimal point (period) unicode character
"/", // The slash (slant) unicode character
":", // The colon ":" unicode character
";", // The semi colon ";" unicode character
"<", // The lessThan "&lt;" unicode characte.
"=", // The equals unicode character
">", // The greaterThen "&gt;" unicode character
"?", // The questionMark "?" unicode character
"@", // The commercial at "@" unicode character
"[", // The opening bracket "[" unicode character
"\\", // The backslash (reverse slant) "\\" unicode character
"]", // The closing bracket "]" unicode character
"^", // The circumflex "^" unicode character
"_", // The underline "_" unicode character
"`", // The grave accent "`" unicode character
"{", // The opening brace "{" unicode character
"|", // The pipe (vertical line) "|" unicode character
"}", // The closing brace "}" unicode character
"~"];

/**
 * Indicates if the character is an ASCII symbol.
 * @name isSymbol
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a symbol defines in the core.chars.symbols collection.
 */
function isSymbol(c) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }

    return symbols.indexOf(c) > -1;
}

/**
 * Indicates if the specified character is a unicode character (the charcode of the character must be > 255).
 * @name isUnicode
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a unicode character.
 */

function isUnicode(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return c.charCodeAt(0) > 255;
}

/**
 * Indicates if the character is an uppercase letter.
 * @name isUpper
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is lowercase.
 * trace( isUpper( "A" ) ) ; // true
 * trace( isUpper( "B" ) ) ; // true
 * trace( isUpper( "Z" ) ) ; // true
 * trace( isUpper( "a" ) ) ; // false
 * trace( isUpper( "b" ) ) ; // false
 * trace( isUpper( "-" ) ) ; // false
 * trace( isUpper( "#" ) ) ; // false
 * trace( isUpper( "1" ) ) ; // false
 */

function isUpper(c /*String*/) /*Boolean*/
{
    var index /*uint*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (index > 0) {
        c = c.charAt(index);
    }
    return "A" <= c && c <= "Z";
}

/**
 * This collection contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zs/list.htm">http://www.fileformat.info/info/unicode/category/Zs/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zl/list.htm">http://www.fileformat.info/info/unicode/category/Zl/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/category/Zp/list.htm">http://www.fileformat.info/info/unicode/category/Zp/list.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/200b/index.htm">http://www.fileformat.info/info/unicode/char/200b/index.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/feff/index.htm">http://www.fileformat.info/info/unicode/char/feff/index.htm</a></li>
 * <li><a href="http://www.fileformat.info/info/unicode/char/2060/index.htm">http://www.fileformat.info/info/unicode/char/2060/index.htm</a></li>
 * </ul>
 * @name whiteSpaces
 * @memberof core.chars
 * @const
 * @type {Array}
 */

var whiteSpaces = ["\t" /*Horizontal tab*/
, "\n" /*Line feed or New line*/
, "\x0B" /*Vertical tab*/
, "\f" /*Formfeed*/
, "\r" /*Carriage return*/
, " " /*Space*/
, "\xA0" /*Non-breaking space*/
, "\u1680" /*Ogham space mark*/
, "\u180E" /*Mongolian vowel separator*/
, "\u2000" /*En quad*/
, "\u2001" /*Em quad*/
, "\u2002" /*En space*/
, "\u2003" /*Em space*/
, "\u2004" /*Three-per-em space*/
, "\u2005" /*Four-per-em space*/
, "\u2006" /*Six-per-em space*/
, "\u2007" /*Figure space*/
, "\u2008" /*Punctuation space*/
, "\u2009" /*Thin space*/
, "\u200A" /*Hair space*/
, "\u200B" /*Zero width space*/
, "\u2028" /*Line separator*/
, "\u2029" /*Paragraph separator*/
, "\u202F" /*Narrow no-break space*/
, "\u205F" /*Medium mathematical space*/
, "\u3000" /*Ideographic space*/
];

// TODO We maybe could also define 0xFFEF and/or 0x2060, but not completely sure of all the implication,
// 0xFFEF in byte order mark etc.

/**
 * Indicates if the character is white space.
 * @name isWhiteSpace
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a white space defines in the core.chars.whiteSpaces collection.
 * @example
 * trace( isWhiteSpace( '!' ) ) ;
 * trace( isWhiteSpace( ' ' ) ) ;
 * trace( isWhiteSpace( '\r' ) ) ;
 */
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 * The <code>backIn</code> function starts the motion by backtracking and then reversing direction and moving toward the target.
 * @name backIn
 * @memberof core.easings
 * @function backIn
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [s=1.70158] - Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
 * @return {number} The value of the interpolated property at the specified time.
 */

var backIn = function backIn(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;

    if (isNaN(s)) {
        s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

/**
 * The <code>backInOut</code> method combines the motion of the <code>backIn</code> and <code>backOut</code> methods
 * @name backInOut
 * @memberof core.easings
 * @function backInOut
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [s=1.70158] - Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>backIn</code> function starts the motion by moving towards the target, overshooting it slightly,
 * @name backOut
 * @memberof core.easings
 * @function backOut
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [s=1.70158] - Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
 * @return The value of the interpolated property at the specified time.
 */

var backOut = function backOut(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;

    if (isNaN(s)) {
        s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

/**
 * The <code>bounceOut</code> function starts the bounce motion fast and then decelerates motion as it executes.
 * @name bounceOut
 * @function bounceOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>bounceIn</code> function starts the bounce motion slowly and then accelerates motion as it executes.
 * @name bounceIn
 * @function bounceIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
var bounceIn = function bounceIn(t, b, c, d) {
  return c - bounceOut(d - t, 0, c, d) + b;
};

/**
 * The <code>bounceInOut</code> function combines the motion of the <code>bounceIn</code> and <code>bounceOut</code> functions
 * @name bounceInOut
 * @function bounceInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
var bounceInOut = function bounceInOut(t, b, c, d) {
  return t < d / 2 ? bounceIn(t * 2, 0, c, d) * 0.5 + b : bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

/**
 * The <code>circularIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name circularIn
 * @function circularIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var circularIn = function circularIn(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};

/**
 * The <code>circularInOut</code> function combines the motion of the circularIn and circularOut methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * @name circularInOut
 * @function circularInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var circularInOut = function circularInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

/**
 * The <code>circularOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * @name circularOut
 * @function circularOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var circularOut = function circularOut(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};

/**
 * The <code>cubicIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name cubicIn
 * @function cubicIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var cubicIn = function cubicIn(t, b, c, d) {
  return c * (t /= d) * t * t + b;
};

/**
 * The <code>cubicOut</code> function combines the motion of the <b>cubicIn</b> and <b>cubicOut</b> functions to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * <p>A cubic equation is based on the power of three : <code>p(t) = t &#42; t &#42; t</code>.</p>
 * @name cubicOut
 * @function cubicOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var cubicInOut = function cubicInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

/**
 * The <code>cubicOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * <p>A cubic equation is based on the power of three : <code>p(t) = t &#42; t &#42; t</code>.</p>
 * @name cubicOut
 * @function cubicOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var cubicOut = function cubicOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};

/**
 * The <code>elasticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name elasticIn
 * @function elasticIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [a=0] - Specifies the amplitude of the sine wave.
 * @param {number} [p=0] - Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>elasticInOut</code> function combines the motion of the elasticIn and elasticOut methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * @name elasticInOut
 * @function elasticInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [a=0] - Specifies the amplitude of the sine wave.
 * @param {number} [p=0] - Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>elasticOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * @name elasticOut
 * @function elasticOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [a=0] - Specifies the amplitude of the sine wave.
 * @param {number} [p=0] - Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>expoIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @name expoIn
 * @function expoIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var expoIn = function expoIn(t, b, c, d) {
  return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};

/**
 * The <code>expoInOut</code> function combines the motion of the expoIn and expoOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @name expoInOut
 * @function expoInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

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

/**
 * The <code>expoOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @name expoOut
 * @function expoOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var expoOut = function expoOut(t, b, c, d) {
  return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

/**
 * The <code>linear</code> function starts a basic and linear motion.
 * @name linear
 * @function linear
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var linear = function linear(t, b, c, d) {
  return c * t / d + b;
};

/**
 * The <code>quarticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @name quarticIn
 * @function quarticIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quarticIn = function quarticIn(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
};

/**
 * The <code>quarticInOut</code> function combines the motion of the quarticIn and quarticOut methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @name quarticInOut
 * @function quarticInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quarticInOut = function quarticInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

/**
 * The <code>quarticOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @name quarticOut
 * @function quarticOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quarticOut = function quarticOut(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

/**
 * The <code>quinticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * A quintic easing continues the upward trend, raises time to the fifth power : <code>p(t) = t &#42; t &#42; t &#42; t &#42; t</code>
 * @name quintic
 * @function quintic
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quinticIn = function quinticIn(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
};

/**
 * The <code>quinticInOut</code> function combines the motion of the quinticIn() and quinticOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * A quintic easing continues the upward trend, raises time to the fifth power : <code>p(t) = t &#42; t &#42; t &#42; t &#42; t</code>
 * @name quinticInOut
 * @function quintic
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quinticInOut = function quinticInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};

/**
 * The <code>quinticOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * A quintic easing continues the upward trend, raises time to the fifth power : <code>p(t) = t &#42; t &#42; t &#42; t &#42; t</code>
 * @name quinticOut
 * @function quinticOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var quinticOut = function quinticOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};

/**
 * The <code>regularIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name regularIn
 * @function regularIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var regularIn = function regularIn(t, b, c, d) {
  return c * (t /= d) * t + b;
};

/**
 * The <code>regularInOut</code> function combines the motion of the regularIn() and regularOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * @name regularInOut
 * @function regularInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var regularInOut = function regularInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
};

/**
 * The <code>regularOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * @name regularOut
 * @function regularOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var regularOut = function regularOut(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

/**
 * The <code>sineIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @name sineIn
 * @function sineIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var sineIn = function sineIn(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};

/**
 * The <code>sineInOut</code> function combines the motion of the sineIn() and sineOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @name sineInOut
 * @function sineInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

var sineInOut = function sineInOut(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

/**
 * The <code>sineOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @name sineOut
 * @function sineOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 * Creates a Function who execute a specific function between two others.
 * @name aop
 * @memberof core.functors
 * @function
 * @example
 * var scope = { toString : function() { return "scope" ; } } ;
 *
 * var sum = function(x, y)
 * {
 *     console.info( this + " calculating...")
 *     return x + y;
 * }
 *
 * function begin()
 * {
 *     trace("--- begin");
 * }
 *
 * function end()
 * {
 *     trace("--- end");
 * }
 *
 * var result = aop(sum, begin, end, scope)(3, 5) ;
 *
 * console.log( result ) ;
 * @param {Function} func - The function to invoke.
 * @param {Function} begin - The function to invoke before the main function.
 * @param {Function} end - The function to invoke after the main function.
 * @param {Object} scope - The scope of the function to invoke after the main function.
 * @return {Function} The new function with the aop merging.
 */

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.functors
 * @memberof core
 */
var functors = Object.assign({
  aop: aop
});

/**
 * This constant change radians to degrees : <code>180/Math.PI</code>.
 * @name RAD2DEG
 * @memberof core.maths
 * @const
 */

var RAD2DEG = 180 / Math.PI;

/**
 * Returns the inverse cosine of a slope ratio and returns its angle in degrees.
 * @name acosD
 * @memberof core.maths
 * @function
 * @param {number} ratio - A value between -1 and 1 inclusive.
 * @return the inverse cosine of a slope ratio and returns its angle in degrees.
 */
var acosD = function acosD(ratio) {
  return Math.acos(ratio) * RAD2DEG;
};

/**
 * Anti-hyperbolic cosine : <code>acoshm = ln(x-√(x^2-1))</code>
 * @name acosHm
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculate the Anti-hyperbolic cosine.
 */

var acosHm = function acosHm(x) {
  return Math.log(x - Math.sqrt(x * x - 1));
};

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshp = ln(x+√(x^2-1))
 * </pre>
 * @name acosHp
 * @memberof core.maths
 * @function
 */

var acosHp = function acosHp(x) {
  return Math.log(x + Math.sqrt(x * x - 1));
};

/**
 * Returns the angle in degrees between 2 points with this coordinates passed in argument.
 * @name angleOfLine
 * @memberof core.maths
 * @function
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @return the angle in degrees between 2 points with this coordinates passed in argument.
 */
var angleOfLine = function angleOfLine(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * RAD2DEG;
};

/**
 * Calculates the arcsine of the passed angle.
 * @name asinD
 * @memberof core.maths
 * @function
 * @param {number} ratio - A value between -1 and 1 inclusive.
 * @return the arcsine of the passeds angle in degrees.
 */
var asinD = function asinD(ratio) {
  return Math.asin(ratio) * RAD2DEG;
};

/**
 * Anti-hyperbolic sine.
 * @name asinH
 * @memberof core.maths
 * @function
 */

var asinH = function asinH(x) {
  return Math.log(x + Math.sqrt(x * x + 1));
};

/**
 * Calculates the arctangent2 of the passed angle.
 * @name atan2D
 * @memberof core.maths
 * @function
 * @param {number} y - A value representing y-axis of angle vector.
 * @param {number} x - A value representing x-axis of angle vector.
 * @return the arctangent2 of the passed angle.
 */
var atan2D = function atan2D(y, x) {
  return Math.atan2(y, x) * RAD2DEG;
};

/**
 * Calculates the arctangent of the passed angle.
 * @name atanD
 * @memberof core.maths
 * @function
 * @param {number} angle - A real number
 * @return the arctangent of the passed angle, a number between <code>-Math.PI/2</code> and <code>Math.PI/2</code> inclusive.
 */
var atanD = function atanD(angle) {
  return Math.atan(angle) * RAD2DEG;
};

/**
 * Anti-hyperbolic tangent.
 * @name atanH
 * @memberof core.maths
 * @function
 * @param {number} x - A real number
 * @return the Anti-hyperbolic tangent of the passed angle.
 */

function atanH(x) {
  return Math.log((1 + x) / (1 - x)) / 2;
}

/**
 * This constant change degrees to radians : <code>Math.PI/180</code>.
 * @name DEG2RAD
 * @memberof core.maths
 * @const
 */

var DEG2RAD = Math.PI / 180;

/**
 * Calculates the initial bearing (sometimes referred to as forward azimuth) which if followed in a straight line along a great-circle arc will take you from the start point to the end point (in degrees).
 * @name bearing
 * @memberof core.maths
 * @function
 * @example
 * var position1 = { x : 37.422045 , y : -122.084347 } ; // Google HQ
 * var position2 = { x :  37.77493 , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( bearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 323.1477743368166
 * </pre>
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The bearing in degrees from North.
 */
var bearing = function bearing(latitude1, longitude1, latitude2, longitude2) {
  latitude1 = latitude1 * DEG2RAD;
  latitude2 = latitude2 * DEG2RAD;

  var dLng = (longitude2 - longitude1) * DEG2RAD;

  var y = Math.sin(dLng) * Math.cos(latitude2);
  var x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(dLng);

  return (Math.atan2(y, x) * RAD2DEG + 360) % 360;
};

/**
 * Bounds a numeric value between 2 numbers.
 * @name clamp
 * @memberof core.maths
 * @function
 * @example
 * var n ;
 *
 * n = core.maths.clamp(4, 5, 10) ;
 * trace ("n : " + n) ; // 5
 *
 * n = core.maths.clamp(12, 5, 10) ;
 * trace ("n : " + n) ; // 10
 *
 * n = core.maths.clamp(6, 5, 10) ;
 * trace ("n : " + n) ; // 5
 *
 * n = core.maths.clamp(NaN, 5, 10) ;
 * trace ("n : " + n) ; // NaN
 * @param {number} value - The value to clamp.
 * @param {number} min - The min value of the range.
 * @param {number} max - The max value of the range.
 * @return a bound numeric value between 2 numbers.
 */

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

/**
 * Short for 'boing-like interpolation', this method will first overshoot, then waver back and forth around the end value before coming to a rest.
 * @name berp
 * @memberof core.maths
 * @function
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( berp( 0 , 100 , 0.5 ) ; // 105.1015801865505
 */
var berp = function berp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = clamp(amount, 0, 1);
    amount = (Math.sin(amount * Math.PI * (0.2 + 2.5 * amount * amount * amount)) * Math.pow(1 - amount, 2.2) + amount) * (1 + 1.2 * (1 - amount));
    return start + (end - start) * amount;
};

/**
 * Returns a value between 0 and 1 that can be used to easily make bouncing GUI items (a la OS X's Dock)
 * @name bounce
 * @memberof core.maths
 * @function
 * @example
 * trace( bounce( 0.5 ) ) ;
 * @param {number} amount - The amount to bounce a value between 0 and 1.
 * @return a value between <code>0</code> and <code>1</code> that can be used to easily make bouncing GUI items (a la OS X's Dock)
 */

var bounce = function bounce(amount) {
  return Math.abs(Math.sin(6.28 * (amount + 1) * (amount + 1)) * (1 - amount));
};

/**
 * Converts a vector in cartesian in a polar vector. Return a generic object with the properties angle and radius.
 * @name cartesianToPolar
 * @memberof core.maths
 * @function
 * @param {graphics.geom.Vector2|graphics.geom.Point|Objectj} vector - The cartesian vector to transform.
 * @param {boolean} degrees - Indicates if the angle attribute in the return polar object is in degrees or not (default this parameter is false).
 * @return a vector in cartesian in a polar vector.
 */
var cartesianToPolar = function cartesianToPolar(vector, degrees) {
  return { angle: Math.atan2(vector.y, vector.x) * (Boolean(degrees) ? RAD2DEG : 1), radius: Math.sqrt(vector.x * vector.x + vector.y * vector.y) };
};

/**
 * Rounds and returns the ceiling of the specified number or expression.
 * The ceiling of a number is the closest integer that is greater than or equal to the number.
 * @name ceil
 * @memberof core.maths
 * @function
 * @example
 * trace(ceil(4.572525153, 2)) ; 4.58
 * trace(ceil(4.572525153, -1)) ; // 5
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] the count of number after the point.
 * @return the ceil value of a number by a count of floating points.
 */

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

/**
 * Circular Lerp is like lerp but handles the wraparound from 0 to 360.
 * This is useful when interpolating eulerAngles and the object crosses the 0/360 boundary.
 * The standard Lerp function causes the object to rotate in the wrong direction and looks stupid, clerp() fixes that.
 * @name clerp
 * @memberof core.maths
 * @function
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( clerp( 0 , 180 , 0.5 ) ; // 90
 */

var clerp = function clerp(start, end, amount) {
    var max = 360;
    var half = 180; // abs((360-0)/2) == abs(max-min)/2
    var diff = end - start;
    if (diff < -half) {
        return start + (max - start + end) * amount;
    } else if (diff > half) {
        return start - (max - end + start) * amount;
    } else {
        return start + (end - start) * amount;
    }
};

/**
 * Calculates the cosine of the passed angle.
 * @name cosD
 * @memberof core.maths
 * @function
 * @param {number} angle - A value representing angle in degrees.
 * @return the cosine of the passed angle, a number between -1 and 1 inclusive.
 */
var cosD = function cosD(angle) {
  return Math.cos(angle * DEG2RAD);
};

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * @name coserp
 * @memberof core.maths
 * @function
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( coserp( 0 , 100 , 0.5 ) ; // 29.28932188134524
 */

var coserp = function coserp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = 1 - Math.cos(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

/**
 * Hyperbolic cosine.
 * @name cosH
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculate the Hyperbolic cosine.
 */

var cosH = function cosH(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};

/**
 * Converts degrees to radians.
 * @name degreesToRadians
 * @memberof core.maths
 * @function
 * @param {number} angle - Value, in degrees, to convert to radians.
 * @return The angle in radians.
 */
var degreesToRadians = function degreesToRadians(angle) {
  return angle * DEG2RAD;
};

/**
 * Calculates the distance between 2 points.
 * @name distance
 * @memberof core.maths
 * @function
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @return the length between 2 points.
 */

var distance = function distance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns the distance between 2 points with the coordinates of the 2 points.
 * @name distanceByObject
 * @memberof core.maths
 * @function
 * @param {graphics.geom.Vector2|graphics.geom.Point|Object} p1 the first point to determinate the distance (defines with the x and y coordinates).
 * @param {graphics.geom.Vector2|graphics.geom.Point|Object} p2 the second point to determinate the distance (defines with the x and y coordinates).
 * @return the length between 2 points.
 */

function distanceByObject(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * This constant defines the radius of the earth in meter : <code>6371 km</code>.
 * @name EARTH_RADIUS_IN_METERS
 * @memberof core.maths
 * @const
 */

var EARTH_RADIUS_IN_METERS = 6371000;

/**
 * Represents the smallest positive Single value greater than zero, <code>EPSILON=0.000000001</code>.
 * @name EPSILON
 * @memberof core.maths
 * @const
 */

var EPSILON = 0.000000001;

/**
 * Calculates with the fibonacci sequence the value with a specific level.
 * By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.
 * @name fibonacci
 * @memberof core.maths
 * @function
 */

var fibonacci = function fibonacci(value) {
    var t;
    var j;
    var i = 1;
    for (var k = 1; k <= value; k++) {
        t = i + j;
        i = j;
        j = t;
    }
    return j;
};

/**
 * Calculates the final bearing from a specific points to a supplied point, in degrees. For final bearing, simply take the initial bearing from the end point to the start point and reverse it (using θ = (θ+180) % 360).
 * @name finalBearing
 * @memberof core.maths
 * @function
 * @example
 * var position1 = new Point( 37.422045 , -122.084347 ) ; // Google HQ
 * var position2 = new Point( 37.77493  , -122.419416 ) ; // San Francisco, CA
 * trace( finalBearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 143.1477743368166
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The bearing in degrees from North.
 */
var finalBearing = function finalBearing(latitude1, longitude1, latitude2, longitude2) {
  latitude1 = latitude1 * DEG2RAD;
  latitude2 = latitude2 * DEG2RAD;

  var dLng = (longitude2 - longitude1) * DEG2RAD;

  var y = Math.sin(dLng) * Math.cos(latitude2);
  var x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(dLng);

  return (Math.atan2(y, x) * RAD2DEG + 180) % 360;
};

/**
 * Fixs an angle in degrees between 0 and 360 degrees.
 * @name fixAngle
 * @memberof core.maths
 * @function
 * @param {number} angle - The passed angle value.
 * @return an angle fixed between 0 and 360 degrees.
 */

function fixAngle(angle) {
    if (isNaN(angle)) {
        angle = 0;
    }

    angle %= 360;

    return angle < 0 ? angle + 360 : angle;
}

/**
 * Rounds and returns a number by a count of floating points.
 * @name floor
 * @memberof core.maths
 * @function
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] the count of number after the point.
 * @return the floor value of a number by a count of floating points.
 * @example
 * trace(floor(4.572525153, 2)) ; // 4.57
 * trace(floor(4.572525153, -1)) ; // 4
 */

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

/**
 * Returns the greatest common divisor with the Euclidean algorithm.
 * @name floor
 * @memberof core.maths
 * @function
 * @param {number} i1 - The first integer value.
 * @param {number} i2 - The second integer value.
 * @return the greatest common divisor with the Euclidean algorithm.
 * @example
 * trace("gcd(320,240) : " + gcd(320,240) ) ; // gcd(320,240) : 80
 */

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

/**
 * The haversine formula is an equation important in navigation, giving great-circle distances between two points on a sphere from their longitudes and latitudes.
 * This algorithm is way faster than the <a href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae">Vincenty Formula</a> but less accurate.
 * @name haversine
 * @memberof core.maths
 * @function
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @param {number} [radius={@link core.maths.EARTH_RADIUS_IN_METERS}] - The optional radius of the sphere (by default the function use the earth's radius, mean radius = 6,371km) .
 * @return The distance between two points on a sphere from their longitudes and latitudes.
 * @see core.maths.EARTH_RADIUS_IN_METERS
 * @example
 * var position1 = { x : 37.422045 , y : -122.084347  } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 * trace( haversine( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 103.007 meters
 */
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

/**
 * This method will interpolate while easing in and out at the limits.
 * @name hermite
 * @memberof core.maths
 * @function
 * @param {number} start the begining value.
 * @param {number} end The ending value.
 * @param {number} amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( hermite( 0 , 100 , 0.5 ) ; // 50
 */

var hermite = function hermite(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = amount * amount * (3 - 2 * amount); // lerp(3-2*amount)
    return (1 - amount) * start + amount * end;
};

/**
 * Computes square root of sum of two arguments (Computes hypotenuse).
 * <p>A hypotenuse is the longest side of a right triangle (Right-angled triangle in British English), the side opposite the right angle. The length of the hypotenuse of a right triangle can be found using the Pythagorean theorem, which states that the square of the length of the hypotenuse equals the sum of the square of the lengths of the other two sides.</p>
 * @name hypothenuse
 * @memberof core.maths
 * @function
 * @param {number} x - Specifies the length of first side
 * @param {number} y - Specifies the length of second side
 * @return The length of the hypotenuse
 * @example
 * trace( hypothenuse(5,12) ) ; // 13
 */

var hypothenuse = function hypothenuse(x, y) {
  return Math.sqrt(x * x + y * y);
};

/**
 * With a number value and a range this method returns the actual value for the interpolated value in that range.
 * @name interpolate
 * @memberof core.maths
 * @function
 * @param {number} value The normal number value to interpolate (value between min and max).
 * @param {number} min The minimum value of the interpolation.
 * @param {number} max The maximum value of the interpolation.
 * @return the actual value for the interpolated value in that range.
 * @example
 * trace( interpolate( 0.5 , 0 , 100 ) ) ; // 50
 */

var interpolate = function interpolate(value, min, max) {
  return min + (max - min) * value;
};

/**
 * Indicates if an integer that is "evenly divisible" by 2.
 * @name isEven
 * @memberof core.maths
 * @function
 * @param {number} value - The value to check.
 * @return <code>true</code> if the passed-in value is even.
 * @example
 * trace( isEven(0) ) ; // true
 * trace( isEven(2) ) ; // true
 * trace( isEven(3) ) ; // false
 */

var isEven = function isEven(value) {
  return value % 2 === 0;
};

/**
 * Indicates if an integer that is not "evenly divisible" by 2.
 * @name isOdd
 * @memberof core.maths
 * @function
 * @param {number} value - The value to check.
 * @return <code>true</code> if the passed-in value is odd.
 * @example
 * trace( isOdd(0) ) ; // false
 * trace( isOdd(2) ) ; // false
 * trace( isOdd(3) ) ; // true
 * trace( isOdd(5) ) ; // true
 */

var isOdd = function isOdd(value) {
  return value % 2 !== 0;
};

/**
* This constant is the Euler-Mascheroni constant (lambda or C) :
* <p>
* <pre>
* ( n )
* lim( sigma 1/k - ln(n) )
* n->oo ( k=1 )
* </pre>
* </p>
 * @name LAMBDA
 * @memberof core.maths
 * @const
*/

var LAMBDA = 0.57721566490143;

/**
 * Calculates a number between two numbers at a specific increment.
 * The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 * <p>Lerp is an abbreviation for linear interpolation, which can also be used as a verb (Raymond 2003).</p>
 * <p>Linear interpolation is a method of curve fitting using linear polynomials.
 * It is heavily employed in mathematics (particularly numerical analysis), and numerous applications including computer graphics. It is a simple form of interpolation.</p>
 * @name lerp
 * @memberof core.maths
 * @function
 * @param {number} start the begining value.
 * @param {number} end The ending value.
 * @param {number} amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( lerp( 0 , 100 , 0.5 ) ; // 50
 */

var lerp = function lerp(start, end, amount) {
    if (start === end) {
        return start;
    }
    return (1 - amount) * start + amount * end;
};

/**
 * Calculates the log10 of the specified value.
 * @name log10
 * @memberof core.maths
 * @function
 * @param {number} value - The value to calculate.
 * @return The log10 of the specified value.
 * @example
 * trace( log10(10) ) ; // 1
 */

function log10(value) {
  return Math.log(value) / Math.LN10;
}

/**
 * Calculates the logN of the specified value.
 * @name log10
 * @memberof core.maths
 * @function
 * @param {number} value - The value to calculate.
 * @param {number} base - The base to calculate the log of the value.
 * @return The logN of the specified value.
 * @example
 * trace( logN(10,10) ) ; // 1
 */

function logN(value, base) {
  return Math.log(value) / Math.log(base);
}

/**
 * Takes a value within a given range and converts it to a number between 0 and 1.
 * Actually it can be outside that range if the original value is outside its range.
 * @name normalize
 * @memberof core.maths
 * @function
 * @param {number} value The normal number value to interpolate (value between min and max).
 * @param {number} min The minimum value of the interpolation.
 * @param {number} max The maximum value of the interpolation.
 * @return The normalized value between 0 and 1.
 * @example
 * trace( normalize( 10, 0 , 100 ) ) ; // 0.1
 */

var normalize = function normalize(value, minimum, maximum) {
  return (value - minimum) / (maximum - minimum);
};

/**
 * Takes a value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * @name map
 * @memberof core.maths
 * @function
 * @param {number} value - The number value to map.
 * @param {number} min1 - The minimum value of the first range of the value.
 * @param {number} max1 - The maximum value of the first range of the value.
 * @param {number} min2 - The minimum value of the second range of the value.
 * @param {number} max2 - The maximum value of the second range of the value.
 * @return value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * @example
 * trace( map( 10,  0, 100, 20, 80  ) ) ; // 26
 * trace( map( 26, 20,  80,  0, 100 ) ) ; // 10
 */
var map = function map(value, min1, max1, min2, max2) {
  return interpolate(normalize(value, min1, max1), min2, max2);
};

/**
 * Calculates the midpoint along a great circle path between the two points.
 * @see <a href="http://mathforum.org/library/drmath/view/51822.html">"Latitude and Longitude of a Point Halfway between Two Points"</a> question to calculate the derivation.</p>
 * @name midPoint
 * @memberof core.maths
 * @function
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The midpoint (Object) along a great circle path between the two points.
 * @example
 * var pos1 = { x : 34.122222   , y : 118.4111111 } ; // LA
 * var pos2 = { x : 40.66972222 , y : 73.94388889 } ; // NYC
 * var result = midPoint( pos1.x , pos1.y , pos2.x , pos2.y )  ;
 * trace( "midpt latitude:" + result.x + " longitude:" + result.y ) ;// midpt latitude:39.547078603870254 longitude:97.2015133919303
 */
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

/**
 * This constant change mile distance to meter : <code>1 mile = 1609 m</code>.
 * @name MILE_TO_METER
 * @memberof core.maths
 * @const
 */

var MILE_TO_METER = 1609;

/**
 * The % operator in ECMASCript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend.
 * For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7.
 * This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list.
 * @name modulo
 * @memberof core.maths
 * @function
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @return The <code>a % b</code> where the result is between <code>0</code> and <code>b</code> (either <code>0 <= x < b or b < x <= 0</code>, depending on the sign of b).
 * @example
 * trace( modulo(-1,8) ) ; // 7
 */

function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r; // If r and b differ in sign, add b to wrap the result to the correct sign.
}

/**
 * Evaluates whether the two values are equal to each other, within a certain tolerance to adjust for floating pount errors.
 * @name nearlyEquals
 * @memberof core.maths
 * @function
 * @param {number} value1 - A number to evaluate.
 * @param {number} value2 - A number to evaluate.
 * @param {number} [tolerance=0.000001] - An optional tolerance range. If specified, should be greater than 0.
 * @return <code>true</code> if value1 and value2 are nearly equal.
 */

var nearlyEquals = function nearlyEquals(value1, value2) {
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.000001;

    if (isNaN(tolerance)) {
        tolerance = 0.000001;
    } else if (tolerance < 0) {
        tolerance = 0;
    }
    return Math.abs(value1 - value2) <= tolerance;
};

/**
 * Calculates a percentage value.
 * @name percentage
 * @memberof core.maths
 * @function
 * @param {number} value - The current value to calculates.
 * @param {number} maximum - The max value.
 * @return a percentage value or NaN.
 * @example
 * trace( percentage( 50 , 100 ) + "%" ) ; // 50%
 * trace( percentage( 68 , 425 ) + "%" ) ; // 16%
  */

var percentage = function percentage(value, maximum) {
  var p = value / maximum * 100;
  return isNaN(p) || !isFinite(p) ? NaN : p;
};

/**
 * The <b>golden ratio</b> (phi) : <code>( 1 + Math.sqrt(5) ) / 2</code>.
 * @name PHI
 * @memberof core.maths
 * @const
 */

var PHI = 1.61803398874989;

/**
 * Converts a Polar object in a cartesian vector.
 * @name polarToCartesian
 * @memberof core.maths
 * @function
 * @param {Object} polar The polar generic object to transform (with the attributes angle and radius).
 * @param {number} polar.angle The angle of the polar coordinates.
 * @param {number} polar.radius The radius of the polar coordinates.
 * @param {number} degrees Indicates if the angle of the polar object is in degrees or radians.
 * @return A generic Object with the cartesian representation of the specified Polar object (with the coordinates x and y).
 */
var polarToCartesian = function polarToCartesian(vector, degrees /*Boolean*/) {
    var angle = vector.angle;
    var radius = vector.radius;
    if (degrees) {
        angle *= DEG2RAD;
    }
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

/**
 * Replace the passed-in Number value, if the value is NaN the return value is the default value in second argument.
 * @name replaceNaN
 * @memberof core.maths
 * @function
 * @param {number} value - The Number value to replace, if this value is NaN the value is changed.
 * @param {number} [defaultValue=0] The default value to apply over the specified value if this value is NaN (default 0).
 * @return The replaced Number value.
 */

var replaceNaN = function replaceNaN(value) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (isNaN(defaultValue)) {
        defaultValue = 0;
    }
    return isNaN(value) ? defaultValue : value;
};

/**
 * Rounds and returns a number by a count of floating points.
 * @name replaceNaN
 * @memberof core.maths
 * @function
 * @example
 * var n ;
 * n = core.maths.round(4.572525153, 2) ;
 * trace ("n : " + n) ; // 4.57
 *
 * n = core.maths.round(4.572525153, -1) ;
 * trace ("n : " + n) ; // 5
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] - The count of number after the point.
 * @return The round of a number by a count of floating points.
 */

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

/**
 * Returns 1 if the value is positive or -1.
 * @name sign
 * @memberof core.maths
 * @function
 * @example
 * var n ;
 *
 * n = core.maths.sign( -150 ) ;
 * trace ("n : " + n) ; // -1
 *
 * n = core.maths.sign( 200 ) ;
 * trace ("n : " + n) ; // 1
 *
 * n = core.maths.sign( 0 ) ;
 * trace ("n : " + n) ; // 1
 * @param {number} n - The number to defined this sign.
 * @return <code>1</code> if the value is positive or <code>-1</code>.
 * @throws Error if the passed-in value is <code>NaN</code>.
 */

var sign = function sign(n) {
    if (isNaN(n)) {
        throw new Error("sign failed, the passed-in value not must be NaN.");
    }
    return n < 0 ? -1 : 1;
};

/**
 * Calculates the sine of the passed angle.
 * @name sinD
 * @memberof core.maths
 * @function
 * @param {number} angle - A value in degrees.
 * @return The sine of the passed angle, a number between <code>-1</code> and <code>1</code> inclusive.
 */
var sinD = function sinD(angle) {
  return Math.sin(angle * DEG2RAD);
};

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * @name sinerp
 * @memberof core.maths
 * @function
 * @param {number} start the begining value.
 * @param {number} end The ending value.
 * @param {number} amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( sinerp( 0 , 100 , 0.5 ) ; // 70.71067811865474
 */

var sinerp = function sinerp(start, end, amount) {
    if (start === end) {
        return start;
    }
    amount = Math.sin(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

/**
 * Calculates the Hyperbolic sine.
 * @name sinH
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculates.
* @return The Hyperbolic sine of the specified value.
 */

var sinH = function sinH(x) {
  return (Math.exp(x) - Math.exp(-x)) * 0.5;
};

/**
 * Calculates the tangent of the passed angle.
 * @name tanD
 * @memberof core.maths
 * @function
 * @param {number} angle - The angle in degrees.
 * @return The tangent of the passed angle.
 */
var tanD = function tanD(angle) {
  return Math.tan(angle * DEG2RAD);
};

/**
 * Calculates the Hyperbolic tangent.
 * @name tanH
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculates.
 * @return The Hyperbolic tangent of the specified value.
 */
var tanH = function tanH(x) {
  return sinH(x) / cosH(x);
};

/**
 * Calculates geodesic distance in meter between two points specified by latitude and longitude (in numeric degrees)
 * using the Vincenty inverse formula for ellipsoids. This algorithm is slow but very accurate (down to 0.5 mm).
 * <p>See the original reference about this formula : <a href="http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf">Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations</a>.</p>
 * @name vincenty
 * @memberof core.maths
 * @function
 * @example
 * var position1 = { x : 37.422045,  y : -122.084347 } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( vincenty( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 087.066 meters
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The distance between two points on a sphere from their longitudes and latitudes.
 */
function vincenty(latitude1, longitude1, latitude2, longitude2) /*Number*/
{
    // World Geodetic System (WGS-84 ellipsoid parameters)
    var a = 6378137;
    var b = 6356752.3142;
    var f = 1 / 298.257223563;

    // Algorithm
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
            return 0; // co-incident points
        }

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;

        sigma = Math.atan2(sinSigma, cosSigma);

        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;

        cosSqAlpha = 1 - sinAlpha * sinAlpha;

        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

        if (isNaN(cos2SigmaM)) {
            cos2SigmaM = 0; // equatorial line: cosSqAlpha=0 (§6)
        }

        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));

        lambdaP = lambda;

        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (iterLimit === 0) {
        return NaN; // formula failed to converge
    }

    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    var s = b * A * (sigma - deltaSigma);

    s = Number(s.toFixed(3)); // round to 1mm precision

    return s;
}

/**
 * The {@link core.maths} package is a modular <b>JavaScript</b> library that provides extra <code>mathematics</code> methods and implementations.
 * @summary The {@link core.maths} package is a modular <b>JavaScript</b> library that provides extra <code>mathematics</code> methods and implementations.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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
    distance: distance,
    distanceByObject: distanceByObject,
    EARTH_RADIUS_IN_METERS: EARTH_RADIUS_IN_METERS,
    EPSILON: EPSILON,
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
    vincenty: vincenty
});

/**
 * The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @summary The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
var numbers = Object.assign({
  toUnicodeNotation: toUnicodeNotation
});

/**
 * Executes a function on each item in the object. Each invocation of iterator is called with three arguments: (value, key, ref).
 * @name forEach
 * @memberof core.objects
 * @function
 * @param {Object} object The reference of the object to enumerate.
 * @param {Function} callback The function to run on each item in the object. This function can contain a simple command (for example, a trace() statement) or a more complex operation, and is invoked with three arguments; the value of an item, the key of an item, and the object reference : <code>function callback(item:*, key:*, ref:Object):void;</code>.
 * @param {Object} [context=null] An object to use as this for the callback function.
 * @param {*} [breaker=null] value to stop the enumeration. If this argument is null the behaviour is forgotten.
 * @example
 * var object = { one:1 , two:2 , three:3 , four:4 , five:5 } ;
 *
 * var action = function( value , key , ref )
 * {
 *     trace( "key:" + key + " value:" + value ) ;
 *     return value ;
 * }
 *
 * forEach( object , action ) ;
 *
 * trace( "----" ) ;
 *
 * forEach( object , action, null, 3 ) ;
 *
 * trace( "----" ) ;
 *
 * forEach( [1,2,3,4] , action ) ; // use the Array.forEach method over Array objects.
 */

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

/**
 * Copies an array or vector from the specified source (array or vector), beginning at the specified position, to the specified position of the destination object.
 * A subsequence of array components are copied from the source referenced by src to the destination referenced by dest.
 * The number of components copied is equal to the length argument. The components at positions srcPos through srcPos+length-1 in the source array are copied into positions
 * destPos through destPos+length-1, respectively, of the destination object. If the src and dest arguments refer to the same array object, then the copying is performed as
 * if the components at positions srcPos through srcPos+length-1 were first copied to a temporary object with length components and then the contents of the temporary array were
 * copied into positions destPos through destPos+length-1 of the destination array.
 * <p>If src is null, then a ArgumentError is thrown and the destination array is not modified.</p>
 * <p>If dest is null, then dest is the src reference.</p>
 * @name fuse
 * @memberof core.objects
 * @function
 * @param {Array|Object} src - The source array or vector to copy.
 * @param {number} srcPos - The starting position in the source array.
 * @param {Array|Object} dest - The destination array or vector.
 * @param {number} destPos - The starting position in the destination data.
 * @param {number} length - The number of array elements to be copied.
 * @return The copy reference.
 * @example
 * var ar1 = [1,2,3,4] ;
 * var ar2 = [5,6,7,8] ;
 * fuse( ar1 , 2 , ar2 , 2 , 2 ) ;
 * trace( dump( ar2 ) ) ; // [5,6,3,4]
 */

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

/**
 * Returns all the public members of an object, either by key or by value.
 * @name members
 * @memberof core.objects
 * @function
 * @param {object} o The target object to enumerate.
 * @param {boolean} [byValue=false] The optional flag indicates if the function return an Array of strings (keys) or of values.
 * @return An array containing all the string key names or values (if the #byValue argument is true). The method returns null if no members are finding.
 * @example
 * var o = { a : 5 , b : 6 } ;
 * trace( core.dump( core.objects.members( o ) ) ) ; // [a,b]
 * trace( core.dump( core.objects.members( o , true ) ) ) ; // [5,6]
 */

function members(o) {
    var byValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    byValue = Boolean(byValue === true);
    var members /*Array*/ = [];
    if (byValue) {
        for (var prop /*String*/ in o) {
            if (o.hasOwnProperty(prop)) {
                members.push(o[prop]);
            }
        }
    } else {
        for (var member /*String*/ in o) {
            if (o.hasOwnProperty(member)) {
                members.push(member);
            }
        }
    }
    return members.length > 0 ? members : null;
}

/**
 * Merging enumerable properties from a specific Object to a target Object.
 * @name merge
 * @memberof core.objects
 * @function
 * @param {Object} target - The target object to merge.
 * @param {Object} source - The source object reference.
 * @param {boolean} [overwrite=true] - The optional flag to indicates if the merge function can override the already existing properties in the target reference (default true).
 * @return The merged target reference.
 * @example
 * var target = { a : 5 , b : 6 } ;
 * var from   = { a : 1 , b : 2 , c: 3 } ;
 * trace( dump( merge( target , from ) ) ) ; // {a:1,b:2,c:3}
 */

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/*jslint bitwise: true */
/**
 * Generates a version 4 (randomly generated number) UUID as per RFC 4122.
 * @name generateUUID
 * @memberof core.random
 * @function
 * @return The String expression of the UUID version 4.
 * @example
 * trace( generateUUID() ) ; // 1ba7bbbd-783c-44db-9fc7-3ca772c6a8d2
 */

function generateUUID() {
  var d = new Date().getTime();
  return pattern.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

/**
 * The uuid pattern.
 */
var pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.random
 * @memberof core
 */
var random = Object.assign({
  generateUUID: generateUUID
});

/**
 * Returns the instance of a public definition in a specific <code>domain</code> object.
 * @name invoke
 * @memberof core.reflect
 * @function
 * @param {string} name - The name of the full qualified path of a definition (instance, class, etc).
 * @param {Object} [domain] - A global object or namespace who contains the definition object. By default, the function use the <code>global</code> scope object where to find the reference.
 * @example
 * var definition = core.reflect.getDefinitionByName('system.signals.Signal') ;
 * trace( definition ) ;
 */
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
                //
            }
        }
    }
    return undefined;
}

/*jslint bitwise: true */
/**
 * Invokes dynamically a class constructor.
 * @name invoke
 * @memberof core.reflect
 * @function
 * @param {function} c - The constructor (Function or Class) to invoke.
 * @param {array} [args] - the array of all arguments to pass to the constructor (max 32).
 * @return an instance of the class, or null if class can not construct.
 * @example
 * var ar = invoke( Array , [1,2,3]) ;
 * trace( dump( ar ) ) ; // 1,2,3
 */

function invoke(c) {
        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (!(c instanceof Function)) {
                return null;
        }

        if (a === null || !(a instanceof Array) || a.length === 0) {
                return new c();
        }

        // Note: if we ever need more than 32 args will use CC for that special case

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.reflect
 * @memberof core
 */
var reflect = Object.assign({
  getDefinitionByName: getDefinitionByName,
  invoke: invoke
});

/**
 * Converts a hyphenated string to a camelcased string.
 * @name between
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @return The new extracted string.
 * @example
 * trace( between("<b>hello</b>" , "<b>" , "</b>" ) ) ; // hello
 * trace( between("hello {world}" , "{" , "}" ) ) ; // world
 */

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

/**
 * Converts a hyphenated string to a camelcased string.
 * @name camelCase
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to camelcase.
 * @return The camelcased string.
 * @example
 * trace( camelCase("hello-world" ) ) ; // helloWorld
 */

function camelCase(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/-\D/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
}

/**
 * Converts the first letter of each word in a string to uppercase.
 * @name capitalize
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @return The capitalized string.
 * @example
 * trace( capitalize( "hello world" ) ) ; // Hello World
 */

function capitalize(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
    });
}

/**
 * Returns the center string representation of the specified string value.
 * @name center
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to center.
 * @param {number} [size=0] The number of character to center the String expression.
 * @param {string} [separator= ] The optional separator character use before and after the String to center.
 * @return The center expression of the specified string.
 * @example
 * trace( '<' + center("hello world", 0)  + '>' ) ; // <hello world>
 * trace( '<' + center("hello world", 20) + '>' ) ; // <    hello world     >
 * trace( '<' + center("hello world", 20, "_" ) + '>'  )  ; // <____hello world_____>
 */

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

/**
 * This array contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li>http://www.fileformat.info/info/unicode/category/Zs/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zl/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zp/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/200b/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/feff/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/2060/index.htm</li>
 * </ul>
 * @see The ECMAScript specification.
 * @name whiteSpaces
 * @memberof core.strings
 * @member
 * @type {array}
 */

var whiteSpaces$1 = ["\t" /*Horizontal tab*/
, "\n" /*Line feed or New line*/
, "\x0B" /*Vertical tab*/
, "\f" /*Formfeed*/
, "\r" /*Carriage return*/
, " " /*Space*/
, "\xA0" /*Non-breaking space*/
, "\u1680" /*Ogham space mark*/
, "\u180E" /*Mongolian vowel separator*/
, "\u2000" /*En quad*/
, "\u2001" /*Em quad*/
, "\u2002" /*En space*/
, "\u2003" /*Em space*/
, "\u2004" /*Three-per-em space*/
, "\u2005" /*Four-per-em space*/
, "\u2006" /*Six-per-em space*/
, "\u2007" /*Figure space*/
, "\u2008" /*Punctuation space*/
, "\u2009" /*Thin space*/
, "\u200A" /*Hair space*/
, "\u200B" /*Zero width space*/
, "\u2028" /*Line separator*/
, "\u2029" /*Paragraph separator*/
, "\u202F" /*Narrow no-break space*/
, "\u205F" /*Medium mathematical space*/
, "\u3000" /*Ideographic space*/
];

/*jslint noempty: false */
/**
 * Removes all occurrences of a set of specified characters (or strings) from the beginning and end of this instance.
 * @name trim
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.strings.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trim("\r\t   hello world   \t ") ); // hello world
 * trace( trim("-_hello world_-",["-","_"]) ) ; // hello world
 */
function trim(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }

    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces$1;
    }

    var i;
    var l;

    // ---- start

    l = source.length;

    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {}
    source = source.substring(i);

    // ---- end

    l = source.length;
    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}
    source = source.substring(0, i + 1);

    // ----

    return source;
}

/**
 * Removes all extraneous whitespace from a string and trims it.
 * @name clean
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to clean.
 * @return The cleaned string.
 * @example
 * trace( clean("   hello world \n\n" ) ) ; // hello world
 */
function clean(source) {
    if (source === null || !(source instanceof String || typeof source === 'string')) {
        return "";
    }
    return trim(source.replace(/\s+/g, ' '));
}

/**
 * Compares two strings, the default comparaison algorithm use an ascending alphabetic order with minuscule weighting less than majuscule.
 * @name compare
 * @memberof core.strings
 * @function
 * @param {string} str1 - The first string to compare with the second string
 * @param {string} str2 - Thesecond string to compare with the first string
 * @param {boolean} [strict=false] This flag indicates if the function take into account the string case, default to false
 * @return An integer value :
 * <p>
 * <ul>
 * <li> 0 if the two strings are considered equals</li>
 * <li>-1 if the first string is considered smaller (lower) than the second string</li>
 * <li> 1 if the first string is considered bigger (higher) than the second string</li>
 * </ul>
 * </p>
 * @example
 * var s0 = "HELLO";
 * var s1 = "hello";
 * var s2 = "welcome";
 * var s3 = "world";
 *
 * trace( compare( s1, s2 ) ); //-1
 * trace( compare( s2, s1 ) ); //1
 * trace( compare( s1, s3 ) ); //1
 * trace( compare( s1, s1 ) ); //0
 * trace( compare( s1, s0 ) ); //0
 * trace( compare( s1, s0, true ) ); //-1
 * trace( compare( s0, s1, true ) ); //1
 */

function compare$1(str1 /*String*/, str2 /*String*/) /*int*/
{
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
        var local /*int*/ = str1.localeCompare(str2);
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

/**
 * Determines wether the end of a string matches the specified value.
 * @name endsWith
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to check.
 * @param {string} value - The value to find in end in the source.
 * @return <code>true</code> if the value is find in first.
 * @example <caption>Basic usage</caption>
 * trace( endsWith( "hello world", "world" ) ); //true
 * trace( endsWith( "hello world", "hello" ) ); //false
 */

function endsWith(source, value) {
    if (!(source instanceof String || typeof source === 'string') || !(value instanceof String || typeof value === 'string') || source.length < value.length) {
        return false;
    }

    if (value === "") {
        return true;
    }

    return source.lastIndexOf(value) === source.length - value.length;
}

/**
 * Quick and fast format of a string using indexed parameters only.
 * <p><strong>Usage :</strong>
 * <ul>
 * <li><code>fastformat( pattern:String, ...args:Array ):String</code></li>
 * <li><code>fastformat( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * </ul>
 * </p>
 * @name fastformat
 * @memberof core.strings
 * @function
 * @param {string} pattern - The String pattern expression to format.
 * @param {...string} args - A serie of strings values or of arrays of strings to fill the pattern expression.
 * @return The formatted expression.
 * @see {@link core.strings.format}
 * @example
 * trace( fastformat( "hello {0}", "world" ) ); // "hello world"
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big", "world" ] ) ); // "hello the big world"
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big" ] , "world" ) ); // "hello the big world"
 */

function fastformat(pattern) /*String*/
{
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

/**
 * Returns the string representation of the specific date with the format "yyyy-mm-dd".
 * @name fastformatDate
 * @memberof core.strings
 * @function
 * @param {Date} [date=null] - The date object to format (default the current Date if the argument is null).
 * @param {string} [separator=-] The default separator of the format expression.
 * @return The string representation of the specific date with the format <code>"yyyy-mm-dd"</code>.
 * @example
 * trace( fastformatDate(new Date(2016,5,12)) ) ; // "2016-06-12"
 * trace( fastformatDate(new Date(2016,5,12),"/") ) ; // "2016/06/12"
 */

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

/**
 * Apply character padding to a string.
 * <p>The padding amount is relative to the string length, if you try to pad the string <code>"hello"</code> (5 chars) with an amount of 10,
 * you will not add 10 spacing chars to the original string, but you will obtain <code>".....hello"</code>, exactly 10 chars after the padding.</p>
 * <p>A positive <code>amount</code> value will pad the string on the left (right align), and a negative <code>amount</code> value will pad the string on the right (left align).</p>
 * @name pad
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to pad.
 * @param {number} amount the amount of padding (number sign is the padding direction)
 * @param char the character to pad with (default is space)
 * @example <caption>Basic usage</caption>
 * trace( "left  : [" + pad( "hello" , 8 )  + "]" ); //left  : [   hello]
 * trace( "right : [" + pad( "hello" , -8 ) + "]" ); //right : [hello   ]
 * @example <caption>Padding a list of names</caption>
 * var seinfeld = [ "jerry", "george", "kramer", "helen" ];
 *
 * var len = seinfeld.length ;
 * for( var i = 0 ; i<len ; i++ )
 * {
 *     trace( pad( seinfeld[i] , 10 , "." ) ) ;
 * }
 *
 * //output
 * //.....jerry
 * //....george
 * //....kramer
 * //.....helen
 */

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

/**
 * Format a string using indexed or named parameters.
 * <p><strong>Usage :</strong>
 * <ul>
 * <li><code>format( pattern, ...args )</code></li>
 * <li><code>format( pattern, [arg0,arg1,arg, ...] )</code></li>
 * <li><code>format( pattern, [arg0:*,arg1,arg2, ...], ...args )</code></li>
 * <li><code>format( pattern, {name0:value0,name1:value1,name2:value2, ...} )</code></li>
 * <li><code>format( pattern, {name0:value0,name1:value1,name2:value2, ...}, ...args )</code></li>
 * </ul>
 * </p>
 * @name format
 * @memberof core.strings
 * @function
 * @param {string} pattern - The string expression to format.
 * @param {...string|array|Object} args - A serie of strings values or of arrays of strings or an Object to fill the pattern expression.
 * @return The formatted expression.
 * @see {@link core.strings.fastformat}
 * @throws <strong>Error</strong> when a token is malformed.
 * @example
 * trace( core.strings.format( "{0},{1},{2}" , "apples" , "oranges", "grapes" ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{0},{1},{2}" , ["apples" , "oranges", "grapes"] ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) ) ; // core.strings.format()
 */
function format(pattern) /*String*/
{
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

    /* note:
       don't use the global flag here as we want the search
       to be iterative and starting at index 0 of the string
        but do use the multiline flag if a token can be replaced
       by a \n, \r, etc.
    */
    var search = new RegExp("{([a-z0-9,:\\-]*)}", "m");
    var result = search.exec(formatted);

    var part;
    var token;
    var c;

    var pos;

    var dirty = false;

    var padding = 0;

    /* note:
       the buffer will store special string parts of the form
       buffer[0] = "{a:1,b:2,c:3}"
       the fromatted string will replace it by the form
       \uFFFC0 , \uFFFC+N , N being an integer from 0 to N
    */
    var buffer /*Array*/ = [];

    while (result !== null) {
        part = result[0];
        token = result[1];
        pos = token.indexOf(",");

        if (pos > 0) {
            padding = Number(token.substr(pos + 1));
            token = token.substring(0, pos);
        }

        // -----

        c = token.charAt(0);

        if ("0" <= c && c <= "9") {
            formatted = formatted.replace(part, pad(String(args[token]), padding));
        } else if (token === "" || token.indexOf(":") > -1) {
            /* note:
               this is to deal with eden/json strings inside a format string
               if you do a format( "expected: <{a:1,b:2,c:3}> but was: <{a:1,b:2,c:4}>", "test" )
               this will collide of the legit parsing of
               format( "hello {x,-8} and nhello {y,-8}" )
            */
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

/**
 * Converts a camelcased string to a hyphenated string.
 * @name hyphenate
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to hyphenate.
 * @return The hyphenated string.
 * @example
 * trace( hyphenate( "helloWorld" ) ) ; //"hello-world"
 */

function hyphenate(source) {
    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }
    return source.replace(/[A-Z]/g, function (match) {
        return '-' + match.charAt(0).toLowerCase();
    });
}

/**
 * Reports the index of the first occurrence in a string expression of any character in a specified array of Unicode characters.
 * @name indexOfAny
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to check.
 * @param {Array} anyOf - The Array of Unicode characters to find in the String.
 * @param {number} [startIndex=0] - The init position of the search process.
 * @param {number} [count=-1] - The number of character positions to examine.
 * @return the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 * @example
 * trace( indexOfAny( "hello world" , ["h","e","l"]) ) ; // 0
 * trace( indexOfAny( "hello world" , ["w","a","i","t"]) ) ; // 6
 * trace( indexOfAny( "hello world" , ["n","i"] ) ) ; // -1
 */

function indexOfAny(source, anyOf) /*int*/
{
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

/**
 * Inserts a specified instance of String at a specified index position in this instance.
 * <p><b>Note :</b>
 * <ul>
 * <li>if <code>index >= source.length</code>, we directly append the value to the end of the string.</li>
 * <li>if <code>index == 0</code>, we directly insert it to the begining of the string.</li>
 * <li>if <code>index < 0</code>, we directly insert but searching backwards from the <code>source.length - index</code> position.</li>
 * </ul>
 * </p>
 * @name insert
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to change.
 * @param {number} [index=0] The position to insert the new characters.
 * @param {string} value The expression to insert in the source.
 * @return the modified string expression.
 * @example
 * trace( insert("hello",  0, "a" ) ) ; // ahello
 * trace( insert("hello",  1, "a" ) ) ; // haello
 * trace( insert("hello", 10, "a" ) ) ; // helloa
 * trace( insert("hello", -1, "a" ) ) ; // helloa
 * trace( insert("hello", -2, "a" ) ) ; // hellao
 */

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

/**
 * Reports the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * @name lastIndexOfAny
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to check.
 * @param {Array} anyOf - The Array of Unicode characters to find in the String.
 * @param {number} [startIndex] - The init position of the search process (by default the length-1 of the source).
 * @param {number} [count=-1] - The number of character positions to check.
 * @return the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * @example
 * trace( lastIndexOfAny( "hello world" , ["n","i"] ) ) ; // -1
 * trace( lastIndexOfAny( "hello world" , ["h","e","l"]) ) ; // 0
 * trace( lastIndexOfAny( "hello world" , ["l","e","h"]) ) ; // 9
 * trace( lastIndexOfAny( "hello world" , ["w","a","i","t"]) ) ; // 6
 * trace( lastIndexOfAny( "hello world" , ["d","r","a","w"]) ) ; // 10
 * trace( lastIndexOfAny( "hello world" , ["l"]) ) ; // 9
 * trace( lastIndexOfAny( "hello world" , ["l"] , 9 ) ) ; // 3
 * trace( lastIndexOfAny( "hello world" , ["w"] , 9 , 5 ) ) ; // 6
 */

function lastIndexOfAny(source, anyOf) /*int*/
{
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

/**
 * Like white space characters, line terminator characters are used to improve source text readability and to separate tokens (indivisible lexical units) from each other.
 * However, unlike white space characters, line terminators have some influence over the behaviour of the syntactic grammar. In general, line terminators may occur between any two tokens, but there are a few places where they are forbidden by the syntactic grammar.
 * A line terminator cannot occur within any token, not even a string. Line terminators also affect the process of automatic semicolon insertion.
 * @see The ECMAScript specification.
 * @name lineTerminators
 * @memberof core.strings
 * @member
 * @type {array}
 */

var lineTerminators$1 = ["\n" /*LF : Line Feed*/
, "\r" /*CR : Carriage Return*/
, "\u2028" /*LS : Line Separator*/
, "\u2929" /*PS : Paragraphe Separator*/
];

/*jshint bitwise: false*/
/**
 * Returns a new String value who contains the specified String characters repeated count times.
 * @name repeat
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to repeat.
 * @param {number} [count=1] - The number of time to repeat the passed-in expression.
 * @return A new expression who contains the specified String characters repeated count times.
 * @example
 * trace( repeat( "hello" ) ) ; // hello
 * trace( repeat( "hello" , 0 ) ) ; // ""
 * trace( repeat( "hello" , 1 ) ) ; // hello
 * trace( repeat( "hello" , 2 ) ) ; // hellohello
 * trace( repeat( "hello" , 3 ) ) ; // hellohellohello
 *
 * trace( repeat( "hello" , -1 ) ) ; // throws RangeError =>'repeat count must be non-negative'
 * trace( repeat( "hello" , Infinity ) ) ; // throws RangeError =>'repeat count must be less than infinity'
 */

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

    // Ensuring count is a 31-bit integer allows us to heavily optimize the main part.
    // But anyway, most current (August 2014) browsers can't handlestrings 1 << 28 chars or longer, so:
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

/**
 * Checks if this string starts with the specified prefix.
 * @name startsWith
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to evaluates.
 * @param {string} value - The string expression to find in first in the source.
 * @return <code>true</code> if the value is find in first.
 * @example
 * trace( startsWith( "hello.txt" , "hello" ) ) ; // true
 */

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

/*jslint noempty: false */
/*jslint unused: false */
/**
 * Removes all occurrences of a set of characters specified in an array from the end of this instance.
 * @name trimEnd
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.strings.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trimEnd("---hello world---" , ["-"] ) ) ; // ---hello world
 */
function trimEnd(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }

    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces$1;
    }

    var i;
    var l = source.length;

    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}

    return source.substring(0, i + 1);
}

/*jslint noempty: false */
/**
 * Removes all occurrences of a set of characters specified in an array from the beginning of this instance.
 * @name trimStart
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.strings.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trimStart( "---hello world---" , ["-"] ) ); // hello world---
 */
function trimStart(source) {
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!(source instanceof String || typeof source === 'string') || source === "") {
        return '';
    }

    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaces$1;
    }

    var i;
    var l = source.length;

    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {}

    return source.substring(i);
}

/**
 * Truncates a string expression, accounting for word placement and character count.
 * @name truncate
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @param {number} length - The number of character to keep.
 * @param {string} prune - The string suffix to finalize the truncated expression.
 * @return The new truncated string.
 * @example
 * trace( truncate("this is some long text")) ; // ...
 * trace( truncate("this is some long text",3) ) ; // ...
 * trace( truncate("this is some long text",7) ) ; // this is...
 * trace( truncate("this is some long text",12) ) ; // this is some...
 * trace( truncate("this is some long text",12," etc.") ) ; // this is some, etc.
 */
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

/**
 * Capitalize the first letter of a string.
 * @name ucFirst
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @return The capitalized first expression.
 * @example
 * trace( ucFirst("hello world")) ; // Hello world
 */

function ucFirst(str) {
    if (!(str instanceof String || typeof str === 'string') || str === "") {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
}

/**
 * Capitalize each word in a string.
 * @name ucWords
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @param {string} [separator=' '] - The optional separator expression.
 * @return The new string expression with each word capitalized.
 * @example
 * trace( ucWords("hello world")) ; // Hello World
 * trace( ucWords("hello-world","-")) ; // Hello-World
 */

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

/*jshint bitwise: false*/
/**
 * Extracts the version from the UUID, which is (by definition) the M in xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * @name versionUUID
 * @memberof core.strings
 * @function
 * @param  {String} uuid The uuid expression
 * @return {Number} The version number of the uuid expression.
 * @example
 * trace( versionUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") ) ; // 4
 */

var versionUUID = function versionUUID(uuid) {
  return uuid.charAt(14) | 0;
};

/**
 * Determines whether the uuid is valid, converting it from a buffer if necessary.
 * @name validateUUID
 * @memberof core.strings
 * @function
 * @param  {String} uuid - The uuid expression to validate.
 * @param  {Number} vers - The optional version of the uuid to validate.
 * @return {Boolean} <code>true</code> if the uuid expression is valid.
 * @example
 * trace( validateUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") ) ; // true
 */
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

/**
 * Regular expression used for basic parsing of the uuid.
 */
var pattern$1 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @summary The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @namespace core.strings
 * @memberof core
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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
    lineTerminators: lineTerminators$1,
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
    versionUUID: versionUUID,
    whiteSpaces: whiteSpaces$1
});

/**
 * The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies.
 * <p>You can consider a library as a set of functions organized into classes, here with a <strong>"core"</strong> library in some cases we organize the functions in the package definitions without assembling them into a class.</p>
 * <p>Those functions are allowed to reuse the builtin types (Object, Array, etc.), the Javascript API classes and packages, but nothing else.</p>
 * @summary The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core
 */
var core = Object.assign({
    global: exports.global,
    dump: dump,
    cancelAnimationFrame: cancelAnimationFrame,
    requestAnimationFrame: requestAnimationFrame,

    isBoolean: isBoolean,
    isNumber: isNumber,
    isString: isString,

    arrays: arrays,
    chars: chars,
    easings: easings,
    functors: functors,
    maths: maths,
    numbers: numbers,
    objects: objects,
    random: random,
    reflect: reflect,
    strings: strings
});

/**
 * This class determinates a basic implementation to creates enumeration objects.
 * @name Enum
 * @memberof system
 * @class
 * @param {number} value The value of the enumeration.
 * @param {string} name The name key of the enumeration.
 */

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

/**
 * Compares the specified object with this object for equality.
 * @return <code>true</code> if the the specified object is equal with this object.
 * @memberof system.Enum
 * @instance
 * @function
 */
Enum.prototype.equals = function (object) /*Boolean*/
{
    if (object === this) {
        return true;
    }

    if (object instanceof Enum) {
        return object.toString() === this.toString() && object.valueOf() === this.valueOf();
    }

    return false;
};

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 * @memberof system.Enum
 * @instance
 * @function
 */
Enum.prototype.toString = function () /*String*/
{
    return this._name;
};

/**
 * Returns the primitive value of the object.
 * @return the primitive value of the object.
 * @memberof system.Enum
 * @instance
 * @function
 */
Enum.prototype.valueOf = function () {
    return this._value;
};

/*jshint unused: false*/
/**
 * Indicates if the specific objet is Equatable.
 * @function
 * @memberof system
 */

function isEquatable(target) {
  if (target) {
    return target.equals && target.equals instanceof Function || target instanceof Equatable;
  }

  return false;
}

/**
 * This interface is implemented by classes that can compare an object with their objects.
 * @name Equatable
 * @memberof system
 * @interface
 */
function Equatable() {}

Equatable.prototype = Object.create(Object.prototype);
Equatable.prototype.constructor = Equatable;

/**
 * Compares the specified object with this object for equality.
 * @memberof system.Equatable
 * @function
 * @param {*} object - The object to evaluates.
 * @return {boolean} true if the the specified object is equal with this object.
 */
Equatable.prototype.equals = function (object) /*Boolean*/
{}
//


/**
 * Returns the string representation of this instance.
 * @function
 * @memberof system.Equatable
 * @return the string representation of this instance.
 */
;Equatable.prototype.toString = function () {
  return "[Equatable]";
};

/*jshint unused: false*/
/**
 * Indicates if the specific objet is {@link system.Evaluable|Evaluable}.
 * @name isEvaluable
 * @function
 * @memberof system
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.Evaluable|Evaluable}.
 */

function isEvaluable(target) {
  if (target) {
    return target instanceof Evaluable || 'eval' in target && target.eval instanceof Function;
  }
  return false;
}

/**
 * An Evaluable class can interpret an object to another object.
 * <p>It's not necessary a parser, but the most common cases would be a string being evaluated to an object structure.</p>
 * <p><b>Note:</b> eval always take one and only one argument, if you need to configure the evaluator pass different arguments in the constructor.</p>
 * @name Evaluable
 * @memberof system
 * @interface
 */
function Evaluable() {}

Evaluable.prototype = Object.create(Object.prototype);
Evaluable.prototype.constructor = Evaluable;

/**
 * Evaluates the specified object.
 * @param {*} value - The object to evaluates.
 * @return The result of the evaluation.
 * @name eval
 * @memberof system.Evaluable
 * @function
 * @instance
 */
Evaluable.prototype.eval = function (value) {};

/*jshint unused: false*/
/**
 * Indicates if the specific objet is Formattable.
 */

function isFormattable(target) {
  if (target) {
    return target instanceof Formattable || 'format' in target && target.format instanceof Function;
  }

  return false;
}

/**
 * Interface implemented by classes that can format a value in a specific string expression.
 */
function Formattable() {}

/**
 * @extends Object
 */
Formattable.prototype = Object.create(Object.prototype);
Formattable.prototype.constructor = Formattable;

/**
 * Formats the specified value.
 * @param value The object to format.
 * @return the string representation of the formatted value.
 */
Formattable.prototype.format = function (value) /*String*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Formattable.prototype.toString = function () /*String*/
{
  return "[Formattable]";
};

/**
 * Indicates if the specific <code>target</code> is an {@link system.data.Identifiable|Identifiable} object.
 * @name isIdentifiable
 * @memberof system.data
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.Identifiable|Identifiable} object.
 */

function isIdentifiable(target) {
    if (target) {
        return target instanceof Identifiable || 'id' in target;
    }
    return false;
}

/**
 * This interface defines a common structure for <strong>identifiable</strong> classes (has an <code>id<code> property).
 * @name Identifiable
 * @interface
 * @memberof system.data
 */
function Identifiable() {
    Object.defineProperties(this, {
        /**
         * Indicates the unique identifier value of this object.
         */
        id: { value: null, enumerable: true, writable: true }
    });
}

Identifiable.prototype = Object.create(Object.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: Identifiable, writable: true }
});

/*jshint unused: false*/
/**
 * Indicates if the specific objet is an {@link system.data.Iterator|Iterator}.
 * @name isIterator
 * @memberof system.data
 * @function
 * @param {object} target - The target object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.Iterator|Iterator}.
 */

function isIterator(target) {
  var bool = false;
  if (target) {
    bool = target instanceof Iterator || 'hasNext' in target && target.hasNext instanceof Function && 'key' in target && target.key instanceof Function && 'next' in target && target.next instanceof Function && 'remove' in target && target.remove instanceof Function && 'reset' in target && target.reset instanceof Function && 'seek' in target && target.seek instanceof Function;
  }
  return bool;
}

/**
 * This interface defines the iterator pattern over a collection.
 * @name Iterator
 * @interface
 * @memberof system.data
 */
function Iterator() {}

Iterator.prototype = Object.create(Object.prototype);
Iterator.prototype.constructor = Iterator;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.hasNext = function () {};

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.key = function () {};

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.next = function () {};

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.remove = function () {};

/**
 * Reset the internal pointer of the iterator (optional operation).
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.reset = function () {};

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.seek = function (position) {};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.data.Iterator
 * @function
 */
Iterator.prototype.toString = function () {
  return '[Iterator]';
};

/*jshint unused: false*/
/**
 * Indicates if the specific objet is an {@link system.data.OrderedIterator|OrderedIterator}.
 * @name isOrderedIterator
 * @memberof system.data
 * @function
 * @param {object} target - The target object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.OrderedIterator|OrderedIterator}.
 */
function isOrderedIterator(target) {
  var bool = false;
  if (target) {
    bool = target instanceof OrderedIterator || 'hasNext' in target && target.hasNext instanceof Function && 'hasPrevious' in target && target.hasPrevious instanceof Function && 'key' in target && target.key instanceof Function && 'next' in target && target.next instanceof Function && 'previous' in target && target.previous instanceof Function && 'remove' in target && target.remove instanceof Function && 'reset' in target && target.reset instanceof Function && 'seek' in target && target.seek instanceof Function;
  }
  return bool;
}

/**
 * Defines an iterator that operates over an ordered collection. This iterator allows both forward and reverse iteration through the collection.
 * @name OrderedIterator
 * @extends Iterator
 * @interface
 * @memberof system.data
 */
function OrderedIterator() {}

OrderedIterator.prototype = Object.create(Iterator.prototype);
OrderedIterator.prototype.constructor = OrderedIterator;

/**
 * Checks to see if there is a previous element that can be iterated to.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.hasPrevious = function () {};

/**
 * Returns the previous element in the collection.
 * @return the previous element in the collection.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.previous = function () {};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.toString = function () {
  return '[OrderedIterator]';
};

/*jshint laxbreak : true*/
/*jshint unused   : false*/
/**
 * Indicates if the specific <code>target</code> is a {@link system.data.Validator|Validator} object.
 * @name isValidator
 * @memberof system.data
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is a {@link system.data.Validator|Validator}.
 */

function isValidator(target) {
  if (target) {
    if (target instanceof Validator) {
      return true;
    }
    return 'supports' in target && target.supports instanceof Function && 'validate' in target && target.validate instanceof Function;
  }
  return false;
}

/**
 * Defines the methods that objects that participate in a validation operation.
 * @name Validator
 * @interface
 * @memberof system.data
 */
function Validator() {}

Validator.prototype = Object.create(Object.prototype);
Validator.prototype.constructor = Validator;

/**
 * Indicates if the validator supports the passed-in value.
 * @param {*} value - The value to evaluate.
 * @return <code>true</code> if the specific value is valid.
 * @memberof system.data.Validator
 * @function
 */
Validator.prototype.supports = function (value) {};

/**
 * Evaluates the specified value and throw an <code>Error</code> if the value is not valid.
 * @param {*} value - The value to evaluate.
 * @memberof system.data.Validator
 * @function
 * @throws <code>Error</code> if the value is not valid.
 */
Validator.prototype.validate = function (value) /*void*/{};

/*jshint unused: false*/
/**
 * An object that maps keys to values. A map cannot contain duplicate keys. Each key can map to at most one value.
 * <p><b>Note:</b> This class replace the old <code>system.data.Map</code> interface in the VEGAS framework. Today in Javascript the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map} class is a standard global <b>ECMAScript</b> definition.</p>
 * @name KeyValuePair
 * @summary An object that maps keys to values.
 * @class
 * @memberof system.data
 */

function KeyValuePair() {}

KeyValuePair.prototype = Object.create(Object.prototype, {
  /**
   * The constructor reference of this instance.
   */
  constructor: { value: KeyValuePair, writable: true },

  /**
   * Returns the number of key-value mappings in this map.
   * @name length
   * @memberof system.process.KeyValuePair
   * @instance
   * @type {number}
   * @readonly
   */
  length: { get: function get() {
      return 0;
    } },

  /**
   * Removes all mappings from this map (optional operation).
   * @name clear
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  clear: { value: function value() {}, writable: true },

  /**
   * Returns a shallow copy of the map.
   * @return a shallow copy of the map.
   * @name clone
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  clone: { value: function value() {
      return new KeyValuePair();
    }, writable: true },

  /**
   * Removes the mapping for this key from this map if it is present (optional operation).
   * @param {*} key - The key of the entry to remove.
   * @name delete
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  delete: { value: function value(key) {}, writable: true },

  /**
   * The forEach() method executes a provided function once per each key/value pair in the KeyValuePair object, in insertion order.
   * @param callback Function to execute for each element.
   * @param thisArg Value to use as this when executing callback.
   * @name forEach
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  forEach: { value: function value(callback) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    }, writable: true },

  /**
   * Returns the value to which this map maps the specified key.
   * @param {*} key - The key of the entry to retrieve in the collection.
   * @name get
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  get: { value: function value(key) {
      return null;
    }, writable: true },

  /**
   * Returns {@code true} if this map contains a mapping for the specified key.
   * @param {*} key - The key of the entry to retrieve in the collection.
   * @return {@code true} if this map contains a mapping for the specified key.
   * @name has
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  has: { value: function value(key) /*Boolean*/{
      return false;
    }, writable: true },

  /**
   * Returns {@code true} if this map maps one or more keys to the specified value.
   * @return {@code true} if this map maps one or more keys to the specified value.
   * @name hasValue
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  hasValue: { value: function value(_value) /*Boolean*/{
      return false;
    }, writable: true },

  /**
   * Returns {@code true} if this map contains no key-value mappings.
   * @return {@code true} if this map contains no key-value mappings.
   * @name isEmpty
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  isEmpty: { value: function value() /*Boolean*/{
      return false;
    }, writable: true },

  /**
   * Returns the values iterator of this map.
   * @return the values iterator of this map.
   * @name iterator
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  iterator: { value: function value() /*Iterator*/{
      return null;
    }, writable: true },

  /**
   * Returns the keys iterator of this map.
   * @return the keys iterator of this map.
   * @name keyIterator
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  keyIterator: { value: function value() /*Iterator*/{
      return null;
    }, writable: true },

  /**
   * Returns an <code>Array</code> of all the keys in the map.
   * @return an <code>Array</code> representation of all the keys register in this collection.
   * @name keys
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  keys: { value: function value() {
      return null;
    }, writable: true },

  /**
   * Associates the specified value with the specified key in this map (optional operation).
   * @param {*} key - The key of the element to add to the Map object.
   * @param {*} value - The value of the element to add to the Map object.
   * @name set
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  set: { value: function value(key, _value2) {}, writable: true },

  /**
   * Copies all of the mappings from the specified map to this map (optional operation).
   * @param {system.data.KeyValuePair} map - The map to fill the current map.
   * @name setAll
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  setAll: { value: function value(map /*KeyValuePair*/) {}, writable: true },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   * @name toString
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  toString: { value: function value() {
      return '[' + this.constructor.name + ']';
    }, writable: true },

  /**
   * Returns an array of all the values in the map.
   * @return an <code>Array</code> representation of all the values register in this collection.
   * @name values
   * @memberof system.process.KeyValuePair
   * @instance
   * @function
   */
  values: { value: function value() /*Array*/{}, writable: true }
});

/**
 * This interface should be implemented by any properties definition object.
 * @name Property
 * @interface
 * @memberof system.data
 * @see system.data.Attribute
 * @see system.data.Method
 * @see system.process.Cache
 */

function Property() {}

Property.prototype = Object.create(Object.prototype);
Property.prototype.constructor = Property;

/**
 * Determinates a basic <b>attribute</b> definition.
 * @summary Determinates a basic <b>attribute</b> definition.
 * @name Attribute
 * @class
 * @memberof system.data
 * @implements system.data.Property
 * @param {string} name The name of the attribute.
 * @param {*} value The value of the attribute.
 * @see system.data.Method
 * @see system.process.Cache
 */
function Attribute() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  /**
   * The name of the attribute.
   * @name name
   * @memberof system.data.Attribute
   * @type {string}
   */
  this.name = name instanceof String || typeof name === 'string' ? name : null;

  /**
   * The value of the attribute.
   * @name name
   * @memberof system.data.Attribute
   * @type {*}
   */
  this.value = value;
}

Attribute.prototype = Object.create(Property.prototype);
Attribute.prototype.constructor = Attribute;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.data.Attribute
 * @function
 * @instance
 */
Attribute.prototype.toString = function () {
  return "[Attribute]";
};

/**
 * Determinates a basic <b>method</b> definition.
 * @summary Determinates a basic <b>method</b> definition.
 * @name Method
 * @class
 * @memberof system.data
 * @implements system.data.Property
 * @param {string} name The name of the method.
 * @param {array} [arg=null] The optional array of arguments of the method.
 * @see system.data.Attribute
 * @see system.process.Cache
 */
function Method() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  /**
   * The name of the method.
   * @name name
   * @memberof system.data.Method
   * @type {string}
   */
  this.name = name instanceof String || typeof name === 'string' ? name : null;

  /**
   * The optional array of arguments of the method.
   * @name args
   * @memberof system.data.Method
   * @type {array}
   */
  this.args = args instanceof Array ? args : null;
}

Method.prototype = Object.create(Property.prototype);
Method.prototype.constructor = Method;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.data.Method
 * @function
 * @instance
 */
Method.prototype.toString = function () {
  return "[Method]";
};

/**
 * Converts a <code>Array</code> to an iterator.
 * @example
 * var ArrayIterator = system.data.iterators.ArrayIterator ;
 *
 * var ar = ["item1", "item2", "item3", "item4"] ;
 *
 * var it = new ArrayIterator(ar) ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("--- it reset") ;
 *
 * it.reset() ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 *
 * trace ("--- it seek 2") ;
 *
 * it.seek(2) ;
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("---") ;
 */
function ArrayIterator(array) {
    if (!(array instanceof Array)) {
        throw new ReferenceError(this + " constructor failed, the passed-in Array argument not must be 'null'.");
    }
    Object.defineProperties(this, {
        _a: { value: array, writable: true },
        _k: { value: -1, writable: true }
    });
}

/**
 * @extends Object
 */
ArrayIterator.prototype = Object.create(Iterator.prototype);
ArrayIterator.prototype.constructor = ArrayIterator;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 */
ArrayIterator.prototype.hasNext = function () {
    return this._k < this._a.length - 1;
};

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.key = function () {
    return this._k;
};

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 */
ArrayIterator.prototype.next = function () {
    return this._a[++this._k];
};

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 */
ArrayIterator.prototype.remove = function () {
    return this._a.splice(this._k--, 1)[0];
};

/**
 * Reset the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.reset = function () {
    this._k = -1;
};

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 */
ArrayIterator.prototype.seek = function (position) {
    position = Math.max(Math.min(position - 1, this._a.length), -1);
    this._k = isNaN(position) ? -1 : position;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
ArrayIterator.prototype.toString = function () {
    return '[ArrayIterator]';
};

/*jshint unused: false*/
/**
 * Converts a <code>KeyValuePair</code> to an iterator.
 */
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

/**
 * @extends Object
 */
MapIterator.prototype = Object.create(Iterator.prototype);
MapIterator.prototype.constructor = MapIterator;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 */
MapIterator.prototype.hasNext = function () {
    return this._i.hasNext();
};

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.key = function () {
    return this._k;
};

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 */
MapIterator.prototype.next = function () {
    this._k = this._i.next();
    return this._m.get(this._k);
};

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 */
MapIterator.prototype.remove = function () {
    this._i.remove();
    return this._m.delete(this._k);
};

/**
 * Reset the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.reset = function () {
    this._i.reset();
};

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.seek = function (position) {
    throw new Error("This Iterator does not support the seek() method.");
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
MapIterator.prototype.toString = function () {
    return '[MapIterator]';
};

/**
 * Represents a pair key/value entry in a Map.
 * @param key The key representation of the entry.
 * @param value The value representation of the entry.
 */

function MapEntry(key, value) {
  this.key = key;
  this.value = value;
}

/**
 * @extends Object
 */
MapEntry.prototype = Object.create(Object.prototype);
MapEntry.prototype.constructor = MapEntry;

/**
 * Creates and returns a shallow copy of the object.
 * @return A new object that is a shallow copy of this instance.
 */
MapEntry.prototype.clone = function () {
  return new MapEntry(this.key, this.value);
};

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
MapEntry.prototype.toString = function () /*String*/
{
  return "[MapEntry key:" + this.key + " value:" + this.value + "]";
};

/**
 * Converts a Map to a custom string representation.
 */
function MapFormatter() {}

/**
 * @extends Object
 */
MapFormatter.prototype = Object.create(Object.prototype);
MapFormatter.prototype.constructor = MapFormatter;

/**
 * Formats the specified value.
 * @param value The object to format.
 * @return the string representation of the formatted value.
 */
MapFormatter.prototype.format = function (value) /*String*/
{
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

/**
 * Hash table based implementation of the Map interface.
 * <p><b>Attention :</b> this class is the ArrayMap class in the AS3 version of VEGAS.</p>
 * @example
 * <pre>
 * var map = new system.data.maps.ArrayMap() ;
 *
 * map.set("key1", "value1") ;
 * map.set("key2", "value2") ;
 * map.set("key3", "value3") ;
 *
 * trace ("map : " + map) ;
 *
 * trace ("------ iterator") ;
 *
 * var it = map.iterator() ;
 * while (it.hasNext())
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 *
 *
 * trace( 'values : ' + map.values()) ;
 * trace( map.has('key2')) ;
 * trace( map.get('key2') ) ;
 * trace( map.indexOfKey('key2')) ;
 *
 * map.delete( 'key2' ) ;
 *
 * trace ("map : " + map) ;
 * </pre>
 * @param keys An optional Array of all keys to fill in this Map.
 * @param values An optional Array of all values to fill in this Map. This Array must have the same size like the 'keys' argument.
 */
function ArrayMap(keys /*Array*/, values /*Array*/) {
    Object.defineProperties(this, {
        /**
         * @private
         */
        _keys: {
            value: [],
            writable: true
        },
        /**
         * @private
         */
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

/**
 * @extends KeyValuePair
 */
ArrayMap.prototype = Object.create(KeyValuePair.prototype, {
    /**
     * Returns the number of key-value mappings in this map.
     */
    length: {
        get: function get() {
            return this._keys.length;
        }
    }
});

ArrayMap.prototype.constructor = ArrayMap;

/**
 * Removes all mappings from this map (optional operation).
 */
ArrayMap.prototype.clear = function () {
    this._keys = [];
    this._values = [];
};

/**
 * Returns a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
 * @return a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
 */
ArrayMap.prototype.clone = function () {
    return new ArrayMap(this._keys, this._values);
};

/**
 * Removes the mapping for this key from this map if present.
 * @param o The key whose mapping is to be removed from the map.
 * @return previous value associated with specified key, or null if there was no mapping for key. A null return can also indicate that the map previously associated null with the specified key.
 */
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

/**
 * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
 * @param callback Function to execute for each element.
 * @param thisArg Value to use as this when executing callback.
 */
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

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.get = function (key) {
    return this._values[this.indexOfKey(key)];
};

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.getKeyAt = function (index /*uint*/) {
    return this._keys[index];
};

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.getValueAt = function (index /*uint*/) {
    return this._values[index];
};

/**
 * Returns {@code true} if this map contains a mapping for the specified key.
 * @return {@code true} if this map contains a mapping for the specified key.
 */
ArrayMap.prototype.has = function (key) /*Boolean*/
{
    return this.indexOfKey(key) > -1;
};

/**
 * Returns {@code true} if this map maps one or more keys to the specified value.
 * @return {@code true} if this map maps one or more keys to the specified value.
 */
ArrayMap.prototype.hasValue = function (value) /*Boolean*/
{
    return this.indexOfValue(value) > -1;
};

/**
 * Returns the index of the specified key in argument.
 * @param key the key in the map to search.
 * @return the index of the specified key in argument.
 */
ArrayMap.prototype.indexOfKey = function (key) /*int*/
{
    var l = this._keys.length;
    while (--l > -1) {
        if (this._keys[l] === key) {
            return l;
        }
    }
    return -1;
};

/**
 * Returns the index of the specified value in argument.
 * @param value the value in the map to search.
 * @return the index of the specified value in argument.
 */
ArrayMap.prototype.indexOfValue = function (value) /*int*/
{
    var l = this._values.length;
    while (--l > -1) {
        if (this._values[l] === value) {
            return l;
        }
    }
    return -1;
};

/**
 * Returns true if this map contains no key-value mappings.
 * @return true if this map contains no key-value mappings.
 */
ArrayMap.prototype.isEmpty = function () /*Boolean*/
{
    return this._keys.length === 0;
};

/**
 * Returns the values iterator of this map.
 * @return the values iterator of this map.
 */
ArrayMap.prototype.iterator = function () /*Iterator*/
{
    return new MapIterator(this);
};

/**
 * Returns the keys iterator of this map.
 * @return the keys iterator of this map.
 */
ArrayMap.prototype.keyIterator = function () /*Iterator*/
{
    return new ArrayIterator(this._keys);
};

/**
 * Returns an array representation of all keys in the map.
 * @return an array representation of all keys in the map.
 */
ArrayMap.prototype.keys = function () /*Array*/
{
    return this._keys.concat();
};

/**
 * Associates the specified value with the specified key in this map.
 * @param key the key to register the value.
 * @param value the value to be mapped in the map.
 */
ArrayMap.prototype.set = function (key, value) {
    var r = null;
    var i /*Number*/ = this.indexOfKey(key);
    if (i < 0) {
        this._keys.push(key);
        this._values.push(value);
    } else {
        r = this._values[i];
        this._values[i] = value;
    }
    return r;
};

/**
 * Copies all of the mappings from the specified map to this one.
 */
ArrayMap.prototype.setAll = function (map /*KeyValuePair*/) {
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

/**
 * Sets the value of the "key" in the ArrayMap with the specified index.
 * @param index The position of the entry in the ArrayMap.
 * @param value The value of the entry to change.
 * @return A MapEntry who corresponding the old key/value entry or null if the key already exist or the specified index don't exist.
 * @throws RangeError If the index is out of the range of the Map size.
 */
ArrayMap.prototype.setKeyAt = function (index /*uint*/, key) {
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

/**
 * Sets the value of the "value" in the HashMap (ArrayMap) with the specified index.
 * @return the old value in the map if exist.
 */
ArrayMap.prototype.setValueAt = function (index /*Number*/, value) {
    if (index >= this._keys.length) {
        throw new RangeError("ArrayMap.setValueAt(" + index + ") failed with an index out of the range.");
    }
    var v = this._values[index]; // TODO refactoring
    if (v === undefined) {
        return null;
    }
    var k = this._keys[index];
    this._values[index] = value;
    return new MapEntry(k, v);
};

/**
 * Returns the string representation of this map.
 * @return the string representation of this map.
 */
ArrayMap.prototype.toString = function () {
    return formatter.format(this);
};

/**
 * Returns an array representation of all values in the map.
 * @return an array representation of all values in the map.
 */
ArrayMap.prototype.values = function () /*Array*/
{
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.data
 * @memberof system
 */
var data = Object.assign({
    // singletons
    isIdentifiable: isIdentifiable,
    isIterator: isIterator,
    isOrderedIterator: isOrderedIterator,
    isValidator: isValidator,

    // interfaces
    Identifiable: Identifiable,
    Iterator: Iterator,
    KeyValuePair: KeyValuePair,
    OrderedIterator: OrderedIterator,
    Property: Property,
    Validator: Validator,

    // classes
    Attribute: Attribute,
    Method: Method,

    // packages
    iterators: {
        ArrayIterator: ArrayIterator,
        MapIterator: MapIterator
    },
    maps: {
        ArrayMap: ArrayMap
    }
});

/**
 * Thrown when methods that have detected concurrent modification of an object when such modification is not permissible.
 * @summary Thrown when methods that have detected concurrent modification of an object when such modification is not permissible.
 * @name ConcurrencyError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */

function ConcurrencyError(message, fileName, lineNumber) {
  this.name = 'ConcurrencyError';
  this.message = message || 'concurrency error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}

ConcurrencyError.prototype = Object.create(Error.prototype);
ConcurrencyError.prototype.constructor = ConcurrencyError;

/**
 * Thrown when an invalid channel is find.
 * @summary Thrown when an invalid channel is find.
 * @name InvalidChannelError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */

function InvalidChannelError(message, fileName, lineNumber) {
  this.name = 'InvalidChannelError';
  this.message = message || 'invalid channel error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}

InvalidChannelError.prototype = Object.create(Error.prototype);
InvalidChannelError.prototype.constructor = InvalidChannelError;

/**
 * Thrown when an invalid filter is find.
 * @summary Thrown when an invalid filter is find.
 * @name InvalidFilterError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */

function InvalidFilterError(message, fileName, lineNumber) {
  this.name = 'InvalidFilterError';
  this.message = message || 'invalid filter error';
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}

InvalidFilterError.prototype = Object.create(Error.prototype);
InvalidFilterError.prototype.constructor = InvalidFilterError;

/**
 * Thrown when a key is non unique.
 * @summary Thrown when a key is non unique.
 * @name NonUniqueKeyError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */
function NonUniqueKeyError(key, pattern, fileName, lineNumber) {
  this.name = 'NonUniqueKeyError';
  this.key = key;
  this.pattern = pattern || NonUniqueKeyError.PATTERN;
  this.message = fastformat(this.pattern, key);
  this.fileName = fileName;
  this.lineNumber = lineNumber;
  this.stack = new Error().stack;
}

/**
 * The localizable or changeable expression to defines the pattern of the error message.
 */
NonUniqueKeyError.PATTERN = "attempting to insert the key '{0}'";

NonUniqueKeyError.prototype = Object.create(Error.prototype);
NonUniqueKeyError.prototype.constructor = NonUniqueKeyError;

/**
 * Thrown by an Enumeration to indicate that there are no more elements in the enumeration.
 * @summary Thrown by an Enumeration to indicate that there are no more elements in the enumeration.
 * @name NoSuchElementError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */

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
 * The VEGAS.js framework - The system.errors library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 * This {@link system.Evaluable|Evaluable} combine a collection of evaluators to evaluates a specified value.
 * @summary This {@link system.Evaluable|Evaluable} combine a collection of evaluators to evaluates a specified value.
 * @name MultiEvaluator
 * @class
 * @memberof system.evaluators
 * @extends system.Evaluable
 * @example
 * var MultiEvaluator    = system.evaluators.MultiEvaluator ;
 * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
 * var RomanEvaluator    =  system.evaluators.RomanEvaluator ;
 *
 * var obj = { id  : "XII" , count : 100 } ;
 *
 * var evaluator1 = new PropertyEvaluator( obj ) ;
 * var evaluator2 = new RomanEvaluator() ;
 *
 * var evaluator = new MultiEvaluator() ;
 *
 * evaluator.add( evaluator1 ) ;
 * evaluator.add( evaluator2 ) ;
 *
 * trace( evaluator.eval( 'id' ) ) ; // 12
 * trace( evaluator.eval( 'count' ) ) ; // C
 * @param {array} [elements] - An optional array of evaluators to group.
 */
function MultiEvaluator() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    Object.defineProperties(this, {
        /**
         * Indicates if the MultiEvaluator is cleared before insert new {@link system.Evaluable|Evaluable} objects (in the add method).
         * @memberof system.evaluators.MultiEvaluator
         * @type {boolean}
         * @instance
         * @default false
         */
        autoClear: { value: false, writable: true },

        /**
         * @private
         */
        _evaluators: { value: [], writable: true }
    });

    if (elements instanceof Array && elements.length > 0) {
        this.add.apply(this, elements);
    }
}

MultiEvaluator.prototype = Object.create(Evaluable.prototype, {
    /**
     * Indicates the number of elements registered in this collection.
     * @memberof system.evaluators.MultiEvaluator
     * @type {number}
     * @instance
     * @readonly
     */
    length: {
        get: function get() {
            return this._evaluators.length;
        }
    },

    /**
     * Inserts an {@link system.Evaluable|Evaluable} objects in the <code>MultiEvaluator</code>.
     * @param {...system.Evaluable} evaluators - The enumeration list of {@link system.Evaluable|Evaluable} objets or Arrays of Evaluator. Only Array and Evaluable are compatible to fill the <b>MultiEvaluator</b>.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
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

    /**
     * Clear all the {@link system.Evaluable|Evaluable} objects.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    clear: { value: function value() {
            this._evaluators = [];
        } },

    /**
     * Evaluates the specified object.
     * @param {*} value - The object to evaluates.
     * @return The result of the evaluation.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    eval: { value: function value(_value) {
            this._evaluators.forEach(function (element) {
                if (element instanceof Evaluable) {
                    _value = element.eval(_value);
                }
            });
            return _value;
        } },

    /**
     * Removes an {@link system.Evaluable|Evaluable} objects in the <b>MultiEvaluator</b> if is register.
     * @param evaluator The {@link system.Evaluable|Evaluable} to find and remove.
     * @return <code>true</code> if the Evaluable is removed.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
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

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.evaluators.MultiEvaluator
 * @function
 * @instance
 */
MultiEvaluator.prototype.toString = function () /*String*/
{
    return "[MultiEvaluator]";
};

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @summary Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name PropertyEvaluator
 * @class
 * @memberof system.evaluators
 * @extends system.Evaluable
 * @example
 * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
 *
 * var obj =
 * {
 *     message : "hello world" ,
 *     title   : "my title"    ,
 *     menu    :
 *     {
 *         title : "my menu title" ,
 *         label : "my label"
 *     }
 * }
 *
 * var evaluator = new PropertyEvaluator( obj ) ;
 *
 * // valid expressions
 *
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "title"      ) ) ; // my title
 * trace( evaluator.eval( "menu.title" ) ) ; // my menu title
 * trace( evaluator.eval( "menu.label" ) ) ; // my label
 *
 * // invalid expressions
 *
 * trace( evaluator.eval( ""            ) ) ; // null
 * trace( evaluator.eval( "unknow"      ) ) ; // null
 * trace( evaluator.eval( "menu.unknow" ) ) ; // null
 *
 * // change the "undefineable" value returns in the eval() method when the evaluation failed.
 *
 * evaluator.undefineable = "empty" ;
 * trace( evaluator.eval( "unknow" ) ) ; // empty ;
 *
 * evaluator.undefineable = undefined ;
 * trace( evaluator.eval( "unknow" ) ) ; // undefined ;
 *
 * // activate the throwError mode.
 *
 * evaluator.throwError = true ;
 *
 * try
 * {
 *     evaluator.eval( "test" ) ;
 * }
 * catch( e )
 * {
 *     trace( e ) ; // ##EvalError: [object PropertyEvaluator] eval failed with the expression : test##
 * }
 * @param {object} target - The object to evaluates.
 */
function PropertyEvaluator(target) {
    Object.defineProperties(this, {
        /**
         * The separator character of the expression evaluator.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {string}
         * @instance
         * @default '.'
         */
        separator: { value: ".", writable: true },

        /**
         * The target reference use in the evaluator.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {object}
         * @instance
         */
        target: { value: target, writable: true, configurable: true },

        /**
         * Indicates if the eval() method throws errors or return null when an error is throwing.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {boolean}
         * @default false
         * @instance
         */
        throwError: { value: false, writable: true },

        /**
         * Defines the value returns from the eval() method if the expression can't be evaluate.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {object}
         * @default null
         * @instance
         */
        undefineable: { value: null, writable: true }
    });
}

PropertyEvaluator.prototype = Object.create(Evaluable.prototype);
PropertyEvaluator.prototype.constructor = PropertyEvaluator;

/**
 * Evaluates the specified object.
 * @param {*} value - The object to evaluates.
 * @return The result of the evaluation.
 * @name eval
 * @memberof system.evaluators.PropertyEvaluator
 * @function
 * @instance
 */
PropertyEvaluator.prototype.eval = function (o) {
    if (o !== null && (typeof o === "string" || o instanceof String) && this.target !== null) {
        var exp /*String*/ = String(o);
        if (exp.length > 0) {
            var value = this.target;
            var members = exp.split(this.separator);
            var len = members.length;
            for (var i /*int*/ = 0; i < len; i++) {
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

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.evaluators.PropertyEvaluator
 * @function
 * @instance
 */
PropertyEvaluator.prototype.toString = function () /*String*/
{
    return "[PropertyEvaluator]";
};

/**
 * Roman numerals are a numeral system originating in ancient Rome, adapted from Etruscan numerals.
 * <p>Roman numerals are commonly used in numbered lists (in outline format), clock faces, pages preceding the main body of a book, chord triads in music analysis, the numbering of movie publication dates, successive political leaders or children with identical names, and the numbering of some annual sport events.</p>
 * <p><b>Links :</b>
 * <li><a href="http://en.wikipedia.org/wiki/Roman_numerals">http://en.wikipedia.org/wiki/Roman_numerals</a></li>
 * <li><a href="http://netzreport.googlepages.com/online_converter_for_dec_roman.html">http://netzreport.googlepages.com/online_converter_for_dec_roman.html</a></li>
 * </p>
 * @param value The decimal uint value of the RomanNumber or a String representation of the roman numerals object.
 * @example
 * var RomanNumber = system.numeric.RomanNumber ;
 * trace( RomanNumber.parse(12) ) ; // XII
 * trace( RomanNumber.parseRomanString('II') ) ; // 2
 */

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
    /**
     * The maximum parsing value.
     */
    MAX: { value: 3999, enumerable: true },

    /**
     * The minimum parsing value.
     */
    MIN: { value: 0, enumerable: true },

    /**
     * The array representation of all numeric values.
     */
    NUMERIC: { value: [1000, 500, 100, 50, 10, 5, 1], enumerable: true },

    /**
     * The array representation of all roman expressions.
     */
    ROMAN: { value: ["M", "D", "C", "L", "X", "V", "I"], enumerable: true },

    /**
     * Parse the specified value and return this roman numerals String representation.
     */
    parse: {
        value: function value(num) /*String*/
        {
            var MAX = RomanNumber.MAX;
            var MIN = RomanNumber.MIN;

            var NUMERIC = RomanNumber.NUMERIC;
            var ROMAN = RomanNumber.ROMAN;

            var n /*uint*/ = 0;
            var r /*String*/ = "";

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

            var size /*int*/ = NUMERIC.length;

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

    /**
     * Parses a roman String representation in this uint decimal representation.
     */
    parseRomanString: {
        value: function value(roman /*String*/) /*uint*/
        {
            var NUMERIC = RomanNumber.NUMERIC;
            var ROMAN = RomanNumber.ROMAN;

            if (roman === null || roman === "") {
                return 0;
            }

            roman = roman.toUpperCase();

            var n /*uint*/ = 0;

            var pos /*int*/ = 0;
            var ch /*String*/ = "";
            var next /*String*/ = "";

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

/**
 * @extends Object
 */
RomanNumber.prototype = Object.create(Object.prototype);
RomanNumber.prototype.constructor = RomanNumber;

/**
 * Parse the specified value.
 */
RomanNumber.prototype.parse = function (value) /*String*/
{
    value = typeof value === "number" || value instanceof Number ? value : this._num;
    return RomanNumber.parse(value);
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
RomanNumber.prototype.toString = function () /*String*/
{
    return this.parse(this._num);
};

/**
 * Returns the primitive value of this object.
 * @return the primitive value of this object.
 */
RomanNumber.prototype.valueOf = function () /*uint*/
{
    return this._num;
};

/**
 * Evaluates an int value and transform it in roman numeral expression.
 * @summary Evaluates an int value and transform it in roman numeral expression.
 * @name RomanEvaluator
 * @class
 * @memberof system.evaluators
 * @extends system.Evaluable
 * @example
 * var RomanEvaluator=  system.evaluators.RomanEvaluator ;
 *
 * var evaluator = new RomanEvaluator() ;
 *
 * trace( evaluator.eval( 1 ) ) ; // I
 * trace( evaluator.eval( 2 ) ) ; // II
 * trace( evaluator.eval( 3 ) ) ; // III
 * trace( evaluator.eval( 4 ) ) ; // IV
 * trace( evaluator.eval( 5 ) ) ; // V
 * trace( evaluator.eval( 9 ) ) ; // IX
 * trace( evaluator.eval( 10 ) ) ; // X
 * trace( evaluator.eval( 50 ) ) ; // L
 * trace( evaluator.eval( 2459 ) ) ; // MMCDLIX
 * trace( evaluator.eval( 3999 ) ) ;  // MMMCMXCIX
 *
 * // roman string to number
 *
 * trace( evaluator.eval( "I" ) ) ; // 1
 * trace( evaluator.eval( "II" ) ) ; // 2
 * trace( evaluator.eval( "III" ) ) ; // 3
 * trace( evaluator.eval( "IV" ) ) ; // 4
 * trace( evaluator.eval( "V" ) ) ; // 5
 * trace( evaluator.eval( "IX" ) ) ; // 9
 * trace( evaluator.eval( "X" ) ) ; // 10
 * trace( evaluator.eval( "L" ) ) ; // 50
 * trace( evaluator.eval( "MMCDLIX" ) ) ; // 2459
 * trace( evaluator.eval( "MMMCMXCIX" ) ) ; // 3999
 *
 * try
 * {
 *     evaluator.eval( 4000 ) ;
 * }
 * catch( e )
 * {
 *     trace( e.message ) ;  // Max value for a RomanNumber is 3999
 * }
 *
 * try
 * {
 *     evaluator.eval( -1 ) ;
 * }
 * catch( e )
 * {
 *     trace( e.message ) ; // Min value for a RomanNumber is 0
 * }
 */
function RomanEvaluator() {}

RomanEvaluator.prototype = Object.create(Evaluable.prototype);
RomanEvaluator.prototype.constructor = RomanEvaluator;

/**
 * Evaluates the specified object.
 * @param {number} value - The object to evaluates.
 * @return The string representation of the int value.
 * @name eval
 * @memberof system.evaluators.RomanEvaluator
 * @function
 * @instance
 */
RomanEvaluator.prototype.eval = function (value) {
  if (typeof value === 'string' || value instanceof String) {
    return RomanNumber.parseRomanString(value);
  } else if (typeof value === 'number' || value instanceof Number) {
    return RomanNumber.parse(value);
  } else {
    return null;
  }
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.evaluators.RomanEvaluator
 * @function
 * @instance
 */
RomanEvaluator.prototype.toString = function () {
  return "[RomanEvaluator]";
};

/**
 * The VEGAS.js framework - The system.evaluators library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.evaluators
 * @memberof system
 */
var evaluators = Object.assign({
  MultiEvaluator: MultiEvaluator,
  PropertyEvaluator: PropertyEvaluator,
  RomanEvaluator: RomanEvaluator
});

/**
 * This object register formattable expression and format a String with all expressions register in this internal dictionnary.
 * <p><b>Example :</b></p>
 * <pre>
 * var ExpressionFormatter = system.formatters.ExpressionFormatter ;
 *
 * var formatter = new ExpressionFormatter() ;
 *
 * formatter.set( "root"      , "c:"                     ) ;
 * formatter.set( "system"    , "{root}/project/system"  ) ;
 * formatter.set( "data.maps" , "{system}/data/maps"     ) ;
 * formatter.set( "map"       , "{data.maps}/HashMap.as" ) ;
 *
 * source = "the root : {root} - the class : {map}" ;
 * // the root : c: - the class : c:/project/system/data/maps/HashMap.as
 *
 * trace( formatter.length ) ;
 * trace( formatter.format( source ) ) ;
 *
 * trace( "----" ) ;
 *
 * formatter.clear() ;
 *
 * formatter.set( "root"      , "c:"                     ) ;
 * formatter.set( "system"    , "%root%/project/system" ) ;
 * formatter.set( "data.maps" , "%system%/data/maps" ) ;
 * formatter.set( "HashMap"   , "%data.maps%/HashMap.as" ) ;
 *
 * formatter.beginSeparator = "%" ;
 * formatter.endSeparator   = "%" ;
 *
 * source = "the root : %root% - the class : %HashMap%" ;
 *
 * trace( formatter.format( source ) ) ;
 * // the root : c: - the class : c:/project/system/data/maps/HashMap.as
 * </pre>
 */
function ExpressionFormatter() {
    Object.defineProperties(this, {
        /**
         * The expressions reference
         */
        expressions: { value: new ArrayMap() },

        /**
         * @private
         */
        _beginSeparator: { value: '{', writable: true },

        /**
         * @private
         */
        _endSeparator: { value: '}', writable: true },

        /**
         * @private
         */
        _pattern: { value: "{0}((\\w+\)|(\\w+)((.\\w)+|(.\\w+))){1}" },

        /**
         * @private
         */
        _reg: { value: null, writable: true }
    });

    this._reset();
}

Object.defineProperties(ExpressionFormatter, {
    /**
     * The limit of the recursions in the formatter.
     */
    MAX_RECURSION: { value: '200', enumerable: true }
});

/**
 * @extends Formattable
 */
ExpressionFormatter.prototype = Object.create(Formattable.prototype, {
    constructor: { value: ExpressionFormatter },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ExpressionFormatter]';
        } },

    /**
     * The begin separator of the expression to format (default "{").
     */
    beginSeparator: {
        get: function get() {
            return this._beginSeparator;
        },
        set: function set(str) {
            this._beginSeparator = str || "{";
            this._reset();
        }
    },

    /**
     * The end separator of the expression to format (default "}" ).
     */
    endSeparator: {
        get: function get() {
            return this._endSeparator;
        },
        set: function set(str) {
            this._endSeparator = str || "}";
            this._reset();
        }
    },

    /**
     * Indicates the size of the expression dictionary.
     */
    length: {
        get: function get() {
            return this.expressions.length;
        }
    },

    /**
     * Clear the expression formatter dictionary.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    clear: {
        value: function value() {
            this.expressions.clear();
        }
    },

    /**
     * Formats the specified value.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    format: {
        value: function value(_value) /*String*/
        {
            return this._format(String(_value), 0);
        }
    },

    /**
     * Sets a new expression in the formatter. If the expression already exist, the value in the collector is replaced.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    set: {
        value: function value(key /*String*/, _value2 /*String*/) /*Boolean*/
        {
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

    /**
     * @private
     */
    _reset: {
        value: function value() {
            this._reg = new RegExp(fastformat(this._pattern, this.beginSeparator, this.endSeparator), "g");
        }
    },

    /**
     * @private
     */
    _format: {
        value: function value(str, depth) {
            if (depth >= ExpressionFormatter.MAX_RECURSION) {
                return str;
            }

            var m /*Array*/ = str.match(this._reg);

            if (m === null) {
                return str;
            }

            var l = m.length;

            if (l > 0) {
                var exp;
                var key;
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
        }
    }
});

/**
 * The VEGAS.js framework - The system.formatters library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.formatters
 * @memberof system
 */
var formatters = Object.assign({
  ExpressionFormatter: ExpressionFormatter
});

/**
 * The <code>Receiver</code> interface is the primary method for receiving values from Signal objects.
 * @name Receiver
 * @interface
 * @memberof system.signals
 */

function Receiver() {}

Receiver.prototype = Object.create(Object.prototype);
Receiver.prototype.constructor = Receiver;

/**
 * This method is called when the receiver is connected with a Signal object.
 * @memberof system.signals.Receiver
 * @function
 */
Receiver.prototype.receive = function () {};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.signals.Receiver
 * @function
 */
Receiver.prototype.toString = function () /*String*/
{
  return "[Receiver]";
};

/*jslint unused: false */
/**
 * The <code>Signaler</code> interface is the primary method for emit messages.
 * @name Signaler
 * @interface
 * @memberof system.signals
 */

function Signaler() {}

Signaler.prototype = Object.create(Object.prototype, {
    /**
     * Indicates the number of receivers connected.
     * @memberof system.signals.Signaler
     * @readonly
     */
    length: {
        get: function get() {
            return 0;
        }
    }
});

Signaler.prototype.constructor = Signaler;

/**
 * Connects a Function or a Receiver object.
 * @param {Function|system.signals.Receiver} receiver - The receiver to connect : a Function reference or a Receiver object.
 * @param {number} [priority=0] Determinates the priority level of the receiver.
 * @param {boolean} [autoDisconnect=false] Apply a disconnect after the first trigger
 * @return <code>true</code> If the receiver is connected with the signal emitter.
 * @memberof system.signals.Signaler
 */
Signaler.prototype.connect = function (receiver) /*uint*/
{
    var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var autoDisconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
}
//


/**
 * Returns <code>true</code> if one or more receivers are connected.
 * @memberof system.signals.Signaler
 * @return {boolean} <code>true</code> if one or more receivers are connected.
 */
;Signaler.prototype.connected = function () /*Boolean*/
{}
//


/**
 * Disconnect the specified object or all objects if the parameter is null.
 * @return {boolean} <code>true</code> if the specified receiver exist and can be disconnected.
 * @memberof system.signals.Signaler
 */
;Signaler.prototype.disconnect = function (receiver) /*Boolean*/
{}
//


/**
 * Emit the specified values to the receivers.
 * @param {*} [values] All values to emit to the receivers.
 * @memberof system.signals.Signaler
 */
;Signaler.prototype.emit = function () /*void*/
{}
//


/**
 * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
 * @return <code class="prettyprint">true</code> if the specified receiver is connected.
 * @memberof system.signals.Signaler
 */
;Signaler.prototype.hasReceiver = function (receiver) /*Boolean*/
{
    //
};

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @name SignalEntry
 * @memberof system.signals
 * @class
 * @constructs
 * @param {system.signals.Receiver|Function} receiver The receiver to connect : a Function reference or a Receiver object.
 * @param {number} [priority=0] The priority value of the entry.
 * @param {boolean} [auto=false] This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */

function SignalEntry(receiver) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  /**
   * Indicates if the receiver must be disconnected when handle the first time a signal.
   * @memberof system.signals.SignalEntry
   * @default false
   * @type {boolean}
   * @instance
   */
  this.auto = Boolean(auto);

  /**
   * The receiver reference of this entry.
   * @memberof system.signals.SignalEntry
   * @default null
   * @type {system.signals.Receiver|Function}
   * @instance
   */
  this.receiver = receiver || null;

  /**
   * Determinates the priority value of the object.
   * @memberof system.signals.SignalEntry
   * @default 0
   * @type {number}
   * @instance
   */
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}

SignalEntry.prototype = Object.create(Object.prototype);
SignalEntry.prototype.constructor = SignalEntry;

/**
 * Returns the String representation of the object.
 * @name toString
 * @memberof system.signals.SignalEntry
 * @return the String representation of the object.
 * @function
 * @instance
 */
SignalEntry.prototype.toString = function () /*String*/
{
  return '[SignalEntry]';
};

/**
 * Creates a new Signal instance.
 * @name Signal
 * @class
 * @implements system.signals.Signaler
 * @memberof system.signals
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
function Signal() {
    Object.defineProperties(this, {
        /**
         * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
         * @memberof system.signals.Signal
         * @default null
         * @type {Object}
         * @instance
         */
        proxy: { value: null, configurable: true, writable: true },

        /**
         * @private
         */
        receivers: { value: [], writable: true }
    });
}

Signal.prototype = Object.create(Signaler.prototype, {
    /**
     * The constructor reference of the object.
     */
    constructor: { value: Signal, writable: true },

    /**
     * The number of receivers or slots register in the signal object.
     * @memberof system.signals.Signal
     * @default 0
     * @type {number}
     * @instance
     * @readonly
     */
    length: { get: function get() {
            return this.receivers.length;
        } },

    /**
     * Connects a Function or a Receiver object.
     * @memberof system.signals.Signal
     * @instance
     * @function
     * @param {system.signals.Receiver|Function} receiver The receiver to connect : a Function reference or a Receiver object.
     * @param {number} [priority=0] Determinates the priority level of the receiver.
     * @param {boolean} [autoDisconnect=false] Apply a disconnect after the first trigger
     * @return {boolean} <code>true</code> If the receiver is connected with the signal emitter.
     */
    connect: { value: function value(receiver) /*Boolean*/
        {
            var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var autoDisconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (receiver === null) {
                return false;
            }

            autoDisconnect = Boolean(autoDisconnect);
            priority = priority > 0 ? Math.ceil(priority) : 0;

            if (typeof receiver === "function" || receiver instanceof Function || receiver instanceof Receiver || "receive" in receiver) {
                if (this.hasReceiver(receiver)) {
                    return false;
                }

                this.receivers.push(new SignalEntry(receiver, priority, autoDisconnect));

                /////// bubble sorting

                var i;
                var j;

                var a = this.receivers;

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

                ///////

                return true;
            }

            return false;
        } },

    /**
     * Returns <code>true</code> if one or more receivers are connected.
     * @return {boolean} <code>true</code> if one or more receivers are connected.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    connected: { value: function value() {
            return this.receivers.length > 0;
        } },

    /**
     * Disconnect the specified object or all objects if the parameter is null.
     *
     * @return {boolean} <code>true</code> if the specified receiver exist and can be unregister.
     * @param {system.signals.Receiver|Function} receiver The receiver to disconnect : a Function reference or a Receiver object.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
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
                var l /*int*/ = this.receivers.length;
                while (--l > -1) {
                    if (this.receivers[l].receiver === receiver) {
                        this.receivers.splice(l, 1);
                        return true;
                    }
                }
            }
            return false;
        } },

    /**
     * Emit the specified values to the receivers.
     * @param ...values All values to emit to the receivers.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    emit: { value: function value() /*Arguments*/ // FIXME use ...values
        {
            var values = Object.setPrototypeOf(arguments, Array.prototype);

            if (this.receivers.length === 0) {
                return;
            }

            var i;
            var l /*int*/ = this.receivers.length;
            var r /*Array*/ = [];
            var a /*Array*/ = this.receivers.slice();
            var e;

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
            for (i = 0; i < l; i++) {
                slot = a[i].receiver;

                if (slot instanceof Function || typeof receiver === "function") {
                    slot.apply(this.proxy || this, values);
                } else if (slot instanceof Receiver || "receive" in slot) {
                    slot.receive.apply(this.proxy || slot, values);
                }
            }
        } },

    /**
     * Returns <code>true</code> if the specified receiver is connected.
     * @return {boolean} <code>true</code> if the specified receiver is connected.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    hasReceiver: { value: function value(receiver) /*Boolean*/
        {
            if (receiver === null) {
                return false;
            }
            if (this.receivers.length > 0) {
                var l /*int*/ = this.receivers.length;
                while (--l > -1) {
                    if (this.receivers[l].receiver === receiver) {
                        return true;
                    }
                }
            }
            return false;
        } },

    /**
     * Returns the Array representation of all receivers connected with the signal.
     * @return {array} The Array representation of all receivers connected with the signal.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    toArray: { value: function value() /*Array*/
        {
            var r = [];
            if (this.receivers.length > 0) {
                var l = this.receivers.length;
                for (var i = 0; i < l; i++) {
                    r.push(this.receivers[i].receiver);
                }
            }
            return r;
        } },

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    toString: { value: function value() {
            return '[Signal]';
        } }
});

/**
 * The logger levels that is used within the logging framework.
 * @param value The value of the enumeration.
 * @param name The name key of the enumeration.
 * @example
 * var LoggerLevel = system.logging.LoggerLevel ;
 *
 * for( var level in LoggerLevel )
 * {
 *     if( LoggerLevel.hasOwnProperty(level) )
 *     {
 *        trace( level + ' ' + LoggerLevel.getLevelString(LoggerLevel[level]) ) ;
 *     }
 * }
 */
function LoggerLevel(value /*int*/, name /*String*/) {
  Enum.call(this, value, name);
}

/**
 * @extends Object
 */
LoggerLevel.prototype = Object.create(Enum.prototype);
LoggerLevel.prototype.constructor = LoggerLevel;

Object.defineProperties(LoggerLevel, {
  /**
   * Intended to force a target to process all messages (1).
   */
  ALL: { value: new LoggerLevel(1, 'ALL'), enumerable: true },

  /**
   * Designates events that are very harmful and will eventually lead to application failure (16).
   */
  CRITICAL: { value: new LoggerLevel(16, 'CRITICAL'), enumerable: true },

  /**
   * Designates informational level messages that are fine grained and most helpful when debugging an application (2).
   */
  DEBUG: { value: new LoggerLevel(2, 'DEBUG'), enumerable: true },

  /**
   * The default string level value in the getLevelString() method.
   */
  DEFAULT_LEVEL_STRING: { value: 'UNKNOWN', enumerable: true },

  /**
   * Designates error events that might still allow the application to continue running (8).
   */
  ERROR: { value: new LoggerLevel(8, 'ERROR'), enumerable: true },

  /**
   * Designates informational messages that highlight the progress of the application at coarse-grained level (4).
   */
  INFO: { value: new LoggerLevel(4, 'INFO'), enumerable: true },

  /**
   * A special level that can be used to turn off logging (0).
   */
  NONE: { value: new LoggerLevel(0, 'NONE'), enumerable: true },

  /**
   * Designates events that could be harmful to the application operation (6).
   */
  WARNING: { value: new LoggerLevel(6, 'WARNING'), enumerable: true },

  /**
   * What a Terrible Failure: designates an exception that should never happen. (32).
   */
  WTF: { value: new LoggerLevel(32, 'WTF'), enumerable: true },

  /**
   * Returns <code>true</code> if the number level passed in argument is valid.
   * @return <code>true</code> if the number level passed in argument is valid.
   */
  get: {
    value: function value(_value /*int*/) /*LoggerLevel*/
    {
      var levels /*Array*/ = [LoggerLevel.ALL, LoggerLevel.CRITICAL, LoggerLevel.DEBUG, LoggerLevel.ERROR, LoggerLevel.INFO, LoggerLevel.NONE, LoggerLevel.WARNING, LoggerLevel.WTF];
      var l = levels.length;
      while (--l > -1) {
        if (levels[l]._value === _value) {
          return levels[l];
        }
      }
      return null;
    }
  },

  /**
   * Returns a String value representing the specific level.
   * @return a String value representing the specific level.
   */
  getLevelString: {
    value: function value(_value2 /*LoggerLevel*/) /*String*/
    {
      if (LoggerLevel.validate(_value2)) {
        return _value2.toString();
      } else {
        return LoggerLevel.DEFAULT_LEVEL_STRING;
      }
    }
  },

  /**
   * Returns <code>true</code> if the number level passed in argument is valid.
   * @return <code>true</code> if the number level passed in argument is valid.
   */
  validate: {
    value: function value(level /*LoggerLevel*/) /*Boolean*/
    {
      var levels /*Array*/ = [LoggerLevel.ALL, LoggerLevel.CRITICAL, LoggerLevel.DEBUG, LoggerLevel.ERROR, LoggerLevel.INFO, LoggerLevel.NONE, LoggerLevel.WARNING, LoggerLevel.WTF];
      return levels.indexOf(level) > -1;
    }
  }
});

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param channel The Logger reference of this entry.
 */
function LoggerEntry(message, level /*LoggerLevel*/, channel /*String*/) {
  this.channel = channel;
  this.level = level instanceof LoggerLevel ? level : LoggerLevel.ALL;
  this.message = message;
}

/**
 * @extends Object
 */
LoggerEntry.prototype = Object.create(Object.prototype);
LoggerEntry.prototype.constructor = LoggerEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
LoggerEntry.prototype.toString = function () /*String*/
{
  return '[LoggerEntry]';
};

/**
 * API for sending log output.
 */
function Logger(channel) {
    Signal.call(this);

    Object.defineProperties(this, {
        _entry: { value: new LoggerEntry(null, null, channel), writable: true }
    });
}

/**
 * @extends Object
 */
Logger.prototype = Object.create(Signal.prototype, {
    ///////////

    constructor: { value: Logger },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[Logger]';
        } },

    ///////////

    /**
     * Indicates the channel value for the logger.
     */
    channel: {
        get: function get() {
            return this._entry.channel;
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.CRITICAL level.
     */
    critical: {
        value: function value(context) {
            for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                options[_key - 1] = arguments[_key];
            }

            this._log(LoggerLevel.CRITICAL, context, options);
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.DEBUG level.
     */
    debug: {
        value: function value(context) {
            for (var _len2 = arguments.length, options = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                options[_key2 - 1] = arguments[_key2];
            }

            this._log(LoggerLevel.DEBUG, context, options);
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.ERROR level.
     */
    error: {
        value: function value(context) {
            for (var _len3 = arguments.length, options = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                options[_key3 - 1] = arguments[_key3];
            }

            this._log(LoggerLevel.ERROR, context, options);
        }
    },

    /**
     * Logs the specified data using the LogEvent.INFO level.
     */
    info: {
        value: function value(context) {
            for (var _len4 = arguments.length, options = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                options[_key4 - 1] = arguments[_key4];
            }

            this._log(LoggerLevel.INFO, context, options);
        }
    },

    /**
     * Logs the specified data using the LogEvent.ALL level.
     * @param ...args The information to log. This string can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param ... Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     */
    log: {
        value: function value(context) {
            for (var _len5 = arguments.length, options = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                options[_key5 - 1] = arguments[_key5];
            }

            this._log(LoggerLevel.ALL, context, options);
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.WARN level.
     */
    warning: {
        value: function value(context) {
            for (var _len6 = arguments.length, options = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                options[_key6 - 1] = arguments[_key6];
            }

            this._log(LoggerLevel.WARNING, context, options);
        }
    },

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    wtf: {
        value: function value(context) {
            for (var _len7 = arguments.length, options = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                options[_key7 - 1] = arguments[_key7];
            }

            this._log(LoggerLevel.WTF, context, options);
        }
    },

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    _log: {
        value: function value(level /*LoggerLevel*/, context, options /*Array*/) /*void*/
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

/**
 * The enumeration of all string expressions in the logging engine.
 */

var strings$1 = Object.defineProperties({}, {
  // LoggerTarget

  /**
   * The static field used when throws an Error when a character is invalid.
   */
  CHARS_INVALID: { value: "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\", enumerable: true },

  /**
   * The static field used when throws an Error when the character placement failed.
   */
  CHAR_PLACEMENT: { value: "'*' must be the right most character.", enumerable: true },

  /**
   * The static field used when throws an Error if the filter is empty or null.
   */
  EMPTY_FILTER: { value: "filter must not be null or empty.", enumerable: true },

  /**
   * The static field used when throws an Error when filter failed.
   */
  ERROR_FILTER: { value: "Error for filter '{0}'.", enumerable: true },

  // Log

  /**
   * The default channel of the <code class="prettyprint">Logger</code> instances returns with the <code class="prettyprint">getLogger</code> method.
   */
  DEFAULT_CHANNEL: { value: "", enumerable: true },

  /**
   * The string representation of all the illegal characters.
   */
  ILLEGALCHARACTERS: { value: "[]~$^&/\\(){}<>+=`!#%?,:;'\"@", enumerable: true },

  /**
   * The static field used when throws an Error when a character is invalid.
   */
  INVALID_CHARS: { value: "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@", enumerable: true },

  /**
   * The static field used when throws an Error when the length of one character is invalid.
   */
  INVALID_LENGTH: { value: "Channels must be at least one character in length.", enumerable: true },

  /**
   * The static field used when throws an Error when the specified target is invalid.
   */
  INVALID_TARGET: { value: "Log, Invalid target specified.", enumerable: true }

});

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param logger The Logger reference of this entry.
 */
function LoggerTarget() {
    Object.defineProperties(this, {
        /**
         * Determinates the LoggerFactory reference of the target,
         * by default the target use the <code>system.logging.Log</code> singleton.
         */
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

        /**
         * Determinates the filters array representation of the target.
         */
        filters: {
            get: function get() {
                return [].concat(this._filters);
            },
            set: function set(value /*Array*/) /*void*/
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

        /**
         * Determinates the level (LoggerLevel of this target.
         */
        level: {
            get: function get() {
                return this._level;
            },
            set: function set(value /*LoggerLevel*/) /*void*/
            {
                this._factory.removeTarget(this);
                this._level = value || LoggerLevel.ALL; // FIXME filter and validate the level
                this._factory.addTarget(this);
            }
        },

        _count: { value: 0, writable: true },
        _factory: { value: null, writable: true },
        _filters: { value: ["*"], writable: true },
        _level: { value: LoggerLevel.ALL, writable: true }
    });

    this.factory = Log;
}

/**
 * @extends Object
 */
LoggerTarget.prototype = Object.create(Receiver.prototype);

Object.defineProperties(LoggerTarget.prototype, {
    ////////////////////////////////////

    constructor: { value: LoggerTarget, enumerable: true, writable: true, configurable: true },

    ////////////////////////////////////

    /**
     * Inserts a channel in the fllters if this channel don't exist.
     * Returns a boolean if the channel is add in the list.
     */
    addFilter: {
        value: function value(channel /*String*/) /*Boolean*/
        {
            this._checkFilter(channel);
            var index = this._filters.indexOf(channel);
            if (index === -1) {
                this._filters.push(channel);
                return true;
            }
            return false;
        }
    },

    /**
     * Sets up this target with the specified logger.
     * Note : this method is called by the framework and should not be called by the developer.
     */
    addLogger: {
        value: function value(logger /*Logger*/) /*void*/
        {
            if (logger && logger instanceof Logger) {
                this._count++;
                logger.connect(this);
            }
        }
    },

    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    logEntry: {
        value: function value(entry /*LoggerEntry*/) /*void*/ //jshint ignore:line
        {
            // override
        }
    },

    /**
     * This method is called when the receiver is connected with a Signal object.
     * @param ...values All the values emitting by the signals connected with this object.
     */
    receive: {
        value: function value(entry) {
            if (entry instanceof LoggerEntry) {
                if (this._level === LoggerLevel.NONE) {
                    return; // logging off
                } else if (entry.level.valueOf() >= this._level.valueOf()) {
                    this.logEntry(entry);
                }
            }
        }
    },

    /**
     * Remove a channel in the fllters if this channel exist.
     * @return a boolean if the channel is removed.
     */
    removeFilter: {
        value: function value(channel /*String*/) /*Boolean*/
        {
            if (channel && (typeof channel === "string" || channel instanceof String) && channel !== "") {
                var index /*int*/ = this._filters.indexOf(channel);
                if (index > -1) {
                    this._filters.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    },

    /**
     * Stops this target from receiving events from the specified logger.
     */
    removeLogger: {
        value: function value(logger /*Logger*/) /*void*/
        {
            if (logger instanceof Logger) {
                this._count--;
                logger.disconnect(this);
            }
        }
    },

    /**
     * @private
     */
    _checkFilter: {
        value: function value(filter /*String*/) /*void*/
        {
            if (filter === null) {
                throw new InvalidFilterError(strings$1.EMPTY_FILTER);
            }

            if (this._factory.hasIllegalCharacters(filter)) {
                throw new InvalidFilterError(fastformat(strings$1.ERROR_FILTER, filter) + strings$1.CHARS_INVALID);
            }

            var index /*int*/ = filter.indexOf("*");

            if (index >= 0 && index !== filter.length - 1) {
                throw new InvalidFilterError(fastformat(strings$1.ERROR_FILTER, filter) + strings$1.CHAR_PLACEMENT);
            }
        }
    },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[LoggerTarget]';
        } }
});

/**
 * This factory provides pseudo-hierarchical logging capabilities with multiple format and output options.
 * <p>This class in an internal class in the package system.logging you can use the Log singleton to deploy all the loggers in your application.</p>
 */
function LoggerFactory() {
    Object.defineProperties(this, {
        _loggers: { value: new ArrayMap(), writable: true },
        _targetLevel: { value: LoggerLevel.NONE, writable: true },
        _targets: { value: [], writable: true }
    });
}

/**
 * @extends Object
 */
LoggerFactory.prototype = Object.create(Receiver.prototype, {
    ///////////

    constructor: { value: LoggerFactory },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[LoggerFactory]';
        } },

    ///////////

    /**
     * Allows the specified target to begin receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    addTarget: {
        value: function value(target /*LoggerTarget*/) /*void*/
        {
            if (target && target instanceof LoggerTarget) {
                var channel;
                var log;

                var filters /*Array*/ = target.filters;
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
        }
    },

    /**
     * This method removes all of the current loggers from the cache of the factory.
     * Subsquent calls to the <code>getLogger()</code> method return new instances of loggers rather than any previous instances with the same category.
     * This method is intended for use in debugging only.
     */
    flush: {
        value: function value() /*void*/
        {
            this._loggers.clear();
            this._targets = [];
            this._targetLevel = LoggerLevel.NONE;
        }
    },

    /**
     * Returns the logger associated with the specified channel.
     * If the category given doesn't exist a new instance of a logger will be returned and associated with that channel.
     * Channels must be at least one character in length and may not contain any blanks or any of the following characters:
     * []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * This method will throw an <code>InvalidChannelError</code> if the category specified is malformed.
     * @param channel The channel of the logger that should be returned.
     * @return An instance of a logger object for the specified name.
     * If the name doesn't exist, a new instance with the specified name is returned.
     */
    getLogger: {
        value: function value(channel /*String*/) /*Logger*/
        {
            this._checkChannel(channel);

            var logger /*Logger*/ = this._loggers.get(channel);
            if (!logger) {
                logger = new Logger(channel);
                this._loggers.set(channel, logger);
            }

            var target;

            var len /*int*/ = this._targets.length;
            for (var i /*int*/ = 0; i < len; i++) {
                target = this._targets[i];
                if (this._channelMatchInFilterList(channel, target.filters)) {
                    target.addLogger(logger);
                }
            }

            return logger;
        }
    },

    /**
     * This method checks the specified string value for illegal characters.
     * @param value The String to check for illegal characters. The following characters are not valid: []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * @return <code>true</code> if there are any illegal characters found, <code>false</code> otherwise.
     */
    hasIllegalCharacters: {
        value: function value(_value /*String*/) /*Boolean*/
        {
            return indexOfAny(_value, strings$1.ILLEGALCHARACTERS.split("")) !== -1;
        }
    },

    /**
     * Indicates whether a 'all' level log event will be processed by a log target.
     * @return true if a 'all' level log event will be logged; otherwise false.
     */
    isAll: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.ALL;
        }
    },

    /**
     * Indicates whether a 'critical' level log event will be processed by a log target.
     * @return true if a 'critical' level log event will be logged; otherwise false.
     */
    isCritical: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.CRITICAL;
        }
    },

    /**
     * Indicates whether a 'debug' level log event will be processed by a log target.
     * @return true if a 'debug' level log event will be logged; otherwise false.
     */
    isDebug: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.DEBUG;
        }
    },

    /**
     * Indicates whether a 'error' level log event will be processed by a log target.
     * @return true if a 'error' level log event will be logged; otherwise false.
     */
    isError: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.ERROR;
        }
    },

    /**
     * Indicates whether a 'info' level log event will be processed by a log target.
     * @return true if a 'info' level log event will be logged; otherwise false.
     */
    isInfo: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.INFO;
        }
    },

    /**
     * Indicates whether a 'warn' level log event will be processed by a log target.
     * @return true if a 'warn' level log event will be logged; otherwise false.
     */
    isWarning: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.WARNING;
        }
    },

    /**
     * Indicates whether a 'wtf' level log event will be processed by a log target.
     * @return true if a 'wtf' level log event will be logged; otherwise false.
     */
    isWtf: {
        value: function value() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.WTF;
        }
    },

    /**
     * Stops the specified target from receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    removeTarget: {
        value: function value(target /*LoggerTarget*/) /*void*/
        {
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

    /**
     * This method checks that the specified category matches any of the filter expressions provided in the <code>filters</code> Array.
     * @param category The category to match against.
     * @param filters A list of Strings to check category against.
     * @return <code>true</code> if the specified category matches any of the filter expressions found in the filters list, <code>false</code> otherwise.
     * @private
     */
    _channelMatchInFilterList: {
        value: function value(channel /*String*/, filters /*Array*/) /*Boolean*/
        {
            var filter;
            var index /*int*/ = -1;
            var len /*int*/ = filters.length;
            for (var i /*int*/ = 0; i < len; i++) {
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

    /**
     * This method will ensure that a valid category string has been specified.
     * If the category is not valid an <code>InvalidCategoryError</code> will be thrown.
     * Categories can not contain any blanks or any of the following characters: []`*~,!#$%^&amp;()]{}+=\|'";?&gt;&lt;./&#64; or be less than 1 character in length.
     * @private
     */
    _checkChannel: {
        value: function value(channel /*String*/) /*void*/
        {
            if (channel === null || channel.length === 0) {
                throw new InvalidChannelError(strings$1.INVALID_LENGTH);
            }
            if (this.hasIllegalCharacters(channel) || channel.indexOf("*") !== -1) {
                throw new InvalidChannelError(strings$1.INVALID_CHARS);
            }
        }
    },

    /**
     * This method resets the Log's target level to the most verbose log level for the currently registered targets.
     * @private
     */
    _resetTargetLevel: {
        value: function value() /*void*/
        {
            var t;
            var min /*LoggerLevel*/ = LoggerLevel.NONE;
            var len /*int*/ = this._targets.length;
            for (var i /*int*/ = 0; i < len; i++) {
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

/**
 * Enumeration of all "magic reference patterns" id can be use in the object definition to create a dependency with special object reference in the factory.
 */

var MagicReference = Object.defineProperties({}, {
  /**
   * The reference pattern who represents the current config reference of the application defines in the config object in the factory.
   */
  CONFIG: { value: "#config", enumerable: true },

  /**
   * The reference pattern who represents the init magic name used in the property definitions to change the strategy of the current member initialisation.
   */
  INIT: { value: "#init", enumerable: true },

  /**
   * The reference pattern who represents the current locale reference of the application defines in the config object in the factory.
   */
  LOCALE: { value: "#locale", enumerable: true },

  /**
   * The reference pattern who represents the current Parameters reference of the application defines in the config object in the factory.
   */
  PARAMS: { value: "#params", enumerable: true },

  /**
   * The reference pattern who represents the current root reference of the application defines in the config object in the factory.
   */
  ROOT: { value: "#root", enumerable: true },

  /**
   * The reference pattern who represents the current stage reference of the application defines in the config object in the factory.
   */
  STAGE: { value: "#stage", enumerable: true },

  /**
   * The reference pattern who represents the current factory.
   */
  THIS: { value: "#this", enumerable: true }
});

/**
 * The static enumeration list of all object attributes.
 */

var ObjectAttribute = Object.defineProperties({}, {
  /**
   * Defines the label of the arguments in a method or a constructor object.
   */
  ARGUMENTS: { value: 'args', enumerable: true }, // The Javascript keyword 'arguments' is reserved, use 'args' !

  /**
   * Defines the attribute name of the 'config' object in the configuration of the ioc factory.
   */
  CONFIG: { value: 'config', enumerable: true },

  /**
   * Defines the label of the 'configuration' top-level attribute.
   */
  CONFIGURATION: { value: 'configuration', enumerable: true },

  /**
   * Defines the label of the 'evaluators' attribure.
   */
  EVALUATORS: { value: 'evaluators', enumerable: true },

  /**
   * Defines the label of the 'factory' attribure.
   */
  FACTORY: { value: 'factory', enumerable: true },

  /**
   * Defines the label of the 'identify' property of the object.
   */
  IDENTIFY: { value: 'identify', enumerable: true },

  /**
   * Defines the label of the 'i18n' top-level attribute.
   */
  I18N: { value: 'i18n', enumerable: true },

  /**
   * Defines the label of the 'imports' top-level attribute.
   */
  IMPORTS: { value: 'imports', enumerable: true },

  /**
   * Defines the label of the lazyInit name property of the object.
   */
  LAZY_INIT: { value: 'lazyInit', enumerable: true },

  /**
   * Defines the attribute name of the 'locale' object in the configuration of the ioc factory and the object definition 'arguments' and 'properties'.
   */
  LOCALE: { value: 'locale', enumerable: true },

  /**
   * Defines the label of the 'lock' property of the object.
   */
  LOCK: { value: 'lock', enumerable: true },

  /**
   * Defines the label of the name in a property object.
   */
  NAME: { value: 'name', enumerable: true },

  /**
   * The name of the 'dependsOn' object definition attribute.
   */
  OBJECT_DEPENDS_ON: { value: 'dependsOn', enumerable: true },

  /**
   * The name of the external object property to register the destroy method name.
   */
  OBJECT_DESTROY_METHOD_NAME: { value: 'destroy', enumerable: true },

  /**
   * The name of the 'factoryLogic' object definition attribute.
   */
  OBJECT_FACTORY_LOGIC: { value: 'factoryLogic', enumerable: true },

  /**
   * The name of the 'factoryMethod' object definition attribute.
   */
  OBJECT_FACTORY_METHOD: { value: 'factoryMethod', enumerable: true },

  /**
   * The name of the 'factoryProperty' object definition attribute.
   */
  OBJECT_FACTORY_PROPERTY: { value: 'factoryProperty', enumerable: true },

  /**
   * The name of the 'factoryReference' object definition attribute.
   */
  OBJECT_FACTORY_REFERENCE: { value: 'factoryReference', enumerable: true },

  /**
   * The name of the 'factoryValue' object definition attribute.
   */
  OBJECT_FACTORY_VALUE: { value: 'factoryValue', enumerable: true },

  /**
   * The name of the 'generates' object definition attribute.
   */
  OBJECT_GENERATES: { value: 'generates', enumerable: true },

  /**
   * The name of the external object property to define the identifier of the object.
   */
  OBJECT_ID: { value: 'id', enumerable: true },

  /**
   * The name of the external object property to register the init method name.
   */
  OBJECT_INIT_METHOD_NAME: { value: 'init', enumerable: true },

  /**
   * Defines the label of the 'listeners' name property of the object.
   */
  OBJECT_LISTENERS: { value: 'listeners', enumerable: true },

  /**
   * The name of the external object property to register the properties.
   */
  OBJECT_PROPERTIES: { value: 'properties', enumerable: true },

  /**
   * Defines the label of the 'receivers' name property of the object.
   */
  OBJECT_RECEIVERS: { value: 'receivers', enumerable: true },

  /**
   * The name of the external object property to define the scope flag of the object.
   */
  OBJECT_SCOPE: { value: 'scope', enumerable: true },

  /**
   * The name of the external object property to define the singleton flag of the object.
   */
  OBJECT_SINGLETON: { value: 'singleton', enumerable: true },

  /**
   * The name of the external object property to define the static factory flag of the object.
   */
  OBJECT_STATIC_FACTORY_METHOD: { value: 'staticFactoryMethod', enumerable: true },

  /**
   * The name of the external object property to define the static property flag of the object.
   */
  OBJECT_STATIC_FACTORY_PROPERTY: { value: 'staticFactoryProperty', enumerable: true },

  /**
   * Defines the label of the 'objects' top-level attribute.
   */
  OBJECTS: { value: 'objects', enumerable: true },

  /**
   * Defines the label of the 'resource' attribute in the imports objects.
   */
  RESOURCE: { value: 'resource', enumerable: true },

  /**
   * Defines the label of the type of the object.
   */
  TYPE: { value: 'type', enumerable: true },

  /**
   * Defines the attribute name of the alias expression in a typeAlias object in the configuration of the ioc factory.
   */
  TYPE_ALIAS: { value: 'alias', enumerable: true },

  /**
   * Defines the attribute name of the 'typeAliases' Array in the configuration of the ioc factory.
   */
  TYPE_ALIASES: { value: 'typeAliases', enumerable: true },

  /**
   * Defines the attribute name of the 'typeExpression' Array in the configuration of the ioc factory.
   */
  TYPE_EXPRESSION: { value: 'typeExpression', enumerable: true },

  /**
   * Defines the label of the reference in a property object.
   */
  REFERENCE: { value: 'ref', enumerable: true },

  /**
   * Defines the label of the value in a property object.
   */
  VALUE: { value: 'value', enumerable: true }
});

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param channel The Logger reference of this entry.
 */
function ObjectArgument(value) {
    var policy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "value";
    var evaluators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    Object.defineProperties(this, {
        /**
         * @private
         */
        _policy: { value: null, writable: true },

        /**
         * Defines the policy of the property.
         */
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

/**
 * @extends Object
 */
ObjectArgument.prototype = Object.create(Object.prototype, {
    constructor: { value: ObjectArgument },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ObjectArgument]';
        } }
});

/**
 * Evaluates a type string expression and return the value who corresponding in the config of the factory.
 * @example
 * <pre>
 * var ConfigEvaluator = system.ioc.evaluators.ConfigEvaluator ;
 * var ObjectConfig = system.ioc.ObjectConfig ;
 *
 * var init =
 * {
 *     message : "hello world" ,
 *     menu    :
 *     {
 *         title : "my title" ,
 *         count : 10 ,
 *         data  : [ "item1" , "item2", "item3" ]
 *     }
 * }
 *
 * var configurator = new ObjectConfig() ;
 *
 * configurator.config = init ;
 *
 * var evaluator = new ConfigEvaluator( configurator ) ;
 *
 * trace( evaluator.eval( "test"       ) ) ; // null
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "menu"       ) ) ; // [object Object]
 * trace( evaluator.eval( "menu.title" ) ) ; // my title
 * trace( evaluator.eval( "menu.count" ) ) ; // 10
 * trace( evaluator.eval( "menu.data"  ) ) ; // item1,item2,item3
 * trace( evaluator.eval( "menu.test"  ) ) ; // null
 * </pre>
 */
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

/**
 * @extends Object
 */
ConfigEvaluator.prototype = Object.create(PropertyEvaluator.prototype, {
    constructor: { value: ConfigEvaluator },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ConfigEvaluator]';
        } }
});

/**
 * Evaluates a type string expression and return the value who corresponding in the config of the factory.
 * @example
 * <pre>
 * var LocaleEvaluator = system.ioc.evaluators.LocaleEvaluator ;
 * var ObjectConfig = system.ioc.ObjectConfig ;
 *
 * var i18n =
 * {
 *     message : "hello world" ,
 *     title   : "my title"    ,
 *     menu    :
 *     {
 *         title : "my menu title" ,
 *         label : "my label"
 *     }
 * }
 *
 * var configurator = new ObjectConfig() ;
 *
 * configurator.locale = i18n ;
 *
 * var evaluator = new LocaleEvaluator( configurator ) ;
 *
 * trace( evaluator.eval( "test"       ) ) ; // null
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "title"      ) ) ; // my title
 * trace( evaluator.eval( "menu.title" ) ) ; // my menu title
 * trace( evaluator.eval( "menu.label" ) ) ; // my label
 * </pre>
 */
function LocaleEvaluator(config /*ObjectConfig*/) {
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

/**
 * @extends Object
 */
LocaleEvaluator.prototype = Object.create(PropertyEvaluator.prototype, {
    constructor: { value: LocaleEvaluator },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[LocaleEvaluator]';
        } }
});

/**
 * Indicates if the specific objet is Lockable and contains the <code>lock()</code> / <code>unlock()</code> / <code>isLocked()</code> methods.
 * @name isLockable
 * @memberof system.process
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Lockable</code>.
 */

function isLockable(target) {
    if (target) {
        if (target instanceof Lockable) {
            return true;
        } else {
            var isLocked = 'isLocked' in target && target.isLocked instanceof Function;
            var lock = 'lock' in target && target.lock instanceof Function;
            var unlock = 'unlock' in target && target.unlock instanceof Function;
            return isLocked && lock && unlock;
        }
    }
    return false;
}

/**
 * This interface is implemented by all objects lockable.
 * @name Lockable
 * @memberof system.process
 * @interface
 */
function Lockable() {
    Object.defineProperties(this, {
        /**
         * @protected
         */
        __lock__: { value: false, writable: true }
    });
}

Lockable.prototype = Object.create(Object.prototype);
Lockable.prototype.constructor = Lockable;

/**
 * Returns <code>true</code> if the object is locked.
 * @return <code>true</code> if the object is locked.
 * @name isLocked
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.isLocked = function () /*void*/
{
    return this.__lock__;
};

/**
 * Locks the object.
 * @name lock
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.lock = function () /*void*/
{
    this.__lock__ = true;
};

/**
 * Unlocks the object.
 * @name unlock
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.unlock = function () /*void*/
{
    this.__lock__ = false;
};

/**
 * Creates the Array of all arguments.
 * @return the Array of all arguments.
 */
function createArguments(a /*Array*/) /*Array*/
{
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
                    args.push(new ObjectArgument(ref, ObjectAttribute.REFERENCE, evaluators)); // ref argument
                } else if (conf !== null && conf.length > 0) {
                    args.push(new ObjectArgument(conf, ObjectAttribute.CONFIG, evaluators)); // config argument
                } else if (i18n !== null && i18n.length > 0) {
                    args.push(new ObjectArgument(i18n, ObjectAttribute.LOCALE, evaluators)); // locale argument
                } else {
                    args.push(new ObjectArgument(value, ObjectAttribute.VALUE, evaluators)); // value argument
                }
            }
        }

        return args.length > 0 ? args : null;
    }
}

/**
 * Enumeration of all sort of "orders" can be use in the object definitions.
 */

var ObjectOrder = Object.defineProperties({}, {
  /**
   * The "after" order value.
   */
  AFTER: { value: "after", enumerable: true },

  /**
   * The "before" order value.
   */
  BEFORE: { value: "before", enumerable: true },

  /**
   * The "none" order value.
   */
  NONE: { value: "none", enumerable: true },

  /**
   * The "now" order value.
   */
  NOW: { value: "now", enumerable: true }
});

/**
 * This object defines a listener definition in an object definition.
 * @param dispatcher The dispatcher expression reference of the listener.
 * @param type type name of the event dispatched by the dispatcher of this listener.
 * @param method The name of the method to invoke when the event is handle.
 * @param useCapture Determinates if the event flow use capture or not.
 * @param order Indicates the order to register the listener "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
function ObjectListener(dispatcher /*String*/, type /*String*/) {
  var method /*Boolean*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var useCapture /*Boolean*/ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var order /*String*/ = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "after";

  Object.defineProperties(this, {
    /**
     * The dispatcher expression reference of the listener.
     */
    dispatcher: { value: dispatcher, writable: true },

    /**
     * The name of the method to invoke when the event is handle.
     */
    method: { value: method, writable: true },

    /**
     * Determinates the order of the receiver registration ('after' or by default 'before').
     */
    order: {
      get: function get() {
        return this._order;
      },
      set: function set(value) {
        this._order = value === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER;
      }
    },

    /**
     * The type name of the event dispatched by the dispatcher.
     */
    type: { value: type, writable: true },

    /**
     * Determinates if the event flow use capture or not.
     */
    useCapture: { value: Boolean(useCapture), writable: true },

    /**
     * @private
     */
    _order: { value: order === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER, writable: true }
  });
}

Object.defineProperties(ObjectListener, {
  /**
   * Defines the "dispatcher" attribute in a listener object definition.
   */
  DISPATCHER: { value: "dispatcher", enumerable: true },

  /**
   * Defines the "method" attribute in a listener object definition.
   */
  METHOD: { value: "method", enumerable: true },

  /**
   * Defines the "order" attribute in a listener object definition.
   */
  ORDER: { value: "order", enumerable: true },

  /**
   * Defines the "useCapture" attribute in a listener object definition.
   */
  USE_CAPTURE: { value: "useCapture", enumerable: true },

  /**
   * Defines the "type" attribute in a listener object definition.
   */
  TYPE: { value: "type", enumerable: true }
});

/**
 * @extends Object
 */
ObjectListener.prototype = Object.create(Object.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectListener },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
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

/**
 * Creates the Array of all listeners defines in the passed-in factory object definition.
 * @return the Array of all listeners defines in the passed-in factory object definition.
 */
function createListeners(factory) /*Array*/
{
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

/**
 * Defines factory strategies in the factory.
 */

function ObjectStrategy() {}

/**
 * @extends Object
 */
ObjectStrategy.prototype = Object.create(Object.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectStrategy, writable: true },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { value: function value() {
      return "[ObjectStrategy]";
    }, writable: true }
});

/**
 * This object defines a property definition in the object definitions.
 * @param name The name of the property.
 * @param value The value of the property.
 * @param policy The policy of the property ( ObjectAttribute.REFERENCE, ObjectAttribute.CONFIG, ObjectAttribute.LOCALE or by default ObjectAttribute.VALUE )
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
function ObjectProperty(name /*String*/, value) {
  var policy /*String*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "value";
  var evaluators /*Array*/ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  Object.defineProperties(this, {
    /**
     * The optional Array representation of all evaluators to transform the value of this object.
     */
    evaluators: { value: evaluators instanceof Array ? evaluators : null, writable: true },

    /**
     * The name of the property.
     */
    name: { value: name, writable: true },

    /**
     * Determinates the order of the receiver registration ('after' or by default 'before').
     */
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

    /**
     * The value of the property.
     */
    value: { value: value, writable: true },

    /**
     * @private
     */
    _policy: { value: null, writable: true }
  });

  this.policy = policy;
}

/**
 * @extends Object
 */
ObjectProperty.prototype = Object.create(ObjectStrategy.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectProperty, writable: true },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { value: function value() {
      return '[ObjectProperty]';
    }, writable: true }
});

/**
 * Creates the Array of all properties defines in the passed-in factory object definition.
 * @return the Array of all properties defines in the passed-in factory object definition.
 */
function createProperties(factory) /*Array*/
{
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
                properties.push(new ObjectProperty(name, createArguments(args), ObjectAttribute.ARGUMENTS)); // arguments property
            } else if ((ref instanceof String || typeof ref === 'string') && ref !== '') {
                properties.push(new ObjectProperty(name, ref, ObjectAttribute.REFERENCE, evaluators)); // ref property
            } else if ((conf instanceof String || typeof conf === 'string') && conf !== '') {
                properties.push(new ObjectProperty(name, conf, ObjectAttribute.CONFIG, evaluators)); // config property
            } else if ((i18n instanceof String || typeof i18n === 'string') && i18n !== '') {
                properties.push(new ObjectProperty(name, i18n, ObjectAttribute.LOCALE, evaluators)); // locale property
            } else {
                properties.push(new ObjectProperty(name, value, ObjectAttribute.VALUE, evaluators)); // value property
            }
        } else {
            if (logger && logger instanceof Logger) {
                logger.warning("ObjectBuilder.createProperties failed, a property definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}", id, i, dump(prop));
            }
        }
    }

    return properties.length > 0 ? properties : null;
}

/**
 * This object defines a receiver definition in an object definition.
 * @param signal The id of the signal in the IoC factory.
 * @param slot The id of the receiver of function to connect in the IoC factory.
 * @param priority Determines the priority level of the receiver.
 * @param autoDisconnect Indicate if the receiver is auto disconnect in the signal when is used.
 * @param order Indicates the order to connect the receiver "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
function ObjectReceiver(signal /*String*/) {
  var slot /*String*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var priority /*int*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var autoDisconnect /*Boolean*/ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var order /*String*/ = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "after";

  Object.defineProperties(this, {
    /**
     * Indicates if the receiver (slot) is auto disconnect by the signal.
     */
    autoDisconnect: { value: autoDisconnect, writable: true },

    /**
     * Determinates the order of the receiver registration ('after' or by default 'before').
     */
    order: {
      get: function get() {
        return this._order;
      },
      set: function set(value) {
        this._order = value === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER;
      }
    },

    /**
     * Determines the priority level of the signal connection.
     */
    priority: { value: priority, writable: true },

    /**
     * The identifier of the signal to connect in the IoC factory.
     */
    signal: { value: signal, writable: true },

    /**
     * The identifier of the receiver of function to connect in the IoC factory.
     */
    slot: { value: slot, writable: true },

    /**
     * @private
     */
    _order: { value: order === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER, writable: true }
  });
}

Object.defineProperties(ObjectReceiver, {
  /**
   * Defines the "autoDisconnect" attribute in a receiver object definition.
   */
  AUTO_DISCONNECT: { value: "autoDisconnect", enumerable: true },

  /**
   * Defines the "order" attribute in a receiver object definition.
   */
  ORDER: { value: "order", enumerable: true },

  /**
   * Defines the "priority" attribute in a receiver object definition.
   */
  PRIORITY: { value: "priority", enumerable: true },

  /**
   * Defines the "signal" attribute in a receiver object definition.
   */
  SIGNAL: { value: "signal", enumerable: true },

  /**
   * Defines the "slot" attribute in a receiver object definition.
   */
  SLOT: { value: "slot", enumerable: true }
});

/**
 * @extends Object
 */
ObjectReceiver.prototype = Object.create(Object.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectReceiver },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
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

/**
 * Creates the Array of all receivers defines in the passed-in factory object definition.
 * @return the Array of all receivers defines in the passed-in factory object definition.
 */
function createReceivers(factory) /*Array*/
{
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

/**
 * This object defines a method definition with a method name and this arguments.
 * @param name The name of the method to invoke.
 * @param arguments The array of the arguments to passed-in the method.
 */
function ObjectMethod(name /*String*/, args /*Array*/) {
  Object.defineProperties(this, {
    /**
     * The optional Array representation of all evaluators to transform the value of this object.
     */
    args: { value: args, writable: true },

    /**
     * The name of the property.
     */
    name: { value: name, writable: true }
  });
}

/**
 * @extends Object
 */
ObjectMethod.prototype = Object.create(ObjectStrategy.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectMethod, writable: true },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { value: function value() {
      return '[ObjectMethod]';
    }, writable: true }
});

/**
 * This object defines a property definition in the object definitions.
 * @param factory The string name of the reference in the factory used to create the object.
 * @param name The name of the static method to invoke to create the object.
 * @param arguments The array of the arguments to passed-in the factory method.
 */
function ObjectFactoryMethod(factory /*String*/, name /*String*/, args /*Array*/) {
    ObjectMethod.call(name, args);
    Object.defineProperties(this, {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        factory: { value: factory, writable: true }
    });
}

Object.defineProperties(ObjectFactoryMethod, {
    /**
     * Returns the ObjectFactoryMethod representation of the specified generic object or null.
     * @return the ObjectFactoryMethod representation of the specified generic object or null.
     */
    build: {
        value: function value(o) /*ObjectFactoryMethod*/
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

/**
 * @extends ObjectMethod
 */
ObjectFactoryMethod.prototype = Object.create(ObjectMethod.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ObjectFactoryMethod, writable: true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[ObjectFactoryMethod]';
        }, writable: true }
});

/**
 * This object defines a property definition in the object definitions.
 * @param factory The string name of the reference in the factory used to create the object.
 * @param name The name of the property.
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
function ObjectFactoryProperty(factory /*String*/, name /*String*/) {
    var evaluators /*Array*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    ObjectProperty.call(name, null, null, evaluators);
    Object.defineProperties(this, {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        factory: { value: factory, writable: true }
    });
}

Object.defineProperties(ObjectFactoryProperty, {
    /**
     * Returns the ObjectFactoryProperty representation of the specified generic object or null.
     * @return the ObjectFactoryProperty representation of the specified generic object or null.
     */
    build: {
        value: function value(o) /*ObjectFactoryProperty*/
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

/**
 * @extends ObjectProperty
 */
ObjectFactoryProperty.prototype = Object.create(ObjectProperty.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ObjectFactoryProperty, writable: true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[ObjectFactoryProperty]';
        }, writable: true }
});

/**
 * This stategy get a reference in the IoC factory if the "factoryReference" attribute is used in the object definition.
 * @param ref {String] The reference id String representation of an objet definition in the factory.
 */
function ObjectReference(ref) {
  Object.defineProperties(this, {
    ref: { value: ref instanceof String || typeof ref === 'string' ? ref : null, writable: true }
  });
}

/**
 * @extends ObjectStrategy
 */
ObjectReference.prototype = Object.create(ObjectStrategy.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectReference },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { value: function value() {
      return '[ObjectReference]';
    } }
});

/**
 * This object create a static proxy factory configured in the ObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param type The type of the static class use to create the object with a static method.
 * @param name The name of the static method to invoke to create the object.
 * @param args The array representation of allt the arguments to call with the object method.
 */
function ObjectStaticFactoryMethod(type /*String*/, name /*String*/, args /*Array*/) {
    ObjectMethod.call(name, args);
    Object.defineProperties(this, {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        type: { value: type, writable: true }
    });
}

Object.defineProperties(ObjectStaticFactoryMethod, {
    /**
     * Returns the ObjectStaticFactoryMethod representation of the specified generic object or null.
     * @return the ObjectStaticFactoryMethod representation of the specified generic object or null.
     */
    build: {
        value: function value(o) /*ObjectStaticFactoryMethod*/
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

/**
 * @extends ObjectMethod
 */
ObjectStaticFactoryMethod.prototype = Object.create(ObjectMethod.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ObjectStaticFactoryMethod, writable: true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[ObjectStaticFactoryMethod]';
        }, writable: true }
});

/**
 * This object create a static proxy factory configured in the IObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param type The type of the static class use to create the object reference with a static property or constant.
 * @param name The name of the static property or constant to invoke to create the object "reference".
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
function ObjectStaticFactoryProperty(name /*String*/, type /*String*/) {
    var evaluators /*Array*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    ObjectProperty.call(name, null, null, evaluators);
    Object.defineProperties(this, {
        /**
         * The string representation of the type name of the static factory class.
         */
        type: { value: type, writable: true }
    });
}

Object.defineProperties(ObjectStaticFactoryProperty, {
    /**
     * Returns the ObjectStaticFactoryProperty representation of the specified generic object or null.
     * @return the ObjectStaticFactoryProperty representation of the specified generic object or null.
     */
    build: {
        value: function value(o) /*ObjectStaticFactoryProperty*/
        {
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

/**
 * @extends ObjectProperty
 */
ObjectStaticFactoryProperty.prototype = Object.create(ObjectProperty.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ObjectStaticFactoryProperty, writable: true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[ObjectStaticFactoryProperty]';
        }, writable: true }
});

/**
 * This stategy object set an object in the IoC factory with an easy value if the attribute "factoryValue" is used in the object definition.
 * @param value The value object.
 */
function ObjectValue(value) {
  Object.defineProperties(this, {
    value: { value: value, writable: true }
  });
}

/**
 * @extends Object
 */
ObjectValue.prototype = Object.create(ObjectStrategy.prototype, {
  /**
   * Returns a reference to the Object function that created the instance's prototype.
   */
  constructor: { value: ObjectValue },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { value: function value() {
      return '[ObjectValue]';
    } }
});

/**
 * This helper create an ObjectStrategy object with a generic object in the IoC context.
 */
function createStrategy(o) /*ObjectStrategy*/
{
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

/**
 * The static enumeration list of all object scopes.
 */

var ObjectScope = Object.defineProperties({}, {
  /**
   * Defines the scope of a single object definition to any number of object instances.
   */
  PROTOTYPE: { value: "prototype", enumerable: true },

  /**
   * Defines the scope of a single object definition to a single object instance per IoC container.
   */
  SINGLETON: { value: "singleton", enumerable: true },

  /**
   * The Array representation of all object scopes constants.
   */
  SCOPES: { value: ["prototype", "singleton"], enumerable: true },

  /**
   * Returns true if the passed value is a valid scope reference.
   * @return true if the passed value is a valid scope reference.
   */
  validate: { value: function value(scope /*String*/) /*Boolean*/
    {
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
        /**
         * Returns the Array of all listener definitions of this object definition register after the object initialization.
         * @return the Array of all listener definitions of this object definition register after the object initialization.
         */
        afterListeners: {
            get: function get() {
                return this._afterListeners;
            }
        },

        /**
         * Returns the Array of all receiver definitions of this object definition register after the object initialization.
         * @return the Array of all receiver definitions of this object definition register after the object initialization.
         */
        afterReceivers: {
            get: function get() {
                return this._afterReceivers;
            }
        },

        /**
         * Returns the Array of all listener definitions of this object definition register before the object initialization.
         * @return the Array of all listener definitions of this object definition register before the object initialization.
         */
        beforeListeners: {
            get: function get() {
                return this._beforeListeners;
            }
        },

        /**
         * Returns the Array of all receiver definitions of this object definition register before the object initialization.
         * @return the Array of all receiver definitions of this object definition register before the object initialization.
         */
        beforeReceivers: {
            get: function get() {
                return this._beforeReceivers;
            }
        },

        /**
         * Returns the constructor arguments values of this object in a Array list.
         * @return the constructor arguments values of this object in a Array list.
         */
        constructorArguments: { value: null, enumerable: true, writable: true },

        /**
         * Defines the "dependsOn" collection.
         */
        dependsOn: {
            enumerable: true,
            get: function get() {
                return this._dependsOn;
            },
            set: function set(ar) {
                this._dependsOn = ar instanceof Array && ar.length > 0 ? ar.filter(this._filterStrings) : null;
            }
        },

        /**
         * Determinates the name of the method invoked when the object is destroyed.
         */
        destroyMethodName: { value: null, enumerable: true, writable: true },

        /**
         * Defines the "generates" collection.
         */
        generates: {
            enumerable: true,
            get: function get() {
                return this._generates;
            },
            set: function set(ar) {
                this._generates = ar instanceof Array && ar.length > 0 ? ar.filter(this._filterStrings) : null;
            }
        },

        /**
         * Indicates the unique identifier value of this object.
         */
        id: { value: id, enumerable: true, writable: true },

        /**
         * Indicates if the object definition is a singleton and the type of the object is Identifiable if the object must be populated with the id of the definition when is instanciated.
         */
        identify: { value: false, enumerable: true, writable: true },

        /**
         * Determinates the name of the method invoked when the object is created.
         */
        initMethodName: { value: null, enumerable: true, writable: true },

        /**
         * Indicates if the object lazily initialized. Only applicable to a singleton object.
         * If false, it will get instantiated on startup by object factories that perform eager initialization of singletons.
         * @return A boolean who indicates if the object lazily initialized.
         */
        lazyInit: {
            get: function get() /*Boolean*/
            {
                return this._lazyInit;
            },
            set: function set(flag) {
                this._lazyInit = flag instanceof Boolean || typeof flag === 'boolean' ? flag : false;
            }
        },

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
         */
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

        /**
         * Indicates if the object definition lock this Lockable object during the population of the properties and the initialization of the methods defines in the object definition.
         */
        lock: { value: false, enumerable: true, writable: true },

        /**
         * Sets the Array representation of all properties of this definition.
         */
        properties: { value: null, enumerable: true, writable: true },

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
         */
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

        /**
         * Indicates if the object in a Sigleton else the object is a prototype (read only, use the scope property to change it).
         */
        singleton: {
            get: function get() /*Boolean*/
            {
                return this._singleton;
            }
        },

        /**
         * Determinates the scope of the object.
         */
        scope: {
            get: function get() {
                return this._scope;
            },
            set: function set(scope) {
                this._scope = ObjectScope.validate(scope) ? scope : ObjectScope.PROTOTYPE;
                this._singleton = Boolean(this._scope === ObjectScope.SINGLETON);
            }
        },

        /**
         * Determinates the factory stategy of this definition to create the object.
         */
        strategy: {
            enumerable: true,
            get: function get() {
                return this._strategy;
            },
            set: function set(strategy) {
                this._strategy = strategy instanceof ObjectStrategy ? strategy : null;
            }
        },

        /**
         * Indicates the type of the object (the function reference of the class name).
         */
        type: { value: type, enumerable: true, writable: true },

        /**
         * @private
         */
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

/**
 * @extends Evaluable
 */
ObjectDefinition.prototype = Object.create(Identifiable.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: Identifiable, enumerable: true, writable: true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return "[ObjectDefinition]";
        } },

    /**
     * @private
     */
    _filterStrings: {
        value: function value(item) /*Boolean*/
        {
            return (typeof item === 'string' || item instanceof String) && item.length > 0;
        }
    }
});

/**
 * Creates a new ObjectDefinition instance and populated it with the specified init object in argument.
 * @param o A generic object to populate the new ObjectDefinition instance.
 * @return An ObjectDefinition instance.
 */
function createObjectDefinition(o) /*ObjectDefinition*/
{
    // console.log( 'createObjectDefinition ------' ) ;
    // console.info( o ) ;
    // console.info( ObjectAttribute.ARGUMENTS ) ;
    // console.info( ObjectAttribute.ARGUMENTS in o ) ;
    // console.log( '----------------------' ) ;
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

/**
 * Indicates if the specific objet is Runnable and contains a <code>run()</code> method.
 * @name isRunnable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Runnable</code>.
 */

function isRunnable(target) {
    if (target) {
        if (target instanceof Runnable) {
            return true;
        }
        return 'run' in target && target.run instanceof Function;
    }
    return false;
}

/**
 * Represents a single command. The base interface for all commands. If only this interface is implemented by a command, it is treated as a synchronous command. For additional features like asynchronous execution, cancellation or suspension, several subinterfaces are available.
 * This interface is used by all internal command executors and builders.
 * @name Runnable
 * @memberof system.process
 * @interface
 */
function Runnable() {}

Runnable.prototype = Object.create(Object.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Runnable },

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Runnable
     * @function
     * @instance
     */
    run: { writable: true, value: function value() {
            // override
        } },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString: { writable: true, value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

/**
 * The enumeration of all phases in a task process.
 * @summary The enumeration of all phases in the {@link system.process.Task|Task} objects.
 * @namespace system.process.TaskPhase
 * @memberof system.process
 */

var TaskPhase = Object.defineProperties({}, {
  /**
   * The 'error' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  ERROR: { value: 'error', enumerable: true },

  /**
   * The 'delayed' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  DELAYED: { value: 'delayed', enumerable: true },

  /**
   * The 'finished' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  FINISHED: { value: 'finished', enumerable: true },

  /**
   * The 'inactive' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  INACTIVE: { value: 'inactive', enumerable: true },

  /**
   * The 'running' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  RUNNING: { value: 'running', enumerable: true },

  /**
   * The 'stopped' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  STOPPED: { value: 'stopped', enumerable: true },

  /**
   * The 'timeout' type.
   * @memberof system.process.TaskPhase
   * @const
   * @type {string}
   */
  TIMEOUT: { value: 'timeout', enumerable: true }
});

/**
 * This abstract class represents the basic definition implemented in the Action objects.
 * @summary This abstract class represents the basic definition implemented in the Action objects.
 * @name Action
 * @class
 * @memberof system.process
 * @augments system.process.Runnable
 * @implements system.process.Runnable
 * @implements system.process.Lockable
 * @constructor
 */
function Action() {
  Object.defineProperties(this, {
    /**
     * This signal emit when the action is finished.
     * @memberof system.process.Action
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    finishIt: { value: new Signal() },

    /**
     * Indicates the current phase.
     * @memberof system.process.Action
     * @type {string}
     * @see {@link system.process.TaskPhase}
     * @instance
     * @readonly
     */
    phase: { get: function get() {
        return this._phase;
      } },

    /**
     * Indicates action is running.
     * @memberof system.process.Action
     * @type {boolean}
     * @instance
     * @readonly
     */
    running: { get: function get() {
        return this._running;
      } },

    /**
     * This signal emit when the action is started.
     * @memberof system.process.Action
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    startIt: { value: new Signal() },

    /**
     * @private
     */
    __lock__: { writable: true, value: false },

    /**
     * @protected
     */
    _phase: { writable: true, value: TaskPhase.INACTIVE },

    /**
     * @protected
     */
    _running: { writable: true, value: false }
  });
}

Action.prototype = Object.create(Runnable.prototype, {
  /**
   * The constructor reference of the instance.
   */
  constructor: { writable: true, value: Action },

  /**
   * Creates a copy of the object.
   * @return a shallow copy of this object.
   * @name clone
   * @memberof system.process.Action
   * @function
   * @instance
   */
  clone: { writable: true, value: function value() {
      return new Action();
    } },

  /**
   * Returns <code>true</code> if the object is locked.
   * @return <code>true</code> if the object is locked.
   * @name isLocked
   * @memberof system.process.Action
   * @function
   * @instance
   */
  isLocked: { writable: true, value: function value() {
      return this.__lock__;
    } },

  /**
   * Locks the object.
   * @name lock
   * @memberof system.process.Action
   * @function
   * @instance
   */
  lock: { writable: true, value: function value() {
      this.__lock__ = true;
    } },

  /**
   * Notify when the process is finished.
   * @name notifyFinished
   * @memberof system.process.Action
   * @function
   * @instance
   */
  notifyFinished: { writable: true, value: function value() {
      this._running = false;
      this._phase = TaskPhase.FINISHED;
      this.finishIt.emit(this);
      this._phase = TaskPhase.INACTIVE;
    } },

  /**
   * Notify when the process is started.
   * @name notifyStarted
   * @memberof system.process.Action
   * @function
   * @instance
   */
  notifyStarted: { writable: true, value: function value() {
      this._running = true;
      this._phase = TaskPhase.RUNNING;
      this.startIt.emit(this);
    } },

  /**
   * Unlocks the object.
   * @name unlock
   * @memberof system.process.Action
   * @function
   * @instance
   */
  unlock: { writable: true, value: function value() {
      this.__lock__ = false;
    } }
});

/**
 * A Task object to create a set of complex commands or actions.
 * @summary An abstract class to create a set of complex commands or actions.
 * @name Task
 * @class
 * @extends system.process.Action
 * @memberof system.process
 * @implements system.process.Lockable
 * @implements system.process.Resetable
 * @implements system.process.Startable
 * @implements system.process.Stoppable
 * @constructor
 */
function Task() {
  Action.call(this);

  Object.defineProperties(this, {
    /**
     * The signal emit when the task is changed.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    changeIt: { value: new Signal() },

    /**
     * The signal emit when the task is cleared.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    clearIt: { value: new Signal() },

    /**
     * The constructor reference of the instance.
     */
    constructor: { value: Task, writable: true },

    /**
     * The signal emit when the task emit a message.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    infoIt: { value: new Signal() },

    /**
     * The flag to determinate if the task must be looped.
     * @memberof system.process.Task
     * @type {boolean}
     * @instance
     * @default false
     */
    looping: { value: false, writable: true },

    /**
     * The signal emit when the task is looped.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    loopIt: { value: new Signal() },

    /**
     * The signal emit when the task is paused.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    pauseIt: { value: new Signal() },

    /**
     * The signal emit when the task is in progress.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    progressIt: { value: new Signal() },

    /**
     * The signal emit when the task is resumed.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    resumeIt: { value: new Signal() },

    /**
     * This signal emit when the task is stopped.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    stopIt: { value: new Signal() },

    /**
     * The signal emit when the task is out of time.
     * @memberof system.process.Task
     * @type {system.signals.Signal}
     * @instance
     * @const
     */
    timeoutIt: { value: new Signal() }
  });
}

Task.prototype = Object.create(Action.prototype);

/**
 * Creates a copy of the object.
 * @name clone
 * @memberof system.process.Task
 * @function
 * @instance
 * @override
 */
Task.prototype.clone = function () {
  return new Task();
};

/**
 * Notify when the process is changed.
 * @name notifyChanged
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyChanged = function () {
  if (!this.__lock__) {
    this.changeIt.emit(this);
  }
};

/**
 * Notify when the process is cleared.
 * @name notifyCleared
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyCleared = function () {
  if (!this.__lock__) {
    this.clearIt.emit(this);
  }
};

/**
 * Notify a specific information when the process is changed.
 * @name notifyInfo
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyInfo = function (info) {
  if (!this.__lock__) {
    this.infoIt.emit(this, info);
  }
};

/**
 * Notify when the process is looped.
 * @name notifyLooped
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyLooped = function () {
  this._phase = TaskPhase.RUNNING;
  if (!this.__lock__) {
    this.loopIt.emit(this);
  }
};

/**
 * Notify when the process is paused.
 * @name notifyPaused
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyPaused = function () {
  this._running = false;
  this._phase = TaskPhase.STOPPED;
  if (!this.__lock__) {
    this.pauseIt.emit(this);
  }
};

/**
 * Notify when the process is progress.
 * @name notifyProgress
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyProgress = function () {
  if (!this.__lock__) {
    this.progressIt.emit(this);
  }
};

/**
 * Notify when the process is resumed.
 * @name notifyResumed
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyResumed = function () {
  this._phase = TaskPhase.RUNNING;
  if (!this.__lock__) {
    this.resumeIt.emit(this);
  }
};

/**
 * Notify when the process is stopped.
 * @name notifyStopped
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyStopped = function () {
  this._running = false;
  this._phase = TaskPhase.STOPPED;
  if (!this.__lock__) {
    this.stopIt.emit(this);
  }
};

/**
 * Notify when the process is out of time.
 * @name notifyTimeout
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.notifyTimeout = function () {
  this._running = false;
  this._phase = TaskPhase.TIMEOUT;
  if (!this.__lock__) {
    this.timeoutIt.emit(this);
  }
};

/**
 * Resumes the task.
 * @name resume
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.resume = function () {};

/**
 * Resets the task.
 * @name reset
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.reset = function () {};

/**
 * Starts the task.
 * @name start
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.start = function () {
  this.run();
};

/**
 * Starts the process.
 * @name stop
 * @memberof system.process.Task
 * @function
 * @instance
 */
Task.prototype.stop = function () {};

/**
 * Creates a container to register all the Object define by the corresponding IObjectDefinition objects.
 */
function ObjectDefinitionContainer() {
    Task.call(this);
    Object.defineProperties(this, {
        /**
         * Indicates the numbers of object definitions registered in the container.
         */
        numObjectDefinition: { get: function get() {
                return this._map.length;
            } },

        /**
         * Registers a new object definition in the container.
         * @param definition The Identifiable ObjectDefinition reference to register in the container.
         * @throws ArgumentError If the specified object definition is null or if this id attribut is null.
         */
        addObjectDefinition: {
            value: function value(definition) {
                if (definition instanceof ObjectDefinition) {
                    this._map.set(definition.id, definition);
                } else {
                    throw new ReferenceError(this + " addObjectDefinition failed, the specified object definition must be an ObjectDefinition object.");
                }
            }
        },

        /**
         * Removes all the object definitions register in the container.
         */
        clearObjectDefinition: {
            value: function value() {
                this._map.clear();
            }
        },

        /**
         * Returns a shallow copy of this object.
         * @return a shallow copy of this object.
         */
        clone: {
            value: function value() {
                return new ObjectDefinitionContainer();
            }
        },

        /**
         * Returns the IObjectDefinition object register in the container with the specified id.
         * @param id the id name of the ObjectDefinition to return.
         * @return the IObjectDefinition object register in the container with the specified id.
         * @throws ArgumentError If the specified object definition don't exist in the container.
         */
        getObjectDefinition: {
            value: function value(id) /*ObjectDefinition*/
            {
                if (this._map.has(id)) {
                    return this._map.get(id);
                } else {
                    throw new ReferenceError(this + " getObjectDefinition failed, the specified object definition don't exist : " + id);
                }
            }
        },

        /**
         * Returns <code class="prettyprint">true</code> if the object defines with the specified id is register in the container.
         * @param id The id of the ObjectDefinition to search.
         * @return <code class="prettyprint">true</code> if the object defines with the specified id is register in the container.
         */
        hasObjectDefinition: {
            value: function value(id) /*Boolean*/
            {
                return this._map.has(id);
            }
        },

        /**
         * Unregisters an object definition in the container.
         * @param id The id of the object definition to remove.
         * @throws ArgumentError If the specified object definition don't exist in the container.
         */
        removeObjectDefinition: {
            value: function value(id) {
                if (this._map.has(id)) {
                    this._map.delete(id);
                } else {
                    throw new ReferenceError(this + " removeObjectDefinition failed, the specified object definition don't exist : " + id);
                }
            }
        },

        /**
         * @private
         */
        _map: { value: new ArrayMap(), writable: true }
    });
}

/**
 * @extends Task
 */
ObjectDefinitionContainer.prototype = Object.create(Task.prototype, {
    constructor: { value: ObjectDefinitionContainer, writable: true },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ObjectDefinitionContainer]';
        }, writable: true }
});

/**
 * The basic Inversion of Control container/factory class.
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
function ObjectFactory() {
    var config /*ObjectConfig*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var objects /*Array*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ObjectDefinitionContainer.call(this);
    Object.defineProperties(this, {
        /**
         * The dispatcher expression reference of the listener.
         */
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

        /**
         * This array contains objects to fill this factory with the run or create method.
         */
        objects: { value: objects instanceof Array ? objects : null, writable: true },

        /**
         * Returns the Map representation of all singletons register in this factory.
         * @return the Map representation of all singletons register in this factory.
         */
        singletons: { get: function get() {
                return this._singletons;
            } },

        /**
         * @private
         */
        bufferSingletons: { value: [], writable: true },

        /**
         * @private
         */
        _config: { value: null, writable: true },

        /**
         * @private
         */
        _evaluator: { value: new MultiEvaluator() },

        /**
         * @private
         */
        _singletons: { value: new ArrayMap() }
    });

    this.config = config;
}

/**
 * @extends Object
 */
ObjectFactory.prototype = Object.create(ObjectDefinitionContainer.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ObjectFactory },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    clone: {
        value: function value() {
            return new ObjectFactory(this.config, [].concat(this.objects));
        }
    },

    /**
     * Indicates if a singleton reference is register in the factory with the specified id.
     * @param The 'id' of the singleton.
     * @return <code class="prettyprint">true</code> if the singleton reference exist in the factory.
     */
    hasSingleton: {
        value: function value(id) /*Boolean*/
        {
            return this._singletons.has(id);
        }
    },

    /**
     * This method returns an object with the specified id in argument.
     * @param id The 'id' of the object to return.
     * @return the instance of the object with the id passed in argument.
     */
    getObject: {
        value: function value(id) {
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

                        this.dependsOn(definition); // dependencies

                        this.populateIdentifiable(instance, definition); // identify

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

                        this.populateProperties(instance, definition); // init properties

                        if (definition.afterListeners instanceof Array && definition.afterListeners.length > 0) {
                            this.registerListeners(instance, definition.afterListeners);
                        }

                        if (definition.afterReceivers instanceof Array && definition.afterReceivers.length > 0) {
                            this.registerReceivers(instance, definition.afterReceivers);
                        }

                        if (flag) {
                            instance.unlock();
                        }

                        this.invokeInitMethod(instance, definition); // init

                        this.generates(definition); // generates
                    }
                }
            } catch (e) {
                this.warn(this + " getObject failed with the id '" + id + "' : " + e.toString());
            }

            return instance || null;
        }
    },

    /**
     * Indicates if the factory is dirty, must flush this buffer of not lazy-init singleton object definitions.
     * The user must execute the run or create methods to flush this buffer.
     */
    isDirty: { value: function value() /*Boolean*/
        {
            return this.bufferSingletons && this.bufferSingletons instanceof Array && this.bufferSingletons.length > 0;
        } },

    /**
     * This method indicates if the specified object definition is lazy init.
     * @param id The 'id' of the object definition to check..
     * @return <code class="prettyprint">true</code> if the specified object definition is lazy init.
     */
    isLazyInit: { value: function value(id) /*Boolean*/
        {
            if (this.hasObjectDefinition(id)) {
                return this.getObjectDefinition(id).lazyInit;
            } else {
                return false;
            }
        } },

    /**
     * This method defined if the scope of the specified object definition is "singleton".
     * @param The 'id' of the object.
     * @return <code class="prettyprint">true</code> if the object is a singleton.
     */
    isSingleton: { value: function value(id) /*Boolean*/
        {
            if (this.hasObjectDefinition(id)) {
                return this.getObjectDefinition(id).singleton;
            } else {
                return false;
            }
        } },

    /**
     * Removes and destroy a singleton in the container.
     * Invoke the <b>'destroy'</b> method of this object is it's define in the <code class="prettyprint">IObjectDefinition</code> of this singleton.
     * @param id The id of the singleton to remove.
      */
    removeSingleton: { value: function value(id) {
            if (this.isSingleton(id) && this._singletons.has(id)) {
                this.invokeDestroyMethod(this._singletons.get(id), this.getObjectDefinition(id));
                this._singletons.delete(id);
            }
        } },

    /**
     * Run the initialization of the factory with new object definitions and create the not lazy-init singleton objects.
     * <p><b>Example :</b></p>
     * <pre class="prettyprint">
     * import flash.text.TextField ;
     * import flash.text.TextFormat ;
     *
     * import system.ioc.ObjectFactory ;
     *
     * var factory:ObjectFactory = new ObjectFactory();
     *
     * factory.objects =
     * [
     *     {
     *         id         : "my_field" ,
     *         type       : "flash.text.TextField" ,
     *         properties :
     *         [
     *             { name:"defaultTextFormat" , value:new TextFormat("Verdana", 11) } ,
     *             { name:"selectable"        , value:false                         } ,
     *             { name:"text"              , value:"hello world"                 } ,
     *             { name:"textColor"         , value:0xF7F744                      } ,
     *             { name:"x"                 , value:100                           } ,
     *             { name:"y"                 , value:100                           }
     *         ]
     *     }
     * ];
     *
     * factory.run();
     *
     * var field:TextField = factory.getObject("my_field") as TextField ;
     *
     * addChild(field) ;
     * </pre>
     */
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

            // flush the buffer of singletons to initialize (no lazyInit)

            if (this.bufferSingletons instanceof Array && this.bufferSingletons.length > 0 && !this._config.lazyInit && !this.isLocked()) {
                var size = this.bufferSingletons.length;
                for (var i = 0; i < size; i++) {
                    this.getObject(this.bufferSingletons[i]);
                }
                this.bufferSingletons = null;
            }

            this.notifyFinished();
        } },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[ObjectFactory]';
        } },

    /**
     * The custom warn method of this factory to log a warning message in the application.
     * You can overrides this method, the prototype object is dynamic.
     */
    warn: { value: function value() {
            if (this.config.useLogger && logger) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                logger.warning.apply(null, args);
            }
        } },

    /**
     * Creates the arguments Array representation of the specified definition.
     * @return the arguments Array representation of the specified definition.
     */
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

    /**
     * Creates a new Object with a specified IObjectFactoryStrategy instance.
     * @return A new Object with a specified IObjectFactoryStrategy instance.
     */
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

    /**
     * Invoked to creates all object in the factory register in the dependsOn collection.
     * <p>All objects in the dependsOn collection are initialized before the initialization of the current object build in the factory.</p>
     */
    dependsOn: { value: function value(definition /*ObjectDefinition*/) {
            if (definition instanceof ObjectDefinition && definition.dependsOn instanceof Array && definition.dependsOn.length > 0) {
                var id;
                var len = definition.dependsOn.length;
                for (var i = 0; i < len; i++) {
                    id = definition.dependsOn[i];
                    if (this.hasObjectDefinition(id)) {
                        this.getObject(id); // not keep in memory
                    }
                }
            }
        } },

    /**
     * Evaluates a value with an Array of evaluators or Evaluable references in the factory.
     * @param value The value to evaluate.
     * @param evaluators The Array who contains IEvaluator objects or String ids who representing a IEvaluator in the factory.
     * @return The new value after evaluation.
     */
    eval: { value: function value(_value) {
            var evaluators /*Array*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

    /**
     * Invoked to creates all object in the factory register in the generates collection.
     * <p>All objects in the generates collection are initialized after the initialization of the current object build in the factory.</p>
     */
    generates: { value: function value(definition /*ObjectDefinition*/) {
            if (definition instanceof ObjectDefinition && definition.generates !== null) {
                var id;
                var ar = definition.generates;
                var len = ar.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        id = ar[i];
                        if (this.hasObjectDefinition(id)) {
                            this.getObject(id); // not keep in memory
                        }
                    }
                }
            }
        } },

    /**
     * Invokes the destroy method of the specified object, if the init method is define in the IDefinition object.
     */
    invokeDestroyMethod: { value: function value(o) {
            var definition /*ObjectDefinition*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

    /**
     * Invokes the init method of the specified object, if the init method is define in the IDefinition object.
     */
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

    /**
     * Populates the <code class="prettyprint">Identifiable</code> singleton object, if the 'identify' flag is true the config of this factory and if specified the <code class="prettyprint">IObjectDefinition</code> object scope is singleton.
     */
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

    /**
     * Populates all properties in the Map passed in argument.
     */
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

    /**
     * Populates a property in the specified object with the passed-in ObjectProperty object.
     * @param o The object to populate.
     * @param prop The ObjectProperty used to populate the object.
     * @param id The id of the current IObjectDefinition.
     */
    populateProperty: { value: function value(o, prop /*ObjectProperty*/, id) {
            if (o === null) {
                this.warn(this + " populate a new property failed, the object not must be 'null' or 'undefined', see the factory with the object definition '" + id + "'.");
                return;
            }

            var name = prop.name;
            var value = prop.value;

            //////////// #init magic strategy to populate the property

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

            //////////// default strategy to populate the property

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

    /**
     * Initialize the listener callback of the specified object.
     */
    registerListeners: { value: function value(o, listeners /*Array*/) {
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

    /**
     * Initialize the receiver callback of the specified object.
     */
    registerReceivers: { value: function value(o) {
            var receivers /*Array*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 */
function ReferenceEvaluator(factory) {
    Object.defineProperties(this, {
        /**
         * The factory reference.
         */
        factory: { value: factory instanceof ObjectFactory ? factory : null, writable: true },

        /**
         * The separator of the expression evaluator.
         */
        separator: { value: ".", writable: true },

        /**
         * The undefineable value returns in the eval method if the expression can't be evaluate.
         */
        undefineable: { value: null, writable: true },

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        throwError: {
            get: function get() {
                return this._propEvaluator.throwError;
            },
            set: function set(flag) {
                this._propEvaluator.throwError = flag;
            }
        },

        /**
         * @private
         */
        _propEvaluator: { value: new PropertyEvaluator(), writable: true }
    });
}

/**
 * @extends Evaluable
 */
ReferenceEvaluator.prototype = Object.create(Evaluable.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: ReferenceEvaluator },

    /**
     * Evaluates the specified object.
     */
    eval: { value: function value(o) {
            if (this.factory instanceof ObjectFactory && (o instanceof String || typeof o === 'string')) {
                var exp = String(o);
                if (exp.length > 0) {
                    var root;

                    try {
                        root = this.factory.config.root;
                    } catch (e) {
                        //
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

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return "[ReferenceEvaluator]";
        } }
});

/**
 * The enumeration of all type policies in the ObjectConfig object of the ioc factory.
 */

var TypePolicy = Object.defineProperties({}, {
  /**
   * Defines the 'alias' TypePolicy value.
   * Use it if you want use only type "alias" evaluation when a new object is created in the factory.
   */
  ALIAS: { value: "alias", enumerable: true },

  /**
   * Defines the 'all' TypePolicy value.
   * Use it if you want use only all evaluation filters when a new object is created in the factory.
   */
  ALL: { value: "all", enumerable: true },

  /**
   * Defines the 'expression' TypePolicy value.
   * Use it if you want use only type "expression" evaluation when a new object is created in the factory.
   */
  EXPRESSION: { value: "expression", enumerable: true },

  /**
   * Defines the 'none' TypePolicy value.
   * Use it if you want no evaluation filter when a new object is created in the factory.
   */
  NONE: { value: "none", enumerable: true }
});

/* jshint evil: true*/

/**
 * Evaluates a type string expression and return the type Class who corresponding in the application.
 * @example
 * <pre>
 * var TypeEvaluator = system.ioc.evaluators.TypeEvaluator ;
 * var ObjectConfig  = system.ioc.ObjectConfig ;
 * var TypePolicy    = system.ioc.TypePolicy ;
 *
 * var conf = new ObjectConfig() ;
 *
 * conf.typePolicy  = TypePolicy.ALL ; // TypePolicy.NONE, TypePolicy.ALIAS, TypePolicy.EXPRESSION
 * conf.typeAliases =
 * [
 *     { alias : "Signal" , type : "system.signals.Signal" }
 * ] ;
 *
 * conf.typeExpression =
 * [
 *     { name:"map"     , value:"system.data.maps" } ,
 *     { name:"ArrayMap" , value:"{map}.ArrayMap"  }
 * ] ;
 *
 * var evaluator = new TypeEvaluator( conf );
 *
 * trace( evaluator.eval( "Signal"      ) ) ; // [class MovieClip]
 * trace( evaluator.eval( "{ArrayMap}"  ) ) ; // [class ArrayMap]
 * trace( evaluator.eval( "test"        ) ) ; // null
 * trace( evaluator.eval( "{map}.Test"  ) ) ; // null
 * </pre>
 */
function TypeEvaluator() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    Object.defineProperties(this, {
        /**
         * The ObjectConfig reference.
         */
        config: { value: config instanceof ObjectConfig ? config : null, writable: true },

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        throwError: { value: false, writable: true }
    });
}

/**
 * @extends Evaluable
 */
TypeEvaluator.prototype = Object.create(Evaluable.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: TypeEvaluator },

    /**
     * Evaluates the specified object.
     */
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

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return "[TypeEvaluator]";
        } }
});

/**
 * This object contains the configuration of the IoC object factory.
 */
function ObjectConfig(init) {
    Object.defineProperties(this, {
        /**
         * The config object reference used in the factory to register values and expressions.
         */
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

        /**
         * Returns the config evaluator reference.
         */
        configEvaluator: {
            get: function get() {
                return this._configEvaluator;
            }
        },

        /**
         * The default name of destroy callback method to invoke with object definition in the ObjectFactory.
         */
        defaultDestroyMethod: { value: null, writable: true, enumerable: true },

        /**
         * The default name of init callback method to invoke with object definition in the ObjectFactory.
         */
        defaultInitMethod: { value: null, writable: true, enumerable: true },

        /**
         * The optional domain used in the factory to creates the objects (by default use core.global if this property is not defined).
         */
        domain: { value: null, writable: true, enumerable: true },

        /**
         * Indicates if the singleton objects in the ObjectFactory are identifiy if the type of the object implements the Identifiable interface.
         */
        identify: { value: false, writable: true, enumerable: true },

        /**
         * Indicates if the factory lock this "run" method and allow the flush of the singletons buffer who must be initialized when the process is finished.
         */
        lazyInit: { value: false, writable: true, enumerable: true },

        /**
         * The locale object of the factory. To evaluate locale expression in the object definitions.
         */
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

        /**
         * Returns the local evaluator reference.
         */
        localeEvaluator: {
            get: function get() {
                return this._localeEvaluator;
            }
        },

        /**
         * Indicates if all the Lockable objects initialized in the object definitions in the factory must be locked during the invokation of this methods and the initialization of this properties.
         */
        lock: { value: false, writable: true, enumerable: true },

        /**
         * The optional parameters object reference.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#params".
         */
        parameters: { value: null, writable: true, enumerable: true },

        /**
         * Indicates the reference evaluator object.
         */
        referenceEvaluator: {
            get: function get() {
                return this._referenceEvaluator;
            }
        },

        /**
         * The root reference of the application.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#root".
         */
        root: { value: null, writable: true, enumerable: true },

        /**
         * The stage reference of the application.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#stage".
         */
        stage: { value: null, writable: true, enumerable: true },

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        throwError: {
            get: function get() {
                return this._configEvaluator.throwError && this._localeEvaluator.throwError && this._typeEvaluator.throwError && this._referenceEvaluator.throwError;
            },
            set: function set(flag /*Boolean*/) {
                this._configEvaluator.throwError = flag;
                this._localeEvaluator.throwError = flag;
                this._referenceEvaluator.throwError = flag;
                this._typeEvaluator.throwError = flag;
            }
        },

        /**
         * Determinates the typeAliases reference of this config object.
         * <p>The setter of this virtual property can be populated with a TypeAliases instance or an Array of typeAliases items.</p>
         * <p>This setter attribute don't remove the old TypeAliases instance but fill it with new aliases.
         * If you want cleanup the aliases of this configuration object you must use the <code class="prettyprint">typeAliases.clear()</code> method.</p>
         * <p>The typeAliases items are generic objects with 2 attributes <b>alias</b> (the alias String expression) and <b>type</b> (the type String expression).</p>
         * @example
         * <pre>
         * var ObjectConfig = system.ioc.ObjectConfig ;
         *
         * var config  = new ObjectConfig() ;
         *
         * config.typeAliases =
         * [
         *     { alias : "Sprite" , type : "flash.display.Sprite" }
         * ] ;
         * </pre>
         */
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

        /**
         * Indicates the type evaluator reference.
         */
        typeEvaluator: {
            get: function get() {
                return this._typeEvaluator;
            }
        },

        /**
         * Determinates the content of the typeExpression reference in this config object.
         * @example Example 1 : basic usage
         * <pre>
         * var ObjectConfig = system.ioc.ObjectConfig ;
         * var ExpressionFormatter = system.formatters.ExpressionFormatter ;
         *
         * var exp = new ExpressionFormatter() ;
         *
         * exp.set( "data"    , "system.data" ) ;
         * exp.set( "maps"    , "{data}.maps" ) ;
         * exp.set( "HashMap" , "{maps}.HashMap" ) ;
         *
         * var config  = new ObjectConfig() ;
         *
         * config.typeExpression = exp ;
         * </pre>
         * @example Example 2 : Use an Array of entries with the name/value members
         * <pre>
         * var ObjectConfig = system.ioc.ObjectConfig ;
         *
         * var expressions =
         * [
         *     { name : "data"    , value : "system.data"    } ,
         *     { name : "maps"    , value : "{data}.maps"    } ,
         *     { name : "HashMap" , value : "{maps}.HashMap" }
         * ];
         *
         * var config = new ObjectConfig() ;
         *
         * config.typeExpression = expressions ;
         * </pre>
         */
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

        /**
         * Indicates the type policy of the object factory who use this configuration object.
         * The default value of this attribute is <code>TypePolicy.NONE</code>.
         * <p>You can use the TypePolicy.NONE, TypePolicy.ALL, TypePolicy.ALIAS, TypePolicy.EXPRESSION values.</p>
         * @see system.ioc.TypePolicy
         */
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

        /**
         * Indicates if the logger model is used in the IoC factory to log the warning and errors.
         */
        useLogger: { value: false, writable: true, enumerable: true },

        /**
         * @private
         */
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

/**
 * @extends Object
 */
ObjectConfig.prototype = Object.create(Object.prototype, {
    constructor: { value: ObjectConfig },

    /**
     * Initialize the config object.
     * @param init A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
     */
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

    /**
     * This method is used to change the target of the internal config dynamic object.
     */
    setConfigTarget: { value: function value() {
            var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this._config = o || {};
        } },

    /**
     * This method is used to change the target of the internal local dynamic object.
     */
    setLocaleTarget: { value: function value() {
            var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this._locale = o || {};
        } },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ObjectConfig]';
        } }
});

/**
 * This collector register a <code>parameters</code> object reference, this object can be use to configurate the application with externals values.
 */
function Parameters(parameters /*Object*/) {
    Object.defineProperties(this, {
        /**
         * Defines the parameters object reference of the application.
         */
        parameters: { value: parameters, writable: true },

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        _evaluators: { value: new MultiEvaluator(), writable: true }
    });

    this._evaluators.autoClear = true;
}

/**
 * @extends Object
 */
Parameters.prototype = Object.create(Object.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: Parameters },

    /**
     * Indicates if the parameters object contains the specified variable.
     */
    contains: { value: function value(name) /*Boolean*/
        {
            return this.parameters && name && name in this.parameters && this.parameters[name] !== null;
        } },

    /**
     * Returns the value of the specified variable in the parameters reference.
     * @param name The name of the variable to resolve in the parameters reference.
     * @param ...rest (optional) All <code class="prettyprint">IEvaluator</code> objects used to evaluate and initialize the value of the specified FlashVars.
     * @example
     * <pre>
     * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
     * var RomanEvaluator    = system.evaluators.RomanEvaluator ;
     * var Parameters        = system.ioc.Parameters ;
     *
     * var obj = { id  : "XII" , metas : { count : 100 } } ;
     *
     * var params = new Parameters( { value : "metas.count" } ) ;
     * var value  = params.get( "value" , new PropertyEvaluator(obj), new RomanEvaluator()) ;
     * trace( "result : " + value ) ;
     * </pre>
     * @return the value of the specified variable in the Parameters object.
     */
    get: { value: function value(name /*String*/) {
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

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[Parameters]';
        } }
});

/**
 * The VEGAS.js framework - The system.errors library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.ioc
 * @memberof system
 */
var ioc = Object.assign({
    // singleton
    logger: logger,

    // classes
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

/*jshint laxbreak: true*/
/**
 * Indicates if the specific objet is Loggable.
 */
function isLoggable(target) {
    if (target) {
        return 'logger' in target && (target.logger === null || target.logger instanceof Logger);
    }
    return false;
}

/**
 * Implementing this interface allows an object who use a <code class="prettyprint">Logger</code> object.
 */
function Loggable() {
    Object.defineProperties(this, {
        _logger: { value: null, writable: true }
    });
}

/**
 * @extends Object
 */
Loggable.prototype = Object.create(Object.prototype, {
    constructor: { value: Loggable },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[Loggable]';
        } },

    /**
     * Determinates the internal <code>Logger</code> reference of this <code>Loggable</code> object.
     */
    logger: {
        get: function get() {
            return this._logger;
        },
        set: function set(logger) {
            this._logger = logger instanceof Logger ? logger : null;
        }
    }
});

/**
 * All logger target implementations that have a formatted line style output should extend this class. It provides default behavior for including date, time, channel, and level within the output.
 * @param init A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
function LineFormattedTarget(init /*Object*/) {
    LoggerTarget.call(this);

    Object.defineProperties(this, {
        _lineNumber: { value: 1, writable: true }
    });

    /**
     * Indicates if the channel for this target should added to the trace.
     */
    this.includeChannel /*Boolean*/ = false;

    /**
     * Indicates if the date should be added to the trace.
     */
    this.includeDate /*Boolean*/ = false;

    /**
     * Indicates if the level for the event should added to the trace.
     */
    this.includeLevel /*Boolean*/ = false;

    /**
     * Indicates if the line for the event should added to the trace.
     */
    this.includeLines /*Boolean*/ = false;

    /**
     * Indicates if the milliseconds should be added to the trace. Only relevant when includeTime is <code class="prettyprint">true</code>.
     */
    this.includeMilliseconds /*Boolean*/ = false;

    /**
     * Indicates if the time should be added to the trace.
     */
    this.includeTime /*Boolean*/ = false;

    /**
     * The separator string.
     */
    this.separator /*String*/ = " ";

    if (init) {
        for (var prop in init) {
            if (this.hasOwnProperty(prop)) {
                this[prop] = init[prop];
            }
        }
    }
}

/**
 * @extends Object
 */
LineFormattedTarget.prototype = Object.create(LoggerTarget.prototype, {
    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param message String containing preprocessed log message which may include time, date, channel, etc.
     * based on property settings, such as <code class="prettyprint">includeDate</code>, <code class="prettyprint">includeChannel</code>, etc.
     */
    internalLog: {
        value: function value(message, level /*LoggerLevel*/) //jshint ignore:line
        {
            // override this method
        }
    },

    constructor: { value: LineFormattedTarget, enumerable: true, writable: true, configurable: true },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[LineFormattedTarget]';
        } },

    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    logEntry: {
        value: function value(entry /*LoggerEntry*/) /*void*/
        {
            var message = this.formatMessage(entry.message, LoggerLevel.getLevelString(entry.level), entry.channel, new Date());
            this.internalLog(message, entry.level);
        }
    },

    /**
     * Resets the internal line number value (set to 1).
     */
    resetLineNumber: {
        value: function value() /*void*/
        {
            this._lineNumber = 1;
        }
    },

    /////////

    /**
     * This method format the passed Date in arguments.
     */
    formatDate: {
        value: function value(d /*Date*/) /*String*/
        {
            var date /*String*/ = "";
            date += this.getDigit(d.getDate());
            date += "/" + this.getDigit(d.getMonth() + 1);
            date += "/" + d.getFullYear();
            return date;
        }
    },

    /**
     * This method format the passed level in arguments.
     */
    formatLevel: {
        value: function value(level /*String*/) /*String*/
        {
            return '[' + level + ']';
        }
    },

    /**
     * This method format the current line value.
     */
    formatLines: {
        value: function value() /*String*/
        {
            return "[" + this._lineNumber++ + "]";
        }
    },

    /**
     * This method format the log message.
     */
    formatMessage: {
        value: function value(message, level /*String*/, channel /*String*/, date /*Date*/) /*String*/
        {
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

    /**
     * This method format the current Date passed in argument.
     */
    formatTime: {
        value: function value(d /*Date*/) /*String*/
        {
            var time /*String*/ = "";
            time += this.getDigit(d.getHours());
            time += ":" + this.getDigit(d.getMinutes());
            time += ":" + this.getDigit(d.getSeconds());
            if (this.includeMilliseconds) {
                time += ":" + this.getDigit(d.getMilliseconds());
            }
            return time;
        }
    },

    /**
     * Returns the string representation of a number and use digit conversion.
     * @return the string representation of a number and use digit conversion.
     */
    getDigit: {
        value: function value(n /*Number*/) /*String*/
        {
            if (isNaN(n)) {
                return "00";
            }
            return (n < 10 ? "0" : "") + n;
        }
    }
});

/**
 * Provides a logger target that uses the global trace() method to output log messages.
 * @param init A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @example
 * var Log           = system.logging.Log ;
 * var LoggerLevel   = system.logging.LoggerLevel ;
 * var ConsoleTarget = system.logging.targets.TraceTarget ;
 *
 * var target = new ConsoleTarget
 * ({
 *     includeChannel      : true  ,
 *     includeDate         : false  ,
 *     includeLevel        : true  ,
 *     includeLines        : true  ,
 *     includeMilliseconds : true  ,
 *     includeTime         : true
 * }) ;
 *
 * target.filters = ["*"] ;
 * target.level   = LoggerLevel.ALL ;
 *
 * var logger = Log.getLogger('test') ;
 *
 * logger.log( "Here is some myDebug info : {0} and {1}", 2.25 , true ) ;
 * logger.debug( "Here is some debug message." ) ;
 * logger.info( "Here is some info message." ) ;
 * logger.warning( "Here is some warn message." ) ;
 * logger.error( "Here is some error message." ) ;
 * logger.critical( "Here is some critical error..." ) ;
 *
 * target.includeDate    = false ;
 * target.includeTime    = false ;
 * target.includeChannel = false ;
 *
 * logger.info( "test : [{0}, {1}, {2}]", 2, 4, 6 ) ;
 */
function ConsoleTarget(init) {
    LineFormattedTarget.call(this, init);
}

/**
 * @extends Object
 */
ConsoleTarget.prototype = Object.create(LineFormattedTarget.prototype, {
    ///////////

    constructor: { value: ConsoleTarget },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return '[ConsoleTarget]';
        } },

    ///////////

    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param message String containing preprocessed log message which may include time, date, channel, etc.
     * based on property settings, such as <code class="prettyprint">includeDate</code>, <code class="prettyprint">includeChannel</code>, etc.
     */
    internalLog: {
        value: function value(message, level /*LoggerLevel*/) //jshint ignore:line
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

/**
 * Provides a logger target that uses the global trace() method to output log messages.
 * @param init A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @example
 * var Log         = system.logging.Log ;
 * var LoggerLevel = system.logging.LoggerLevel ;
 * var TraceTarget = system.logging.targets.TraceTarget ;
 *
 * var target = new TraceTarget
 * ({
 *     includeChannel      : true  ,
 *     includeDate         : false  ,
 *     includeLevel        : true  ,
 *     includeLines        : true  ,
 *     includeMilliseconds : true  ,
 *     includeTime         : true
 * }) ;
 *
 * target.filters = ["*"] ;
 * target.level   = LoggerLevel.ALL ;
 *
 * var logger = Log.getLogger('test') ;
 *
 * logger.log( "Here is some myDebug info : {0} and {1}", 2.25 , true ) ;
 * logger.debug( "Here is some debug message." ) ;
 * logger.info( "Here is some info message." ) ;
 * logger.warning( "Here is some warn message." ) ;
 * logger.error( "Here is some error message." ) ;
 * logger.critical( "Here is some critical error..." ) ;
 *
 * target.includeDate    = false ;
 * target.includeTime    = false ;
 * target.includeChannel = false ;
 *
 * logger.info( "test : [{0}, {1}, {2}]", 2, 4, 6 ) ;
 */
function TraceTarget(init) {
  LineFormattedTarget.call(this, init);
}

/**
 * @extends Object
 */
TraceTarget.prototype = Object.create(LineFormattedTarget.prototype, {
  ///////////

  constructor: { value: TraceTarget },

  /**
   * Returns the String representation of the object.
   * @return the String representation of the object.
   */
  toString: { value: function value() {
      return '[TraceTarget]';
    } },

  ///////////

  /**
   * Descendants of this class should override this method to direct the specified message to the desired output.
   * @param message String containing preprocessed log message which may include time, date, channel, etc.
   * based on property settings, such as <code class="prettyprint">includeDate</code>, <code class="prettyprint">includeChannel</code>, etc.
   */
  internalLog: {
    value: function value(message, level /*LoggerLevel*/) //jshint ignore:line
    {
      trace(message);
    }
  }
});

/**
 * The VEGAS.js framework - The system.logging library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logging
 * @memberof system
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

/**
 * Indicates if the specific objet is a {@link system.rules.Rule} object and contains an <code>eval</code> method.
 * @memberof system.rules
 * @function
 * @param {Object} target - The object to validate.
 * @return <code>true</code> if the object is a {@link system.rules.Rule} instance.
 */

function isRule(target) {
  if (target) {
    return target instanceof Rule || 'eval' in target && target.eval instanceof Function;
  }
  return false;
}

/**
 * Defines the rule to evaluate a basic or complex condition.
 * @name Rule
 * @memberof system.rules
 * @interface
 * @extends Object
 */
function Rule() {}

Rule.prototype = Object.create(Object.prototype, {
  /**
   * The constructor reference.
   */
  constructor: { writable: true, value: Rule },

  /**
   * Evaluates the specified condition.
   * @name eval
   * @memberof system.rules.Rule
   * @function
   * @instance
   */
  eval: { writable: true, value: function value() {
      //
    } },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   * @name toString
   * @memberof system.rules.Rule
   * @function
   * @instance
   */
  toString: { value: function value() {
      return '[' + this.constructor.name + ']';
    } }
});

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name BooleanRule
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( cond1 ) ;
 *
 * trace( cond1.eval() ) ; // true
 * trace( cond2.eval() ) ; // false
 * trace( cond3.eval() ) ; // true
 */
function BooleanRule(condition) {
  Object.defineProperties(this, {
    /**
     * The condition to evaluate.
     * @memberof system.rules.BooleanRule
     * @type {boolean|system.rules.Rule}
     * @instance
     */
    condition: { value: condition, enumerable: true, writable: true }
  });
}

BooleanRule.prototype = Object.create(Rule.prototype);
BooleanRule.prototype.constructor = BooleanRule;

/**
 * Evaluates the specified object.
 * @memberof system.rules.BooleanRule
 * @inheritdoc
 */
BooleanRule.prototype.eval = function () {
  return this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition);
};

/**
 * Defines a conditional rule to defines an <code>elseif</code> block in a {@link system.logics.IfTask|IfTask} reference.
 * @name ElseIf
 * @memberof system.logics
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructor
 * @param {system.rules.Rule} [rule=null] - The condition to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the condition is <code>true</code>.
 */
function ElseIf() {
  var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  /**
   * The condition to evaluate.
   * @memberof system.rules.ElseIf
   * @name rule
   * @type system.rules.Rule
   * @instance
   * @default null
   */
  this.rule = rule instanceof Rule ? rule : new BooleanRule(rule);

  /**
   * The {@link system.process.Action|Action} to execute if the condition is <code>true</code>.
   * @memberof system.rules.ElseIf
   * @name then
   * @type system.process.Action
   * @instance
   * @default null
   */
  this.then = then;
}

ElseIf.prototype = Object.create(Rule.prototype, {
  /**
   * The constructor reference.
   */
  constructor: { value: ElseIf, writable: true },

  /**
   * Evaluates the specified object.
   * @name eval
   * @memberof system.rules.ElseIf
   * @function
   * @instance
   */
  eval: { writable: true, value: function value() {
      if (this.rule && this.rule instanceof Rule) {
        return this.rule.eval();
      } else {
        return false;
      }
    } }
});

/**
 * Evaluates if the value is an empty String.
 * @name EmptyString
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {string} value - The value to evaluate.
 * @example
 * var EmptyString = system.rules.EmptyString ;
 *
 * var cond1 = new EmptyString( null ) ;
 * var cond2 = new EmptyString( "" ) ;
 * var cond3 = new EmptyString( "hello" ) ;
 *
 * trace( cond1.eval() ) ; // false
 * trace( cond2.eval() ) ; // true
 * trace( cond3.eval() ) ; // false
 */
function EmptyString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  /**
   * @memberof system.rules.EmptyString
   * @name value
   * @type {string}
   * @instance
   */
  this.value = value;
}

EmptyString.prototype = Object.create(Rule.prototype);
EmptyString.prototype.constructor = EmptyString;

/**
 * Evaluates the specified object.
 * @memberof system.rules.EmptyString
 * @inheritdoc
 */
EmptyString.prototype.eval = function () {
  return this.value === "";
};

/**
 * Evaluates if the value is an empty String.
 * @name ElseIfEmptyString
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} [value=null] - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is an empty <code>string</code>.
 * @see system.rules.EmptyString
 */
function ElseIfEmptyString() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ElseIf.call(this, new EmptyString(value), then);
}

ElseIfEmptyString.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfEmptyString }
});

/**
 * Used to perform a logical conjunction on two conditions and more.
 * @name Equals
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {Object|system.rules.Rule|system.Equatable} [value1=null] - The first value to evaluate.
 * @param {Object|system.rules.Rule|system.Equatable} [value2=null] - The second value to evaluate.
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 * var Equals      =  system.rules.Equals ;
 *
 * var e ;
 *
 * ///// Compares objects.
 *
 * e = new Equals( 1 , 1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( 1 , 2 ) ;
 * trace( e.eval() ) ; // false
 *
 * ///// Compares Rule objects.
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( true  ) ;
 *
 * e = new Equals( cond1 , cond1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( cond1 , cond2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( cond1 , cond3 ) ;
 * trace( e.eval() ) ; // true
 *
 * ///// Compares Equatable objects.
 *
 * var equals = function( o )
 * {
 *     return this.id === o.id ;
 * }
 *
 * var o1 = { id:1 , equals:equals } ;
 * var o2 = { id:2 , equals:equals } ;
 * var o3 = { id:1 , equals:equals } ;
 *
 * e = new Equals( o1 , o1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( o1 , o2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( o1 , o3 ) ;
 * trace( e.eval() ) ; // true
 */
function Equals() {
    var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    /**
     * The first value to evaluate.
     * @memberof system.rules.Equals
     * @name value1
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value1 = value1;
    /**
     * The second value to evaluate.
     * @memberof system.rules.Equals
     * @name value2
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value2 = value2;
}

Equals.prototype = Object.create(Rule.prototype);
Equals.prototype.constructor = Equals;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Equals
 * @inheritdoc
 */
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

/**
 * Defines an equality between two values in an <elseif> conditional block.
 * @name ElseIfEquals
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} [value1] - The condition to evaluate.
 * @param {Object} [value2] - The condition to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the two values are equals.
 * @see system.rules.Equals
 */
function ElseIfEquals(value1, value2) {
    var then = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    ElseIf.call(this, new Equals(value1, value2), then);
}

ElseIfEquals.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfEquals }
});

/**
 * Evaluates if the condition is false.
 * @name False
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {boolean|system.rules.Rule} value - The value to evaluate.
 * @example
 * var False = system.rules.False ;
 *
 * var cond1 = new False( true  ) ;
 * var cond2 = new False( false ) ;
 * var cond3 = new False( cond1 ) ;
 * var cond4 = new False( cond2 ) ;
 *
 * trace( cond1.eval() ) ; // false
 * trace( cond2.eval() ) ; // true
 * trace( cond3.eval() ) ; // true
 * trace( cond4.eval() ) ; // false
 */
function False() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  /**
   * The condition to evaluate.
   * @memberof system.rules.False
   * @name value
   * @type {boolean|system.rules.Rule}
   * @instance
   * @default false
   */
  this.condition = condition;
}

False.prototype = Object.create(Rule.prototype);
False.prototype.constructor = False;

/**
 * Evaluates the specified object.
 * @memberof system.rules.False
 * @inheritdoc
 */
False.prototype.eval = function () {
  return (this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition)) === false;
};

/**
 * Defines if condition is <code>false</code> in an <elseif> conditional block.
 * @name ElseIfFalse
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>false</code>.
 * @see system.rules.False
 */
function ElseIfFalse(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ElseIf.call(this, new False(value), then);
}

ElseIfFalse.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfFalse }
});

/* jshint eqnull: true */
/**
 * Evaluates if the condition is null.
 * @name Null
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {object} [value=null] - The value to evaluate.
 * @param {boolean} [strict=false] - This flag indicates if the condition use <code>==</code> or <code>===</code> to evalute the value.
 * @example
 * var Null = system.rules.Null ;
 *
 * var cond ;
 *
 * cond = new Null( undefined , true ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Null( undefined ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Null( null ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Null( "hello" ) ;
 * trace( cond.eval() ) ; // false
 */
function Null() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  /**
   * The value to evaluate.
   * @memberof system.rules.Null
   * @name value
   * @type {object}
   * @instance
   * @default undefined
   */
  this.value = value;

  /**
   * The value to evaluate.
   * @memberof system.rules.Null
   * @name strict
   * @type {boolean}
   * @instance
   * @default false
   */
  this.strict = Boolean(strict);
}

Null.prototype = Object.create(Rule.prototype);
Null.prototype.constructor = Null;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Null
 * @inheritdoc
 */
Null.prototype.eval = function () {
  if (this.strict) {
    return this.value === null;
  } else {
    return this.value == null;
  }
};

/**
 * Defines if a value is <code>null</code> in an <elseif> conditional block.
 * @name ElseIfNull
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>null</code>.
 * @param {boolean} [strict=false] - This flag indicates if the condition use <code>==</code> or <code>===</code> to evalute the value.
 * @see system.rules.Null
 */
function ElseIfNull(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    ElseIf.call(this, new Null(value, strict), then);
}

ElseIfNull.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfNull }
});

/**
 * Evaluates if the condition is true.
 * @name True
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {boolean|system.rules.Rule} value - The value to evaluate.
 * @example
 * var True = system.rules.True ;
 *
 * var cond1 = new True( true  ) ;
 * var cond2 = new True( false ) ;
 * var cond3 = new True( cond1 ) ;
 * var cond4 = new True( cond2 ) ;
 *
 * trace( cond1.eval() ) ; // true
 * trace( cond2.eval() ) ; // false
 * trace( cond3.eval() ) ; // true
 * trace( cond4.eval() ) ; // false
 * </pre>
 */
function True() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  /**
   * The condition to evaluate.
   * @memberof system.rules.True
   * @name value
   * @type {boolean|system.rules.Rule}
   * @instance
   * @default false
   */
  this.condition = condition;
}

True.prototype = Object.create(Rule.prototype);
True.prototype.constructor = True;

/**
 * Evaluates the specified object.
 * @memberof system.rules.True
 * @inheritdoc
 */
True.prototype.eval = function () {
  return (this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition)) === true;
};

/**
 * Defines if condition is <code>true</code> in an <elseif> conditional block.
 * @name ElseIfTrue
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>true</code>.
 * @see system.rules.True
 */
function ElseIfTrue(condition) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ElseIf.call(this, new True(condition), then);
}

ElseIfTrue.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfTrue }
});

/* jshint eqnull: true */
/**
 * Evaluates if the condition is undefined.
 * @name Undefined
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {object} [value=undefined] - The value to evaluate.
 * @example
 * var Undefined = system.rules.Undefined ;
 * trace( (new Undefined( undefined )).eval() ) ; // true
 * trace( (new Undefined( 'hello'   )).eval() ) ; // true
 */
function Undefined() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

  /**
   * The value to evaluate.
   * @memberof system.rules.Undefined
   * @name value
   * @type {object}
   * @instance
   * @default undefined
   */
  this.value = value;
}

Undefined.prototype = Object.create(Rule.prototype);
Undefined.prototype.constructor = Undefined;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Undefined
 * @inheritdoc
 */
Undefined.prototype.eval = function () {
  return this.value === undefined;
};

/**
 * Defines if a value is <code>undefined</code> in an <elseif> conditional block.
 * @name ElseIfUndefined
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the values is <code>undefined</code>.
 * @see system.rules.Undefined
 */
function ElseIfUndefined(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ElseIf.call(this, new Undefined(value), then);
}

ElseIfUndefined.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfUndefined }
});

/**
 * Evaluates if the condition is undefined.
 * @name Zero
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value=Nan] - The value to evaluate.
 * @example
 * var Zero = system.rules.Zero ;
 * trace( (new Zero( 0 )).eval() ) ; // true
 * trace( (new Zero( 1 )).eval() ) ; // false
 * trace( (new Zero( 'test' )).eval() ) ; // false
 */
function Zero() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;

  /**
   * The condition to evaluate.
   * @memberof system.rules.True
   * @name value
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value = value;
}

Zero.prototype = Object.create(Rule.prototype);
Zero.prototype.constructor = Zero;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Zero
 * @inheritdoc
 */
Zero.prototype.eval = function () {
  return this.value === 0;
};

/**
 * Defines if a value <code>=== 0</code> in an <elseif> conditional block.
 * @name ElseIfZero
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the values equals <code>0</code>.
 * @see system.rules.Zero
 */
function ElseIfZero(value) {
    var then = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    ElseIf.call(this, new Zero(value), then);
}

ElseIfZero.prototype = Object.create(ElseIf.prototype, {
    constructor: { writable: true, value: ElseIfZero }
});

/**
 * Perform some tasks based on whether a given condition holds true or not.
 * @name IfTask
 * @memberof system.logics
 * @implements system.process.Action
 * @augments system.process.Action
 * @class
 * @constructor
 * @example <caption><strong>Usage </strong>:</caption>
 * var task = new IfTask( rule:Rule    , thenTask:Action , elseTask:Action , ...elseIfTasks )
 * var task = new IfTask( rule:Boolean , thenTask:Action , elseTask:Action , ...elseIfTasks )
 * @example <caption><strong>Basic example </strong>:</caption>
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
 * @param {system.rules.Rule} rule - The initial condition.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
function IfTask() // jshint ignore:line
{
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var thenTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elseTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    Action.call(this);

    Object.defineProperties(this, {
        /**
         * This signal emit when the action failed.
         * @memberof system.logics.IfTask
         * @type {system.signals.Signal}
         * @instance
         * @readonly
         */
        errorIt: { value: new Signal() },

        /**
         * Indicates if the class throws errors or notify a finished event when the task failed.
         * @memberof system.logics.IfTask
         * @type {boolean}
         * @default false
         * @instance
         */
        throwError: { value: false, writable: true, enumerable: true },

        /**
         * @private
         */
        _done: { value: false, writable: true },

        /**
         * @private
         */
        _elseIfTasks: { value: [] },

        /**
         * @private
         */
        _elseTask: {
            value: elseTask instanceof Action ? elseTask : null,
            writable: true
        },

        /**
         * @private
         */
        _rule: {
            value: rule instanceof Rule ? rule : new BooleanRule(rule),
            writable: true
        },

        /**
         * @private
         */
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
    /**
     * The constructor reference.
     */
    constructor: { writable: true, value: IfTask },

    /**
     * The collection of condition/action invokable if the main rule is not true.
     * @memberof system.logics.IfTask
     * @type {array}
     * @instance
     * @readonly
     */
    elseIfTask: { get: function get() {
            return this._elseIfTask;
        } },

    /**
     * The action invoked if all the conditions failed.
     * @memberof system.logics.IfTask
     * @type {system.process.Action}
     * @instance
     * @readonly
     */
    elseTask: { get: function get() {
            return this._elseTask;
        } },

    /**
     * The rule reference of this task.
     * @memberof system.logics.IfTask
     * @type {system.rules.Rule}
     * @instance
     */
    rule: {
        get: function get() {
            return this._rule;
        },
        set: function set(rule) {
            this._rule = rule instanceof Rule ? rule : new BooleanRule(rule);
        }
    },

    /**
     * The action to execute if the main condition if <code>true</code>.
     * @memberof system.logics.IfTask
     * @type {system.process.Action}
     * @instance
     */
    thenTask: { get: function get() {
            return this._thenTask;
        } },

    /**
     * Defines the action when the condition block use the else condition.
     * @name addElse
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.process.Action} action The action to defines with the else condition in the {system.logics.IfTask} reference.
     * @return The current IfTask reference.
     * @throws Error if an 'else' action is already register.
     */
    addElse: { value: function value(action) {
            if (this._elseTask) {
                throw new Error(this + " addElse failed, you must not nest more than one <else> into <if>");
            } else if (action instanceof Action) {
                this._elseTask = action;
            }
            return this;
        } },

    /**
     * Defines an action when the condition block use the elseif condition.
     * @name addElseIf
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {...system.logics.ElseIf|system.rules.Rule|system.process.Action} condition - A {system.logics.ElseIf} instance or a serie of {system.rules.Rule}/{system.process.Action}.
     * @return The current IfTask reference.
     * @example
     *
     * var IfTask      = system.logics.IfTask ;
     * var Do          = system.process.Do ;
     * var ElseIf      = system.logics.ElseIf ;
     * var EmptyString = system.rules.EmptyString ;
     * var Equals      = system.rules.Equals ;
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
     * var task = new IfTask() ;
     *
     * task.addRule( new Equals(1,2) )
     *     .addThen( do1 )
     *     .addElseIf
     *     (
     *         new ElseIf( new Equals(2,1) , do3 ) ,
     *         new Equals(2,2) , do4
     *     )
     *     .addElse( do2 )
     *     .run() ; // do4 ###
     */
    addElseIf: { value: function value() /*IfTask*/
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

    /**
     * Defines the main conditional rule of the task.
     * @name addRule
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.rules.Rule} rule - The main <code>Rule</code> of the task.
     * @return The current IfTask reference.
     * @throws Error if a 'condition' is already register.
     */
    addRule: { value: function value(rule) /*IfTask*/
        {
            if (this._rule) {
                throw new Error(this + " addRule failed, you must not nest more than one <condition> into <if>");
            } else {
                this._rule = rule instanceof Rule ? rule : new BooleanRule(rule);
            }
            return this;
        } },

    /**
     * Defines the action when the condition block success and must run the 'then' action.
     * @name addThen
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.process.Action} action - Defines the '<b>then</b>' action in the <code>IfTask</code> reference.
     * @return The current <code>IfTask</code> reference.
     * @throws <code>Error</code> if the 'then' action is already register.
     */
    addThen: { value: function value(action) {
            if (this._thenTask) {
                throw new Error(this + " addThen failed, you must not nest more than one <then> into <if>");
            } else if (action instanceof Action) {
                this._thenTask = action;
            }
            return this;
        } },

    /**
     * Clear all elements conditions and conditional tasks in the process.
     * @name clear
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    clear: { value: function value() {
            this._rule = null;
            this._elseIfTasks.length = 0;
            this._elseTask = null;
            this._thenTask = null;
            return this;
        } },

    /**
     * Removes the 'elseIf' action.
     * @name deleteElseIf
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    deleteElseIf: { value: function value() /*IfTask*/
        {
            this._elseIfTasks.length = 0;
            return this;
        } },

    /**
     * Removes the 'else' action.
     * @name deleteElse
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    deleteElse: { value: function value() /*IfTask*/
        {
            this._elseTask = null;
            return this;
        } },

    /**
     * Removes the 'rule' of the task.
     * @return The current IfTask reference.
     */
    deleteRule: { value: function value() /*IfTask*/
        {
            this._rule = null;
            return this;
        } },

    /**
     * Removes the 'then' action.
     * @return The current IfTask reference.
     */
    deleteThen: { value: function value() /*IfTask*/
        {
            this._thenTask = null;
            return this;
        } },

    /**
     * Notify when the process is started.
     * @name notifyError
     * @memberof system.logics.IfTask
     * @function
     * @instance
     */
    notifyError: { value: function value(message) /*void*/
        {
            this._running = false;
            this._phase = TaskPhase.ERROR;
            this.errorIt.emit(message, this);
            if (this.throwError) {
                throw new Error(message);
            }
        } },

    /**
     * Run the process.
     * @memberof system.logics.IfTask
     */
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

    // ---------- private

    /**
     * @private
     */
    _execute: { value: function value(action /*Action*/) {
            if (action instanceof Action) {
                action.finishIt.connect(this._finishTask.bind(this), 1, true);
                action.run();
            }
        } },

    /**
     * @private
     */
    _finishTask: {
        value: function value() {
            this._done = true;
            this.notifyFinished();
        }
    }
});

/**
 * Perform some tasks based on whether a given value is an empty string <code>""</code>.
 * @name IfEmptyString
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.EmptyString
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
function IfEmptyString(value) // jshint ignore:line
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

/**
 * Perform some tasks based on whether a given condition holds equality of two values.
 * @name IfEquals
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Equals
 * @param {Object} value1 - The first value to evaluate.
 * @param {Object} value2 - The second value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
function IfEquals(value1, value2) // jshint ignore:line
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

/**
 * Performs some tasks based on whether a given condition holds false.
 * @name IfFalse
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.False
 * @param {Object} condition - The object to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

 */
function IfFalse(condition) // jshint ignore:line
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

/**
 * Perform some tasks based on whether a given value is <code>null</code>.
 * @name IfNull
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Null
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

 */
function IfNull(value) // jshint ignore:line
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

/**
 * Perform some tasks based on whether a given condition holds true.
 * @name IfTrue
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.True
 * @param {Object} condition - The object to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

 */
function IfTrue(condition) // jshint ignore:line
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

/**
 * Perform some tasks based on whether a given value is undefined.
 * @name IfUndefined
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Undefined
 * @param {Object} condition - The object to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
function IfUndefined(value) // jshint ignore:line
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

/**
 * Perform some tasks based on whether a given value is <code>0</code>.
 * @name IfZero
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Zero
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
function IfZero(value) // jshint ignore:line
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 *  The Model interface defines all models in the application.
 */
function Model() {}

/**
 * @extends Lockable
 */
Model.prototype = Object.create(Lockable.prototype, {
  /**
   * The constructor reference of the instance.
   */
  constructor: { writable: true, value: Model },

  /**
   * Returns true if the specific value is valid.
   * @return true if the specific value is valid.
   */
  supports: { writable: true, value: function value(_value) {
      return _value === _value;
    } },

  /**
   * Returns the string representation of this instance.
   * @return the string representation of this instance.
   */
  toString: { writable: true, value: function value() {
      return '[' + this.constructor.name + ']';
    } },

  /**
   * Evaluates the specified value and throw an Error object if the value is not valid.
   * @throws Error if the value is not valid.
   */
  validate: { writable: true, value: function value(_value2) /*void*/
    {
      if (!this.supports(_value2)) {
        throw new Error(this + " validate(" + _value2 + ") is mismatch.");
      }
    } }

});

/**
 * This model can keep an object in memory and emit messages if this object is changing.
 * @example
 * <pre>
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
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * model.current = "hello" ;
 * model.current = "world" ;
 * model.current = null ;
 * </pre>
 */
function ChangeModel() {
    Object.defineProperties(this, {
        /**
         * Emits a message before the current object in the model is changed.
         */
        beforeChanged: { value: new Signal() },

        /**
         * Emits a message when the current object in the model is changed.
         */
        changed: { value: new Signal() },

        /**
         * Emits a message when the current object in the model is cleared.
         */
        cleared: { value: new Signal() },

        /**
         * This property defined if the current property can accept the same object in argument as the current one.
         */
        security: { value: true, writable: true },

        /**
         * @private
         */
        _current: { value: null, writable: true }
    });
}

/**
 * @extends Model
 */
ChangeModel.prototype = Object.create(Model.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: ChangeModel },

    /**
     * Determinates the selected value in this model.
     */
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

    /**
     * Clear the model.
     */
    clear: { writable: true, value: function value() {
            this._current = null;
            this.notifyClear();
        } },

    /**
     * Notify a signal before the specified value is changed.
     */
    notifyBeforeChange: { value: function value(_value) {
            if (!this.isLocked()) {
                this.beforeChanged.emit(_value, this);
            }
        } },

    /**
     * Notify a signal when the model is changed.
     */
    notifyChange: { value: function value(_value2) {
            if (!this.isLocked()) {
                this.changed.emit(_value2, this);
            }
        } },

    /**
     * Notify a signal when the model is cleared.
     */
    notifyClear: { value: function value() {
            if (!this.isLocked()) {
                this.cleared.emit(this);
            }
        } }
});

/**
 * This model can keep an object in memory and emit messages if this object is changing.
 * @example
 * <pre>
 * var model = new MemoryModel();
 *
 * var beforeChanged = function( value , model )
 * {
 *     trace( "[-] before:" + value + " current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "[+] change:" + value + " current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * trace( "-- history" ) ;
 *
 * model.current = "home" ;
 * model.current = "near" ;
 * model.current = "search" ;
 * model.current = "place" ;
 * model.current = "events" ;
 * model.current = "map" ;
 * model.current = "test" ;
 *
 * trace( "-- back" ) ;
 *
 * trace( "back() : " + model.back() ) ;
 *
 * trace( "-- backTo(3)" ) ;
 *
 * trace( "backTo(3) : " + model.backTo( 3 ) ) ;
 *
 * trace( "-- home" ) ;
 *
 * trace( 'home() : ' + model.home() ) ;
 *
 * trace( "--" ) ;
 *
 * model.clear() ;
 * </pre>
 */
function MemoryModel() {
    ChangeModel.call(this);

    Object.defineProperties(this, {
        /**
         * Indicates if the model throws errors.
         */
        enableErrorChecking: { writable: true, value: false },

        /**
         * @private
         */
        header: { value: new MemoryEntry(), writable: true },

        /**
         * @private
         */
        _reduced: { value: false, writable: true },

        /**
         * @private
         */
        size: { value: 0, writable: true }
    });

    this.header.next = this.header.previous = this.header;
}

/**
 * @extends ChangeModel
 */
MemoryModel.prototype = Object.create(ChangeModel.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: MemoryModel },

    /**
     * Determinates the selected value in this model.
     */
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

    /**
     * Indicates the number of elements in memory model.
     */
    length: { get: function get() {
            return this.size;
        } },

    /**
     * Indicates in the beforeChange signal if the model is reduced (use the back or the backTo method).
     * This property is true only before the change of the new position in the model.
     */
    reduced: { get: function get() {
            return this._reduced;
        } },

    /**
     * Go back in the memory and removes the last element in the memory model.
     * @return The last removed element in the memory.
     */
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

    /**
     * Go back in the memory and removes the all the element in the memory model to a specific position.
     * @param pos The position to back in memory.
     * @return The Array representation of all removed element in memory.
     */
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

    /**
     * Clear the model.
     */
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

    /**
     * Returns the first element in memory.
     * @return the first element in this list.
     * @throws NoSuchElementError if this list is empty.
     */
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

    /**
     * Go home, select the first element in the memory and remove all other elements. This method work only if the memory length is greater than 1.
     * @return The last removed element in the memory.
     */
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

    /**
     * Returns <code class="prettyprint">true</code> if this memory model is empty.
     * @return <code class="prettyprint">true</code> if this memory model is empty.
     */
    isEmpty: { value: function value() {
            return this.size === 0;
        } },

    /**
     * Returns the last element in memory.
     * @return the last element in this list.
     * @throws NoSuchElementError if this list is empty.
     */
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

    // ------- protected

    /**
     * Appends the specified element to the end of this list.
     * @param element The element to be appended to this list.
     * @private
     */
    add: { value: function value(element) {
            this.addBefore(element, this.header);
            return element;
        } },

    /**
     * Inserts the given element in the memory before the given entry.
     * @private
     */
    addBefore: { value: function value(element, entry) {
            var e = new MemoryEntry(element, entry, entry.previous);
            e.previous.next = e;
            e.next.previous = e;
            this.size++;
            return e;
        } },

    /**
     * Removes a specific entry in memory.
     * @private
     */
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

    /**
     * Removes and returns the last element from this list.
     * @return The last removed element from this list.
     * @private
     */
    removeLast: { value: function value() {
            return this.removeEntry(this.header.previous);
        } }
});

// internal

/**
 * Internal class in the <code>MemoryModel</code> class to defined all entries in the internal memory and the links betweens alls.
 */
function MemoryEntry() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var next /*MemoryEntry*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var previous /*MemoryEntry*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    /**
     * The element of this entry.
     */
    this.element = element;

    /**
     * The next entry.
     */
    this.next = next;

    /**
     * The previous entry.
     */
    this.previous = previous;
}

/**
 * This model use an internal <code>Array</code> to register objects.
 * @example
 * <pre>
 * var o1 = { id : "key1" } ;
 * var o2 = { id : "key2" } ;
 * var o3 = { id : "key3" } ;
 * var o4 = { id : "key4" } ;
 * var o5 = { id : "key5" } ;
 * var o6 = { id : "key6" } ;
 *
 * var model = new ArrayModel();
 *
 * var added = function( index , value , model )
 * {
 *     trace( model + " added(" + index + ") value:" + dump(value) ) ;
 * }
 *
 * var beforeChanged = function( value , model )
 * {
 *     trace( "[-] before:" + value + " current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "[+] change:" + value + " current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var removed = function( index , old , model )
 * {
 *     trace( model + " removed(" + index + ") old:" + dump(old) ) ;
 * }
 *
 * var updated = function( index , old , model )
 * {
 *     trace( model + " updated(" + index + ") old:" + dump(old) ) ;
 * }
 *
 * model.added.connect( added ) ;
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 * model.removed.connect( removed ) ;
 * model.updated.connect( updated ) ;
 *
 * model.add( o1 ) ;
 * model.add( o2 ) ;
 * model.add( o3 ) ;
 * model.add( o4 ) ;
 * model.add( o5 ) ;
 * model.add( o6 ) ;
 *
 * trace( "model length:" + model.length ) ;
 *
 * trace( "model.get(0) == o1 : " + dump( model.get(0)) ) ;
 * trace( "model.get(1) == o4 : " + dump( model.get(1)) ) ;
 *
 * model.updateAt( 0 , o4 ) ;
 * trace( "model.get(0) == o1 : " + dump( model.get(0)) ) ;
 *
 * model.current = o1 ;
 * model.current = o2 ;
 *
 * model.removeAt( 0 ) ;
 * model.removeAt( 0 , 2 ) ;
 * model.remove( o6 ) ;
 *
 * trace( "model length:" + model.length ) ;
 *
 * model.clear() ;
 * </pre>
 */
function ArrayModel() {
    var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    ChangeModel.call(this);

    Object.defineProperties(this, {
        /**
         * Emits a message when an entry is added in the model.
         */
        added: { value: new Signal() },

        /**
         * Emits a message when an entry is removed in the model.
         */
        removed: { value: new Signal() },

        /**
         * Emits a message when an entry is updated in the model.
         */
        updated: { value: new Signal() },

        /**
         * @private
         */
        _array: { writable: true, value: factory instanceof Array ? factory : [] }
    });
}

/**
 * @extends ChangeModel
 */
ArrayModel.prototype = Object.create(ChangeModel.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: ArrayModel },

    /**
     * Indicates the number of elements register in the model.
     */
    length: { get: function get() {
            return this._array.length;
        } },

    /**
     * Inserts an entry in the model.
     * @param entry The entry to insert in the model.
     * @throws ReferenceError if the entry in argument is 'null' or 'undefined'.
     */
    add: { value: function value(entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " add method failed, the passed-in argument not must be 'null'.");
            }
            this.validate(entry);
            this._array.push(entry);
            this.notifyAdd(this._array.length - 1, entry);
        } },

    /**
     * Inserts an entry in the model.
     * @throws ReferenceError if the entry in argument is 'null' or 'undefined'.
     */
    addAt: { value: function value(index, entry) {
            if (entry === null || entry === undefined) {
                throw new ReferenceError(this + " add method failed, the passed-in argument not must be 'null'.");
            }
            this.validate(entry);
            this._array.splice(index, 0, entry);
            this.notifyAdd(index, entry);
        } },

    /**
     * Removes all entries register in the model.
     */
    clear: { value: function value() {
            this._array.length = 0;
            ChangeModel.prototype.clear.call(this);
        } },

    /**
     * Returns the element from this model at the passed index.
     * @param index The index of the element to return.
     * @return the element from this model at the passed index.
     */
    get: { value: function value(index) {
            return this._array[index];
        } },

    /**
     * Returns <code>true</code> if the model contains the specified entry.
     * @param entry The entry reference to verify.
     * @return <code>true</code> if the model contains the specified entry.
     */
    has: { value: function value(entry) {
            return this._array.indexOf(entry) > -1;
        } },

    /**
     * Returns <code class="prettyprint">true</code> if this model is empty.
     * @return <code class="prettyprint">true</code> if this model is empty.
     */
    isEmpty: { value: function value() {
            return this._arrays.length === 0;
        } },

    /**
     * Notify a signal when a new entry is inserted in the model.
     */
    notifyAdd: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.added.emit(index, entry, this);
            }
        } },

    /**
     * Notify a signal when a new entry is removed in the model.
     */
    notifyRemove: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.removed.emit(index, entry, this);
            }
        } },

    /**
     * Notify a signal when a new entry is updated in the model.
     */
    notifyUpdate: { value: function value(index, entry) {
            if (!this.isLocked()) {
                this.updated.emit(index, entry, this);
            }
        } },

    /**
     * Removes an entry in the model.
     */
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

    /**
     * Removes from this model all the elements that are contained between the specific <code class="prettyprint">id</code> position and the end of this list (optional operation).
     * @param id The index of the element or the first element to remove.
     * @param count The number of elements to remove (default 1).
     * @return The Array representation of all elements removed in the original list.
     */
    removeAt: { value: function value(index) {
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            count = count > 1 ? count : 1;
            var old = this._array.splice(index, count);
            if (old) {
                this.notifyRemove(index, old);
            }
        } },

    /**
     * Removes from this model all of the elements whose index is between fromIndex, inclusive and toIndex, exclusive.
     * <p>Shifts any succeeding elements to the left (reduces their index).</p>
     * <p>This call shortens the model by (toIndex - fromIndex) elements. (If toIndex==fromIndex, this operation has no effect.)</p>
     * @param fromIndex The from index (inclusive) to remove elements in the list.
     * @param toIndex The to index (exclusive) to remove elements in the list.
     */
    removeRange: { value: function value(fromIndex, toIndex) {
            if (fromIndex === toIndex) {
                return null;
            }
            return this.removeAt(fromIndex, toIndex - fromIndex);
        } },

    /**
     * Enforce to set the internal array of this model (default use a new Array instance). This method change the model without notification.
     */
    setArray: { value: function value(ar) {
            this._array = ar instanceof Array ? ar : [];
        } },

    /**
     * Update an entry in the model with the specified index.
     * @param index The index to update an entry.
     * @param entry the new value to insert in the model at the specified index.
     */
    updateAt: { value: function value(index, entry) {
            this.validate(entry);
            var old = this._array[index];
            if (old) {
                this._array[index] = entry;
                this.notifyUpdate(index, old);
            }
        } },

    /**
     * Returns the internal array representation of this model.
     * @return the internal array representation of this model.
     */
    toArray: { value: function value() {
            return this._array;
        } }
});

/**
 * This model use an internal <code>KeyValuePair</code> map to register objects.
 * @example
 * <pre>
 * var o1 = { id : "key1" } ;
 * var o2 = { id : "key2" } ;
 * var o3 = { id : "key3" } ;
 * var o4 = { id : "key1" } ;
 *
 * var added = function( entry , model )
 * {
 *     trace( "[+] added entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * var beforeChanged = function( entry , model )
 * {
 *     trace( "[--] before:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var changed = function( entry , model )
 * {
 *     trace( "[++] change:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var removed = function( entry , model )
 * {
 *     trace( "[-] removed entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * var updated = function( entry , model )
 * {
 *     trace( "[u] update entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * model.added.connect( added ) ;
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 * model.removed.connect( removed ) ;
 * model.updated.connect( updated ) ;
 *
 * model.add( o1 ) ;
 * model.add( o2 ) ;
 * model.add( o3 ) ;
 *
 * trace( "#  model.get('key1') == o1 : " + ( model.get("key1") === o1 ) ) ;
 * trace( "#  model.get('key1') == o4 : " + ( model.get("key1") === o4 ) ) ;
 *
 * model.update( o4 ) ;
 *
 * model.current = o1 ;
 * model.current = o2 ;
 * </pre>
 */
function MapModel() {
    var factory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";

    ChangeModel.call(this);

    Object.defineProperties(this, {
        /**
         * Emits a message when an entry is added in the model.
         */
        added: { value: new Signal() },

        /**
         * Emits a message when an entry is removed in the model.
         */
        removed: { value: new Signal() },

        /**
         * Emits a message when an entry is updated in the model.
         */
        updated: { value: new Signal() },

        /**
         * @private
         */
        _map: { writable: true, value: factory instanceof KeyValuePair ? factory : new ArrayMap() },

        /**
         * @private
         */
        _primaryKey: {
            value: !(key instanceof String || typeof key === 'string') || key === "" ? MapModel.DEFAULT_PRIMARY_KEY : key,
            writable: true
        }
    });
}

/**
 * Indicates the default primary key value ("id").
 */
Object.defineProperty(MapModel, 'DEFAULT_PRIMARY_KEY', { value: "id" });

/**
 * @extends ChangeModel
 */
MapModel.prototype = Object.create(ChangeModel.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: MapModel },

    /**
     * Indicates the number of elements register in the model.
     */
    length: { get: function get() {
            return this._map.length;
        } },

    /**
     * Indicates the name of the primary key used to map all objects in the model and identifies each record in the table.
     * By default the model use the "id" primary key in the objects.
     * <p><b>Note:</b> If you use this property and if the model contains entries, all entries will be removing.</p>
     * @see MapModel.DEFAULT_PRIMARY_KEY
     */
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

    /**
     * Inserts an entry in the model, must be identifiable and contains an id property.
     * @throws ReferenceError if the argument of this method is 'null' or 'undefined'.
     * @throws ReferenceError if the passed-in entry is already register in the model.
     */
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

    /**
     * Removes all entries register in the model.
     */
    clear: { value: function value() {
            this._map.clear();
            ChangeModel.prototype.clear.call(this);
        } },

    /**
     * Returns the entry defined by the key passed-in argument.
     * @return the entry defined by the key passed-in argument.
     */
    get: { value: function value(key) {
            return this._map.get(key);
        } },

    /**
     * Returns an entry defines in the model with the specified member.
     * @return an entry defines in the model with the specified member.
     */
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
                //
            }
            return null;
        } },

    /**
     * Returns <code>true</code> if the model contains the specified entry.
     * @param entry The entry reference to verify.
     * @return <code>true</code> if the model contains the specified entry.
     */
    has: { value: function value(entry) {
            return this._map.hasValue(entry);
        } },

    /**
     * Returns <code>true</code> if the model contains the specified attribute value.
     * @return <code>true</code> if the model contains the specified key in argument
     */
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

    /**
     * Returns <code class="prettyprint">true</code> if the model contains the specified id key in argument.
     * @return <code class="prettyprint">true</code> if the model contains the specified id key in argument
     */
    hasKey: { value: function value(key) {
            return this._map.has(key);
        } },

    /**
     * Returns <code class="prettyprint">true</code> if this model is empty.
     * @return <code class="prettyprint">true</code> if this model is empty.
     */
    isEmpty: { value: function value() {
            return this._map.isEmpty();
        } },

    /**
     * Returns the iterator of this model.
     * @return the iterator of this model.
     */
    iterator: { value: function value() {
            return this._map.iterator();
        } },

    /**
     * Returns the keys iterator of this model.
     * @return the keys iterator of this model.
     */
    keyIterator: { value: function value() {
            return this._map.keyIterator();
        } },

    /**
     * Notify a signal when a new entry is inserted in the model.
     */
    notifyAdd: { value: function value(entry) {
            if (!this.isLocked()) {
                this.added.emit(entry, this);
            }
        } },

    /**
     * Notify a signal when a new entry is removed in the model.
     */
    notifyRemove: { value: function value(entry) {
            if (!this.isLocked()) {
                this.removed.emit(entry, this);
            }
        } },

    /**
     * Notify a signal when a new entry is updated in the model.
     */
    notifyUpdate: { value: function value(entry) {
            if (!this.isLocked()) {
                this.updated.emit(entry, this);
            }
        } },

    /**
     * Removes an entry in the model.
     */
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

    /**
     * Enforce to set the internal KeyValuePair collection of this model (default use a new Array instance). This method change the model without notification.
     */
    setMap: { value: function value(map) {
            this._map = map instanceof KeyValuePair ? map : new ArrayMap();
        } },

    /**
     * Update an entry in the model.
     * @param entry the new value to insert in the model.
     */
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

    /**
     * Returns the internal KeyValuePair (map) representation of this model.
     * @return the internal KeyValuePair (map) representation of this model.
     */
    toMap: { value: function value() {
            return this._map;
        } }
});

/**
 * The VEGAS.js framework - The system.models library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.models
 * @memberof system
 */
var models = Object.assign({
    // classes

    ChangeModel: ChangeModel,
    MemoryModel: MemoryModel,
    Model: Model,

    // packages

    arrays: Object.assign({
        ArrayModel: ArrayModel
    }),

    maps: Object.assign({
        MapModel: MapModel
    })
});

/**
 * A pseudo random number generator (PRNG) is an algorithm for generating a sequence of numbers that approximates the properties of random numbers.
 * <p>Implementation of the Park Miller (1988) "minimal standard" linear congruential pseudo-random number generator.
 * For a full explanation visit: http://www.firstpr.com.au/dsp/rand31/</p>
 * <p>The generator uses a modulus constant ((m) of 2^31 - 1) which is a Mersenne Prime number and a full-period-multiplier of 16807.
 * Output is a 31 bit unsigned integer. The range of values output is 1 to 2147483646 (2^31-1) and the seed must be in this range too.</p>
 * @name PRNG
 * @memberof system.numeric
 * @class
 * @constructor
 * @param {number} [value=0] - The optional default value of the <code>PRNG</code> object, if the passed-in value is <code>>=1</code> a random value is generated with the <code>Math.random()</code> static method.
 */

function PRNG() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    Object.defineProperties(this, {
        _value: { value: 1, writable: true }
    });

    this.value = value > 0 ? value : Math.random() * 0X7FFFFFFE;
}

PRNG.prototype = Object.create(Object.prototype, {
    /**
     * Defines the current random value with a 31 bit unsigned integer between <code>1</code> and <code>0X7FFFFFFE</code> inclusive (don't use 0).
     * @memberof system.numeric.PRNG
     * @instance
     * @type number
     */
    value: {
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            value = value > 1 ? value : 1;
            value = value > 0X7FFFFFFE ? 0X7FFFFFFE : value;
            this._value = value;
        }
    }
});

PRNG.prototype.constructor = PRNG;

/**
 * Provides the next pseudo random number as an unsigned integer (31 bits).
 * @return The next pseudo random number as an unsigned integer (31 bits).
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomInt = function () {
    this._value = this._value * 16807 % 2147483647;
    return this._value;
};

/**
 * Provides the next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @param {number} [min=0] - The minimum range value to evaluates the pseudo random number.
 * @param {number} [max=1] - The maximum range value to evaluates the pseudo random number.
 * @return The next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomIntByMinMax = function () {
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
};

/**
 * Provides the next pseudo random number as an unsigned integer (31 bits) between a given range.
 * @param {system.numeric.Range} range - The range object to evaluate the pseudo random number.
 * @return The next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomIntByRange = function (r) /*int*/
{
    var min = r.min - 0.4999;
    var max = r.max + 0.4999;
    this._value = this._value * 16807 % 2147483647;
    return Math.round(min + (max - min) * this._value / 2147483647);
};

/**
 * Provides the next pseudo random number as a float between nearly 0 and nearly 1.0.
 * @return The next pseudo random number as a float between nearly 0 and nearly 1.0.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumber = function () /*Number*/
{
    this._value = this._value * 16807 % 2147483647;
    return this._value / 2147483647;
};

/**
 * Provides the next pseudo random number as a float between a minimum value and maximum value.
 * @return The next pseudo random number as a float between a minimum value and maximum value.
 * @param {number} [min=0] - The minimum range value to evaluates the pseudo random number.
 * @param {number} [max=1] - The maximum range value to evaluates the pseudo random number.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumberByMinMax = function (min, max) {
    if (isNaN(min)) {
        min = 0;
    }
    if (isNaN(max)) {
        max = 1;
    }
    this._value = this._value * 16807 % 2147483647;
    return min + (max - min) * this._value / 2147483647;
};

/**
 * Provides the next pseudo random number as a float between a given range.
 * @return The next pseudo random number as a float in a specific range.
 * @param {system.numeric.Range} range - The range to born the number.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumberByRange = function (r /*Range*/) /*Number*/
{
    this._value = this._value * 16807 % 2147483647;
    return r.min + (r.max - r.min) * this._value / 2147483647;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.toString = function () {
    return String(this._value);
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.valueOf = function () /*int*/
{
    return this._value;
};

/**
 * Represents an immutable range of values.
 * @name Range
 * @memberof system.numeric
 * @class
 * @constructor
 * @param {number} [min=NaN] - The minimum range value.
 * @param {number} [max=NaN] - The maximum range value.
 * @example
 * Range = system.numeric.Range ;
 *
 * var r1 = new Range(10, 120) ;
 * var r2 = new Range(100, 150) ;
 *
 * trace ("r1 : " + r1) ; // r1 : [Range min:10 max:120]
 * trace ("r2 : " + r2) ; // r2 : [Range min:100 max:150]
 *
 * trace ("r1 contains 50    : " + r1.contains(50)) ; // r1 contains 50 : true
 * trace ("r1 isOutOfRange 5 : " + r1.isOutOfRange(5)) ; // r1 isOutOfRange 5 : true
 * trace ("r1 overlap r2     : " + r1.overlap(r2)) ; // r1 overlap r2 : true
 * trace ("r1 clamp 5        : " + r1.clamp(5)) ; // r1 clamp 5 : 10
 * trace ("r1 clamp 121      : " + r1.clamp(121)) ; // r1 clamp 121 : 120
 */

function Range() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

    if (max < min) {
        throw new RangeError("The Range constructor failed, the 'max' argument is < of 'min' argument");
    }
    this.min = min;
    this.max = max;
}

Object.defineProperties(Range, {
    /**
     * Range between -255 and 255.
     */
    COLOR: { value: new Range(-255, 255), enumerable: true },

    /**
     * Range between 0 and 360.
     */
    DEGREE: { value: new Range(0, 360), enumerable: true },

    /**
     * Range between 0 and 100.
     */
    PERCENT: { value: new Range(0, 100), enumerable: true },

    /**
     * Range between 0 and 1.
     */
    UNITY: { value: new Range(0, 1), enumerable: true },

    /**
     * Filters the passed-in Number value, if the value is NaN the return value is the default value in second argument.
     * @param value The Number value to filter, if this value is NaN the value is changed.
     * @param defaultValue The default value to apply over the specified value if this value is NaN (default 0).
     * @return The filter Number value.
     */
    filterNaNValue: {
        value: function value(_value) {
            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return isNaN(_value) ? defaultValue : _value;
        }
    }
});

Range.prototype = Object.create(Object.prototype);
Range.prototype.constructor = Range;

/**
 * Clamps a specific value in the current range.
 */
Range.prototype.clamp = function (value) {
    if (isNaN(value)) {
        return NaN;
    }
    var mi = this.min;
    var ma = this.max;
    if (isNaN(mi)) {
        mi = value;
    }
    if (isNaN(ma)) {
        ma = value;
    }
    return Math.max(Math.min(value, ma), mi);
};

/**
 * Returns a shallow copy of the object.
 * @return a shallow copy of the object.
 */
Range.prototype.clone = function () {
    return new Range(this.min, this.max);
};

/**
 * Creates a new range by combining two existing ranges.
 * @param range the range to combine, <code class="prettyprint">null</code> permitted.
 */
Range.prototype.combine = function (range) /*Range*/
{
    if (!range) {
        return this.clone();
    } else {
        var lower = Math.min(this.min, range.min);
        var upper = Math.max(this.max, range.max);
        return new Range(lower, upper);
    }
};

/**
 * Returns {@code true} if the Range instance contains the value passed in argument.
 * @return {@code true} if the Range instance contains the value passed in argument.
 */
Range.prototype.contains = function (value) {
    return !this.isOutOfRange(value);
};

/**
 * Indicates whether some other object is "equal to" this one.
 */
Range.prototype.equals = function (o) /*Boolean*/
{
    if (o instanceof Range) {
        return o.min === this.min && o.max === this.max;
    } else {
        return false;
    }
};

/**
 * Creates a new range by adding margins to an existing range.
 * @param range the range {@code null} not permitted.
 * @param lowerMargin the lower margin (expressed as a percentage of the range length).
 * @param upperMargin the upper margin (expressed as a percentage of the range length).
 * @return The expanded range.
 * @throws IllegalArgumentError if the range argument is {@code null}
 */
Range.prototype.expand = function (lowerMargin /*Number*/, upperMargin /*Number*/) /*Range*/
{
    if (isNaN(lowerMargin)) {
        lowerMargin = 1;
    }
    if (isNaN(upperMargin)) {
        upperMargin = 1;
    }
    var delta = this.max - this.min;
    var lower = delta * lowerMargin;
    var upper = delta * upperMargin;
    return new Range(this.min - lower, this.max + upper);
};

/**
 * Returns the central value for the range.
 * @return The central value.
 */
Range.prototype.getCentralValue = function () /*Number*/
{
    return (this.min + this.max) / 2;
};

/**
 * Returns a random floating-point number between two numbers.
 * @return a random floating-point number between two numbers.
 */
Range.prototype.getRandomFloat = function () /*Number*/
{
    return Math.random() * (this.max - this.min) + this.min;
};

/**
 * Returns a random floating-point number between two numbers.
 * @return a random floating-point number between two numbers.
 */
Range.prototype.getRandomInteger = function () /*Number*/
{
    return Math.floor(this.getRandomFloat());
};

/**
 * Returns {@code true} if the value is out of the range.
 * @return {@code true} if the value is out of the range.
 */
Range.prototype.isOutOfRange = function (value /*Number*/) {
    return value > this.max || value < this.min;
};

/**
 * Returns {@code true} if the range in argument overlap the current range.
 * @return {@code true} if the range in argument overlap the current range.
 */
Range.prototype.overlap = function (r /*Range*/) /*Boolean*/
{
    return this.max >= r.min && r.max >= this.min;
};

/**
 * Returns the length of the range.
 * @return the length of the range.
 */
Range.prototype.size = function () /*Number*/
{
    return this.max - this.min;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Range.prototype.toString = function () /*String*/
{
    return "[Range min:" + this.min + " max:" + this.max + "]";
};

/**
 * The VEGAS.js framework - The system.numeric library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.numeric
 * @memberof system
 */
var numeric = Object.assign({
  PRNG: PRNG,
  Range: Range,
  RomanNumber: RomanNumber
});

/**
 * The ActionEntry objects contains all informations about an Action in a {@link system.process.TaskGroup} object.
 * @name ActionEntry
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @param {system.process.Action} action - The Action reference register in this entry.
 * @param {number} [priority=0] - The priority value of the entry.
 * @param {boolean} [auto=false] - This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */

function ActionEntry(action) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  /**
   * The Action reference register in this entry.
   * @memberof system.process.ActionEntry
   * @type {system.process.Action}
   * @instance
   */
  this.action = action;

  /**
   * This flag indicates if the receiver must be disconnected when handle the first time a signal.
   * @memberof system.process.ActionEntry
   * @type {boolean}
   * @instance
   */
  this.auto = Boolean(auto);

  /**
   * The priority value of the entry.
   * @memberof system.process.ActionEntry
   * @type {number}
   * @instance
   */
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}

ActionEntry.prototype = Object.create(Object.prototype, {
  /**
   * The constructor reference of the instance.
   */
  constructor: { value: ActionEntry },

  /**
   * Returns the String representation of the object.
   * @return the String representation of the object.
   */
  toString: { value: function value() {
      return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]";
    } }
});

/*jshint laxbreak: true*/
/**
 * Enables you to apply a common {@link system.process.Action|Action} to a group of {@link system.process.Action|Action} objects.
 * <p>All {@link system.process.Action|Action} objects are processed as a single unit.<p>
 * <p>This class use an internal typed Collection to register all <code class="prettyprint">Runnable</code> objects.</p>
 * @summary Enables you to apply a common {@link system.process.Action|Action} to a group of {@link system.process.Action|Action} objects.
 * @name Batch
 * @class
 * @memberof system.process
 * @augments system.process.Runnable
 * @implements system.process.Runnable
 * @constructor
 * @param {array} [init=null] - The optional Array of Runnable objects to fill the batch.
 * @example
 * function Command( name )
 * {
 *     this.name = name ;
 * }
 *
 * Command.prototype = Object.create( system.process.Runnable.prototype ) ;
 * Command.constructor = Command ;
 *
 * Command.prototype.run = function()
 * {
 *     trace( this.name + " run") ;
 * }
 *
 * Command.prototype.toString = function()
 * {
 *     return '[Command ' + this.name + ']' ;
 * }

 * var batch = new system.process.Batch() ;
 *
 * batch.add( new Command( "command1" ) ) ;
 * batch.add( new Command( "command2" ) ) ;
 *
 * console.info( batch.length ) ;
 *
 * batch.run() ;
 */
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
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Batch },

    /**
     * Retrieves the number of elements in this batch.
     * @return the number of elements in this batch.
     * @name length
     * @memberof system.process.Batch
     * @instance
     * @readonly
     */
    length: {
        get: function get() {
            return this._entries.length;
        }
    },

    /**
     * Adds the specified Runnable object in batch.
     * @param {system.process.Runnable} command - The command to register in the batch.
     * @return <code>true</code> if the command is registered.
     * @name add
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    add: { writable: true, value: function value(command) {
            if (command && command instanceof Runnable) {
                this._entries.push(command);
                return true;
            }
            return false;
        } },

    /**
     * Removes all of the elements from this batch.
     * @name clear
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    clear: { writable: true, value: function value() {
            this._entries.length = 0;
        } },

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            var b = new Batch();
            var l = this._entries.length;
            for (var i = 0; i < l; i++) {
                b.add(this._entries[i]);
            }
            return b;
        } },

    /**
     * Returns {@code true} if this batch contains the specified element.
     * @param {system.process.Runnable} command - The command to search in the batch.
     * @return {@code true} if this batch contains the specified element.
     * @name contains
     * @memberof system.process.Batch
     * @function
     * @instance
     */
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

    /**
     * Returns the command from this batch at the passed index.
     * @param {*} key - The key to find a specific command in the batch.
     * @return the command from this batch at the passed index.
     * @name get
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    get: { writable: true, value: function value(key) {
            return this._entries[key];
        } },

    /**
     * Returns the position of the passed object in the batch.
     * @param command the Runnable object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the batch.
     * @name indexOf
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    indexOf: { writable: true, value: function value(command, fromIndex /*uint*/) /*int*/
        {
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

    /**
     * Returns {@code true} if this batch contains no elements.
     * @return {@code true} if this batch is empty else {@code false}.
     * @name isEmpty
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    isEmpty: { writable: true, value: function value() /*Boolean*/
        {
            return this._entries.length === 0;
        } },

    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     * @param {system.process.Runnable} command - The command to register in the batch.
     * @return <code>true</code> if the command is removed.
     * @name remove
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    remove: { writable: true, value: function value(command) {
            var index = this.indexOf(command);
            if (index > -1) {
                this._entries.splice(index, 1);
                return true;
            }
            return false;
        } },

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    run: { writable: true, value: function value() {
            var l = this._entries.length;
            if (l > 0) {
                var i = -1;
                while (++i < l) {
                    this._entries[i].run();
                }
            }
        } },

    /**
     * Stops all commands in the batch.
     * @name stop
     * @memberof system.process.Batch
     * @function
     * @instance
     */
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

    /**
     * Returns an array containing all of the elements in this batch.
     * @name toArray
     * @memberof system.process.Batch
     * @function
     * @instance
     * @return an array containing all of the elements in this batch.
     */
    toArray: { writable: true, value: function value() {
            return this._entries.slice();
        } },

    /**
     * Returns the source code string representation of the object.
     * @name toString
     * @memberof system.process.Batch
     * @function
     * @instance
     * @return the source code string representation of the object.
     */
    toString: { writable: true, value: function value() /*Array*/
        {
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

/* jshint unused: false*/
/**
 * A simple representation of the Action interface, to group some {@link system.process.Action|Action} objects in one.
 * @summary The abstract class to creates collections who group some {@link system.process.Action|Action} objects in one.
 * @name TaskGroup
 * @class
 * @memberof system.process
 * @extends system.process.Task
 * @constructor
 * @param {string} [mode=normal] - Specifies the <code>mode</code> of the group. This <code>mode</code> can be <code>"normal"</code> (default), <code>"transient"</code> or <code>"everlasting"</code>.
 * @param {array} [actions=null] An optional array who contains Action references to initialize the chain.
 * @example
 * var do1 = new system.process.Do() ;
 * var do2 = new system.process.Do() ;
 *
 * do1.something = function()
 * {
 *     console.log( "#1 something" ) ;
 * }
 *
 * do2.something = function()
 * {
 *     console.log( "#2 something" ) ;
 * }
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
 * var batch = new system.process.BatchTask() ;
 *
 * batch.add( do1 ) ;
 * batch.add( do2 ) ;
 *
 * batch.verbose = true ;
 *
 * trace( 'batch : ' + batch.toString(true) ) ; // batch : [TaskGroup[[Do],[Do]]]
 * trace( 'running : ' + batch.running ) ; // running : false
 * trace( 'length : ' + batch.length ) ; // length : 2
 *
 * batch.finishIt.connect(finish) ;
 * batch.startIt.connect(start) ;
 *
 * batch.run() ;
 *
 * // start: [TaskGroup[[Do],[Do]]]
 * // #1 something
 * // #2 something
 * // finish: [TaskGroup[[Do],[Do]]]
 */
function TaskGroup() {
    var _this = this;

    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
    var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    Task.call(this);

    Object.defineProperties(this, {
        /**
         * Indicates if the toString method must be verbose or not.
         * @memberof system.process.TaskGroup
         * @type {boolean}
         * @instance
         * @default <code>false</code>
         */
        verbose: { value: false, writable: true },

        /**
         * @private
         */
        _actions: { value: [], writable: true },

        /**
         * @private
         */
        _next: { value: null, writable: true, configurable: true },

        /**
         * @private
         */
        _stopped: { value: false, writable: true },

        /**
         * @private
         */
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
    /**
     * Determinates the <code>"everlasting"</code> mode of the group.
     * In this mode the action register in the task-group can't be auto-remove.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    EVERLASTING: { value: 'everlasting', enumerable: true },

    /**
     * Determinates the <code>"normal"</code> mode of the group.
     * In this mode the task-group has a normal life cycle.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    NORMAL: { value: 'normal', enumerable: true },

    /**
     * Determinates the <code>"transient"</code> mode of the group.
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    TRANSIENT: { value: 'transient', enumerable: true }
});

TaskGroup.prototype = Object.create(Task.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: TaskGroup },

    /**
     * Indicates the numbers of actions register in the group.
     * @name length
     * @memberof system.process.TaskGroup
     * @instance
     * @readonly
     */
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
            var l /*int*/ = this._actions.length;
            if (l > 0) {
                var e;
                while (--l > -1) {
                    e = this._actions[l];
                    if (e && e.action && this._next) {
                        e.action.finishIt.connect(this._next);
                    }
                }
            } else if (old > 0) {
                this.notifyCleared(); // clear notification
            }
        }
    },

    /**
     * Determinates the mode of the chain. The mode can be <code>"normal"</code>, <code>"transient"</code> or <code>"everlasting"</code>.
     * @see {@link system.process.TaskGroup#NORMAL}, {@link system.process.TaskGroup#EVERLASTING}, {@link system.process.TaskGroup#TRANSIENT}
     * @name mode
     * @memberof system.process.TaskGroup
     * @instance
     */
    mode: {
        get: function get() {
            return this._mode;
        },
        set: function set(value) {
            this._mode = value === TaskGroup.TRANSIENT || value === TaskGroup.EVERLASTING ? value : TaskGroup.NORMAL;
        }
    },

    /**
     * Indicates if the chain is stopped.
     * @name stopped
     * @memberof system.process.TaskGroup
     * @instance
     * @readonly
     */
    stopped: {
        get: function get() {
            return this._stopped;
        }
    },

    /**
     * Adds an action in the chain.
     * @name add
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {system.process.Action} action - The <code>Action</code> to register in this collection.
     * @param {number} [priority=0] - Determinates the priority level of the action in the chain.
     * @param {boolean} [autoRemove=false] - Apply a remove after the first finish notification.
     * @return <code>true</code> if the insert is success.
     */
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

                /////// bubble sorting

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

                //////

                return true;
            }
            return false;
        } },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new TaskGroup(this._mode, this._actions.length > 0 ? this._actions : null);
        } },

    /**
     * Returns <code class="prettyprint">true</code> if the specified Action is register in the group.
     * @name contains
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return <code class="prettyprint">true</code> if the specified Action is register in the group.
     */
    contains: { writable: true, value: function value(action) {
            if (action && action instanceof Action) {
                if (this._actions.length > 0) {
                    var e;
                    var l /*int*/ = this._actions.length;
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

    /**
     * Dispose the chain and disconnect all actions but don't remove them.
     * @name dispose
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
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

    /**
     * Gets the <code>Action</code> register in the collection at the specified index value or <code>null</code>.
     * @name get
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {number} index - The index of the action element in the collection.
     * @return the action register in the chain at the specified index value or <code>null</code>.
     */
    get: { writable: true, value: function value(index /*uint*/) {
            if (this._actions.length > 0 && index < this._actions.length) {
                var entry = this._actions[index];
                if (entry) {
                    return entry.action;
                }
            }
            return null;
        } },

    /**
     * Returns <code>true</code> if the collection is empty.
     * @name isEmpty
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return <code>true</code> if the chain is empty.
     */
    isEmpty: { writable: true, value: function value() {
            return this._actions.length === 0;
        } },

    /**
     * Invoked when a task is finished.
     * @name toArray
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
    next: { writable: true, value: function value(action /*Action*/) {
            // overrides
        } },

    /**
     * Removes a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed.
     * If the chain is running the <code>stop()</code> method is called.
     * @name remove
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {system.process.Action} action - The action to remove in the collection.
     * @return <code>true</code> if the method succeeded.
     */
    remove: { writable: true, value: function value(action) {
            var _this3 = this;

            if (this._running) {
                throw new Error(this + " remove failed, the process is in progress.");
            }
            this.stop();
            if (this._actions.length > 0) {
                if (action && action instanceof Action) {
                    var e;
                    var l /*int*/ = this._actions.length;

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

    /**
     * Returns the Array representation of the chain.
     * @name toArray
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return the <code>Array</code> representation of the chain.
     */
    toArray: { writable: true, value: function value() {
            if (this._actions.length > 0) {
                var output /*Array*/ = [];
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

    /**
     * Returns the String representation of the chain.
     * @name toString
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return the String representation of the chain.
     */
    toString: { writable: true, value: function value() {
            var s /*String*/ = "[" + this.constructor.name;
            if (Boolean(this.verbose)) {
                if (this._actions.length > 0) {
                    s += "[";
                    var i;
                    var e;
                    var l /*int*/ = this._actions.length;
                    var r /*Array*/ = [];
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

/**
 * The internal BatchTaskNext Receiver.
 * @summary The internal class used in the <code>BatchTask</code> class.
 * @name BatchTaskNext
 * @class
 * @memberof system.process
 * @implements system.signals.Receiver
 * @constructor
 * @param {system.process.BatchTask} BatchTask - The <code>BatchTask</code> reference of this receiver.
 */
function BatchTaskNext(batch) {
    /**
     * The batch to register in this helper.
     * @memberof system.process.BatchTaskNext
     * @type {system.process.BatchTask}
     * @instance
     */
    this.batch = batch;
}

BatchTaskNext.prototype = Object.create(Receiver.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: BatchTaskNext },

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.BatchTaskNext
     * @function
     * @instance
     * @param {system.process.Action} action - The <code>Action</code> reference received in this slot.
     */
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

/**
 * Batchs a serie of Action and run it in the same time.
 * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
 * @param actions A dynamic object who contains Action references to initialize the chain.
 * @example
 * var do1 = new system.process.Do() ;
 * var do2 = new system.process.Do() ;
 *
 * do1.something = function()
 * {
 *     console.log( "do1 something" ) ;
 * }
 *
 * do2.something = function()
 * {
 *     console.log( "do2 something" ) ;
 * }
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
 * var batch = new system.process.BatchTask() ;
 *
 * batch.add( do1 ) ;
 * batch.add( do2 ) ;
 *
 * batch.verbose = true ;
 *
 * trace( 'batch   : ' + batch.toString(true) ) ;
 * trace( 'running : ' + batch.running ) ;
 * trace( 'length  : ' + batch.length ) ;
 *
 * batch.finishIt.connect(finish) ;
 * batch.startIt.connect(start) ;
 *
 * batch.run() ;
 */
function BatchTask(mode /*String*/, actions /*Array*/) {
    TaskGroup.call(this, mode, actions);

    Object.defineProperties(this, {
        /**
         * @private
         */
        _current: { value: null, writable: true },

        /**
         * @private
         */
        _currents: { value: new ArrayMap(), writable: true },

        /**
         * @private
         */
        _next: { value: new BatchTaskNext(this) }
    });
}

/**
 * @extends TaskGroup
 */
BatchTask.prototype = Object.create(TaskGroup.prototype, {
    /**
     * Indicates the current Action reference when the batch is in progress.
     */
    current: { get: function get() {
            return this._current;
        } },

    /**
     * @private
     */
    __className__: { value: 'BatchTask', configurable: true }
});

BatchTask.prototype.constructor = BatchTask;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
BatchTask.prototype.clone = function () {
    return new BatchTask(this._mode, this._actions.length > 0 ? this._actions : null);
};

/**
 * Resume the chain.
 */
BatchTask.prototype.resume = function () /*void*/
{
    if (this._stopped) {
        this._running = true;
        this._stopped = false;
        this.notifyResumed();
        if (this._actions.length > 0) {
            var a;
            var e;
            var l /*int*/ = this._actions.length;
            while (--l > -1) {
                e = this._actions[l];
                if (e) {
                    a = e.action;
                    if (a) {
                        if ("resume" in a) {
                            a.resume();
                        } else {
                            this.next(a); // finalize the action to clean the batch
                        }
                    }
                }
            }
        }
    } else {
        this.run();
    }
};

/**
 * Launchs the chain process.
 */
BatchTask.prototype.run = function () /*void*/
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

/**
 * Stops the task group.
 */
BatchTask.prototype.stop = function () /*void*/
{
    if (this._running) {
        if (this._actions.length > 0) {
            var a;
            var e;
            var l /*int*/ = this._actions.length;
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

/**
 * Enqueue a collection of members definitions (commands) to apply or invoke with the specified target object.
 * @summary Enqueue a collection of members definitions (commands) to apply or invoke with the specified target object.
 * @name Cache
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @param {Object} target - The object to map with this cache process.
 * @param {Array} init - The <code>Array</code> of <code>Property</code> to map in the target reference when the process is running.
 * @example
 * var Cache = system.process.Cache ;
 *
 * var object = {} ;
 *
 * object.a = 1 ;
 * object.b = 2 ;
 * object.c = 3 ;
 * object.d = 4 ;
 *
 * Object.defineProperties( object ,
 * {
 *     method1 :
 *     {
 *         value : function( value )
 *         {
 *             this.c = value ;
 *         }
 *     },
 *     method2 :
 *     {
 *         value : function( value1 , value2 )
 *         {
 *             this.d = value1 + value2 ;
 *         }
 *     }
 * });
 *
 * trace( object ) ; // {a:1,b:2,c:3,d:4}
 *
 * var cache = new Cache() ;
 *
 * cache.addAttribute( "a" , 10 ) ;
 * cache.addAttribute( "b" , 20 ) ;
 *
 * cache.addMethod( "method1" , 30 ) ;
 * cache.addMethodWithArguments( "method2" , [ 40 , 50 ] ) ;
 *
 * cache.target = object ;
 *
 * cache.run() ; // flush the cache and initialize the target or invoked this methods.
 *
 * trace( object ) ; // {a:10,b:20,c:30,d:90}
 * @see system.data.Property
 * @see system.data.Attribute
 * @see system.data.Method
 */
function Cache() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    Action.call(this);

    Object.defineProperties(this, {
        /**
         * The target reference.
         * @memberof system.process.Cache
         * @instance
         * @type {object}
         */
        target: { value: target, writable: true },

        /**
         * @private
         */
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
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Cache },

    /**
     * Returns the number of properties.
     * @name length
     * @memberof system.process.Cache
     * @instance
     * @readonly
     */
    length: {
        get: function get() {
            return this._queue.length;
        }
    }
});

/**
 * Enqueues a specific Property definition.
 * @name add
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {system.data.Property} property - The property to register.
 * @return The current <code>Cache</code> reference.
 * @see system.data.Attribute
 * @see system.data.Method
 */
Cache.prototype.add = function (property) {
    if (property instanceof Property) {
        this._queue.push(property);
    }
    return this;
};

/**
 * Enqueues an attribute name/value entry.
 * @name addAttribute
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the attribute to register.
 * @param {*} value - The value of the attribute to register.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addAttribute = function (name, value) /*Cache*/
{
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        this._queue.push(new Attribute(name, value));
    }
    return this;
};

/**
 * Enqueues a method definition.
 * @name addMethod
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the method to register.
 * @param {Array} args - The optional parameters to fill in the method.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addMethod = function (name) /*Cache*/
{
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        this._queue.push(new Method(name, args));
    }
    return this;
};

/**
 * Enqueues a method definition.
 * @name addMethodWithArguments
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the method to register.
 * @param {Array} args - The optional parameters to fill in the method.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addMethodWithArguments = function (name, args) {
    if (name !== '' && (typeof name === 'string' || name instanceof String)) {
        this._queue.push(new Method(name, args));
    }
    return this;
};

/**
 * Removes all commands in memory.
 * @name clear
 * @memberof system.process.Cache
 * @function
 * @instance
 */
Cache.prototype.clear = function () {
    this._queue.length = 0;
};

/**
 * Returns a shallow copy of this object.
 * @name clone
 * @memberof system.process.Cache
 * @function
 * @instance
 * @return a shallow copy of this object.
 */
Cache.prototype.clone = function () {
    return new Cache(this.target, this._queue);
};

/**
 * Indicates if the tracker cache is empty.
 * @name isEmpty
 * @memberof system.process.Cache
 * @function
 * @instance
 */
Cache.prototype.isEmpty = function () {
    return this._queue.length === 0;
};

/**
 * Run the process.
 * @name run
 * @memberof system.process.Cache
 * @function
 * @instance
 */
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

/**
 * An internal class used in the <code>Chain</code> class.
 * @summary The internal class used in the <code>Chain</code> class.
 * @name ChainNext
 * @class
 * @memberof system.process
 * @implements system.signals.Receiver
 * @constructor
 * @param {system.process.Chain} chain - The <code>Chain</code> reference of this receiver.
 */
function ChainNext() {
    var chain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    /**
     * The chain to register in this helper.
     * @memberof system.process.ChainNext
     * @type {system.process.Chain}
     * @instance
     */
    this.chain = chain;
}

ChainNext.prototype = Object.create(Receiver.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: ChainNext },

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.ChainNext
     * @function
     * @instance
     */
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

/**
 * A chain is a sequence with a finite or infinite number of actions. All actions registered in the chain can be executed one by one with different strategies (loop, auto remove, etc).
 * @summary A chain is a sequence with a finite or infinite number of actions.
 * @name Chain
 * @class
 * @memberof system.process
 * @extends system.process.TaskGroup
 * @constructor
 * @example
 * var do1 = new system.process.Do() ;
 * var do2 = new system.process.Do() ;
 *
 * do1.something = function()
 * {
 *     console.log( "do1 something" ) ;
 * }
 *
 * do2.something = function()
 * {
 *     console.log( "do2 something" ) ;
 * }
 *
 * var finish = function( action )
 * {
 *     trace( "finish: " + action ) ;
 * };
 *
 * var progress = function( action )
 * {
 *     trace( "progress: " + action ) ;
 * };
 *
 * var start = function( action )
 * {
 *     trace( "start: " + action ) ;
 * };
 *
 * var chain = new system.process.Chain() ;
 *
 * chain.finishIt.connect(finish) ;
 * chain.progressIt.connect(progress) ;
 * chain.startIt.connect(start) ;
 *
 * chain.add( do1 , 0 ) ;
 * chain.add( do2 , 2 , true) ;
 *
 * chain.verbose = true ;
 *
 * trace('---------') ;
 *
 * trace( 'chain   : ' + chain.toString(true) ) ;
 * trace( 'running : ' + chain.running ) ;
 * trace( 'length  : ' + chain.length ) ;
 *
 * trace('---------') ;
 *
 * chain.run() ;
 *
 * trace('---------') ;
 *
 * chain.run() ;
 * @param {boolean} [looping=false] Specifies whether playback of the clip should continue, or loop (default false).
 * @param {number} [numLoop=0] Specifies the number of the times the presentation should loop during playback.
 * @param {string} [mode=normal] - Specifies the <code>mode</code> of the group. This <code>mode</code> can be <code>"normal"</code> (default), <code>"transient"</code> or <code>"everlasting"</code>.
 * @param {array} [actions=null] An optional array who contains Action references to initialize the chain.
 */
function Chain() {
    var looping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var numLoop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'normal';
    var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    TaskGroup.call(this, mode, actions);

    Object.defineProperties(this, {
        /**
         * Indicates if the chain loop when is finished.
         * @memberof system.process.Chain
         * @type {boolean}
         * @instance
         * @default <code>false</code>
         */
        looping: { value: Boolean(looping), writable: true },

        /**
         * The number of loops.
         * @memberof system.process.Chain
         * @type {number}
         * @instance
         * @default 0
         */
        numLoop: {
            value: numLoop > 0 ? Math.round(numLoop) : 0,
            writable: true
        },

        /**
         * @private
         */
        _current: { value: null, writable: true },
        _currentLoop: { value: 0, writable: true },
        _position: { value: 0, writable: true },
        _next: { value: new ChainNext(this) }
    });
}

Chain.prototype = Object.create(TaskGroup.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Chain },

    /**
     * Indicates the current Action reference when the process is in progress.
     * @memberof system.process.Chain
     * @type {system.process.Action}
     * @instance
     * @readonly
     */
    current: { get: function get() {
            return this._current ? this._current.action : null;
        } },

    /**
     * Indicates the current countdown loop value.
     * @memberof system.process.Chain
     * @type {number}
     * @instance
     * @readonly
     */
    currentLoop: { get: function get() {
            return this._currentLoop;
        } },

    /**
     * Indicates the current numeric position of the chain when is running.
     * @memberof system.process.Chain
     * @type {number}
     * @instance
     * @readonly
     */
    position: { get: function get() {
            return this._position;
        } },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new Chain(this.looping, this.numLoop, this._mode, this._actions.length > 0 ? this._actions : null);
        } },

    /**
     * Retrieves the next action reference in the chain with the current position.
     * @name element
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    element: { writable: true, value: function value() {
            return this.hasNext() ? this._actions[this._position].action : null;
        } },

    /**
     * Retrieves the next action reference in the chain with the current position.
     * @name hasNext
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    hasNext: { writable: true, value: function value() {
            return this._position < this._actions.length;
        } },

    /**
     * Resume the chain.
     * @name resume
     * @memberof system.process.Chain
     * @function
     * @instance
     */
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

    /**
     * Launchs the chain process.
     * @name run
     * @memberof system.process.Chain
     * @function
     * @instance
     */
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

    /**
     * Stops the task group.
     * @name stop
     * @memberof system.process.Chain
     * @function
     * @instance
     */
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

/**
 * A simple command to do something. Very usefull to test something in a complex process.
 * @summary A simple command to do something.
 * @name Do
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @example
 * var action = new system.process.Do() ;
 *
 * action.something = function()
 * {
 *     trace( "do something" ) ;
 * }
 *
 * var finish = function( action )
 * {
 *     var message = "finish: " + action.toString() ;
 *     trace( message ) ;
 * };
 *
 * var start = function( action )
 * {
 *     var message = "start: " + action.toString() ;
 *     trace( message ) ;
 * };
 *
 * action.finishIt.connect(finish) ;
 * action.startIt.connect(start) ;
 *
 * action.run() ;
 */
function Do() {
    Action.call(this);
}

Do.prototype = Object.create(Action.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Do },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Do
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new Do();
        } },

    /**
     * Do something in this method (override it).
     */
    something: { enumerable: true, writable: true, value: function value() {
            //
        } },

    /**
     * Run the process.
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    run: { writable: true, value: function value() {
            this.notifyStarted();
            if ('something' in this && this.something instanceof Function) {
                this.something();
            }
            this.notifyFinished();
        } }
});

/**
 * A FrameTimer let you run code on a specified time sequence and use the <code>requestAnimationFrame</code> method.
 * @summary A FrameTimer let you run code on a specified time sequence and use the <code>requestAnimationFrame</code> method.
 * @name FrameTimer
 * @memberof system.process
 * @class
 * @extends system.process.Task
 * @constructor
 * @see {@link https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame|requestAnimationFrame} for further information.
 * @example
 * var finish = function( action )
 * {
 *     trace( action + " finish" ) ;
 * }
 *
 * var resume = function( action )
 * {
 *     trace( action + " resume" ) ;
 * }
 *
 * var start = function( action )
 * {
 *     trace( action + " start" ) ;
 * }
 *
 * var stop = function( action )
 * {
 *     trace( action + " stop" ) ;
 * }
 *
 * var progress = function( action )
 * {
 *     trace( action + " progress" ) ;
 *     if( count++ === 100 )
 *     {
 *         action.stop() ;
 *     }
 * }
 *
 * var count  = 0 ;
 * var action = new system.process.FrameTimer() ;
 *
 * action.finishIt.connect( finish ) ;
 * action.progressIt.connect( progress ) ;
 * action.resumeIt.connect( resume ) ;
 * action.startIt.connect( start ) ;
 * action.stopIt.connect( stop ) ;
 *
 * action.run() ;
 */
function FrameTimer() {
    Task.call(this);

    Object.defineProperties(this, {
        /**
         * Scalar time value from last frame to this frame.
         * This value is capped by setting minFPS and is scaled with "speed".
         * @type {number}
         * @default 1
         * @name deltaTime
         * @memberof system.process.FrameTimer
         * @instance
         */
        deltaTime: { value: 1, writable: true },

        /**
         * Time elapsed in milliseconds from last frame to this frame.
         * Opposed to what the scalar {@link FrameTimer#deltaTime}
         * is based, this value is neither capped nor scaled.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         * @member {number}
         * @default 1 / FPMS
         * @name elapsedMS
         * @memberof system.process.FrameTimer
         * @instance
         */
        elapsedMS: { value: 1 / FPMS, writable: true },

        /**
         * The frames per second at which this timer is running.
         * The default is approximately 60 in most modern browsers.
         * **Note:** This does not factor in the value of {@link FrameTimer#speed}, which is specific to scaling {@link FrameTimer#deltaTime}.
         * @readonly
         * @name fps
         * @memberof system.process.FrameTimer
         * @instance
         */
        fps: { get: function get() {
                return 1000 / this.elapsedMS;
            } },

        /**
         * Manages the maximum amount of milliseconds allowed to elapse between invoking {@link FrameTimer#next}.
         * This value is used to cap {@link FrameTimer#deltaTime}, but does not effect the measured value of {@link FrameTimer#fps}.
         * When setting this property it is clamped to a value between `0` and `FPMS * 1000`.
         * @type {number}
         * @name minFPS
         * @memberof system.process.FrameTimer
         * @instance
         */
        minFPS: {
            get: function get() {
                return 1000 / this._maxElapsedMS;
            },
            set: function set(fps) {
                this._maxElapsedMS = 1 / Math.min(Math.max(0, fps) / 1000, FPMS);
            }
        },

        /**
         * The last time the next method was invoked.
         * This value is also reset internally outside of invoking update, but only when a new animation frame is requested.
         * If the platform supports DOMHighResTimeStamp, this value will have a precision of 1 µs.
         * @type {number}
         * @default 0
         * @name lastTime
         * @memberof system.process.FrameTimer
         * @instance
         */
        lastTime: { value: 0, writable: true },

        /**
         * Factor of current deltaTime.
         * @type {number}
         * @default 1
         * @name speed
         * @memberof system.process.FrameTimer
         * @instance
         * @example <caption>Scales <code>deltaTime</code> to what would be the equivalent of approximately <strong>120 FPS</strong></caption>
         * var timer = new FrameTimer() ;
         * timer.speed = 2;
         */
        speed: { value: 1, writable: true },

        /**
         * @private
         */
        _requestID: { value: null, writable: true },

        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the maximum allowed milliseconds between updates.
         * @private
         */
        _maxElapsedMS: { value: 100, writable: true },

        /**
         * @private
         */
        _stopped: { value: false, writable: true }
    });
}

FrameTimer.prototype = Object.create(Task.prototype, {
    /**
     * Indicates the reference to the Object function that created the instance's prototype.
     */
    constructor: { value: FrameTimer, writable: true },

    /**
     * Indicates true if the timer is stopped.
     * @name stopped
     * @memberof system.process.FrameTimer
     * @instance
     * @readonly
     */
    stopped: { get: function get() {
            return this._stopped;
        } },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    clone: { value: function value() {
            return new FrameTimer();
        } },

    /**
     * Restarts the timer. The timer is <code>stopped</code>, and then started.
     * @name resume
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    resume: { value: function value() {
            if (this._stopped) {
                this._running = true;
                this._stopped = false;
                this.notifyResumed();
                this._requestID = requestAnimationFrame(this._next.bind(this));
            }
        } },

    /**
     * Reset the timer and stop it before if it's running.
     * @name reset
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    reset: { value: function value() {
            this.stop();
            this._stopped = false;
        } },

    /**
     * Run the timer.
     * @name run
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    run: { value: function value() {
            if (!this._running) {
                this._stopped = false;
                this.lastTime = performance.now();
                this.notifyStarted();
                this._requestID = requestAnimationFrame(this._next.bind(this));
            }
        } },

    /**
     * Stops the timer.
     * @name stop
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    stop: { value: function value() {
            if (this._running && !this._stopped) {
                this._running = false;
                this._stopped = true;
                cancelAnimationFrame(this._requestID);
                this._requestID = null;
                this.notifyStopped();
            }
        } },

    /**
     * Returns the string representation of this instance.
     * @name toString
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     * @return the string representation of this instance.
     */
    toString: { value: function value() {
            return '[FrameTimer]';
        } },

    /**
     * @private
     */
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

/**
 * The target frames per millisecond used in the {@link system.process.FrameTimer} instances.
 * @name FPMS
 * @memberof system.process
 */
var FPMS = 0.06;

/**
 * Invoked to lock a specific {@link system.process.Lockable} object.
 * @summary Invoked to lock a specific {@link system.process.Lockable} object.
 * @name Lock
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @example
 * var chain = new system.process.Chain() ;
 * var lock  = new system.process.Lock( chain ) ;
 *
 * lock.run() ;
 *
 * trace( chain.isLocked() ) ;
 */
function Lock(target) {
    Action.call(this);
    this.target = target;
}

Lock.prototype = Object.create(Action.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Lock },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new Lock(this.target);
        } },

    /**
     * Run the process.
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    run: { writable: true, value: function value() {
            this.notifyStarted();
            if (isLockable(this.target) && !this.target.isLocked()) {
                this.target.lock();
            }
            this.notifyFinished();
        } }
});

/**
 * Creates a new Priority instance and contains a <code>priority</code> property.
 * @name Priority
 * @memberof system.process
 * @interface
 */

function Priority() {
    Object.defineProperties(this, {
        /**
         * Determinates the priority value.
         * @memberof system.process.Priority
         * @type {number}
         * @instance
         */
        priority: {
            get: function get() {
                return this._priority;
            },
            set: function set(value) {
                this._priority = value > 0 || value < 0 ? value : 0;
            }
        },
        /**
         * @private
         */
        _priority: { value: 0, writable: true }
    });
}

Priority.prototype = Object.create(Object.prototype);
Priority.prototype.constructor = Priority;

/**
 * Indicates if the specific objet is Resetable  and contains a <code>reset()</code> method.
 * @name isResetable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Resetable</code>.
 */

function isResetable(target) {
  if (target) {
    if (target instanceof Resetable) {
      return true;
    }
    return 'reset' in target && target.reset instanceof Function;
  }
  return false;
}

/**
 * This interface should be implemented by any class whose instances are intended to be reseted.
 * @name Resetable
 * @memberof system.process
 * @interface
 */
function Resetable() {}

Resetable.prototype = Object.create(Object.prototype);
Resetable.prototype.constructor = Resetable;

/**
 * Resets the process.
 * @name reset
 * @memberof system.process.Resetable
 * @function
 * @instance
 */
Resetable.prototype.reset = function () {};

/**
 * Indicates if the specific objet is Resumable and contains a <code>resume()</code> method.
 * @name isResumable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Resumable</code>.
 */

function isResumable(target) {
  if (target) {
    if (target instanceof Resumable) {
      return true;
    }
    return 'resume' in target && target.resume instanceof Function;
  }
  return false;
}

/**
 * This interface should be implemented by any class whose instances are intended to be resumed.
 * @name Resumable
 * @memberof system.process
 * @interface
 */
function Resumable() {}

Resumable.prototype = Object.create(Object.prototype);
Resumable.prototype.constructor = Resumable;

/**
 * Resumes the process.
 * @name resume
 * @memberof system.process.Resumable
 * @function
 * @instance
 */
Resumable.prototype.resume = function () {};

/**
 * Indicates if the specific objet is Startable and contains a <code>start()</code> method.
 * @name isStartable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Startable</code>.
 */

function isStartable(target) {
  if (target) {
    if (target instanceof Startable) {
      return true;
    }
    return 'start' in target && target.start instanceof Function;
  }
  return false;
}

/**
 * This interface should be implemented by any class whose instances are intended to be started.
 * @name Startable
 * @memberof system.process
 * @interface
 */
function Startable() {}

Startable.prototype = Object.create(Object.prototype);
Startable.prototype.constructor = Startable;

/**
 * Starts the process.
 * @name start
 * @memberof system.process.Startable
 * @function
 * @instance
 */
Startable.prototype.start = function () {};

/**
 * Indicates if the specific objet is Stoppable and contains a <code>stop()</code> method.
 * @name isStoppable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Stoppable</code>.
 */

function isStoppable(target) {
  if (target) {
    if (target instanceof Stoppable) {
      return true;
    }
    return 'stop' in target && target.stop instanceof Function;
  }
  return false;
}

/**
 * This interface should be implemented by any class whose instances are intended to be stopped.
 * @name Stoppable
 * @memberof system.process
 * @interface
 */
function Stoppable() {}

Stoppable.prototype = Object.create(Object.prototype);
Stoppable.prototype.constructor = Stoppable;

/**
 * Stop the process.
 * @name stop
 * @memberof system.process.Stoppable
 * @function
 * @instance
 */
Stoppable.prototype.stop = function () {};

/**
 * Defines the policy of the timeout states in your application.
 * @summary Defines the policies of the timeout states in your application.
 * @name TimeoutPolicy
 * @class
 * @memberof system.process
 * @extends system.Enum
 * @constructor
 * @param {number} value - The value of the enumeration.
 * @param {string} name - The name key of the enumeration.
 * @example
 * var TimeoutPolicy = system.process.TimeoutPolicy  ;
 *
 * trace( TimeoutPolicy.INFINITY ) ;
 * trace( "infinity : " + TimeoutPolicy.INFINITY ) ;
 * trace( "toString : " + TimeoutPolicy.INFINITY.toString() ) ;
 * trace( "valueOf  : " + TimeoutPolicy.INFINITY.valueOf() ) ;
 *
 * trace( TimeoutPolicy.LIMIT ) ;
 * trace( "limit : " + TimeoutPolicy.LIMIT ) ;
 * trace( "toString : " + TimeoutPolicy.LIMIT.toString() ) ;
 * trace( "valueOf  : " + TimeoutPolicy.LIMIT.valueOf() ) ;
 */
function TimeoutPolicy(value, name) {
  Enum.call(this, value, name);
}

TimeoutPolicy.prototype = Object.create(Enum.prototype);
TimeoutPolicy.prototype.constructor = TimeoutPolicy;

Object.defineProperties(TimeoutPolicy, {
  /**
   * Designates the infinity timeout policy (0).
   * @name INFINITY
   * @memberof system.process.TimeoutPolicy
   * @const
   * @type {system.process.TimeoutPolicy}
   */
  INFINITY: { value: new TimeoutPolicy(0, 'infinity'), enumerable: true },

  /**
   * Designates the limited timeout policy (1).
   * @name LIMIT
   * @memberof system.process.TimeoutPolicy
   * @const
   * @type {system.process.TimeoutPolicy}
   */
  LIMIT: { value: new TimeoutPolicy(1, 'limit'), enumerable: true }
});

/**
 * The <code>Timer</code> objects which let you run code on a specified time sequence.
 * This timer object use an internal <code>setInterval</code> function to calls or evaluates an expression at specified intervals
 * @summary The <code>Timer</code> objects which let you run code on a specified time sequence.
 * @name Timer
 * @memberof system.process
 * @extends system.process.Task
 * @class
 * @constructor
 * @example
 * var finish = function( action )
 * {
 *     trace( action + " finish" ) ;
 * }
 *
 * var resume = function( action )
 * {
 *     trace( action + " resume" ) ;
 * }
 *
 * var start = function( action )
 * {
 *     trace( action + " start" ) ;
 * }
 *
 * var stop = function( action )
 * {
 *     trace( action + " stop" ) ;
 * }
 *
 * var time = function( action )
 * {
 *     trace( action + " count: " + action.currentCount + " / " + action.repeatCount ) ;
 *     if ( action.currentCount === 5 )
 *     {
 *         action.stop() ;
 *         trace( "timer stopped:" + action.stopped ) ;
 *         action.resume() ;
 *     }
 * }
 *
 * var action = new system.process.Timer( 1000 , 10 ) ;
 * //var action = new system.process.Timer( 1 , 10 , true ) ; // use the useSeconds flag
 *
 * action.finishIt.connect( finish ) ;
 * action.progressIt.connect( time ) ;
 * action.resumeIt.connect( resume ) ;
 * action.startIt.connect( start ) ;
 * action.stopIt.connect( stop ) ;
 *
 * action.run() ;
 * @param {number} [delay=0] The delay in <strong>ms</strong> or in seconds if the <code>useSeconds</code> property is <code>true</code>. If this value is 0, the timer emit with the minimum delay possible.
 * @param {number} [repeatCount=0] Indicates the number or repeat of the timer, if the <code>repeatCount</code> value is > <code>0/<code>.
 * @param {boolean} [useSeconds=false] Specifies if the timer use a delay in seconds or not.
 */
function Timer() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var repeatCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    Task.call(this);

    Object.defineProperties(this, {
        /**
         * @private
         */
        _count: { value: 0, writable: true },

        /**
         * @private
         */
        _delay: { value: delay > 0 ? delay : 0, writable: true },

        /**
         * @private
         */
        _itv: { value: 0, writable: true },

        /**
         * @private
         */
        _repeatCount: { value: repeatCount > 0 ? repeatCount : 0, writable: true },

        /**
         * @private
         */
        _stopped: { value: false, writable: true },

        /**
         * @private
         */
        _useSeconds: { value: Boolean(useSeconds), writable: true }
    });
}

Timer.prototype = Object.create(Task.prototype, {
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor: { value: Timer, writable: true },

    /**
     * The current count value if the timer use the <code>repeatCount</code> option.
     * @type {number}
     * @name currentCount
     * @memberof system.process.Timer
     * @instance
     * @readonly
     */
    currentCount: { get: function get() {
            return this._count;
        } },

    /**
     * Indicates the delay between timer events, in milliseconds (or seconds it the <code>useSeconds</code> is <code>true</code>).
     * @type {number}
     * @name delay
     * @memberof system.process.Timer
     * @instance
     */
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

    /**
     * Indicates the number of repetitions. If zero, the timer repeats infinitely.
     * If nonzero, the timer runs the specified number of times and then stops.
     * @type {boolean}
     * @name repeatCount
     * @memberof system.process.Timer
     * @instance
     */
    repeatCount: {
        get: function get() {
            return this._repeatCount;
        },
        set: function set(value) {
            this._repeatCount = value > 0 ? value : 0;
        }
    },

    /**
     * Indicates true if the timer is stopped.
     * @type {boolean}
     * @name stopped
     * @memberof system.process.Timer
     * @instance
     * @readonly
     */
    stopped: { get: function get() {
            return this._stopped;
        } },

    /**
     * Indicates if the timer delaty is in seconds or in milliseconds (default milliseconds).
     * @type {boolean}
     * @name useSeconds
     * @memberof system.process.Timer
     * @instance
     */
    useSeconds: {
        get: function get() {
            return this._useSeconds;
        },
        set: function set(flag /*Boolean*/) {
            if (this._running) {
                throw new Error(this + " the 'useSeconds' property can't be changed during the running phase.");
            }
            this._useSeconds = Boolean(flag);
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    clone: { value: function value() {
            return new Timer(this._delay, this._repeatCount);
        } },

    /**
     * Restarts the timer. The timer is stopped, and then started.
     * @name resume
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    resume: { value: function value() {
            if (this._stopped) {
                this._running = true;
                this._stopped = false;
                this._itv = setInterval(this._next.bind(this), this._useSeconds ? this._delay * 1000 : this._delay);
                this.notifyResumed();
            }
        } },

    /**
     * Reset the timer and stop it before if it's running.
     * @name reset
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    reset: { value: function value() {
            if (this.running) {
                this.stop();
            }
            this._count = 0;
        } },

    /**
     * Run the timer.
     * @name run
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    run: { value: function value() {
            if (!this._running) {
                this._count = 0;
                this._stopped = false;
                this.notifyStarted();
                this._itv = setInterval(this._next.bind(this), this._useSeconds ? this._delay * 1000 : this._delay);
            }
        } },

    /**
     * Stops the timer.
     * @name stop
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    stop: { value: function value() {
            if (this._running && !this._stopped) {
                this._running = false;
                this._stopped = true;
                clearInterval(this._itv);
                this.notifyStopped();
            }
        } },

    /**
     * @private
     */
    _next: { value: function value() {
            this._count++;
            this.notifyProgress();
            if (this._repeatCount > 0 && this._repeatCount === this._count) {
                clearInterval(this._itv);
                this.notifyFinished();
            }
        } }
});

/**
 * Invoked this action to unlock a specific {@link system.process.Lockable} object.
 * @summary Invoked to unlock a specific {@link system.process.Lockable} object.
 * @name Unlock
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @example
 * var chain  = new system.process.Chain() ;
 * var unlock = new system.process.Unlock( chain ) ;
 *
 * chain.lock() ;
 *
 * unlock.run() ;
 *
 * trace( chain.isLocked() ) ;
 */
function Unlock(target) {
    Action.call(this);
    this.target = target;
}

Unlock.prototype = Object.create(Action.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { writable: true, value: Unlock },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Unlock
     * @function
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new Unlock(this.target);
        } },

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Unlock
     * @function
     * @instance
     */
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name And
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @example
 * var And = system.rules.And ;
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var rule1 = new BooleanRule( true  ) ;
 * var rule2 = new BooleanRule( false ) ;
 * var rule3 = new BooleanRule( true  ) ;
 *
 * var a ;
 *
 * a = new And( rule1 , rule1 ) ;
 * trace( a.eval() ) ; // true
 *
 * a = new And( rule1 , rule1 , rule1 ) ;
 * trace( a.eval() ) ; // true
 *
 * a = new And( rule1 , rule2 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule2 , rule1 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule2 , rule2 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule1 , rule2 , rule3 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule1 , rule3 ) ;
 * a.add( rule2 ) ;
 * trace( a.length ) ; // 3
 * trace( a.eval() ) ; // false
 *
 * a.clear()
 * trace( a.length ) ; // 0
 * trace( a.eval() ) ; // false
 * a.add(rule1) ;
 * trace( a.eval() ) ; // true
 */
function And(rule1 /*Rule*/, rule2 /*Rule*/) {
    Object.defineProperties(this, {
        /**
         * The collection of all rules to evaluate.
         * @memberof system.rules.And
         * @type {array}
         * @instance
         */
        rules: { value: [], enumerable: true },

        /**
         * The number of rules to evaluate.
         * @memberof system.rules.And
         * @type {number}
         * @instance
         * @readonly
         */
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

/**
 * Insert a new Rule in the And condition.
 * @name add
 * @memberof system.rules.And
 * @function
 * @instance
 * @param {system.rules.Rule} rule The rule to register.
 * @return The current object reference.
 */
And.prototype.add = function (rule) {
    if (rule instanceof Rule) {
        this.rules.push(rule);
    }
    return this;
};

/**
 * Clear all rules to evaluates.
 * @name clear
 * @memberof system.rules.And
 * @function
 * @instance
 * @return The current object reference.
 */
And.prototype.clear = function () {
    this.rules.length = 0;
    return this;
};

/**
 * Evaluates the specified object.
 * @memberof system.rules.And
 * @inheritdoc
 */
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

/**
 * Evaluates if the division of a value by another returns 0.
 * @name DivBy
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {number} [value1=NaN] - The first value to evaluate.
 * @param {number} [value2=NaN] - The second value to evaluate.
 * @example
 * var DivBy = system.rules.DivBy ;
 *
 * var cond ;
 *
 * cond = new DivBy( 4 , 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new DivBy( 5 , 2 ) ;
 * trace( cond.eval() ) ; // false
 */
function DivBy() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  /**
   * The first value to evaluate.
   * @memberof system.rules.DivBy
   * @name value1
   * @type {number}
   * @instance
   */
  this.value1 = value1;

  /**
   * The second value to evaluate.
   * @memberof system.rules.DivBy
   * @name value2
   * @type {number}
   * @instance
   */
  this.value2 = value2;
}

DivBy.prototype = Object.create(Rule.prototype);
DivBy.prototype.constructor = DivBy;

/**
 * Evaluates the specified object.
 * @memberof system.rules.DivBy
 * @inheritdoc
 */
DivBy.prototype.eval = function () {
  return this.value1 % this.value2 === 0;
};

/**
 * Evaluates if the value is even.
 * @name Even
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {number} [value=NaN] ) The value to evaluate.
 * @example
 * var cond ;
 * var Even = system.rules.Even ;
 *
 * cond = new Even( 0 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 1 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Even( 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 3 ) ;
 * trace( cond.eval() ) ; // false
 */
function Even() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;

  /**
   * The value to evaluate.
   * @memberof system.rules.Even
   * @name value
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value = value;
}

Even.prototype = Object.create(Rule.prototype);
Even.prototype.constructor = Even;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Even
 * @inheritdoc
 */
Even.prototype.eval = function () {
  return this.value % 2 === 0;
};

/**
 * Used to indicates if a value is greater or equal than another value.
 * @name GreaterOrEqualsThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var GreaterOrEqualsThan = system.rules.GreaterOrEqualsThan ;
 *
 * var rule ;
 *
 * rule = new GreaterOrEqualsThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new GreaterOrEqualsThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterOrEqualsThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 */
function GreaterOrEqualsThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  /**
   * The first value to evaluate.
   * @memberof system.rules.GreaterOrEqualsThan
   * @name value1
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value1 = value1;
  /**
   * The second value to evaluate.
   * @memberof system.rules.GreaterOrEqualsThan
   * @name value2
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value2 = value2;
}

GreaterOrEqualsThan.prototype = Object.create(Rule.prototype);
GreaterOrEqualsThan.prototype.constructor = GreaterOrEqualsThan;

/**
 * Evaluates the specified object.
 * @memberof system.rules.GreaterOrEqualsThan
 * @inheritdoc
 */
GreaterOrEqualsThan.prototype.eval = function () {
  return this.value1 >= this.value2;
};

/**
 * Used to indicates if a value is greater than another value.
 * @name GreaterThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var GreaterThan = system.rules.GreaterThan ;
 *
 * var rule ;
 *
 * rule = new GreaterThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 * </pre>
 */
function GreaterThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  /**
   * The first value to evaluate.
   * @memberof system.rules.GreaterThan
   * @name value1
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value1 = value1;
  /**
   * The second value to evaluate.
   * @memberof system.rules.GreaterThan
   * @name value2
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value2 = value2;
}

GreaterThan.prototype = Object.create(Rule.prototype);
GreaterThan.prototype.constructor = GreaterThan;

/**
 * Evaluates the specified object.
 * @memberof system.rules.GreaterThan
 * @inheritdoc
 */
GreaterThan.prototype.eval = function () {
  return this.value1 > this.value2;
};

/* jshint eqnull: true */
/**
 * Evaluates if the condition is a boolean.
 * @name IsBoolean
 * @memberof system.rules
 * @augments system.rules.Rule
 * @implements {system.rules.Rule}
 * @class
 * @constructs
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsBoolean = system.rules.IsBoolean ;
 *
 * trace( (new IsBoolean( 0 )).eval() ) ; // false
 * trace( (new IsBoolean( 1 )).eval() ) ; // false
 *
 * trace( (new IsBoolean( true )).eval() ) ; // true
 * trace( (new IsBoolean( false )).eval() ) ; // true
 *
 * trace( (new IsBoolean( new Boolean(true) )).eval() ) ; // true
 * trace( (new IsBoolean( new Boolean(false) )).eval() ) ; // true
 */
function IsBoolean() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  /**
   * The value to evaluate.
   * @memberof system.rules.IsBoolean
   * @name value
   * @type {Object}
   * @instance
   * @default null
   */
  this.value = value;
}

IsBoolean.prototype = Object.create(Rule.prototype);
IsBoolean.prototype.constructor = IsBoolean;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsBoolean
 * @inheritdoc
 */
IsBoolean.prototype.eval = function () {
  return typeof this.value === 'boolean' || this.value instanceof Boolean;
};

/**
 * Evaluates if the condition is NaN.
 * @name IsNaN
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value=NaN] - The value to evaluate.
 * @example
 * var IsNaN = system.rules.IsNaN ;
 * trace( (new IsNaN( 0 )).eval() ) ; // false
 * trace( (new IsNaN( 1 )).eval() ) ; // false
 * trace( (new IsNaN( 'foo' )).eval() ) ; // false
 * trace( (new IsNaN( NaN )).eval() ) ; // true
 *
 * trace( (new IsNaN( 0 , false )).eval() ) ; // false
 * trace( (new IsNaN( 1 , false )).eval() ) ; // false
 * trace( (new IsNaN( 'foo' , false )).eval() ) ; // true
 * trace( (new IsNaN( NaN , false)).eval() ) ; // true
 */
function IsNaN() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  /**
   * The condition to evaluate.
   * @memberof system.rules.True
   * @name value
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value = value;

  /**
   * The flag to indicates if the evaluation is strict (is <code>NaN</code> only) or not (test if the object is a <code>Number</code> and if not is <code>NaN</code>).
   * @memberof system.rules.IsNaN
   * @name strict
   * @type {boolean}
   * @instance
   * @default true
   */
  this.strict = Boolean(strict);
}

IsNaN.prototype = Object.create(Rule.prototype);
IsNaN.prototype.constructor = IsNaN;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsNaN
 * @inheritdoc
 */
IsNaN.prototype.eval = function () {
  if (this.strict) {
    return isNaN(this.value);
  } else {
    return !(this.value instanceof Number || typeof this.value === 'number') || isNaN(this.value);
  }
};

/* jshint eqnull: true */
/**
 * Evaluates if the condition is a boolean.
 * @name IsNumber
 * @memberof system.rules
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsNumber = system.rules.IsNumber ;
 *
 * trace( (new IsNumber( 0 )).eval() ) ; // true
 * trace( (new IsNumber( 1 )).eval() ) ; // true
 * trace( (new IsNumber( NaN )).eval() ) ; // true
 *
 * trace( (new IsNumber( true )).eval() ) ; // false
 * trace( (new IsNumber( null )).eval() ) ; // false
 */
function IsNumber() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  /**
   * The value to evaluate.
   * @memberof system.rules.IsNumber
   * @name value
   * @type {Object}
   * @instance
   * @default null
   */
  this.value = value;
}

IsNumber.prototype = Object.create(Rule.prototype);
IsNumber.prototype.constructor = IsNumber;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsNumber
 * @inheritdoc
 */
IsNumber.prototype.eval = function () {
  return typeof this.value === 'number' || this.value instanceof Number;
};

/* jshint eqnull: true */
/**
 * Evaluates if the condition is a string.
 * @name IsString
 * @memberof system.rules
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsString = system.rules.IsString ;
 *
 * trace( (new IsString( new String('hello') )).eval() ) ; // true
 * trace( (new IsString( 'hello' )).eval() ) ; // true
 * trace( (new IsString( '' )).eval() ) ; // true
 * trace( (new IsString( 1 )).eval() ) ; // false
 */
function IsString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  /**
   * The value to evaluate.
   * @memberof system.rules.IsString
   * @name value
   * @type {Object}
   * @instance
   * @default null
   */
  this.value = value;
}

IsString.prototype = Object.create(Rule.prototype);
IsString.prototype.constructor = IsString;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsString
 * @inheritdoc
 */
IsString.prototype.eval = function () {
  return typeof this.value === 'string' || this.value instanceof String;
};

/**
 * Used to indicates if a value is less or equal than another value.
 * @name LessOrEqualsThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var LessOrEqualsThan = system.rules.LessOrEqualsThan ;
 *
 * var rule ;
 *
 * rule = new LessOrEqualsThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessOrEqualsThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessOrEqualsThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // false
 */
function LessOrEqualsThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  /**
   * The first value to evaluate.
   * @memberof system.rules.LessOrEqualsThan
   * @name value1
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value1 = value1;
  /**
   * The second value to evaluate.
   * @memberof system.rules.LessOrEqualsThan
   * @name value2
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value2 = value2;
}

LessOrEqualsThan.prototype = Object.create(Rule.prototype);
LessOrEqualsThan.prototype.constructor = LessOrEqualsThan;

/**
 * Evaluates the specified object.
 * @memberof system.rules.LessOrEqualsThan
 * @inheritdoc
 */
LessOrEqualsThan.prototype.eval = function () {
  return this.value1 <= this.value2;
};

/**
 * Used to indicates if a value is greater than another value.
 * @name LessThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var LessThan = system.rules.LessThan ;
 *
 * var rule ;
 *
 * rule = new LessThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new LessThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // false
 */
function LessThan() {
  var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
  var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  /**
   * The first value to evaluate.
   * @memberof system.rules.LessThan
   * @name value1
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value1 = value1;
  /**
   * The second value to evaluate.
   * @memberof system.rules.LessThan
   * @name value2
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value2 = value2;
}

LessThan.prototype = Object.create(Rule.prototype);
LessThan.prototype.constructor = LessThan;

/**
 * Evaluates the specified object.
 * @memberof system.rules.LessThan
 * @inheritdoc
 */
LessThan.prototype.eval = function () {
  return this.value1 < this.value2;
};

/**
 * Used to perform logical negation on a specific condition.
 * @name Not
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {boolean|system.rules.Rule} [condition=false] - The condition to evaluate.
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 * var Not         = system.rules.Not ;
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 *
 * var no1 = new Not( true ) ;
 * var no2 = new Not( false ) ;
 * var no3 = new Not( cond1 ) ;
 * var no4 = new Not( cond2 ) ;
 *
 * trace( no1.eval() ) ; // false
 * trace( no2.eval() ) ; // true
 * trace( no3.eval() ) ; // false
 * trace( no4.eval() ) ; // true
 */
function Not() {
  var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  /**
   * The condition to evaluate.
   * @memberof system.rules.Not
   * @name value
   * @type {boolean|system.rules.Rule}
   * @instance
   * @default false
   */
  this.condition = condition;
}

Not.prototype = Object.create(Rule.prototype);
Not.prototype.constructor = Not;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Not
 * @inheritdoc
 */
Not.prototype.eval = function () {
  return !(this.condition instanceof Rule ? this.condition.eval() : Boolean(this.condition));
};

/**
 * Used to perform a logical conjunction on two conditions and more.
 * @name NotEquals
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {Object|system.rules.Rule|system.Equatable} [value1=null] - The first value to evaluate.
 * @param {Object|system.rules.Rule|system.Equatable} [value2=null] - The second value to evaluate.
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 * var NotEquals      =  system.rules.NotEquals ;
 *
 * var e ;
 *
 * ///// Compares objects.
 *
 * e = new NotEquals( 1 , 1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( 1 , 2 ) ;
 * trace( e.eval() ) ; // true
 *
 * ///// Compares Rule objects.
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( true  ) ;
 *
 * e = new NotEquals( cond1 , cond1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( cond1 , cond2 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new NotEquals( cond1 , cond3 ) ;
 * trace( e.eval() ) ; // false
 *
 * ///// Compares Equatable objects.
 *
 * var equals = function( o )
 * {
 *     return this.id === o.id ;
 * }
 *
 * var o1 = { id:1 , equals:equals } ;
 * var o2 = { id:2 , equals:equals } ;
 * var o3 = { id:1 , equals:equals } ;
 *
 * e = new NotEquals( o1 , o1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( o1 , o2 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new NotEquals( o1 , o3 ) ;
 * trace( e.eval() ) ; // false
 */
function NotEquals() {
    var value1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    /**
     * The first value to evaluate.
     * @memberof system.rules.Equals
     * @name value1
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value1 = value1;
    /**
     * The second value to evaluate.
     * @memberof system.rules.Equals
     * @name value2
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value2 = value2;
}

NotEquals.prototype = Object.create(Rule.prototype);
NotEquals.prototype.constructor = NotEquals;

/**
 * Evaluates the specified object.
 * @memberof system.rules.NotEquals
 * @inheritdoc
 */
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

/**
 * Evaluates if the value is odd.
 * @name Odd
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {number} [value=NaN] ) The value to evaluate.
 * @example
 * var cond ;
 * var Odd = system.rules.Odd ;
 *
 * cond = new Odd( 0 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Odd( 1 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Odd( 2 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Odd( 3 ) ;
 * trace( cond.eval() ) ; // true
 * </pre>
 */
function Odd() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;

  /**
   * The value to evaluate.
   * @memberof system.rules.Even
   * @name value
   * @type {number}
   * @instance
   * @default NaN
   */
  this.value = value;
}

Odd.prototype = Object.create(Rule.prototype);
Odd.prototype.constructor = Odd;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Odd
 * @inheritdoc
 */
Odd.prototype.eval = function () {
  return this.value % 2 !== 0;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Odd.prototype.toString = function () /*String*/
{
  return "[Odd]";
};

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name Or
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @example
 * var Or = system.rules.Or ;
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var rule1 = new BooleanRule( true  ) ;
 * var rule2 = new BooleanRule( false ) ;
 * var rule3 = new BooleanRule( true  ) ;
 *
 * var o ;
 *
 * o = new Or( rule1 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule1 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule2 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule2 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule2 , rule2 ) ;
 * trace( o.eval() ) ; // false
 *
 * o = new Or( rule1 , rule2 , rule3 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule3 ) ;
 * o.add( rule2 ) ;
 * trace( o.length ) ; // 3
 * trace( o.eval() ) ; // true
 *
 * o.clear()
 * trace( o.length ) ; // 0
 * trace( o.eval() ) ; // false
 * o.add(rule1) ;
 * trace( o.eval() ) ; // true
 */
function Or(rule1 /*Rule*/, rule2 /*Rule*/) {
    Object.defineProperties(this, {
        /**
         * The collection of all rules to evaluate.
         * @memberof system.rules.Or
         * @type {array}
         * @instance
         */
        rules: { value: [], enumerable: true },

        /**
         * The number of rules to evaluate.
         * @memberof system.rules.Or
         * @type {number}
         * @instance
         * @readonly
         */
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

/**
 * Insert a new Rule in the Or condition.
 * @name add
 * @memberof system.rules.Or
 * @function
 * @instance
 * @param {system.rules.Rule} rule The rule to register.
 * @return The current object reference.
 */
Or.prototype.add = function (rule) {
    if (rule instanceof Rule) {
        this.rules.push(rule);
    }
    return this;
};

/**
 * Clear all rules to evaluates.
 * @name clear
 * @memberof system.rules.Or
 * @function
 * @instance
 * @return The current object reference.
 */
Or.prototype.clear = function () {
    this.rules.length = 0;
    return this;
};

/**
 * Evaluates the specified object.
 * @memberof system.rules.Or
 * @inheritdoc
 */
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
 * The VEGAS.js framework - The system.rules library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.rules
 * @memberof system
 */
var rules = Object.assign({
    // singletons
    isRule: isRule,

    // classes
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
 * The enumeration of all string expressions in the signal engine.
 */

var strings$2 = Object.defineProperties({}, {
    INVALID_PARAMETER_TYPE: {
        value: "The parameter with the index {0} in the emit method is not valid.",
        enumerable: true
    },
    INVALID_PARAMETERS_LENGTH: {
        value: "The number of arguments in the emit method is not valid, must be invoked with {0} argument(s) and you call it with {1} argument(s).",
        enumerable: true
    },
    INVALID_TYPES: {
        value: "Invalid types representation, the Array of types failed at index {0} should be a constructor function but was:\"{1}\".",
        enumerable: true
    }
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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
  strings: strings$2,
  Receiver: Receiver,
  SignalEntry: SignalEntry,
  Signaler: Signaler,
  Signal: Signal
});

/**
 * The internal MotionNextFrame Receiver.
 * @name MotionNextFrame
 * @memberof system.transitions
 * @class
 * @implements Receiver
 * @constructor
 * @param {system.transitions.Motion} motion - The Motion reference who emit the messages.
 */
function MotionNextFrame(motion) {
    this.motion = motion instanceof Motion ? motion : null;
}

MotionNextFrame.prototype = Object.create(Receiver.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: MotionNextFrame },

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.MotionNextFrame
     * @function
     * @instance
     */
    receive: { value: function value() {
            if (this.motion) {
                this.motion.setTime(this.motion.useSeconds ? (performance$1.now() - this.motion._startTime) / 1000 : this.motion._time + 1);
            }
        } }
});

/**
 * The basic implementation of all transitions classes.
 * @name Transition
 * @memberof system.transitions
 * @extends {system.process.Task}
 * @interface
 */
function Transition() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    Task.call(this);

    Object.defineProperties(this, {
        /**
         * @private
         */
        _id: { value: id, writable: true }
    });
}

Transition.prototype = Object.create(Task.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: Transition, writable: true },

    /**
     * Indicates the id value of this object.
     * @memberof system.transitions.Transition
     * @default null
     * @type {*}
     * @instance
     */
    id: {
        get: function get() {
            return this._id;
        },
        set: function set(value) {
            this._id = value;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Transition
     * @abstract
     * @instance
     * @function
     */
    clone: { writable: true, value: function value() {
            return new Transition(this.id);
        } },

    /**
     * Compares the specified object with this object for equality. This method compares the ids of the objects with the <code>Identifiable.id</code> method.
     * @param {system.transitions.Transition} o - The object to compare.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    equals: { writable: true, value: function value(o) {
            if (o === this) {
                return true;
            } else if (o && o instanceof Transition) {
                return o.id === this.id;
            } else {
                return false;
            }
        } },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString: { value: function value() {
            return '[' + this.constructor.name + ']';
        } }
});

/**
 * The abstract motion class.
 * @name Motion
 * @memberof system.transitions
 * @implements {system.transitions.Transition}
 * @class
 * @constructor
 * @param {number} [id=null] The identfier of the object.
 */
function Motion() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    Transition.call(this, id);

    Object.defineProperties(this, {
        /**
         * Defined if the Motion used seconds or not.
         * @memberof system.transitions.Motion
         * @default false
         * @type {boolean}
         * @instance
         */
        useSeconds: { writable: true, value: false },

        /**
         * @private
         */
        _duration: { writable: true, value: 0 },

        /**
         * @private
         */
        _fps: { writable: true, value: NaN },

        /**
         * @private
         */
        _nextFrame: { value: new MotionNextFrame(this) },

        /**
         * @private
         */
        _prevTime: { writable: true, value: NaN },

        /**
         * @private
         */
        _startTime: { writable: true, value: NaN },

        /**
         * @private
         */
        _stopped: { writable: true, value: false },

        /**
         * @private
         */
        _target: { writable: true, value: null },

        /**
         * @private
         */
        _time: { writable: true, value: NaN },

        /**
         * @private
         */
        _timer: { writable: true, value: null }
    });

    this.setTimer(new FrameTimer());
}

Motion.prototype = Object.create(Transition.prototype, {
    // ------------- public properties

    /**
     * The constructor reference of the instance.
     */
    constructor: { value: Motion, writable: true },

    // ------------- get/set

    /**
     * Indicates the duration of the tweened animation in frames or seconds (default 0).
     * @memberof system.transitions.Motion
     * @default false
     * @type {number}
     * @instance
     */
    duration: {
        get: function get() {
            return this._duration;
        },
        set: function set(value) {
            this._duration = isNaN(value) || value <= 0 ? 0 : value;
        }
    },

    /**
     * Indicates the number of frames per second of the tweened animation.
     * @memberof system.transitions.Motion
     * @default NaN
     * @type {number}
     * @instance
     */
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

    /**
     * Indicates the internal previous time value.
     * @memberof system.transitions.Motion
     * @type {number}
     * @instance
     */
    prevTime: {
        get: function get() {
            return this._prevTime;
        }
    },

    /**
     * Indicates if the motion is stopped.
     * @memberof system.transitions.Motion
     * @default false
     * @type {boolean}
     * @instance
     */
    stopped: {
        get: function get() {
            return this._stopped;
        }
    },

    /**
     * Indicates the target reference of the object contrains by the Motion effect.
     * @memberof system.transitions.Motion
     * @type {Object}
     * @instance
     */
    target: {
        get: function get() {
            return this._target;
        },
        set: function set(value) {
            this._target = value;
        }
    },

    // ------------- public methods

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    clone: { writable: true, value: function value() {
            return new Motion(this.id);
        } },

    /**
     * Forwards the tweened animation to the next frame.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    nextFrame: { value: function value() {
            this.setTime(this.useSeconds ? (performance$1.now() - this._startTime) / 1000 : this._time + 1);
        } },

    /**
     * Directs the tweened animation to the frame previous to the current frame.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    prevFrame: { value: function value() {
            if (!this.useSeconds) {
                this.setTime(this._time - 1);
            }
        } },

    /**
     * Resumes a tweened animation from its stopped point in the animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
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

    /**
     * Rewinds a tweened animation to the beginning of the tweened animation.
     * @param {number} time - The time value to rewind the motion.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    rewind: { value: function value() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this._time = time > 0 ? time : 0;
            this.fixTime();
            this.update();
        } },

    /**
     * Runs the object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    run: { writable: true, value: function value() {
            this._stopped = false;
            this.notifyStarted();
            this.rewind();
            this.startInterval();
        } },

    /**
     * Sets the current time within the duration of the animation.
     * @param {number} time - The time value to rewind the motion.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
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

    /**
     * Starts the internal interval of the tweened animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    startInterval: { value: function value() {
            this._timer.start();
            this._running = true;
        } },

    /**
     * Stops the tweened animation at its current position.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    stop: { value: function value() {
            if (this._running) {
                this.stopInterval();
                this._stopped = true;
                this.notifyStopped();
            }
        } },

    /**
     * Stops the intenral interval of the tweened animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    stopInterval: { value: function value() {
            this._timer.stop();
            this._running = false;
        } },

    /**
     * Update the current object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     * @abstract
     */
    update: { writable: true, value: function value() {
            //
        } },

    // ------------- private

    /**
     * @protected
     */
    fixTime: { value: function value() {
            if (this.useSeconds) {
                this._startTime = performance$1.now() - this._time * 1000;
            }
        } },

    /**
     * Sets the internal timer of the tweened animation.
     * @protected
     */
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

/**
 * The TweenUnit class interpolate in time a value between <code>0</code> and <code>1</code>.
 * @summary The TweenUnit class interpolate in time a value between <code>0</code> and <code>1</code>.
 * @name TweenUnit
 * @memberof system.transitions
 * @class
 * @constructor
 * @extends {system.transitions.Motion}
 * @tutorial system.transitions
 * @example
 * var change = function( tween )
 * {
 *     trace( 'progress ' + tween.position ) ;
 * }
 *
 * var finish = function()
 * {
 *     trace( 'finish' ) ;
 * }
 *
 * var start = function()
 * {
 *     trace( 'start' ) ;
 * }
 *
 * var tween = new TweenUnit( core.easings.backOut , 48 ) ;
 *
 * //tween.easing = core.easings.cubicOut ;
 * //tween.easing = core.easings.elasticOut ;
 * //tween.easing = core.easings.sineOut ;
 *
 * /tween.fps = 24  ; // use the system.process.Timer class
 * tween.fps = NaN ; // Use the system.process.FrameTimer
 *
 * //tween.looping = true ;
 *
 * tween.finishIt.connect( finish ) ;
 * tween.changeIt.connect( change ) ;
 * tween.startIt.connect( start ) ;
 *
 * tween.run() ;
 */
function TweenUnit() {
    var easing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var auto = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    Motion.call(this, id);

    Object.defineProperties(this, {
        /**
         * The current position of this tween.
         * @memberof system.transitions.TweenUnit
         * @default 0
         * @type {number}
         * @instance
         */
        position: { writable: true, value: 0 },

        /**
         * @private
         */
        _change: { writable: true, value: 1 }, // max - min

        /**
         * @private
         */
        _easing: { writable: true, value: easing instanceof Function ? easing : linear }
    });

    this.duration = duration;
    this.useSeconds = useSeconds;

    if (auto) {
        this.run();
    }
}

TweenUnit.prototype = Object.create(Motion.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: TweenUnit, writable: true },

    /**
     * Defines the easing method reference of this entry.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     * @see {core.easings}
     */
    easing: {
        get: function get() {
            return this._easing;
        },
        set: function set(value) {
            this._easing = value instanceof Function ? value : linear;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     */
    clone: { writable: true, value: function value() {
            return new TweenUnit(this.easing, this.duration, this.useSeconds);
        } },

    /**
     * Set the TweenUnit properties.
     * @param {Function} easing - The easing function of the tween entry.
     * @param {number} [duration=0] - The length of time or number of frames for the tween motion.
     * @param {boolean} [useSeconds=false] - Indicates if the duration is in seconds.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     * @see {core.easings}
     */
    set: { value: function value(easing) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var useSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            this.duration = duration;
            this.useSeconds = useSeconds;
            this.easing = easing;
        } },

    /**
     * Update the current tween.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     */
    update: { writable: true, value: function value() {
            if (this._easing) {
                this.position = this._easing(this._time, 0, this._change, this._duration);
                this.notifyChanged();
            } else {
                this.position = null;
            }
        } }
});

/**
 * The Tween class lets you use to move, resize, and fade visual elements easily on the stage of your applications by specifying a property of the target movieclips or sprites to be tween animated over a number of frames or seconds.
 * <p>The Tween class also lets you specify a variety of {@link core.easings|easing} methods.</p>
 * <p>Easing refers to gradual acceleration or deceleration during an animation, which helps your animations appear more realistic.</p>
 * @summary The Tween class lets you use to move, resize, and fade visual elements easily on your applications.
 * @name Tween
 * @memberof system.transitions
 * @class
 * @constructor
 * @extends {system.transitions.Motion}
 * @tutorial system.transitions
 * @example
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
function Tween(init) {
    TweenUnit.call(this);
    this.position = null;
    Object.defineProperties(this, {
        /**
         * @private
         */
        _begin: { writable: true, value: null },

        /**
         * @private
         */
        _changed: { writable: true, value: false },

        /**
         * @private
         */
        _easings: { writable: true, value: null },

        /**
         * @private
         */
        _from: { writable: true, value: null },

        /**
         * @private
         */
        _target: { writable: true, value: null },

        /**
         * @private
         */
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

/**
 * @extends TweenUnit
 */
Tween.prototype = Object.create(TweenUnit.prototype, {
    /**
     * The constructor reference of the instance.
     */
    constructor: { value: TweenUnit, writable: true },

    /**
     * Determinates the generic object with all custom easing functions to interpolate the transition of the specific component in time.
     * If this object is null, the default numeric attributes of the target are used.
     * @name easings
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    easings: {
        get: function get() {
            return this._easings;
        },
        set: function set(value) {
            this._easings = value;
        }
    },

    /**
     * Determinates the generic object with all numeric attributes to start the transition.
     * If this object is null, the default numeric attributes of the target are used.
     * @name from
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    from: {
        get: function get() {
            return this._from;
        },
        set: function set(value) {
            this._from = value;
            this._changed = true;
        }
    },

    /**
     * Indicates the target reference of the object contrains by the Motion effect.
     * @name target
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    target: {
        get: function get() {
            return this._target;
        },
        set: function set(value) {
            this._target = value;
            this._changed = true;
        }
    },

    /**
     * Determinates the generic object with all properties to change inside.
     * @name to
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    to: {
        get: function get() {
            return this._to;
        },
        set: function set(value) {
            this._to = value;
            this._changed = true;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
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

    /**
     * Notify when the process is finished.
     * @name notifyFinished
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
    notifyFinished: { value: function value() {
            this._changed = true;
            this._running = false;
            this._phase = TaskPhase.FINISHED;
            this.finishIt.emit(this);
            this._phase = TaskPhase.INACTIVE;
        } },

    /**
     * Runs the process
     * @name run
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
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

    /**
      * Update the current object.
     * @name update
     * @memberof system.transitions.Tween
     * @instance
     * @function
      */
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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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
 * The {@link system} library is the root package for the <strong>VEGAS JS</strong> framework. It is the starting point of our RIA framework structure.
 * <p><b>Dependencies :</b> The {@link system} framework reuse the module and building blocks of the {@link core} library.</p>
 * @summary The {@link system} library is the root package for the <strong>VEGAS JS</strong> framework.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system
 */
var system = Object.assign({
    // interfaces

    Enum: Enum,
    Equatable: Equatable,
    Evaluable: Evaluable,
    Formattable: Formattable,

    // functions

    isEvaluable: isEvaluable,
    isFormattable: isFormattable,

    // packages

    data: data,
    errors: errors,
    evaluators: evaluators,
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

/**
 * Indicates if the specific objet is Directionable.
 */

function isDirectionable(target) {
  if (target) {
    return target instanceof Directionable || 'direction' in target;
  }

  return false;
}

/**
 * This interface defines a graphic object or component with a direction.
 */
function Directionable() {
  this.direction = null;
}

/**
 * @extends Object
 */
Directionable.prototype = Object.create(Object.prototype);
Directionable.prototype.constructor = Directionable;

/**
 * Compares the specified object with this object for equality.
 * @return true if the the specified object is equal with this object.
 */
Directionable.prototype.direction = null;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Directionable.prototype.toString = function () /*String*/
{
  return "[Directionable]";
};

/*jshint bitwise: false*/
/**
 * The Align enumeration class provides constant values to align displays or components.
 * @name Align
 * @namespace graphics.Align
 * @memberof graphics
 */

var Align = Object.defineProperties({}, {
    /**
     * Defines the NONE value (0).
     * @memberof graphics.Align
     * @type {number}
     * @default 0
     */
    NONE: { enumerable: true, value: 0 },

    /**
     * Defines the CENTER value (1).
     * @memberof graphics.Align
     * @type {number}
     * @default 1
     */
    CENTER: { enumerable: true, value: 1 },

    /**
     * Defines the LEFT value (2).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 2
     */
    LEFT: { enumerable: true, value: 2 },

    /**
     * Defines the RIGHT value (4).
     * @type {number}
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 4
     */
    RIGHT: { enumerable: true, value: 4 },

    /**
     * Defines the TOP value (8).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 8
     */
    TOP: { enumerable: true, value: 8 },

    /**
     * Defines the BOTTOM value (16).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 16
     */
    BOTTOM: { enumerable: true, value: 16 },

    /**
     * Defines the REVERSE value (32).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 32
     */
    REVERSE: { enumerable: true, value: 32 },

    /**
     * Defines the BOTTOM_LEFT value (18).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default graphics.Align.BOTTOM | graphics.Align.LEFT
     */
    BOTTOM_LEFT: { enumerable: true, value: 16 | 2 },

    /**
     * Defines the BOTTOM_RIGHT value (20).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default graphics.Align.BOTTOM | graphics.Align.RIGHT
     */
    BOTTOM_RIGHT: { enumerable: true, value: 16 | 4 },

    /**
     * Defines the CENTER_LEFT value (3).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 3
     */
    CENTER_LEFT: { enumerable: true, value: 3 },

    /**
     * Defines the CENTER_RIGHT value (5).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 5
     */
    CENTER_RIGHT: { enumerable: true, value: 5 },

    /**
     * Defines the TOP_LEFT value (10).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 10
     */
    TOP_LEFT: { enumerable: true, value: 10 },

    /**
     * Defines the TOP_RIGHT value (12).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 12
     */
    TOP_RIGHT: { enumerable: true, value: 12 },

    /**
     * Defines the LEFT_BOTTOM value (50).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 50
     */
    LEFT_BOTTOM: { enumerable: true, value: 50 },

    /**
     * Defines the RIGHT_BOTTOM value (52).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 52
     */
    RIGHT_BOTTOM: { enumerable: true, value: 52 },

    /**
     * Defines the LEFT_TOP value (42).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 42
     */
    LEFT_TOP: { enumerable: true, value: 8 | 2 | 32 },

    /**
     * Defines the RIGHT_TOP value (44).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 44
     */
    RIGHT_TOP: { enumerable: true, value: 8 | 4 | 32 },

    /**
     * Converts a string value in this Align value. If the String value isn't valid the Align.CENTER value is return.
     * @memberof graphics.Align
     * @function
     * @example
     * trace( Align.toNumber("l") == Align.LEFT ) ; // true
     */
    toNumber: { value: function value(str) {
            var none = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (str === null || !(str instanceof String || typeof str === 'string')) {
                return none;
            }
            str = str.toLowerCase();
            return str in Align.stringToNumber ? Align.stringToNumber[str] : none;
        } },

    /**
     * Returns the string representation of the specified Align value passed in argument.
     * @memberof graphics.Align
     * @function
     * @param {number} value - The valid numeric value to convert in a string expression.
     * @return the string representation of the specified Align value passed in argument.
     * @example
     * trace( Align.toString(Align.LEFT)) ; // "l"
     * trace( Align.toString(Align.TOP_LEFT)) ; // "tl"
     * trace( Align.toString(Align.RIGHT_BOTTOM)) ; // "rb"
     */
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

    /**
     * Returns <code>true</code> if the specified Align value in argument is a valid Align value else returns <code>false</code>.
     * @memberof graphics.Align
     * @function
     * @example
     * trace( Align.validate(Align.LEFT)) ; // true
     * trace( Align.toString(1000)) ; // false
     * @param {number} value - The numeric value to validate.
     * @return <code>true</code> if the specified Align value in argument is a valid Align value else returns <code>false</code>.
     */
    validate: { value: function value(_value2) {
            return Align.alignments.indexOf(_value2) > -1;
        } }
});

/**
 * Defines the alignments collection of all valid aligment elements.
 * @memberof graphics.Align
 * @type {Array}
 * @readonly
 */
Object.defineProperty(Align, 'alignments', { value: [Align.BOTTOM, Align.BOTTOM_LEFT, Align.BOTTOM_RIGHT, Align.CENTER, Align.CENTER_LEFT, Align.CENTER_RIGHT, Align.LEFT, Align.LEFT_BOTTOM, Align.LEFT_TOP, Align.RIGHT, Align.RIGHT_BOTTOM, Align.RIGHT_TOP, Align.TOP, Align.TOP_LEFT, Align.TOP_RIGHT, Align.NONE] });

/**
 * Defines the key/value map to register all aligments by name (string).
 * @memberof graphics.Align
 * @type {Object}
 * @readonly
 */
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

/**
 * This static singleton to enumerates all types used to draw an Arc.
 * @name ArcType
 * @namespace graphics.ArcType
 * @memberof graphics
 */

var ArcType = Object.defineProperties({}, {
  /**
   * The 'chord' type.
   * @memberof graphics.ArcType
   * @static
   * @type {string}
   * @default 'chord'
   */
  CHORD: { enumerable: true, value: 'chord' },

  /**
   * The 'none' type.
   * @memberof graphics.ArcType
   * @static
   * @type {string}
   * @default 'none'
   */
  NONE: { enumerable: true, value: 'none' },

  /**
   * The 'pie' type.
   * @memberof graphics.ArcType
   * @static
   * @type {string}
   * @default 'pie'
   */
  PIE: { enumerable: true, value: 'pie' }
});

/*jshint bitwise: false*/
/**
 * Enables/Disables the border on the specified sides. The border is specified as an integer bitwise combination of the constants: LEFT, RIGHT, TOP, BOTTOM.
 * @example
 * <pre>
 * var Border = graphics.Border ;
 *
 * var border:Border = new Border( Border.NO_BORDER ) ;
 *
 * trace( border ) ;
 * trace( border.hasBorders() ) ;
 *
 * border.enableBorderSide( Border.TOP ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.BOTTOM ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.LEFT ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.RIGHT ) ;
 * trace( border ) ;
 * </pre>
 */

function Border() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

    Object.defineProperties(this, {
        /**
         * The side value, an integer bitwise combination.
         */
        value: { value: side, writable: true }
    });
}

Object.defineProperties(Border, {
    /**
     * This represents the value to set all the sides of the Rectangle (30).
     */
    ALL: { enumerable: true, value: 30 },

    /**
     * Defines the NONE value (0).
     */
    NONE: { enumerable: true, value: 0 },

    /**
     * This represents the bottom side of the border of the Rectangle (16).
     */
    BOTTOM: { enumerable: true, value: 16 },

    /**
     * This represents the left side of the border of the Rectangle (2).
     */
    LEFT: { enumerable: true, value: 2 },

    /**
     * This represents a rectangle without borders (0).
     */
    NO_BORDER: { enumerable: true, value: 0 },

    /**
     * This represents the right side of the border of the Rectangle (4).
     */
    RIGHT: { enumerable: true, value: 4 },

    /**
     * This represents the top side of the border of the Rectangle (8).
     */
    TOP: { enumerable: true, value: 8 }
});

/**
 * @extends Object
 */
Border.prototype = Object.create(Object.prototype, {
    /**
     * Enables the border on the specified side.
     * @param side  the side to enable. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    enableBorderSide: { value: function value(side) {
            this.toggleBorder(side, true);
        } },

    /**
     * Disables the border on the specified side.
     * @param side the side to disable. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    disableBorderSide: { value: function value(side) {
            this.toggleBorder(side, false);
        } },

    /**
     * Indicates whether the specified type of border is set. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    hasBorder: { value: function value(type) {
            return Boolean(type & this.value);
        } },

    /**
     * Indicates whether some type of border is set. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    hasBorders: { value: function value() {
            return this.hasBorder(Border.TOP) || this.hasBorder(Border.BOTTOM) || this.hasBorder(Border.LEFT) || this.hasBorder(Border.RIGHT);
        } },

    /**
     * Toggle a side in this border object.
     */
    toggleBorder: { value: function value(side) {
            var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var old = this.value;
            this.value = flag ? this.value | side : this.value & ~side;
            return old !== this.value;
        } },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return "[Border " + this.value + "]";
        } },

    /**
     * Returns the value of the object.
     * @return the value of the object.
     */
    valueOf: { value: function value() {
            return this.value;
        } }
});

/**
 * The four cardinal directions or cardinal points are the directions of north, south, east, and west, commonly denoted by their initials: N, S, E, W.
 * They are mostly used for geographic orientation on Earth but may be calculated anywhere on a rotating astronomical body.
 * @name CardinalDirection
 * @memberof graphics
 * @extends Object
 * @class
 * @param {number} [value=0] - The numeric value who define the direction.
 * @param {string} [name] - The name of the direction.
 * @param {number} [azimut=0] - The azimut angle.
 */

function CardinalDirection() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var azimut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    Object.defineProperties(this, {
        /**
         * @private
         */
        _value: { value: value, writable: true },

        /**
         * @private
         */
        _name: { value: name, writable: true },

        /**
         * @private
         */
        _azimut: { value: azimut, writable: true }
    });
}

CardinalDirection.prototype = Object.create(Object.prototype, {
    /**
     * Indicates the angular measurement in a spherical coordinate system (in degrees).
     * @memberof graphics.CardinalDirection
     * @type {number}
     * @instance
     */
    azimut: { value: function value() {
            return this._azimut;
        } },

    /**
     * Returns the String representation of the object.
     * @memberof graphics.CardinalDirection
     * @return {string} The String representation of the object.
     * @instance
     */
    toString: { value: function value() {
            return this._name;
        } },

    /**
     * Returns the value of the object.
     * @return the value of the object.
     * @instance
     */
    valueOf: { value: function value() {
            return this._value;
        } }
});

Object.defineProperties(CardinalDirection, {
    /**
     * This represents the value to set all the sides of the Rectangle (30).
     * @memberof graphics.CardinalDirection
     */
    E: { enumerable: true, value: new CardinalDirection(Math.PI / 2, "E", 90) },

    /**
     * The East-North-East cardinal point "ENE" : Azimut:67.5° Radians:3π/8
     * @memberof graphics.CardinalDirection
     */
    ENE: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 8, "ENE", 67.5) },

    /**
     * The East-South-East cardinal point "ESE" : Azimut:112,5° Radians:5π/8
     * @memberof graphics.CardinalDirection
     */
    ESE: { enumerable: true, value: new CardinalDirection(5 * Math.PI / 8, "ESE", 112.5) },

    /**
     * The North cardinal point "N" : Azimut:0° Radians:0
     * @memberof graphics.CardinalDirection
     */
    N: { enumerable: true, value: new CardinalDirection(0, "N", 0) },

    /**
     * The North-East cardinal point "NE" : Azimut:45° Radians:π/4
     * @memberof graphics.CardinalDirection
     */
    NE: { enumerable: true, value: new CardinalDirection(Math.PI / 4, "NE", 45) },

    /**
     * The North-North-East cardinal point "NNE" : Azimut:22.5° Radians:π/8
     * @memberof graphics.CardinalDirection
     */
    NNE: { enumerable: true, value: new CardinalDirection(Math.PI / 8, "NNE", 22.5) },

    /**
     * The North-North-West cardinal point "NNW" : Azimut:337.5° Radians:15π/8
     * @memberof graphics.CardinalDirection
     */
    NNW: { enumerable: true, value: new CardinalDirection(15 * Math.PI / 8, "NNW", 337.5) },

    /**
     * The North-West cardinal point "NW" : Azimut:315° Radians:7π/4
     * @memberof graphics.CardinalDirection
     */
    NW: { enumerable: true, value: new CardinalDirection(7 * Math.PI / 4, "NW", 315) },

    /**
     * The South cardinal point "S" : Azimut:180° Radians:π
     * @memberof graphics.CardinalDirection
     */
    S: { enumerable: true, value: new CardinalDirection(Math.PI, "S", 180) },

    /**
     * The South-East cardinal point "SE" : Azimut:135° Radians:3π/4
     * @memberof graphics.CardinalDirection
     */
    SE: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 4, "SE", 135) },

    /**
     * The South-South-East cardinal point "SSE" : Azimut:157.5° Radians:7π/8
     * @memberof graphics.CardinalDirection
     */
    SSE: { enumerable: true, value: new CardinalDirection(7 * Math.PI / 8, "SSE", 157.5) },

    /**
     * The South-South-West cardinal point "SSW" : Azimut:202.5° Radians:9π/8
     * @memberof graphics.CardinalDirection
     */
    SSW: { enumerable: true, value: new CardinalDirection(9 * Math.PI / 8, "SSW", 202.5) },

    /**
     * The South-West cardinal point "SW" : Azimut:225° Radians:5π/4
     * @memberof graphics.CardinalDirection
     */
    SW: { enumerable: true, value: new CardinalDirection(5 * Math.PI / 4, "SW", 225) },

    /**
     * The West cardinal point "W" : Azimut:270° Radians:3π/2
     * @memberof graphics.CardinalDirection
     */
    W: { enumerable: true, value: new CardinalDirection(3 * Math.PI / 2, "W", 270) },

    /**
     * The West-North-West cardinal point "WNW" : Azimut:292.5° Radians:13π/8
     * @memberof graphics.CardinalDirection
     */
    WNW: { enumerable: true, value: new CardinalDirection(13 * Math.PI / 8, "WNW", 292.5) },

    /**
     * The West-South-West cardinal point "WSW" : Azimut:247.5° Radians:11π/8
     * @memberof graphics.CardinalDirection
     */
    WSW: { enumerable: true, value: new CardinalDirection(11 * Math.PI / 8, "WSW", 247.5) }
});

Object.defineProperties(CardinalDirection, {
    /**
     * The set of all diagonal directions (northeast, southeast, southwest, northwest).
     * @memberof graphics.CardinalDirection
     */
    ALL: { enumerable: true, value: [CardinalDirection.N, CardinalDirection.E, CardinalDirection.S, CardinalDirection.W, CardinalDirection.NE, CardinalDirection.SE, CardinalDirection.NW, CardinalDirection.SW, CardinalDirection.NNE, CardinalDirection.NNW, CardinalDirection.SSE, CardinalDirection.SSW, CardinalDirection.ENE, CardinalDirection.ESE, CardinalDirection.WNW, CardinalDirection.WSW] },

    /**
     * The set of all diagonal directions (northeast, southeast, southwest, northwest).
     * @memberof graphics.CardinalDirection
     */
    DIAGONALS: { value: [CardinalDirection.NE, CardinalDirection.SE, CardinalDirection.NW, CardinalDirection.SW] },

    /**
     * The set of all orthogonals directions (north, south, south, north).
     * @memberof graphics.CardinalDirection
     */
    ORTHOGONALS: { value: [CardinalDirection.N, CardinalDirection.E, CardinalDirection.S, CardinalDirection.W] },

    /**
     * Returns true if this is a diagonal direction (northeast, southeast, southwest, northwest).
     * @param {graphics.CardinalDirection} direction - The direction to check.
     * @return true if this is a diagonal direction.
     * @function
     * @memberof graphics.CardinalDirection
     */
    isDiagonal: { value: function value(direction) {
            return CardinalDirection.DIAGONALS.indexOf(direction) > -1;
        } },

    /**
     * Returns true if this is an orthogonal direction (north, east, south, west).
     * @param {graphics.CardinalDirection} direction - The direction to check.
     * @return true if this is an orthogonal direction.
     * @function
     * @memberof graphics.CardinalDirection
     */
    isOrthogonal: { value: function value(direction) {
            return CardinalDirection.ORTHOGONALS.indexOf(direction) > -1;
        } }
});

/**
 * Determinates the corner definition.This object is use to set for example the CornerRectanglePen implementation (Bevel, RoundedComplex, etc.)
 */

function Corner() {
    var tl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var tr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var br = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var bl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    Object.defineProperties(this, {
        /**
         * The bottom left flag value.
         */
        bl: { value: bl === true, writable: true, enumerable: true },

        /**
         * The bottom right flag value.
         */
        br: { value: br === true, writable: true, enumerable: true },

        /**
         * The top left flag value.
         */
        tl: { value: tl === true, writable: true, enumerable: true },

        /**
         * The top right flag value.
         */
        tr: { value: tr === true, writable: true, enumerable: true }
    });
}

/**
 * @extends Object
 */
Corner.prototype = Object.create(Object.prototype, {
    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     */
    clone: { value: function value() {
            return new Corner(this.tl, this.tr, this.br, this.bl);
        } },

    /**
     * Compares the specified object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals: { value: function value(o) {
            if (o === this) {
                return true;
            } else if (o instanceof Corner) {
                return this.tl === o.tl && o.tr === this.tr && o.bl === this.bl && o.br === this.br;
            } else {
                return false;
            }
        } },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString: { value: function value() {
            return "[Corner tl:" + this.tl + " tr:" + this.tr + " br:" + this.br + " bl:" + this.bl + "]";
        } }
});

/**
 * The most common relative directions are horizontal, vertical, both, left, right, forward, backward, none, up, and down.
 */

var Direction = Object.defineProperties({}, {
  /**
   * Specifies the "backward" value to change the orientation of a Display or a component.
   */
  BACKWARD: { enumerable: true, value: 'backward' },

  /**
   * Specifies the "both" value to represent both horizontal and vertical scrolling.
   */
  BOTH: { enumerable: true, value: 'both' },

  /**
   * Specifies the "down" value to change the orientation of a Display or a component.
   */
  DOWN: { enumerable: true, value: 'down' },

  /**
   * Specifies the "forward" value to change the direction or scrolling of a Display or a component.
   */
  FORWARD: { enumerable: true, value: 'forward' },

  /**
    * Specifies the "horizontal" value to change the orientation of a Display or a component.
    */
  HORIZONTAL: { enumerable: true, value: 'horizontal' },

  /**
   * Specifies the "left" value to change the orientation of a Display or a component.
   */
  LEFT: { enumerable: true, value: 'left' },

  /**
   * Specifies the "none" value to represent no scrolling or an object without direction.
   */
  NONE: { enumerable: true, value: 'none' },

  /**
   * Specifies the "right" value to change the orientation of a Display or a component.
   */
  RIGHT: { enumerable: true, value: 'right' },

  /**
   * Specifies the "up" value to change the orientation of a Display or a component.
   */
  UP: { enumerable: true, value: 'up' },

  /**
   * Specifies the "vertical" value to change the orientation of a Display or a component.
   */
  VERTICAL: { enumerable: true, value: 'vertical' }
});

/**
 * Defines the order to display all children in a specific horizontal or vertical container.
 * Children within a horizontally oriented box are, by default, displayed from left to right in the same order as they appear in the source document.
 * Children within a vertically oriented box are displayed top to bottom in the same order.
 */

var DirectionOrder = Object.defineProperties({}, {
  /**
   * Specifies the "normal" direction order. The horizontal containers displays its children from left to right and the vertical containers displays its children from top to bottom.
   */
  NORMAL: { enumerable: true, value: 'normal' },

  /**
   * Specifies the "reverse" direction order. The horizontal containers displays its children from right to left and the vertical containers displays its children from bottom to top.
   */
  REVERSE: { enumerable: true, value: 'reverse' }
});

/**
 * The layout buffering modes.
 */

var LayoutBufferMode = Object.defineProperties({}, {
  /**
   * The "auto" buffering mode is used when the layout initialize
   * this internal buffer with all childs registered in the container of the layout.
   */
  AUTO: { enumerable: true, value: 'auto' },

  /**
   * The "normal" buffering mode use the natural internal buffer of the layout,
   * the user must fill the layout manually.
   */
  NORMAL: { enumerable: true, value: 'normal' }
});

/**
 * The Dimension object encapsulates the width and height components of an object.
 * @name Dimension
 * @memberof graphics.geom
 * @class
 * @constructs
 * @extends Object
 * @param {number} [width=0] the width value.
 * @param {number} [height=0] The height value.
 */

function Dimension() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    Object.defineProperties(this, {
        /**
         * The height of the rectangle, in pixels.
         * @memberof graphics.geom.Dimension
         * @default 0
         * @type {Number}
         * @instance
         */
        height: { value: isNaN(height) ? 0 : height, writable: true },

        /**
         * The width of the rectangle, in pixels.
         * @memberof graphics.geom.Dimension
         * @default 0
         * @type {Number}
         * @instance
         */
        width: { value: isNaN(width) ? 0 : width, writable: true }
    });
}

Dimension.prototype = Object.create(Object.prototype, {
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    clone: { writable: true, value: function value() {
            return new Dimension(this.width, this.height);
        } },

    /**
     * Copies all of data from the source Dimension object into the calling Dimension object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    copyFrom: { value: function value(dim) {
            this.width = dim.width;
            this.height = dim.height;
            return this;
        } },

    /**
     * Decreases the size by a specific width/height values and return its self(this).
     * @param {number} [dWidth=0] - A number value to descrease the width component of the object (default 0).
     * @param {number} [dHeight=0] - A number value to descrease the height component of the object (default 0).
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    decrease: { value: function value() {
            var dWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.width -= isNaN(dWidth) ? 0 : dWidth;
            this.height -= isNaN(dHeight) ? 0 : dHeight;
            return this;
        } },

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    equals: { writable: true, value: function value(o) {
            if (o instanceof Dimension) {
                return o.width === this.width && o.height === this.height;
            } else {
                return false;
            }
        } },

    /**
     * Increases the size by a specific width/height values and return its self(this).
     * @param {number} [dWidth=0] - A number value to increase the width component of the object (default 0).
     * @param {number} [dHeight=0] - A number value to inscrease the height component of the object (default 0).
     * @return the current reference of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    increase: { value: function value() {
            var dWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.width += isNaN(dWidth) ? 0 : dWidth;
            this.height += isNaN(dHeight) ? 0 : dHeight;
            return this;
        } },

    /**
     * Determines whether or not this Rectangle object is empty.
     * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    isEmpty: { value: function value() {
            return this.width <= 0 || this.height <= 0;
        } },

    /**
     * Sets the members of Dimension to the specified values.
     * @param {number} width - The width component value to change (default 0).
     * @param {number} height - The height component value to change (default 0).
     * @return {graphics.geom.Dimension} The object reference.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    set: { value: function value() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.width = width;
            this.height = height;
            return this;
        } },

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    toObject: { writable: true, value: function value() {
            return { width: this.width, height: this.height };
        } },

    /**
     * Returns the string representation of this object.
     * @return the string representation of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    toString: { writable: true, value: function value() {
            return "[Dimension width:" + this.width + " height:" + this.height + "]";
        } }
});

/**
 * The Vector2 class represents a simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @name Vector2
 * @memberof graphics.geom
 * @constructor
 * @class
 * @param {number} x - The x value of the object.
 * @param {number} y - The y value of the object.
 */

function Vector2() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    Object.defineProperties(this, {
        /**
         * Determinates the x value of this object.
         * @memberof graphics.geom.Vector2
         * @default 0
         * @type {Number}
         * @instance
         */
        x: { value: isNaN(x) ? 0 : x, writable: true },

        /**
         * Determinates the y value of this object.
         * @memberof graphics.geom.Vector2
         * @default 0
         * @type {Number}
         * @instance
         */
        y: { value: isNaN(y) ? 0 : y, writable: true }
    });
}

Vector2.prototype = Object.create(Object.prototype, {
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    clone: { writable: true, value: function value() {
            return new Vector2(this.x, this.y);
        } },

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    equals: { writable: true, value: function value(o) {
            if (o instanceof Vector2) {
                return o.x === this.x && o.y === this.y;
            } else {
                return false;
            }
        } },

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    toObject: { writable: true, value: function value() {
            return { x: this.x, y: this.y };
        } },

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    toString: { writable: true, value: function value() {
            return "[Vector2 x:" + this.x + " y:" + this.y + "]";
        } }
});

/**
 * The Point class represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @name Point
 * @memberof graphics.geom
 * @extends graphics.geom.Vector2
 * @class
 * @param {number} [x=0] - The x value of the point.
 * @param {number} [y=0] - The y value of the point.
 */
function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    Vector2.call(this, x, y);
}

Point.prototype = Object.create(Vector2.prototype, {
    /**
     * Returns the angle value of this Point object.
     * @memberof graphics.geom.Point
     * @instance
     * @example
     * var p1 = new Point(0,10) ;
     * var p2 = new Point(10,10) ;
     * trace(p1.angle) ; // 90
     * trace(p2.angle) ; // 45
     */
    angle: {
        get: function get() {
            return atan2D(this.y, this.x);
        },
        set: function set(value) {
            var len = Math.sqrt(this.x * this.x + this.y * this.y); // length
            this.x = len * cosD(value);
            this.y = len * sinD(value);
        }
    },

    /**
     * Indicates the length of the line segment from (0,0) to this point.
     * @memberof graphics.geom.Point
     * @instance
     * @readonly
     */
    length: {
        get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    },

    /**
     * Transform the coordinates of this point to used absolute value for the x and y properties.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p = new Point(-10, -20) ;
     * p.abs() ;
     * trace(p) ; // [Point x:10 y:20]
     */
    abs: { writable: true, value: function value() {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
        } },

    /**
     * Adds the coordinates of another point to the coordinates of this point.
     * @param {graphics.geom.Point} point - the point to be added. You can use an object with the properties x and y.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     */
    add: { writable: true, value: function value(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
        } },

    /**
     * Returns the angle value between this Point object and the specified Point passed in arguments.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10, 20) ;
     * var p2 = new Point(50, 200) ;
     * var angle = p1.angleBetween(p2) ;
     * @param {graphics.geom.Point} point - The point reference.
     * @return the angle value between this Point object and the specified Point passed in arguments.
     */
    angleBetween: { value: function value(point) {
            return acosD(this.dot(point) / (Math.sqrt(this.x * this.x + this.y * this.y) * Math.sqrt(point.x * point.x + point.y * point.y)));
        } },

    /**
     * Returns a shallow copy of the object.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @return a shallow copy of the object.
     */
    clone: { writable: true, value: function value() {
            return new Point(this.x, this.y);
        } },

    /**
     * Returns the cross value of the current Point object with the Point passed in argument.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace(p1.cross(p2)) ; // -200
     * @param {graphics.geom.Point} point - The Point object use to calculate the cross value.
     * @return The cross value of the current Point object with the Point passed in argument.
     */
    cross: { writable: true, value: function value(point) {
            return this.x * point.y - this.y * point.x;
        } },

    /**
     * Returns the dot value of the current Point and the specified Point passed in argument.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace(p1.dot(p2)) ; // 1600
     * @param {graphics.geom.Point} point - The Point to calculate the dot value of the current Point.
     * @return the dot value of the current Point and the specified Point passed in argument.
     */
    dot: { writable: true, value: function value(point) {
            return this.x * point.x + this.y * point.y;
        } },

    /**
     * Returns the normal value of this Point.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p = new Point(10,10) ;
     * var n = p.getNormal() ; // [Point x:-10 y:10]
     * trace(n) ;
     * @return the normal value of this Point.
     */
    getNormal: { value: function value() {
            return new Point(-this.y, this.x);
        } },

    /**
     * Returns the size of the projection of this Point with an other Point.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(100,200) ;
     * var size = p1.getProjectionLength(p2) ;
     * trace(size) ; // 0.06
     * @param point the Point use to calculate the length of the projection.
     * @return the size of the projection of this Point with an other Point.
     */
    getProjectionLength: { value: function value(point) {
            var len = point.dot(point);
            return len === 0 ? 0 : Math.abs(this.dot(point) / len);
        } },

    /**
     * Returns true if the Point is perpendicular with the passed-in Point.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(0,10) ;
     * var p2 = new Point(10,10) ;
     * var p3 = new Point(10,0) ;
     * trace(p1.isPerpTo(p2)) ; // false
     * trace(p1.isPerpTo(p3)) ; // true
     * @param {graphics.geom.Point} point - The Point use to determinate if this Point object is perpendicular.
     * @return {boolean} True if the Point is perpendicular with the passed-in Point.
     */
    isPerpTo: { writable: true, value: function value(point) {
            return this.dot(point) === 0;
        } },

    /**
     * Returns the new Point with the maximum horizontal coordinate and the maximum vertical coordinate.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10,100) ;
     * var p2 = new Point(100,10) ;
     * var p3 = p1.max(p2) ;
     * trace(p3) ; // [Point x:100 y:100]
     * @param {graphics.geom.Point} point - The Point passed in this method.
     * @return {graphics.geom.Point} The new Point with the maximum horizontal coordinate and the maximum vertical coordinate.
     */
    max: { writable: true, value: function value(point) {
            return new Point(Math.max(this.x, point.x), Math.max(this.y, point.y));
        } },

    /**
     * Returns a new Point with the minimum horizontal coordinate and the minimize vertical coordinate.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p1 = new Point(10,100) ;
     * var p2 = new Point(100,10) ;
     * var p3 = p1.min(p2) ;
     * trace(p3) ; // [Point x:10 y:10]
     * @param {graphics.geom.Point} point - The Point passed in this method
     * @return {graphics.geom.Point} A new Point with the min horizontal coordinate and the minimize vertical coordinate.
     */
    min: { writable: true, value: function value(point) {
            return new Point(Math.min(this.x, point.x), Math.min(this.y, point.y));
        } },

    /**
     * Sets this Point with negate coordinates.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p = new Point(10,20) ;
     * trace(p) ; // [Point x:10 y:20]
     * p.negate() ;
     * trace(p) ; // [Point x:-10 y:-20]
     * p.negate() ;
     * trace(p) ; // [Point x:10 y:20]
     */
    negate: { writable: true, value: function value() {
            this.x = -this.x;
            this.y = -this.y;
        } },

    /**
     * Scales the line segment between (0,0) and the current point to a set length.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @example
     * var p = new Point(0,5) ;
     * p.normalize() ;
     * trace(p) ; // [Point x:0 y:1]
     * @param {number} [thickness=1] The scaling value. For example, if the current point is (0,5), and you normalize it to 1, the point returned is at (0,1).
     * @see graphics.geom.Point#length
     * @throws Error if a zero-length vector or a illegal NaN value is calculate in this method.
     */
    normalize: { writable: true, value: function value() {
            var thickness = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            if (isNaN(thickness)) {
                thickness = 1;
            }
            var l = Math.sqrt(this.x * this.x + this.y * this.y); // length
            if (l > 0) {
                l = thickness / l;
                this.x *= l;
                this.y *= l;
            } else {
                throw new Error(this + " normalize method failed with a zero-length vector or a illegal NaN value.");
            }
        } },

    /**
     * Offsets the Point object by the specified amount.
     * The value of dx is added to the original value of x to create the new x value.
     * The value of dy is added to the original value of y to create the new y value.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @param {number} [dx=0] - The amount by which to offset the horizontal coordinate, x.
     * @param {number} [dy=0] - The amount by which to offset the vertical coordinate, y.
     * @example
     * var p = new Point(10,10) ;
     * p.offset(10,10) ;
     * trace(p) ; // [Point x:20 y:20]
     */
    offset: { writable: true, value: function value() {
            var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.x += isNaN(dx) ? 0 : dx;
            this.y += isNaN(dy) ? 0 : dy;
        } },

    /**
     * Rotates the Point with the specified angle in argument.
     * @memberof graphics.geom.Point
     * @instance
     * @function
     * @param {number} angle - The angle to rotate this Point.
     * @param {Object} [anchor=null] - The anchor point to rotate this Point around (by default use the {0,0} position).
     */
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

    /**
     * Scales the Point with the specified value in argument.
     * @param {number} value - the value to scale this Point coordinates.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     */
    scale: { value: function value(_value) {
            this.x *= isNaN(_value) ? 0 : _value;
            this.y *= isNaN(_value) ? 0 : _value;
        } },

    /**
     * Sets the horizontal and vertical coordinates of this Point. If the {@code x} and the {@code y} parameters are NaN or null the x value is 0 and y value is 0.
     * @param {number} [x=0] - The x coordinates of the point.
     * @param {number} [y=0] - The y coordinates of the point.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     */
    set: { value: function value() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
        } },

    /**
     * Subtracts the coordinates of another point from the coordinates of this point.
     * @param {graphics.geom.Point} point - The point to be subtracted.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     */
    subtract: { value: function value(point) {
            this.x -= point.x;
            this.y -= point.y;
        } },

    /**
     * Swap the horizontal and vertical coordinates of two Point objects.
     * @param {graphics.geom.Point} point - The point to be swap.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     * @example
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(30,40) ;
     * trace(p1 + " / " + p2) ; // [Point x:10 y:20] / [Point x:30 y:40]
     * p1.swap(p2) ;
     * trace(p1 + " / " + p2) ; // [Point x:30 y:40] / [Point x:10 y:20]
     */
    swap: { value: function value(point) {
            var tx = this.x;
            var ty = this.y;
            this.x = point.x;
            this.y = point.y;
            point.x = tx;
            point.y = ty;
        } },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @instance
     * @function
     * @memberof graphics.geom.Point
     */
    toString: { writable: true, value: function value() {
            return "[Point x:" + this.x + " y:" + this.y + "]";
        } }
});

Object.defineProperties(Point, {
    /**
     * Returns the distance between p1 and p2 the 2 Points reference passed in argument.
     * @memberof graphics.geom.Point
     * @static
     * @example
     * var p1 = new Point(10,20) ;
     * var p2 = new Point(40,60) ;
     * trace( Point.distance(p1,p2) ) ; // 50
     * @param {graphics.geom.Point} p1 - the first Point.
     * @param {graphics.geom.Point} p2 - the second Point.
     * @return the distance between p1 and p2 the 2 Points reference passed in argument.
     */
    distance: { value: function value(p1, p2) {
            var x = p1.x - p2.x;
            var y = p1.y - p2.y;
            return Math.sqrt(x * x + y * y);
        } },

    /**
     * Returns the middle Point between 2 Points.
     * @memberof graphics.geom.Point
     * @static
     * @example
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(20,20) ;
     * var middle = Point.getMiddle(p1,p2) ;
     * trace(middle) ;
     * @param {graphics.geom.Point} p1 - the first Point.
     * @param {graphics.geom.Point} p2 - the second Point.
     * @return the middle Point between 2 Points.
     */
    getMiddle: { value: function value(p1, p2) {
            return new Point((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
        } },

    /**
     * Determines a point between two specified points.
     * <ul>
     * <li>The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters p1 and p2.</li>
     * <li>The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter p1).</li>
     * <li>The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter p2).</li>
     * </ul>
     * @memberof graphics.geom.Point
     * @static
     * @example
     * var p1 = new Point(10,10) ;
     * var p2 = new Point(40,40) ;
     * var p3 ;
     *
     * p3 = Point.interpolate( p1 , p2 , 0 ) ;
     * trace(p3) ; // [Point x:40 y:40]
     *
     * p3 = Point.interpolate( p1 , p2 , 1 ) ;
     * trace(p3) ; // [Point x:10 y:10]
     *
     * p3 = Point.interpolate( p1 , p2 , 0.5 ) ;
     * trace(p3) ; // [Point x:25 y:25]
     * @param {graphics.geom.Point} p1 - the first Point.
     * @param {graphics.geom.Point} p2 - the second Point.
     * @param {number} [level=0] the The level of interpolation between the two points. Indicates where the new point will be, along the line between p1 and p2. If level=1, pt1 is returned; if level=0, pt2 is returned.
     * @return The new interpolated point.
     */
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

    /**
     * Converts a pair of polar coordinates to a Cartesian point coordinates.
     * @memberof graphics.geom.Point
     * @static
     * @example
     * <pre>
     * var polar = Point.polar( 5, Math.atan(3/4) ) ;
     * trace(polar) ; // [Point x:4 y:3]
     * </pre>
     * @param {number} len The length coordinate of the polar pair.
     * @param {number} angle The angle, in radians, of the polar pair.
     * @return The new Cartesian point.
     */
    polar: { value: function value(len, angle) {
            return new Point(len * Math.cos(angle), len * Math.sin(angle));
        } }
});

/**
 * The Rectangle class is used to create and modify Rectangle objects.
 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y), and by its width and its height.
 * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of one property has no effect on the others.
 * @name Rectangle
 * @extends graphics.geom.Dimension
 * @memberof graphics.geom
 * @constructor
 * @class
 * @param {number} x the x value of the object.
 * @param {number} y the y value of the object.
 * @param {number} width the width value of the object.
 * @param {number} height the height value of the object.
 */
function Rectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    Object.defineProperties(this, {
        /**
         * Determinates the x value of this object.
         * @memberof graphics.geom.Rectangle
         * @default 0
         * @type {Number}
         * @instance
         */
        x: { value: isNaN(x) ? 0 : x, writable: true },

        /**
         * Determinates the y value of this object.
         * @memberof graphics.geom.Rectangle
         * @default 0
         * @type {Number}
         * @instance
         */
        y: { value: isNaN(y) ? 0 : y, writable: true }
    });
    Dimension.call(this, width, height);
}

Rectangle.prototype = Object.create(Dimension.prototype, {
    // ------- getters/setters

    /**
     * The sum of the y and height properties.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    bottom: {
        get: function get() {
            return this.y + this.height;
        },
        set: function set(value) {
            this.height = value - this.y;
        }
    },

    /**
     * The location of the Rectangle object's bottom-left corner, determined by the values of the left and bottom properties.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
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

    /**
     * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    bottomRight: {
        get: function get() {
            return new Point(this.x + this.width, this.y + this.height);
        },
        set: function set(point) {
            this.width = point.x - this.x;
            this.height = point.y - this.y;
        }
    },

    /**
     * The location of the Rectangle object's center.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    center: {
        get: function get() {
            return new Point(this.x + this.width * 0.5, this.y + this.height * 0.5);
        },
        set: function set(point) {
            this.x = point.x - this.width * 0.5;
            this.y = point.y - this.height * 0.5;
        }
    },

    /**
     * The x coordinate of the top-left corner of the rectangle.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    left: {
        get: function get() {
            return this.x;
        },
        set: function set(value) {
            this.width = this.width + (this.x - value);
            this.x = value;
        }
    },

    /**
     * The sum of the x and width properties.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    right: {
        get: function get() {
            return this.x + this.width;
        },
        set: function set(value) {
            this.width = value - this.x;
        }
    },

    /**
     * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    size: {
        get: function get() {
            return new Point(this.width, this.height);
        },
        set: function set(point) {
            this.width = point.x;
            this.height = point.y;
        }
    },

    /**
     * The y coordinate of the top-left corner of the rectangle.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
    top: {
        get: function get() {
            return this.x + this.width;
        },
        set: function set(value) {
            this.height = this.height + (this.y - value);
            this.y = value;
        }
    },

    /**
     * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
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

    /**
     * The location of the Rectangle object's top-right corner, determined by the x and y coordinates of the point.
     * @memberof graphics.geom.Rectangle
     * @instance
     */
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

    // ------- methods

    /**
     * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @return a shallow copy of the object.
     */
    clone: { writable: true, value: function value() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        } },

    /**
     * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {number} x - The x position of the point to check.
     * @param {number} y - The y position of the point to check.
     */
    contains: { value: function value(x, y) {
            return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
        } },

    /**
     * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {Object|graphics.geom.Point} point - The point to check.
     */
    containsPoint: { value: function value(point) {
            return this.x <= point.x && this.x + this.width > point.x && this.y <= point.y && this.y + this.height > point.y;
        } },

    /**
     * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {Object|graphics.geom.Rectangle} rec - The rectangle area to check.
     */
    containsRect: { value: function value(rec) {
            var a = rec.x + rec.width;
            var b = rec.y + rec.height;
            var c = this.x + this.width;
            var d = this.y + this.height;
            return rec.x >= this.x && rec.x < c && rec.y >= this.y && rec.y < d && a > this.x && a <= c && b > this.y && b <= d;
        } },

    /**
     * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {graphics.geom.Rectangle|Object} rec - The rectangle object to copy.
     */
    copyFrom: { value: function value(rec) {
            this.x = rec.x;
            this.y = rec.y;
            this.width = rec.width;
            this.height = rec.height;
            return this;
        } },

    /**
     * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {object} toCompareThe - object to evaluates.
     * @param {boolean} [strict=true] - If true the method accept only a toCompare Rectangle, else any object with the x, y, width and height properties (default true).
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     */
    equals: { writable: true, value: function value(toCompare) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var flag = strict ? toCompare instanceof Rectangle : 'x' in toCompare && 'y' in toCompare && 'width' in toCompare && 'height' in toCompare;
            if (flag) {
                return toCompare.x === this.x && toCompare.y === this.y && toCompare.width === this.width && toCompare.height === this.height;
            } else {
                return false;
            }
        } },

    /**
     * Increases the size of the Rectangle object by the specified amounts, in pixels.
     * The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {number} dx - The value to be added to the left and the right of the Rectangle object. The following equation is used to calculate the new width and position of the rectangle:  x -= dx; width += 2 * dx;
     * @param {number} dy - The value to be added to the top and the bottom of the Rectangle. The following equation is used to calculate the new height and position of the rectangle: y -= dy; height += 2 * dy;
     */
    inflate: { value: function value(dx, dy) {
            this.x -= dx;
            this.y -= dy;
            this.width += 2 * dx;
            this.height += 2 * dy;
            return this;
        } },

    /**
     * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {graphics.geom.Point} point - The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
     * @example
     * var rect  = new Rectangle(0,0,2,5);
     * var point = new Point(2,2);
     * rect.inflatePoint(point) ;
     */
    inflatePoint: { value: function value(point) {
            this.x -= point.x;
            this.y -= point.y;
            this.width += 2 * point.x;
            this.height += 2 * point.y;
            return this;
        } },

    /**
     * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
     * @param toIntersect {graphics.geom.Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
     * @return {graphics.geom.Rectangle}  A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    intersection: { value: function value(toIntersect) {
            var rec = new Rectangle();

            if (this.isEmpty() || toIntersect.isEmpty()) {
                rec.set();
                return rec;
            }

            rec.x = Math.max(this.x, toIntersect.x);
            rec.y = Math.max(this.y, toIntersect.y);
            rec.width = Math.min(this.x + this.width, toIntersect.x + toIntersect.width) - rec.x;
            rec.height = Math.min(this.y + this.height, toIntersect.y + toIntersect.height) - rec.y;

            if (rec.width <= 0 || rec.height <= 0) {
                rec.set();
            }

            return rec;
        } },

    /**
     * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
     * @param {graphics.geom.Rectangle} toIntersect - The Rectangle object to compare against this Rectangle object.
     * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    intersects: { value: function value(toIntersect) {
            return !this.intersection(toIntersect).isEmpty();
        } },

    /**
     * Adjusts the location of the object, as determined by its top-left corner, by the specified amounts.
     * @param {number} [dx=0] - Moves the x value of the Rectangle object by this amount.
     * @param {number} [dy=0] - Moves the y value of the Rectangle object by this amount.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    offset: { writable: true, value: function value() {
            var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.x += dx;
            this.y += dy;
            return this;
        } },

    /**
     * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
     * @param {graphics.geom.Point} point - A Point object to use to offset this Rectangle object.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    offsetPoint: { writable: true, value: function value(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
        } },

    /**
     * Sets the members of Rectangle to the specified values.
     * @param {number} [x=0] - The x coordinate of the top-left corner of the rectangle (default 0).
     * @param {number} [y=0] - The y coordinate of the top-left corner of the rectangle (default 0).
     * @param {number} [width=0] - The width of the rectangle, in pixels (default 0).
     * @param {number} [height=0] - The height of the rectangle, in pixels (default 0).
     * @return {Rectangle} The object reference.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    set: { value: function value() {
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

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    toObject: { value: function value() {
            return { x: this.x, y: this.y, width: this.width, height: this.height };
        } },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof graphics.geom.Rectangle
     * @function
     * @instance
     */
    toString: { value: function value() {
            return "[Rectangle x:" + this.x + " y:" + this.y + " width:" + this.width + " height:" + this.height + "]";
        } },

    /**
     * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
     * <b>Note:</b> The union() method ignores rectangles with 0 as the height or width value, such as: var rect2 = new Rectangle(300,300,50,0);
     * @memberof graphics.geom.Rectangle
     * @instance
     * @function
     * @param {Rectangle} toUnion A Rectangle object to add to this Rectangle object.
     * @return {Rectangle} A new Rectangle object that is the union of the two rectangles.
     */
    union: { value: function value(toUnion) {
            if (!(toUnion instanceof Rectangle)) {
                return null; // ignore
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

/**
 * Creates a new Layout instance.
 * @name Layout
 * @memberof graphics
 * @extends system.process.Task
 * @class
 */
function Layout() {
    Object.defineProperties(this, {
        /**
         * The signal invoked when the render method is called.
         * @memberof graphics.Layout
         * @type {system.signals.Signal}
         * @const
         * @instance
         */
        renderer: { value: new Signal() },

        /**
         * The signal invoked when the update method is called.
         * @memberof graphics.Layout
         * @type {system.signals.Signal}
         * @const
         * @instance
         */
        updater: { value: new Signal() },

        /**
         * @private
         */
        _align: { value: Align.TOP_LEFT, writable: true },

        /**
         * @private
         */
        _bufferMode: { value: LayoutBufferMode.AUTO, writable: true },

        /**
         * The absolute rectangle bound area calculate with the measure method.
         * @private
         */
        _bounds: { value: new Rectangle() },

        /**
         * @private
         */
        _container: { value: null, writable: true }
    });
}

Layout.prototype = Object.create(Task.prototype, {
    // ------------- getters/setters

    /**
     * The alignement of the layout.
     * @memberof graphics.Layout
     * @type {number}
     * @default graphics.Align.TOP_LEFT
     * @see graphics.Align
     * @instance
     */
    align: {
        get: function get() {
            return this._align;
        },
        set: function set(value) {
            this._align = value;
        }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @memberof graphics.Layout
     * @type {graphics.geom.Rectangle}
     * @readonly
     * @instance
     */
    bounds: {
        get: function get() {
            return this._bounds;
        }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @memberof graphics.Layout
     * @type {graphics.LayoutBufferMode}
     * @default LayoutBufferMode.AUTO
     * @readonly
     * @instance
     */
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

    /**
     * Indicates the container reference to change with the layout.
     * @memberof graphics.Layout
     * @instance
     */
    container: {
        get: function get() {
            return this._container;
        },
        set: function set(target) {
            this._container = target;
        }
    },

    /**
     * The default height of the layout, in pixels.
     * @memberof graphics.Layout
     * @readonly
     * @instance
     * @type {number}
     */
    measuredHeight: { get: function get() {
            return this._bounds.height;
        } },

    /**
     * The default width of the layout, in pixels.
     * @memberof graphics.Layout
     * @readonly
     * @instance
     * @type {number}
     */
    measuredWidth: { get: function get() {
            return this._bounds.width;
        } },

    // ------------- public methods

    /*jshint -W098 */
    /**
     * Initialize the layout container with the specific elements. This method flush the layout container and remove all old elements register in the collection before initialize it.
     * @param {Array} [children=null] - An Array, a container or a list of element references to register. If this argument is null the layout is only flushed.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    initialize: { writable: true, value: function value() {
            var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        } },
    /*jshint +W098 */

    /**
     * Calculates the default sizes and minimum and maximum values.
     * You can overrides this method in the specific layouts.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    measure: { writable: true, value: function value() {} },

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    render: { writable: true, value: function value() {} },

    /**
     * Run the process.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
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

    /**
     * This method is invoked when the rendering is finished to finalize the it after the measure invokation.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    update: { writable: true, value: function value() {} }
});

/**
 * Constants defining layout orientation options.
 */

var Orientation = Object.defineProperties({}, {
    /**
     * Constant indicating a bottom-to-top layout orientation (4).
     */
    BOTTOM_TO_TOP: { enumerable: true, value: 4 },

    /**
     * Constant indicating a none layout orientation, use the default orientation (0).
     */
    NONE: { enumerable: true, value: 0 },

    /**
     * Constant indicating a left-to-right layout orientation (1).
     */
    LEFT_TO_RIGHT: { enumerable: true, value: 1 },

    /**
     * Constant indicating a right-to-left layout orientation (2).
     */
    RIGHT_TO_LEFT: { enumerable: true, value: 2 },

    /**
     * Constant indicating a bottom-to-top layout orientation (8).
     */
    TOP_TO_BOTTOM: { enumerable: true, value: 8 },

    /**
     * Constant indicating a left-to-right layout orientation (5).
     */
    LEFT_TO_RIGHT_BOTTOM_TO_TOP: { enumerable: true, value: 5 },

    /**
     * Constant indicating a left-to-right and top-to-bottom layout orientation (9).
     */
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: { enumerable: true, value: 9 },

    /**
     * Constant indicating a right-to-left layout orientation (6).
     */
    RIGHT_TO_LEFT_BOTTOM_TO_TOP: { enumerable: true, value: 6 },

    /**
     * Constant indicating a right-to-left and top-to-bottom layout orientation (10).
     */
    RIGHT_TO_LEFT_TOP_TO_BOTTOM: { enumerable: true, value: 10 }
});

Object.defineProperties(Orientation, {
    /**
     * All the orientations defines in the Orientation singleton.
     */
    ALL: { value: [Orientation.NONE, Orientation.BOTTOM_TO_TOP, Orientation.LEFT_TO_RIGHT, Orientation.RIGHT_TO_LEFT, Orientation.TOP_TO_BOTTOM, Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP, Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM, Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP, Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM] },

    /**
     * Returns the string representation of the specified Align value passed in argument.
     * <p><b>Example :</b></p>
     * <pre class="prettyprint">
     * import graphics.Align ;
     * trace( Align.toString(Align.LEFT)) ; // "l"
     * trace( Align.toString(Align.TOP_LEFT)) ; // "tl"
     * trace( Align.toString(Align.RIGHT_BOTTOM)) ; // "rb"
     * </pre>
     * @return the string representation of the specified Align value passed in argument.
     */
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

    /**
     * Returns <code class="prettyprint">true</code> if the passed-in uint argument is a valid Orientation value else returns <code class="prettyprint">false</code>.
     * @return <code class="prettyprint">true</code> if the passed-in uint argument is a valid Orientation value else returns <code class="prettyprint">false</code>.
     */
    validate: { value: function value(_value2) {
            return Orientation.ALL.indexOf(_value2) > -1;
        } }
});

/**
 * Constants defining the position declaration lets you declare what
 * the position of an element should be.
 */

var Position = Object.defineProperties({}, {
  /**
   * Constant indicating an "absolute" position. An element with position "absolute" is taken out of the normal flow of the page
   * and positioned at the desired coordinates relative to its containing block.
   */
  ABSOLUTE: { enumerable: true, value: 'absolute' },

  /**
   * Constant indicating a "fixed" position. An element with position "fixed" is taken out of the normal flow of the page and
   * positioned at the desired coordinates relative to the browser window. It remains at that position regardless of scrolling.
   */
  FIXED: { enumerable: true, value: 'fixed' },

  /**
   * Specifies the "normal" direction order. The horizontal containers displays its children from left to right and the vertical containers displays its children from top to bottom.
   */
  NORMAL: { enumerable: true, value: 'normal' },

  /**
   * Constant indicating a "relative" position. An element with position: relative initially has the position the normal flow
   * of the page gives it, but it is subsequently offset by the amount the top, bottom, left, and/or right declarations give.
   */
  RELATIVE: { enumerable: true, value: 'relative' },

  /**
   * Constant indicating a "static" position. An element with position "static" always has the position the normal flow of the page gives it.
   * It cannot be moved from this position; a static element ignores any x, y, top, bottom, left, or right declarations.
   */
  STATIC: { enumerable: true, value: 'static' }
});

/**
 * Represents the ZOrder of a display added to the document.
 */

var ZOrder = Object.defineProperties({}, {
  /**
   * Back means the display will be behind an other object and has a value of 0.
   */
  BACK: { enumerable: true, value: 0 },

  /**
   * Front means the display will be in front of an other object and has a value of 1.
   */
  FRONT: { enumerable: true, value: 1 }
});

/**
 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to another. You can perform various graphical transformations on a display object by setting the properties of a Matrix object, applying that Matrix object to the <code>matrix</code> property of a Transform object, and then applying that Transform object as the <code>transform</code> property of the display object. These transformation functions include translation (<i>x</i> and <i>y</i> repositioning), rotation, scaling, and skewing.
 * @name Matrix
 * @memberof graphics.geom
 * @constructor
 * @class
 * @param a The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
 * @param b The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
 * @param c The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
 * @param d The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
 * @param tx The distance by which to translate each point along the <i>x</i> axis.
 * @param ty The distance by which to translate each point along the <i>y</i> axis.
 */
function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    Object.defineProperties(this, {
        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        a: { value: isNaN(a) ? 0 : a, writable: true },

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        b: { value: isNaN(b) ? 0 : b, writable: true },

        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        c: { value: isNaN(c) ? 0 : c, writable: true },

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        d: { value: isNaN(d) ? 0 : d, writable: true },

        /**
         * The distance by which to translate each point along the <i>x</i> axis.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        tx: { value: isNaN(tx) ? 0 : tx, writable: true },

        /**
         * The distance by which to translate each point along the <i>y</i> axis.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        ty: { value: isNaN(ty) ? 0 : ty, writable: true }
    });
}

Object.defineProperties(Matrix, {
    MAGIC_GRADIENT_FACTOR: { value: 16384 / 10 }
});

Matrix.prototype = Object.create(Object.prototype, {
    /**
     * Returns a shallow copy of the object.
     * @memberof graphics.geom.Matrix
     * @instance
     * @return a shallow copy of the object.
     * @function
     */
    clone: { writable: true, value: function value() {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        } },

    /**
     * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical terms, concatenating two matrixes is the same as combining them using matrix multiplication.
     * <p>For example, if matrix <code>m1</code> scales an object by a factor of four, and matrix <code>m2</code> rotates an object by 1.5707963267949 radians (<code>Math.PI/2</code>), then <code>m1.concat(m2)</code> transforms <code>m1</code> into a matrix that scales an object by a factor of four and rotates the object by <code>Math.PI/2</code> radians.</p>
     * <p>This method replaces the source matrix with the concatenated matrix. If you want to concatenate two matrixes without altering either of the two source matrixes, first copy the source matrix by using the <code>clone()</code> method, as shown in the Class Examples section.</p>
     * @param {graphics.geom.Matrix|Object} matrix The matrix to be concatenated to the source matrix.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
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

    /**
     * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's values based on those parameters.
     * <p>Using the <code>createBox()</code> method lets you obtain the same matrix as you would if you applied the <code>identity()</code>, <code>rotate()</code>, <code>scale()</code>, and <code>translate()</code> methods in succession. For example, <code>mat.createBox(2,2,Math.PI/4, 100, 100)</code> has the same effect as the following:</p>
     * @example
     * var mat = new Matrix();
     * mat.createBox(2,2,Math.PI/4, 100, 100)
     * // or
     * mat.identity();
     * mat.rotate(Math.PI/4);
     * mat.scale(2,2);
     * mat.translate(10,20);
     * @param {number} scaleX - The factor by which to scale horizontally.
     * @param {number} scaleY - The factor by which scale vertically.
     * @param {number} [rotation=0] - The amount to rotate, in radians.
     * @param {number} [tx=0] - The number of pixels to translate (move) to the right along the <i>x</i> axis.
     * @param {number} [ty=0] - The number of pixels to translate (move) down along the <i>y</i> axis.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
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

    /**
     * Creates the specific style of matrix expected by the <code>beginGradientFill()</code> and <code>lineGradientStyle()</code> methods of the Graphics class. Width and height are scaled to a <code>scaleX</code>/<code>scaleY</code> pair and the <code>tx</code>/<code>ty</code> values are offset by half the width and height.
     * @param {number} width - The width of the box.
     * @param {number} scaleY - The height of the box.
     * @param {number} [rotation=0] - The amount to rotate, in radians.
     * @param {number} [tx=0] - The number of pixels to translate (move) to the right along the <i>x</i> axis.
     * @param {number} [ty=0] - The number of pixels to translate (move) down along the <i>y</i> axis.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    createGradientBox: { value: function value(width, height) {
            var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var tx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var ty = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            this.createBox(width / Matrix.MAGIC_GRADIENT_FACTOR, height / Matrix.MAGIC_GRADIENT_FACTOR, rotation, tx + width * 0.5, ty + height * 0.5);
        } },

    /**
     * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs. Unlike the standard transformation applied using the <code>transformPoint()</code> method, the <code>deltaTransformPoint()</code> method's transformation does not consider the translation parameters <code>tx</code> and <code>ty</code>.
     * @param {graphics.geom.Point|Object} point - The point for which you want to get the result of the matrix transformation.
     * @return The point resulting from applying the matrix transformation.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    deltaTransformPoint: { value: function value(point) {
            return new Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);
        } },

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    equals: { writable: true, value: function value(o) {
            if (o instanceof Matrix) {
                return o.a === this.a && o.b === this.b && o.c === this.c && o.d === this.d && o.tx === this.tx && o.ty === this.ty;
            } else {
                return false;
            }
        } },

    /**
     * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an identity matrix will be identical to the original.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    identity: { value: function value() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        } },

    /**
     * Applies a rotation transformation to the Matrix object.
     * @param {number} angle - The rotation angle in radians.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    rotate: { value: function value(angle) {
            /*
                with sin = sin(angle) and cos = cos(angle):
                              [a            c            tx           ]
                              [b            d            ty           ]
                              [0            0            1            ]
              [cos   -sin  0] [a*cos-b*sin  c*cos-d*sin  tx*cos-ty*sin]
              [sin   cos   0] [a*sin+b*cos  c*sin+d*cos  tx*sin+ty*cos]
              [0     0     1] [0            0            1            ]
            */

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

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    toObject: { writable: true, value: function value() {
            return { a: this.a, b: this.b, c: this.c, d: this.d, tx: this.tx, ty: this.ty };
        } },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    toString: { writable: true, value: function value() {
            return "[Matrix a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty + "]";
        } }
});

/**
 * The VEGAS.js framework - The graphics.geom library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.geom
 * @memberof graphics
 */
var geom = Object.assign({
  Dimension: Dimension,
  Matrix: Matrix,
  Point: Point,
  Rectangle: Rectangle
});

/**
 * The VEGAS.js framework - The graphics library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics
 */
var graphics = Object.assign({
    // ----- Singletons

    isDirectionable: isDirectionable,

    // ----- Classes and enumerations

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

    // ----- packages

    geom: geom
});

exports.trace = trace;
exports.version = version;
exports.core = core;
exports.system = system;
exports.graphics = graphics;
exports.sayHello = sayHello;
exports.skipHello = skipHello;

Object.defineProperty(exports, '__esModule', { value: true });

})));
/* follow me on Twitter! @ekameleon */
