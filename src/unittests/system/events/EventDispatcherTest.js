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

// ---o Constructor

system.events.EventDispatcherTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this, name ) ;
}

// ----o Inherit

system.events.EventDispatcherTest.prototype = new buRRRn.ASTUce.TestCase() ;
system.events.EventDispatcherTest.prototype.constructor = system.events.EventDispatcherTest ;

proto = system.events.EventDispatcherTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    this.assertNotNull( dispatcher ) ;
}

proto.testInherit = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    this.assertTrue( dispatcher instanceof system.events.IEventDispatcher ) ;
}

proto.testToSource = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    this.assertEquals( dispatcher.toSource() , "new system.events.EventDispatcher()" ) ;
}

proto.testToString = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    this.assertEquals( "[EventDispatcher]", dispatcher.toString() ) ;
}

proto.testChild = function () 
{
    var d1 = new system.events.EventDispatcher() ;
    var d2 = new system.events.EventDispatcher() ;
    
    d1.addChild(d2) ;
    
    this.assertEquals( d2.parent , d1 ) ;
    
    d1.removeChild( d2 ) ;
    
    this.assertNull( d2.parent ) ;
}

proto.testAddEventListener = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    var listener = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    this.assertTrue( dispatcher.hasEventListener( "type" ) ) ;
    this.assertTrue( "type" , dispatcher.getRegisteredTypes()[0] ) ;
}

proto.testAddGlobalEventListener = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addGlobalEventListener( listener ) ;
    
    var listeners = dispatcher.getGlobalEventListeners() ;
    
    this.assertEquals( 1 , listeners.length ) ;
}

proto.testRemoveEventListener = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    var listener1 = new system.events.mocks.MockEventListener() ;
    var listener2 = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type" , listener1 ) ;
    dispatcher.addEventListener( "type" , listener2 ) ;
    
    dispatcher.removeEventListener( "type" , listener1 ) ;
    
    this.assertTrue( dispatcher.hasEventListener( "type" ) ) ;
    
    dispatcher.removeEventListener( "type" , listener2 ) ;
    
    this.assertFalse( dispatcher.hasEventListener( "type" ) ) ;
}

proto.testRemoveGlobalEventListener = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addGlobalEventListener( listener ) ;
    dispatcher.removeGlobalEventListener( listener ) ;
    
    var listeners = dispatcher.getGlobalEventListeners() ;
    
    this.assertEquals( 0 , listeners.length ) ;
}

proto.testDispatchEvent = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    var event      = new system.events.Event( "type" , dispatcher , "context" ) ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    dispatcher.dispatchEvent( event ) ;
    
    this.assertEquals( event      , listener.event ) ;
    this.assertEquals( "type"     , listener.event.type   ) ;
    this.assertEquals( dispatcher , listener.event.target ) ;
}

proto.testGetEventListeners = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    var listener1   = new system.events.mocks.MockEventListener() ;
    var listener2   = new system.events.mocks.MockEventListener() ;
    var listener3   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type1" , listener1 ) ;
    dispatcher.addEventListener( "type1" , listener2 ) ;
    dispatcher.addEventListener( "type2" , listener3 ) ;
    
    var listeners /*Array*/ ;
    
    listeners = dispatcher.getEventListeners( "type1" ) ;
    this.assertTrue( listeners instanceof Array ) ;
    this.assertEquals( 2 , listeners.length ) ;
    this.assertTrue( listener1 == listeners[0] ) ;
    this.assertTrue( listener2 == listeners[1] ) ;
    
    listeners = dispatcher.getEventListeners( "type2" ) ;
    this.assertTrue( listeners instanceof Array ) ;
    this.assertEquals( 1 , listeners.length ) ;
    this.assertTrue( listener3 == listeners[0] ) ;
    
    listeners = dispatcher.getEventListeners( "type3" ) ;
    this.assertTrue( listeners instanceof Array ) ;
    this.assertEquals( 0 , listeners.length ) ;
}

proto.testGetGlobalEventListeners = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    var listener1   = new system.events.mocks.MockEventListener() ;
    var listener2   = new system.events.mocks.MockEventListener() ;
    var listener3   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addGlobalEventListener( listener1 ) ;
    dispatcher.addGlobalEventListener( listener2 ) ;
    dispatcher.addGlobalEventListener( listener3 ) ;
    
    var listeners /*Array*/ = dispatcher.getGlobalEventListeners() ;
    
    this.assertTrue( listeners instanceof Array ) ;
    this.assertEquals( 3 , listeners.length ) ;
    this.assertTrue( listener1 == listeners[0] ) ;
    this.assertTrue( listener2 == listeners[1] ) ;
    this.assertTrue( listener3 == listeners[2] ) ;
}

proto.testGetRegisteredTypes = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    var listener1   = new system.events.mocks.MockEventListener() ;
    var listener2   = new system.events.mocks.MockEventListener() ;
    var listener3   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type1" , listener1 ) ;
    dispatcher.addEventListener( "type1" , listener2 ) ;
    dispatcher.addEventListener( "type2" , listener3 ) ;
    
    var types /*Array*/ = dispatcher.getRegisteredTypes() ;
    
    this.assertEquals( 2 , types.length ) ;
    this.assertTrue( "type1" == types[0] ) ;
    this.assertTrue( "type2" == types[1] ) ;
}

proto.testGetTarget = function () 
{
    var dispatcher1 = new system.events.EventDispatcher() ;
    
    var dispatcher2 = new system.events.EventDispatcher( dispatcher1 ) ;
    
    this.assertTrue( dispatcher2.getTarget() == dispatcher1 ) ;
    this.assertTrue( dispatcher2.target      == dispatcher1 ) ;
}

proto.testParent = function () 
{
    var d1 = new system.events.EventDispatcher() ;
    var d2 = new system.events.EventDispatcher() ;
    d2.parent = d1 ;
    this.assertTrue( d2.parent == d1 ) ;
}

proto.testName = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    
    this.assertNull( dispatcher.name ) ;
    
    dispatcher.name = "test" ;
    
    this.assertEquals( "test" , dispatcher.name ) ;
    this.assertEquals( "test" , dispatcher.getName() ) ;
}

proto.testHasEventListener = function () 
{
    var dispatcher = new system.events.EventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    this.assertTrue( dispatcher.hasEventListener("type") ) ;
    
    this.assertFalse( dispatcher.hasEventListener("unknow") ) ;
}

///////////

proto.testInstances = function () 
{
    this.assertTrue( system.events.EventDispatcher.instances instanceof system.data.maps.ArrayMap ) ;
}

proto.testNumInstances = function () 
{
    var EventDispatcher = system.events.EventDispatcher ;
    
    this.assertEquals( 0 , EventDispatcher.numInstances() ) ;
    
    EventDispatcher.getInstance() ;
    
    this.assertEquals( 1 , EventDispatcher.numInstances() ) ;
    
    EventDispatcher.flush() ;
    
    this.assertEquals( 0 , EventDispatcher.numInstances() ) ;
}

proto.testGetInstance = function () 
{
    var EventDispatcher = system.events.EventDispatcher ;
    
    var dispatcher1 = EventDispatcher.getInstance() ;
    this.assertTrue( "__default__" , dispatcher1.name , "#1" ) ;
    
    var dispatcher2 = EventDispatcher.getInstance() ;
    this.assertEquals( dispatcher1 , dispatcher2 , "#2" ) ;
    
    var dispatcher3 = EventDispatcher.getInstance("channel") ;
    this.assertTrue( "channel" , dispatcher3.name , "#1" ) ;
    
    EventDispatcher.flush() ;
}

proto.testFlush = function () 
{
    var EventDispatcher = system.events.EventDispatcher ;
    
    var dispatcher = EventDispatcher.getInstance() ;
    
    EventDispatcher.flush() ;
    
    this.assertEquals( 0 , EventDispatcher.numInstances() ) ;
}

/*

proto.testRelease = function () 
{
    try 
    {
        var ed = system.events.EventDispatcher.getInstance("myDispatcher") ;
        system.events.EventDispatcher.release("myDispatcher") ;
    }
    catch (e) 
    {
        this.fail( "ED_13 : static release method failed.") ;
    }
}

proto.testRemoveInstance = function () 
{
    system.events.EventDispatcher.getInstance("myDispatcher") ;
    
    var b = system.events.EventDispatcher.removeInstance("myDispatcher") ;
    
    this.assertTrue( b ) ;
}

*/
// ----o Encapsulate

delete proto ;
