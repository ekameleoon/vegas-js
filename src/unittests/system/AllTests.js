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

/////////////////

getPackage("system.data") ;
getPackage("system.errors") ;
getPackage("system.evaluators") ;
getPackage("system.events") ;
getPackage("system.formatters") ;
getPackage("system.logging") ;
getPackage("system.numeric") ;
getPackage("system.process") ;
getPackage("system.signals") ;

load("unittests/system/CloneableTest.js") ;
load("unittests/system/ComparableTest.js") ;
load("unittests/system/ComparatorTest.js") ;
load("unittests/system/EnumTest.js") ;
load("unittests/system/EquatableTest.js") ;
load("unittests/system/SerializableTest.js") ;
load("unittests/system/SerializerTest.js") ;
load("unittests/system/SortableTest.js") ;

load("unittests/system/data/AllTests.js") ;
load("unittests/system/errors/AllTests.js") ;
load("unittests/system/evaluators/AllTests.js") ;
load("unittests/system/events/AllTests.js") ;
load("unittests/system/formatters/AllTests.js") ;
load("unittests/system/ioc/AllTests.js") ;
load("unittests/system/logging/AllTests.js") ;
load("unittests/system/numeric/AllTests.js") ;
load("unittests/system/process/AllTests.js") ;
load("unittests/system/signals/AllTests.js") ;

/////////////////

system.AllTests = {} ;

system.AllTests.suite = function() 
{
    var TestSuite = buRRRn.ASTUce.TestSuite;
    
    var suite = new TestSuite( "system unit tests" );
    
    suite.addTest( new TestSuite( system.CloneableTest    ) );
    suite.addTest( new TestSuite( system.ComparableTest   ) );
    suite.addTest( new TestSuite( system.ComparatorTest   ) );
    suite.addTest( new TestSuite( system.EnumTest         ) );
    suite.addTest( new TestSuite( system.EquatableTest    ) );
    suite.addTest( new TestSuite( system.SerializableTest ) );
    suite.addTest( new TestSuite( system.SerializerTest   ) );
    suite.addTest( new TestSuite( system.SortableTest     ) );
    
    suite.addTest( system.data.AllTests.suite()       );
    suite.addTest( system.errors.AllTests.suite()     );
    suite.addTest( system.evaluators.AllTests.suite() );
    suite.addTest( system.events.AllTests.suite()     );
    suite.addTest( system.formatters.AllTests.suite() );
    suite.addTest( system.ioc.AllTests.suite()        );
    suite.addTest( system.logging.AllTests.suite()    );
    suite.addTest( system.numeric.AllTests.suite()    );
    suite.addTest( system.process.AllTests.suite()    );
    suite.addTest( system.signals.AllTests.suite()    );
    
    return suite;
}