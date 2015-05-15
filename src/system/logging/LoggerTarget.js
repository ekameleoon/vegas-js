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
 * This class provides the basic functionality required by the logging framework for a logger target implementation. 
 * It handles the validation of filter expressions and provides a default level property. 
 */
if ( system.logging.LoggerTarget == undefined ) 
{
    /**
     * @requires system.logging.LoggerLevel
     */
    require( "system.logging.LoggerLevel" ) ;
    
    /**
     * Creates a new LoggerTarget instance.
     */
    system.logging.LoggerTarget = function () 
    {
        this._count   = 0 ;
        this._factory = system.logging.Log ;
        this._filters = ["*"] ;
        this._level   = system.logging.LoggerLevel.ALL;
    }
    
    /**
     * @extends Object
     */
    proto = system.logging.LoggerTarget.extend( system.signals.Receiver ) ;
    
    /**
     * Insert a channel in the fllters if this channel don't exist.
     * Returns a boolean if the channel is add in the list.
     */
    proto.addFilter = function ( channel /*String*/ ) /*Boolean*/
    {
        this._checkFilter( channel ) ;
        var index /*int*/ = this._filters.indexOf( channel ) ; 
        if ( index == -1 )
        {
            this._filters.push( channel ) ; 
            return true ;
        }
        return false ;
    }
    
    /**
     * Sets up this target with the specified logger.
     * Note : this method is called by the framework and should not be called by the developer.
     */
    proto.addLogger = function ( logger /*Logger*/ ) /*void*/
    {
        if ( logger )
        {
            this._count ++ ;
            logger.connect( this ) ;
        }
    }
    
    /**
     * Returns the LoggerFactory reference of the target.
     * @return the LoggerFactory reference of the target.
     */
    proto.getFactory = function() /*LoggerFactory*/
    {
        return this._factory ;
    }
    
    /**
     * Returns the filters array representation of this target.
     * @return the filters array representation of this target.
     */
    proto.getFilters = function() /*Array*/
    {
        return [].concat( this._filters ) ;
    }
    
    /**
     * Returns the level of this target.
     * @return the level of this target.
     */
    proto.getLevel = function() /*LoggerLevel*/
    {
        return this._level ;
    }
    
    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    proto.logEntry = function( entry /*LoggerEntry*/ ) /*void*/
    {
        // override please
    }
    
    /**
     * This method is called when the receiver is connected with a Signal object.
     * @param ...values All the values emitting by the signals connected with this object.
     */
    proto.receive = function( entry /*LoggerEntry*/ ) /*void*/
    {
        if ( entry )
        {
            if ( this._level == system.logging.LoggerLevel.NONE )
            {
                return ; // logging off
            }
            else if ( entry.level.valueOf() >= this._level.valueOf() )
            {
                this.logEntry( entry ) ;
            }
        }
    }
    
    /**
     * Remove a channel in the fllters if this channel exist.
     * @return a boolean if the channel is removed.
     */
    proto.removeFilter = function( channel /*String*/ ) /*Boolean*/
    {
        if ( channel && (typeof(channel) == "string" || (channel instanceof String) ) && ( channel != "" ) )
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
    
    /**
     * Stops this target from receiving events from the specified logger.
     */
    proto.removeLogger = function( logger /*Logger*/ ) /*void*/
    {
        if ( logger )
        {
            this._count-- ;
            logger.disconnect( this ) ;
        }
    }
    
    /**
     * Determinates the LoggerFactory reference of the target, 
     * by default the target use the <code>system.logging.Log</code> singleton.
     */
    proto.setFactory = function( factory /*LoggerFactory*/ ) /*void*/
    {
        if ( this._factory )
        {
            this._factory.removeTarget( this ) ;
        }
        this._factory = factory || Log ;
        this._factory.addTarget( this ) ;
    }
    
    /**
     * Sets the filters array representation of this target.
     */
    proto.setFilters = function( value /*Array*/ ) /*void*/
    {
        var filters /*Array*/ = [] ;
        
        if ( value != null && value.length > 0 )
        {
            var filter /*String*/ ;
            var length  /*int*/ = value.length ;
            for ( var i /*int*/ = 0 ; i < length ; i++ )
            {
                filter = value[i] ;
                if ( filters.indexOf( filter ) == -1 )
                {
                    this._checkFilter( filter ) ;
                    filters.push( filter ) ;
                }
            }
        }
        else
        {
            filters.push( "*" ) ;
        }
        
        if ( this._count > 0 )
        {
            this._factory.removeTarget( this ) ;
        }
        
        this._filters = filters ;
        
        if ( this._count > 0 )
        {
            this._factory.addTarget( this ) ;
        }
    }
    
    /**
     * Sets the level of this target.
     */
    proto.setLevel = function( value /*LoggerLevel*/ ) /*void*/
    {
        this._factory.removeTarget( this ) ;
        this._level = value || system.logging.LoggerLevel.ALL ;
        this._factory.addTarget( this ) ;
    }
    
    //////////////////////////////////// Virtual properties
    
    proto.__defineGetter__( "factory" , proto.getFactory ) ;
    proto.__defineSetter__( "factory" , proto.setFactory ) ;
    
    proto.__defineGetter__( "filters" , proto.getFilters ) ;
    proto.__defineSetter__( "filters" , proto.setFilters ) ;
    
    proto.__defineGetter__( "level" , proto.getLevel ) ;
    proto.__defineSetter__( "level" , proto.setLevel ) ;
    
    /////////
    
    /**
     * @private
     */
    proto._checkFilter = function( filter/*String*/ ) /*void*/
    {
        if ( filter == null )
        {
            throw new system.errors.InvalidFilterError( system.logging.LoggerStrings.EMPTY_FILTER  ) ;
        }
        
        if ( this._factory.hasIllegalCharacters( filter ) )
        {
             throw new system.errors.InvalidFilterError( core.strings.format( system.logging.LoggerStrings.ERROR_FILTER , filter ) + system.logging.LoggerStrings.CHARS_INVALID ) ;
        }
        
        var index /*int*/ = filter.indexOf("*") ;
        
        if ( (index >= 0) && (index != (filter.length -1)) )
        {
            throw new system.errors.InvalidFilterError( core.strings.format( system.logging.LoggerStrings.ERROR_FILTER , filter) + system.logging.LoggerStrings.CHAR_PLACEMENT ) ;
        }
    }
    
    /////////
    
    delete proto ;
    
    /////////
}