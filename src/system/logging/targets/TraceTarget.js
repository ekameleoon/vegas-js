"use strict" ;

import { trace } from '../../../core/trace.js' ;
import { LineFormattedTarget } from './LineFormattedTarget.js' ;

/**
 * Provides a logger target that uses the global trace() method to output log messages.
 * @name TraceTarget
 * @memberof system.logging.targets
 * @class
 * @extends system.logging.targets.LineFormattedTarget
 * @param {Object} init - A generic object containing properties with which to populate the newly instance. If this argument is <code>null</code>, it is ignored.
 * @example
 * var Log         = system.logging.Log ;
 * var LoggerLevel = system.logging.LoggerLevel ;
 * var TraceTarget = system.logging.targets.TraceTarget ;
 *
 * var target = new TraceTarget
 * ({
 *     includeChannel      : true  ,
 *     includeDate         : false  ,
 *     includeLevel        : true  ,
 *     includeLines        : true  ,
 *     includeMilliseconds : true  ,
 *     includeTime         : true
 * }) ;
 *
 * target.filters = ["*"] ;
 * target.level   = LoggerLevel.ALL ;
 *
 * var logger = Log.getLogger('test') ;
 *
 * logger.log( "Here is some myDebug info : {0} and {1}", 2.25 , true ) ;
 * logger.debug( "Here is some debug message." ) ;
 * logger.info( "Here is some info message." ) ;
 * logger.warning( "Here is some warn message." ) ;
 * logger.error( "Here is some error message." ) ;
 * logger.critical( "Here is some critical error..." ) ;
 *
 * target.includeDate    = false ;
 * target.includeTime    = false ;
 * target.includeChannel = false ;
 *
 * logger.info( "test : [{0}, {1}, {2}]", 2, 4, 6 ) ;
 */
export function TraceTarget( init = null )
{
    LineFormattedTarget.call( this , init ) ;
}

TraceTarget.prototype = Object.create( LineFormattedTarget.prototype ,
{
    constructor : { value : TraceTarget } ,

    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param {string} message - String containing preprocessed log message which may include time, date, channel, etc.
     * based on property settings, such as <code>includeDate</code>, <code>includeChannel</code>, etc.
     * @param {system.logging.LoggerLevel} level - The level of the log message.
     * @name internalLog
     * @memberof system.logging.targets.TraceTarget
     * @function
     * @instance
     */
    internalLog : { value : function( message , level ) //jshint ignore:line
    {
        trace( message ) ;
    }}
});
