"use strict" ;

import '../polyfill.js' ;

import { toUnicodeNotation } from './numbers/toUnicodeNotation.js' ;

/**
 * The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @summary The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
export var numbers = Object.assign
({
    toUnicodeNotation : toUnicodeNotation
}) ;