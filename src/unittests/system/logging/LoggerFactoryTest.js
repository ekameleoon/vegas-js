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

system.logging.LoggerFactoryTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.logging.LoggerFactoryTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.logging.LoggerFactoryTest.prototype.constructor = system.logging.LoggerFactoryTest ;

proto = system.logging.LoggerFactoryTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.factory = new system.logging.LoggerFactory() ;
}

proto.tearDown = function()
{
    this.factory = undefined ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.factory) ; 
}

proto.testGetLogger = function () 
{
    var logger1 = this.factory.getLogger("channel1") ;
    var logger2 = this.factory.getLogger("channel1") ;
    var logger3 = this.factory.getLogger("channel2") ;
    this.assertEquals( logger1 , logger2 , "The getLogger() method failed." ) ;
    this.assertNotSame( logger1 , logger3 , "The getLogger() method failed." ) ;
}

proto.testGetLoggerWithNullChannel = function () 
{
    try
    {
        this.factory.getLogger( null ) ;
        this.fail("01 - The getLogger() method must throw an InvalidChannelError error.") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof system.errors.InvalidChannelError , "02 - The getLogger() method must throw an InvalidChannelError error.") ;
        this.assertEquals( e.message , "Channels must be at least one character in length." , "03 - The getLogger() method must throw an InvalidChannelError error." ) ;
    }
}

proto.testGetLoggerWithEmptyChannel = function () 
{
    try
    {
        this.factory.getLogger( "" ) ;
        this.fail("01 - The getLogger() method must throw an InvalidChannelError error.") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof system.errors.InvalidChannelError , "02 - The getLogger() method must throw an InvalidChannelError error.") ;
        this.assertEquals( e.message , "Channels must be at least one character in length." , "03 - The getLogger() method must throw an InvalidChannelError error." ) ;
    }
}

proto.testGetLoggerWithIllegalCharacters = function () 
{
    var chars /*String*/ = system.logging.LoggerStrings.ILLEGALCHARACTERS ;
    var a /*Array*/      = chars.split("") ;
    var l /*int*/        = a.length ;
    while( --l > -1 ) 
    {
        this._isIllegalCharacters( a[l] ) ;
    }
}

proto.testGetLoggerWithWildCard = function () 
{
    try
    {
        this.factory.getLogger( "*" ) ;
        this.fail("01 - The getLogger() method must throw an InvalidChannelError error.") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof system.errors.InvalidChannelError , "02 - The getLogger() method must throw an InvalidChannelError error.") ;
        this.assertEquals( e.message , "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" , "03 - The getLogger() method must throw an InvalidChannelError error." ) ;
    }
}

// TODO More unit tests

//////// private

proto._isIllegalCharacters = function ( c /*String*/ ) /*void*/
{
    try
    {
        this.factory.getLogger( c ) ;
        this.fail("The getLogger() method must throw an InvalidChannelError error with the character : " + c ) ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof system.errors.InvalidChannelError , "02 - The getLogger() method must throw an InvalidChannelError error with the character : " + c ) ;
        this.assertEquals( e.message , "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" , "03 - The getLogger() method must throw an InvalidChannelError error with the character : " + c ) ;
    }
}

///////

delete proto ;