"use strict" ;

import '../polyfill.js' ;

import { Log }          from './logging/LoggerFactory.js' ;
import { Loggable }     from './logging/Loggable.js' ;
import { Logger }       from './logging/Logger.js' ;
import { LoggerEntry }  from './logging/LoggerEntry.js' ;
import { LoggerLevel }  from './logging/LoggerLevel.js' ;
import { LoggerTarget } from './logging/LoggerTarget.js' ;

/**
 * The VEGAS.js framework - The system.logging library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var logging = Object.assign
({
    Log          : Log ,
    Loggable     : Loggable ,
    Logger       : Logger ,
    LoggerEntry  : LoggerEntry ,
    LoggerLevel  : LoggerLevel ,
    LoggerTarget : LoggerTarget
}) ;