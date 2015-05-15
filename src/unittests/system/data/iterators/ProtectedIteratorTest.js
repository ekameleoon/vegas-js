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

system.data.iterators.ProtectedIteratorTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.iterators.ProtectedIteratorTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.iterators.ProtectedIteratorTest.prototype.constructor = system.data.iterators.ProtectedIteratorTest ;

proto = system.data.iterators.ProtectedIteratorTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    this.ar = ["item1", "item2", "item3"] ;
    this.ai = new system.data.iterators.ArrayIterator( this.ar ) ;
    this.pi = new system.data.iterators.ProtectedIterator( this.ai ) ;
}

proto.tearDown = function()
{
    this.ar = undefined ;
    this.ai = undefined ;
    this.pi = undefined ;
}

// ----o Public Methods

proto.testConstructor = function () 
{
    this.assertNotNull( this.pi ) ;
}

proto.testConstructorWithEmptyArgument = function () 
{
    try
    {
        var i = new system.data.iterators.ProtectedIterator(null) ;
        this.fail( "#1" ) ;
    }
    catch( e )
    {
        this.assertEquals( e.message , "ProtectedIterator constructor don't support a null iterator in argument." , "#2" );
    }
}

proto.testHasNext = function () 
{
    this.assertTrue( this.pi.hasNext(), "#01") ;
    this.pi.next() ; // item1
    this.assertTrue( this.pi.hasNext(), "#02") ;
    this.pi.next() ; // item2
    this.assertTrue( this.pi.hasNext(), "#03") ;
    this.pi.next() ; // item3
    this.assertFalse( this.pi.hasNext(), "#04") ;
}

proto.testKey = function () 
{
    this.assertEquals(this.pi.key(), -1, "#01") ;
    this.pi.next() ; // item1
    this.assertEquals(this.pi.key(), 0, "#02") ;
    this.pi.next() ; // item2
    this.assertEquals(this.pi.key(), 1, "#03") ;
    this.pi.next() ; // item3
    this.assertEquals(this.pi.key(), 2, "#04") ;
}

proto.testNext = function () 
{
    this.assertEquals( this.pi.next() , "item1" ) ;
    this.assertEquals( this.pi.next() , "item2" ) ;
    this.assertEquals( this.pi.next() , "item3" ) ;
}

proto.testRemove = function () 
{
    try
    {
        this.pi.remove(0) ;
        fail( "#1") ;
    }
    catch( e )
    {
        this.assertEquals( e.message, "This Iterator does not support the remove() method." , "#2" ) ;
    }
}

proto.testReset = function () 
{
    try
    {
        this.pi.reset(0) ;
        fail( "#1") ;
    }
    catch( e )
    {
        this.assertEquals( e.message, "This Iterator does not support the reset() method." , "#2" ) ;
    }
}


proto.testSeek = function () 
{
    try
    {
        this.pi.seek(0) ;
        fail( "#1") ;
    }
    catch( e )
    {
        this.assertEquals( e.message, "This Iterator does not support the seek() method." , "#2" ) ;
    }
}

delete proto ;