"use strict" ;

import './polyfill.js' ;

import { Enum }        from './system/Enum.js' ;
import { Evaluable }   from './system/Evaluable.js' ;
import { Formattable } from './system/Formattable.js' ;

import { isEvaluable   } from './system/Evaluable.js' ;
import { isFormattable } from './system/Formattable.js' ;

import { data }       from './system/data.js' ;
import { errors }     from './system/errors.js' ;
import { evaluators } from './system/evaluators.js' ;
import { formatters } from './system/formatters.js' ;
import { logging }    from './system/logging.js' ;
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
    Enum        : Enum ,
    Evaluable   : Evaluable ,
    Formattable : Formattable ,

    // functions
    isEvaluable   : isEvaluable ,
    isFormattable : isFormattable ,

    // packages
    data       : data ,
    errors     : errors ,
    evaluators : evaluators ,
    formatters : formatters ,
    logging    : logging ,
    numeric    : numeric ,
    process    : process ,
    signals    : signals
}) ;