"use strict" ;

import './polyfill.js' ;

import { Enum }      from './system/Enum.js' ;
import { Evaluable } from './system/Evaluable.js' ;

import { isEvaluable } from './system/Evaluable.js' ;

import { data }       from './system/data.js' ;
import { errors }     from './system/errors.js' ;
import { evaluators } from './system/evaluators.js' ;
import { numeric }    from './system/numeric.js' ;
import { process }    from './system/process.js' ;
import { signals }    from './system/signals.js' ;

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var system = Object.assign
({
    // interfaces
    Enum      : Enum ,
    Evaluable : Evaluable ,

    // functions
    isEvaluable : isEvaluable ,

    // packages
    data       : data ,
    errors     : errors ,
    evaluators : evaluators ,
    numeric    : numeric ,
    process    : process ,
    signals    : signals
}) ;