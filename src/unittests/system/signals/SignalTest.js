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

system.signals.SignalTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.signals.SignalTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.signals.SignalTest.prototype.constructor = system.signals.SignalTest ;

// ----o Public Methods

system.signals.SignalTest.prototype.setUp = function()
{
    this.signal     = new system.signals.Signal() ;
    
    this.receiver1  = function( message ) 
    { 
        throw message ;
    };
    
    this.receiver2 = new system.signals.samples.ReceiverClass() ;
    
    this.receiver3 = {} ;
    this.receiver3.receive = function( message )
    {
        throw message ;
    }
}

system.signals.SignalTest.prototype.tearDown = function()
{
    this.signal    = undefined ;
    this.receiver1 = undefined ;
    this.receiver2 = undefined ;
    this.receiver3 = undefined ;
}

system.signals.SignalTest.prototype.testInterface = function () 
{
    this.assertTrue( this.signal instanceof system.signals.Signaler ) ; 
}

system.signals.SignalTest.prototype.testConstructor = function () 
{
    this.assertNotNull( this.signal ) ; 
}

system.signals.SignalTest.prototype.testConstructorWithTypes = function () 
{
    this.assertNull( this.signal.types , "01" ) ;
    
    this.signal = new system.signals.Signal([]) ;
    this.assertNotNull( this.signal.types , "02") ;
    
    this.signal = new system.signals.Signal([String,Boolean,Number]) ;
    this.assertEquals( String  , this.signal.types[0] , "03-01" ) ;
    this.assertEquals( Boolean , this.signal.types[1] , "03-02" ) ;
    this.assertEquals( Number  , this.signal.types[2] , "03-03" ) ;
}

system.signals.SignalTest.prototype.testConstructorWithBadTypes = function () 
{
    try
    {
        this.signal = new system.signals.Signal([String,"hello",Number]) ;
        this.fail( "The constructor must notify an error with a no valid Class reference in the types Array") ;
    }
    catch( e )
    {
        this.assertEquals( "Invalid types representation, the Array of types failed at index 1 should be a constructor function but was:\"hello\"." , e.message ) ;
    }
}

system.signals.SignalTest.prototype.testLength = function()
{
    this.assertEquals( this.signal.length , 0 , "01 - length failed.") ;
    this.signal.connect( this.receiver1 ) ;
    this.assertEquals( this.signal.length , 1 , "02 - length failed.") ;
    this.signal.connect( this.receiver2 ) ;
    this.assertEquals( this.signal.length , 2 , "03 - length failed.") ;
    this.signal.connect( this.receiver2 ) ;
    this.assertEquals( this.signal.length , 2 , "04 - length failed.") ;
    
    this.assertTrue( this.signal.connect( this.receiver3 ) ,  "05 - length failed." ) ;
    this.assertEquals( this.signal.length , 3 , "06 - length failed.") ;
}

system.signals.SignalTest.prototype.testTypes = function()
{
    this.signal.types = null ;
    this.assertNull( this.signal.types , "01" ) ;
    
    this.signal.types = [] ;
    this.assertNotNull( this.signal.types , "02-01" ) ;
    this.assertEquals( this.signal.types.length , 0 , "02-02" ) ;
    
    this.signal.types = [String,Number,String] ;
    this.assertEquals( this.signal.types[0] , String , "03-01" ) ;
    this.assertEquals( this.signal.types[1] , Number , "03-01" ) ;
    this.assertEquals( this.signal.types[2] , String , "03-01" ) ;
}

system.signals.SignalTest.prototype.testBadTypes = function()
{
    try
    {
        this.signal.types = [String,"hello",Number] ;
        this.fail( "The constructor must notify an error with a no valid Class reference in the types Array") ;
    }
    catch( e /*Error*/ )
    {
        this.assertEquals( "Invalid types representation, the Array of types failed at index 1 should be a constructor function but was:\"hello\"." , e.message ) ;
    }
}

system.signals.SignalTest.prototype.testConnect = function()
{
    this.assertTrue( this.signal.connect( this.receiver1 ) , "01 - The connect method failed.") ;
    this.assertFalse( this.signal.connect( this.receiver1 ) , "02 - The connect method failed.") ;
}

system.signals.SignalTest.prototype.testConnectReceiver = function()
{
    this.assertTrue( this.signal.connect( this.receiver2 ) , "01 - The connect method failed.") ;
    this.assertFalse( this.signal.connect( this.receiver2 ) , "02 - The connect method failed.") ;
}

system.signals.SignalTest.prototype.testConnectObjectWithReceiveMethod = function()
{
    this.assertTrue( this.signal.connect( this.receiver3 ) , "01 - The connect method failed.") ;
    this.assertFalse( this.signal.connect( this.receiver3 ) , "02 - The connect method failed.") ;
}

system.signals.SignalTest.prototype.testConnectWithPriority = function()
{
    var receiver1 = new system.signals.samples.ReceiverClass("#1") ;
    var receiver2 = new system.signals.samples.ReceiverClass("#2") ;
    var receiver3 = new system.signals.samples.ReceiverClass("#3") ;
    var receiver4 = new system.signals.samples.ReceiverClass("#4") ;
    
    this.signal.connect( receiver1 , 400 ) ;
    this.signal.connect( receiver2 , 499 ) ;
    this.signal.connect( receiver3 , 1 ) ;
    this.signal.connect( receiver4 , 4 ) ;
    
    var ar = this.signal.toArray() ;
    
    this.assertEquals( ar[0] , receiver2 ) ;
    this.assertEquals( ar[1] , receiver1 ) ;
    this.assertEquals( ar[2] , receiver4 ) ;
    this.assertEquals( ar[3] , receiver3 ) ;
}

system.signals.SignalTest.prototype.testConnected = function()
{
    this.assertFalse( this.signal.connected() ) ;
    this.signal.connect( this.receiver1 ) ;
    this.assertTrue( this.signal.connected() ) ;
}

system.signals.SignalTest.prototype.testDisconnect = function()
{
    this.signal.connect( this.receiver1 ) ;
    this.assertTrue( this.signal.disconnect( this.receiver1 ) , "01 - The disconnect method failed.") ;
    this.assertFalse( this.signal.disconnect( this.receiver1 ) , "02 - The disconnect method failed.") ;
}

system.signals.SignalTest.prototype.testDisconnectReceiver = function()
{
    this.signal.connect( this.receiver2 ) ;
    this.assertTrue( this.signal.disconnect( this.receiver2 ) , "01 - The disconnect method failed.") ;
    this.assertFalse( this.signal.disconnect( this.receiver2 ) , "02 - The disconnect method failed.") ;
}

system.signals.SignalTest.prototype.testDisconnectObjectWithReceiveMethod = function()
{
    this.signal.connect( this.receiver3 ) ;
    this.assertTrue( this.signal.hasReceiver( this.receiver3 ) , "00 - The disconnect method failed.") ;
    this.assertTrue( this.signal.disconnect( this.receiver3 ) , "01 - The disconnect method failed.") ;
    this.assertFalse( this.signal.disconnect( this.receiver3 ) , "02 - The disconnect method failed.") ;
}

system.signals.SignalTest.prototype.testEmit = function()
{
    this.signal.connect( this.receiver1 ) ;
    try
    {
        this.signal.emit("hello world") ;
        this.fail( "The signal must emit a message" ) ;
    }
    catch( message )
    {
        this.assertEquals( "hello world" , message ) ;
    }
}

system.signals.SignalTest.prototype.testEmitReceiver = function()
{
    this.signal.connect( this.receiver2 ) ;
    try
    {
        this.signal.emit("hello world") ;
        this.fail( "The signal must emit a message" ) ;
    }
    catch( message )
    {
        this.assertEquals( "hello world" , message ) ;
    }
}

system.signals.SignalTest.prototype.testEmitWithObjectAndReceiveMethod = function()
{
    this.signal.connect( this.receiver3 ) ;
    try
    {
        this.signal.emit("hello world") ;
        this.fail( "The signal must emit a message" ) ;
    }
    catch( message )
    {
        this.assertEquals( "hello world" , message ) ;
    }
}

system.signals.SignalTest.prototype.testHasReceiver = function()
{
    this.assertFalse( this.signal.hasReceiver( this.receiver1 ) , "01 - The hasReceiver method failed.") ;
    this.signal.connect( this.receiver1 ) ;
    this.assertTrue( this.signal.hasReceiver( this.receiver1 ) , "02 - The hasReceiver method failed.") ;
    this.signal.disconnect() ;
    this.assertFalse( this.signal.hasReceiver( this.receiver1 ) , "03 - The hasReceiver method failed.") ;
}

system.signals.SignalTest.prototype.testHasReceiverWithReceiver = function()
{
    this.assertFalse( this.signal.hasReceiver( this.receiver2 ) , "01 - The hasReceiver method failed.") ;
    this.signal.connect( this.receiver2 ) ;
    this.assertTrue( this.signal.hasReceiver( this.receiver2 ) , "02 - The hasReceiver method failed.") ;
    this.signal.disconnect() ;
    this.assertFalse( this.signal.hasReceiver( this.receiver2 ) , "03 - The hasReceiver method failed.") ;
}

system.signals.SignalTest.prototype.testHasReceiverWithObjectAndReceiveMethod = function()
{
    this.assertFalse( this.signal.hasReceiver( this.receiver3 ) , "01 - The hasReceiver method failed.") ;
    this.signal.connect( this.receiver3 ) ;
    this.assertTrue( this.signal.hasReceiver( this.receiver3 ) , "02 - The hasReceiver method failed.") ;
    this.signal.disconnect() ;
    this.assertFalse( this.signal.hasReceiver( this.receiver3 ) , "03 - The hasReceiver method failed.") ;
}

system.signals.SignalTest.prototype.testToArray = function()
{
    this.signal.connect( this.receiver1 , 0 ) ;
    this.signal.connect( this.receiver2 , 0  ) ;
    this.signal.connect( this.receiver3 , 0  ) ;
    
    var ar = this.signal.toArray() ;
    
    this.assertEquals( ar[0] , this.receiver1 ) ;
    this.assertEquals( ar[1] , this.receiver2 ) ;
    this.assertEquals( ar[2] , this.receiver3 ) ;
}

system.signals.SignalTest.prototype.testToString = function()
{
    this.assertEquals( this.signal.toString() , "[Signal]" ) ;
}