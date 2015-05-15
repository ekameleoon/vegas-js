
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

/* Interface: ITestListener
   A Listener for test progress.
*/
buRRRn.ASTUce.ITestListener = function()
    {
    
    }

/* Method: addError
   An error occurred.
*/
buRRRn.ASTUce.ITestListener.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    
    }

/* Method: addFailure
   A failure occurred.
*/
buRRRn.ASTUce.ITestListener.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    
    }

/* Method: endTest
   A test ended.
*/
buRRRn.ASTUce.ITestListener.prototype.endTest = function( /*ITest*/ test )
    {
    
    }

/* Method: startTest
   A test started.
*/
buRRRn.ASTUce.ITestListener.prototype.startTest = function( /*ITest*/ test )
    {
    
    }

