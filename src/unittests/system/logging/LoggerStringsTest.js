/*

  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  
           http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is VEGAS Framework.
  
  The Initial Developer of the Original Code is
  ALCARAZ Marc (aka eKameleon)  <ekameleon@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2010
  the Initial Developer. All Rights Reserved.
  
  Contributor(s) :
  
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

// ---o Constructor

system.logging.LoggerStringsTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.logging.LoggerStringsTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.logging.LoggerStringsTest.prototype.constructor = system.logging.LoggerStringsTest ;

// ----o Public Methods

system.logging.LoggerStringsTest.prototype.testCHARS_INVALID = function () 
{
    this.assertEquals
    ( 
        system.logging.LoggerStrings.CHARS_INVALID , 
        "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\" 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testCHAR_PLACEMENT = function () 
{
    this.assertEquals
    (
        system.logging.LoggerStrings.CHAR_PLACEMENT , 
        "'*' must be the right most character." 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testEMPTY_FILTER = function () 
{
    this.assertEquals
    ( 
        system.logging.LoggerStrings.EMPTY_FILTER , 
        "filter must not be null or empty." 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testDEFAULT_CHANNEL = function () 
{
    this.assertEquals
    ( 
        system.logging.LoggerStrings.DEFAULT_CHANNEL , 
        "" 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testILLEGALCHARACTERS = function () 
{
    this.assertEquals
    ( 
        system.logging.LoggerStrings.ILLEGALCHARACTERS , 
        "[]~$^&/\\(){}<>+=`!#%?,:;'\"@" 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testINVALID_CHARS = function () 
{
    this.assertEquals
    (
        system.logging.LoggerStrings.INVALID_CHARS , 
        "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testINVALID_LENGTH = function () 
{
    this.assertEquals
    (
        system.logging.LoggerStrings.INVALID_LENGTH , 
        "Channels must be at least one character in length." 
    ) ;
}

system.logging.LoggerStringsTest.prototype.testINVALID_TARGET = function () 
{
    this.assertEquals
    ( 
        system.logging.LoggerStrings.INVALID_TARGET , 
        "Log, Invalid target specified." 
    ) ;
}
