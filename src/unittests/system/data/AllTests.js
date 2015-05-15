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

load("unittests/system/data/BoundableTest.js") ;
load("unittests/system/data/CollectionTest.js") ;
load("unittests/system/data/DataTest.js") ;
load("unittests/system/data/IdentifiableTest.js") ;
load("unittests/system/data/IterableTest.js") ;
load("unittests/system/data/IteratorTest.js") ;
load("unittests/system/data/MapTest.js") ;
load("unittests/system/data/OrderedIteratorTest.js") ;
load("unittests/system/data/QueueTest.js") ;
load("unittests/system/data/SetTest.js") ;
load("unittests/system/data/TypeableTest.js") ;
load("unittests/system/data/ValidatorTest.js") ;
load("unittests/system/data/ValueObjectTest.js") ;

getPackage("system.data.iterators") ;
getPackage("system.data.maps") ;

load("unittests/system/data/collections/AllTests.js") ;
load("unittests/system/data/iterators/AllTests.js") ;
load("unittests/system/data/maps/AllTests.js") ;
load("unittests/system/data/queues/AllTests.js") ;

system.data.AllTests = {} ;

system.data.AllTests.suite = function() 
{
    var TestSuite = buRRRn.ASTUce.TestSuite;
    
    var suite = new TestSuite( "system.data unit tests" );
    
    //suite.simpleTrace = true;
    
    suite.addTest( new TestSuite( system.data.BoundableTest       ) ) ;
    suite.addTest( new TestSuite( system.data.CollectionTest      ) ) ;
    suite.addTest( new TestSuite( system.data.DataTest            ) ) ;
    suite.addTest( new TestSuite( system.data.IdentifiableTest    ) ) ;
    suite.addTest( new TestSuite( system.data.IterableTest        ) ) ;
    suite.addTest( new TestSuite( system.data.IteratorTest        ) ) ;
    suite.addTest( new TestSuite( system.data.MapTest             ) ) ;
    suite.addTest( new TestSuite( system.data.OrderedIteratorTest ) ) ;
    suite.addTest( new TestSuite( system.data.QueueTest           ) ) ;
    suite.addTest( new TestSuite( system.data.SetTest             ) ) ;
    suite.addTest( new TestSuite( system.data.TypeableTest        ) ) ;
    suite.addTest( new TestSuite( system.data.ValidatorTest       ) ) ;
    suite.addTest( new TestSuite( system.data.ValueObjectTest     ) ) ;
    
    suite.addTest( system.data.collections.AllTests.suite() );
    suite.addTest( system.data.iterators.AllTests.suite() );
    suite.addTest( system.data.maps.AllTests.suite() );
    suite.addTest( system.data.queues.AllTests.suite() );
    
    return suite ;
}
