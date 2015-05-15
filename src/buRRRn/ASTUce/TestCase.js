
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

/* Constructor: TestCase
   A test case define the fixture to run multiple tests.
   
   To define a test case:
   1 - implement a subclass of "TestCase"
   2 - initialize the fixture state by overriding "setUp"
   3 - clean-up after a test by overridding "tearDown"
   
   Each test runs its own fixture so there can be
   no side effects among test runs.
   
   Here is an example:
   (code)
   Tests.myTest = function( name )
       {
       buRRRn.ASTUce.TestCase.call( this, name );
       }
   Tests.myTest.prototype = new buRRRn.ASTUce.TestCase();
   Tests.myTest.prototype.constructor = Tests.myTest;
   
   Tests.myTest.prototype.setUp = function()
       {
       this.valueA = 2;
       this.valueB = 3;
       }
   (end)
   
   For each test implement a method which interacts with the fixture.
   
   Verify the expected results with one or more assertions.
   
   (code)
   buRRRn.Tests.AllTests.prototype.testAdd = function()
       {
       var result = this.valueA + this.valueB;
       this.assertTrue( result == 5 );
       }
   (end)
   
   Once the methods are defined you can run them.
*/
buRRRn.ASTUce.TestCase = function( /*String*/ name )
    {
    this._name = name; //the name of the test case
    }

buRRRn.ASTUce.TestCase.prototype = buRRRn.ASTUce.Assertion;
buRRRn.ASTUce.TestCase.prototype.constructor = buRRRn.ASTUce.TestCase;

/* Method: countTestCases
   Counts the number of test cases executed by run (TestResult result).
*/
buRRRn.ASTUce.TestCase.prototype.countTestCases = function()
    {
    return 1;
    }

/* Method: createResult
   Creates a default TestResult object.
*/
buRRRn.ASTUce.TestCase.prototype.createResult = function()
    {
    return new buRRRn.ASTUce.TestResult();
    }

/* Method: run
   Runs the test case and collects the results in TestResult.
*/
buRRRn.ASTUce.TestCase.prototype.run = function( /*TestResult*/ result )
    {
    if( result == null )
        {
        //collecting the results with a default TestResult object
        result = this.createResult();
        }
    
    result.run( this );
    return result;
    }

/* Method: runBare
   Runs the bare test sequence.
*/
buRRRn.ASTUce.TestCase.prototype.runBare = function()
    {
    
    this.setUp();
    
    try
        {
        this.runTest();
        }
    /* attention
       for debugging only !!
    
      catch( e )
        {
        trace( e );
        }*/
    finally
        {
        this.tearDown();
        }
    
    /*!## patch: for Flash 6 AS1
    this.runTest();
    
    this.tearDown();
    
    //we catch Errors here
    if( this.__e != null )
        {
        //trace( this.__e );
        return this.__e;
        }
    */
    
    }

/* Method: runTest
   Override to run the test and assert its state.
*/
buRRRn.ASTUce.TestCase.prototype.runTest = function()
    {
    var runMethod;
    
    this.assertNotNull( this._name, buRRRn.ASTUce.strings.methodNameNull );
    this.assertNotUndefined( this._name, buRRRn.ASTUce.strings.methodNameUndef );
    
    try
        {
        if( !this.hasProperty( this._name ) )
            {
            throw new Error();
            }
        
        runMethod = this[this._name];
        }
    catch( e )
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodNotFound, this._name ) ); //core2
        }
    
    if( this._name.startsWith( "_" ) && (buRRRn.ASTUce.testPrivateMethods != true) ) //core2
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodshouldBePublic, this._name ) ); //core2
        }
    
    try
        {
        runMethod.call( this );
        }
    catch( e )
        {
        throw e;
        }
    
    /*!## patch: for Flash 6 AS1
    //here we could early check if an error has already occured
    //if( this.__e != null )
    //  {
    //  return;
    //  }
    
    if( this.hasProperty( this._name ) )
        {
        runMethod = this[this._name];
        }
    else
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodNotFound, this._name ) );
        return;
        }
    
    if( this._name.startsWith( "_" ) && (buRRRn.ASTUce.testPrivateMethods != true) )
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodshouldBePublic, this._name ) );
        return;
        }
    
    runMethod.call( this );
    */
    
    }

/* Method: setUp
   Sets up the fixture, for example, open a network connection.
   
   This method is called before a test is executed.
*/
buRRRn.ASTUce.TestCase.prototype.setUp = function()
    {
    
    }

/* Method: tearDown
   Tears down the fixture, for example, close a network connection.
   
   This method is called after a test is executed.
*/
buRRRn.ASTUce.TestCase.prototype.tearDown = function()
    {
    
    }

/* Method: toString
   Returns a string representation of the test case.
*/
buRRRn.ASTUce.TestCase.prototype.toString = function()
    {
    return( this.getConstructorName() + "( " + this.getName() + " )" ); //core2
    }

/* Getter: getName
   Gets the name of a TestCase.
*/
buRRRn.ASTUce.TestCase.prototype.getName = function()
    {
    if( this._name == undefined )
        {
        this._name = GetObjectPath( this ); //core2
        }
    
    return this._name;
    }

/* Setter: setName
   Sets the name of a TestCase.
*/
buRRRn.ASTUce.TestCase.prototype.setName = function( /*String*/ name )
    {
    this._name = name;
    }

