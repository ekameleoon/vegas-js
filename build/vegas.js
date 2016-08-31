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
 * The VEGAS.js framework - The core library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */

// core
// core.arrays
// core.chars
// core.maths
// core.numbers
// core.objects
// core.random
// core.strings
var core = Object.assign({
    dump: dump,
    arrays: {
        contains: contains,
        initialize: initialize,
        pierce: pierce,
        repeat: repeat,
        shuffle: shuffle,
        sortOn: sortOn,
        spliceInto: spliceInto
    },
    chars: {
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
    },
    maths: {
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
    },
    numbers: {
        toUnicodeNotation: toUnicodeNotation
    },
    objects: {
        members: members,
        merge: merge
    },
    random: {
        generateUUID: generateUUID
    },
    strings: {
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
    }
});

/**
 * The enumeration of all string expressions in the signal engine.
 */

var strings = {
    INVALID_PARAMETER_TYPE: "The parameter with the index {0} in the emit method is not valid.",
    INVALID_PARAMETERS_LENGTH: "The number of arguments in the emit method is not valid, must be invoked with {0} argument(s) and you call it with {1} argument(s).",
    INVALID_TYPES: "Invalid types representation, the Array of types failed at index {0} should be a constructor function but was:\"{1}\"."
};

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */

function Receiver() {}

///////////////////

Receiver.prototype = Object.create(Object.prototype);
Receiver.prototype.constructor = Receiver;

///////////////////

/**
 * This method is called when the receiver is connected with a Signal object.
 * @param ...values All the values emitting by the signals connected with this object.
 */
Receiver.prototype.receive = function () {};

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @param receiver The receiver reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */

function SignalEntry(receiver, priority /*uint*/, auto /*Boolean*/) {
  this.auto = Boolean(auto);
  this.receiver = receiver;
  this.priority = priority > 0 ? Math.ceil(priority) : 0;
}

///////////////////

/**
 * @extends Object
 */
SignalEntry.prototype = Object.create(Object.prototype);
SignalEntry.prototype.constructor = SignalEntry;

///////////////////

/**
 * Indicates if the receiver must be disconnected when handle the first time a signal.
 */
SignalEntry.prototype.auto = false;

/**
 * Determinates the priority value of the object.
 */
SignalEntry.prototype.priority = 0;

/**
 * The receiver reference of this entry.
 */
SignalEntry.prototype.receiver = null;

///////////////////

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
SignalEntry.prototype.toString = function () /*String*/
{
  return "[SignalEntry receiver:" + this.receiver + " priority:" + this.priority + " auto:" + this.auto + "]";
};

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */

function Signaler() {}

///////////////////

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

///////////////////

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
function Signal() {}

///////////////////

Signal.prototype = Object.create(Signaler.prototype, {
    /**
     * The number of receivers or slots register in the signal object.
     */
    length: {
        enumerable: false,
        configurable: true,
        get: function get() {
            return this.receivers.length;
        }
    },
    /**
     * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
     */
    proxy: {
        enumerable: false,
        configurable: true,
        writable: true,
        value: null
    },
    receivers: {
        enumerable: false,
        configurable: true,
        writable: true,
        value: []
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
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var system = Object.assign({
    signals: {
        strings: strings,
        Receiver: Receiver,
        SignalEntry: SignalEntry,
        Signaler: Signaler,
        Signal: Signal
    }
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