
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

if( $CORE2_ERROR_CTOR )
    {
    
    /* Constructor: Error
       Contains information about errors.
       
       note:
       We provide an Error object constructor
       for hosts not providing one (Flash 6 for exemple).
    */
    _global.Error = function( /*String*/ message )
        {
        if( message == null )
            {
            message = "";
            }
        
        /*!## TODO: this property should be defined in prototype, check that */
        this.name    = "Error";
        this.message = String( message );
        }
    }

/* SharedProperty: message
   The default initial value of the error message.
   
   attention:
   see ECMA-262 spec 15.11.4.3 Error.prototype.message.
   
   "The initial value of Error.prototype.message is an implementation-defined string."
   
   In FLash ActionScript message default value is "Error".
   
   In Opera browser message default value is "Generic Error".
   
   Because we want the same message for all hosts we then override this default value.
*/
Error.prototype.message = "";

/* Method: equals
   compare if two Errors are equal by value.
*/
Error.prototype.equals = function( errObj )
    {
    if( (errObj == null) || (GetTypeOf( errObj ) != "error") )
        {
        return false;
        }
    
    return( this.toString() == errObj.toString() );
    }

/* Getter: getMessage
   Returns the error message string.
*/
Error.prototype.getMessage = function()
    {
    if( this.message == undefined )
        {
        return "";
        }
    
    return this.message;
    }

/* Property: message
   Returns an error message string (*ECMA-262*).
*/

/* SharedProperty: name
   Returns the name of an error (*ECMA-262*).
   
   Default value is "Error".
   
   (code)
   Error.prototype.name = [native code];
   //Error.prototype.name = "Error";
   (end)
*/

/* Method: toSource
   Returns a string representing the source code of the object.
*/
Error.prototype.toSource = function()
    {
    return "new Error(\""+this.message+"\")";
    }

/* Method: toString
   Converts the value of this instance to its
   equivalent string representation.
*/
Error.prototype.toString = function()
    {
    var separator, message;
    separator = " : ";
    message   = this.getMessage();
    
    if( message != "" )
        {
        message = separator + message;
        }
    
    return "## " + this.name + message + " ##";
    }

