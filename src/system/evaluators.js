"use strict" ;

import '../polyfill/Object.js' ;

import { MultiEvaluator    } from './evaluators/MultiEvaluator.js' ;
import { PropertyEvaluator } from './evaluators/PropertyEvaluator.js' ;
import { RomanEvaluator    } from './evaluators/RomanEvaluator.js' ;

/**
 * The {@link system.evaluators} library contains classes to evaluates some objects with a collection of specific strategies.
 * @summary The {@link system.evaluators} library contains classes to evaluates some objects.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
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