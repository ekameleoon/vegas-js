"use strict" ;

import { Enum } from '../Enum.js' ;

/**
 * The logger levels that is used within the logging framework.
 * @param value The value of the enumeration.
 * @param name The name key of the enumeration.
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
export function LoggerLevel( value /*int*/ , name /*String*/ )
{
    Enum.call( this , value , name ) ;
}

/**
 * @extends Object
 */
LoggerLevel.prototype = Object.create( Enum.prototype );
LoggerLevel.prototype.constructor = LoggerLevel;

Object.defineProperties( LoggerLevel ,
{
    /**
     * Intended to force a target to process all messages (1).
     */
    ALL : { value : new LoggerLevel( 1 , 'ALL' ) , enumerable : true } ,

    /**
     * Designates events that are very harmful and will eventually lead to application failure (16).
     */
    CRITICAL : { value : new LoggerLevel( 16 , 'CRITICAL' ) , enumerable : true } ,

    /**
     * Designates informational level messages that are fine grained and most helpful when debugging an application (2).
     */
    DEBUG : { value : new LoggerLevel( 2 , 'DEBUG' ) , enumerable : true } ,

    /**
     * The default string level value in the getLevelString() method.
     */
    DEFAULT_LEVEL_STRING : { value : 'UNKNOWN' , enumerable : true } ,

    /**
     * Designates error events that might still allow the application to continue running (8).
     */
    ERROR : { value : new LoggerLevel( 8 , 'ERROR' ) , enumerable : true } ,

    /**
     * Designates informational messages that highlight the progress of the application at coarse-grained level (4).
     */
    INFO : { value : new LoggerLevel( 4 , 'INFO' ) , enumerable : true } ,

    /**
     * A special level that can be used to turn off logging (0).
     */
    NONE : { value : new LoggerLevel( 0 , 'NONE' ) , enumerable : true } ,

    /**
     * Designates events that could be harmful to the application operation (6).
     */
    WARNING : { value : new LoggerLevel( 6 , 'WARNING' ) , enumerable : true } ,

    /**
     * What a Terrible Failure: designates an exception that should never happen. (32).
     */
    WTF : { value : new LoggerLevel( 32 , 'WTF' ) , enumerable : true } ,

    /**
     * Returns <code>true</code> if the number level passed in argument is valid.
     * @return <code>true</code> if the number level passed in argument is valid.
     */
    get :
    {
        value : function( value /*int*/ ) /*LoggerLevel*/
        {
            let levels /*Array*/ =
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
        }
    },

    /**
     * Returns a String value representing the specific level.
     * @return a String value representing the specific level.
     */
    getLevelString :
    {
        value : function( value /*LoggerLevel*/ ) /*String*/
        {
            if ( LoggerLevel.validate( value ) )
            {
                return value.toString() ;
            }
            else
            {
                return LoggerLevel.DEFAULT_LEVEL_STRING ;
            }
        }
    },

    /**
     * Returns <code>true</code> if the number level passed in argument is valid.
     * @return <code>true</code> if the number level passed in argument is valid.
     */
    validate :
    {
        value : function( level /*LoggerLevel*/ ) /*Boolean*/
        {
            let levels /*Array*/ =
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
        }
    }
});