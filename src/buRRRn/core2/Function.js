
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

/* Constructor: Function
   Creates a new function.
   
   note:
   In ActionScript you can not use the Function constructor,
   but you still can add methods to its prototype.
*/

/* Method: apply
   Allows you to apply a method of another object in the
   context of a different object (the calling object) (*ECMA-262*).
   
   Parameters:
   thisArg  - optionnal, allows to define the object to be used as the current object
   argArray - allows to pass an Array of arguments to the function
   
   (code)
   Function.prototype.apply = function( thisArg, argArray )
       {
       [native code]
       }
   (end)
*/

/* LocalVariable: arguments
   Returns the arguments object for the currently
   executing Function object (*ECMA-262*).
   
   note:
   The arguments property is only defined for a
   function while that function is executing.
   
   (code)
   arguments = [native code];
   (end)
*/

/* Method: call
   Allows you to call (execute) a method of another object
   in the context of a different object (the calling object) (*ECMA-262*).
   
   Parameters:
   thisObj - allows to define the object to be used as the current object,
             if not provided the Global object is used
   ...     - list of arguments to be passed to the function
   
   (code)
   Function.prototype.call = function( thisArg, ... )
       {
       [native code]
       }
   (end)
*/

/* Property: caller
   Returns a reference to the function that invoked the current function (*ECMA-262*).
   
   example:
   (code)
   
   function foobar()
       {
       if( foobar.caller == null )
           {
           return "foobar called from top level";
           }
       else
           {
           return "foobar called by another function";
           }
       }
   
   (end)
*/


/* Method: clone
   Returns a copy by value of this function.
   
   note:
   this method only exists to not break polymorphic calls
   on objects of different types.
   
   attention:
   we can not copy by reference a function,
   if you want to do that use apply or call method to make a kind of delegate.
   
   example:
   (code)
   toto = function( x, y )
       {
       return x + y;
       }
   
   titi = function( x, y )
       {
       return toto.apply( this, arguments );
       }
   (end)
*/
_global.Function.prototype.clone = function()
    {
    return this;
    }

/* Method: copy
   Returns a copy by value of this object.
   
   note:
   the function value is treated as
   a primitive even if it's a type object.
*/
_global.Function.prototype.copy = function()
    {
    return this.valueOf();
    }

/* Method: equals
   compare if two Functions are equal by reference.
*/
_global.Function.prototype.equals = function( fctObj )
    {
    if( (fctObj == null) || (GetTypeOf( fctObj ) != "function") )
        {
        return false;
        }
    
    if( this.valueOf() == fctObj.valueOf() )
        {
        return true;
        }
    
    /* note:
       In some environments the host return the
       body of the function so we can use that
       to make the comparison.
    */
    if( $CORE2_FCTNSTRING )
        {
        if( this.toString() == fctObj.toString() )
            {
            return true;
            }
        }
    
    return false;
    }

/* Method: toSource
   Should returns a string representing the source
   code of the function, but instead the choice
   has been made to only return the string
   "(function)".
   
   note:
   This choice is motivated by the fact that even
   if a function is a type it's not a data structure
   but more a code block and with the ISerializable
   interface we are interested only in serialization
   of data structures.
*/
_global.Function.prototype.toSource = function()
    {
    return "(function)";
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   attention:
   ActionScript return the string "[type Function]".
   
   (code)
   Function.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Function.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

