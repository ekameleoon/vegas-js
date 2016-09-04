"use strict" ;

import '../polyfill.js' ;

import { compare }      from './chars/compare.js' ;
import { isAlpha }      from './chars/isAlpha.js' ;
import { isASCII }      from './chars/isASCII.js' ;
import { isDigit }      from './chars/isDigit.js' ;
import { isHexDigit }   from './chars/isHexDigit.js' ;
import { isLower }      from './chars/isLower.js' ;
import { isOctalDigit } from './chars/isOctalDigit.js' ;
import { isOperator }   from './chars/isOperator.js' ;
import { isUnicode }    from './chars/isUnicode.js' ;
import { isUpper }      from './chars/isUpper.js' ;

/**
 * The VEGAS.js framework - The core.chars library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var chars = Object.assign
({
    compare : compare ,
    isAlpha : isAlpha ,
    isASCII : isASCII ,
    isDigit : isDigit ,
    isHexDigit : isHexDigit ,
    isLower : isLower ,
    isOctalDigit : isOctalDigit ,
    isOperator : isOperator ,
    isUnicode : isUnicode ,
    isUpper : isUpper
}) ;