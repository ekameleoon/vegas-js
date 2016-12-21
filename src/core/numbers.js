"use strict" ;

import '../polyfill/Object.js' ;

import { toInt } from './numbers/toInt.js' ;
import { toUint } from './numbers/toUint.js' ;
import { toUnicodeNotation } from './numbers/toUnicodeNotation.js' ;

/**
 * The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @summary The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
export var numbers = Object.assign
({
    toInt : toInt ,
    toUint : toUint ,
    toUnicodeNotation : toUnicodeNotation
}) ;