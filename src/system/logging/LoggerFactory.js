"use strict" ;

import { indexOfAny }          from '../../core/strings/indexOfAny.js' ;
import { ArrayMap }            from '../data/maps/ArrayMap.js' ;
import { InvalidChannelError } from '../errors/InvalidChannelError.js' ;
import { Logger }              from './Logger.js' ;
import { LoggerLevel }         from './LoggerLevel.js' ;
import { LoggerTarget }        from './LoggerTarget.js' ;
import { Receiver }            from '../signals/Receiver.js' ;
import { strings }             from './strings.js' ;

/**
 * This factory provides pseudo-hierarchical logging capabilities with multiple format and output options.
 * <p>This class in an internal class in the package system.logging you can use the Log singleton to deploy all the loggers in your application.</p>
 */
export function LoggerFactory()
{
    Object.defineProperties( this ,
    {
        _loggers     : { value : new ArrayMap()    , writable : true } ,
        _targetLevel : { value : LoggerLevel.NONE  , writable : true } ,
        _targets     : { value : []                , writable : true }
    }) ;
}

/**
 * @extends Object
 */
LoggerFactory.prototype = Object.create( Receiver.prototype ,
{
    ///////////

    constructor : { value : LoggerFactory } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[LoggerFactory]' ; } },

    ///////////

    /**
     * Allows the specified target to begin receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    addTarget :
    {
        value : function( target /*LoggerTarget*/ ) /*void*/
        {
            if( target && (target instanceof LoggerTarget) )
            {
                var channel /*String*/ ;
                var log /*Logger*/ ;

                var filters /*Array*/ = target.filters ;
                var it /*Iterator*/   = this._loggers.iterator() ;
                while ( it.hasNext() )
                {
                    log     = it.next() ;
                    channel = it.key() ;
                    if( this._channelMatchInFilterList( channel, filters ) )
                    {
                        target.addLogger( log ) ;
                    }
                }

                this._targets.push( target );

                if ( ( this._targetLevel === LoggerLevel.NONE ) || ( target.level.valueOf() < this._targetLevel.valueOf() ) )
                {
                    this._targetLevel = target.level ;
                }
            }
            else
            {
                throw new Error( strings.INVALID_TARGET );
            }
        }
    },

    /**
     * This method removes all of the current loggers from the cache of the factory.
     * Subsquent calls to the <code>getLogger()</code> method return new instances of loggers rather than any previous instances with the same category.
     * This method is intended for use in debugging only.
     */
    flush :
    {
        value : function() /*void*/
        {
            this._loggers.clear() ;
            this._targets     = [] ;
            this._targetLevel = LoggerLevel.NONE ;
        }
    },

    /**
     * Returns the logger associated with the specified channel.
     * If the category given doesn't exist a new instance of a logger will be returned and associated with that channel.
     * Channels must be at least one character in length and may not contain any blanks or any of the following characters:
     * []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * This method will throw an <code>InvalidChannelError</code> if the category specified is malformed.
     * @param channel The channel of the logger that should be returned.
     * @return An instance of a logger object for the specified name.
     * If the name doesn't exist, a new instance with the specified name is returned.
     */
    getLogger :
    {
        value : function ( channel /*String*/ ) /*Logger*/
        {
            this._checkChannel( channel ) ;

            var logger /*Logger*/ = this._loggers.get( channel ) ;
            if( !logger )
            {
                logger = new Logger( channel ) ;
                this._loggers.set( channel , logger ) ;
            }

            var target /*LoggerTarget*/ ;

            var len /*int*/ = this._targets.length ;
            for( var i /*int*/ = 0 ; i<len ; i++ )
            {
                target = this._targets[i] ;
                if( this._channelMatchInFilterList( channel , target.filters ) )
                {
                    target.addLogger( logger ) ;
                }
            }

            return logger ;
        }
    },

    /**
     * This method checks the specified string value for illegal characters.
     * @param value The String to check for illegal characters. The following characters are not valid: []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * @return <code>true</code> if there are any illegal characters found, <code>false</code> otherwise.
     */
    hasIllegalCharacters :
    {
        value : function ( value /*String*/ ) /*Boolean*/
        {
            return indexOfAny( value , strings.ILLEGALCHARACTERS.split("") ) !== -1 ;
        }
    },

    /**
     * Indicates whether a 'all' level log event will be processed by a log target.
     * @return true if a 'all' level log event will be logged; otherwise false.
     */
    isAll :
    {
        value : function () /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.ALL ;
        }
    },

    /**
     * Indicates whether a 'critical' level log event will be processed by a log target.
     * @return true if a 'critical' level log event will be logged; otherwise false.
     */
    isCritical :
    {
        value : function () /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.CRITICAL ;
        }
    },

    /**
     * Indicates whether a 'debug' level log event will be processed by a log target.
     * @return true if a 'debug' level log event will be logged; otherwise false.
     */
    isDebug :
    {
        value : function() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.DEBUG ;
        }
    },

    /**
     * Indicates whether a 'error' level log event will be processed by a log target.
     * @return true if a 'error' level log event will be logged; otherwise false.
     */
    isError :
    {
        value : function () /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.ERROR ;
        }
    },

    /**
     * Indicates whether a 'info' level log event will be processed by a log target.
     * @return true if a 'info' level log event will be logged; otherwise false.
     */
    isInfo :
    {
        value : function() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.INFO ;
        }
    },

    /**
     * Indicates whether a 'warn' level log event will be processed by a log target.
     * @return true if a 'warn' level log event will be logged; otherwise false.
     */
    isWarning :
    {
        value : function() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.WARNING ;
        }
    },

    /**
     * Indicates whether a 'wtf' level log event will be processed by a log target.
     * @return true if a 'wtf' level log event will be logged; otherwise false.
     */
    isWtf :
    {
        value : function() /*Boolean*/
        {
            return this._targetLevel === LoggerLevel.WTF ;
        }
    },

    /**
     * Stops the specified target from receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    removeTarget :
    {
        value : function ( target /*LoggerTarget*/ ) /*void*/
        {
            if( target && target instanceof LoggerTarget )
            {
                var log ;
                var filters = target.filters;
                var it = this._loggers.iterator() ;
                while ( it.hasNext() )
                {
                    log = it.next() ;
                    var c = it.key() ;
                    if( this._channelMatchInFilterList( c, filters ) )
                    {
                        target.removeLogger( log );
                    }
                }
                var len = this._targets.length ;
                for( var i = 0  ; i < len ; i++ )
                {
                    if( target === this._targets[i] )
                    {
                        this._targets.splice(i, 1) ;
                        i-- ;
                    }
                }
                this._resetTargetLevel() ;
            }
            else
            {
                throw new Error( strings.INVALID_TARGET );
            }
        }
    },

    /**
     * This method checks that the specified category matches any of the filter expressions provided in the <code>filters</code> Array.
     * @param category The category to match against.
     * @param filters A list of Strings to check category against.
     * @return <code>true</code> if the specified category matches any of the filter expressions found in the filters list, <code>false</code> otherwise.
     * @private
     */
    _channelMatchInFilterList :
    {
        value : function( channel /*String*/ , filters /*Array*/ ) /*Boolean*/
        {
            var filter /*String*/ ;
            var index /*int*/ = -1;
            var len /*int*/ = filters.length ;
            for( var i /*int*/ = 0 ; i<len ; i++ )
            {
                filter = filters[i] ;
                index  = filter.indexOf("*") ;
                if( index === 0 )
                {
                    return true ;
                }
                index = (index < 0) ? ( index = channel.length ) : ( index - 1 ) ;
                if( channel.substring(0, index) === filter.substring(0, index) )
                {
                    return true ;
                }
            }
            return false ;
        }
    },

    /**
     * This method will ensure that a valid category string has been specified.
     * If the category is not valid an <code>InvalidCategoryError</code> will be thrown.
     * Categories can not contain any blanks or any of the following characters: []`*~,!#$%^&amp;()]{}+=\|'";?&gt;&lt;./&#64; or be less than 1 character in length.
     * @private
     */
    _checkChannel :
    {
        value : function( channel /*String*/ ) /*void*/
        {
            if( channel === null || channel.length === 0 )
            {
                throw new InvalidChannelError( strings.INVALID_LENGTH );
            }
            if( this.hasIllegalCharacters( channel ) || ( channel.indexOf("*") !== -1 ) )
            {
                throw new InvalidChannelError( strings.INVALID_CHARS ) ;
            }
        }
    },

    /**
     * This method resets the Log's target level to the most verbose log level for the currently registered targets.
     * @private
     */
    _resetTargetLevel :
    {
        value : function() /*void*/
        {
            var t /*LoggerTarget*/ ;
            var min /*LoggerLevel*/ = LoggerLevel.NONE ;
            var len /*int*/ = this._targets.length ;
            for ( var i /*int*/ = 0 ; i < len ; i++ )
            {
                t = this._targets[i] ;
                if ( ( min === LoggerLevel.NONE ) || ( t.level.valueOf() < min.valueOf() ) )
                {
                    min = t.level ;
                }
            }
            this._targetLevel = min ;
        }
    }
});