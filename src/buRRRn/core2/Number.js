
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is core2: ECMAScript core objects 2nd gig. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2003-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: Number
   An object representation of the number data type
   and placeholder for numeric constants.
*/

/* Method: clone
   Returns a copy by reference of this boolean.
   
   attention:
   If the instance is a primitive the behaviour
   is to return a copy by value.
*/
Number.prototype.clone = function()
    {
    return this;
    }

/* Method: copy
   Returns a copy by value of this object.
   
   note:
   this method always return a primitive.
*/
Number.prototype.copy = function()
    {
    return this.valueOf();
    }

/* Method: equals
   compare if two Numbers are equal by value
*/
Number.prototype.equals = function( numObj )
    {
    if( (numObj == null) || (GetTypeOf( numObj ) != "number") )
        {
        return false;
        }
    
    if( isNaN(this) && isNaN(numObj))
        {
        return true ;
        }
    
    if( this.valueOf() == numObj.valueOf() )
        {
        return true;
        }
    
    return false;
    }

/* StaticProperty: MAX_VALUE
   Returns the largest number representable in ECMAScript (*ECMA-262*).
   
   (code)
   Number.MAX_VALUE = [native code];
   //Number.MAX_VALUE = 1.7976931348623157E+308;
   (end)
*/

/* StaticProperty: MIN_VALUE
   Returns the number closest to zero representable in ECMAScript (*ECMA-262*).
   
   (code)
   Number.MIN_VALUE = [native code];
   //Number.MIN_VALUE = 5.00E-324;
   (end)
*/

/* StaticProperty: NaN
   Special "not a number" value (*ECMA-262*).
   
   (code)
   Number.NaN = [native code];
   (end)
*/

/* StaticProperty: NEGATIVE_INFINITY
   Returns a value more negative than the largest negative number
   (-Number.MAX_VALUE) representable in ECMAScript (*ECMA-262*).
   
   (code)
   Number.NEGATIVE_INFINITY = [native code];
   (end)
*/

/* StaticProperty: POSITIVE_INFINITY
   Returns a value larger than the largest number
   (Number.MAX_VALUE) that can be represented in ECMAScript (*ECMA-262*).
   
   (code)
   Number.POSITIVE_INFINITY = [native code];
   (end)
*/

/* Method: toBoolean
   Converts to an equivalent Boolean value.
*/
Number.prototype.toBoolean = function()
    {
    if( isNaN( this ) || (this.valueOf() == 0) )
        {
        return false;
        }
    
    return true;
    }

if( !Number.prototype.toExponential )
    {
    
    /* Method: toExponential
       Returns a string representing the number in exponential notation (*ECMA-262*).
       
       (code)
       Number.prototype.toExponential = function( fractionDigits )
           {
           [native code]
           }
       (end)
       
       attention:
       First implemented in
         - Mozilla JavaScript v1.5
         - Microsoft JScript v5.5
       so we provide a patch for flash ActionScript.
    */
    Number.prototype.toExponential = function( /*int*/ fractionDigits )
        {
        var x, s, str, l, lm, n;
        x = this;
        s = "+";
        
        if( isNaN( x ) )
            {
            return "NaN";
            }
        
        if( x < 0 )
            {
            s = "-";
            x = -x;
            }
        
        if( x == Infinity )
            {
            return s + "Infinity";
            }
        
        l  = Math.floor( Math.log( x ) / Math.LN10 );
        lm = Math.pow( 10, l );
        n  = x / lm;
        
        if( fractionDigits == null )
            {
            str = n.toString();
            }
        else
            {
            if( fractionDigits < 0 )
                {
                fractionDigits = 0;
                }
            else if( fractionDigits > 20 )
                {
                fractionDigits = 20;
                }
            
            str = n.toFixed( fractionDigits );
            }
        
        str += "e" + s + l;
        
        return str;
        }
    
    }

if( !Number.prototype.toFixed )
    {
    
    /* Method: toFixed
       Returns a string representing the number in fixed-point notation (*ECMA-262*).
       
       (code)
       Number.prototype.toFixed = function( fractionDigits )
           {
           [native code]
           }
       (end)
       
       attention:
       First implemented in
         - Mozilla JavaScript v1.5
         - Microsoft JScript v5.5
       so we provide a patch for flash ActionScript.
    */
    Number.prototype.toFixed = function( /*int*/ fractionDigits )
        {
        var x, m, r, str, d, i;
        x = this;
        
        if( isNaN( x ) )
            {
            return "NaN";
            }
        
        if( (fractionDigits == null) || (fractionDigits < 0) )
            {
            fractionDigits = 0;
            }
        else if( fractionDigits > 20 )
            {
            fractionDigits = 20;
            }
        
        m   = Math.pow( 10, fractionDigits );
        r   = Math.round( x*m ) / m;
        str = r.toString();
        d   = str.split( "." )[1];
        
        if( d && (d.length < fractionDigits) )
            {
            for( i=0; i<(fractionDigits-d.length); i++ )
                {
                str += "0";
                }
            }
        
        return str;
        }
    
    }

/* Method: toNumber
   Converts to an equivalent Number value.
*/
Number.prototype.toNumber = function()
    {
    return this.valueOf(); //no conversion
    }

/* Method: toObject
   Converts to an equivalent Object value.
*/
Number.prototype.toObject = function()
    {
    return new Number( this.valueOf() );
    }

if( !Number.prototype.toPrecision )
    {
    
    /* Method: toPrecision
       Returns a string representing the number to a specified precision
       in fixed-point notation (*ECMA-262*).
       
       (code)
       Number.prototype.toPrecision = function( precision )
           {
           [native code]
           }
       (end)
       
       attention:
       First implemented in
         - Mozilla JavaScript v1.5
         - Microsoft JScript v5.5
       so we provide a patch for flash ActionScript.
    */
    Number.prototype.toPrecision = function( /*int*/ precision )
        {
        var x, l, m, r, str, d, i;
        x   = this;
        str = x.toString();
        
        if( isNaN( x ) )
            {
            return "NaN";
            }
        
        if( (precision == null) || (x == Infinity) || (x == -Infinity) )
            {
            return this.toString();
            }
        
        if( precision < 1 )
            {
            precision = 1;
            }
        else if( precision > 21 )
            {
            precision = 21;
            }
        
        if( str.length > precision )
            {
            return x.toExponential( precision - 1 );
            }
        
        l   = Math.floor( Math.log(x) / Math.LN10 );
        m   = Math.pow( 10, l + 1 - precision );
        r   = Math.round( x/m ) * m;
        str = r.toString();
        d   = str.split( "." ).join( "" );
        
        if( d && (d.length < precision) )
            {
            if( str.indexOf( "." ) == -1 )
                {
                str += ".";
                }
            
            for( i=0; i<(precision-d.length); i++ )
                {
                str += "0";
                }
            }
        
        return str;
        }
    
    }

/* Method: toSource
   Returns a string representing the source code of the number.
*/
Number.prototype.toSource = function()
    {
    return this.toString();
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   Number.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Number.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

