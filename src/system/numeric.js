"use strict" ;

import '../polyfill.js' ;

import { PRNG  } from './numeric/PRNG.js' ;
import { Range } from './numeric/Range.js' ;
import { RomanNumber } from './numeric/RomanNumber.js' ;

/**
 * The VEGAS.js framework - The system.numeric library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var numeric = Object.assign
({
    PRNG  : PRNG ,
    Range : Range ,
    RomanNumber : RomanNumber
}) ;