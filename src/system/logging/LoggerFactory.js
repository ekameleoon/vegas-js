/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * This factory provides pseudo-hierarchical logging capabilities with multiple format and output options.
 * <p>This class in an internal class in the package system.logging you can use the Log singleton to deploy all the loggers in your application.</p>
 */
if ( system.logging.LoggerFactory == undefined ) 
{
    /**
     * @requires system.signals.Signal
     */
    require( "system.errors.InvalidChannelError" ) ;
    
    /**
     * @requires system.logging.LoggerLevel
     */
    require( "system.logging.LoggerLevel" ) ;
    
    /**
     * Creates a new LoggerFactory instance.
     */
    system.logging.LoggerFactory = function () 
    {
        this._loggers     = new system.data.maps.ArrayMap() ;
        this._targetLevel = system.logging.LoggerLevel.NONE ;
        this._targets     = [] ;
    }
    
    /**
     * @extends Object
     */
    proto = system.logging.LoggerFactory.extend( system.signals.Receiver ) ;
    
    ///////// public properties
    
    /**
     * Allows the specified target to begin receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    proto.addTarget = function( target /*LoggerTarget*/ ) /*void*/
    {
        if( target && target instanceof system.logging.LoggerTarget )
        {
            var filters /*Array*/ = target.filters ;
            var it /*Iterator*/   = this._loggers.iterator() ;
            var log /*Logger*/ ;
            var channel /*String*/ ;
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
            if ( ( this._targetLevel == system.logging.LoggerLevel.NONE ) || ( target.level.valueOf() < this._targetLevel.valueOf() ) )
            {
                this._targetLevel = target.level ;
            }
        }
        else
        {
            throw new Error( system.logging.LoggerStrings.INVALID_TARGET );
        }
    }
    
    /**
     * This method removes all of the current loggers from the cache of the factory.
     * Subsquent calls to the <code class="prettyprint">getLogger()</code> method return new instances of loggers rather than any previous instances with the same category.
     * This method is intended for use in debugging only.
     */
    proto.flush = function() /*void*/
    {
        this._loggers.clear() ;
        this._targets     = [] ;
        this._targetLevel = system.logging.LoggerLevel.NONE ;
    }
    
    /**
     * Returns the logger associated with the specified channel.
     * If the category given doesn't exist a new instance of a logger will be returned and associated with that channel.
     * Channels must be at least one character in length and may not contain any blanks or any of the following characters:
     * []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * This method will throw an <code class="prettyprint">InvalidChannelError</code> if the category specified is malformed.
     * @param channel The channel of the logger that should be returned.
     * @return An instance of a logger object for the specified name.
     * If the name doesn't exist, a new instance with the specified name is returned.
     */
    proto.getLogger = function ( channel /*String*/ ) /*Logger*/
    {
        this._checkChannel( channel ) ;
        var result /*Logger*/ = this._loggers.get( channel ) ;
        if( result == null )
        {
            result = new system.logging.Logger( channel ) ;
            this._loggers.put( channel , result ) ;
        }
        var target /*LoggerTarget*/ ;
        var len /*int*/ = this._targets.length ;
        for( var i /*int*/ = 0 ; i<len ; i++ )
        {
            target = this._targets[i] ;
            if( this._channelMatchInFilterList( channel , target.filters ) )
            {
                target.addLogger( result ) ;
            }
        } 
        return result ;
    }
    
    /**
     * This method checks the specified string value for illegal characters.
     * @param value The String to check for illegal characters. The following characters are not valid: []~$^&amp;\/(){}&lt;&gt;+=`!#%?,:;'"&#64;
     * @return <code class="prettyprint">true</code> if there are any illegal characters found, <code class="prettyprint">false</code> otherwise.
     */
    proto.hasIllegalCharacters = function ( value /*String*/ ) /*Boolean*/
    {
        return core.strings.indexOfAny( value , system.logging.LoggerStrings.ILLEGALCHARACTERS.split("") ) != -1 ;
    }
    
    /**
     * Indicates whether a 'all' level log event will be processed by a log target.
     * @return true if a 'all' level log event will be logged; otherwise false.
     */
    proto.isAll = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.ALL ;
    }
    
    /**
     * Indicates whether a 'debug' level log event will be processed by a log target.
     * @return true if a 'debug' level log event will be logged; otherwise false.
     */
    proto.isDebug = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.DEBUG ;
    }
    
    /**
     * Indicates whether a 'error' level log event will be processed by a log target.
     * @return true if a 'error' level log event will be logged; otherwise false.
     */
    proto.isError = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.ERROR ;
    }
    
    /**
     * Indicates whether a 'fatal' level log event will be processed by a log target.
     * @return true if a 'fatal' level log event will be logged; otherwise false.
     */
    proto.isFatal = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.FATAL ;
    }
    
    /**
     * Indicates whether a 'info' level log event will be processed by a log target.
     * @return true if a 'info' level log event will be logged; otherwise false.
     */
    proto.isInfo = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.INFO ;
    }
    
    /**
     * Indicates whether a 'warn' level log event will be processed by a log target.
     * @return true if a 'warn' level log event will be logged; otherwise false.
     */
    proto.isWarn = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.WARN ;
    }
    
    /**
     * Indicates whether a 'wtf' level log event will be processed by a log target.
     * @return true if a 'wtf' level log event will be logged; otherwise false.
     */
    proto.isWtf = function ( value /*String*/ ) /*Boolean*/
    {
        return this._targetLevel == system.logging.LoggerLevel.WTF ;
    }
    
    /**
     * Stops the specified target from receiving notification of log events.
     * @param target The specific target that should capture log events.
     * @throws Error If the target is invalid.
     */
    proto.removeTarget = function ( target /*LoggerTarget*/ ) /*void*/
    {
        if( target && target instanceof system.logging.LoggerTarget )
        {
            var log /*Logger*/ ;
            var filters /*Array*/ = target.filters;
            var it /*Iterator*/   = this._loggers.iterator() ;
            while ( it.hasNext() )
            {
                log = it.next() ;
                var c /*String*/ = it.key() ;
                if( this._channelMatchInFilterList( c, filters ) )
                {
                    target.removeLogger( log );
                }
            }
            var len /*int*/ = this._targets.length ;
            for( var i /*int*/ = 0  ; i < len ; i++ )
            {
                if( target == this._targets[i] )
                {
                    this._targets.splice(i, 1) ;
                    i-- ;
                }
            }
            this._resetTargetLevel() ;
        }
        else
        {
            throw new Error( system.logging.LoggerStrings.INVALID_TARGET );
        }
    }
    
    ///////// private properties
    
    /**
     * @private
     */
    proto._loggers /*Map*/ = null ;
    
    /**
     * @private
     */
    proto._targetLevel /*LoggerLevel*/ = null ;
    
    /**
     * @private
     */
    proto._targets /*Array*/ = null ;
    
    /**
     * This method checks that the specified category matches any of the filter expressions provided in the <code class="prettyprint">filters</code> Array.
     * @param category The category to match against.
     * @param filters A list of Strings to check category against.
     * @return <code class="prettyprint">true</code> if the specified category matches any of the filter expressions found in the filters list, <code class="prettyprint">false</code> otherwise.
     */
    proto._channelMatchInFilterList = function( channel /*String*/ , filters /*Array*/ ) /*Boolean*/ 
    {
        var filter /*String*/ ;
        var index /*int*/ = -1;
        var len /*int*/ = filters.length ;
        for( var i /*int*/ = 0 ; i<len ; i++ )
        {
            filter = filters[i] ;
            index  = filter.indexOf("*") ;
            if( index == 0 )
            {
                return true ;
            }
            index = (index < 0) ? ( index = channel.length ) : ( index - 1 ) ;
            if( channel.substring(0, index) == filter.substring(0, index) )
            {
                return true ;
            }
        }
        return false ;
    }
    
    /**
     * This method will ensure that a valid category string has been specified.
     * If the category is not valid an <code class="prettyprint">InvalidCategoryError</code> will be thrown.
     * Categories can not contain any blanks or any of the following characters: []`*~,!#$%^&amp;()]{}+=\|'";?&gt;&lt;./&#64; or be less than 1 character in length.
     */
    proto._checkChannel = function( channel /*String*/ ) /*void*/ 
    {
        if( channel == null || channel.length == 0 )
        {
            throw new system.errors.InvalidChannelError( system.logging.LoggerStrings.INVALID_LENGTH );
        }
        if( this.hasIllegalCharacters( channel ) || ( channel.indexOf("*") != -1 ) )
        {
            throw new system.errors.InvalidChannelError( system.logging.LoggerStrings.INVALID_CHARS ) ;
        }
    }
    
    /**
     * This method resets the Log's target level to the most verbose log level for the currently registered targets.
     */
    proto._resetTargetLevel = function() /*void*/ 
    {
        var t /*LoggerTarget*/ ;
        var min /*LoggerLevel*/ = system.logging.LoggerLevel.NONE ;
        var len /*int*/ = this._targets.length ;
        for ( var i /*int*/ = 0 ; i < len ; i++ )
        {
            t = this._targets[i] ;
            if ( ( min == system.logging.LoggerLevel.NONE ) || ( t.level.valueOf() < min.valueOf() ) )
            {
                min = t.level ;
            }
        }
        this._targetLevel = min ;
    }
    
    /////////
    
    delete proto ;
    
    /////////
    
    system.logging.Log = new system.logging.LoggerFactory() ;
}