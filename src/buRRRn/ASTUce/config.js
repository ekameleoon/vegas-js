
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Document: config
*/

/* StaticProperty: verbose
   Boolean configuring the getInfo method behaviour.
   
   true  - more verbose
   false - less verbose
*/
buRRRn.ASTUce.verbose = true;

/* StaticProperty: showConstructorList
   Boolean option to display all the constructors being tested.
   
   true  - show constructors list
   false - don't show constructor list
*/
buRRRn.ASTUce.showConstructorList = false;

/* StaticProperty: showObjectSource
   Boolean option to display the source of objects being compared.
   
   true  - show the object source
   false - don't show the source
   
   note:
   It help you to debug to see
   (code)
   ## AssertionFailedError : expected:<{a:1,b:2,c:3}> but was:<{a:1,b:2,c:4}> ##
   (end)
   instead of
   (code)
   ## AssertionFailedError : expected:<[object Object]> but was:<[object Object]> ##
   (end)
*/
buRRRn.ASTUce.showObjectSource = true;

/* StaticProperty: invertExpectedActual
   Boolean option to invert the order of the arguments: expected, actual
   in buRRRn.ASTUce.Assertion.
   
   true  - the argument order is: actual, expected. (inverted)
   false - the argument order is: expected, actual. (default)
*/
buRRRn.ASTUce.invertExpectedActual = false;

/* StaticProperty: testPrivateMethods
   Boolean configuring the behaviour of ASTUce regarding private methods.
   
   true  - test private methods
   false - don't test private methods
   
   note:
   By default in ECMAScript all methods are public,
   but by convention we use an underscore before the name
   of a method to indicate its private nature.
   
   ASTUce will not test methods starting with an underscore
   except if you force testPrivateMethods = true, then
   methods as _testSomething will be tested by the framework.
*/
/*!## TODO:
      perharps if needed in the futur we will need
      to provide this parameter per TestCase or TestSuite
      instead of the global actual on/off parameter.
*/
buRRRn.ASTUce.testPrivateMethods = false;

/* StaticProperty: testMyself
   Boolean option allowing the ASTUce framework to test itself.
   
   true  - add to tests *buRRRn.Tests.AllTests.suite()*.
   false - add nothing
*/
buRRRn.ASTUce.testMyself = false;

