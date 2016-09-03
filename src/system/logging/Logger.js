"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { LoggerLevel } from './LoggerLevel.js' ;
import { LoggerEntry } from './LoggerEntry.js' ;

/**
 * API for sending log output.
 */
export function Logger( channel )
{
    Signal.call( this ) ;

    Object.defineProperties( this ,
    {
        _channel : { value : channel , writable : true } ,
        _entry   : { value : new LoggerEntry( this ) , writable : true }
    }) ;
}

///////////////////

/**
 * @extends Object
 */
Logger.prototype = Object.create( Signal.prototype ,
{
    /**
     * Logs the specified data using the LogEventLevel.CRITICAL level.
     */
    critical :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.CRITICAL , context ].concat( options ) ) ;
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.DEBUG level.
     */
    debug :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.DEBUG , context ].concat( options ) ) ;
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.ERROR level.
     */
    error :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.ERROR , context ].concat( options ) ) ;
        }
    },

    /**
     * Indicates the channel value for the logger.
     */
    channel :
    {
        get : function()
        {
            return this._channel ;
        }
    },

    /**
     * Logs the specified data using the LogEvent.INFO level.
     */
    info :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.INFO , context ].concat( options ) ) ;
        }
    },

    /**
     * Logs the specified data using the LogEvent.ALL level.
     * @param ...args The information to log. This string can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param ... Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     */
    log :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.ALL , context ].concat( options ) ) ;
        }
    },

    /**
     * Logs the specified data using the LogEventLevel.WARN level.
     */
    warning :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.WARNING , context ].concat( options ) ) ;
        }
    },

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    wtf :
    {
        value : function ( context , ...options )
        {
            this._log.apply( this , [ LoggerLevel.WTF , context ].concat( options ) ) ;
        }
    },

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    _log :
    {
        value : function ( level /*LoggerLevel*/ , context , ...options ) /*void*/
        {
            if( this.connected() )
            {
                if ( ( typeof(level) === "string" || level instanceof String ) )
                {
                    var len = options.length ;
                    for( var i = 0 ; i<len ; i++ )
                    {
                        context = String(context).replace( new RegExp( "\\{" + i + "\\}" , "g" ) , options[i] ) ;
                    }
                }
                this._entry.message = context ;
                this._entry.level   = level ;
                this.emit( this._entry ) ;
            }
        }
    }
});

Logger.prototype.constructor = Logger;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
LoggerEntry.prototype.toString = function() /*String*/
{
    return '[Logger]' ;
}