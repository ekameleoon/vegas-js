
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

if( !buRRRn.ASTUce.strings )
    {
    /* NameSpace: strings
       Configure the ASTUce framework messages.
       
       attention:
       The framework can test itself only with english messages
       due to the ComparisonFailureTest which compare results to english message.
    */
    buRRRn.ASTUce.strings = {};
    }

/* Property: expectedNotSame
   {0}expected not same
*/
buRRRn.ASTUce.strings.expectedNotSame      = "{0}expected not same";

/* Property: expectedSame
   {0}expected same:<{1}> was not:<{2}>
*/
buRRRn.ASTUce.strings.expectedSame         = "{0}expected same:<{1}> was not:<{2}>";

/* Property: expectedButWas
   {0}expected:<{1}> but was:<{2}>
*/
buRRRn.ASTUce.strings.expectedButWas       = "{0}expected:<{1}> but was:<{2}>";

/* Property: methodNameNull
   The method name is null
*/
buRRRn.ASTUce.strings.methodNameNull       = "The method name is null";

/* Property: methodNameUndef
   The method name is undefined
*/
buRRRn.ASTUce.strings.methodNameUndef      = "The method name is undefined";

/* Property: methodNotFound
   Method "{0}" not found
*/
buRRRn.ASTUce.strings.methodNotFound       = "Method \"{0}\" not found";

/* Property: methodshouldBePublic
   Method "{0}" should be public
*/
buRRRn.ASTUce.strings.methodshouldBePublic = "Method \"{0}\" should be public";

/* Property: objectNotCtor
   Object "{0}" is not a constructor
*/
buRRRn.ASTUce.strings.objectNotCtor        = "Object \"{0}\" is not a constructor";

/* Property: ctorNotPublic
   Constructor "{0}" is not public
*/
buRRRn.ASTUce.strings.ctorNotPublic        = "Constructor \"{0}\" is not public";

/* Property: noTestsFound
   No tests found in "{0}"
*/
buRRRn.ASTUce.strings.noTestsFound         = "No tests found in \"{0}\"";

/* Property: argTestDoesNotExist
   the argument "test" does not exist in the objects namespace (check your includes!)
*/
buRRRn.ASTUce.strings.argTestDoesNotExist  = "the argument \"test\" does not exist in the objects namespace (check your includes!)";

/* Property: argTestNotATest
   the argument "test" does not inherit from TestCase or TestSuite
*/
buRRRn.ASTUce.strings.argTestNotATest      = "the argument \"test\" does not inherit from TestCase or TestSuite";

/* Property: testMethNotPublic
   Test method "{0}" isn't public
*/
buRRRn.ASTUce.strings.testMethNotPublic    = "Test method \"{0}\" isn't public";

/* Property: canNotCreateTest
   Cannot instantiate "{0}" test case
*/
buRRRn.ASTUce.strings.canNotCreateTest     = "Cannot instantiate \"{0}\" test case";

/* Property: nameError
   error
*/
buRRRn.ASTUce.strings.nameError            = "error";

/* Property: nameFailure
   failure
*/
buRRRn.ASTUce.strings.nameFailure          = "failure";

/* Property: PrtTime
   Time: {0}
*/
buRRRn.ASTUce.strings.PrtTime              = "Time: {0}";

/* Property: PrtElapsedTime
   {0}h:{1}mn:{2}s:{3}ms
*/
buRRRn.ASTUce.strings.PrtElapsedTime       = "{0}h:{1}mn:{2}s:{3}ms";

/* Property: PrtOneDefect
   There was {0} {1}
*/
buRRRn.ASTUce.strings.PrtOneDefect         = "There was {0} {1}:";

/* Property: PrtMoreDefects
   There were {0} {1}s
*/
buRRRn.ASTUce.strings.PrtMoreDefects       = "There were {0} {1}s:";

/* Property: PrtOK
   OK ({0} test{1})
*/
buRRRn.ASTUce.strings.PrtOK                = "OK ({0} test{1})";

/* Property: PrtFailure
   FAILURES!!!
*/
buRRRn.ASTUce.strings.PrtFailure           = "FAILURES!!!";

/* Property: PrtFailureDetails
   Tests run: {0},  Failures: {1},  Errors: {2}
*/
buRRRn.ASTUce.strings.PrtFailureDetails    = "Tests run: {0},  Failures: {1},  Errors: {2}";

