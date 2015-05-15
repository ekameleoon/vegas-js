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

system.process.ChainTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.process.ChainTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.process.ChainTest.prototype.constructor = system.process.ChainTest ;

proto = system.process.ChainTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.chain = new system.process.Chain() ; 
    
    this.task1 = new system.process.mocks.MockTask() ;
    this.task2 = new system.process.mocks.MockTask() ;
    this.task3 = new system.process.mocks.MockTask() ;
    this.task4 = new system.process.mocks.MockTask() ;
    
    this.chain.addAction( this.task1 ) ;
    this.chain.addAction( this.task2 ) ;
    this.chain.addAction( this.task3 ) ;
    this.chain.addAction( this.task4 ) ;
}

proto.tearDown = function()
{
    this.chain = undefined ;
    
    this.task1 = undefined ;
    this.task2 = undefined ;
    this.task3 = undefined ;
    this.task4 = undefined ;
}

proto.testEVERLASTING = function () 
{
    this.assertEquals( system.process.Chain.EVERLASTING , "everlasting" ) ;
}

proto.testNORMAL = function () 
{
    this.assertEquals( system.process.Chain.NORMAL , "normal" ) ;
}

proto.testTRANSIENT = function () 
{
    this.assertEquals( system.process.Chain.TRANSIENT , "transient" ) ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.chain ) ;
}

proto.testInherit = function () 
{
    this.assertTrue( this.chain instanceof system.process.CoreAction ) ;
}

proto.testLength = function () 
{
    this.assertEquals( 4 , this.chain.length ) ;
    this.chain.length = 10 ;
    this.assertEquals( 10 , this.chain.length ) ;
    this.chain.length = 2 ;
    this.assertEquals( 2 , this.chain.length ) ;
    this.chain.length = 0 ;
    this.assertEquals( 0 , this.chain.length ) ;
}

proto.testMode = function () 
{
    this.assertEquals( system.process.Chain.NORMAL , this.chain.mode ) ; 
    
    this.chain.mode = null ;
    this.assertEquals( system.process.Chain.NORMAL , this.chain.mode ) ; 
    
    this.chain.mode = 2 ;
    this.assertEquals( system.process.Chain.NORMAL , this.chain.mode ) ; 
    
    this.chain.mode = "hello" ;
    this.assertEquals( system.process.Chain.NORMAL , this.chain.mode ) ; 
    
    this.chain.mode = "normal" ;
    this.assertEquals( system.process.Chain.NORMAL , this.chain.mode ) ;
    
    this.chain.mode = system.process.Chain.TRANSIENT ;
    this.assertEquals( system.process.Chain.TRANSIENT , this.chain.mode ) ;
    
    this.chain.mode = system.process.Chain.EVERLASTING ;
    this.assertEquals( system.process.Chain.EVERLASTING , this.chain.mode ) ;
}

proto.testAddAction = function () 
{
    this.chain.length = 0 ;
    this.assertFalse( this.chain.addAction( null ) ) ;
    this.assertTrue( this.chain.addAction( this.task1 ) ) ;
    this.assertTrue( this.chain.addAction( this.task1 ) ) ;
}

proto.testGetActionAt = function () 
{
    this.assertEquals( this.task1 , this.chain.getActionAt( 0 ) ) ;
    this.assertEquals( this.task2 , this.chain.getActionAt( 1 ) ) ;
    this.assertEquals( this.task3 , this.chain.getActionAt( 2 ) ) ;
    this.assertEquals( this.task4 , this.chain.getActionAt( 3 ) ) ;
    this.assertNull( this.chain.getActionAt( 4 ) ) ;
}

proto.testHasAction = function () 
{
    this.assertTrue( this.chain.hasAction( this.task1 ) ) ;
    this.chain.removeAction( this.task1 ) ;
    this.assertFalse( this.chain.hasAction( this.task1 ) ) ;
}

proto.testIsEmpty = function () 
{
    this.assertFalse( this.chain.isEmpty() ) ;
    this.chain.removeAction() ;
    this.assertTrue( this.chain.isEmpty() ) ;
}

proto.testRemoveAction = function () 
{
    this.assertTrue( this.chain.hasAction( this.task2 ) ) ;
    this.assertTrue( this.chain.removeAction( this.task2 ) ) ;
    this.assertFalse( this.chain.hasAction( this.task2 ) ) ;
    this.assertFalse( this.chain.removeAction( this.task2 ) ) ;
    this.assertEquals( 3 , this.chain.length ) ;
}

proto.testRemoveActionClear = function () 
{
    this.assertTrue( this.chain.removeAction() ) ;
    this.assertEquals( 0 , this.chain.length ) ;
    this.assertFalse( this.chain.removeAction() ) ;
}

proto.testToArray = function () 
{
    var ar /*Array*/ ;
    
    ar = this.chain.toArray() ;
    
    this.assertEquals( 4 , ar.length ) ;
    this.assertEquals( this.task1 , ar[0] ) ;
    this.assertEquals( this.task2 , ar[1] ) ;
    this.assertEquals( this.task3 , ar[2] ) ;
    this.assertEquals( this.task4 , ar[3] ) ;
    
    this.chain.length = 10 ;
    
    ar = this.chain.toArray() ;
    
    this.assertEquals( 4 , ar.length ) ;
    this.assertEquals( this.task1 , ar[0] ) ;
    this.assertEquals( this.task2 , ar[1] ) ;
    this.assertEquals( this.task3 , ar[2] ) ;
    this.assertEquals( this.task4 , ar[3] ) ;
}

proto.testToString = function () 
{
    this.assertEquals( this.chain.toString() , "[Chain]" ) ;
    this.assertEquals( this.chain.toString(true) , "[Chain<[MockTask],[MockTask],[MockTask],[MockTask]>]" ) ;
    this.chain.length = 6 ;
    this.assertEquals( this.chain.toString(true) , "[Chain<[MockTask],[MockTask],[MockTask],[MockTask],,>]" ) ;
    this.chain.length = 2 ;
    this.assertEquals( this.chain.toString(true) , "[Chain<[MockTask],[MockTask]>]" ) ;
}

proto.testRun = function() 
{
    var receiver = new system.process.mocks.MockTaskReceiver( this.chain ) ;
    
    system.process.mocks.MockTask.reset() ;
    
    this.chain.run() ;
    
    this.assertEquals( 4 , system.process.mocks.MockTask.COUNT , "#1" ) ;
    
    system.process.mocks.MockTask.reset() ;
}

proto.testNotification = function() 
{
    this.chain.length = 0 ;
    
    this.chain.mode =  "everlasting" ; // everlasting , normal , transient
    
    this.task1 = new system.process.mocks.MockTask(1, this.verbose) ;
    this.task2 = new system.process.mocks.MockTask(2, this.verbose) ;
    this.task3 = new system.process.mocks.MockTask(3, this.verbose) ;
    this.task4 = new system.process.mocks.MockTask(4, this.verbose) ;
    
    this.chain.addAction( this.task1 , 0 , true ) ;
    this.chain.addAction( this.task2 , 9999 , true ) ;
    this.chain.addAction( this.task3 , 99 ) ;
    this.chain.addAction( this.task4 , 999 ) ;
    
    var receiver = new system.process.mocks.MockTaskReceiver( this.chain ) ;
    
    this.chain.run() ;
    
    this.assertTrue( receiver.running , "#2-1" ) ;
    this.assertFalse( this.chain.running , "#2-2" ) ;
    
    this.assertTrue( receiver.startCalled  , "#3-1" ) ;
    this.assertTrue( receiver.finishCalled  , "#3-2" ) ;
    
    this.chain.run() ;
}


/**
 * Enable the verbose mode in this unit test.
 */
proto.verbose = false ;

// TODO finalize all unit tests (see if the elements are unregister when the mode change, etc.)

////////

delete proto ;