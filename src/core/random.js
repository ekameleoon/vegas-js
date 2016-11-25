"use strict" ;

import '../polyfill.js' ;

import { generateUUID } from './random/generateUUID.js' ;

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra methods to generates a random number.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.random
 * @memberof core
 */
export var random = Object.assign
({
    generateUUID : generateUUID
}) ;