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

system.events.EventListenerBatchTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.events.EventListenerBatchTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.events.EventListenerBatchTest.prototype.constructor = system.events.EventListenerBatchTest ;

proto = system.events.EventListenerBatchTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    var EventListener = system.events.EventListener ;
    
    this.listener1 = new system.events.mocks.MockEventListener() ;
    this.listener2 = new system.events.mocks.MockEventListener() ;
    this.listener3 = new system.events.mocks.MockEventListener() ;
    this.listener4 = new system.events.mocks.MockEventListener() ;
    
    this.batch = new system.events.EventListenerBatch( [this.listener1,this.listener2] ) ;
    
    this.batch.add( this.listener3 ) ;
    this.batch.add( this.listener4 ) ;
}

proto.tearDown = function()
{
    this.listener1 = undefined ;
    this.listener2 = undefined ;
    this.listener3 = undefined ;
    this.listener4 = undefined ;
    
    this.batch = undefined ;
}

// ----o Tests

proto.testConstructor = function () 
{
    this.assertNotNull( this.batch ) ;
}

proto.testInherit = function () 
{
    this.assertTrue( this.batch instanceof system.events.EventListener ) ;
}

proto.testAdd = function () 
{
    var EventListener = system.events.EventListener ;
    
    this.assertTrue( this.batch.add( new EventListener() ) , "#1" ) ;
    
    var listener = {} ;
    listener.handleEvent = function() {} ;
    
    this.assertFalse( this.batch.add( listener ) , "#2" ) ;
    
    this.assertFalse( this.batch.add( 2 ) ) ;
    
    this.assertFalse( this.batch.add( "hello world" ) ) ;
}

proto.testClear = function () 
{
    this.batch.clear() ;
    this.assertEquals( this.batch.size() , 0 ) ;
}

proto.testClone = function () 
{
    var clone = this.batch.clone() ;
    this.assertNotNull( clone , "#1" ) ;
    this.assertNotSame( clone , this.batch , "#2" ) ;
    this.assertEquals( clone.size() , this.batch.size() , "#3" ) ;
}

proto.testContains = function () 
{
    var EventListener = system.events.EventListener ;
    
    this.assertTrue( this.batch.contains( this.listener1 ) ) ;
    this.assertTrue( this.batch.contains( this.listener2 ) ) ;
    this.assertTrue( this.batch.contains( this.listener3 ) ) ;
    this.assertTrue( this.batch.contains( this.listener4 ) ) ;
    
    this.assertFalse( this.batch.contains( null ) ) ;
    this.assertFalse( this.batch.contains( "hello" ) ) ;
    this.assertFalse( this.batch.contains( new EventListener() ) ) ;
}

proto.testGet = function () 
{
    this.assertEquals( this.batch.get(0) , this.listener1 ) ;
    this.assertEquals( this.batch.get(1) , this.listener2 ) ;
    this.assertEquals( this.batch.get(2) , this.listener3 ) ;
    this.assertEquals( this.batch.get(3) , this.listener4 ) ;
    
    this.assertUndefined( this.batch.get(4) ) ;
    this.assertUndefined( this.batch.get(null) ) ;
    this.assertUndefined( this.batch.get("hello") ) ;
}

proto.testHandleEvent = function () 
{
    var MockEventListener = system.events.mocks.MockEventListener ;
    MockEventListener.reset() ;
    var event = new system.events.Event( "test" ) ;
    this.batch.handleEvent( event ) ;
    this.assertEquals( MockEventListener.COUNT , this.batch.size() ) ;
}

proto.testIndexOf = function () 
{
    var EventListener = system.events.EventListener ;
    
    this.assertEquals( 0 , this.batch.indexOf( this.listener1 ) ) ;
    this.assertEquals( 1 , this.batch.indexOf( this.listener2 ) ) ;
    this.assertEquals( 2 , this.batch.indexOf( this.listener3 ) ) ;
    this.assertEquals( 3 , this.batch.indexOf( this.listener4 ) ) ;
    
    this.assertEquals(  2 , this.batch.indexOf( this.listener3 , 1 ) ) ;
    this.assertEquals(  2 , this.batch.indexOf( this.listener3 , 2 ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( this.listener3 , 3 ) ) ;
    
    this.assertEquals( -1 , this.batch.indexOf( null ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( "hello" ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( new EventListener() ) ) ;
}

proto.testIsEmpty = function () 
{
    this.assertFalse( this.batch.isEmpty() ) ;
    this.batch.clear() ;
    this.assertTrue( this.batch.isEmpty() ) ;
}

proto.testIterator = function () 
{
   var it = this.batch.iterator() ;
   this.assertTrue( it instanceof system.data.iterators.ArrayIterator ) ;
   this.assertTrue( it.hasNext() ) ;
   this.assertEquals( this.listener1 , it.next() ) ;
   this.assertEquals( this.listener2 , it.next() ) ;
   this.assertEquals( this.listener3 , it.next() ) ;
   this.assertEquals( this.listener4 , it.next() ) ;
}

proto.testRemove = function () 
{
    this.assertTrue( this.batch.remove( this.listener1 ) ) ;
    this.assertFalse( this.batch.remove( this.listener1 ) ) ;
    this.assertEquals( 3 , this.batch.size() ) ;
}

proto.testSize = function () 
{
    this.assertEquals( this.batch.size() , 4 ) ;
    this.batch.clear() ;
    this.assertEquals( this.batch.size() , 0 ) ;
}

proto.testToArray = function () 
{
    var ar = this.batch.toArray() ;
    this.assertTrue( ar instanceof Array ) ;
    this.assertEquals( 4 , ar.length ) ;
    this.assertEquals( this.listener1 , ar[0] ) ;
    this.assertEquals( this.listener2 , ar[1] ) ;
    this.assertEquals( this.listener3 , ar[2] ) ;
    this.assertEquals( this.listener4 , ar[3] ) ;
}

proto.testToSource = function () 
{
    this.assertEquals( "new system.events.EventListenerBatch([new system.events.mocks.MockEventListener(),new system.events.mocks.MockEventListener(),new system.events.mocks.MockEventListener(),new system.events.mocks.MockEventListener()])" , this.batch.toSource() ) ;
}

proto.testToString = function () 
{
    this.assertEquals( "{[MockEventListener],[MockEventListener],[MockEventListener],[MockEventListener]}" , this.batch.toString() ) ;
    this.batch.clear() ;
    this.assertEquals( "{}" , this.batch.toString() ) ;
}

////////

delete proto ;