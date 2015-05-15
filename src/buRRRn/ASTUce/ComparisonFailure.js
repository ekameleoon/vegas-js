
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

/* Constructor: ComparisonFailure
   Thrown when an assert equals for Strings failed.
*/
buRRRn.ASTUce.ComparisonFailure = function( expected, actual, /*String*/ message )
    {
    buRRRn.ASTUce.AssertionFailedError.call( this, message );
    
    /*!## TODO: define name property in prototype ? */
    this.name     = "ComparisonFailure";
    this.expected = expected;
    this.actual   = actual;
    }

buRRRn.ASTUce.ComparisonFailure.prototype = new buRRRn.ASTUce.AssertionFailedError();
buRRRn.ASTUce.ComparisonFailure.prototype.constructor = buRRRn.ASTUce.ComparisonFailure;

/* Method: getMessage
   Returns "..." in place of common prefix and "..." in
   place of common suffix between expected and actual.
*/
buRRRn.ASTUce.ComparisonFailure.prototype.getMessage = function()
    {
    if( (this.expected == null) || (this.actual == null) )
        {
        return buRRRn.ASTUce.Assertion.format( this.expected, this.actual, this.message );
        }
    
    var expected, actual, end, dots, i, j, k;
    expected = "";
    actual   = "";
    end      = Math.min( this.expected.length, this.actual.length );
    dots     = "...";
    
    for( i=0; i<end; i++ )
        {
        if( this.expected.charAt(i) != this.actual.charAt(i) )
            {
            break;
            }
        }
    
    j = this.expected.length - 1;
    k = this.actual.length - 1;
    
    for( ; k>=i && j>=i; k--,j-- )
        {
        if( this.expected.charAt(j) != this.actual.charAt(k) )
            {
            break;
            }
        }
    
    if( j<i && k<i )
        {
        expected = this.expected;
        actual   = this.actual;
        }
    else
        {
        expected = this.expected.substring( i, j+1 );
        actual   = this.actual.substring(   i, k+1 );
        
        if( i<=end && i>0 )
            {
            expected = dots + expected;
            actual   = dots + actual;
            }
        
        if( j < this.expected.length-1 )
            {
            expected = expected + dots;
            }
        
        if( k < this.actual.length-1 )
            {
            actual = actual + dots;
            }
        }
    
    return buRRRn.ASTUce.Assertion.format( expected, actual, this.message );
    }

