"use strict" ;

import '../polyfill.js' ;

import { MultiEvaluator    } from './evaluators/MultiEvaluator.js' ;
import { PropertyEvaluator } from './evaluators/PropertyEvaluator.js' ;
import { RomanEvaluator    } from './evaluators/RomanEvaluator.js' ;

/**
 * The {@link system.evaluators} library contains classes to evaluates some objects with a collection of specific strategies.
 * @summary The {@link system.evaluators} library contains classes to evaluates some objects.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.evaluators
 * @memberof system
 */
export var evaluators = Object.assign
({
    MultiEvaluator    : MultiEvaluator,
    PropertyEvaluator : PropertyEvaluator,
    RomanEvaluator    : RomanEvaluator
}) ;