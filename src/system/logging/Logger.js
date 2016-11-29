"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { LoggerLevel } from './LoggerLevel.js' ;
import { LoggerEntry } from './LoggerEntry.js' ;

/**
 * A <code>Logger</code> object is used to log messages for a specific system or application components. <b>Loggers</b> are normally named, using a hierarchical dot-separated namespace. Logger names can be arbitrary strings, but they should normally be based on the package name or class name of the logged component, such as com.mydomain or myapp.version.
 * <p><b>Logger</b> objects may be obtained by calls on one of the <code>Log.getLogger</code> factory methods. These will either create a <code>new Logger</code> singleton or return a suitable existing <b>Logger</b>.</p>
 * @summary A <code>Logger</code> object is used to log messages for a specific system or application components.
 * @name Logger
 * @memberof system.logging
 * @class
 * @param {string} channel - The channel of the logger.
 * @example
 * var Log = system.logging.Log ;
 * var LoggerLevel = system.logging.LoggerLevel ;
 * var ConsoleTarget = system.logging.targets.ConsoleTarget ;
 *
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
export function Logger( channel )
{
    Signal.call( this ) ;

    Object.defineProperties( this ,
    {
        _entry : { value : new LoggerEntry(null,null,channel) , writable : true }
    }) ;
}

Logger.prototype = Object.create( Signal.prototype ,
{
    constructor : { writable : true , value : Logger } ,

    /**
     * Indicates the channel value for the logger.
     * @name channel
     * @memberof system.logging.Logger
     * @instance
     * @type string
     * @readonly
     */
    channel : { get : function() { return this._entry.channel ; } },

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.CRITICAL|LoggerLevel.CRITICAL} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name critical
     * @memberof system.logging.Logger
     * @instance
     * @function
     */
    critical : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.CRITICAL , context , options ) ;
    }},

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.DEBUG|LoggerLevel.DEBUG} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name debug
     * @memberof system.logging.Logger
     * @instance
     * @function
     */
    debug : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.DEBUG , context , options ) ;
    }},

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.ERROR|LoggerLevel.ERROR} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name error
     * @memberof system.logging.Logger
     * @instance
     * @function
     */
    error : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.ERROR , context , options ) ;
    }},

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.INFO|LoggerLevel.INFO} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name info
     * @memberof system.logging.Logger
     * @instance
     * @function
     */
    info : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.INFO , context , options ) ;
    }},

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.ALL|LoggerLevel.ALL} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name log
     * @memberof system.logging.Logger
     * @instance
     * @function
     * @see {@link core.strings.fastformat}
     */
    log : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.ALL , context , options ) ;
    }},

    /**
     * Logs the specified data using the {@link system.logging.LoggerLevel.WARNING|LoggerLevel.WARNING} level.
     * @param {*} context - The message or information to log. If the passedin value is a string, you can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param {...Object} options - Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     * @name warning
     * @memberof system.logging.Logger
     * @instance
     * @function
     */
    warning :
    {
        value : function ( context , ...options )
        {
            this._log( LoggerLevel.WARNING , context , options ) ;
        }
    },

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    wtf :
    {
        value : function ( context , ...options )
        {
            this._log( LoggerLevel.WTF , context , options ) ;
        }
    },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[Logger]' ; } } ,

    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    _log :
    {
        value : function ( level /*LoggerLevel*/ , context , options /*Array*/ ) /*void*/
        {
            if( this.connected() )
            {
                if ( ( typeof(context) === "string" || context instanceof String ) && options instanceof Array )
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