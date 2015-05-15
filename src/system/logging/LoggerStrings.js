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
 * The enumeration of all string expressions in the logger factory engine.
 */
if ( system.logging.LoggerStrings == undefined ) 
{
    /**
     * Creates a new LoggerStrings singleton.
     */
    system.logging.LoggerStrings = {}
    
    // LoggerTarget
    
    /**
     * The static field used when throws an Error when a character is invalid.
     */
    system.logging.LoggerStrings.CHARS_INVALID /*String*/ = "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\" ;
    
    /**
     * The static field used when throws an Error when the character placement failed.
     */
    system.logging.LoggerStrings.CHAR_PLACEMENT /*String*/ = "'*' must be the right most character." ;
    
    /**
     * The static field used when throws an Error if the filter is empty or null.
     */
    system.logging.LoggerStrings.EMPTY_FILTER /*String*/ = "filter must not be null or empty." ;
    
    /**
     * The static field used when throws an Error when filter failed.
     */
    system.logging.LoggerStrings.ERROR_FILTER /*String*/ = "Error for filter '{0}'." ;
    
    // Log
    
    /**
     * The default channel of the <code class="prettyprint">Logger</code> instances returns with the <code class="prettyprint">getLogger</code> method.
     */
    system.logging.LoggerStrings.DEFAULT_CHANNEL /*String*/ = "" ;
    
    /**
     * The string representation of all the illegal characters.
     */
    system.logging.LoggerStrings.ILLEGALCHARACTERS /*String*/ = "[]~$^&/\\(){}<>+=`!#%?,:;'\"@" ;
    
    /**
     * The static field used when throws an Error when a character is invalid.
     */
    system.logging.LoggerStrings.INVALID_CHARS /*String*/ = "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" ;
    
    /**
     * The static field used when throws an Error when the length of one character is invalid.
     */
    system.logging.LoggerStrings.INVALID_LENGTH /*String*/ = "Channels must be at least one character in length." ;
    
    /**
     * The static field used when throws an Error when the specified target is invalid.
     */
    system.logging.LoggerStrings.INVALID_TARGET /*String*/ = "Log, Invalid target specified." ;
}