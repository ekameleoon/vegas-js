"use strict" ;

import { toUnicodeNotation } from './numbers/toUnicodeNotation.js' ;

/**
 * Dumps a string representation of any String value.
 * @name dumpString
 * @memberof core
 * @function
 * @instance
 * @param {string} str a String to transform.
 * @return The dump string representation of any String value.
 */
export function dumpString( value   ) 
{
    var code  ;
    var quote  = "\"" ;
    var str    = ""  ;
    var ch     = ""  ;
    var pos       = 0   ;
    var len       = value.length ;
    while( pos < len )
    {
        ch  = value.charAt( pos );
        code = value.charCodeAt( pos );
        if( code > 0xFF )
        {
            str += "\\u" + toUnicodeNotation( code );
            pos++;
            continue;
        }
        switch( ch )
        {
            case "\u0008" : // backspace
            {
                str += "\\b" ;
                break;
            }
            case "\u0009" : // horizontal tab
            {
                str += "\\t" ;
                break;
            }
            case "\u000A" : // line feed
            {
                str += "\\n" ;
                break;
            }
            case "\u000B" : // vertical tab /* TODO: check the VT bug */
            {
                str += "\\v" ; //str += "\\u000B" ;
                break;
            }
            case "\u000C" : // form feed
            {
                str += "\\f" ;
                break;
            }
            case "\u000D" : // carriage return
            {
                str += "\\r" ;
                break;
            }
            case "\u0022" : // double quote
            {
                str += "\\\"" ;
                break;
            }
            case "\u0027" : // single quote
            {
                str += "\\\'";
                break;
            }
            case "\u005c" : // backslash
            {
                str += "\\\\";
                break;
            }
            default :
            {
                str += ch;
            }
        }
        pos++;
    }
    return quote + str + quote;
}