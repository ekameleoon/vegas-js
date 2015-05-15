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

system.data.maps.ArrayMapTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.maps.ArrayMapTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.maps.ArrayMapTest.prototype.constructor = system.data.maps.ArrayMapTest ;

// ----o Initialize

system.data.maps.ArrayMapTest.prototype.setUp = function()
{
    this.map = new system.data.maps.ArrayMap(["key1", "key2"],["value1", "value2"]) ;
}

system.data.maps.ArrayMapTest.prototype.tearDown = function()
{
    this.map = undefined ;
}

// ----o Public Methods

system.data.maps.ArrayMapTest.prototype.testConstructor = function () 
{
    this.assertNotNull( this.map , "#1" ) ;
    
    this.assertEquals( this.map.get("key1") , "value1" , "#2-1 - The ArrayMap constructor failed : map.get('key1')") ;
    this.assertEquals( this.map.get("key2") , "value2" , "#2-2 - The ArrayMap constructor failed : map.get('key2')") ;
    
    this.map = new system.data.maps.ArrayMap() ;
    this.assertEquals( this.map.size() , 0 , "#3") ;
    
    this.map = new system.data.maps.ArrayMap(null,["value1", "value2"]) ;
    this.assertEquals( this.map.size() , 0 , "#4") ;
}

system.data.maps.ArrayMapTest.prototype.testClear = function () 
{
    this.map.clear() ;
    this.assertEquals( this.map.size() , 0 , "The ArrayMap clear method failed.") ;
}

system.data.maps.ArrayMapTest.prototype.testClone = function () 
{
    var clone = this.map.clone() ;
    this.assertNotNull( clone , "#1") ;
    this.assertEquals( clone.size()  , this.map.size()  , "#2") ;
    this.assertEquals( clone["key1"] , this.map["key1"] , "#3") ;
    this.assertEquals( clone["key2"] , this.map["key2"] , "#4") ;
}

system.data.maps.ArrayMapTest.prototype.testContainsKey = function () 
{
    this.assertTrue( this.map.containsKey("key1") , "#1") ;
    this.assertTrue( this.map.containsKey("key2") , "#2") ;
    this.assertFalse( this.map.containsKey("key3") , "#3") ;
}

system.data.maps.ArrayMapTest.prototype.testContainsValue = function () 
{
    this.assertTrue( this.map.containsValue("value1") , "#1") ;
    this.assertTrue( this.map.containsValue("value2") , "#2") ;
    this.assertFalse( this.map.containsValue("value3") , "#3") ;
}

system.data.maps.ArrayMapTest.prototype.testGet = function () 
{
    this.assertEquals( this.map.get("key1") , "value1"  , "#1") ;
    this.assertEquals( this.map.get("key2") , "value2"  , "#2") ;
    this.assertUndefined( this.map.get("key3") , "#3") ;
}

system.data.maps.ArrayMapTest.prototype.testGetKeyAt = function () 
{
    this.assertEquals( this.map.getKeyAt(0) , "key1"  , "#1") ;
    this.assertEquals( this.map.getKeyAt(1) , "key2"  , "#2") ;
}

system.data.maps.ArrayMapTest.prototype.testGetKeys = function () 
{
    var keys /*Array*/ = this.map.getKeys() ;
    this.assertEquals( "key1" , keys[0] , "#1" ) ;
    this.assertEquals( "key2" , keys[1] , "#2" ) ;
}

system.data.maps.ArrayMapTest.prototype.testGetValueAt = function () 
{
    this.assertEquals( this.map.getValueAt(0) , "value1" ) ;
    this.assertEquals( this.map.getValueAt(1) , "value2" ) ;
}

system.data.maps.ArrayMapTest.prototype.testGetValues = function () 
{
    var values /*Array*/ = this.map.getValues() ;
    this.assertEquals( "value1" , values[0] , "#1" ) ;
    this.assertEquals( "value2" , values[1] , "#2" ) ;
}

system.data.maps.ArrayMapTest.prototype.testIndexOfKey = function () 
{
    this.assertEquals( this.map.indexOfKey("key1") ,  0 , "#1" )  ;
    this.assertEquals( this.map.indexOfKey("key2") ,  1 , "#2" )  ;
    this.assertEquals( this.map.indexOfKey("key3") , -1 , "#3" )  ;
}

system.data.maps.ArrayMapTest.prototype.testIndexOfValue = function () 
{
    this.assertEquals( this.map.indexOfValue("value1") ,  0 , "#1" )  ;
    this.assertEquals( this.map.indexOfValue("value2") ,  1 , "#2" )  ;
    this.assertEquals( this.map.indexOfValue("value3") , -1 , "#3" )  ;
}

system.data.maps.ArrayMapTest.prototype.testIsEmpty = function () 
{
    this.assertFalse( this.map.isEmpty() , "#1" ) ;
    this.map.clear() ;
    this.assertTrue( this.map.isEmpty() , "#2" ) ;
}

system.data.maps.ArrayMapTest.prototype.testIterator = function () 
{
    var it /*Iterator*/ = this.map.iterator() ;
    
    this.assertNotNull( it, "#1" ) ;
    this.assertTrue( it instanceof system.data.iterators.MapIterator , "#2" ) ;
    
    this.assertTrue( it.hasNext(), "#3-0" ) ;
    this.assertEquals( "value1" , it.next(), "#3-1" ) ;
    this.assertEquals( "key1" , it.key(), "#3-2" ) ;
    
    this.assertTrue( it.hasNext(), "#4-0" ) ;
    this.assertEquals( "value2" , it.next(), "#4-1" ) ;
    this.assertEquals( "key2" , it.key(), "#4-2" ) ;
    
    this.assertFalse( it.hasNext(), "#5" ) ;
}

system.data.maps.ArrayMapTest.prototype.testKeyIterator = function () 
{
    var it /*Iterator*/ = this.map.keyIterator() ;
    
    this.assertNotNull( it, "#1" ) ;
    this.assertTrue( it instanceof system.data.iterators.ArrayIterator , "#2" ) ;
    
    this.assertTrue( it.hasNext(), "#3-0" ) ;
    this.assertEquals( "key1" , it.next(), "#3-1" ) ;
    
    this.assertTrue( it.hasNext(), "#4-0" ) ;
    this.assertEquals( "key2" , it.next(), "#4-1" ) ;
    
    this.assertFalse( it.hasNext(), "#5" ) ;
}

system.data.maps.ArrayMapTest.prototype.testPut = function () 
{
    this.assertNull( this.map.put("key3","value3") , "#1") ;
    this.assertEquals( "value3" , this.map.put("key3","value4"), "#2") ;
}

system.data.maps.ArrayMapTest.prototype.testPutAll = function () 
{
    var m1 /*ArrayMap*/ = new system.data.maps.ArrayMap(["key1", "key2"],["value1", "value2"]) ;
    var m2 /*ArrayMap*/ = new system.data.maps.ArrayMap(["key3", "key4"],["value3", "value4"]) ;
    
    m1.putAll(m2) ;
    
    this.assertTrue( m1.containsKey("key4")     , "#1") ;
    this.assertTrue( m1.containsKey("key3")     , "#2") ;
    this.assertTrue( m1.containsValue("value4") , "#3") ;
    this.assertTrue( m1.containsValue("value3") , "#4") ;
}

system.data.maps.ArrayMapTest.prototype.testRemove = function () 
{
    this.assertEquals( this.map.remove("key2") , "value2", "#1" ) ;
    this.assertEquals( this.map.remove("key1") , "value1", "#2" ) ;
    this.assertNull( this.map.remove("key4") , "#3" ) ;
}

system.data.maps.ArrayMapTest.prototype.testSetKeyAt = function () 
{
    try
    {
        this.map.setKeyAt( 10 , "key3" ) ;
        this.fail("01-01 The setKeyAt method must throw a RangeError if the index is out of range") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof RangeError , "01-02 The setKeyAt method must throw a RangeError if the index is out of range" ) ;
        this.assertEquals( e.message , "ArrayMap.setKeyAt(10) failed with an index out of the range." , "01-03 The setKeyAt method must throw a RangeError if the index is out of range") ;
    }
    
    var entry /*MapEntry*/ ;
    
    entry = this.map.setKeyAt( 0, "key2" ) ;
    this.assertNull( entry , "02 The ArrayMap.setKeyAt failed, must return null when the passed-in key already exist in the map.") ;
    
    entry = this.map.setKeyAt( 0, "key10" ) ;
    this.assertEquals( entry.key   , "key1"  , "03-01 - The ArrayMap setKeyAt method failed : " + entry ) ;
    this.assertEquals( entry.value , "value1" , "03-02 - The ArrayMap setKeyAt method failed : " + entry ) ;
    
    entry = this.map.setKeyAt( 0, "key1" ) ;
    this.assertEquals( entry.key   , "key10"   , "04-01 - The ArrayMap setKeyAt method failed : " + entry ) ;
    this.assertEquals( entry.value , "value1"  , "04-02 - The ArrayMap setKeyAt method failed : " + entry ) ;
}

system.data.maps.ArrayMapTest.prototype.testSetValueAt = function () 
{
    try
    {
        this.map.setValueAt( 10 , "the value" ) ;
        this.fail("01-01 The setValueAt method must throw a RangeError if the index is out of range") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof RangeError , "01-02 The setValueAt method must throw a RangeError if the index is out of range") ;
        this.assertEquals( e.message , "ArrayMap.setValueAt(10) failed with an index out of the range." , "01-03 The setKeyAt method must throw a RangeError if the index is out of range") ;
    }
    
    var entry /*MapEntry*/ ;
    
    entry = this.map.setValueAt( 0, "value999" ) ;
    this.assertEquals( entry.key   , "key1"  , "03-01 - The ArrayMap setValueAt method failed : " + entry ) ;
    this.assertEquals( entry.value , "value1" , "03-02 - The ArrayMap setValueAt method failed : " + entry ) ;
    
    entry = this.map.setValueAt( 0, "value1" ) ;
    this.assertEquals( entry.key   , "key1"   , "04-01 - The ArrayMap setValueAt method failed : " + entry ) ;
    this.assertEquals( entry.value , "value999"  , "04-02 - The ArrayMap setValueAt method failed : " + entry ) ;
}

system.data.maps.ArrayMapTest.prototype.testSetSize = function () 
{
    this.assertEquals( 2 , this.map.size() ) ;
}

system.data.maps.ArrayMapTest.prototype.testToSource = function () 
{
    this.assertEquals
    ( 
        this.map.toSource() , 
        'new system.data.maps.ArrayMap(["key1","key2"],["value1","value2"])' , 
        "The ArrayMap toSource method failed."
    ) ;
}

system.data.maps.ArrayMapTest.prototype.testToString = function () 
{
    this.assertEquals( "{key1:value1,key2:value2}" , this.map.toString() ) ;
}