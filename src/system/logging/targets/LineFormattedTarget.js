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
 * All logger target implementations that have a formatted line style output should extend this class. 
 * It provides default behavior for including date, time, channel, and level within the output.
 */
if ( system.logging.targets.LineFormattedTarget == undefined ) 
{
    /**
     * @requires system.logging.LoggerTarget
     */
    require( "system.logging.LoggerTarget" ) ;
    
    /**
     * Creates a new LineFormattedTarget instance.
     */
    system.logging.targets.LineFormattedTarget = function () 
    {
        system.logging.LoggerTarget.call(this) ;
        this._lineNumber = 1 ;
    }
    
    /**
     * @extends Object
     */
    proto = system.logging.targets.LineFormattedTarget.extend( system.logging.LoggerTarget ) ;
    
    /**
     * Indicates if the channel for this target should added to the trace.
     */
    proto.includeChannel /*Boolean*/ = false ;
    
    /**
     * Indicates if the date should be added to the trace.
     */
    proto.includeDate /*Boolean*/ = false ;
    
    /**
     * Indicates if the level for the event should added to the trace.
     */
    proto.includeLevel /*Boolean*/ = false ;
    
    /**
     * Indicates if the line for the event should added to the trace.
     */
    proto.includeLines /*Boolean*/ = false ;
    
    /**
     * Indicates if the milliseconds should be added to the trace. Only relevant when includeTime is <code class="prettyprint">true</code>.
     */
    proto.includeMilliseconds /*Boolean*/ = false ;
    
    /**
     * Indicates if the time should be added to the trace.
     */
    proto.includeTime /*Boolean*/ = false ;
    
    /**
     * The separator string.
     */
    proto.separator /*String*/ = " " ;
    
    /**
     * Descendants of this class should override this method to direct the specified message to the desired output.
     * @param message String containing preprocessed log message which may include time, date, channel, etc. 
     * based on property settings, such as <code class="prettyprint">includeDate</code>, <code class="prettyprint">includeChannel</code>, etc.
     */
    proto.internalLog = function( message , level /*LoggerLevel*/ ) /*void*/
    {
        // override this method
    }
    
    /**
     *  This method receive a <code class="prettyprint">LoggerEntry</code> from an associated logger.
     *  A target uses this method to translate the event into the appropriate format for transmission, storage, or display.
     *  This method will be called only if the event's level is in range of the target's level.
     *  <b><i>Descendants need to override this method to make it useful.</i></b>
     */
    proto.logEntry = function( entry /*LoggerEntry*/ ) /*void*/
    {
        var message = this.formatMessage
        ( 
            entry.message, 
            system.logging.LoggerLevel.getLevelString( entry.level ), 
            entry.logger.channel , 
            new Date() 
        ) ;
        this.internalLog( message , entry.level ) ;
    }
    
    /**
     * Resets the internal line number value (set to 1).
     */
    proto.resetLineNumber = function() /*void*/
    {
        this._lineNumber = 1 ; 
    }
    
    /////////
    
    /**
     * This method format the passed Date in arguments.
     */
    proto.formatDate = function( d /*Date*/ ) /*String*/ 
    {
        var date /*String*/ = "" ;
        date += this.getDigit( d.getDate() ) ;
        date += "/" + this.getDigit( d.getMonth() + 1 ) ;
        date += "/" + d.getFullYear() ;
        return date ;
    }
    
    /**
     * This method format the passed level in arguments.
     */
    proto.formatLevel = function( level /*String*/ ) /*String*/ 
    {
        return '[' + level + ']' ;
    }
    
    /**
     * This method format the current line value.
     */
    proto.formatLines = function() /*String*/ 
    {
        return "[" + this._lineNumber++ + "]" ; 
    }
    
    /**
     * This method format the log message.
     */
    proto.formatMessage = function( message , level /*String*/ , channel /*String*/ , date /*Date*/ ) /*String*/ 
    {
        var msg /*String*/ = "" ;
        var d /*Date*/ = date || new Date ;
        if (this.includeLines) 
        {
            msg += this.formatLines() + this.separator ;
        }
        if (this.includeDate) 
        {
            msg += this.formatDate(d) + this.separator ;
        }
        if (this.includeTime) 
        {
            msg += this.formatTime(d) + this.separator ;
        }
        if (this.includeLevel)
        {
            msg += this.formatLevel(level || "" ) + this.separator ;
        } 
        if ( this.includeChannel ) 
        {
            msg += ( channel || "" ) + this.separator ;
        }
        msg += message.toString() ;
        return msg ;
    }
    
    /**
     * This method format the current Date passed in argument.
     */
    proto.formatTime = function( d /*Date*/ ) /*String*/ 
    {
        var time /*String*/ = "" ;
        time += this.getDigit(d.getHours()) ;
        time += ":" + this.getDigit(d.getMinutes()) ;
        time += ":" + this.getDigit(d.getSeconds()) ;
        if( this.includeMilliseconds ) 
        {
            time += ":" + this.getDigit( d.getMilliseconds() ) ;
        }
        return time ;
    }
    
    /**
     * Returns the string representation of a number and use digit conversion.
     * @return the string representation of a number and use digit conversion.
     */
    proto.getDigit = function( n/*Number*/ ) /*String*/ 
    {
        if ( isNaN(n) ) 
        {
            return "00" ;
        }
        return ((n < 10) ? "0" : "") + n ;
    }
    
    /////////
    
    delete proto ;
    
    /////////
}