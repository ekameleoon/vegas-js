
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

/* Constructor: Boolean
   Creates a new Boolean value.
*/

/* Method: compareTo
   Compares this instance to a specified object and
   returns an indication of their relative values.
*/
Boolean.prototype.compareTo = function( obj )
    {
    if( obj == null )
        {
        return 1;
        }
    
    if( GetTypeOf( obj ) != "boolean" )
        {
        return; //ArgumentException - arg must be boolean
        }
    
    if( this.equals( obj )  )
        {
        return 0;
        }
    else if( this.equals( false ) )
        {
        return -1;
        }
    
    return 1;
    }

/* Method: clone
   Returns a copy by reference of this boolean.
   
   attention:
   If the instance is a primitive the behaviour
   is to return a copy by value.
*/
Boolean.prototype.clone = function()
    {
    return this;
    }

/* Method: copy
   Returns a copy by value of this object.
   
   note:
   this method always return a primitive.
*/
Boolean.prototype.copy = function()
    {
    return this.valueOf();
    }

/* Method: equals
   compare if two Booleans are equal by value.
*/
Boolean.prototype.equals = function( boolObj )
    {
    if( (boolObj == null) || (GetTypeOf( boolObj ) != "boolean") )
        {
        return false;
        }
    
    return( this.valueOf() == boolObj.valueOf() );
    }

/* Method: toBoolean
   Converts to an equivalent Boolean value.
*/
Boolean.prototype.toBoolean = function()
    {
    return this.valueOf(); //no conversion
    }

/* Method: toNumber
   Converts to an equivalent Number value.
*/
Boolean.prototype.toNumber = function()
    {
    if( this.valueOf() == true )
        {
        return 1;
        }
    
    return 0;
    }

/* Method: toObject
   Converts to an equivalent Object value.
*/
Boolean.prototype.toObject = function()
    {
    return new Boolean( this.valueOf() );
    }

/* Method: toSource
   Returns a string representing the source code of the boolean.
*/
Boolean.prototype.toSource = function()
    {
    if( this.equals( true ) )
        {
        return "true";
        }
    
    return "false";
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   Boolean.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Boolean.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

