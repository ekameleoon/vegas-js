"use strict" ;

import { LoggerLevel }  from '../LoggerLevel.js' ;
import { LoggerTarget } from '../LoggerTarget.js' ;

/**
 * All logger target implementations that have a formatted line style output should extend this class.
 * It provides default behavior for including date, time, channel, and level within the output.
 */
export function LineFormattedTarget()
{
    LoggerTarget.call(this) ;

    Object.defineProperties( this ,
    {
        _lineNumber : { value : 1 , writable : true } ,
    }) ;

    /**
     * Indicates if the channel for this target should added to the trace.
     */
    this.includeChannel /*Boolean*/ = false ;

    /**
     * Indicates if the date should be added to the trace.
     */
    this.includeDate /*Boolean*/ = false ;

    /**
     * Indicates if the level for the event should added to the trace.
     */
    this.includeLevel /*Boolean*/ = false ;

    /**
     * Indicates if the line for the event should added to the trace.
     */
    this.includeLines /*Boolean*/ = false ;

    /**
     * Indicates if the milliseconds should be added to the trace. Only relevant when includeTime is <code class="prettyprint">true</code>.
     */
    this.includeMilliseconds /*Boolean*/ = false ;

    /**
     * Indicates if the time should be added to the trace.
     */
    this.includeTime /*Boolean*/ = false ;

    /**
     * The separator string.
     */
    this.separator /*String*/ = " " ;
}

/**
 * @extends Object
 */
LineFormattedTarget.prototype = Object.create( LoggerTarget.prototype ,
{
    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param message String containing preprocessed log message which may include time, date, channel, etc.
     * based on property settings, such as <code class="prettyprint">includeDate</code>, <code class="prettyprint">includeChannel</code>, etc.
     */
    internalLog :
    {
        value : function( message , level /*LoggerLevel*/ ) //jshint ignore:line
        {
            // override this method
        }
    },

    constructor : { value : LineFormattedTarget } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
     toString : { value : function() { return '[LineFormattedTarget]' ; } ,

    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    logEntry :
    {
        value : function( entry /*LoggerEntry*/ ) /*void*/
        {
            var message = this.formatMessage
            (
                entry.message,
                LoggerLevel.getLevelString( entry.level ),
                entry.logger.channel ,
                new Date()
            ) ;
            this.internalLog( message , entry.level ) ;
        }
    },

    /**
     * Resets the internal line number value (set to 1).
     */
    resetLineNumber :
    {
        value : function() /*void*/
        {
            this._lineNumber = 1 ;
        }
    },

    /////////

    /**
     * This method format the passed Date in arguments.
     */
    formatDate :
    {
        value : function( d /*Date*/ ) /*String*/
        {
            var date /*String*/ = "" ;
            date += this.getDigit( d.getDate() ) ;
            date += "/" + this.getDigit( d.getMonth() + 1 ) ;
            date += "/" + d.getFullYear() ;
            return date ;
        }
    },

    /**
     * This method format the passed level in arguments.
     */
    formatLevel :
    {
        value : function( level /*String*/ ) /*String*/
        {
            return '[' + level + ']' ;
        }
    },

    /**
     * This method format the current line value.
     */
    formatLines :
    {
        value : function() /*String*/
        {
            return "[" + this._lineNumber++ + "]" ;
        }
    },

    /**
     * This method format the log message.
     */
    formatMessage :
    {
        value : function( message , level /*String*/ , channel /*String*/ , date /*Date*/ ) /*String*/
        {
            var msg /*String*/ = "" ;
            var d /*Date*/ = date || new Date() ;
            if (this.includeLines)
            {
                msg += this.formatLines() + this.separator ;
            }
            if (this.includeDate)
            {
                msg += this.formatDate(d) + this.separator ;
            }
            if (this.includeTime)
            {
                msg += this.formatTime(d) + this.separator ;
            }
            if (this.includeLevel)
            {
                msg += this.formatLevel(level || "" ) + this.separator ;
            }
            if ( this.includeChannel )
            {
                msg += ( channel || "" ) + this.separator ;
            }
            msg += message.toString() ;
            return msg ;
        }
    },

    /**
     * This method format the current Date passed in argument.
     */
    formatTime :
    {
        value : function( d /*Date*/ ) /*String*/
        {
            var time /*String*/ = "" ;
            time += this.getDigit(d.getHours()) ;
            time += ":" + this.getDigit(d.getMinutes()) ;
            time += ":" + this.getDigit(d.getSeconds()) ;
            if( this.includeMilliseconds )
            {
                time += ":" + this.getDigit( d.getMilliseconds() ) ;
            }
            return time ;
        }
    },

    /**
     * Returns the string representation of a number and use digit conversion.
     * @return the string representation of a number and use digit conversion.
     */
    getDigit :
    {
        value : function( n/*Number*/ ) /*String*/
        {
            if ( isNaN(n) )
            {
                return "00" ;
            }
            return ((n < 10) ? "0" : "") + n ;
        }
    }
});