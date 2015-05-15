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

system.process.TaskTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.process.TaskTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.process.TaskTest.prototype.constructor = system.process.TaskTest ;

proto = system.process.TaskTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.task     = new system.process.Task() ; 
    this.receiver = new system.process.mocks.MockTaskReceiver( this.task ) ;
}

proto.tearDown = function()
{
    this.task     = undefined ;
    this.receiver = undefined ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.task ) ;
}

proto.testInherit = function () 
{
    this.assertTrue( this.task instanceof system.process.Task ) ;
    this.assertTrue( this.task instanceof system.process.Action ) ;
}

proto.testClone = function () 
{
    var clone = this.task.clone() ;
    this.assertNotNull( clone ) ;
    this.assertNotSame( clone , this.task ) ;
    this.assertTrue( clone instanceof system.process.Task ) ;
}

proto.testPhase = function()
{
    this.assertEquals( system.process.TaskPhase.INACTIVE , this.task.phase ) ;
    this.assertEquals( system.process.TaskPhase.INACTIVE , this.task.getPhase() ) ;
}

proto.testRunning = function () 
{
    this.assertFalse( this.task.running ) ;
    this.assertFalse( this.task.getRunning() ) ;
    
    this.task._running = true ; // hack
    
    this.assertTrue( this.task.running ) ;
    this.assertTrue( this.task.getRunning() ) ;
}

proto.testRun = function () 
{
    this.assertTrue( "run" in this.task ) ;
}

proto.testFinishIt = function () 
{
    this.assertNotNull( this.task.finishIt ) ;
    
    this.task.finishIt = null ;
    this.assertNotNull( this.task.finishIt ) ;
    
    var signal = new system.signals.Signal() ;
    this.task.finishIt = signal ;
    this.assertEquals( this.task.finishIt , signal ) ;
}

proto.testStartIt = function () 
{
    this.assertNotNull( this.task.startIt ) ;
    
    this.task.startIt = null ;
    this.assertNotNull( this.task.startIt ) ;
    
    var signal = new system.signals.Signal() ;
    this.task.startIt = signal ;
    this.assertEquals( this.task.startIt , signal ) ;
}

proto.testToString = function () 
{
    this.assertEquals( "[Task]" , this.task.toString() ) ;
}

proto.testNotifyFinished = function()
{
    this.task.notifyFinished() ;
    this.assertTrue( this.receiver.finishCalled ) ;
    this.assertFalse( this.receiver.running ) ;
    this.assertEquals( system.process.TaskPhase.FINISHED , this.receiver.phase ) ;
    this.assertEquals( system.process.TaskPhase.INACTIVE , this.task.phase ) ;
}

proto.testNotifyStarted = function()
{
    this.task.notifyStarted() ;
    this.assertTrue( this.receiver.startCalled ) ;
    this.assertTrue( this.receiver.running ) ;
    this.assertEquals( system.process.TaskPhase.RUNNING , this.receiver.phase ) ;
}

proto.testIsLocked = function () 
{
    this.assertFalse( this.task.isLocked() , "#1" ) ;
}

proto.testLockUnLock = function () 
{
    this.task.lock() ;
    this.assertTrue( this.task.isLocked() , "#1" ) ;
    this.task.unlock() ;
    this.assertFalse( this.task.isLocked() , "#2" ) ;
}

////////

delete proto ;