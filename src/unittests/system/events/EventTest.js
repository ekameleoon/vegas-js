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

system.events.EventTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.events.EventTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.events.EventTest.prototype.constructor = system.events.EventTest ;

proto = system.events.EventTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    this.scope = 
    {
        toString : function() { return "scope" ; }
    } ;
    this.context = 
    {
        toString : function() { return "context" ; }
    } ;
    this.event = new system.events.Event( "change" , this.scope , this.context ) ;
}

proto.tearDown = function()
{
    this.scope   = undefined ;
    this.context = undefined ;
    this.event   = undefined ;
}

// ----o Public Methods

proto.testConstructor = function () 
{
    this.assertNotNull( this.event ) ; 
}

proto.testCancel = function() 
{
    this.event.cancel() ;
    this.assertTrue( this.event.cancelable ) ;
}

proto.testClone = function () 
{
    var clone = this.event.clone() ;
    
    this.assertNotNull( clone ) ;
    this.assertTrue( clone instanceof system.events.Event ) ;
    this.assertEquals( clone.context , this.event.context ) ;
    this.assertEquals( clone.target  , this.event.target  ) ;
    this.assertEquals( clone.type    , this.event.type    ) ;
}

proto.testInitEvent = function () 
{
    this.event.initEvent( "start" , true , true ) ;
    
    this.assertEquals( "start" , this.event.type ) ;
    this.assertTrue( this.event.bubbles ) ;
    this.assertTrue( this.event.cancelable ) ;
    
    this.event.initEvent( "finish" , false , false ) ;
    
    this.assertEquals( "finish" , this.event.type ) ;
    this.assertFalse( this.event.bubbles ) ;
    this.assertFalse( this.event.cancelable ) ;
}

proto.testIsQueued = function() 
{
    this.assertFalse( this.event.isQueued() ) ;
    this.event.queueEvent() ;
    this.assertTrue( this.event.isQueued() ) ;
}

proto.testFormatToString = function() 
{
    this.assertEquals( "[Event]" , this.event.formatToString() ) ;
    this.assertEquals( "[Event type:change]" , this.event.formatToString(null,"type") ) ;
}

proto.stopImmediatePropagation = function() 
{
    this.assertEquals( 0 , this.event.stop ) ;
    
    this.event.stopImmediatePropagation() ;
    
    this.assertEquals( system.events.EventPhase.STOP_IMMEDIATE , this.event.stop ) ;
}

proto.stopPropagation = function() 
{
    this.assertEquals( 0 , this.event.stop ) ;
    
    this.event.stopPropagation() ;
    
    this.assertEquals( system.events.EventPhase.STOP , this.event.stop ) ;
}

proto.testToString = function() 
{
    this.assertEquals( "[Event type:change target:scope context:context bubbles:false cancelable:false eventPhase:2]" , this.event.toString() ) ;
}

//////////

delete proto ;