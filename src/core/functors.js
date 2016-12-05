"use strict" ;

import '../polyfill/Object.js' ;

import { aop } from './functors/aop.js' ;

/**
 * The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @summary The {@link core.functors} package is a modular <b>JavaScript</b> library that provides extra <code>Function</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.functors
 * @memberof core
 */
export var functors = Object.assign
({
    aop : aop
}) ;