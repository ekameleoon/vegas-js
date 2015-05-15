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
 * The logger that is used within the logging framework. This class dispatches events for each message logged using the log() method.
 */
if ( system.logging.LoggerLevel == undefined ) 
{
    /**
     * @requires system.Enum
     */
    require( "system.Enum" ) ;
    
    /**
     * Creates a new LoggerLevel instance.
     * @param value The value of the enumeration.
     * @param name The name key of the enumeration.
     */
    system.logging.LoggerLevel = function ( value /*int*/ , name /*String*/ ) 
    {
        system.Enum.call( this , value , name ) ;
    }
    
    /**
     * @extends system.Enum
     */
    proto = system.logging.LoggerLevel.extend( system.Enum ) ;
    
    /**
     * Compares the specified object with this object for equality.
     * @return <code class="prettyprint">true</code> if the the specified object is equal with this object.
     */
    proto.equals = function ( o ) /*Boolean*/ 
    {
        if ( o == this )
        {
            return true ;
        }
        else if ( o instanceof system.logging.LoggerLevel )
        {
            return ( o._name == this._name ) && ( o._value == this._value) ;
        }
        else
        {
            return false ;
        }
    }
    
    //////////////
    
    delete proto ;
    
    //////////////
    
    /**
     * Intended to force a target to process all messages (1).
     */
    system.logging.LoggerLevel.ALL /*LoggerLevel*/ = new system.logging.LoggerLevel( 1 , "ALL" ) ;
    
    /**
     * Designates informational level messages that are fine grained 
     * and most helpful when debugging an application (2).
     */
    system.logging.LoggerLevel.DEBUG /*LoggerLevel*/ = new system.logging.LoggerLevel( 2 , "DEBUG" ) ;
    
    /**
     * The default string level value in the getLevelString() method.
     */
    system.logging.LoggerLevel.DEFAULT_LEVEL_STRING /*String*/ = "UNKNOWN" ;
    
    /**
     * Designates error events that might still allow the application to continue running (8).
     */
    system.logging.LoggerLevel.ERROR /*LoggerLevel*/ = new system.logging.LoggerLevel( 8 , "ERROR" ) ;
    
    /**
     * Designates events that are very harmful and will eventually lead to application failure (16).
     */
    system.logging.LoggerLevel.FATAL /*LoggerLevel*/ = new system.logging.LoggerLevel( 16 , "FATAL" ) ;
    
    /**
     * Designates informational messages that highlight the progress of the application at coarse-grained level (4).
     */
    system.logging.LoggerLevel.INFO /*LoggerLevel*/ = new system.logging.LoggerLevel( 4 , "INFO" ) ;
    
    /**
     * A special level that can be used to turn off logging (0).
     */
    system.logging.LoggerLevel.NONE /*LoggerLevel*/ = new system.logging.LoggerLevel( 0 , "NONE" ) ;
    
    /**
     * Designates events that could be harmful to the application operation (6).
     */
    system.logging.LoggerLevel.WARN /*LoggerLevel*/ = new system.logging.LoggerLevel( 6 , "WARN" ) ;
    
    /**
     * What a Terrible Failure: designates an exception that should never happen. (32).
     */
    system.logging.LoggerLevel.WTF /*LoggerLevel*/ = new system.logging.LoggerLevel( 32 , "WTF" ) ;
    
    /**
     * Returns <code class="prettyprint">true</code> if the number level passed in argument is valid.
     * @return <code class="prettyprint">true</code> if the number level passed in argument is valid.
     */
    system.logging.LoggerLevel.getLevel = function( value /*int*/ ) /*LoggerLevel*/ 
    {
        var levels /*Array*/ = 
        [ 
            system.logging.LoggerLevel.ALL, 
            system.logging.LoggerLevel.DEBUG, 
            system.logging.LoggerLevel.ERROR, 
            system.logging.LoggerLevel.FATAL, 
            system.logging.LoggerLevel.INFO, 
            system.logging.LoggerLevel.NONE, 
            system.logging.LoggerLevel.WARN, 
            system.logging.LoggerLevel.WTF 
        ] ;
        var l /*int*/ = levels.length ;
        while( --l > -1 )
        {
            if ( levels[l]._value == value )
            {
                return levels[l] ; 
            }
        }
        return null ;
    }
    
    /**
     * Returns a String value representing the level specified.
     * @return a String value representing the level specified.
     */
    system.logging.LoggerLevel.getLevelString = function( value /*LoggerLevel*/ ) /*String*/
    {
        if ( system.logging.LoggerLevel.isValidLevel( value ) )
        {
            return value.toString() ;
        }
        else
        {
            return system.logging.LoggerLevel.DEFAULT_LEVEL_STRING ;
        }
    }
    
    /**
     * Returns <code class="prettyprint">true</code> if the number level passed in argument is valid.
     * @return <code class="prettyprint">true</code> if the number level passed in argument is valid.
     */
    system.logging.LoggerLevel.isValidLevel = function( level /*LoggerLevel*/ ) /*Boolean*/ 
    {
        var levels /*Array*/ = 
        [ 
            system.logging.LoggerLevel.ALL, 
            system.logging.LoggerLevel.DEBUG, 
            system.logging.LoggerLevel.ERROR, 
            system.logging.LoggerLevel.FATAL, 
            system.logging.LoggerLevel.INFO, 
            system.logging.LoggerLevel.NONE, 
            system.logging.LoggerLevel.WARN, 
            system.logging.LoggerLevel.WTF 
        ] ;
        return levels.indexOf( level ) > -1 ;
    }
}