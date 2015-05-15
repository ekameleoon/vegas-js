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

system.process.CoreActionTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.process.CoreActionTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.process.CoreActionTest.prototype.constructor = system.process.CoreActionTest ;

proto = system.process.CoreActionTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.action   = new system.process.CoreAction() ; 
    this.receiver = new system.process.mocks.MockActionReceiver( this.action ) ;
}

proto.tearDown = function()
{
    this.action   = undefined ;
    this.receiver = undefined ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.action ) ;
}

proto.testInherit = function () 
{
    this.assertTrue( this.action instanceof system.process.Task ) ;
}

proto.testClone = function () 
{
    var clone = this.action.clone() ;
    this.assertNotNull( clone ) ;
    this.assertNotSame( clone , this.action ) ;
    this.assertTrue( clone instanceof system.process.CoreAction ) ;
}

proto.testLooping = function () 
{
    this.assertFalse( this.action.looping ) ;
    this.action.looping = true ;
    this.assertTrue( this.action.looping ) ;
}

proto.testNotifyChanged = function () 
{
    this.action.notifyChanged() ;
    this.assertTrue( this.receiver.changeCalled ) ;
}

proto.testNotifyCleared = function () 
{
    this.action.notifyCleared() ;
    this.assertTrue( this.receiver.clearCalled ) ;
}

proto.testNotifyFinished = function () 
{
    this.action.notifyFinished() ;
    this.assertTrue( this.receiver.finishCalled ) ;
}

proto.testNotifyInfo = function () 
{
    this.action.notifyInfo("hello world") ;
    this.assertTrue( this.receiver.infoCalled ) ;
    this.assertEquals( "hello world" , this.receiver.infoObject ) ;
}

proto.testNotifyLooped = function () 
{
    this.action.notifyLooped() ;
    this.assertTrue( this.receiver.loopCalled ) ;
}

proto.testNotifyPause = function () 
{
    this.action.notifyPaused() ;
    this.assertTrue( this.receiver.pauseCalled ) ;
}

proto.testNotifyProgress = function () 
{
    this.action.notifyProgress() ;
    this.assertTrue( this.receiver.progressCalled ) ;
}

proto.testNotifyResumed = function () 
{
    this.action.notifyResumed() ;
    this.assertTrue( this.receiver.resumeCalled ) ;
}

proto.testNotifyStarted = function () 
{
    this.action.notifyStarted() ;
    this.assertTrue( this.receiver.startCalled ) ;
}

proto.testNotifyStopped = function () 
{
    this.action.notifyStopped() ;
    this.assertTrue( this.receiver.stopCalled ) ;
}

proto.testNotifyTimeout = function () 
{
    this.action.notifyTimeout() ;
    this.assertTrue( this.receiver.timeoutCalled ) ;
}

// TODO test the virtual properties changeIt, clearIt, infoIt, etc.

////////

delete proto ;