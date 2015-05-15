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

getPackage("system.events.mocks" ) ;

load("unittests/system/events/mocks/MockEventListener.js") ;

load("unittests/system/events/CoreEventDispatcherTest.js") ;
load("unittests/system/events/DelegateTest.js") ;
load("unittests/system/events/EventTest.js") ;
load("unittests/system/events/EventDispatcherTest.js") ;
load("unittests/system/events/EventFactoryTest.js") ;
load("unittests/system/events/EventListenerBatchTest.js") ;
load("unittests/system/events/EventListenerEntryTest.js") ;
load("unittests/system/events/EventListenerGroupTest.js") ;
load("unittests/system/events/EventListenerTest.js") ;
load("unittests/system/events/EventPhaseTest.js") ;
load("unittests/system/events/EventQueueTest.js") ;
load("unittests/system/events/EventTargetTest.js") ;
load("unittests/system/events/FrontControllerTest.js") ;
load("unittests/system/events/IEventDispatcherTest.js") ;

// ----o constructor

system.events.AllTests = {} ;

system.events.AllTests.suite = function() 
{
    var TestSuite = buRRRn.ASTUce.TestSuite;
    
    var suite = new TestSuite( "system.events unit tests" );
    
    //suite.simpleTrace = true;
    
    suite.addTest( new TestSuite( system.events.CoreEventDispatcherTest ) ) ;
    suite.addTest( new TestSuite( system.events.DelegateTest            ) ) ;
    suite.addTest( new TestSuite( system.events.EventTest               ) ) ;
    suite.addTest( new TestSuite( system.events.EventDispatcherTest     ) ) ;
    suite.addTest( new TestSuite( system.events.EventFactoryTest        ) ) ;
    suite.addTest( new TestSuite( system.events.EventListenerBatchTest  ) ) ;
    suite.addTest( new TestSuite( system.events.EventListenerEntryTest  ) ) ;
    suite.addTest( new TestSuite( system.events.EventListenerGroupTest  ) ) ;
    suite.addTest( new TestSuite( system.events.EventListenerTest       ) ) ;
    suite.addTest( new TestSuite( system.events.EventPhaseTest          ) ) ;
    suite.addTest( new TestSuite( system.events.EventQueueTest          ) ) ;
    suite.addTest( new TestSuite( system.events.EventTargetTest         ) ) ;
    suite.addTest( new TestSuite( system.events.FrontControllerTest     ) ) ;
    suite.addTest( new TestSuite( system.events.IEventDispatcherTest    ) ) ;
    
    return suite ;
}
