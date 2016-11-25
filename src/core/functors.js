"use strict" ;

import '../polyfill.js' ;

import { aop } from './functors/aop.js' ;

/**
 * The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @summary The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.functors
 * @memberof core
 */
export var functors = Object.assign
({
    aop : aop
}) ;