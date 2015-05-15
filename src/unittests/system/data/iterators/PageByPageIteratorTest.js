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

system.data.iterators.PageByPageIteratorTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this, name ) ;
}

// ----o Inherit

system.data.iterators.PageByPageIteratorTest.prototype = new buRRRn.ASTUce.TestCase() ;
system.data.iterators.PageByPageIteratorTest.prototype.constructor = system.data.iterators.PageByPageIteratorTest ;

// ----o Initialize

system.data.iterators.PageByPageIteratorTest.prototype.setUp = function()
{
    this.i = new system.data.iterators.PageByPageIterator([1,2,3,4,5,6], 2) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.tearDown = function()
{
    this.i = undefined ;
}

// ----o Public Methods

system.data.iterators.PageByPageIteratorTest.prototype.testConstructor = function () 
{
    this.assertNotNull( this.i , "#01" ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testConstructorWithNullDataArgument = function () 
{
    try
    {
        var it = new system.data.iterators.PageByPageIterator(null) ;
        this.fail("#01") ;
    }
    catch( e )
    {
        this.assertEquals
        ( 
           e.message , 
           "PageByPageIterator constructor failed, data argument not must be null." ,
           "#02" 
        ) ;
    }
}

system.data.iterators.PageByPageIteratorTest.prototype.testConstructorWithEmptyDataArgument = function () 
{
    try
    {
        var it = new system.data.iterators.PageByPageIterator( [] ) ;
        this.fail("#01") ;
    }
    catch( e )
    {
        this.assertEquals
        ( 
           e.message , 
           "PageByPageIterator constructor failed, data argument not must be empty." ,
           "#02" 
        ) ;
    }
}

system.data.iterators.PageByPageIteratorTest.prototype.testInherit = function () 
{
    this.assertTrue( this.i instanceof system.data.OrderedIterator ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testDEFAULT_STEP = function () 
{
    this.assertEquals( 1 , system.data.iterators.PageByPageIterator.DEFAULT_STEP ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testCurrent = function () 
{
    this.assertUndefined( this.i.current() , "01 - current failed." ) ;
    
    var c ;
    
    this.i.next() ;
    
    c = this.i.current() ;
    this.assertEquals( 1, c[0] ) ;
    this.assertEquals( 2, c[1] ) ;
    
    this.i.seek(3) ;
    
    c = this.i.current() ;
    this.assertEquals( 5, c[0] ) ;
    this.assertEquals( 6, c[1] ) ;
    
    this.i.previous() ;
    
    c = this.i.current() ;
    this.assertEquals( 3, c[0] ) ;
    this.assertEquals( 4, c[1] ) ;
}


system.data.iterators.PageByPageIteratorTest.prototype.testCurrentPage = function () 
{
    this.assertEquals( 0 , this.i.currentPage() ) ;
    this.i.next() ;
    this.assertEquals( 1 , this.i.currentPage() ) ;
}


system.data.iterators.PageByPageIteratorTest.prototype.testGetStepSize = function()
{
    this.assertEquals( 2 , this.i.getStepSize() ) ;
    
    this.i = new system.data.iterators.PageByPageIterator( [1,2,3,4,5,6] ) ;
    this.assertEquals( this.i.getStepSize() , system.data.iterators.PageByPageIterator.DEFAULT_STEP ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testHasNext = function () 
{
    this.assertTrue( this.i.hasNext() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testHasPrevious = function () 
{
    this.assertFalse( this.i.hasPrevious() ) ;
    this.i.next() ;
    this.i.next() ; 
    this.assertTrue( this.i.hasPrevious() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testKey = function() 
{
    this.assertEquals( 0 , this.i.key() ) ;
    this.i.next() ;
    this.assertEquals( 1 , this.i.key() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testFirstPage = function()
{
    this.i.firstPage() ;
    this.assertEquals  ( 1 , this.i.key() ) ;
    var c = this.i.current() ;
    this.assertEquals( 1, c[0] ) ;
    this.assertEquals( 2, c[1] ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testLastPage = function()
{
    this.i.lastPage() ;
    this.assertEquals  ( 3 , this.i.key() ) ;
    var c = this.i.current() ;
    this.assertEquals( 5, c[0] ) ;
    this.assertEquals( 6, c[1] ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testNext = function()
{
    var n ;
    
    n = this.i.next() ;
    this.assertEquals( 1, n[0] ) ;
    this.assertEquals( 2, n[1] ) ;
    
    n = this.i.next() ;
    this.assertEquals( 3, n[0] ) ;
    this.assertEquals( 4, n[1] ) ;
    
    n = this.i.next() ;
    this.assertEquals( 5, n[0] ) ;
    this.assertEquals( 6, n[1] ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testNextWithStepIsOne = function()
{
    var it = new system.data.iterators.PageByPageIterator( [1,2,3,4,5,6] ) ;
    this.assertEquals ( 1 , it.next() ) ;
    this.assertEquals ( 2 , it.next() ) ;
    this.assertEquals ( 3 , it.next() ) ;
    this.assertEquals ( 4 , it.next() ) ;
    this.assertEquals ( 5 , it.next() ) ;
    this.assertEquals ( 6 , it.next() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testPageCount = function() 
{
    this.assertEquals( 3 , this.i.pageCount() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testPrevious = function()
{
    this.i.lastPage() ;
    
    var p ;
    
    p = this.i.current() ;
    this.assertEquals( 5, p[0] ) ;
    this.assertEquals( 6, p[1] ) ;
    
    p = this.i.previous() ;
    this.assertEquals( 3, p[0] ) ;
    this.assertEquals( 4, p[1] ) ;
    
    p = this.i.previous() ;
    this.assertEquals( 1, p[0] ) ;
    this.assertEquals( 2, p[1] ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testPreviousWithStepIsOne = function()
{
    var it = new system.data.iterators.PageByPageIterator( [1,2,3,4,5,6] ) ;
    
    it.lastPage() ;
    
    this.assertEquals ( 6 , it.current()  ) ;
    this.assertEquals ( 5 , it.previous() ) ;
    this.assertEquals ( 4 , it.previous() ) ;
    this.assertEquals ( 3 , it.previous() ) ;
    this.assertEquals ( 2 , it.previous() ) ;
    this.assertEquals ( 1 , it.previous() ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testRemove = function() 
{
     try
     {
        this.i.remove() ;
        this.fail("PageByPageIterator.remove() method failed, must throw an IllegalOperationError object.") ;
     }
     catch( e)
     {
         this.assertEquals( "The PageByPageIterator remove method is unsupported." , e.message ) ;
     }
}

system.data.iterators.PageByPageIteratorTest.prototype.testReset = function() 
{
    this.i.next() ;
    this.i.next() ;
    this.i.reset() ;
    var n = this.i.next() ;
    this.assertEquals( 1, n[0] ) ;
    this.assertEquals( 2, n[1] ) ;
}

system.data.iterators.PageByPageIteratorTest.prototype.testSeek = function () 
{
    var n ;
    this.i.seek( 1 ) ;
    n = this.i.current() ;
    this.assertEquals( 1, n[0] ) ;
    this.assertEquals( 2, n[1] ) ;
    this.i.seek( 3 ) ;
    n = this.i.current() ;
    this.assertEquals( 5, n[0] ) ;
    this.assertEquals( 6, n[1] ) ;
}
