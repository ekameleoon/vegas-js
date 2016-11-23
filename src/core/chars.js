"use strict" ;

import '../polyfill.js' ;

import { compare }           from './chars/compare.js' ;
import { isAlpha }           from './chars/isAlpha.js' ;
import { isAlphaOrDigit }    from './chars/isAlphaOrDigit.js' ;
import { isASCII }           from './chars/isASCII.js' ;
import { isContained }       from './chars/isContained.js' ;
import { isDigit }           from './chars/isDigit.js' ;
import { isHexDigit }        from './chars/isHexDigit.js' ;
import { isIdentifierStart } from './chars/isIdentifierStart.js' ;
import { isLineTerminator }  from './chars/isLineTerminator.js' ;
import { isLower }           from './chars/isLower.js' ;
import { isOctalDigit }      from './chars/isOctalDigit.js' ;
import { isOperator }        from './chars/isOperator.js' ;
import { isSymbol }          from './chars/isSymbol.js' ;
import { isUnicode }         from './chars/isUnicode.js' ;
import { isUpper }           from './chars/isUpper.js' ;
import { isWhiteSpace }      from './chars/isWhiteSpace.js' ;
import { lineTerminators }   from './chars/lineTerminators.js' ;
import { operators }         from './chars/operators.js' ;
import { symbols }           from './chars/symbols.js' ;
import { whiteSpaces }       from './chars/whiteSpaces.js' ;

/**
 * The VEGAS.js framework - The core.chars library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.chars
 * @memberof core
 */
export var chars = Object.assign
({
    compare           : compare ,
    isAlpha           : isAlpha ,
    isAlphaOrDigit    : isAlphaOrDigit ,
    isASCII           : isASCII ,
    isContained       : isContained ,
    isDigit           : isDigit ,
    isHexDigit        : isHexDigit ,
    isIdentifierStart : isIdentifierStart ,
    isLineTerminator  : isLineTerminator ,
    isLower           : isLower ,
    isOctalDigit      : isOctalDigit ,
    isOperator        : isOperator ,
    isSymbol          : isSymbol ,
    isUnicode         : isUnicode ,
    isUpper           : isUpper ,
    isWhiteSpace      : isWhiteSpace ,
    lineTerminators   : lineTerminators ,
    operators         : operators ,
    symbols           : symbols ,
    whiteSpaces       : whiteSpaces
}) ;