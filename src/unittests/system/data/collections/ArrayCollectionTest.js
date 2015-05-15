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

system.data.collections.ArrayCollectionTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.collections.ArrayCollectionTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.collections.ArrayCollectionTest.prototype.constructor = system.data.collections.ArrayCollectionTest ;

proto = system.data.collections.ArrayCollectionTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var c = new system.data.collections.ArrayCollection() ;
    this.assertNotNull( c ) ;
    var a = c.toArray() ;
    this.assertEquals( 0 , a.length ) ;
}

proto.testConstructorWithArray = function () 
{
    var c = new system.data.collections.ArrayCollection([2,3,4]) ; 
    
    this.assertNotNull( c ) ;
    
    var a = c.toArray() ;
    
    this.assertEquals( 3 , a.length ) ;
    
    this.assertEquals( 2 , a[0] ) ;
    this.assertEquals( 3 , a[1] ) ;
    this.assertEquals( 4 , a[2] ) ;
}

proto.testConstructorWithIterableObject = function () 
{
    var init = new system.data.collections.ArrayCollection([2,3,4]) ;
    var c    = new system.data.collections.ArrayCollection( init ) ; 
    
    this.assertNotNull( c ) ;
    
    var a = c.toArray() ;
    
    this.assertEquals( 3 , a.length ) ;
    
    this.assertEquals( 2 , a[0] ) ;
    this.assertEquals( 3 , a[1] ) ;
    this.assertEquals( 4 , a[2] ) ;
}

proto.testAdd = function () 
{
    var c = new system.data.collections.ArrayCollection() ; 
    
    this.assertTrue( c.add(2)          , "#01" ) ;
    this.assertTrue( c.add(null)       , "#02" ) ;
    this.assertFalse( c.add(undefined) , "#03" ) ;
}

proto.testAddAll = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var co1 = new ArrayCollection([2,3,4]) ; 
    var co2 = new ArrayCollection() ;
    
    var co = new ArrayCollection() ;
    
    this.assertTrue( co.addAll(co1) , "#01" ) ;
    this.assertEquals( 3 , co.size() , "#02" ) ;
    this.assertEquals( 2 , co.get(0) , "#03" ) ;
    this.assertEquals( 3 , co.get(1) , "#04" ) ;
    this.assertEquals( 4 , co.get(2) , "#05" ) ;
    
    this.assertFalse( co.addAll(co2), "#06" ) ;
}

proto.testClear = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var co = new ArrayCollection([2,3,4]) ; 
    
    co.clear() ; 
    
    this.assertEquals( 0 , co.size() ) ;
}

proto.testClone = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var co = new ArrayCollection([2,3,4]) ;
    var cl = co.clone() ;
    
    this.assertNotNull( cl, "#01") ;
    this.assertTrue( cl instanceof ArrayCollection , "#02" ) ;
    this.assertFalse( cl == co , "#03" ) ;
    this.assertEquals( cl.size() , co.size() , "#04" ) ;
}

proto.testContains = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var co = new ArrayCollection() ;
    
    co.add("item") ;
    
    this.assertTrue( co.contains("item")    ,  "#01" ) ;
    this.assertFalse( co.contains("unknow") ,  "#02" ) ;
}

proto.testContainsAll = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var c1 = new ArrayCollection([1,2,3,4]) ;
    var c2 = new ArrayCollection([2,3]) ;
    var c3 = new ArrayCollection() ;
    
    this.assertTrue( c1.containsAll(c2) , "#01") ;
    this.assertTrue( c1.containsAll(c3) , "#02") ;
    
    this.assertFalse( c2.containsAll(c1) , "#03") ;
}

proto.testEquals = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ; 
    
    var c1 = new ArrayCollection([1,2,3,4]) ;
    var c2 = new ArrayCollection([1,2,3,4]) ;
    var c3 = new ArrayCollection([2,3]) ;
    var c4 = new ArrayCollection([5,6,7,8]) ;
    
    this.assertTrue  ( c1.equals(c1) , "01-01" ) ;
    this.assertTrue  ( c1.equals(c2) , "01-02" ) ;
    this.assertFalse ( c1.equals(c3) , "01-03" ) ;
    this.assertFalse ( c1.equals(c4) , "01-04" ) ; // same size
    
    this.assertTrue  ( c2.equals(c1) , "02-01" ) ;
    this.assertTrue  ( c2.equals(c2) , "02-02" ) ;
    this.assertFalse ( c2.equals(c3) , "02-03" ) ;
    
    this.assertFalse ( c3.equals(c1) , "03-01" ) ;
    this.assertFalse ( c3.equals(c2) , "03-02" ) ;
    this.assertTrue  ( c3.equals(c3) , "03-03" ) ;
}

proto.testGet = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var co = new ArrayCollection() ;
    
    co.add("test") ;
    
    this.assertEquals( co.get(0) , "test" ,  "01") ;
    this.assertUndefined( co.get(1)       ,  "02" ) ;
}

proto.testIndexOf = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var co = new ArrayCollection() ;
    
    co.add("item1") ;
    co.add("item2") ;
    co.add("item3") ;
    
    this.assertEquals( co.indexOf("item4") , -1 ,  "#01" ) ;
    this.assertEquals( co.indexOf("item1") ,  0 ,  "#02" ) ;
    this.assertEquals( co.indexOf("item3") ,  2 ,  "#03" ) ;
    
    this.assertEquals( co.indexOf("item3", 1) , 2  , "#04" ) ;
}

proto.testIsEmpty = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var co = new ArrayCollection() ;
    
    this.assertTrue( co.isEmpty() , "#01" ) ;
    
    co.add("test") ;
    
    this.assertFalse( co.isEmpty() , "#02" ) ;
    
    co.remove("test") ;
    
    this.assertTrue( co.isEmpty() , "#03" ) ;
}

proto.testIterator = function () 
{
    var co = new system.data.collections.ArrayCollection( [2,3,4] ) ;
    
    var it = co.iterator() ;
    
    this.assertTrue ( it instanceof system.data.iterators.ArrayIterator , "#01" ) ;
    
    var count = 0 ;
    while( it.hasNext() )
    {
        count += it.next() ;
    }
    this.assertEquals( 9 , count , "#02" ) ;
}

proto.testRemove = function () 
{
    var co = new system.data.collections.ArrayCollection() ;
    
    co.add("item1") ;
    co.add("item2") ;
    
    this.assertTrue  ( co.remove("item1") , "#01" ) ;
    this.assertFalse ( co.remove("item1") , "#02" ) ;
    this.assertFalse ( co.remove("item5") , "#03" ) ;
}

proto.testRemoveAll = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var c1 = new ArrayCollection([1,2,3,4]) ;
    var c2 = new ArrayCollection([2,3]) ;
    var c3 = new ArrayCollection() ;
    
    this.assertTrue( c1.removeAll( c2 ) , "#01") ;
    
    this.assertEquals( 2 , c1.size() , "#03" ) ;
    this.assertEquals( 1 , c1.get(0) , "#04" ) ;
    this.assertEquals( 4 , c1.get(1) , "#05" ) ;
    
    this.assertFalse( c1.removeAll(c3) , "#06") ;
}

proto.testRetainAll = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var c1 = new ArrayCollection([1,2,3,4]) ;
    var c2 = new ArrayCollection([2,3]) ;
    var c3 = new ArrayCollection() ;
    var c4 = new ArrayCollection([5,6]) ;
    
    this.assertTrue( c1.retainAll(c2) , "#01") ;
    
    this.assertEquals( 2 , c1.size() , "#02" ) ;
    this.assertEquals( 2 , c1.get(0) , "#03" ) ;
    this.assertEquals( 3 , c1.get(1) , "#04" ) ;
    
    this.assertTrue( c1.retainAll(c3) , "#05") ;
    this.assertEquals( c1.toString(), "{}" , "#06") ;
    
    this.assertFalse( c1.retainAll(c4) , "#07") ;
}

proto.testSize = function () 
{
    var co = new system.data.collections.ArrayCollection() ;
    
    this.assertEquals( 0 , co.size() ,  "#01") ;
    
    co.add("test") ;
    
    this.assertEquals( 1 , co.size() ,  "#01") ;
}

proto.testToArray = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var c /*ArrayCollection*/ ;
    var a /*Array*/
    
    c = new ArrayCollection() ;
    a = c.toArray() ;
    
    this.assertNotNull( a , "#01" ) ;
    this.assertEquals( 0 , a.length , "#02" ) ;
    
    c.add(2) ;
    c.add(3) ;
    c.add(4) ; 
    
    a = c.toArray() ;
    
    this.assertNotNull( a , "#03" ) ;
    
    this.assertEquals( 3 , a.length , "#04" ) ;
    
    this.assertEquals( 2 , a[0] , "#05" ) ;
    this.assertEquals( 3 , a[1] , "#06" ) ;
    this.assertEquals( 4 , a[2] , "#07" ) ;
}

proto.testToSource = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var co ;
    
    co = new ArrayCollection() ;
    
    this.assertEquals(co.toSource() , "new system.data.collections.ArrayCollection()" , "#01") ;
    
    co = new ArrayCollection( ["item1", "item2"] ) ;
    
    this.assertEquals(co.toSource() , "new system.data.collections.ArrayCollection([\"item1\",\"item2\"])" , "#02") ;
}

proto.testToString = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    
    var co ;
    
    co = new ArrayCollection() ;
    
    this.assertEquals(co.toString() , "{}" , "#01") ;
    
    co = new ArrayCollection( ["item1", "item2"] ) ;
    
    this.assertEquals(co.toString() , "{item1,item2}" , "#02") ;
}

///////

delete proto ;