"use strict" ;

import { fastformat }         from '../../core/strings/fastformat.js' ;
import { InvalidFilterError } from '../errors/InvalidFilterError.js' ;
import { Log }                from './LoggerFactory.js' ;
import { Logger }             from './Logger.js' ;
import { LoggerLevel }        from './LoggerLevel.js' ;
import { Receiver }           from '../signals/Receiver.js' ;
import { strings }            from './strings.js' ;

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param logger The Logger reference of this entry.
 */
export function LoggerTarget()
{
    Object.defineProperties( this ,
    {
        _count   : { value : 0 , writable : true } ,
        _factory : { value : Log , writable : true } ,
        _filters : { value : ["*"] , writable : true } ,
        _level   : { value : LoggerLevel.ALL , writable : true }
    }) ;
}

/**
 * @extends Object
 */
LoggerTarget.prototype = Object.create( Receiver.prototype ,
{
    ////////////////////////////////////

    constructor : { value : LoggerTarget } ,

    ////////////////////////////////////

    /**
     * Determinates the LoggerFactory reference of the target,
     * by default the target use the <code>system.logging.Log</code> singleton.
     */
    factory :
    {
        get : function()
        {
            return this._factory ;
        },
        set : function( factory )
        {
            if ( this._factory )
            {
                this._factory.removeTarget( this ) ;
            }
            this._factory = factory || Log ;
            this._factory.addTarget( this ) ;
        }
    },

    /**
     * Determinates the filters array representation of the target.
     */
    filters :
    {
        get : function()
        {
            return [].concat( this._filters ) ;
        },
        set : function( value /*Array*/ ) /*void*/
        {
            var filters /*Array*/ = [] ;

            if ( value && value instanceof Array && value.length > 0 )
            {
                var filter ;
                var length = value.length ;
                for ( var i = 0 ; i < length ; i++ )
                {
                    filter = value[i] ;
                    if ( filters.indexOf( filter ) === -1 )
                    {
                        this._checkFilter( filter ) ;
                        filters.push( filter ) ;
                    }
                }
            }
            else
            {
                filters.push( '*' ) ;
            }

            if ( this._count > 0 )
            {
                this._factory.removeTarget( this ) ;
            }

            this._filters = filters ;

            if( this._count > 0 )
            {
                this._factory.addTarget( this ) ;
            }
        }
    },

    /**
     * Determinates the level (LoggerLevel of this target.
     */
    level :
    {
        get : function()
        {
            return this._level ;
        },
        set : function( value /*LoggerLevel*/ ) /*void*/
        {
            this._factory.removeTarget( this ) ;
            this._level = value || LoggerLevel.ALL ; // FIXME filter and validate the level
            this._factory.addTarget( this ) ;
        }
    },

    ////////////////////////////////////

    /**
     * Inserts a channel in the fllters if this channel don't exist.
     * Returns a boolean if the channel is add in the list.
     */
    addFilter :
    {
        value : function ( channel /*String*/ ) /*Boolean*/
        {
            this._checkFilter( channel ) ;
            var index = this._filters.indexOf( channel ) ;
            if ( index === -1 )
            {
                this._filters.push( channel ) ;
                return true ;
            }
            return false ;
        }
    },

    /**
     * Sets up this target with the specified logger.
     * Note : this method is called by the framework and should not be called by the developer.
     */
    addLogger :
    {
        value : function ( logger /*Logger*/ ) /*void*/
        {
            if ( logger instanceof Logger )
            {
                this._count ++ ;
                logger.connect( this ) ;
            }
        }
    },

    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    logEntry :
    {
        value : function( entry /*LoggerEntry*/ ) /*void*/ //jshint ignore:line
        {
            // override
        }
    },

    /**
     * This method is called when the receiver is connected with a Signal object.
     * @param ...values All the values emitting by the signals connected with this object.
     */
    receive :
    {
        value : function( entry /*LoggerEntry*/ ) /*void*/
        {
            if ( entry )
            {
                if ( this._level === LoggerLevel.NONE )
                {
                    return ; // logging off
                }
                else if ( entry.level.valueOf() >= this._level.valueOf() )
                {
                    this.logEntry( entry ) ;
                }
            }
        }
    },

    /**
     * Remove a channel in the fllters if this channel exist.
     * @return a boolean if the channel is removed.
     */
    removeFilter :
    {
        value : function( channel /*String*/ ) /*Boolean*/
        {
            if ( channel && (typeof(channel) === "string" || (channel instanceof String) ) && ( channel !== "" ) )
            {
                var index /*int*/ = this._filters.indexOf( channel ) ;
                if ( index > -1 )
                {
                    this._filters.splice( index , 1 ) ;
                    return true ;
                }
            }
            return false ;
        }
    },

    /**
     * Stops this target from receiving events from the specified logger.
     */
    removeLogger :
    {
        value : function( logger /*Logger*/ ) /*void*/
        {
            if ( logger )
            {
                this._count-- ;
                logger.disconnect( this ) ;
            }
        }
    },

    /**
     * @private
     */
    _checkFilter :
    {
        value : function( filter/*String*/ ) /*void*/
        {
            if ( filter === null )
            {
                throw new InvalidFilterError( strings.EMPTY_FILTER  ) ;
            }

            if ( this._factory.hasIllegalCharacters( filter ) )
            {
                 throw new InvalidFilterError( fastformat( strings.ERROR_FILTER , filter ) + strings.CHARS_INVALID ) ;
            }

            var index /*int*/ = filter.indexOf("*") ;

            if ( (index >= 0) && (index !== (filter.length -1)) )
            {
                throw new InvalidFilterError( fastformat( strings.ERROR_FILTER , filter) + strings.CHAR_PLACEMENT ) ;
            }
        }
    },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[LoggerTarget]' ; } },
});