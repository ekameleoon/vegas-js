"use strict" ;

import '../polyfill.js' ;

import { isLoggable } from './logging/Loggable.js' ;

import { Log }           from './logging/Log.js' ;
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
 * The {@link system.logging} library defines functions and classes which implement a flexible event logging system for applications and libraries.
 * @summary The {@link system.logging} library defines functions and classes which implement a flexible event logging system for applications and libraries.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logging
 * @memberof system
 */
export var logging = Object.assign
({
    isLoggable : isLoggable ,

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