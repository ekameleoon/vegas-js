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

system.logging.LoggerLevelTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.logging.LoggerLevelTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.logging.LoggerLevelTest.prototype.constructor = system.logging.LoggerLevelTest ;

// ----o Public Methods

system.logging.LoggerLevelTest.prototype.testConstructor = function () 
{
    var level = new system.logging.LoggerLevel(999999 , "test") ;
    this.assertNotNull( level , "01") ;
    this.assertEquals( level.toString() , "test" , "02") ;
    this.assertEquals( level.valueOf() , 999999 , "03") ;
}

system.logging.LoggerLevelTest.prototype.testDEFAULT_LEVEL_STRING = function () 
{
    this.assertEquals( system.logging.LoggerLevel.DEFAULT_LEVEL_STRING  , "UNKNOWN" , "DEFAULT_LEVEL_STRING static property failed.") ;
}

system.logging.LoggerLevelTest.prototype.testInherit = function () 
{
    var level = new system.logging.LoggerLevel(999999 , "test") ;
    this.assertTrue( level instanceof system.Enum , "Must inherit the Enum class.") ;
}

system.logging.LoggerLevelTest.prototype.testNONE = function () 
{
    this.assertEquals( system.logging.LoggerLevel.NONE, new system.logging.LoggerLevel(0, "NONE" ) , "system.logging.LoggerLevel.NONE failed.") ;
}

system.logging.LoggerLevelTest.prototype.testALL = function () 
{
    this.assertEquals( system.logging.LoggerLevel.ALL, new system.logging.LoggerLevel( 1 , "ALL" ) , "system.logging.LoggerLevel.ALL failed.") ;
}

system.logging.LoggerLevelTest.prototype.testDEBUG = function () 
{
    this.assertEquals( system.logging.LoggerLevel.DEBUG, new system.logging.LoggerLevel( 2 , "DEBUG" ) , "system.logging.LoggerLevel.DEBUG failed.") ;
}

system.logging.LoggerLevelTest.prototype.testERROR = function () 
{
    this.assertEquals( system.logging.LoggerLevel.ERROR, new system.logging.LoggerLevel( 8 , "ERROR" ) , "system.logging.LoggerLevel.ERROR failed.") ;
}

system.logging.LoggerLevelTest.prototype.testFATAL = function () 
{
    this.assertEquals( system.logging.LoggerLevel.FATAL, new system.logging.LoggerLevel( 16 , "FATAL" ) , "system.logging.LoggerLevel.FATAL failed.") ;
}

system.logging.LoggerLevelTest.prototype.testINFO = function () 
{
    this.assertEquals( system.logging.LoggerLevel.INFO, new system.logging.LoggerLevel( 4 , "INFO" ) , "system.logging.LoggerLevel.INFO failed.") ;
}

system.logging.LoggerLevelTest.prototype.testWARN = function () 
{
    this.assertEquals( system.logging.LoggerLevel.WARN, new system.logging.LoggerLevel( 6 , "WARN" ) , "system.logging.LoggerLevel.WARN failed.") ;
}

system.logging.LoggerLevelTest.prototype.testWTF = function () 
{
    this.assertEquals( system.logging.LoggerLevel.WTF, new system.logging.LoggerLevel( 32 , "WTF" ) , "system.logging.LoggerLevel.WTF failed.") ;
}

system.logging.LoggerLevelTest.prototype.testEquals = function () 
{
    var level = new system.logging.LoggerLevel(999999 , "test") ;
    this.assertTrue( level.equals( new system.logging.LoggerLevel(999999 , "test") ) , "equals method failed." ) ;
}

system.logging.LoggerLevelTest.prototype.testGetLevel = function () 
{
    this.assertEquals( system.logging.LoggerLevel.getLevel(  0 ) , system.logging.LoggerLevel.NONE  , "00 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel(  1 ) , system.logging.LoggerLevel.ALL   , "01 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel(  2 ) , system.logging.LoggerLevel.DEBUG , "02 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel(  4 ) , system.logging.LoggerLevel.INFO  , "05 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel(  6 ) , system.logging.LoggerLevel.WARN  , "06 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel(  8 ) , system.logging.LoggerLevel.ERROR , "07 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel( 16 ) , system.logging.LoggerLevel.FATAL , "08 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevel( 32 ) , system.logging.LoggerLevel.WTF   , "09 - system.logging.LoggerLevel.getLevel failed." ) ;
    this.assertNull( system.logging.LoggerLevel.getLevel( 10 ) , "07 - system.logging.LoggerLevel.getLevel failed must returns null with an unknow value."  ) ;
}

system.logging.LoggerLevelTest.prototype.testGetLevelString = function () 
{
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.ALL   ) , "ALL"   , "01 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.DEBUG ) , "DEBUG" , "02 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.ERROR ) , "ERROR" , "03 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.FATAL ) , "FATAL" , "04 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.INFO  ) , "INFO"  , "05 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.WARN  ) , "WARN"  , "06 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( system.logging.LoggerLevel.WTF   ) , "WTF"   , "07 - LoggerEvent.getLevelString() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.getLevelString( new system.logging.LoggerLevel(55,"TEST") )  , "UNKNOWN" , "07 - LoggerEvent.getLevelString() failed." ) ;
}

system.logging.LoggerLevelTest.prototype.testIsValidLevel = function () 
{
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.NONE  ) , "00 - system.logging.LoggerLevel.NONE is invalid"   ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.ALL   ) , "01 - system.logging.LoggerLevel.ALL is invalid"   ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.DEBUG ) , "02 - system.logging.LoggerLevel.DEBUG is invalid" ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.ERROR ) , "03 - system.logging.LoggerLevel.ERROR is invalid" ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.FATAL ) , "04 - system.logging.LoggerLevel.FATAL is invalid" ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.INFO  ) , "05 - system.logging.LoggerLevel.INFO is invalid"  ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.WARN  ) , "06 - system.logging.LoggerLevel.WARN is invalid"  ) ;
    this.assertTrue( system.logging.LoggerLevel.isValidLevel( system.logging.LoggerLevel.WTF   ) , "07 - system.logging.LoggerLevel.WTF is invalid"  ) ;
    this.assertFalse( system.logging.LoggerLevel.isValidLevel( new system.logging.LoggerLevel(55,"TEST") ) , "07 - Custom system.logging.LoggerLevel is invalid"  ) ;
}

system.logging.LoggerLevelTest.prototype.testToSource = function () 
{
    this.assertEquals( system.logging.LoggerLevel.NONE.toSource()  , "system.logging.LoggerLevel.NONE"  , "00 - LoggerLevel.NONE toSource() failed."   ) ;
    this.assertEquals( system.logging.LoggerLevel.ALL.toSource()   , "system.logging.LoggerLevel.ALL"   , "01 - LoggerLevel.ALL toSource() failed."   ) ;
    this.assertEquals( system.logging.LoggerLevel.DEBUG.toSource() , "system.logging.LoggerLevel.DEBUG" , "02 - LoggerLevel.DEBUG toSource() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.ERROR.toSource() , "system.logging.LoggerLevel.ERROR" , "03 - LoggerLevel.ERROR toSource() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.FATAL.toSource() , "system.logging.LoggerLevel.FATAL" , "04 - LoggerLevel.FATAL toSource() failed." ) ;
    this.assertEquals( system.logging.LoggerLevel.INFO.toSource()  , "system.logging.LoggerLevel.INFO"  , "05 - LoggerLevel.INFO toSource() failed."  ) ;
    this.assertEquals( system.logging.LoggerLevel.WARN.toSource()  , "system.logging.LoggerLevel.WARN"  , "06 - LoggerLevel.WARN toSource() failed."  ) ;
    this.assertEquals( system.logging.LoggerLevel.WTF.toSource()   , "system.logging.LoggerLevel.WTF"   , "07 - LoggerLevel.WTF toSource() failed."  ) ;
}
