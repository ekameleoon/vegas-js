"use strict" ;

import { LoggerLevel } from './LoggerLevel.js' ;

/**
 * Represents the log information for a single logging notification.
 * <p>The loging system dispatches a single message each time a process requests information be logged.</p>
 * <p>This entry can be captured by any object for storage or formatting.</p>
 * @name LoggerEntry
 * @memberof system.logging
 * @class
 * @param {string} message - The context or message of the log.
 * @param {system.logging.LoggerLevel} level - The level of the log.
 * @param {string} channel - The channel of the log.
 */
export function LoggerEntry( message , level , channel )
{
    /**
     * The channel of the log.
     * @memberof system.logging.LoggerEntry
     * @instance
     * @type string
     */
    this.channel = channel ;

    /**
     * The level of the log.
     * @memberof system.logging.LoggerEntry
     * @instance
     * @type system.logging.LoggerLevel
     */
    this.level   = level instanceof LoggerLevel ? level : LoggerLevel.ALL ;

    /**
     * The message of the log.
     * @memberof system.logging.LoggerEntry
     * @instance
     * @type string
     */
    this.message = message ;
}

LoggerEntry.prototype = Object.create( Object.prototype );
LoggerEntry.prototype.constructor = LoggerEntry;