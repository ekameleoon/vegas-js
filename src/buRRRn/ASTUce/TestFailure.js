
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

/* Constructor: TestFailure
   A TestFailure collects a failed test together with
   the caught exception.
*/
/*!## TODO:
      - refactor some methods to replace them with getter/setter
      - or suppress getter/setter and use ECMAScript natural way of doing things!
*/
buRRRn.ASTUce.TestFailure = function( /*ITest*/ failedTest, /*Error*/ thrownException )
    {
    this._failedTest = failedTest;
    this._thrownException = thrownException;
    }

/* Method: failedTest
   Gets the failed test.
*/
buRRRn.ASTUce.TestFailure.prototype.failedTest = function()
    {
    return this._failedTest;
    }

/* Method: thrownException
   Gets the thrown exception.
*/
buRRRn.ASTUce.TestFailure.prototype.thrownException = function()
    {
    return this._thrownException;
    }

/* Method: exceptionMessage
*/
buRRRn.ASTUce.TestFailure.prototype.exceptionMessage = function()
    {
    return this.thrownException().getMessage();
    }

/* Method: isFailure
   Returns a Boolean indicating if the
   failure was an AssertionFailedError.
*/
buRRRn.ASTUce.TestFailure.prototype.isFailure = function()
    {
    return( this.thrownException() instanceof buRRRn.ASTUce.AssertionFailedError );
    }

/* Method: toString
   Returns a short description of the failure.
*/
buRRRn.ASTUce.TestFailure.prototype.toString = function()
    {
    return( this.failedTest() + ": " + this.exceptionMessage() );
    }

/* Method: trace
*/
/*!## TODO: remove useless method ? */
buRRRn.ASTUce.TestFailure.prototype.trace = function()
    {
    trace( this.toSource() ); //core2
    }

