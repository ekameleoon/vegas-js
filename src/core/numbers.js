"use strict" ;

import '../polyfill.js' ;

import { toUnicodeNotation } from './numbers/toUnicodeNotation.js' ;

/**
 * The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @summary The {@link core.numbers} package is a modular <b>JavaScript</b> library that provides extra <code>Number</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.numbers
 * @memberof core
 */
export var numbers = Object.assign
({
    toUnicodeNotation : toUnicodeNotation
}) ;