"use strict" ;

import '../polyfill.js' ;

import { PropertyEvaluator  } from './evaluators/PropertyEvaluator.js' ;

/**
 * The VEGAS.js framework - The system.evaluators library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var evaluators = Object.assign
({
    PropertyEvaluator : PropertyEvaluator
}) ;