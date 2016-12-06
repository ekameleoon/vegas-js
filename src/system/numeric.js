"use strict" ;

import '../polyfill/Object.js' ;

import { PRNG  } from './numeric/PRNG.js' ;
import { Range } from './numeric/Range.js' ;
import { RomanNumber } from './numeric/RomanNumber.js' ;

/**
 * The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @summary The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.numeric
 * @memberof system
 */
export var numeric = Object.assign
({
    PRNG  : PRNG ,
    Range : Range ,
    RomanNumber : RomanNumber
}) ;