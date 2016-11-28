"use strict" ;

/**
 * This collection contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li>http://www.fileformat.info/info/unicode/category/Zs/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zl/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zp/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/200b/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/feff/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/2060/index.htm</li>
 * </ul>
 * @name whiteSpaces
 * @memberof core.chars
 * @instance
 * @const
 * @type {Array}
 * @see The ECMAScript specification.
 */
export var whiteSpaces =
[
    "\u0009" /*Horizontal tab*/ ,
    "\u000A" /*Line feed or New line*/,
    "\u000B" /*Vertical tab*/,
    "\u000C" /*Formfeed*/,
    "\u000D" /*Carriage return*/,
    "\u0020" /*Space*/,
    "\u00A0" /*Non-breaking space*/,
    "\u1680" /*Ogham space mark*/,
    "\u180E" /*Mongolian vowel separator*/,
    "\u2000" /*En quad*/,
    "\u2001" /*Em quad*/,
    "\u2002" /*En space*/,
    "\u2003" /*Em space*/,
    "\u2004" /*Three-per-em space*/,
    "\u2005" /*Four-per-em space*/,
    "\u2006" /*Six-per-em space*/,
    "\u2007" /*Figure space*/,
    "\u2008" /*Punctuation space*/,
    "\u2009" /*Thin space*/,
    "\u200A" /*Hair space*/,
    "\u200B" /*Zero width space*/,
    "\u2028" /*Line separator*/,
    "\u2029" /*Paragraph separator*/,
    "\u202F" /*Narrow no-break space*/,
    "\u205F" /*Medium mathematical space*/,
    "\u3000" /*Ideographic space*/
];