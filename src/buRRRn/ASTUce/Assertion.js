
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

/* Singleton: Assertion
   A set of assert methods.
   
   Messages are only displayed when an assert fails.
   
   note:
   Assertion is used because Assert is a reserved
   ECMAscript futur keyword.
*/
buRRRn.ASTUce.Assertion = {};

/* StaticMethod: assertTrue
   Asserts that a condition is true.
   
   If it isn't it throws/trace an <AssertionFailedError> with the given message.
*/
buRRRn.ASTUce.Assertion.assertTrue = function( /*Boolean*/ condition, /*String*/ message )
    {
    if( !condition )
        {
        this.fail( message );
        }
    }

/* StaticMethod: assertFalse
   Asserts that a condition is false.
   
   If it isn't it throws/trace an <AssertionFailedError>.
*/
buRRRn.ASTUce.Assertion.assertFalse = function( /*Boolean*/ condition, /*String*/ message )
    {
    this.assertTrue( !condition, message );
    }

/* StaticMethod: assertEquals
   Asserts that two objects are equal.
   
   If they are not an <AssertionFailedError> is thrown/trace with the given message.
*/
buRRRn.ASTUce.Assertion.assertEquals = function( expected, actual, /*String*/ message )
    {
    if( (expected == null) && (actual == null) )
        {
        return;
        }
    
    if( (expected != null) && expected.equals( actual ) ) //core2
        {
        return;
        }
    
    if( ( GetTypeOf( expected ) == "string" ) || ( GetTypeOf( actual ) == "string" ) ) //core2
        {
        throw new buRRRn.ASTUce.ComparisonFailure( expected, actual, message );
        /*!## patch: for Flash 6 AS1
        this.__e = new buRRRn.ASTUce.ComparisonFailure( expected, actual, message );
        */
        }
    else
        {
        this._failNotEquals( expected, actual, message );
        }
    }

/* StaticMethod: assertNotNull
   Asserts that an object is not null.
   
   If it is an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotNull = function( obj, /*String*/ message )
    {
    this.assertTrue( obj != null, message );
    }

/* StaticMethod: assertNull
   Asserts that an object is null.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNull = function( obj, /*String*/ message )
    {
    this.assertTrue( obj == null, message );
    }

/* StaticMethod: assertUndefined
   Asserts that an object is undefined.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertUndefined = function( obj, /*String*/ message )
    {
    this.assertTrue( obj == undefined, message );
    }

/* StaticMethod: assertNotUndefined
   Asserts that an object is not undefined.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotUndefined = function( obj, /*String*/ message )
    {
    this.assertTrue( obj != undefined, message );
    }

/* StaticMethod: assertSame
   Asserts that two objects refer to the same object.
   
   If they are not an <AssertionFailedError> is thrown with the given message.
   
   note:
   same object mean same reference so the comparison is by reference not by value.
*/
buRRRn.ASTUce.Assertion.assertSame = function( expected, actual, /*String*/ message )
    {
    if( expected == null )
        {
        expected = new NullObject(); //core2
        }
    
    if( expected.referenceEquals( actual ) ) //core2
        {
        return;
        }
    
    this._failNotSame( expected, actual, message );
    }

/* StaticMethod: assertNotSame
   Asserts that two objects refer to the same object.
   
   If they are not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotSame = function( expected, actual, /*String*/ message )
    {
    if( expected == null )
        {
        expected = new NullObject(); //core2
        }
    
    if( expected.referenceEquals( actual ).toBoolean() ) //core2
        {
        this._failSame( expected, actual, message );
        }
    }

/* StaticMethod: fail
   Fails a test with the given message.
*/
buRRRn.ASTUce.Assertion.fail = function( /*String*/ message )
    {
    throw new buRRRn.ASTUce.AssertionFailedError( message );
    /*!## patch: for Flash 6 AS1
    this.__e = new buRRRn.ASTUce.AssertionFailedError( message );
    */
    }

/* StaticPrivateMethod: _failSame
*/
buRRRn.ASTUce.Assertion._failSame = function( expected, actual, /*String*/ message )
    {
    var formatted = "";
    if( message != null )
        {
        formatted = message + " ";
        }
    
    this.fail( String.format( buRRRn.ASTUce.strings.expectedNotSame, formatted ) ); //core2
    }

/* StaticPrivateMethod: _failNotSame
*/
buRRRn.ASTUce.Assertion._failNotSame = function( expected, actual, /*String*/ message )
    {
    var formatted= "";
    if( message != null )
        {
        formatted= message + " ";
        }
    
    this.fail( String.format( buRRRn.ASTUce.strings.expectedSame, formatted, expected, actual ) ); //core2
    }

/* StaticPrivateMethod: _failNotEquals
*/
buRRRn.ASTUce.Assertion._failNotEquals = function( expected, actual, /*String*/ message )
    {
    if( buRRRn.ASTUce.showObjectSource && (expected != null) && (actual != null) )
        {
        expected = expected.toSource(); //core2
        actual   = actual.toSource(); //core2
        }
    
    if( buRRRn.ASTUce.invertExpectedActual )
        {
        var tmp  = expected;
        expected = actual;
        actual   = tmp;
        }
    
    this.fail( buRRRn.ASTUce.Assertion.format( expected, actual, message ) );
    }

/* StaticMethod: format
*/
buRRRn.ASTUce.Assertion.format = function( expected, actual, /*String*/ message )
    {
    var formatted = "";
    if( (message != null) && (message != "") )
        {
        formatted = message + " ";
        }
    
    return( String.format( buRRRn.ASTUce.strings.expectedButWas, formatted, expected, actual ) ); //core2
    }

