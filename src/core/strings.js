"use strict" ;

import '../polyfill.js' ;

import { camelCase }           from './strings/camelCase.js' ;
import { capitalize }          from './strings/capitalize.js' ;
import { center }              from './strings/center.js' ;
import { clean }               from './strings/clean.js' ;
import { endsWith }            from './strings/endsWith.js' ;
import { fastformat }          from './strings/fastformat.js' ;
import { fastformatDate }      from './strings/fastformatDate.js' ;
import { format }              from './strings/format.js' ;
import { hyphenate }           from './strings/hyphenate.js' ;
import { indexOfAny }          from './strings/indexOfAny.js' ;
import { insert }              from './strings/insert.js' ;
import { lastIndexOfAny }      from './strings/lastIndexOfAny.js' ;
import { lineTerminators }     from './strings/lineTerminators.js' ;
import { pad }                 from './strings/pad.js' ;
import { repeat as arepeat }   from './strings/repeat.js' ;
import { startsWith }          from './strings/startsWith.js' ;
import { trim }                from './strings/trim.js' ;
import { trimEnd }             from './strings/trimEnd.js' ;
import { trimStart }           from './strings/trimStart.js' ;
import { ucFirst }             from './strings/ucFirst.js' ;
import { ucWords }             from './strings/ucWords.js' ;
import { validateUUID }        from './strings/validateUUID.js' ;
import { versionUUID }         from './strings/versionUUID.js' ;
import { whiteSpaces }         from './strings/whiteSpaces.js' ;

/**
 * The {@link core.strings} that provides extra String methods to transform and validate it.
 * @namespace core.strings
 * @memberof core
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var strings = Object.assign
({
    camelCase : camelCase ,
    capitalize : capitalize ,
    center : center ,
    clean : clean ,
    endsWith : endsWith ,
    fastformat : fastformat ,
    fastformatDate : fastformatDate ,
    format : format ,
    hyphenate : hyphenate ,
    indexOfAny : indexOfAny ,
    insert : insert ,
    lastIndexOfAny : lastIndexOfAny ,
    lineTerminators : lineTerminators ,
    pad : pad ,
    repeat : arepeat ,
    startsWith : startsWith ,
    trim : trim ,
    trimEnd : trimEnd ,
    trimStart : trimStart ,
    ucFirst : ucFirst ,
    ucWords : ucWords ,
    validateUUID : validateUUID ,
    versionUUID : versionUUID ,
    whiteSpaces : whiteSpaces
}) ;