"use strict" ;

import '../polyfill.js' ;

import { aop } from './functors/aop.js' ;

/**
 * The VEGAS.js framework - The core.arrays library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.functors
 * @memberof core
 */
export var functors = Object.assign
({
    aop : aop
}) ;