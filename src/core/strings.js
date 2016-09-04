"use strict" ;

import '../polyfill.js' ;

import { camelCase }           from './strings/camelCase.js' ;
import { capitalize }          from './strings/capitalize.js' ;
import { caseValue }           from './strings/caseValue.js' ;
import { center }              from './strings/center.js' ;
import { clean }               from './strings/clean.js' ;
import { endsWith }            from './strings/endsWith.js' ;
import { fastformat }          from './strings/fastformat.js' ;
import { format }              from './strings/format.js' ;
import { hyphenate }           from './strings/hyphenate.js' ;
import { indexOfAny }          from './strings/indexOfAny.js' ;
import { insert }              from './strings/insert.js' ;
import { lastIndexOfAny }      from './strings/lastIndexOfAny.js' ;
import { lineTerminatorChars } from './strings/lineTerminatorChars.js' ;
import { pad }                 from './strings/pad.js' ;
import { repeat as arepeat }   from './strings/repeat.js' ;
import { startsWith }          from './strings/startsWith.js' ;
import { trim }                from './strings/trim.js' ;
import { trimEnd }             from './strings/trimEnd.js' ;
import { trimStart }           from './strings/trimStart.js' ;
import { ucFirst }             from './strings/ucFirst.js' ;
import { ucWords }             from './strings/ucWords.js' ;
import { whiteSpaceChars }     from './strings/whiteSpaceChars.js' ;

/**
 * The VEGAS.js framework - The core.strings library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var strings = Object.assign
({
    camelCase : camelCase ,
    capitalize : capitalize ,
    caseValue : caseValue ,
    center : center ,
    clean : clean ,
    endsWith : endsWith ,
    fastformat : fastformat ,
    format : format ,
    hyphenate : hyphenate ,
    indexOfAny : indexOfAny ,
    insert : insert ,
    lastIndexOfAny : lastIndexOfAny ,
    lineTerminatorChars : lineTerminatorChars ,
    pad : pad ,
    repeat : arepeat ,
    startsWith : startsWith ,
    trim : trim ,
    trimEnd : trimEnd ,
    trimStart : trimStart ,
    ucFirst : ucFirst ,
    ucWords : ucWords ,
    whiteSpaceChars : whiteSpaceChars
}) ;