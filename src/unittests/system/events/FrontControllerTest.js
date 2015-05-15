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

system.events.FrontControllerTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.events.FrontControllerTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.events.FrontControllerTest.prototype.constructor = system.events.FrontControllerTest ;

proto = system.events.FrontControllerTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    // 
}

proto.tearDown = function()
{
    system.events.EventDispatcher.flush() ;
    system.events.FrontController.flush() ;
}

// ----o Public Methods

proto.testConstructor = function () 
{
    var controller = new system.events.FrontController() ;
    this.assertEquals( controller.getEventDispatcher() , system.events.EventDispatcher.getInstance() ) ;
}

proto.testConstructorChannel = function()
{
    var controller = new system.events.FrontController("channel") ;
    this.assertEquals( controller.getEventDispatcher() , system.events.EventDispatcher.getInstance("channel") ) ;
}

proto.testConstructorBadChannel = function()
{
    var controller = new system.events.FrontController( 2 ) ;
    this.assertEquals( controller.getEventDispatcher() , system.events.EventDispatcher.getInstance() ) ;
}

proto.testConstructorTarget = function()
{
    var dispatcher = new system.events.EventDispatcher() ;
    var controller = new system.events.FrontController( null , dispatcher ) ;
    this.assertEquals( controller.getEventDispatcher() , dispatcher ) ;
}

proto.testAdd = function()
{
    var listener   = new system.events.mocks.MockEventListener() ;
    var controller = new system.events.FrontController() ;
    
    controller.add( "type", listener ) ;
    
    this.assertEquals( 1 , controller.size() , "#1" ) ;
    
    controller.add( "type", listener ) ;
    
    this.assertEquals( 1 , controller.size() , "#2" ) ;
}

proto.testAddTypeArgumentError = function()
{
    var controller = new system.events.FrontController() ;
    try
    {
        controller.add( null , null ) ;
        this.fail("#1");
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#2" ) ;
        this.assertEquals( "The FrontController add() method failed, the 'type' argument not must be null and must be a String." , e.message , "#3") ;
    }
}

proto.testAddEventListenerArgumentError = function()
{
    var controller = new system.events.FrontController() ;
    try
    {
        controller.add( "test" , null ) ;
        this.fail("#1");
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#2" ) ;
        this.assertEquals( "The FrontController add() method failed, the event type 'test' failed, the 'listener' argument not must be null." , e.message , "#3") ;
    }
}

proto.testAddBatch = function()
{
    var fc   = new system.events.FrontController() ;
    
    var l1 = new system.events.mocks.MockEventListener() ;
    var l2 = new system.events.mocks.MockEventListener() ;
    
    var event = new system.events.Event("type") ;
    
    fc.addBatch("type", l1) ;
    fc.addBatch("type", l2) ;
    
    fc.fireEvent( event ) ;
    
    this.assertEquals( 1 , fc.size() , "#1") ; 
    
    this.assertEquals( event , l1.event , "#2" ) ;
    this.assertEquals( event , l2.event , "#3" ) ;
}

proto.testAddBatchTypeArgumentError = function()
{
    var controller = new system.events.FrontController() ;
    try
    {
        controller.addBatch( null , null ) ;
        this.fail("#1");
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#2" ) ;
        this.assertEquals( "The FrontController addBatch() method failed, the 'type' argument not must be null and must be a String." , e.message , "#3") ;
    }
}

proto.testAddBatchEventListenerArgumentError = function()
{
    var controller = new system.events.FrontController() ;
    try
    {
        controller.addBatch( "test" , null ) ;
        this.fail("#1");
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#2" ) ;
        this.assertEquals( "The FrontController addBatch() method failed, the event type 'test' failed, the 'listener' argument not must be null." , e.message , "#3") ;
    }
}

proto.testClear = function()
{
    var fc   = new system.events.FrontController() ;
    
    var l1 = new system.events.mocks.MockEventListener() ;
    var l2 = new system.events.mocks.MockEventListener() ;
    
    var e1 = new system.events.Event("type1") ;
    var e2 = new system.events.Event("type2") ;
    
    fc.add("type1", l1) ;
    fc.add("type2", l2) ;
    
    this.assertEquals( 2 , fc.size() , "#1") ; 
    
    fc.clear();
    
    fc.fireEvent( e1 ) ;
    fc.fireEvent( e2 ) ;
    
    this.assertEquals( 0 , fc.size() , "#2") ; 
    
    this.assertNull( l1.event , "#3" ) ;
    this.assertNull( l2.event , "#4" ) ;
}

proto.testContains = function()
{
    var controller = new system.events.FrontController() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    
    controller.add( "type", listener ) ;
    
    this.assertTrue ( controller.contains("type")   , "#1") ;
    this.assertFalse( controller.contains("unknow") , "#2") ;
}

proto.testContainsInstance = function()
{
    var FrontController = system.events.FrontController ;
    
    this.assertFalse( FrontController.containsInstance("my_channel") , "#01" );
    
    FrontController.getInstance("my_channel1") ;
    this.assertTrue( FrontController.containsInstance("my_channel1") , "#02" );
    
    FrontController.getInstance("my_channel2") ;
    this.assertTrue( FrontController.containsInstance("my_channel2") , "#03" );
}

proto.testFireEvent = function()
{
    var controller = new system.events.FrontController() ;
    var listener   = new system.events.mocks.MockEventListener() ;
    var event      = new system.events.Event("type") ;
    
    controller.add( "type" , listener ) ;
    
    controller.fireEvent( event ) ;
    controller.fireEvent( event ) ;
    
    this.assertEquals( 2 , listener.count ) ;
}

proto.testFlush = function()
{
    var FrontController = system.events.FrontController ;
    
    FrontController.getInstance("my_channel1") ;
    FrontController.getInstance("my_channel2") ;
    
    FrontController.flush() ;
    
    this.assertFalse( FrontController.containsInstance("my_channel") , "#1" );
    this.assertFalse( FrontController.containsInstance("my_channe2") , "#2" );
}

proto.testGetChannels = function()
{
    var FrontController = system.events.FrontController ;
    
    this.assertNull( FrontController.getChannels() , "#1" ) ;
    
    FrontController.getInstance("channel1") ;
    FrontController.getInstance("channel2") ;
    
    var channels = FrontController.getChannels() ;
    this.assertNotNull( channels , "#2" ) ;
    this.assertEquals(  channels.length, 2 , "#3" ) ;
    this.assertEquals( channels[0] , "channel1" , "#4" ) ;
    this.assertEquals( channels[1] , "channel2" , "#5" ) ;
}

proto.testGetInstance = function()
{
    var EventDispatcher = system.events.EventDispatcher ;
    var FrontController = system.events.FrontController ;
    
    var f1 = FrontController.getInstance("channel1") ;
    
    this.assertEquals( f1.getEventDispatcher() , EventDispatcher.getInstance("channel1") , "#01") ;
    
    var f2 = FrontController.getInstance("channel1") ;
    
    this.assertEquals( f1 , f2 , "#02") ;
    
    var f3 = FrontController.getInstance("channel2") ;
    
    this.assertFalse( f1 == f3 , "#03") ;
}

proto.testGetInstanceWithANullArgument = function()
{
    var EventDispatcher = system.events.EventDispatcher ;
    var FrontController = system.events.FrontController ;
    
    var f1 = FrontController.getInstance() ;
    var f2 = FrontController.getInstance() ;
    
    this.assertEquals( f1.getEventDispatcher() , EventDispatcher.getInstance() , "#1" ) ;
    this.assertEquals( f1 , f2 , "#2") ;
}

proto.testGetListener = function()
{
    var f = new system.events.FrontController() ;
    var l = new system.events.mocks.MockEventListener() ;
    
    f.add( "type" , l ) ;
    
    this.assertEquals( f.getListener( "type" ) , l ) ; 
}

proto.testIsEventListenerBatch = function()
{
    var f = new system.events.FrontController() ;
    var l = new system.events.mocks.MockEventListener() ;
    
    f.addBatch("type", l) ;
    
    this.assertTrue( f.isEventListenerBatch("type"), "#1" ) ;
    this.assertFalse( f.isEventListenerBatch("unknow"), "#2" ) ;
}

proto.testRemove = function()
{
    var f = new system.events.FrontController() ;
    var l = new system.events.mocks.MockEventListener() ;
    
    f.add( "type" , l ) ;
    f.remove("type") ;
    
    f.fireEvent( new system.events.Event( "type" ) ) ;
    
    this.assertEquals( f.size() , 0 , "#1") ;
    
    this.assertNull( l.event , "#2") ;
}

proto.testRemoveInstance = function()
{
    var FrontController = system.events.FrontController ;
    
    this.assertFalse(  FrontController.removeInstance() , "01-01" );
    
    FrontController.getInstance() ;
    
    this.assertTrue(  FrontController.removeInstance() , "01-02" );
    
    this.assertFalse( FrontController.removeInstance("channel1") , "02-01" );
    
    FrontController.getInstance("channel1") ;
    
    this.assertTrue(  FrontController.removeInstance("channel1") , "02-02" );
}

proto.testSetEventDispatcher = function()
{
    var f = new system.events.FrontController() ;
    var d = new system.events.EventDispatcher() ;
    
    f.setEventDispatcher( d ) ;
    
    this.assertEquals( f.getEventDispatcher() , d ) ;
}

proto.testEventDispatcher = function()
{
    var f = new system.events.FrontController() ;
    var d = new system.events.EventDispatcher() ;
    
    f.eventDispatcher = d ;
    
    this.assertEquals( f.eventDispatcher , d ) ;
}

proto.testSize = function()
{
    var fc = new system.events.FrontController() ;
    
    var l1 = new system.events.mocks.MockEventListener() ;
    var l2 = new system.events.mocks.MockEventListener() ;
    
    this.assertEquals( fc.size() , 0 , "01 - The clear() method failed.") ;
    
    fc.add( "type1" , l1  ) ;
    fc.add( "type2" , l2 ) ;
    
    this.assertEquals( fc.size() , 2 , "01 - The clear() method failed.") ;
    
    fc.clear() ;
    
    this.assertEquals( fc.size() , 0 , "01 - The clear() method failed.") ; 
}

// ----o Encapsulate

delete proto ;