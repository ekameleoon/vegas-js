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

system.logging.LoggerTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.logging.LoggerTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.logging.LoggerTest.prototype.constructor = system.logging.LoggerTest ;

// ----o Public Methods

system.logging.LoggerTest.prototype.setUp = function()
{
    this.logger   = new system.logging.Logger( "channel" ) ;
    this.listener = new system.logging.mocks.LoggerReceiver( this.logger ) ;
}

system.logging.LoggerTest.prototype.tearDown = function()
{
    this.logger   = undefined ;
    this.listener = undefined ;
}

system.logging.LoggerTest.prototype.testConstructor = function () 
{
    this.assertNotNull( this.logger ) ; 
}

system.logging.LoggerTest.prototype.testInherit = function () 
{
    this.assertTrue( this.logger instanceof system.signals.Signal ) ; 
}

system.logging.LoggerTest.prototype.testChannel = function () 
{
    this.assertEquals( "channel" , this.logger.getChannel() ) ; 
    this.assertEquals( "channel" , this.logger.channel ) ; 
}

system.logging.LoggerTest.prototype.testLog = function () 
{
    this.logger.log( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.ALL , "04" );
}

system.logging.LoggerTest.prototype.testDebug = function () 
{
    this.logger.debug( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.DEBUG , "04" );
}

system.logging.LoggerTest.prototype.testError = function () 
{
    this.logger.error( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.ERROR , "04" );
}

system.logging.LoggerTest.prototype.testFatal = function () 
{
    this.logger.fatal( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.FATAL , "04" );
}

system.logging.LoggerTest.prototype.testInfo = function () 
{
    this.logger.info( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.INFO , "04" );
}

system.logging.LoggerTest.prototype.testWarn = function () 
{
    this.logger.warn( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.WARN , "04" );
}

system.logging.LoggerTest.prototype.testWtf = function () 
{
    this.logger.wtf( "hello {0}" , "world" ) ;
    this.assertTrue( this.listener.called    , "01" ) ;
    this.assertEquals( this.listener.channel , "channel" , "02" ) ;
    this.assertEquals( this.listener.message , "hello world"     , "03" );
    this.assertEquals( this.listener.level   , system.logging.LoggerLevel.WTF , "04" );
}