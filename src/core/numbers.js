"use strict" ;

import '../polyfill.js' ;

import { toUnicodeNotation } from './numbers/toUnicodeNotation.js' ;

/**
 * The VEGAS.js framework - The core.numbers library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
export var numbers = Object.assign
({
    toUnicodeNotation : toUnicodeNotation
}) ;