"use strict" ;

import { LoggerLevel }  from '../LoggerLevel.js' ;
import { LoggerTarget } from '../LoggerTarget.js' ;

/**
 * All logger target implementations that have a formatted line style output should extend this class. It provides default behavior for including date, time, channel, and level within the output.
 * @name LineFormattedTarget
 * @memberof system.logging.targets
 * @class
 * @extends system.logging.LoggerTarget
 * @param {Object} init - A generic object containing properties with which to populate the newly instance. If this argument is <code>null</code>, it is ignored.
 */
export function LineFormattedTarget( init = null )
{
    LoggerTarget.call( this ) ;

    Object.defineProperties( this ,
    {
        _lineNumber : { value : 1 , writable : true }
    }) ;

    /**
     * Indicates if the channel for this target should added to the trace.
     * @name includeChannel
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeChannel = false ;

    /**
     * Indicates if the date should be added to the trace.
     * @name includeDate
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeDate = false ;

    /**
     * Indicates if the level for the event should added to the trace.
     * @name includeLevel
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeLevel = false ;

    /**
     * Indicates if the line for the event should added to the trace.
     * @name includeLines
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeLines = false ;

    /**
     * Indicates if the milliseconds should be added to the trace. Only relevant when includeTime is <code>true</code>.
     * @name includeMilliseconds
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeMilliseconds = false ;

    /**
     * Indicates if the time should be added to the trace.
     * @name includeTime
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type boolean
     * @default false
     */
    this.includeTime = false ;

    /**
     * The separator string.
     * @name separator
     * @memberof system.logging.targets.LineFormattedTarget
     * @instance
     * @type string
     * @default
     */
    this.separator = " " ;

    if( init )
    {
        for( var prop in init )
        {
            if ( this.hasOwnProperty(prop) )
            {
                this[prop] = init[prop] ;
            }
        }
    }
}

LineFormattedTarget.prototype = Object.create( LoggerTarget.prototype ,
{
    constructor : { value : LineFormattedTarget , writable : true } ,

    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param {string} message - String containing preprocessed log message which may include time, date, channel, etc.
     * based on property settings, such as <code>includeDate</code>, <code>includeChannel</code>, etc.
     * @param {system.logging.LoggerLevel} level - The level of the log message.
     * @name internalLog
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     */
    internalLog : { value : function( message , level ) //jshint ignore:line
    {
        // override this method
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     */
    toString : { writable : true , value : function() { return '[' + this.constructor.name + ']' ; } } ,

    /**
     *  This method receive a <code>LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     * @name logEntry
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     */
    logEntry : { value : function( entry )
    {
        var message = this.formatMessage
        (
            entry.message,
            LoggerLevel.getLevelString( entry.level ),
            entry.channel ,
            new Date()
        ) ;
        this.internalLog( message , entry.level ) ;
    }},

    /**
     * Resets the internal line number value (set to <code>1</code>).
     * @name resetLineNumber
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     */
    resetLineNumber : { value : function()
    {
        this._lineNumber = 1 ;
    }},

    /////////

    /**
     * This method format the passed Date in arguments.
     * @name formatDate
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    formatDate : { value : function( d )
    {
        var date  = "" ;
        date += this.getDigit( d.getDate() ) ;
        date += "/" + this.getDigit( d.getMonth() + 1 ) ;
        date += "/" + d.getFullYear() ;
        return date ;
    }},

    /**
     * This method format the passed level in arguments.
     * @name formatLevel
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    formatLevel : { value : function( level  )
    {
        return '[' + level + ']' ;
    }},

    /**
     * This method format the current line value.
     * @name formatLines
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    formatLines : { value : function()
    {
        return "[" + this._lineNumber++ + "]" ;
    }},

    /**
     * This method format the log message.
     * @name formatMessage
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    formatMessage : { value : function( message , level  , channel  , date /*Date*/ )
    {
        var msg = "" ;
        if (this.includeLines)
        {
            msg += this.formatLines() + this.separator ;
        }
        if( this.includeDate || this.includeTime )
        {
            date = date || new Date() ;
            if (this.includeDate)
            {
                msg += this.formatDate(date) + this.separator ;
            }
            if (this.includeTime)
            {
                msg += this.formatTime(date) + this.separator ;
            }
        }
        if (this.includeLevel)
        {
            msg += this.formatLevel(level || "" ) + this.separator ;
        }
        if ( this.includeChannel )
        {
            msg += ( channel || "" ) + this.separator ;
        }
        msg += message ;
        return msg ;
    }},

    /**
     * This method format the current Date passed in argument.
     * @name formatTime
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    formatTime : { value : function( d )
    {
        var time  = "" ;
        time += this.getDigit(d.getHours()) ;
        time += ":" + this.getDigit(d.getMinutes()) ;
        time += ":" + this.getDigit(d.getSeconds()) ;
        if( this.includeMilliseconds )
        {
            time += ":" + this.getDigit( d.getMilliseconds() ) ;
        }
        return time ;
    }},

    /**
     * Returns the string representation of a number and use digit conversion.
     * @return the string representation of a number and use digit conversion.
     * @name getDigit
     * @memberof system.logging.targets.LineFormattedTarget
     * @function
     * @instance
     * @protected
     */
    getDigit : { value : function( n )
    {
        if ( isNaN(n) )
        {
            return "00" ;
        }
        return ((n < 10) ? "0" : "") + n ;
    }}
});