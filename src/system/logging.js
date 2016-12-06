"use strict" ;

import '../polyfill/Object.js' ;

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
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logging
 * @memberof system
 * @example
 * var logger = Log.getLogger('channel') ;
 *
 * var target = new ConsoleTarget
 * ({
 *     includeChannel      : true  ,
 *     includeDate         : false ,
 *     includeLevel        : true  ,
 *     includeLines        : true  ,
 *     includeMilliseconds : true  ,
 *     includeTime         : true
 * }) ;
 *
 * target.filters = ['*'] ;
 * target.level   = LoggerLevel.ALL ;
 *
 * logger.debug( 'hello {0}, love it.' , 'VEGAS' ) ;
 * logger.critical( 'hello {0}, it\'s critical.' , 'VEGAS' ) ;
 * logger.info( 'hello, my name is {0}' , 'VEGAS' ) ;
 * logger.error( 'hello {0}, an error is invoked.' , 'VEGAS' ) ;
 * logger.warning( 'hello {0}, don\'t forget me.' , 'VEGAS' ) ;
 * logger.wtf( 'hello {0} ! WHAT ??' , 'VEGAS' ) ;
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

    /**
     * This package contains all {@link system.logging.LoggerTarget|LoggerTarget}> implementations are used to display, store, or pass log messages to another destination.
     * @summary This package contains all <b>LoggerTarget</b> implementations are used to display, store, or pass log messages to another destination.
     * @namespace system.logging.targets
     * @memberof system.logging
     */
    targets : Object.assign
    ({
        ConsoleTarget,
        LineFormattedTarget,
        TraceTarget
    })
}) ;