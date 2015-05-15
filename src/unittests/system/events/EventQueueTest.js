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

system.events.EventQueueTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.events.EventQueueTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.events.EventQueueTest.prototype.constructor = system.events.EventQueueTest ;

proto = system.events.EventQueueTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var queue = new system.events.EventQueue() ;
    this.assertNotNull( queue ) ; 
}

proto.testClear = function () 
{
    var queue = new system.events.EventQueue() ;
    queue.enqueue( new system.events.Event("type") ) ;
    queue.clear() ;
    this.assertEquals(0, queue.size()) ;
}

proto.testEnqueue = function () 
{
    var queue = new system.events.EventQueue() ;
    
    this.assertTrue( queue.enqueue( new system.events.Event("type") ) ) ;
    this.assertFalse( queue.enqueue( "type" ) ) ;
}


proto.testGetQueuedEvents = function () 
{
    var Event = system.events.Event ;
    
    var eq = new system.events.EventQueue() ;
    
    var event1 = new Event("type1") ;
    var event2 = new Event("type1") ;
    var event3 = new Event("type2") ;
    var event4 = new Event("type2") ;
    
    eq.enqueue( event1 ) ;
    eq.enqueue( event2 ) ;
    eq.enqueue( event3 ) ;
    eq.enqueue( event4 ) ;
    
    //////
    
    queue = eq.getQueuedEvents( "type1" ) ;
    
    this.assertTrue( queue instanceof system.data.queues.LinearQueue ) ;
    this.assertEquals( 2 , queue.size() ) ;
    this.assertEquals( event1 , queue.poll() ) ;
    this.assertEquals( event2 , queue.poll() ) ;
    
    //////
    
    queue = eq.getQueuedEvents( "type2" ) ;
    
    this.assertTrue( queue instanceof system.data.queues.LinearQueue ) ;
    this.assertEquals( 2 , queue.size() ) ;
    this.assertEquals( event3 , queue.poll() ) ;
    this.assertEquals( event4 , queue.poll() ) ;
    
    //////
    
    queue = eq.getQueuedEvents( null ) ;
    
    this.assertTrue( queue instanceof system.data.queues.LinearQueue ) ;
    
    this.assertEquals( 4 , queue.size() ) ;
    
    this.assertEquals( event1 , queue.poll() ) ;
    this.assertEquals( event2 , queue.poll() ) ;
    this.assertEquals( event3 , queue.poll() ) ;
    this.assertEquals( event4 , queue.poll() ) ;
    
    this.assertEquals( 0 , eq.size() ) ; 
}

proto.testSize = function () 
{
    var queue = new system.events.EventQueue() ;
    
    this.assertEquals( 0 , queue.size() ) ;
    
    queue.enqueue( new system.events.Event("type") ) ;
    
    this.assertEquals( 1 , queue.size() ) ; 
}

delete proto ;