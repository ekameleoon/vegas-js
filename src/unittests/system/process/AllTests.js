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

getPackage("system.process.mocks" ) ;

load("unittests/system/process/mocks/MockAction.js") ;
load("unittests/system/process/mocks/MockTask.js") ;
load("unittests/system/process/mocks/MockTaskReceiver.js") ;
load("unittests/system/process/mocks/MockActionReceiver.js") ;
load("unittests/system/process/mocks/MockCommand.js") ;

load("unittests/system/process/ActionTest.js") ;
load("unittests/system/process/ActionEntryTest.js") ;
load("unittests/system/process/BatchTest.js") ;
load("unittests/system/process/BatchTaskTest.js") ;
load("unittests/system/process/ChainTest.js") ;
load("unittests/system/process/CoreActionTest.js") ;
load("unittests/system/process/InitializerTest.js") ;
load("unittests/system/process/LockableTest.js") ;
load("unittests/system/process/PriorityTest.js") ;
load("unittests/system/process/ResetableTest.js") ;
load("unittests/system/process/ResumableTest.js") ;
load("unittests/system/process/RunnableTest.js") ;
load("unittests/system/process/StartableTest.js") ;
load("unittests/system/process/StoppableTest.js") ;
load("unittests/system/process/TaskTest.js") ;
load("unittests/system/process/TaskGroupTest.js") ;
load("unittests/system/process/TaskPhaseTest.js") ;
load("unittests/system/process/TimeoutPolicyTest.js") ;
load("unittests/system/process/TimerTest.js") ;

system.process.AllTests = {} ;

system.process.AllTests.suite = function() 
{
    var TestSuite = buRRRn.ASTUce.TestSuite;
    
    var suite = new TestSuite( "system.process unit tests" );
    
    //suite.simpleTrace = true;
    
    suite.addTest( new TestSuite( system.process.ActionTest        ) ) ;
    suite.addTest( new TestSuite( system.process.ActionEntryTest   ) ) ;
    suite.addTest( new TestSuite( system.process.BatchTest         ) ) ;
    suite.addTest( new TestSuite( system.process.BatchTaskTest     ) ) ;
    suite.addTest( new TestSuite( system.process.ChainTest         ) ) ;
    suite.addTest( new TestSuite( system.process.CoreActionTest    ) ) ;
    suite.addTest( new TestSuite( system.process.InitializerTest   ) ) ;
    suite.addTest( new TestSuite( system.process.LockableTest      ) ) ;
    suite.addTest( new TestSuite( system.process.PriorityTest      ) ) ;
    suite.addTest( new TestSuite( system.process.ResetableTest     ) ) ;
    suite.addTest( new TestSuite( system.process.ResumableTest     ) ) ;
    suite.addTest( new TestSuite( system.process.RunnableTest      ) ) ;
    suite.addTest( new TestSuite( system.process.StartableTest     ) ) ;
    suite.addTest( new TestSuite( system.process.StoppableTest     ) ) ;
    suite.addTest( new TestSuite( system.process.TaskTest          ) ) ;
    suite.addTest( new TestSuite( system.process.TaskGroupTest     ) ) ;
    suite.addTest( new TestSuite( system.process.TaskPhaseTest     ) ) ;
    suite.addTest( new TestSuite( system.process.TimeoutPolicyTest ) ) ;
    suite.addTest( new TestSuite( system.process.TimerTest         ) ) ;
    
    return suite ;
}
