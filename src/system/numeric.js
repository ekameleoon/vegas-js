"use strict" ;

import '../polyfill.js' ;

import { PRNG  } from './numeric/PRNG.js' ;
import { Range } from './numeric/Range.js' ;
import { RomanNumber } from './numeric/RomanNumber.js' ;

/**
 * The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @summary The {@link system.numeric} library contains classes and tools that provides extra <code>numeric</code> methods and implementations.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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