
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

/* Constructor: TestResult
   A TestResult collects the results of executing a test case.
   
   It is an instance of the Collecting Parameter pattern.
   
   The test framework distinguishes between failures and errors.
   
   A failure is anticipated and checked for with assertions.
   
   Errors are unanticipated problems like an ArrayIndexOutOfBoundsException.
*/
/*!## TODO:
      - refactor some methods to replace them with getter/setter
      - or suppress getter/setter and use ECMAScript natural way of doing things!
      - check the array copy/clone , beware of reference copy!
*/
buRRRn.ASTUce.TestResult = function()
    {
    this._failures  = [];
    this._errors    = [];
    this._listeners = [];
    this._runTests  = 0;
    this._stop      = false;
    }

/* Method: addError
   Adds an error to the list of errors.
   
   The passed in exception caused the error.
*/
buRRRn.ASTUce.TestResult.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    var i, listeners;
    this._errors.push( new buRRRn.ASTUce.TestFailure( test, e ) );
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].addError( test, e );
        }
    }

/* Method: addFailure
   Adds a failure to the list of failures.
   
   The passed in exception caused the failure.
*/
buRRRn.ASTUce.TestResult.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    var i, listeners;
    this._failures.push( new buRRRn.ASTUce.TestFailure( test, afe ) );
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].addFailure( test, afe );
        }
    }

/* Method: addListener
   Registers a TestListener.
*/
buRRRn.ASTUce.TestResult.prototype.addListener = function( /*TestListener*/ listener )
    {
    this._listeners.push( listener );
    }

/* Method: removeListener
   Unregisters a TestListener.
*/
buRRRn.ASTUce.TestResult.prototype.removeListener = function( /*TestListener*/ listener )
    {
    var index;
    index = this._listeners.indexOf( listener );
    if( index > -1 )
        {
        this._listeners.splice( index, 1 );
        }
    }

/* Method: cloneListeners
   Returns a copy of the listeners.
*/
buRRRn.ASTUce.TestResult.prototype.cloneListeners = function()
    {
    return this._listeners.clone(); //core2
    }

/* Method: endTest
   Informs the result that a test was completed.
*/
buRRRn.ASTUce.TestResult.prototype.endTest = function( /*ITest*/ test )
    {
    var listeners, i;
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].endTest( test );
        }
    }

/* Method: errorCount
   Gets the number of detected errors.
*/
buRRRn.ASTUce.TestResult.prototype.errorCount = function()
    {
    return this._errors.length;
    }

/* Method: errors
   Returns an Array for the errors.
*/
buRRRn.ASTUce.TestResult.prototype.errors = function()
    {
    return this._errors;
    }

/* Method: failureCount
   Gets the number of detected failures.
*/
buRRRn.ASTUce.TestResult.prototype.failureCount = function()
    {
    return this._failures.length;
    }

/* Method: failures
   Returns an Array for the failures.
*/
buRRRn.ASTUce.TestResult.prototype.failures = function()
    {
    return this._failures;
    }

/* Method: run
   Runs a TestCase.
*/
buRRRn.ASTUce.TestResult.prototype.run = function( /*TestCase*/ test )
    {
    var p;
    this.startTest( test );
    
    p = new buRRRn.ASTUce.IProtectable();
    p.protect = function()
        {
        return test.runBare();
        }
    
    this.runProtected( test, p );
    this.endTest( test );
    }

/* Method: runProtected
   Runs a TestCase.
*/
buRRRn.ASTUce.TestResult.prototype.runProtected = function( /*ITest*/ test, /*Protectable*/ p )
    {
    
    try
        {
        p.protect();
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            this.addFailure( test, e );
            }
        else if( e instanceof Error )
            {
            this.addError( test, e );
            }
        }    
    
    /*!## patch: for Flash 6 AS1
    var e;
    e = p.protect();
    
    if( e instanceof buRRRn.ASTUce.AssertionFailedError )
        {
        this.addFailure( test, e );
        }
    else if( e instanceof Error )
        {
        this.addError( test, e );
        }
    */
    }

/* method: runCount
   Gets the number of run tests.
*/
buRRRn.ASTUce.TestResult.prototype.runCount = function()
    {
    return this._runTests;
    }

/* Method: shouldStop
   Checks whether the test run should stop.
*/
buRRRn.ASTUce.TestResult.prototype.shouldStop = function()
    {
    return this._stop;
    }

/* Method: startTest
   Informs the result that a test will be started.
*/
buRRRn.ASTUce.TestResult.prototype.startTest = function( /*ITest*/ test )
    {
    var count, listeners, i;
    count = test.countTestCases();
    this._runTests += count;
    
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].startTest( test );
        }
    }

/* Method: stop
   Marks that the test run should stop.
*/
buRRRn.ASTUce.TestResult.prototype.stop = function()
    {
    this._stop = true;
    }

/* Method: wasSuccessful
   Returns whether the entire test was successful or not.
*/
buRRRn.ASTUce.TestResult.prototype.wasSuccessful = function()
    {
    return( (this.failureCount() == 0) && (this.errorCount() == 0) );
    }

