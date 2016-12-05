"use strict" ;

import '../polyfill/Object.js' ;

import { generateUUID } from './random/generateUUID.js' ;

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.random
 * @memberof core
 */
export var random = Object.assign
({
    generateUUID : generateUUID
}) ;