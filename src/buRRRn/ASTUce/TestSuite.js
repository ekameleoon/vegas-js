
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

/* Constructor: TestSuite
   A TestSuite is a Composite of Tests (implements ITest).
   
   It runs a collection of test cases.
   
   all the arguments are .
   
   theConstructor - optionnal, can be either an object
                    or a string, if a string he takes precedence over
                    the name argument.
   
   name           - optionnal, the name of the test suite.
   
   simpleTrace    - optionnal, allows you to reduce the
                    amount of tracing in the output to 1 line.
*/
buRRRn.ASTUce.TestSuite = function( /*Object*/ theConstructor, /*String*/ name, /*Boolean*/ simpleTrace )
    {
    var ctorName, member;
    
    if( simpleTrace == null )
        {
        simpleTrace = false;
        }
    
    this.simpleTrace = simpleTrace;
    this._tests       = [];
    this._name        = "Unknown";
    
    //Constructs an empty TestSuite
    if( (theConstructor == null) && (name == null) )
        {
        return;
        }
    
    //theConstructor is a string
    if( GetTypeOf( theConstructor ) == "string" )
        {
        this.setName( theConstructor );
        return;
        }
    
    if( theConstructor.prototype == null )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.objectNotCtor, GetObjectPath( theConstructor ) ) ) ); //core2
        return;
        }
    else
        {
        ctorName = theConstructor.prototype.getConstructorName(); //core2
        }
    
    /* attention:
       Due to ECMAscript limitation all custom constructors
       are public, but by convention constructors starting
       with "_" are considered private.
    */
    if( ctorName.startsWith( "_" ) ) //core2
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.ctorNotPublic, ctorName ) ) );
        return;
        }
    
    if( name == null )
        {
        this.setName( ctorName );
        }
    else
        {
        this.setName( name );
        }
    
    for( member in theConstructor.prototype )
        {
        /* attention:
           if we use
           if( theConstructor.prototype.hasOwnProperty( member ) )
           we can't inherits testCase
        */
        if( typeof( theConstructor.prototype[member] ) == "function" )
            {
            //trace( "MEMBER = " + member );
            this._addTestMethod( member, theConstructor );
            }
        }
    
    if( this.testCount() == 0 )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.noTestsFound, ctorName ) ) ); //core2
        }
    
    }

/* Method: addTest
   Adds a test to the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.addTest = function( /*ITest*/ test )
    {
    /* attention:
       If you try to test something that has not been included
       then off course you obtain a warning.
    */
    if( test === undefined )
        {
        this.addTest( this._warning( buRRRn.ASTUce.strings.argTestDoesNotExist ) );
        return;
        }
    
    /* note:
       as we don't have native interface in ECMAScript
       we can't test if a particular object implements an interface,
       but we can test if a constructor inherits from another constructor.
       
       Here the design choice is to check if the argument "test" inherits
       from TestCase or from TestSuite, the only constructors
       "virtually implementing" ITest.
    */
    if( (test instanceof buRRRn.ASTUce.TestCase) || (test instanceof buRRRn.ASTUce.TestSuite) )
        {
        this._tests.push( test );
        }
    else
        {
        this.addTest( this._warning( buRRRn.ASTUce.strings.argTestNotATest ) );
        }
    }

/* Method: addTestSuite
   Adds the tests from the given constructor to the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.addTestSuite = function( /*Object*/ testConstructor )
    {
    this.addTest( new buRRRn.ASTUce.TestSuite( testConstructor ) );
    }

/* PrivateMethod - _addTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._addTestMethod = function( /*String*/ method, /*Object*/ theConstructor )
    {
    var test;
    if( !this._isTestMethod( method ) )
        {
        return;
        }

    if( !this._isPublicTestMethod( method ) && (buRRRn.ASTUce.testPrivateMethods != true) )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.testMethNotPublic, method ) ) ); //core2
        return;
        }
    
    this.addTest( buRRRn.ASTUce.TestSuite.createTest( theConstructor, method ) );
    }

/* StaticMethod: createTest
*/
buRRRn.ASTUce.TestSuite.createTest = function( /*Object*/ theConstructor, /*String*/ name )
    {
    var test;
    
    if( theConstructor == null )
        {
        return( this._warning( String.format( buRRRn.ASTUce.strings.canNotCreateTest, name ) ) );
        }
    
    if( theConstructor.prototype == null )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.objectNotCtor, GetObjectPath( theConstructor ) ) ) );
        return;
        }
    
    /*!## TODO: add error checking if path could not be found ? */
    var path = GetObjectPath( theConstructor ); //core2
    
    /* attention:
       Dynamic instanciation hack using ECMAscript eval().
       
       Should work with any ECMA-262 hosts.
    */
    /*!## TODO: use EDEN for dynamic instanciaion ? */
    //var test = eval( "new "+path+"( \""+name+"\" )" );
    var tmp  = eval( path );
    var test = new tmp( name );
    
    return test;
    }

/* Method: countTestCases
   Counts the number of test cases that will be run by this test.
*/
buRRRn.ASTUce.TestSuite.prototype.countTestCases = function()
    {
    var count, tests, i;
    count = 0;
    tests = this.tests();
    
    for( i=0; i<tests.length; i++ )
        {
        count += tests[i].countTestCases();
        }
    
    return count;
    }

/* PrivateMethod - _isPublicTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._isPublicTestMethod = function( /*String*/ method )
    {
    return( this._isTestMethod( method ) && !method.startsWith( "_" ) ); //core2
    }

/* PrivateMethod - _isTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._isTestMethod = function( /*String*/ method )
    {
    /* attention:
       some differences with Junit here,
       we do not differenciate "Test" and "test"
       and also by convention "_Test" and "_test"
       are considered valid private test methods.
    */
    method = method.toLowerCase();
    return( method.startsWith( "test" ) || method.startsWith( "_test" ) ); //core2
    }

/* Method: run
   Runs the tests and collects their result in a TestResult.
*/
buRRRn.ASTUce.TestSuite.prototype.run = function( /*TestResult*/ result )
    {
    var test, tests, i;
    tests = this.tests();
    
    for( i=0; i< tests.length; i++ )
        {
        if( result.shouldStop() )
            {
            break;
            }
        
        test = tests[i];
        this.runTest( test, result );
        }
    }

/* Method: runTest
*/
buRRRn.ASTUce.TestSuite.prototype.runTest = function( /*ITest*/ test, /*TestResult*/ result )
    {
    test.run( result );
    }

/* Method: testAt
   Returns the test at the given index.
*/
buRRRn.ASTUce.TestSuite.prototype.testAt = function( /*Int*/ index )
    {
    return this._tests[index];
    }

/* Method: testCount
   Returns the number of tests in this suite.
*/
buRRRn.ASTUce.TestSuite.prototype.testCount = function()
    {
    return this._tests.length;
    }

/* Method: tests
   Returns the tests as an Array.
*/
buRRRn.ASTUce.TestSuite.prototype.tests = function()
    {
    return this._tests;
    }

/* Method: toString
*/
buRRRn.ASTUce.TestSuite.prototype.toString = function( /*int*/ increment )
    {
    var str, CRLF, TAB, SPC, i, j, tests, count;
    str   = "";
    CRLF  = "\n";
    TAB   = "\t";
    SPC   = TAB;
    
    if( increment == null )
        {
        increment = 0;
        }
    else
        {
        for( j=0; j<increment; j++ )
            {
            SPC += TAB;
            }
        
        TAB = SPC;
        }
    
    tests = this.tests();
    count = this.testCount();
    str  += this.getName();
    if( count > 0 )
        {
        str += CRLF + TAB + "{" + CRLF;
        if( this.simpleTrace )
            {
            str += TAB + this.countTestCases() + " Tests ..." + CRLF;
            }
        else
            {
            for( i=0; i<count; i++ )
                {
                if( tests[i] instanceof buRRRn.ASTUce.TestSuite )
                    {
                    increment++;
                    }
                
                str += TAB + tests[i].toString( increment ) + CRLF;
                
                if( tests[i] instanceof buRRRn.ASTUce.TestSuite )
                    {
                    increment--;
                    }
                }
            }
        str += TAB + "}";
        }
    return str;
    }

/* Setter: setName
   Sets the name of the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.setName = function( /*String*/ name )
    {
    this._name = name;
    }

/* Getter: getName
   Returns the name of the suite.
   Not all test suites have a name and this method can return null.
*/
buRRRn.ASTUce.TestSuite.prototype.getName = function()
    {
    if( this._name == undefined )
        {
        this._name = GetObjectPath( this ); //core2
        }
    
    return this._name;
    }

/* PrivateMethod - _warning
   Returns a test which will fail and log a warning message.
*/
buRRRn.ASTUce.TestSuite.prototype._warning = function( /*String*/ message )
    {
    var TC;
    TC = new buRRRn.ASTUce.TestCase( "warning" );
    TC.runTest = function()
        {
        this.fail( message );
        }
    
    return TC;
    }

