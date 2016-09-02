/* VEGAS version 1.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vegas = global.vegas || {})));
}(this, (function (exports) { 'use strict';

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // au plus proche de la fonction interne ECMAScript 5 IsCallable
            throw new TypeError("Function.prototype.bind - ce qui est à lier ne peut être appelé");
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

if (Math.sign === undefined) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    Math.sign = function (x) {
        return x < 0 ? -1 : x > 0 ? 1 : +x;
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

function trace() {
    Object.setPrototypeOf(arguments, Array.prototype);
    console.log.apply(null, arguments);
}

/**
 * Determines whether the specified object exists as an element in an Array object.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var ar = [2, 3, 4] ;
 *
 * trace( core.arrays.contains( ar , 3 ) ) ; // true
 * trace( core.arrays.contains( ar , 5 ) ) ; // false
 * </pre>
 * @param ar The search Array.
 * @param value The object to find in the array.
 * @return <code>true</code> if the specified object exists as an element in the array ; otherwise, <code>false</code>.
 */

var contains = function contains(array /*Array*/, value) {
  return array.indexOf(value) > -1;
};

/**
 * Initializes a new Array with an arbitrary number of elements (index),
 * with every element containing the passed parameter value or by default the null value.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @return a new Array with an arbitrary number of elements (index),
 * with every element containing the passed parameter value or by default the null value.
 */

function initialize(elements /*uint*/, value) /*Array*/
{
    var ar = [];

    if (arguments.length < 2) {
        value = null;
    }

    elements = elements > 0 ? Math.abs(elements) : 0;

    for (var i /*int*/ = 0; i < elements; i++) {
        ar[i] = value;
    }

    return ar;
}

/**
 * Splices an array (removes an element) and returns either the entire array or the removed element.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @param ar the array.
 * @param index the index of the array element to remove from the array (default 0).
 * @param flag a boolean <code>true</code> to return a new spliced array of false to return the removed element.
 * @return The newly spliced array or the removed element in function of the flag parameter.
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.arrays.repeat( [2, 3, 4] , 0 ) ) ; // 2,3,4
 * trace( core.arrays.repeat( [2, 3, 4] , 3 ) ) ; // 2,3,4,2,3,4,2,3,4
 * </pre>
 * @return a new Array who contains the specified Array elements repeated count times.
 */

function repeat(ar /*Array*/, count /*uint*/) /*Array*/
{
    count = isNaN(count) ? 0 : count;
    count = count > 0 ? Math.abs(count) : 0;
    var result /*Array*/;
    if (count > 0) {
        result = [];
        for (var i /*int*/ = 0; i < count; i++) {
            result = result.concat(ar);
        }
    } else {
        result = [].concat(ar);
    }
    return result;
}

/**
 * Shuffles an array.
 * <p><b>Example :</b></p>
 * <pre>
 * ar = [0,1,2,3,4,5,6,7,8,9] ;
 *
 * trace( ar ) ;
 *
 * shuffle( ar ) ;
 *
 * trace( ar ) ;
 * </pre>
 * @return the shuffled array.
 */

function shuffle(ar /*Array*/) /*Array*/
{
    var item = void 0;
    var rdm = void 0 /*int*/;
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
    return ar;
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
 * Sorts the elements in an array according to one or more fields in the array.
 * The array should have the following characteristics:
 * <ul>
 * <li>The array is an indexed array, not an associative array.</li>
 * <li>Each element of the array holds an object with one or more properties.</li>
 * <li>All of the objects have at least one property in common, the values of which can be used to sort the array. Such a property is called a field.</li>
 * </ul>
 * <p><b>Example : </b></p>
 * {@code
 * echo = function( a )
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
 * var r = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING) ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name") ;
 *
 * core.arrays.sortOn( a , "name") ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name Array.CASEINSENSITIVE") ;
 *
 * core.arrays.sortOn( a , "name", Array.CASEINSENSITIVE) ;
 *
 * echo(a) ;
 *
 * trace ("---- sort name Array.RETURNINDEXEDARRAY") ;
 *
 * //var result = core.arrays.sortOn( a , "name", Array.CASESEINSENTIVE | Array.RETURNINDEXEDARRAY) ;
 * //var result = core.arrays.sortOn( a , "name", Array.RETURNINDEXEDARRAY) ;
 * //trace (result) :
 *
 * var result = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * var result = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * var result = core.arrays.sortOn( a , "name", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 *
 * trace ("---- sort name Array.UNIQUESORT") ;
 *
 * a.push({ name:"test 1" , num:60 } ) ;
 *
 * core.arrays.sortOn( a , "name", Array.UNIQUESORT ) ;
 *
 * echo(a) ;
 * }
 */
function sortOn(ar /*Array*/, propName, options) {
    var sortFunction = function sortFunction(o1, o2) {
        var v1 = o1[propName] !== undefined ? o1[propName].valueOf() : "";
        var v2 = o2[propName] !== undefined ? o2[propName].valueOf() : "";

        function noCase() {
            if (typeof v1 === "string" || v1 instanceof String) {
                v1 = v1.toLowerCase();
            }
            if (typeof v2 === "string" || v2 instanceof String) {
                v2 = v2.toLowerCase();
            }
        }

        function numeric() {
            v1 = Number(v1);
            v2 = Number(v2);
            v1 = isNaN(v1) ? 0 : v1;
            v2 = isNaN(v2) ? 0 : v2;
        }

        function reverse() {
            var tmp = v1;
            v1 = v2;
            v2 = tmp;
        }

        switch (options) {
            case Array.CASEINSENSITIVE:
            case Array.CASEINSENSITIVE | Array.RETURNINDEXEDARRAY:
                {
                    noCase();
                    break;
                }
            case Array.NUMERIC:
            case Array.NUMERIC | Array.RETURNINDEXEDARRAY:
                {
                    numeric();
                    break;
                }
            case Array.DESCENDING:
            case Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    reverse();
                    break;
                }
            case Array.CASEINSENSITIVE | Array.DESCENDING:
            case Array.CASEINSENSITIVE | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    noCase();
                    reverse();
                    break;
                }
            case Array.NUMERIC | Array.DESCENDING:
            case Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
                {
                    numeric();
                    reverse();
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
                tmp.sort(sortFunction);
                var result = [];
                var l = ar.length;
                for (var i = 0; i < l; i++) {
                    var index = tmp.indexOf(ar[i]);
                    result.push(index);
                }
                return result;
            }
        default:
            {
                return ar.sort(sortFunction);
            }
    }
}

/**
 * Splice one array into another.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @param inserted The Array of values inserted in the Array container.
 * @param container The container modified in place.
 * @param position The position in the container to inserted the Array of chars.
 * @param count The count value to replaced values.
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
 * The VEGAS.js framework - The core.arrays library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var arrays = Object.assign({
    contains: contains,
    initialize: initialize,
    pierce: pierce,
    repeat: repeat,
    shuffle: shuffle,
    sortOn: sortOn,
    spliceInto: spliceInto
});

/**
 * Returns 0 if the passed string is lower case else 1.
 * @return 0 if the passed string is lower case else 1.
 */

function caseValue(str) /*uint*/
{
  return str.toLowerCase().valueOf() === str.valueOf() ? 0 : 1;
}

/**
 * Compares the two caracteres passed in argument for order.
 * @return <p>
 * <li>-1 if charA is "lower" than (less than, before, etc.) charB ;</li>
 * <li> 1 if charA is "higher" than (greater than, after, etc.) charB ;</li>
 * <li> 0 if charA and charB are equal.</li>
 * </p>
 */
function compare(charA /*String*/, charB /*String*/) /*uint*/
{
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

/**
 * Indicates if the specified character is an alpha (A-Z or a-z) character.
 */

function isAlpha(c /*String*/) /*Boolean*/
{
  return "A" <= c && c <= "Z" || "a" <= c && c <= "z";
}

/**
 * Indicates if the specified character is an ASCII character.
 */

function isASCII(c /*String*/) /*Boolean*/
{
  return c.charCodeAt(0) <= 255;
}

/**
 * Indicates if the specified character is a digit.
 */

function isDigit(c /*String*/) /*Boolean*/
{
  return "0" <= c && c <= "9";
}

/**
 * Indicates if the specified character is a hexadecimal digit.
 */

function isHexDigit(c /*String*/) /*Boolean*/
{
  return "0" <= c && c <= "9" || "A" <= c && c <= "F" || "a" <= c && c <= "f";
}

/**
 * Indicates if the character is lowercase.
 */

function isLower(c /*String*/) /*Boolean*/
{
  return "a" <= c && c <= "z";
}

/**
 * Indicates if the specified character is an octal digit.
 */

function isOctalDigit(c /*String*/) /*Boolean*/
{
  return "0" <= c && c <= "7";
}

/**
 * Indicates if the passed-in string value is a operator digit.
 */

function isOperator(c /*String*/) /*Boolean*/
{
    switch (c) {
        case "*":
        case "/":
        case "%":
        case "+":
        case "-":
        case "«":
        case "»":
        case ">":
        case "<":
        case "›":
        case "&":
        case "^":
        case "|":
            {
                return true;
            }
        default:
            {
                return false;
            }
    }
}

/**
 * Indicates if the specified character is a unicode character.
 */

function isUnicode(c /*String*/) /*Boolean*/
{
  return c.charCodeAt(0) > 255;
}

/**
 * Indicates if the character is uppercase.
 */

function isUpper(c /*String*/) /*Boolean*/
{
  return "A" <= c && c <= "Z";
}

/**
 * The VEGAS.js framework - The core.chars library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var chars = Object.assign({
    compare: compare,
    isAlpha: isAlpha,
    isASCII: isASCII,
    isDigit: isDigit,
    isHexDigit: isHexDigit,
    isLower: isLower,
    isOctalDigit: isOctalDigit,
    isOperator: isOperator,
    isUnicode: isUnicode,
    isUpper: isUpper
});

/**
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
function dumpArray(value /*Array*/, prettyprint /*Boolean*/, indent /*int*/, indentor /*String*/) /*String*/
{
    indent = isNaN(indent) ? 0 : indent;
    prettyprint = Boolean(prettyprint);

    if (!indentor) {
        indentor = "    ";
    }

    var source /*Array*/ = [];

    var i /*int*/;
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
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */

function dumpDate(date /*Date*/, timestamp /*Boolean*/) /*String*/
{
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
 * @param value an object
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 */
function dumpObject(value /*Object*/, prettyprint /*Boolean*/, indent /*int*/, indentor /*String*/) /*String*/
{
    ///////////

    indent = isNaN(indent) ? 0 : indent;

    prettyprint = Boolean(prettyprint);

    if (!indentor) {
        indentor = "    ";
    }

    ///////////

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
        var spaces /*Array*/ = [];
        for (var i /*int*/; i < indent; i++) {
            spaces.push(indentor);
        }

        var decal /*String*/ = "\n" + spaces.join("");
        return decal + "{" + decal + indentor + source.join("," + decal + indentor) + decal + "}";
    } else {
        return "{" + source.join(",") + "}";
    }
}

/**
 * Returns the unicode string notation of the specified numeric value.
 * @return the unicode string notation of the specified numeric value.
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
 * @param str a String to transform.
 * @return The dump string representation of any String value.
 */
function dumpString(value /*String*/) /*String*/
{
    var code /*int*/;
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
            case "\u000b":
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
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
function dump(o, prettyprint /*Boolean*/, indent /*int*/, indentor /*String*/) /*String*/
{
    ///////////

    indent = isNaN(indent) ? 0 : indent;

    prettyprint = Boolean(prettyprint);

    if (!indentor) {
        indentor = "    ";
    }

    ///////////

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

/**
 * This constant change radians to degrees : <b>180/Math.PI</b>.
 */

var RAD2DEG = 180 / Math.PI;

/**
 * Returns the inverse cosine of a slope ratio and returns its angle in degrees.
 * @param ratio a value between -1 and 1 inclusive.
 * @return the inverse cosine of a slope ratio and returns its angle in degrees.
 */
var acosD = function acosD(ratio) {
  return Math.acos(ratio) * RAD2DEG;
};

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshm = ln(x-√(x^2-1))
 * </pre>
 */

var acosHm = function acosHm(x) {
  return Math.log(x - Math.sqrt(x * x - 1));
};

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshp = ln(x+√(x^2-1))
 * </pre>
 */

var acosHp = function acosHp(x /*Number*/) {
  return Math.log(x + Math.sqrt(x * x - 1));
};

/**
 * Returns the angle in degrees between 2 points with this coordinates passed in argument.
 * @param x1 the x coordinate of the first point.
 * @param y1 the y coordinate of the first point.
 * @param x2 the x coordinate of the second point.
 * @param y2 the y coordinate of the second point.
 * @return the angle in degrees between 2 points with this coordinates passed in argument.
 */
var angleOfLine = function angleOfLine(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * RAD2DEG;
};

/**
 * Calculates the arcsine of the passed angle.
 * @param ratio a value between -1 and 1 inclusive.
 * @return the arcsine of the passeds angle in degrees.
 */
var asinD = function asinD(ratio) {
  return Math.asin(ratio) * RAD2DEG;
};

/**
 * Anti-hyperbolic sine.
 */

var asinH = function asinH(x) {
  return Math.log(x + Math.sqrt(x * x + 1));
};

/**
 * Calculates the arctangent2 of the passed angle.
 * @param y a value representing y-axis of angle vector.
 * @param x a value representing x-axis of angle vector.
 * @return the arctangent2 of the passed angle.
 */
var atan2D = function atan2D(y, x) {
  return Math.atan2(y, x) * RAD2DEG;
};

/**
 * Calculates the arctangent of the passed angle.
 * @param angle a real number
 * @return the arctangent of the passed angle, a number between -Math.PI/2 and Math.PI/2 inclusive.
 */
var atanD = function atanD(angle) {
  return Math.atan(angle) * RAD2DEG;
};

/**
 * Anti-hyperbolic tangent.
 */

function atanH(x /*Number*/) /*Number*/
{
  return Math.log((1 + x) / (1 - x)) / 2;
}

/**
 * This constant change degrees to radians : <b>Math.PI/180</b>.
 */

var DEG2RAD = Math.PI / 180;

/**
 * Calculates the initial bearing (sometimes referred to as forward azimuth) which if followed in a straight line along a great-circle arc will take you from the start point to the end point (in degrees).
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var bearing = core.maths.bearing ;
 *
 * var position1 = { x : 37.422045 , y : -122.084347 } ; // Google HQ
 * var position2 = { x :  37.77493 , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( bearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 323.1477743368166
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @param value the value to clamp.
 * @param min the min value of the range.
 * @param max the max value of the range.
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( berp( 0 , 100 , 0.5 ) ;
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */
var berp = function berp(amount, start, end) {
    if (start === end) {
        return start;
    }
    amount = clamp(amount, 0, 1);
    amount = (Math.sin(amount * Math.PI * (0.2 + 2.5 * amount * amount * amount)) * Math.pow(1 - amount, 2.2) + amount) * (1 + 1.2 * (1 - amount));
    return start + (end - start) * amount;
};

/**
 * Returns a value between 0 and 1 that can be used to easily make bouncing GUI items (a la OS X's Dock)
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * import core.maths.bounce ;
 * trace( bounce( 0.5 ) ) ;
 * </pre>
 * @param amount The amount to bounce a value between 0 and 1.
 * @return a value between 0 and 1 that can be used to easily make bouncing GUI items (a la OS X's Dock)
 */

var bounce = function bounce(amount) {
  return Math.abs(Math.sin(6.28 * (amount + 1) * (amount + 1)) * (1 - amount));
};

/**
 * Converts a vector in cartesian in a polar vector. Return a generic object with the properties angle and radius.
 * @param vector The cartesian vector to transform.
 * @param degrees Indicates if the angle attribute in the return polar object is in degrees or not (default this parameter is false).
 * @return a vector in cartesian in a polar vector.
 */
var cartesianToPolar = function cartesianToPolar(vector, degrees) {
  return { angle: Math.atan2(vector.y, vector.x) * (Boolean(degrees) ? RAD2DEG : 1), radius: Math.sqrt(vector.x * vector.x + vector.y * vector.y) };
};

/**
 * Rounds and returns the ceiling of the specified number or expression.
 * The ceiling of a number is the closest integer that is greater than or equal to the number.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var n ;
 *
 * n = core.maths.ceil(4.572525153, 2) ;
 * trace ("n : " + n) ; // n : 4.58
 *
 * n = core.maths.ceil(4.572525153, -1) ;
 * trace ("n : " + n) ; // n : 5
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the ceil value of a number by a count of floating points.
 */

function ceil(n /*Number*/, floatCount /*Number*/) /*Number*/
{
    if (isNaN(n)) {
        return NaN;
    }
    var r /*Number*/ = 1;
    var i /*Number*/ = -1;
    while (++i < floatCount) {
        r *= 10;
    }
    return Math.ceil(n * r) / r;
}

/**
 * Circular Lerp is like lerp but handles the wraparound from 0 to 360.
 * This is useful when interpolating eulerAngles and the object crosses the 0/360 boundary.
 * The standard Lerp function causes the object to rotate in the wrong direction and looks stupid, clerp() fixes that.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.clerp( 0 , 180 , 0.5 ) ; // 90
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */

var clerp = function clerp(amount, start, end) {
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

/**
 * Calculates the cosine of the passed angle.
 * @param angle a value representing angle in degrees.
 * @return the cosine of the passed angle, a number between -1 and 1 inclusive.
 */
var cosD = function cosD(angle) {
  return Math.cos(angle * DEG2RAD);
};

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.coserp( 0 , 100 , 0.5 ) ;
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */

var coserp = function coserp(amount, start, end) {
    if (start === end) {
        return start;
    }
    amount = 1 - Math.cos(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

/**
 * Hyperbolic cosine.
 */

var cosH = function cosH(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};

/**
 * Converts an angle in degrees in radians
 * @return an angle in degrees in radians.
 */
var degreesToRadians = function degreesToRadians(angle) {
  return angle * DEG2RAD;
};

/**
 * Returns the distance between 2 points with the coordinates of the 2 points.
 * @param x1 the x coordinate of the first point.
 * @param y1 the y coordinate of the first point.
 * @param x2 the x coordinate of the second point.
 * @param y2 the y coordinate of the second point.
 * @return the length between 2 points.
 */

var distance = function distance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns the distance between 2 points with the coordinates of the 2 points.
 * @param p1 the first point to determinate the distance (defines with the x and y coordinates).
 * @param p2 the second point to determinate the distance (defines with the x and y coordinates).
 * @return the length between 2 points.
 */

function distanceByObject(p1 /*Object*/, p2 /*Object*/) /*Number*/
{
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * This constant defines the radius of the earth in meter ( 6371 km ).
 */

var EARTH_RADIUS_IN_METERS = 6371000;

/**
 * Represents the smallest positive Single value greater than zero.
 */

var EPSILON = 0.000000001;

/**
 * Calculates with the fibonacci sequence the value with a specific level.
 * By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var finalBearing = core.maths.finalBearing ;
 *
 * var position1 = new Point( 37.422045 , -122.084347 ) ; // Google HQ
 * var position2 = new Point( 37.77493  , -122.419416 ) ; // San Francisco, CA
 *
 * trace( finalBearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 143.1477743368166
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
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
 * @param angle the passed angle value in degrees.
 * @return an angle in degrees between 0 and 360 degrees.
 */

function fixAngle(angle /*Number*/) /*Number*/
{
    if (isNaN(angle)) {
        angle = 0;
    }
    angle %= 360;
    return angle < 0 ? angle + 360 : angle;
}

/**
 * Rounds and returns a number by a count of floating points.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var n ;
 *
 * n = core.maths.floor(4.572525153, 2) ;
 * trace ("n : " + n) ; // n : 4.57
 *
 * n = core.maths.floor(4.572525153, -1) ;
 * trace ("n : " + n) ; // n : 4
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the floor value of a number by a count of floating points.
 */

var floor = function floor(n, floatCount) {
    if (isNaN(n)) {
        return NaN;
    }
    var r /*Number*/ = 1;
    var i /*Number*/ = -1;
    while (++i < floatCount) {
        r *= 10;
    }
    return Math.floor(n * r) / r;
};

/**
 * Returns the greatest common divisor with the Euclidean algorithm.
 * <p><b>Example :</b></p>
 * <pre>
 * var gcd = core.maths.gcd(320,240) ;
 * trace("gcd(320,240) : " + gcd ) ; // gcd(320,240) : 80
 * </pre>
 * @param i1 The first integer value.
 * @param i2 The second integer value.
 * @return the greatest common divisor with the Euclidean algorithm.
 */

var gcd = function gcd(i1, i2) {
    if (i2 === 0) {
        return i1;
    } else if (i1 === i2) {
        return i1;
    } else {
        var t /*int*/;
        while (i2 !== 0) {
            t = i2;
            i2 = i1 % i2;
            i1 = t;
        }
        return i1;
    }
};

/**
 * The haversine formula is an equation important in navigation, giving great-circle distances between two points on a sphere from
 * their longitudes and latitudes.This algorithm is way faster than the Vincenty Formula but less accurate.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var haversine = core.maths.haversine ;
 *
 * var position1 = { x : 37.422045 , y : -122.084347  } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( haversine( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 103.007 meters
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
 * @param radius The optional radius of the sphere (by default the function use the earth's radius, mean radius = 6,371km) .
 * @return The distance between two points on a sphere from their longitudes and latitudes.
 * @see core.maths.EARTH_RADIUS_IN_METERS
 */
var haversine = function haversine(latitude1, longitude1, latitude2, longitude2, radius) {
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.hermite( 0 , 100 , 0.5 ) ; // 50
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */

var hermite = function hermite(amount, start, end) {
    if (start === end) {
        return start;
    }
    amount *= amount * (3 - 2 * amount);
    return (1 - amount) * start + amount * end;
};

/**
 * Calculates the hypothenuse value of the two passed-in triangle sides value.
 * <p>A hypotenuse is the longest side of a right triangle (Right-angled triangle in British English),
 * the side opposite the right angle. The length of the hypotenuse of a right triangle can be found using
 * the Pythagorean theorem, which states that the square of the length of the hypotenuse equals the sum of the squares
 * of the lengths of the other two sides.</p>
 */

var hypothenuse = function hypothenuse(x, y) {
  return Math.sqrt(x * x + y * y);
};

/**
 * With a number value and a range this method returns the actual value for the interpolated value in that range.
 * <pre class="prettyprint">
 * trace( core.maths.interpolate( 0.5, 0 , 100 ) ) ; // 50
 * </pre>
 * @param value The normal number value to interpolate (value between 0 and 1).
 * @param minimum The minimum value of the interpolation.
 * @param maximum The maximum value of the interpolation.
 * @return the actual value for the interpolated value in that range.
 */

var interpolate = function interpolate(value, minimum, maximum) {
  return minimum + (maximum - minimum) * value;
};

/**
 * Indicates if an integer that is "evenly divisible" by 2.
 * @return True if the passed-in value is even.
 */

var isEven = function isEven(value) {
  return value % 2 === 0;
};

/**
 * Indicates if an integer that is not "evenly divisible" by 2.
 * @return True if the passed-in value is odd.
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
*/

var LAMBDA = 0.57721566490143;

/**
 * Calculates a number between two numbers at a specific increment.
 * The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 * <p>Lerp is an abbreviation for linear interpolation, which can also be used as a verb (Raymond 2003).</p>
 * <p>Linear interpolation is a method of curve fitting using linear polynomials.
 * It is heavily employed in mathematics (particularly numerical analysis), and numerous applications including computer graphics. It is a simple form of interpolation.</p>
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.lerp( 0 , 100 , 0.5 ) ; // 50
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */

var lerp = function lerp(amount, start, end) {
    if (start === end) {
        return start;
    }
    return (1 - amount) * start + amount * end;
};

/**
 * Calculates the log10 of the specified value.
 * @return The log10 of the specified value.
 */

function log10(value /*Number*/) /*Number*/
{
  return Math.log(value) / Math.LN10;
}

/**
 * Calculates the logN of the specified value.
 * @param value The value to calculate.
 * @param base The base to calculate the log of the value.
 * @return The logN of the specified value.
 */

function logN(value /*Number*/, base /*int*/) /*Number*/
{
  return Math.log(value) / Math.log(base);
}

/**
 * Takes a value within a given range and converts it to a number between 0 and 1.
 * Actually it can be outside that range if the original value is outside its range.
 * <pre>
 * trace( core.maths.normalize( 10, 0 , 100 ) ) ; // 0.1
 * </pre>
 * @param value The number value to normalize.
 * @param minimum The minimum value of the normalization.
 * @param maximum The maximum value of the normalization.
 */

var normalize = function normalize(value, minimum, maximum) {
  return (value - minimum) / (maximum - minimum);
};

/**
 * Takes a value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * <pre class="prettyprint">
 * trace( core.maths.map( 10,  0, 100, 20, 80  ) ) ; // 26
 * trace( core.maths.map( 26, 20,  80,  0, 100 ) ) ; // 10
 * </pre>
 * @param value The number value to map.
 * @param minimum1 The minimum value of the first range of the value.
 * @param maximum1 The maximum value of the first range of the value.
 * @param minimum2 The minimum value of the second range of the value.
 * @param maximum2 The maximum value of the second range of the value.
 * @return value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 */
var map = function map(value, minimum1, maximum1, minimum2, maximum2) {
  return interpolate(normalize(value, minimum1, maximum1), minimum2, maximum2);
};

/**
 * Calculates the midpoint along a great circle path between the two points.
 * <p>See <a href="http://mathforum.org/library/drmath/view/51822.html">"Latitude and Longitude of a Point Halfway between Two Points"</a> question to calculate the derivation.</p>
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var midPoint = core.maths.midPoint ;
 *
 * var pos1 = { x : 34.122222   , y : 118.4111111 } ; // LA
 * var pos2 = { x : 40.66972222 , y : 73.94388889 } ; // NYC
 *
 * var result = midPoint( pos1.x , pos1.y , pos2.x , pos2.y )  ;
 *
 * trace( "midpt latitude:" + result.x + " longitude:" + result.y ) ;
 * // midpt latitude:39.547078603870254 longitude:97.2015133919303
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
 * @return The midpoint (Object) along a great circle path between the two points.
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
 * This constant change mile distance to meter : 1 mile = 1609 m.
 */

var MILE_TO_METER = 1609;

/**
 * The % operator in ECMASCript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend.
 * For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7.
 * This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list.
 * @param a The dividend.
 * @param b The divisor.
 * @return The a % b where the result is between 0 and b (either 0 <= x < b or b < x <= 0, depending on the sign of b).
 */

function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r; // If r and b differ in sign, add b to wrap the result to the correct sign.
}

/**
 * Evaluates whether the two values are equal to each other, within a certain tolerance to adjust for floating pount errors.
 * @param value1 a number to evaluate.
 * @param value2 a number to evaluate.
 * @param tolerance An optional tolerance range. Defaults to 0.000001. If specified, should be greater than 0.
 * @return True if value1 and value2 are nearly equal.
 */

var nearlyEquals = function nearlyEquals(value1, value2, tolerance) {
    if (isNaN(tolerance)) {
        tolerance = 0.000001;
    }
    return Math.abs(value1 - value2) <= tolerance;
};

/**
 * Returns a percentage value or NaN.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.percentage( 50 , 100 ) + "%" ) ; // 50%
 * trace( core.maths.percentage( 68 , 425 ) + "%" ) ; // 16%
 * </pre>
 * @param value the current value.
 * @param maximum the max value.
 * @return a percentage value or null.
 */

var percentage = function percentage(value, maximum) {
  var p /*Number*/ = value / maximum * 100;
  return isNaN(p) || !isFinite(p) ? NaN : p;
};

/**
 * The golden ratio (phi) : <b>( 1 + Math.sqrt(5) ) / 2</b>.
 */

var PHI = 1.61803398874989;

/**
 * Converts a Polar object in a cartesian vector.
 * @param polar The polar generic object to transform (with the attributes angle and radius).
 * @param degrees Indicates if the angle of the polar object is in degrees or radians.
 * @return a generic Object with the cartesian representation of the specified Polar object (with the coordinates x and y).
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
 * @param value The Number value to replace, if this value is NaN the value is changed.
 * @param defaultValue The default value to apply over the specified value if this value is NaN (default 0).
 * @return The replaced Number value.
 */

var replaceNaN = function replaceNaN(value, defaultValue) {
    if (isNaN(defaultValue)) {
        defaultValue = 0;
    }
    return isNaN(value) ? defaultValue : value;
};

/**
 * Rounds and returns a number by a count of floating points.
 * <p><b>Example :</b></p>
 * <pre>
 * var n ;
 * n = core.maths.round(4.572525153, 2) ;
 * trace ("n : " + n) ; // 4.57
 *
 * n = core.maths.round(4.572525153, -1) ;
 * trace ("n : " + n) ; // 5
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the round of a number by a count of floating points.
 */

var round = function round(n, floatCount) {
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
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @param n the number to defined this sign.
 * @return 1 if the value is positive or -1.
 * @throws Error if the passed-in value is NaN.
 */

var sign = function sign(n) {
    if (isNaN(n)) {
        throw new Error("sign failed, the passed-in value not must be NaN.");
    }
    return n < 0 ? -1 : 1;
};

/**
 * Calculates the sine of the passed angle.
 * @param angle a value representing angle in degrees.
 * @return the sine of the passed angle, a number between -1 and 1 inclusive.
 */
var sinD = function sinD(angle) {
  return Math.sin(angle * DEG2RAD);
};

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.sinerp( 0 , 100 , 0.5 ) ;
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */

var sinerp = function sinerp(amount, start, end) {
    if (start === end) {
        return start;
    }
    amount = Math.sin(amount * Math.PI * 0.5);
    return (1 - amount) * start + amount * end;
};

/**
 * Calculates the Hyperbolic sine.
 */

var sinH = function sinH(x) {
  return (Math.exp(x) - Math.exp(-x)) * 0.5;
};

/**
 * Calculates the tangent of the passed angle.
 * @param angle a value representing angle in degrees.
 * @return the tangent of the passed angle.
 */
var tanD = function tanD(angle) {
  return Math.tan(angle * DEG2RAD);
};

/**
 * Calculates the Hyperbolic tangent.
 */
var tanH = function tanH(x) {
  return sinH(x) / cosH(x);
};

/**
 * Calculates geodesic distance in meter between two points specified by latitude and longitude (in numeric degrees)
 * using the Vincenty inverse formula for ellipsoids. This algorithm is slow but very accurate (down to 0.5 mm).
 * <p>See the original reference about this formula : <a href="http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf">Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations</a>.</p>
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var vincenty = core.maths.vincenty ;
 *
 * var position1 = { x : 37.422045,  y : -122.084347 } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( vincenty( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 087.066 meters
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
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
 * The VEGAS.js framework - The core.maths library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
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
 * The VEGAS.js framework - The core.numbers library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var numbers = Object.assign({
  toUnicodeNotation: toUnicodeNotation
});

/**
 * Returns all the public members of an object, either by key or by value.
 * @param o The target object to enumerate.
 * @param byValue The optional flag indicates if the function return an Array of strings (keys) or of values (default false).
 * <p><b>Example :</b></p>
 * <code class="prettyprint">
 * var o = { a : 5 , b : 6 } ;
 * trace( core.dump( core.objects.members( o ) ) ) ; // [a,b]
 * trace( core.dump( core.objects.members( o , true ) ) ) ; // [5,6]
 * </code>
 * @return Array containing all the string key names or values (if the byValue argument is true). The method returns null if no members are finding.
 */

function members(o /*Object*/, byValue /*Boolean*/) /*Array*/
{
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
 * @param target The target object to merge.
 * @param source The source object reference.
 * @param overwrite The optional flag to indicates if the merge function can override the already existing properties in the target reference (default true).
 * <p><b>Example :</b></p>
 * <code class="prettyprint">
 * var target = { a : 5 , b : 6 } ;
 * var from   = { a : 1 , b : 2 , c: 3 } ;
 * trace( core.dump( core.objects.merge( target , from ) ) ) ; // {a:1,b:2,c:3}
 * </code>
 * @return The merged target reference.
 */

function merge(target /*Object*/, source /*Object*/, overwrite /*Boolean*/) /*Object*/
{
    if (overwrite === null || overwrite === undefined) {
        overwrite = true;
    }

    if (source === null || source === undefined) {
        source = {};
    }

    for (var prop /*String*/ in source) {
        if (!(prop in target) || overwrite) {
            target[prop] = source[prop];
        }
    }

    return target;
}

/**
 * The VEGAS.js framework - The core.objects library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var objects = Object.assign({
  members: members,
  merge: merge
});

/**
 * Generates a variant 2, version 4 (randomly generated number) UUID as per RFC 4122.
 */

function generateUUID() /*String*/
{
    function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

/**
 * The VEGAS.js framework - The core.random library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var random = Object.assign({
  generateUUID: generateUUID
});

/**
 * Converts a hyphenated string to a camelcased string.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( camelCase("hello-world" ) ) ; // helloWorld
 * </code>
 * @return The camelcased string.
 */

function camelCase(source /*String*/) /*String*/
{
    return source.replace(/-\D/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
}

/**
 * Converts the first letter of each word in a string to uppercase.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( capitalize( "hello world" ) ) ; // Hello World
 * </code>
 * @return The capitalized string.
 */

function capitalize(source /*String*/) /*String*/
{
    return source.replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
    });
}

/**
 * Returns the center string representation of the specified string value.
 * @param source The string to center.
 * @param size The number of character to center the String expression. (default 0)
 * @param separator The optional separator character use before and after the String to center. (default " ")
 * @return The center of the specified String value.
 * @example
 * <code class="prettyprint">
 * trace( center("hello world", 0) )         ; // hello world
 * trace( center("hello world", 20) )        ; //     hello world
 * trace( center("hello world", 20, "_" ) )  ; // ____hello world_____
 * </code>
 */

function center(source /*String*/, size /*uint*/, separator /*String*/) /*String*/
{
    if (source === null) {
        return "";
    }

    if (separator === null) {
        separator = " ";
    }

    var len /*int*/ = source.length;

    if (len <= size) {
        len = size - len;
        var remain /*String*/ = len % 2 === 0 ? "" : separator;
        var pad /*String*/ = "";
        var count /*int*/ = Math.floor(len / 2);
        if (count > 0) {
            for (var i /*int*/ = 0; i < count; i++) {
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
 * Contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li>http://developer.mozilla.org/es4/proposals/string.html</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zs/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zl/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zp/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/200b/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/feff/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/2060/index.htm</li>
 * </ul>
 */

var whiteSpaceChars = ["\t" /*Horizontal tab*/
, "\n" /*Line feed or New line*/
, "\u000b" /*Vertical tab*/
, "\f" /*Formfeed*/
, "\r" /*Carriage return*/
, " " /*Space*/
, " " /*Non-breaking space*/
, " " /*Ogham space mark*/
, "᠎" /*Mongolian vowel separator*/
, " " /*En quad*/
, " " /*Em quad*/
, " " /*En space*/
, " " /*Em space*/
, " " /*Three-per-em space*/
, " " /*Four-per-em space*/
, " " /*Six-per-em space*/
, " " /*Figure space*/
, " " /*Punctuation space*/
, " " /*Thin space*/
, " " /*Hair space*/
, "​" /*Zero width space*/
, "\u2028" /*Line separator*/
, "\u2029" /*Paragraph separator*/
, " " /*Narrow no-break space*/
, " " /*Medium mathematical space*/
, "　" /*Ideographic space*/
];

/**
 * Removes all occurrences of a set of specified characters (or strings) from the beginning and end of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trim("\r\t   hello world   \t ") ); // hello world
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaceChars</code> array is used.
 * @return The new trimed string.
 */
function trim(source /*String*/, chars /*Array*/) /*String*/
{
    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaceChars;
    }

    if (source === null || source === "") {
        return "";
    }

    var i /*int*/;
    var l /*int*/;

    ////// start

    l = source.length;

    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {
        //
    }

    source = source.substring(i);

    ////// end

    l = source.length;
    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}
    source = source.substring(0, i + 1);

    //////

    return source;
}

/**
 * Removes all extraneous whitespace from a string and trims it.
 * @param source The string to clean.
 * @return The cleaned string.
 * @example
 * <code class="prettyprint">
 * trace( clean("   hello world \n\n" ) ) ; // hello world
 * </code>
 */
function clean(source /*String*/) /*String*/
{
  return trim(source.replace(/\s+/g, ' '));
}

/**
 * Determines wether the end of a string matches the specified value.
 * @example basic usage
 * <listing>
 * <code class="prettyprint">
 * trace( endsWith( "hello world", "world" ) ); //true
 * trace( endsWith( "hello world", "hello" ) ); //false
 * </code>
 * </listing>
 * @param source the string reference.
 * @param value the value to find in first in the source.
 * @return true if the value is find in first.
 */

function endsWith(source /*String*/, value /*String*/) /*Boolean*/
{
    if (source !== null && value === "") {
        return true;
    }
    if (source === null || value === null || source === "" || source.length < value.length) {
        return false;
    }
    return source.lastIndexOf(value) === source.length - value.length;
}

/**
 * Quick and fast format of a string using indexed parameters only.
 * <p>Usage :</p>
 * <ul>
 * <li><code>fastformat( pattern:String, ...args:Array ):String</code></li>
 * <li><code>fastformat( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * </ul>
 * <p><b>Example :</b></p>
 * <code class="prettyprint">
 * trace( fastformat( "hello {0}", "world" ) );
 * //output: "hello world"
 *
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big", "world" ] ) );
 * //output: "hello the big world"
 * </code>
 * @see: format
 */

function fastformat(pattern /*String*/) /*String*/
{
    if (pattern === null || pattern === "") {
        return "";
    }

    var args /*Array*/ = Array.fromArguments(arguments);
    args.shift();

    var len /*int*/ = args.length;

    if (len === 1 && args[0] instanceof Array) {
        args = args[0];
        len = args.length;
    }

    for (var i /*int*/ = 0; i < len; i++) {
        pattern = pattern.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
    }

    return pattern;
}

/**
 * Apply character padding to a string.
 * <p>
 * The padding amount is relative to the string length,
 * if you try to pad the string <code>"hello"</code> (5 chars) with an amount of 10,
 * you will not add 10 spacing chars to the original string,
 * but you will obtain <code>"     hello"</code>, exactly 10 chars after the padding.
 * </p>
 *
 * <p>
 * A positive <code>amount</code> value will pad the string on the left (right align),
 * and a negative <code>amount</code> value will pad the string on the right (left align),
 * </p>
 *
 * @example basic usage
 * <listing version="3.0">
 * <code class="prettyprint">
 * var word = "hello";
 *
 * trace( "[" + pad( word, 8 ) + "]" ); //align to the right
 * trace( "[" + pad( word, -8 ) + "]" ); //align to the left
 *
 * //output
 * //[   hello]
 * //[hello   ]
 * </code>
 * </listing>
 *
 * @example padding a list of names
 * <listing version="3.0">
 * <code class="prettyprint">
 * var seinfeld = [ "jerry", "george", "kramer", "helen" ];
 * var len      = seinfeld.length ;
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
 * </code>
 * </listing>
 *
 * @param source the string to pad
 * @param amount the amount of padding (number sign is the padding direction)
 * @param char the character to pad with (default is space)
 */

function pad(source /*String*/, amount /*int*/, ch /*String*/) /*String*/
{
    if (source === null) {
        return "";
    }

    var left /*Boolean*/ = amount >= 0;
    var width /*int*/ = amount > 0 ? amount : -amount;

    if (width < source.length || width === 0) {
        return source;
    }

    if (ch === null) {
        ch = " "; // default
    } else if (ch.length > 1) {
        ch = ch.charAt(0); //we want only 1 char
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
 * <p>Usage :</p>
 * <ul>
 * <li><code>format( pattern:String, ...args:Array ):String</code></li>
 * <li><code>format( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * <li><code>format( pattern:String, [arg0:*,arg1:*,arg2:*, ...], ...args:Array ):String</code></li>
 * <li><code>format( pattern:String, {name0:value0,name1:value1,name2:value2, ...} ):String</code></li>
 * <li><code>format( pattern:String, {name0:value0,name1:value1,name2:value2, ...}, ...args:Array ):String</code></li>
 * </ul>
 * <p><b>Examples:</b></p>
 * <pre>
 * trace( core.strings.format( "{0},{1},{2}" , "apples" , "oranges", "grapes" ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{0},{1},{2}" , ["apples" , "oranges", "grapes"] ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) ) ; // core.strings.format()
 * </pre>
 * @see core.strings#fastformat
 * @throws Error When a token is malformed.
 */
function format(pattern /*String*/) /*String*/
{
    if (pattern === null || pattern === "") {
        return "";
    }

    var args /*Array*/ = Array.fromArguments(arguments);
    args.shift();

    var formatted /*String*/ = pattern;
    var len /*uint*/ = args.length;
    var words /*Object*/ = {};

    if (len === 1 && args[0] instanceof Array) {
        args = args[0];
    } else if (args[0] instanceof Array) {
        var a /*Array*/ = args[0];
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
    var search /*RegExp*/ = new RegExp("{([a-z0-9,:\\-]*)}", "m");
    var result /*Array*/ = search.exec(formatted);

    var part /*String*/;
    var token /*String*/;
    var c /*String*/;

    var pos /*int*/;

    var dirty /*Boolean*/ = false;

    var padding /*int*/ = 0;

    /* note:
       the buffer will store special string parts of the form
       buffer[0] = "{a:1,b:2,c:3}"
       the fromatted string will replace it by the form
       \uFFFC0 , \uFFFC+N , N being an integer from 0 to N
    */
    var buffer /*Array*/ = [];

    while (result !== null) {
        part = result[0];

        /////// pad the token expression

        token = result[1];

        pos = token.indexOf(",");

        if (pos > 0) {
            padding = Number(token.substr(pos + 1));
            token = token.substring(0, pos);
        }

        ////////////

        c = token.charAt(0);

        if ("0" <= c && c <= "9") {
            formatted = formatted.replace(part, pad(String(args[token]), padding));
        } else if (token === "" || token.indexOf(":") > -1) // if the token is not valid
            {
                /* note:
                   this is to deal with eden/json strings inside a format string
                   if you do a format( "expected: <{a:1,b:2,c:3}> but was: <{a:1,b:2,c:4}>", "test" )
                   this will collide of the legit parsing of
                   format( "hello {x,-8} and nhello {y,-8}" )
                */

                buffer.push(part);

                formatted = formatted.replace(new RegExp(part, "g"), "￼" + (buffer.length - 1));
                dirty = true;
            } else if ("a" <= c && c <= "z") {
            if (token in words || words.hasOwnProperty(token)) {
                /* note:
                   here you want the part to have a global flag to replace all token instances
                */
                formatted = formatted.replace(new RegExp(part, "g"), pad(String(words[token]), padding));
            }
        } else {
            /* note:
               don't use format() within itself
             */
            throw new Error("core.strings.format failed, malformed token \"" + part + "\", can not start with \"" + c + "\"");
        }

        result = search.exec(formatted);
    }

    if (dirty) {
        var i /*int*/;
        var bl /*int*/ = buffer.length;
        for (i = 0; i < bl; i++) {
            formatted = formatted.replace(new RegExp("￼" + i, "g"), buffer[i]);
        }
    }

    return formatted;
}

/**
 * Converts a camelcased string to a hyphenated string.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( hyphenate( "helloWorld" ) ) ; //"hello-world"
 * </code>
 * @return The hyphenated string.
 */

function hyphenate(source /*String*/) /*String*/
{
    return source.replace(/[A-Z]/g, function (match) {
        return '-' + match.charAt(0).toLowerCase();
    });
}

/**
 * Reports the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * result = indexOfAny("hello world", [2, "hello", 5]) ;
 * trace( result ) ; // 0
 *
 * result = indexOfAny("Five = 5", [2, "hello", 5]) ;
 * trace( result ) ; // 2
 *
 * result = indexOfAny("actionscript is good", [2, "hello", 5]) ;
 * trace( result ) ; // -1
 * </pre>
 * @return the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 */

function indexOfAny(source /*String*/, anyOf /*Array*/, startIndex /*uint*/, count /*int*/) /*int*/
{
    startIndex = isNaN(startIndex) ? 0 : startIndex;
    if (startIndex < 0) {
        startIndex = 0;
    }

    count = isNaN(count) ? -1 : count >= 0 ? count : -1;

    if (anyOf !== null && source !== null && source !== "") {
        var i /*int*/;
        var l /*int*/ = anyOf.length;
        var endIndex /*int*/;
        if (count < 0 || count > l - startIndex) {
            endIndex = l - 1;
        } else {
            endIndex = startIndex + count - 1;
        }
        for (i = startIndex; i <= endIndex; i++) {
            if (source.indexOf(anyOf[i]) > -1) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * Inserts a specified instance of String at a specified index position in this instance.
 * <p>note : </p>
 * if index is null, we directly append the value to the end of the string.
 * if index is zero, we directly insert it to the begining of the string.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * result = core.strings.insert("hello", 0, "a" );  // ahello
 * trace(result) ;
 *
 * result = core.strings.insert("hello", -1, "a" ); // hellao
 * trace(result) ;
 *
 * result = core.strings.insert("hello", 10, "a" ); // helloa
 * trace(result) ;
 *
 * result = core.strings.insert("hello", 1, "a" );  // haello
 * trace(result) ;
 * </pre>
 * @param source The String to transform.
 * @param index The position to insert the new characters.
 * @param value The expression to insert in the source.
 * @return the string modified by the method.
 */

function insert(source /*String*/, index /*int*/, value /*String*/) /*String*/
{
    var strA = "";
    var strB = "";

    if (index === 0) {
        return value + source;
    } else if (index === source.length) {
        return source + value;
    }

    /* TODO:
    review the logic when startIndex == -1
     */
    strA = source.substr(0, index);
    strB = source.substr(index);

    return strA + value + strB;
}

/**
 * Reports the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( lastIndexOfAny("hello world", ["2", "hello", "5"]) ); // 0
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["2", "hello", "5"]) ); // 19
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"]) ); // 9
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"] , 8) ); // 5
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"] , 8 , 3) ); // -1
 * </pre>
 * @param source The string to transform.
 * @param anyOf The Array of Unicode characters to find in the String.
 * @param startIndex The init position of the search process.
 * @param count The number of elements to check.
 * @return the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 */

function lastIndexOfAny(source /*String*/, anyOf /*Array*/, startIndex /*uint*/, count /*int*/) /*int*/
{
    var i /*int*/;
    var index /*int*/;

    startIndex = isNaN(startIndex) ? 0x7FFFFFFF : startIndex;
    count = isNaN(count) ? 0x7FFFFFFF : count;

    if (anyOf === null || source === null || source.length === 0) {
        return -1;
    }

    if (startIndex > source.length) {
        startIndex = source.length;
    } else if (startIndex < 0) {
        return -1;
    }

    var endIndex /*int*/ = startIndex - count + 1;
    if (endIndex < 0) {
        endIndex = 0;
    }
    source = source.slice(endIndex, startIndex + 1);
    var len /*uint*/ = anyOf.length;
    for (i = 0; i < len; i++) {
        index = source.lastIndexOf(anyOf[i], startIndex);
        if (index > -1) {
            return index + endIndex;
        }
    }

    return -1;
}

/**
 * Like white space characters, line terminator characters are used to improve source text readability and to separate tokens (indivisible lexical units) from each other.
 * However, unlike white space characters, line terminators have some influence over the behaviour of the syntactic grammar.
 * In general, line terminators may occur between any two tokens, but there are a few places where they are forbidden by the syntactic grammar.
 * A line terminator cannot occur within any token, not even a string.
 * Line terminators also affect the process of automatic semicolon insertion.
 * <p>ECMAScript specification.</p>
 */

var lineTerminatorChars = ["\n" /*LF : Line Feed*/
, "\r" /*CR : Carriage Return*/
, "\u2028" /*LS : Line Separator*/
, "⤩" /*PS : Paragraphe Separator*/
];

/**
 * Returns a new String value who contains the specified String characters repeated count times.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( repeat( "hello" , 0 ) ) ; // hello
 * trace( repeat( "hello" , 3 ) ) ; // hellohellohello
 * </pre>
 * @return a new String who contains the specified String characters repeated count times.
 */

function repeat$1(source /*String*/, count /*uint*/) /*String*/
{
    if (source === null) {
        return "";
    }

    count = isNaN(count) ? 0 : count;
    count = count > 0 ? count : 0;

    var result /*String*/ = "";
    if (count > 0) {
        for (var i /*int*/ = 0; i < count; i++) {
            result = result.concat(source);
        }
    } else {
        result = source;
    }
    return result;
}

/**
 * Checks if this string starts with the specified prefix.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( startsWith( "hello.txt" , "hello" ) ) ; // true
 * </pre>
 * @param source the string reference.
 * @param value the value to find in first in the source.
 * @return true if the value is find in first.
 */

function startsWith(source /*String*/, value /*String*/) /*Boolean*/
{
    if (source !== null && value === "") {
        return true;
    }

    if (source === null || value === null || source === "" || source.length < value.length) {
        return false;
    }

    if (source.charAt(0) !== value.charAt(0)) {
        return false;
    }
    return source.indexOf(value) === 0;
}

/**
 * Removes all occurrences of a set of characters specified in an array from the end of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trimEnd("---hello world---" , Strings.whiteSpaceChars.concat("-") ) ); // ---hello world
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaceChars</code> array is used.
 * @return The new trimed string.
 */
function trimEnd(source /*String*/, chars /*Array*/) /*String*/
{
    if (!(chars instanceof Array)) {
        chars = whiteSpaceChars;
    }

    if (source === null || source === "") {
        return "";
    }

    var i /*int*/;
    var l /*int*/ = source.length;

    for (i = source.length - 1; i >= 0 && chars.indexOf(source.charAt(i)) > -1; i--) {}

    return source.substring(0, i + 1);
}

/**
 * Removes all occurrences of a set of characters specified in an array from the beginning of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trimStart("---hello world---" , Strings.whiteSpaceChars.concat("-") ) ); // hello world---
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaceChars</code> array is used.
 * @return The new trimed string.
 */
function trimStart(source /*String*/, chars /*Array*/) /*String*/
{
    if (!chars || !(chars instanceof Array)) {
        chars = whiteSpaceChars;
    }

    if (source === null || source === "") {
        return "";
    }

    var i /*int*/;
    var l /*int*/ = source.length;

    for (i = 0; i < l && chars.indexOf(source.charAt(i)) > -1; i++) {}

    return source.substring(i);
}

/**
 * Capitalize the first letter of a string, like the PHP function.
 */

function ucFirst(str /*String*/) /*String*/
{
  return str.charAt(0).toUpperCase() + str.substring(1);
}

/**
 * Capitalize each word in a string, like the PHP function.
 */
function ucWords(str /*String*/) /*String*/
{
    var ar = str.split(" ");
    var l = ar.length;
    while (--l > -1) {
        ar[l] = ucFirst(ar[l]);
    }
    return ar.join(" ");
}

/**
 * The VEGAS.js framework - The core.strings library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var strings = Object.assign({
    camelCase: camelCase,
    capitalize: capitalize,
    caseValue: caseValue,
    center: center,
    clean: clean,
    endsWith: endsWith,
    fastformat: fastformat,
    format: format,
    hyphenate: hyphenate,
    indexOfAny: indexOfAny,
    insert: insert,
    lastIndexOfAny: lastIndexOfAny,
    lineTerminatorChars: lineTerminatorChars,
    pad: pad,
    repeat: repeat$1,
    startsWith: startsWith,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    ucFirst: ucFirst,
    ucWords: ucWords,
    whiteSpaceChars: whiteSpaceChars
});

/**
 * The VEGAS.js framework - The core library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var core = Object.assign({
    dump: dump,
    arrays: arrays,
    chars: chars,
    maths: maths,
    numbers: numbers,
    objects: objects,
    random: random,
    strings: strings
});

/**
 * This class determinates a basic implementation to creates enumeration objects.
 * @param value The value of the enumeration.
 * @param name The name key of the enumeration.
 */

function Enum(value /*int*/, name /*String*/) {
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

/**
 * @extends Object
 */
Enum.prototype = Object.create(Object.prototype);
Enum.prototype.constructor = Enum;

/**
 * Compares the specified object with this object for equality.
 * @return <code>true</code> if the the specified object is equal with this object.
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
 */
Enum.prototype.toString = function () /*String*/
{
    return this._name;
};

/**
 * Returns the primitive value of the object.
 * @return the primitive value of the object.
 */
Enum.prototype.valueOf = function () {
    return this._value;
};

/**
 * An object that maps keys to values. A map cannot contain duplicate keys. Each key can map to at most one value.
 */

function Map() {}
//


/**
 * @extends Object
 */
Map.prototype = Object.create(Object.prototype, {
  /**
   * Returns the number of key-value mappings in this map.
   */
  length: {
    get: function get() {
      return 0;
    }
  }
});

Map.prototype.constructor = Map;

/**
 * Removes all mappings from this map (optional operation).
 */
Map.prototype.clear = function () {}
//


/**
 * Returns a shallow copy of the map.
 * @return a shallow copy of the map.
 */
;Map.prototype.clone = function () {
  return new Map();
};

/**
 * Removes the mapping for this key from this map if it is present (optional operation).
 */
Map.prototype.delete = function (key) {}
//


/**
 * Returns the value to which this map maps the specified key.
 */
;Map.prototype.get = function (key) {}
//


/**
 * Returns {@code true} if this map contains a mapping for the specified key.
 * @return {@code true} if this map contains a mapping for the specified key.
 */
;Map.prototype.has = function (key) /*Boolean*/
{}
//


/**
 * Returns {@code true} if this map maps one or more keys to the specified value.
 * @return {@code true} if this map maps one or more keys to the specified value.
 */
;Map.prototype.hasValue = function (value) /*Boolean*/
{}
//


/**
 * Returns {@code true} if this map contains no key-value mappings.
 * @return {@code true} if this map contains no key-value mappings.
 */
;Map.prototype.isEmpty = function () /*Boolean*/
{}
//


/**
 * Returns the values iterator of this map.
 * @return the values iterator of this map.
 */
;Map.prototype.iterator = function () /*Iterator*/
{}
//


/**
 * Returns the keys iterator of this map.
 * @return the keys iterator of this map.
 */
;Map.prototype.keyIterator = function () /*Iterator*/
{}
//


/**
 * Returns an array of all the keys in the map.
 */
;Map.prototype.keys = function () /*Array*/
{}
//


/**
 * Associates the specified value with the specified key in this map (optional operation).
 */
;Map.prototype.set = function (key, value) {}
//


/**
 * Copies all of the mappings from the specified map to this map (optional operation).
 */
;Map.prototype.setAll = function (map /*Map*/) {}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
;Map.prototype.toString = function () {
  return '[Map]';
};

/**
 * Returns an array of all the values in the map.
 */
Map.prototype.values = function () /*Array*/
{
  //
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
    if (value && value instanceof Map) {
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
 * // trace ("------ iterator") ;
 * //
 * // var it = map.iterator() ;
 * // while (it.hasNext())
 * // {
 * //     trace (it.next() + " : " + it.key()) ;
 * // }
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
 * @extends Map
 */
ArrayMap.prototype = Object.create(Map.prototype, {
    /**
     * Returns the number of key-value mappings in this map.
     */
    length: {
        get: function get() {
            return this._keys.length;
        }
    }
});

ArrayMap.prototype.constructor = Map;

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
{}
//return new MapIterator( this ) ;


/**
 * Returns the keys iterator of this map.
 * @return the keys iterator of this map.
 */
;ArrayMap.prototype.keyIterator = function () /*Iterator*/
{}
//return new ArrayIterator( this._keys ) ;


/**
 * Returns an array representation of all keys in the map.
 * @return an array representation of all keys in the map.
 */
;ArrayMap.prototype.keys = function () /*Array*/
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
ArrayMap.prototype.setAll = function (map /*Map*/) {
    if (!map || !(map instanceof Map)) {
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
 * The VEGAS.js framework - The system.data library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var data = Object.assign({
    Map: Map,
    maps: {
        ArrayMap: ArrayMap
    }
});

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */

function Receiver() {}

/**
 * @extends Object
 */
Receiver.prototype = Object.create(Object.prototype);
Receiver.prototype.constructor = Receiver;

/**
 * This method is called when the receiver is connected with a Signal object.
 * @param ...values All the values emitting by the signals connected with this object.
 */
Receiver.prototype.receive = function () {};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Receiver.prototype.toString = function () /*String*/
{
  return "[Receiver]";
};

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */

function Signaler() {}

/**
 * @extends Object
 */
Signaler.prototype = Object.create(Object.prototype, {
    /**
     * Indicates the number of receivers connected.
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
 * @param receiver The receiver to connect : a Function reference or a Receiver object.
 * @param priority Determinates the priority level of the receiver.
 * @param autoDisconnect Apply a disconnect after the first trigger
 * @return <code>true</code> If the receiver is connected with the signal emitter.
 */
Signaler.prototype.connect = function (receiver, priority /*uint*/, autoDisconnect /*Boolean*/) /*uint*/
{}
//


/**
 * Returns <code>true</code> if one or more receivers are connected.
 * @return <code>true</code> if one or more receivers are connected.
 */
;Signaler.prototype.connected = function () /*Boolean*/
{}
//


/**
 * Disconnect the specified object or all objects if the parameter is null.
 * @return <code>true</code> if the specified receiver exist and can be unregister.
 */
;Signaler.prototype.disconnect = function (receiver) /*Boolean*/
{}
//


/**
 * Emit the specified values to the receivers.
 * @param ...values All values to emit to the receivers.
 */
;Signaler.prototype.emit = function () /*void*/
{}
//


/**
 * Indicates the number of receivers connected.
 */
;Signaler.prototype.getLength = function () /*uint*/
{}
//


/**
 * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
 * @return <code class="prettyprint">true</code> if the specified receiver is connected.
 */
;Signaler.prototype.hasReceiver = function (receiver) /*Boolean*/
{
    //
};

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @param receiver The receiver reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */

function SignalEntry(receiver, priority /*uint*/, auto /*Boolean*/) {
  /**
   * Indicates if the receiver must be disconnected when handle the first time a signal.
   */
  this.auto = Boolean(auto);

  /**
   * The receiver reference of this entry.
   */
  this.receiver = receiver || null;

  /**
   * Determinates the priority value of the object.
   */
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}

///////////////////

/**
 * @extends Object
 */
SignalEntry.prototype = Object.create(Object.prototype);
SignalEntry.prototype.constructor = SignalEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
SignalEntry.prototype.toString = function () /*String*/
{
  return '[SignalEntry]';
};

/**
 * Creates a new Signal instance.
 * <p><b>Example :</b></p>
 * <pre>
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
 * </pre>
 */
function Signal() {
    Object.defineProperties(this, {
        /**
         * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
         */
        proxy: {
            value: null,
            enumerable: false,
            configurable: true,
            writable: false
        },
        receivers: {
            value: [],
            enumerable: false,
            configurable: false,
            writable: true
        }
    });
}

///////////////////

Signal.prototype = Object.create(Signaler.prototype, {
    /**
     * The number of receivers or slots register in the signal object.
     */
    length: {
        get: function get() {
            return this.receivers.length;
        }
    }
});

Signal.prototype.constructor = Signal;

///////////////////

/**
 * Connects a Function or a Receiver object.
 * @param receiver The receiver to connect : a Function reference or a Receiver object.
 * @param priority Determinates the priority level of the receiver.
 * @param autoDisconnect Apply a disconnect after the first trigger
 * @return <code>true</code> If the receiver is connected with the signal emitter.
 */
Signal.prototype.connect = function (receiver, priority /*uint*/, autoDisconnect /*Boolean*/) /*Boolean*/
{
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
};

/**
 * Returns <code>true</code> if one or more receivers are connected.
 * @return <code>true</code> if one or more receivers are connected.
 */
Signal.prototype.connected = function () /*Boolean*/
{
    return this.receivers.length > 0;
};

/**
 * Disconnect the specified object or all objects if the parameter is null.
 * @return <code>true</code> if the specified receiver exist and can be unregister.
 */
Signal.prototype.disconnect = function (receiver) /*Boolean*/
{
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
};

/**
 * Emit the specified values to the receivers.
 * @param ...values All values to emit to the receivers.
 */
Signal.prototype.emit = function () /*Arguments*/ /*void*/
{
    var values = Object.setPrototypeOf(arguments, Array.prototype);

    if (this.receivers.length === 0) {
        return;
    }

    var i /*int*/;
    var l /*int*/ = this.receivers.length;
    var r /*Array*/ = [];
    var a /*Array*/ = this.receivers.slice();
    var e /*SignalEntry*/;

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
};

/**
 * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
 * @return <code class="prettyprint">true</code> if the specified receiver is connected.
 */
Signal.prototype.hasReceiver = function (receiver) /*Boolean*/
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
};

/**
 * Returns the Array representation of all receivers connected with the signal.
 * @return the Array representation of all receivers connected with the signal.
 */
Signal.prototype.toArray = function () /*Array*/
{
    var r /*Array*/ = [];
    if (this.receivers.length > 0) {
        var l /*int*/ = this.receivers.length;
        for (var i /*int*/ = 0; i < l; i++) {
            r.push(this.receivers[i].receiver);
        }
    }
    return r;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Signal.prototype.toString = function () /*String*/
{
    return "[Signal]";
};

/**
 * This interface should be implemented by any class whose instances are intended to be executed.
 */

function Runnable() {}
///////////////////

Runnable.prototype = Object.create(Object.prototype);
Runnable.prototype.constructor = Runnable;

///////////////////

/**
 * Run the process.
 */
Runnable.prototype.run = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Runnable.prototype.toString = function () /*String*/
{
  return "[Runnable]";
};

/**
 * The enumeration of all phases in a task process.
 */

var TaskPhase = Object.defineProperties({}, {
    DELAYED: { value: 'delayed', enumerable: true },
    FINISHED: { value: 'finished', enumerable: true },
    INACTIVE: { value: 'inactive', enumerable: true },
    RUNNING: { value: 'running', enumerable: true },
    STOPPED: { value: 'stopped', enumerable: true },
    TIMEOUT: { value: 'timeout', enumerable: true }
});

/**
 * Creates a new Action instance.
 */
function Action() {
  Object.defineProperties(this, {
    /**
     * This signal emit when the action is finished.
     */
    finishIt: { value: new Signal() },

    /**
     * Indicates the current phase.
     */
    phase: { get: function get() {
        return this._phase;
      } },

    /**
     * Indicates action is running.
     */
    running: { get: function get() {
        return this._running;
      } },

    /**
     * This signal emit when the action is started.
     */
    startIt: { value: new Signal() },

    __lock__: {
      value: false,
      enumerable: false,
      writable: true,
      configurable: true
    },
    _phase: {
      value: TaskPhase.INACTIVE,
      enumerable: false,
      writable: true,
      configurable: true
    },
    _running: {
      value: false,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}

/**
 * @extends Runnable
 */
Action.prototype = Object.create(Runnable.prototype);
Action.prototype.constructor = Action;

/**
 * Creates a copy of the object.
 */
Action.prototype.clone = function () {
  return new Action();
};

/**
 * Returns <code class="prettyprint">true</code> if the object is locked.
 * @return <code class="prettyprint">true</code> if the object is locked.
 */
Action.prototype.isLocked = function () /*Boolean*/
{
  return this.__lock__;
};

/**
 * Locks the object.
 */
Action.prototype.lock = function () /*void*/
{
  this.__lock__ = true;
};

/**
 * Notify when the process is finished.
 */
Action.prototype.notifyFinished = function () /*Boolean*/
{
  this._running = false;
  this._phase = TaskPhase.FINISHED;
  this.finishIt.emit(this);
  this._phase = TaskPhase.INACTIVE;
};

/**
 * Notify when the process is started.
 */
Action.prototype.notifyStarted = function () /*void*/
{
  this._running = true;
  this._phase = TaskPhase.RUNNING;
  this.startIt.emit(this);
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Action.prototype.toString = function () /*String*/
{
  return '[Action]';
};

/**
 * Unlocks the object.
 */
Action.prototype.unlock = function () /*void*/
{
  this.__lock__ = false;
};

/**
 * The ActionEntry objects contains all informations about an Action in a TaskGroup.
 * @param action The Action reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */

function ActionEntry(action, priority /*uint*/, auto /*Boolean*/) {
  this.action = action;
  this.auto = Boolean(auto);
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}

/**
 * @extends Object
 */
ActionEntry.prototype = Object.create(Object.prototype);
ActionEntry.prototype.constructor = ActionEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
ActionEntry.prototype.toString = function () /*String*/
{
  return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]";
};

/**
 * Creates a new Batch instance.
 * @param init The optional Array of Runnable objects to fill the batch.
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
function Batch(init /*Array*/) {
    var _this = this;

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

/**
 * @extends Runnable
 */
Batch.prototype = Object.create(Runnable.prototype, {
    /**
     * Retrieves the number of elements in this batch.
     * @return the number of elements in this batch.
     */
    length: {
        get: function get() {
            return this._entries.length;
        }
    }
});
Batch.prototype.constructor = Batch;

/**
 * Adds the specified Runnable object in batch.
 */
Batch.prototype.add = function (command /*Runnable*/) /*Boolean*/
{
    if (command && command instanceof Runnable) {
        this._entries.push(command);
        return true;
    }
    return false;
};

/**
 * Removes all of the elements from this batch.
 */
Batch.prototype.clear = function () /*void*/
{
    this._entries.length = 0;
};

/**
 * Returns a shallow copy of the object.
 * @return a shallow copy of the object.
 */
Batch.prototype.clone = function () {
    var b = new Batch();
    var l = this._entries.length;
    for (var i = 0; i < l; i++) {
        b.add(this._entries[i]);
    }
    return b;
};

/**
 * Returns {@code true} if this batch contains the specified element.
 * @return {@code true} if this batch contains the specified element.
 */
Batch.prototype.contains = function (command /*Runnable*/) /*Boolean*/
{
    if (command instanceof Runnable) {
        var l = this._entries.length;
        while (--l > -1) {
            if (this._entries[l] === command) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Returns the command from this batch at the passed index.
 * @return the command from this batch at the passed index.
 */
Batch.prototype.get = function (key) {
    return this._entries[key];
};

/**
 * Returns the position of the passed object in the batch.
 * @param command the Runnable object to search in the collection.
 * @param fromIndex the index to begin the search in the collection.
 * @return the index of the object or -1 if the object isn't find in the batch.
 */
Batch.prototype.indexOf = function (command, fromIndex /*uint*/) /*int*/
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
};

/**
 * Returns {@code true} if this batch contains no elements.
 * @return {@code true} if this batch is empty else {@code false}.
 */
Batch.prototype.isEmpty = function () /*Boolean*/
{
    return this._entries.length === 0;
};

/**
 * Removes a single instance of the specified element from this collection, if it is present (optional operation).
 */
Batch.prototype.remove = function (command /*Runnable*/) /*Boolean*/
{
    var index = this.indexOf(command);
    if (index > -1) {
        this._entries.splice(index, 1);
        return true;
    }
    return false;
};

/**
 * Run the process.
 */
Batch.prototype.run = function () /*void*/
{
    var l = this._entries.length;
    if (l > 0) {
        var i = -1;
        while (++i < l) {
            this._entries[i].run();
        }
    }
};

/**
 * Stops all commands in the batch.
 */
Batch.prototype.stop = function () /*void*/
{
    var l = this._entries.length;
    if (l > 0) {
        this._entries.forEach(function (element) {
            if (element instanceof Runnable && 'stop' in element && element.stop instanceof Function) {
                element.stop();
            }
        });
    }
};

/**
 * Returns an array containing all of the elements in this batch.
 * @return an array containing all of the elements in this batch.
 */
Batch.prototype.toArray = function () /*Array*/
{
    return this._entries.slice();
};

/**
 * Returns the source code string representation of the object.
 * @return the source code string representation of the object.
 */
Batch.prototype.toString = function () /*Array*/
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
};

/**
 * A Task object to create a set of complex commands or actions.
 */
function Task() {
  Action.call(this);
  Object.defineProperties(this, {
    /**
     * The signal emit when the task is changed.
     */
    changeIt: { value: new Signal() },

    /**
     * The signal emit when the task is cleared.
     */
    clearIt: { value: new Signal() },

    /**
     * The signal emit when the task emit a message.
     */
    infoIt: { value: new Signal() },

    /**
     * The flag to determinate if the task must be looped.
     */
    looping: { value: false, enumerable: false, configurable: false, writable: true },

    /**
     * The signal emit when the task is looped.
     */
    loopIt: { value: new Signal() },

    /**
     * The signal emit when the task is paused.
     */
    pauseIt: { value: new Signal() },

    /**
     * The signal emit when the task is in progress.
     */
    progressIt: { value: new Signal() },

    /**
     * The signal emit when the task is resumed.
     */
    resumeIt: { value: new Signal() },

    /**
     * This signal emit when the task is stopped.
     */
    stopIt: { value: new Signal() },

    /**
     * The signal emit when the task is out of time.
     */
    timeoutIt: { value: new Signal() }
  });
}

/**
 * @extends Task
 */
Task.prototype = Object.create(Action.prototype);
Task.prototype.constructor = Task;

/**
 * Creates a copy of the object.
 */
Task.prototype.clone = function () {
  return new Task();
};

/**
 * Notify when the process is changed.
 */
Task.prototype.notifyChanged = function () /*void*/
{
  if (!this.__lock__) {
    this.changeIt.emit(this);
  }
};

/**
 * Notify when the process is cleared.
 */
Task.prototype.notifyCleared = function () /*void*/
{
  if (!this.__lock__) {
    this.clearIt.emit(this);
  }
};

/**
 * Notify a specific information when the process is changed.
 */
Task.prototype.notifyInfo = function (info) /*void*/
{
  if (!this.__lock__) {
    this.infoIt.emit(this, info);
  }
};

/**
 * Notify when the process is looped.
 */
Task.prototype.notifyLooped = function () /*void*/
{
  this._phase = TaskPhase.RUNNING;
  if (!this.__lock__) {
    this.loopIt.emit(this);
  }
};

/**
 * Notify when the process is paused.
 */
Task.prototype.notifyPaused = function () /*void*/
{
  this._running = false;
  this._phase = TaskPhase.STOPPED;
  if (!this.__lock__) {
    this.pauseIt.emit(this);
  }
};

/**
 * Notify when the process is progress.
 */
Task.prototype.notifyProgress = function () /*void*/
{
  if (!this.__lock__) {
    this.progressIt.emit(this);
  }
};

/**
 * Notify when the process is resumed.
 */
Task.prototype.notifyResumed = function () /*void*/
{
  this._phase = TaskPhase.RUNNING;
  if (!this.__lock__) {
    this.resumeIt.emit(this);
  }
};

/**
 * Notify when the process is stopped.
 */
Task.prototype.notifyStopped = function () /*void*/
{
  this._running = false;
  this._phase = TaskPhase.STOPPED;
  if (!this.__lock__) {
    this.stopIt.emit(this);
  }
};

/**
 * Notify when the process is out of time.
 */
Task.prototype.notifyTimeout = function () /*void*/
{
  this._running = false;
  this._phase = TaskPhase.TIMEOUT;
  if (!this.__lock__) {
    this.timeoutIt.emit(this);
  }
};

/**
 * Resumes the task.
 */
Task.prototype.resume = function () /*void*/
{}
//


/**
 * Resets the task.
 */
;Task.prototype.reset = function () /*void*/
{}
//


/**
 * Starts the task.
 */
;Task.prototype.start = function () /*void*/
{}
//


/**
 * Starts the process.
 */
;Task.prototype.stop = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Task.prototype.toString = function () /*String*/
{
  return '[Task]';
};

/**
 * A simple representation of the Action interface, to group some Action objects in one.
 * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
 * @param actions A dynamic object who contains Action references to initialize the chain.
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
function TaskGroup(mode /*String*/, actions /*Array*/) {
    var _this = this;

    Task.call(this);

    Object.defineProperties(this, {
        /**
         * Indicates if the toString method must be verbose or not.
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
     * Determinates the "everlasting" mode of the group.
     * In this mode the action register in the task-group can't be auto-remove.
     */
    EVERLASTING: { value: 'everlasting', enumerable: true },

    /**
     * Determinates the "normal" mode of the group.
     * In this mode the task-group has a normal life cycle.
     */
    NORMAL: { value: 'normal', enumerable: true },

    /**
     * Determinates the "transient" mode of the group.
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     */
    TRANSIENT: { value: 'transient', enumerable: true }
});

/**
 * @extends Task
 */
TaskGroup.prototype = Object.create(Task.prototype, {
    __className__: { value: 'TaskGroup', configurable: true },

    /**
     * Indicates the numbers of actions register in the group.
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
                var slot;
                var e /*ActionEntry*/;
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
     * Determinates the mode of the chain. The mode can be "normal", "transient" or "everlasting".
     * @see TaskGroup.NORMAL, TaskGroup.EVERLASTING, TaskGroup.TRANSIENT
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
     */
    stopped: {
        get: function get() {
            return this._stopped;
        }
    }
});

TaskGroup.prototype.constructor = TaskGroup;

/**
 * Adds an action in the chain.
 * @param priority Determinates the priority level of the action in the chain.
 * @param autoRemove Apply a removeAction after the first finish notification.
 * @return <code>true</code> if the insert is success.
 */
TaskGroup.prototype.add = function (action /*Action*/, priority /*uint*/, autoRemove /*Boolean*/) /*Boolean*/
{
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
};

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
TaskGroup.prototype.clone = function () {
    return new TaskGroup(this._mode, this._actions.length > 0 ? this._actions : null);
};

/**
 * Dispose the chain and disconnect all actions but don't remove them.
 */
TaskGroup.prototype.dispose = function () /*void*/
{
    var _this2 = this;

    if (this._actions.length > 0) {
        var slot;
        this._actions.forEach(function (entry) {
            if (entry instanceof ActionEntry) {
                entry.action.finishIt.disconnect(_this2._next);
            }
        });
    }
};

/**
 * Returns the action register in the chain at the specified index value or <code>null</code>.
 * @return the action register in the chain at the specified index value or <code>null</code>.
 */
TaskGroup.prototype.get = function (index /*uint*/) /*Action*/
{
    if (this._actions.length > 0 && index < this._actions.length) {
        var entry = this._actions[index];
        if (entry) {
            return entry.action;
        }
    }
    return null;
};

/**
 * Returns <code class="prettyprint">true</code> if the specified Action is register in the group.
 * @return <code class="prettyprint">true</code> if the specified Action is register in the group.
 */
TaskGroup.prototype.contains = function (action /*Action*/) /*Action*/
{
    if (action && action instanceof Action) {
        if (this._actions.length > 0) {
            var e /*ActionEntry*/;
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
};

/**
 * Returns <code>true</code> if the chain is empty.
 * @return <code>true</code> if the chain is empty.
 */
TaskGroup.prototype.isEmpty = function () /*Boolean*/
{
    return this._actions.length === 0;
};

/**
 * Invoked when a task is finished.
 */
TaskGroup.prototype.next = function (action /*Action*/) /*void*/
{}
//


/**
 * Removes a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed.
 * If the chain is running the stop() method is called.
 * @return <code>true</code> if the method success.
 */
;TaskGroup.prototype.remove = function (action /*Action*/) /*Boolean*/
{
    var _this3 = this;

    if (this._running) {
        throw new Error(this + " remove failed, the process is in progress.");
    }
    this.stop();
    if (this._actions.length > 0) {
        if (action && action instanceof Action) {
            var e /*ActionEntry*/;
            var l /*int*/ = this._actions.length;

            var slot;

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
};

/**
 * Returns the Array representation of the chain.
 * @return the Array representation of the chain.
 */
TaskGroup.prototype.toArray = function () /*Array*/
{
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
};

/**
 * Returns the String representation of the chain.
 * @return the String representation of the chain.
 */
TaskGroup.prototype.toString = function () /*String*/
{
    var s /*String*/ = "[" + this.__className__;
    if (Boolean(this.verbose)) {
        if (this._actions.length > 0) {
            s += "[";
            var i /*int*/;
            var e /*ActionEntry*/;
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
};

/**
 * The internal BatchTaskNext Receiver.
 */
function BatchTaskNext(batch) {
    this.batch = batch;
}

/**
 * @extends TaskGroup
 */
BatchTaskNext.prototype = Object.create(Receiver.prototype);
BatchTaskNext.prototype.constructor = BatchTaskNext;

/**
 * Receive the signal message.
 */
BatchTaskNext.prototype.receive = function (action) {
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
};

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
            var a /*Action*/;
            var e /*ActionEntry*/;
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
            var a /*Action*/;
            var e /*ActionEntry*/;
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
 * The internal ChainNext Receiver.
 */
function ChainNext(chain) {
    this.chain = chain;
}

/**
 * @extends TaskGroup
 */
ChainNext.prototype = Object.create(Receiver.prototype);
ChainNext.prototype.constructor = ChainNext;

/**
 * Receive the signal message.
 */
ChainNext.prototype.receive = function () {
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
};

/**
 * Creates a new Chain instance.
 * @param looping Specifies whether playback of the clip should continue, or loop (default false).
 * @param numLoop Specifies the number of the times the presentation should loop during playback.
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
 * trace( 'batch   : ' + chain.toString(true) ) ;
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
 */
function Chain(looping /*Boolean*/, numLoop /*uint*/, mode /*String*/, actions /*Array*/) {
    TaskGroup.call(this, mode, actions);

    Object.defineProperties(this, {
        /**
         * Indicates if the chain loop when is finished.
         */
        looping: { value: Boolean(looping), writable: true },

        /**
         * The number of loops.
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

/**
 * @extends TaskGroup
 */
Chain.prototype = Object.create(TaskGroup.prototype, {
    /**
     * Indicates the current Action reference when the batch is in progress.
     */
    current: { get: function get() {
            return this._current ? this._current.action : null;
        } },

    /**
     * Indicates the current countdown loop value.
     */
    currentLoop: { get: function get() {
            return this._currentLoop;
        } },

    /**
     * Indicates the current numeric position of the chain when is running.
     */
    position: { get: function get() {
            return this._position;
        } },

    /**
     * @private
     */
    __className__: { value: 'Chain', configurable: true }
});

Chain.prototype.constructor = Chain;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Chain.prototype.clone = function () {
    return new Chain(this.looping, this.numLoop, this._mode, this._actions.length > 0 ? this._actions : null);
};

/**
 * Retrieves the next action reference in the chain with the current position.
 */
Chain.prototype.element = function () {
    return this.hasNext() ? this._actions[this._position].action : null;
};

/**
 * Retrieves the next action reference in the chain with the current position.
 */
Chain.prototype.hasNext = function () {
    return this._position < this._actions.length;
};

/**
 * Resume the chain.
 */
Chain.prototype.resume = function () /*void*/
{
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
};

/**
 * Launchs the chain process.
 */
Chain.prototype.run = function () /*void*/
{
    if (!this._running) {
        this.notifyStarted();

        this._current = null;
        this._stopped = false;
        this._position = 0;
        this._currentLoop = 0;

        this._next.receive();
    }
};

/**
 * Stops the task group.
 */
Chain.prototype.stop = function () /*void*/
{
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
};

/**
 * A simple command to do something.
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

/**
 * @extends Task
 */
Do.prototype = Object.create(Action.prototype);
Do.prototype.constructor = Do;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Do.prototype.clone = function () {
  return new Do();
};

/**
 * The something method to overrides.
 */
Do.prototype.something = function () {}
// override


/**
 * Run the process.
 */
;Do.prototype.run = function () /*void*/
{
  this.notifyStarted();
  this.something();
  this.notifyFinished();
};

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Do.prototype.toString = function () /*String*/
{
  return '[Do]';
};

/**
 * Indicates if the specific objet is Lockable.
 */

function isLockable(target) {
  if (target) {
    var isLocked = 'isLocked' in target && target.isLocked instanceof Function;
    var lock = 'lock' in target && target.lock instanceof Function;
    var unlock = 'unlock' in target && target.unlock instanceof Function;
    return isLocked && lock && unlock;
  }

  return false;
}

/**
 * This interface is implemented by all objects lockable.
 */
function Lockable() {}

///////////////////

Lockable.prototype = Object.create(Object.prototype);
Lockable.prototype.constructor = Lockable;

///////////////////

/**
 * Returns <code>true</code> if the object is locked.
 * @return <code>true</code> if the object is locked.
 */
Lockable.prototype.isLocked = function () /*void*/
{
  return this.__lock__;
};

/**
 * Locks the object.
 */
Lockable.prototype.lock = function () /*void*/
{
  this.__lock__ = true;
};

/**
 * Unlocks the object.
 */
Lockable.prototype.unlock = function () /*void*/
{
  this.__lock__ = false;
};

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Lockable.prototype.toString = function () /*String*/
{
  return "[Lockable]";
};

/**
 * @private
 */
Lockable.prototype.__lock__ = false;

/**
 * Invoked to lock a specific Lockable object.
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

/**
 * @extends Task
 */
Lock.prototype = Object.create(Action.prototype);
Lock.prototype.constructor = Lock;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Lock.prototype.clone = function () {
    return new Lock(this.target);
};

/**
 * Indicates if the specific objet is Lockable.
 */
Lock.prototype.isLockable = function (target) {
    target = target || this.target;

    if (target) {
        var isLocked = 'isLocked' in target && target.isLocked instanceof Function;
        var lock = 'lock' in target && target.lock instanceof Function;
        var unlock = 'unlock' in target && target.unlock instanceof Function;
        return isLocked && lock && unlock;
    }

    return false;
};

/**
 * Run the process.
 */
Lock.prototype.run = function () /*void*/
{
    this.notifyStarted();
    if (isLockable(this.target) && !this.target.isLocked()) {
        this.target.lock();
    }
    this.notifyFinished();
};

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Lock.prototype.toString = function () /*String*/
{
    return '[Lock]';
};

/**
 * Creates a new Priority instance.
 */

function Priority() {
    Object.defineProperties(this, {
        /**
         * Determinates the priority value.
         */
        priority: {
            get: function get() {
                return this._priority;
            },
            set: function set(value) {
                this._priority = value > 0 || value < 0 ? value : 0;
            }
        },
        _priority: {
            value: 0,
            enumerable: false,
            writable: true,
            configurable: false
        }
    });
}

/**
 * @extends Object
 */
Priority.prototype = Object.create(Object.prototype);
Priority.prototype.constructor = Priority;

/**
 * This interface should be implemented by any class whose instances are intended to be reseted.
 */

function Resetable() {}
///////////////////

Resetable.prototype = Object.create(Object.prototype);
Resetable.prototype.constructor = Resetable;

///////////////////

/**
 * Resets the process.
 */
Resetable.prototype.reset = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Resetable.prototype.toString = function () /*String*/
{
  return "[Resetable]";
};

/**
 * This interface should be implemented by any class whose instances are intended to be resumed.
 */

function Resumable() {}
///////////////////

Resumable.prototype = Object.create(Object.prototype);
Resumable.prototype.constructor = Resumable;

///////////////////

/**
 * Resumes the process.
 */
Resumable.prototype.resume = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Resumable.prototype.toString = function () /*String*/
{
  return "[Resumable]";
};

/**
 * This interface should be implemented by any class whose instances are intended to be started.
 */

function Startable() {}

///////////////////

Startable.prototype = Object.create(Object.prototype);
Startable.prototype.constructor = Startable;

///////////////////

/**
 * Starts the process.
 */
Startable.prototype.start = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Startable.prototype.toString = function () /*String*/
{
  return "[Startable]";
};

/**
 * This interface should be implemented by any class whose instances are intended to be stopped.
 */

function Stoppable() {}

///////////////////

Stoppable.prototype = Object.create(Object.prototype);
Stoppable.prototype.constructor = Stoppable;

///////////////////

/**
 * Stop the process.
 */
Stoppable.prototype.stop = function () /*void*/
{}
//


/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
;Stoppable.prototype.toString = function () /*String*/
{
  return "[Stoppable]";
};

/**
 * Creates a new TimeoutPolicy instance.
 * @example
 * <pre>
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
 * </pre>
 * @param value The value of the enumeration.
 * @param name The name key of the enumeration.
 */
function TimeoutPolicy(value /*int*/, name /*String*/) {
  Enum.call(this, value, name);
}

/**
 * @extends Object
 */
TimeoutPolicy.prototype = Object.create(Enum.prototype);
TimeoutPolicy.prototype.constructor = TimeoutPolicy;

Object.defineProperties(TimeoutPolicy, {
  /**
   * Designates the infinity timeout policy (0).
   */
  INFINITY: { value: new TimeoutPolicy(0, 'infinity'), enumerable: true },

  /**
   * Designates the limited timeout policy (1).
   */
  LIMIT: { value: new TimeoutPolicy(1, 'limit'), enumerable: true }
});

/**
 * Invoked to Unlock a specific Unlockable object.
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

/**
 * @extends Task
 */
Unlock.prototype = Object.create(Action.prototype);
Unlock.prototype.constructor = Unlock;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Unlock.prototype.clone = function () {
  return new Unlock(this.target);
};

/**
 * Run the process.
 */
Unlock.prototype.run = function () /*void*/
{
  this.notifyStarted();
  if (isLockable(this.target) && this.target.isLocked()) {
    this.target.unlock();
  }
  this.notifyFinished();
};

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Unlock.prototype.toString = function () /*String*/
{
  return '[Unlock]';
};

/**
 * The VEGAS.js framework - The system.process library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var process = Object.assign({
    Action: Action,
    ActionEntry: ActionEntry,
    Batch: Batch,
    BatchTask: BatchTask,
    Chain: Chain,
    Do: Do,
    isLockable: isLockable,
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
    Unlock: Unlock
});

/**
 * The enumeration of all string expressions in the signal engine.
 */

var strings$1 = Object.defineProperties({}, {
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
 * The VEGAS.js framework - The system.signals library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var signals = Object.assign({
    strings: strings$1,
    Receiver: Receiver,
    SignalEntry: SignalEntry,
    Signaler: Signaler,
    Signal: Signal
});

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var system = Object.assign({
  Enum: Enum,

  data: data,
  process: process,
  signals: signals
});

/**
 * The VEGAS.js framework.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */

exports.trace = trace;
exports.core = core;
exports.system = system;

Object.defineProperty(exports, '__esModule', { value: true });

})));
/* follow me on Twitter! @ekameleon */