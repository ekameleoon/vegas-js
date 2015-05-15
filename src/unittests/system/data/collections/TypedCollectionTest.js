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

system.data.collections.TypedCollectionTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.collections.TypedCollectionTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.collections.TypedCollectionTest.prototype.constructor = system.data.collections.TypedCollectionTest ;

proto = system.data.collections.TypedCollectionTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var co = new system.data.collections.ArrayCollection() ;
    var tc = new system.data.collections.TypedCollection( String , co ) ;
    this.assertNotNull( tc ) ;
}

proto.testInherit = function () 
{
    var co = new system.data.collections.ArrayCollection() ;
    var tc = new system.data.collections.TypedCollection( String , co ) ;
    this.assertTrue( tc instanceof system.data.Typeable ) ;
}

proto.testConstructorTypeArgument = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var tc ;
    var co = new ArrayCollection() ;
    
    tc = new TypedCollection( String , co ) ;
    this.assertEquals( String , tc.type ) ;
    
    tc = new TypedCollection( null , co ) ;
    this.assertNull( tc.type ) ;
}

proto.testConstructorCollectionArgument = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var tc ;
    var co = new ArrayCollection() ;
    
    try
    {
        tc = new TypedCollection( String , null ) ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#1" ) ;
        this.assertEquals( e.message , "The passed-in 'collection' argument not must be 'null' or 'undefined'." , "#2" ) ;
    }
}

proto.testAdd = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection() ;
    var tc = new TypedCollection( String , co ) ;
    
    this.assertTrue( tc.add("item1") , "#01" ) ;
    this.assertEquals( tc.size() , 1 , "#02" ) ;
    
    try
    {
        tc.add(3) ;
        this.fail("#03") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#04" ) ;
        this.assertEquals( "[TypedCollection] validate('3') failed, the type is mismatch." , e.message , "#05" ) ;
    }
}

proto.testClear = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    tc.clear() ; 
    
    this.assertEquals( 0 , tc.size() ) ;
}


proto.testClone = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    var cl = tc.clone() ;
    
    this.assertNotNull( cl, "#01") ;
    this.assertTrue( cl instanceof TypedCollection , "#02" ) ;
    this.assertFalse( cl == co , "#03" ) ;
    this.assertEquals( cl.size() , tc.size() , "#04" ) ;
}

proto.testContains = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertTrue( tc.contains(2) ,  "#01" ) ;
    this.assertFalse( tc.contains("unknow") ,  "#02" ) ;
}

proto.testGet = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertEquals( tc.get(0) , 2 ,  "01") ;
    this.assertUndefined( tc.get(10) ,  "02" ) ;
}


proto.testIndexOf = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertEquals( tc.indexOf(9) , -1 ,  "#01" ) ;
    this.assertEquals( tc.indexOf(2) ,  0 ,  "#02" ) ;
    this.assertEquals( tc.indexOf(4) ,  2 ,  "#03" ) ;
    
    this.assertEquals( tc.indexOf(4, 1) , 2  , "#04" ) ;
}

proto.testIsEmpty = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertFalse( tc.isEmpty() , "#01" ) ;
    
    tc.clear() ;
    
    this.assertTrue( tc.isEmpty() , "#02" ) ;
}

proto.testIterator = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    var it = tc.iterator() ;
    
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
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection(["item1", "item2"]) ;
    var tc = new TypedCollection( String , co ) ;
    
    this.assertTrue  ( tc.remove("item1") , "#01" ) ;
    this.assertFalse ( tc.remove("item1") , "#02" ) ;
    this.assertFalse ( tc.remove("item5") , "#03" ) ;
}


proto.testSize = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection(["item1", "item2"]) ;
    var tc = new TypedCollection( String , co ) ;
    
    this.assertEquals( 2 , tc.size() , "#01") ;
    
    tc.clear() ;
    
    this.assertEquals( 0 , tc.size() , "#02") ;
}

proto.testToArray = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    var a ;
    
    a = tc.toArray() ;
    
    this.assertNotNull( a , "#01" ) ;
    this.assertEquals( 3 , a.length , "#02" ) ;
    this.assertEquals( 2 , a[0] , "#03" ) ;
    this.assertEquals( 3 , a[1] , "#04" ) ;
    this.assertEquals( 4 , a[2] , "#05" ) ;
    
    tc.clear() ;
    
    a = tc.toArray() ;
    
    this.assertNotNull( a , "#06" ) ;
    this.assertEquals( 0 , a.length , "#07" ) ;
}



proto.testToSource = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertEquals(tc.toSource() , "new system.data.collections.TypedCollection(Number,new system.data.collections.ArrayCollection([2,3,4]))") ;
    
    /////////
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( "number" , co ) ;
    
    this.assertEquals(tc.toSource() , "new system.data.collections.TypedCollection(\"number\",new system.data.collections.ArrayCollection([2,3,4]))") ;
}

proto.testToString = function () 
{
    var ArrayCollection = system.data.collections.ArrayCollection ;
    var TypedCollection = system.data.collections.TypedCollection ;
    
    var co = new ArrayCollection([2,3,4]) ;
    var tc = new TypedCollection( Number , co ) ;
    
    this.assertEquals(tc.toString() , "{2,3,4}" , "#01") ;
    
    tc.clear() ;
    
    this.assertEquals(tc.toString() , "{}" , "#02") ;
}

///////

delete proto ;