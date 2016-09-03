"use strict" ;

import { LoggerLevel } from './LoggerLevel.js' ;

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param logger The Logger reference of this entry.
 */
export function LoggerEntry( logger /*Logger*/ , message , level /*LoggerLevel*/ )
{
    this.logger  = logger ;
    this.message = message ;
    this.level   = level instanceof LoggerLevel ? level : LoggerLevel.ALL ;
}

///////////////////

/**
 * @extends Object
 */
LoggerEntry.prototype = Object.create( Object.prototype );
LoggerEntry.prototype.constructor = LoggerEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
LoggerEntry.prototype.toString = function() /*String*/
{
    return '[LoggerEntry]' ;
}