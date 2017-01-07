"use strict" ;

import { Enum } from '../Enum.js' ;

/**
 * The logger levels that is used within the logging framework.
 * @summary The logger levels that is used within the logging framework.
 * @name LoggerLevel
 * @class
 * @memberof system.logging
 * @extends system.Enum
 * @param {number} value - The value of the enumeration.
 * @param {string} name - The name key of the enumeration.
 * @example
 * var LoggerLevel = system.logging.LoggerLevel ;
 *
 * for( var level in LoggerLevel )
 * {
 *     if( LoggerLevel.hasOwnProperty(level) )
 *     {
 *        trace( level + ' ' + LoggerLevel.getLevelString(LoggerLevel[level]) ) ;
 *     }
 * }
 */
export function LoggerLevel( value , name )
{
    Enum.call( this , value , name ) ;
}

LoggerLevel.prototype = Object.create( Enum.prototype );
LoggerLevel.prototype.constructor = LoggerLevel;

Object.defineProperties( LoggerLevel ,
{
    /**
     * Intended to force a target to process all messages (1).
     * @name ALL
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    ALL : { value : new LoggerLevel( 1 , 'ALL' ) , enumerable : true } ,

    /**
     * Designates events that are very harmful and will eventually lead to application failure (16).
     * @name CRITICAL
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    CRITICAL : { value : new LoggerLevel( 16 , 'CRITICAL' ) , enumerable : true } ,

    /**
     * Designates informational level messages that are fine grained and most helpful when debugging an application (2).
     * @name DEBUG
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    DEBUG : { value : new LoggerLevel( 2 , 'DEBUG' ) , enumerable : true } ,

    /**
     * The default string level value in the <code>getLevelString()</code> method ('UNKNOW').
     * @name DEFAULT_LEVEL_STRING
     * @memberof system.logging.LoggerLevel
     * @type string
     */
    DEFAULT_LEVEL_STRING : { value : 'UNKNOWN' , enumerable : true } ,

    /**
     * Designates error events that might still allow the application to continue running (8).
     * @name ERROR
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    ERROR : { value : new LoggerLevel( 8 , 'ERROR' ) , enumerable : true } ,

    /**
     * Designates informational messages that highlight the progress of the application at coarse-grained level (4).
     * @name INFO
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    INFO : { value : new LoggerLevel( 4 , 'INFO' ) , enumerable : true } ,

    /**
     * A special level that can be used to turn off logging (0).
     * @name NONE
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    NONE : { value : new LoggerLevel( 0 , 'NONE' ) , enumerable : true } ,

    /**
     * Designates events that could be harmful to the application operation (6).
     * @name WARNING
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    WARNING : { value : new LoggerLevel( 6 , 'WARNING' ) , enumerable : true } ,

    /**
     * What a Terrible Failure: designates an exception that should never happen. (32).
     * @name WTF
     * @memberof system.logging.LoggerLevel
     * @type system.logging.LoggerLevel
     */
    WTF : { value : new LoggerLevel( 32 , 'WTF' ) , enumerable : true } ,

    /**
     * Search a <code>LoggerLevel</code> reference if the number level passed in argument is valid.
     * @name get
     * @memberof system.logging.LoggerLevel
     * @function
     * @param {number} value - The numeric value corresponding to a valid LoggerLevel object.
     * @return {system.logging.LoggerLevel} The LoggerLevel reference.
     */
    get : { value : function( value )
    {
        let levels =
        [
            LoggerLevel.ALL,
            LoggerLevel.CRITICAL,
            LoggerLevel.DEBUG,
            LoggerLevel.ERROR,
            LoggerLevel.INFO,
            LoggerLevel.NONE,
            LoggerLevel.WARNING,
            LoggerLevel.WTF
        ] ;
        let l = levels.length ;
        while( --l > -1 )
        {
            if ( levels[l]._value === value )
            {
                return levels[l] ;
            }
        }
        return null ;
    }},

    /**
     * Returns a String value representing the specific level.
     * @return a String value representing the specific level.
     * @name getLevelString
     * @memberof system.logging.LoggerLevel
     * @function
     */
    getLevelString : { value : function( value )
    {
        if ( LoggerLevel.validate( value ) )
        {
            return value.toString() ;
        }
        else
        {
            return LoggerLevel.DEFAULT_LEVEL_STRING ;
        }
    }},

    /**
     * Validates a passed-in level passed in argument.
     * @return <code>true</code> if the level passed in argument is valid.
     * @name validate
     * @memberof system.logging.LoggerLevel
     * @function
     */
    validate : { value : function( level )
    {
        let levels =
        [
            LoggerLevel.ALL,
            LoggerLevel.CRITICAL,
            LoggerLevel.DEBUG,
            LoggerLevel.ERROR,
            LoggerLevel.INFO,
            LoggerLevel.NONE,
            LoggerLevel.WARNING,
            LoggerLevel.WTF
        ] ;
        return levels.indexOf( level ) > -1 ;
    }}
});