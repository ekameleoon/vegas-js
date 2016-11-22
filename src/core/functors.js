"use strict" ;

import '../polyfill.js' ;

import { aop } from './functors/aop.js' ;

/**
 * The VEGAS.js framework - The core.arrays library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace
 */
export var functors = Object.assign
({
    aop : aop
}) ;