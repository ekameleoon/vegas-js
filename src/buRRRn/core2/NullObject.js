
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

/* Constructor: NullObject
   Utilitarian object allowing to treat
   a null value as an object.
   
   note:
   usefull for some polymorphic situation.
   
   see: <http://c2.com/cgi/wiki?NullObject>
*/
_global.NullObject = function()
    {
    
    }

/* Method: toString
   Returns a string representing the specified object.
*/
NullObject.prototype.toString = function()
    {
    return "null";
    }

/* Method: valueOf
   Returns the primitive value of the specified object.
*/
NullObject.prototype.valueOf = function()
    {
    return null;
    }

