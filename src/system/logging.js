"use strict" ;

import '../polyfill.js' ;

import { Logger }      from './logging/Logger.js' ;
import { LoggerEntry } from './logging/LoggerEntry.js' ;
import { LoggerLevel } from './logging/LoggerLevel.js' ;

/**
 * The VEGAS.js framework - The system.logging library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var logging = Object.assign
({
    Logger      : Logger ,
    LoggerEntry : LoggerEntry ,
    LoggerLevel : LoggerLevel
}) ;