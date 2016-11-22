"use strict" ;

import '../polyfill.js' ;

import { generateUUID } from './random/generateUUID.js' ;

/**
 * The VEGAS.js framework - The core.random library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.random
 * @memberof core
 */
export var random = Object.assign
({
    generateUUID : generateUUID
}) ;