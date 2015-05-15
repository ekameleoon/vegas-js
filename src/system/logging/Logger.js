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
 * API for sending log output.
 */
if ( system.logging.Logger == undefined ) 
{
    /**
     * @requires system.signals.Signal
     */
    require( "system.signals.Signal" ) ;
    
    /**
     * Creates a new Logger instance.
     * @param channel The channel value of the logger.
     */
    system.logging.Logger = function ( channel /*String*/ ) 
    {
        system.signals.Signal.call( this ) ; // super()
        this._channel = channel ;
        this._entry   = new system.logging.LoggerEntry( null , null , this ) ;
    }
    
    /**
     * @extends system.signals.Signal
     */
    proto = system.logging.Logger.extend( system.signals.Signal ) ;
    
    /**
     * Logs the specified data using the LogEventLevel.DEBUG level.
     */
    proto.debug = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.DEBUG ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * Logs the specified data using the LogEventLevel.ERROR level.
     */
    proto.error = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.ERROR ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * Logs the specified data using the LogEventLevel.FATAL level.
     */
    proto.fatal = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.FATAL ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    
    /**
     * Indicates the channel value for the logger.
     */
    proto.getChannel = function() /*String*/
    {
        return this._channel ;
    }
    
    /**
     * Logs the specified data using the LogEvent.INFO level.
     */
    proto.info = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.INFO ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * Logs the specified data using the LogEvent.ALL level.
     * @param context The information to log. This string can contain special marker characters of the form {x}, where x is a zero based index that will be replaced with the additional parameters found at that index if specified.
     * @param ... Additional parameters that can be subsituted in the str parameter at each "{x}" location, where x is an integer (zero based) index value into the Array of values specified.
     */
    proto.log = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.ALL ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * Logs the specified data using the LogEventLevel.WARN level.
     */
    proto.warn = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.WARN ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    proto.wtf = function ( context ) /*void*/ 
    {
        this._log.apply( this , [ system.logging.LoggerLevel.WTF ].concat( Array.fromArguments( arguments ) ) ) ;
    }
    
    /**
     * What a Terrible Failure: Report an exception that should never happen.
     */
    proto._log = function ( level /*LoggerLevel*/ , context ) /*void*/ 
    {
        if( this.connected() )
        {
            if ( ( typeof(context) == "string" || context instanceof String ) && arguments.length > 2 )
            {
                var options /*Array*/ = Array.fromArguments( arguments ).slice(2) ;
                var len /*int*/       = options.length ;
                for( var i /*int*/ = 0 ; i<len ; i++ )
                {
                    context = context.replace( new RegExp( "\\{" + i + "\\}" , "g" ) , options[i] ) ;
                }
            }
            this._entry.message = context ;
            this._entry.level   = level ;
            this.emit( this._entry ) ;
        }
    }
    
    
    //////////////////////////////////// Virtual properties
    
    proto.__defineGetter__( "channel" , proto.getChannel ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}