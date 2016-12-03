"use strict" ;

import '../polyfill.js' ;

import { between }           from './strings/between.js' ;
import { camelCase }         from './strings/camelCase.js' ;
import { capitalize }        from './strings/capitalize.js' ;
import { center }            from './strings/center.js' ;
import { clean }             from './strings/clean.js' ;
import { compare }           from './strings/compare.js' ;
import { endsWith }          from './strings/endsWith.js' ;
import { fastformat }        from './strings/fastformat.js' ;
import { fastformatDate }    from './strings/fastformatDate.js' ;
import { format }            from './strings/format.js' ;
import { hyphenate }         from './strings/hyphenate.js' ;
import { indexOfAny }        from './strings/indexOfAny.js' ;
import { insert }            from './strings/insert.js' ;
import { lastIndexOfAny }    from './strings/lastIndexOfAny.js' ;
import { pad }               from './strings/pad.js' ;
import { repeat as arepeat } from './strings/repeat.js' ;
import { startsWith }        from './strings/startsWith.js' ;
import { trim }              from './strings/trim.js' ;
import { trimEnd }           from './strings/trimEnd.js' ;
import { trimStart }         from './strings/trimStart.js' ;
import { truncate }          from './strings/truncate.js' ;
import { ucFirst }           from './strings/ucFirst.js' ;
import { ucWords }           from './strings/ucWords.js' ;
import { validateUUID }      from './strings/validateUUID.js' ;
import { versionUUID }       from './strings/versionUUID.js' ;

// import { latinize }          from './strings/latinize.js' ;

/**
 * The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @summary The {@link core.strings} package is a modular <b>JavaScript</b> library that provides extra <code>String</code> methods.
 * @namespace core.strings
 * @memberof core
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var strings = Object.assign
({
    between : between ,
    camelCase : camelCase ,
    capitalize : capitalize ,
    center : center ,
    clean : clean ,
    compare : compare ,
    endsWith : endsWith ,
    fastformat : fastformat ,
    fastformatDate : fastformatDate ,
    format : format ,
    hyphenate : hyphenate ,
    indexOfAny : indexOfAny ,
    insert : insert ,
    lastIndexOfAny : lastIndexOfAny ,
    //latinize : latinize ,
    pad : pad ,
    repeat : arepeat ,
    startsWith : startsWith ,
    trim : trim ,
    trimEnd : trimEnd ,
    trimStart : trimStart ,
    truncate : truncate ,
    ucFirst : ucFirst ,
    ucWords : ucWords ,
    validateUUID : validateUUID ,
    versionUUID : versionUUID
}) ;