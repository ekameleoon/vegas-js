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

system.data.queues.CircularQueueTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.queues.CircularQueueTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.queues.CircularQueueTest.prototype.constructor = system.data.queues.CircularQueueTest ;

proto = system.data.queues.CircularQueueTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var q = new system.data.queues.CircularQueue() ;
    this.assertNotNull( q ) ;
    var a = q.toArray() ;
    this.assertEquals( 0 , a.length ) ;
}

proto.testInherit = function () 
{
    var q = new system.data.queues.CircularQueue() ;
    this.assertTrue( q instanceof system.data.Queue ) ;
}

proto.testConstructorWithArray = function () 
{
    var q = new system.data.queues.CircularQueue(NaN, [2,3,4]) ; 
    
    this.assertNotNull( q ) ;
    
    var a = q.toArray() ;
    
    this.assertEquals( 3 , a.length ) ;
    
    this.assertEquals( 2 , a[0] ) ;
    this.assertEquals( 3 , a[1] ) ;
    this.assertEquals( 4 , a[2] ) ;
}

proto.testClear = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ; 
    
    var q = new CircularQueue( NaN , [2,3,4]) ; 
    
    q.clear() ; 
    
    this.assertEquals( 0 , q.size() ) ;
}

proto.testClone = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ; 
    
    var q = new CircularQueue( NaN , [2,3,4] ) ;
    var c = q.clone() ;
    
    this.assertNotNull( c, "#01") ;
    this.assertTrue( c instanceof CircularQueue , "#02" ) ;
    this.assertFalse( c == q , "#03" ) ;
    this.assertEquals( q.size() , c.size() , "#04" ) ;
}

proto.testContains = function () 
{
    var q = new system.data.queues.CircularQueue() ;
    
    q.enqueue("item") ;
    
    this.assertTrue( q.contains("item")    ,  "#01" ) ;
    this.assertFalse( q.contains("unknow") ,  "#02" ) ;
}

proto.testDequeue = function () 
{
    var q = new system.data.queues.CircularQueue( NaN , [1,2,3,4] ) ;
    
    this.assertTrue( q.dequeue() , "01-01" ) ;
    this.assertEquals( q.size()  , 3 , "01-02" ) ;
    
    this.assertTrue( q.dequeue() , "02-01" ) ;
    this.assertEquals( q.size()  , 2 , "02-02" ) ;
    
    this.assertTrue( q.dequeue() , "03-01" ) ;
    this.assertEquals( q.size()  , 1 , "03-02" ) ;
    
    this.assertTrue( q.dequeue() , "04-01" ) ;
    this.assertEquals( q.size()  , 0 , "04-02" ) ;
    
    this.assertFalse( q.dequeue() , "05-01" ) ;
    this.assertEquals( q.size()  , 0 , "05-02" ) ;
}

proto.testEnqueue = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ;
    
    var q ;
    
    q = new CircularQueue(NaN, [1,2,3,4]) ;
    this.assertEquals( q.element() , 1 , "The CircularQueue element method failed." ) ;
    
    q = new CircularQueue() ;
    this.assertUndefined( q.element(), "The CircularQueue element method failed." ) ;
}

proto.testElement = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ;
     
    var q = new CircularQueue() ;
    
    this.assertTrue(q.enqueue(1)       , "01-01" ) ;
    this.assertEquals( q.size()    , 1 , "01-02" ) ;
    this.assertEquals( q.element() , 1 , "01-03" ) ;
    
    this.assertTrue(q.enqueue(2)       , "02-01" ) ;
    this.assertEquals( q.size()    , 2 , "02-02" ) ;
    this.assertEquals( q.element() , 1 , "02-03" ) ;
    
    this.assertTrue( q.enqueue(3)      , "03-01" ) ;
    this.assertEquals( q.size()    , 3 , "03-02" ) ;
    this.assertEquals( q.element() , 1 , "03-03" ) ;
}

proto.testIsEmpty = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ;
    
    var q = new CircularQueue() ;
    
    this.assertTrue( q.isEmpty() , "#01" ) ;
    
    q.enqueue("test") ;
    
    this.assertFalse( q.isEmpty() , "#02" ) ;
    
    q.clear() ;
    
    this.assertTrue( q.isEmpty() , "#03" ) ;
}

proto.testIterator = function () 
{
    var q = new system.data.queues.CircularQueue( NaN , [2,3,4] ) ;
    
    var it = q.iterator() ;
    
    this.assertTrue ( it instanceof system.data.iterators.ProtectedIterator , "#01" ) ;
    
    var count = 0 ;
    while( it.hasNext() )
    {
        count += it.next() ;
    }
    this.assertEquals( 9 , count , "#02" ) ;
}

proto.testPeek = function () 
{
    var q ;
    
    q = new system.data.queues.CircularQueue( NaN , [1,2,3,4] ) ;
    this.assertEquals( q.peek() , 1 , "The CircularQueue peek method failed." ) ;
    
    q = new system.data.queues.CircularQueue() ;
    this.assertNull( q.peek(), "The CircularQueue peek method failed." ) ;
}

proto.testPoll = function () 
{
    var q ;
    
    q = new system.data.queues.CircularQueue( NaN , [1,2,3,4] ) ;
    
    this.assertEquals( q.poll() , 1 , "01-01" ) ;
    this.assertEquals( q.size() , 3 , "01-02" ) ;
    
    this.assertEquals( q.poll() , 2 , "02-01" ) ;
    this.assertEquals( q.size() , 2 , "02-02" ) ;
    
    this.assertEquals( q.poll() , 3 , "03-01" ) ;
    this.assertEquals( q.size() , 1 , "03-02" ) ;
    
    this.assertEquals( q.poll() , 4 , "04-01" ) ;
    this.assertEquals( q.size() , 0 , "04-02" ) ;
}

proto.testSize = function () 
{
    var q = new system.data.queues.CircularQueue() ;
    
    this.assertEquals( 0 , q.size() ,  "#01") ;
    
    q.enqueue("test") ;
    
    this.assertEquals( 1 , q.size() ,  "#01") ;
}

proto.testToArray = function () 
{
    var CircularQueue = system.data.queues.CircularQueue ;
    
    var q ;
    var a ;
    
    q = new CircularQueue() ;
    a = q.toArray() ;
    
    this.assertNotNull( a , "#01" ) ;
    this.assertEquals( 0 , a.length , "#02" ) ;
    
    q.enqueue(2) ;
    q.enqueue(3) ;
    q.enqueue(4) ; 
    
    a = q.toArray() ;
    
    this.assertNotNull( a , "#03" ) ;
    
    this.assertEquals( 3 , a.length , "#04" ) ;
    
    this.assertEquals( 2 , a[0] , "#05" ) ;
    this.assertEquals( 3 , a[1] , "#06" ) ;
    this.assertEquals( 4 , a[2] , "#07" ) ;
}
proto.testToSource = function () 
{
    var q ;
    
    q = new system.data.queues.CircularQueue(99999) ;
    
    this.assertEquals(q.toSource() , "new system.data.queues.CircularQueue(99999)" , "#01") ;
    
    q = new system.data.queues.CircularQueue( 5 , ["item1", "item2"] ) ;
    
    this.assertEquals(q.toSource() , "new system.data.queues.CircularQueue(5,[\"item1\",\"item2\"])" , "#02") ;
}

proto.testToString = function () 
{
    var q ;
    
    q = new system.data.queues.CircularQueue() ;
    
    this.assertEquals( q.toString() , "{}" , "#01") ;
    
    q = new system.data.queues.CircularQueue( 4 , ["item1", "item2"] ) ;
    
    this.assertEquals( q.toString() , "{item1,item2}" , "#02" ) ;
}

///////

delete proto ;