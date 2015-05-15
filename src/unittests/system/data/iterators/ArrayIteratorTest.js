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

system.data.iterators.ArrayIteratorTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.iterators.ArrayIteratorTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.iterators.ArrayIteratorTest.prototype.constructor = system.data.iterators.ArrayIteratorTest ;

// ----o Initialize

system.data.iterators.ArrayIteratorTest.prototype.setUp = function()
{
    this.ar = ["item1", "item2", "item3"] ;
    this.it = new system.data.iterators.ArrayIterator( this.ar ) ;
}

system.data.iterators.ArrayIteratorTest.prototype.tearDown = function()
{
    this.ar = undefined ;
    this.it = undefined ;
}

// ----o Public Methods

system.data.iterators.ArrayIteratorTest.prototype.testConstructor = function () 
{
    this.assertNotNull( this.it ) ;
}

system.data.iterators.ArrayIteratorTest.prototype.testConstructorWithEmptyArrayArgument = function () 
{
    try
    {
        var i = new system.data.iterators.ArrayIterator(null) ;
        this.fail( this + " test constructor failed if the passed-in Array is a null object.") ;
    }
    catch( e )
    {
        this.assertEquals( e.message , "[ArrayIterator] constructor failed, the passed-in Array argument not must be 'null'." );
    }
}

system.data.iterators.ArrayIteratorTest.prototype.testHasNext = function () 
{
    this.assertTrue( this.it.hasNext(), "#01") ;
    this.it.next() ; // item1
    this.assertTrue( this.it.hasNext(), "#02") ;
    this.it.next() ; // item2
    this.assertTrue( this.it.hasNext(), "#03") ;
    this.it.next() ; // item3
    this.assertFalse( this.it.hasNext(), "#04") ;
}

system.data.iterators.ArrayIteratorTest.prototype.testKey = function () 
{
    this.assertEquals(this.it.key(), -1, "#01") ;
    this.it.next() ; // item1
    this.assertEquals(this.it.key(), 0, "#02") ;
    this.it.next() ; // item2
    this.assertEquals(this.it.key(), 1, "#03") ;
    this.it.next() ; // item3
    this.assertEquals(this.it.key(), 2, "#04") ;
}

system.data.iterators.ArrayIteratorTest.prototype.testNext = function () 
{
    this.assertEquals( this.it.next() , "item1" , "01 next() method failed" ) ;
    this.assertEquals( this.it.next() , "item2" , "02 next() method failed" ) ;
    this.assertEquals( this.it.next() , "item3" , "03 next() method failed" ) ;
}

system.data.iterators.ArrayIteratorTest.prototype.testRemove = function () 
{
    this.it.next() ;
    var result = this.it.remove() ; 
    this.assertEquals( result , "item1" , "#01" ) ;
    this.assertEquals( this.it.next()   , "item2" , "#02" ) ;
    this.it.reset() ;
    this.assertEquals( this.it.next() , "item2" , "#03" ) ;
}

system.data.iterators.ArrayIteratorTest.prototype.testReset = function () 
{
    this.it.next() ;
    this.it.next() ;
    this.it.reset() ;
    this.assertEquals( this.it.next() , "item1" ) ;
}


system.data.iterators.ArrayIteratorTest.prototype.testSeek = function () 
{
    this.it.seek(1) ;
    this.it.next() ;
    this.assertEquals( this.it.next() , "item3" , "seek(1) method failed" ) ;
}