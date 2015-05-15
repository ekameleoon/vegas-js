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

system.process.BatchTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.process.BatchTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.process.BatchTest.prototype.constructor = system.process.BatchTest ;

proto = system.process.BatchTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    var MockCommand = system.process.mocks.MockCommand ;
    
    this.command1 = new MockCommand() ;
    this.command2 = new MockCommand() ;
    this.command3 = new MockCommand() ;
    this.command4 = new MockCommand() ;
    
    this.batch = new system.process.Batch( [this.command1,this.command2] ) ;
    
    this.batch.add( this.command3 ) ;
    this.batch.add( this.command4 ) ;
}

proto.tearDown = function()
{
    this.command1 = undefined ;
    this.command2 = undefined ;
    this.command3 = undefined ;
    this.command4 = undefined ;
    
    this.batch = undefined ;
}

// ----o Tests

proto.testConstructor = function () 
{
    this.assertNotNull( this.batch ) ;
}

proto.testInherit = function () 
{
    this.assertTrue( this.batch instanceof system.process.Runnable ) ;
}

proto.testAdd = function () 
{
    var MockCommand = system.process.mocks.MockCommand ;
    
    this.assertTrue( this.batch.add( new MockCommand() ) , "#1" ) ;
    
    var command = {} ;
    command.run = function() {} ;
    
    this.assertFalse( this.batch.add( command ) , "#2" ) ;
    
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
    var MockCommand = system.process.mocks.MockCommand ;
    
    this.assertTrue( this.batch.contains( this.command1 ) ) ;
    this.assertTrue( this.batch.contains( this.command2 ) ) ;
    this.assertTrue( this.batch.contains( this.command3 ) ) ;
    this.assertTrue( this.batch.contains( this.command4 ) ) ;
    
    this.assertFalse( this.batch.contains( null ) ) ;
    this.assertFalse( this.batch.contains( "hello" ) ) ;
    this.assertFalse( this.batch.contains( new MockCommand() ) ) ;
}

proto.testGet = function () 
{
    this.assertEquals( this.batch.get(0) , this.command1 ) ;
    this.assertEquals( this.batch.get(1) , this.command2 ) ;
    this.assertEquals( this.batch.get(2) , this.command3 ) ;
    this.assertEquals( this.batch.get(3) , this.command4 ) ;
    
    this.assertUndefined( this.batch.get(4) ) ;
    this.assertUndefined( this.batch.get(null) ) ;
    this.assertUndefined( this.batch.get("hello") ) ;
}

proto.testIndexOf = function () 
{
    var MockCommand = system.process.mocks.MockCommand ;
    
    this.assertEquals( 0 , this.batch.indexOf( this.command1 ) ) ;
    this.assertEquals( 1 , this.batch.indexOf( this.command2 ) ) ;
    this.assertEquals( 2 , this.batch.indexOf( this.command3 ) ) ;
    this.assertEquals( 3 , this.batch.indexOf( this.command4 ) ) ;
    
    this.assertEquals(  2 , this.batch.indexOf( this.command3 , 1 ) ) ;
    this.assertEquals(  2 , this.batch.indexOf( this.command3 , 2 ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( this.command3 , 3 ) ) ;
    
    this.assertEquals( -1 , this.batch.indexOf( null ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( "hello" ) ) ;
    this.assertEquals( -1 , this.batch.indexOf( new MockCommand() ) ) ;
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
   this.assertEquals( this.command1 , it.next() ) ;
   this.assertEquals( this.command2 , it.next() ) ;
   this.assertEquals( this.command3 , it.next() ) ;
   this.assertEquals( this.command4 , it.next() ) ;
}

proto.testRemove = function () 
{
    this.assertTrue( this.batch.remove( this.command1 ) ) ;
    this.assertFalse( this.batch.remove( this.command1 ) ) ;
    this.assertEquals( 3 , this.batch.size() ) ;
}

proto.testRun = function () 
{
    var MockCommand = system.process.mocks.MockCommand ;
    MockCommand.reset() ;
    this.batch.run() ;
    this.assertEquals( MockCommand.COUNT , this.batch.size() ) ;
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
    this.assertEquals( this.command1 , ar[0] ) ;
    this.assertEquals( this.command2 , ar[1] ) ;
    this.assertEquals( this.command3 , ar[2] ) ;
    this.assertEquals( this.command4 , ar[3] ) ;
}

proto.testToSource = function () 
{
    this.assertEquals( "new system.process.Batch([new system.process.mocks.MockCommand(),new system.process.mocks.MockCommand(),new system.process.mocks.MockCommand(),new system.process.mocks.MockCommand()])" , this.batch.toSource() ) ;
}

proto.testToString = function () 
{
    this.assertEquals( "{[object MockCommand],[object MockCommand],[object MockCommand],[object MockCommand]}" , this.batch.toString() ) ;
    this.batch.clear() ;
    this.assertEquals( "{}" , this.batch.toString() ) ;
}

////////

delete proto ;