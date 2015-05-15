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

system.events.EventListenerGroupTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.events.EventListenerGroupTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.events.EventListenerGroupTest.prototype.constructor = system.events.EventListenerGroupTest ;

proto = system.events.EventListenerGroupTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var group = new system.events.EventListenerGroup() ;
    this.assertNotNull( group ) ;
}

proto.testAddListener = function () 
{
    var EventListener      = system.events.EventListener ;
    var EventListenerEntry = system.events.EventListenerEntry ;
    var EventListenerGroup = system.events.EventListenerGroup ;
    
    var group = new EventListenerGroup() ;
    
    var listener1 = new EventListener() ;
    var listener2 = new EventListener() ;
    var listener3 = new EventListener() ;
    var listener4 = new EventListener() ;
    
    this.assertTrue( group.addListener( listener1 , 3 ) ) ;
    this.assertTrue( group.addListener( listener2 , 4 ) ) ;
    this.assertTrue( group.addListener( listener3 , 1 ) ) ;
    this.assertTrue( group.addListener( listener4 , 2 ) ) ;
}

proto.testRemoveListener = function () 
{
    var EventListener      = system.events.EventListener ;
    var EventListenerEntry = system.events.EventListenerEntry ;
    var EventListenerGroup = system.events.EventListenerGroup ;
    
    var listener1 = new EventListener() ;
    var listener2 = new EventListener() ;
    var listener3 = new EventListener() ;
    var listener4 = new EventListener() ;
    
    var group = new EventListenerGroup() ;
    
    group.addListener( listener1 , 3 ) ;
    group.addListener( listener2 , 4 ) ;
    group.addListener( listener3 , 1 ) ;
    group.addListener( listener4 , 2 ) ;
    
    this.assertTrue( group.removeListener( listener2 ) ) ;
    this.assertEquals( 3 , group.numListeners() ) ;
    
    this.assertFalse( group.removeListener( listener2 ) ) ;
    this.assertEquals( 3 , group.numListeners() ) ;
    
    this.assertTrue( group.removeListener( null ) ) ;
    this.assertEquals( 0 , group.numListeners() ) ;
    
    this.assertFalse( group.removeListener( null ) ) ;
    this.assertEquals( 0 , group.numListeners() ) ;
}

proto.testToArray = function () 
{
    var EventListener      = system.events.EventListener ;
    var EventListenerEntry = system.events.EventListenerEntry ;
    var EventListenerGroup = system.events.EventListenerGroup ;
    
    var listener1 = new EventListener() ;
    var listener2 = new EventListener() ;
    var listener3 = new EventListener() ;
    var listener4 = new EventListener() ;
    
    var group = new EventListenerGroup() ;
    
    var ar = group.toArray() ;
    
    this.assertNotNull( ar ) ;
    this.assertEquals( 0 , ar.length ) ;
    
    group.addListener( listener1 , 3 ) ;
    group.addListener( listener2 , 4 ) ;
    group.addListener( listener3 , 1 ) ;
    group.addListener( listener4 , 2 ) ;
    
    var ar = group.toArray() ;
    
    this.assertNotNull( ar ) ;
    this.assertEquals( 4 , ar.length ) ;
    
    this.assertEquals( listener2 , ar[0].listener ) ;
    this.assertEquals( listener4 , ar[1].listener ) ;
    this.assertEquals( listener1 , ar[2].listener ) ;
    this.assertEquals( listener3 , ar[3].listener ) ;
}

proto.testToString = function () 
{
    var group = new system.events.EventListenerGroup() ;
    this.assertEquals( "[EventListenerGroup]" , group.toString() ) ;
}

//////////

delete proto ;