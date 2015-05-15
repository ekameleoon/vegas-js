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

system.events.CoreEventDispatcherTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this, name ) ;
}

// ----o Inherit

system.events.CoreEventDispatcherTest.prototype = new buRRRn.ASTUce.TestCase() ;
system.events.CoreEventDispatcherTest.prototype.constructor = system.events.CoreEventDispatcherTest ;

proto = system.events.CoreEventDispatcherTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    // 
}

proto.tearDown = function()
{
    system.events.EventDispatcher.flush() ;
}


// ----o Public Methods

proto.testConstructor = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    this.assertNotNull( dispatcher ) ;
}

proto.testInherit = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    this.assertTrue( dispatcher instanceof system.events.IEventDispatcher ) ;
}

proto.testToSource = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    this.assertEquals( dispatcher.toSource() , "new system.events.CoreEventDispatcher()" ) ;
}

proto.testToString = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    this.assertEquals( "[CoreEventDispatcher]", dispatcher.toString() ) ;
}

proto.testAddEventListener = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    
    var listener = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    this.assertTrue( dispatcher.hasEventListener( "type" ) ) ;
    this.assertTrue( "type" , dispatcher.getRegisteredTypes()[0] ) ;
}

proto.testAddGlobalEventListener = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addGlobalEventListener( listener ) ;
    
    var listeners = dispatcher.getGlobalEventListeners() ;
    
    this.assertEquals( 1 , listeners.length ) ;
}

proto.testRemoveEventListener = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    
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
    var dispatcher = new system.events.CoreEventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addGlobalEventListener( listener ) ;
    dispatcher.removeGlobalEventListener( listener ) ;
    
    var listeners = dispatcher.getGlobalEventListeners() ;
    
    this.assertEquals( 0 , listeners.length ) ;
}

proto.testDispatchEvent = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    var event      = new system.events.Event( "type" , dispatcher , "context" ) ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    dispatcher.dispatchEvent( event ) ;
    
    this.assertEquals( event      , listener.event        , "#1" ) ;
    this.assertEquals( "type"     , listener.event.type   , "#2" ) ;
    this.assertEquals( dispatcher.getEventDispatcher() , listener.event.target , "#3" ) ;
}

proto.testGetEventListeners = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    
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
    var dispatcher = new system.events.CoreEventDispatcher() ;
    
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
    var dispatcher = new system.events.CoreEventDispatcher() ;
    
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

proto.testParent = function () 
{
    var d1 = new system.events.CoreEventDispatcher() ;
    var d2 = new system.events.CoreEventDispatcher() ;
    d2.parent = d1 ;
    this.assertTrue( d2.parent == d1 ) ;
}

proto.testHasEventListener = function () 
{
    var dispatcher = new system.events.CoreEventDispatcher() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    dispatcher.addEventListener( "type" , listener ) ;
    
    this.assertTrue( dispatcher.hasEventListener("type") ) ;
    
    this.assertFalse( dispatcher.hasEventListener("unknow") ) ;
}
// ----o Encapsulate

delete proto ;
