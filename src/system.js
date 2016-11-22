"use strict" ;

import './polyfill.js' ;

import { Enum }        from './system/Enum.js' ;
import { Equatable }   from './system/Equatable.js' ;
import { Evaluable }   from './system/Evaluable.js' ;
import { Formattable } from './system/Formattable.js' ;

import { isEvaluable   } from './system/Evaluable.js' ;
import { isFormattable } from './system/Formattable.js' ;

import { data }        from './system/data.js' ;
import { errors }      from './system/errors.js' ;
import { evaluators }  from './system/evaluators.js' ;
import { formatters }  from './system/formatters.js' ;
import { ioc }         from './system/ioc.js' ;
import { logging }     from './system/logging.js' ;
import { logics }      from './system/logics.js' ;
import { models }      from './system/models.js' ;
import { numeric }     from './system/numeric.js' ;
import { process }     from './system/process.js' ;
import { rules }       from './system/rules.js' ;
import { signals }     from './system/signals.js' ;
import { transitions } from './system/transitions.js' ;

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace
 */
export var system = Object.assign
({
    // interfaces

    Enum        : Enum ,
    Equatable   : Equatable ,
    Evaluable   : Evaluable ,
    Formattable : Formattable ,

    // functions

    isEvaluable   : isEvaluable ,
    isFormattable : isFormattable ,

    // packages

    data        : data ,
    errors      : errors ,
    evaluators  : evaluators ,
    formatters  : formatters ,
    ioc         : ioc ,
    logging     : logging ,
    logics      : logics ,
    models      : models ,
    numeric     : numeric ,
    process     : process ,
    rules       : rules ,
    signals     : signals,
    transitions : transitions
}) ;