"use strict" ;

import '../polyfill.js' ;

import { Log }           from './logging/LoggerFactory.js' ;
import { Loggable }      from './logging/Loggable.js' ;
import { Logger }        from './logging/Logger.js' ;
import { LoggerEntry }   from './logging/LoggerEntry.js' ;
import { LoggerFactory } from './logging/LoggerFactory.js' ;
import { LoggerLevel }   from './logging/LoggerLevel.js' ;
import { LoggerTarget }  from './logging/LoggerTarget.js' ;

import { ConsoleTarget }       from './logging/targets/ConsoleTarget.js' ;
import { LineFormattedTarget } from './logging/targets/LineFormattedTarget.js' ;
import { TraceTarget }         from './logging/targets/TraceTarget.js' ;

/**
 * The VEGAS.js framework - The system.logging library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var logging = Object.assign
({
    Log           : Log ,
    Loggable      : Loggable ,
    Logger        : Logger ,
    LoggerEntry   : LoggerEntry ,
    LoggerFactory : LoggerFactory ,
    LoggerLevel   : LoggerLevel ,
    LoggerTarget  : LoggerTarget,

    targets : Object.assign
    ({
        ConsoleTarget,
        LineFormattedTarget,
        TraceTarget
    })
}) ;