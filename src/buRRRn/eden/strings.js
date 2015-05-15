
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is eden: ECMAScript data exchange notation. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* NameSpace: strings
   Configure the eden library messages.
   
   exemple:
   (code)
   trace( String.format( buRRRn.eden.rez.pairIsIgnored, "toto", 5, 10 ) );
   (end)
   
   attention:
   Don't use eden to load its own resources message
   this will cause an infinite loop.
*/
buRRRn.eden.strings = {};

/* Property: requirePairValue
   multiSerialize require pairs of values
*/
buRRRn.eden.strings.requirePairValue     = "multiSerialize require pairs of values";

/* Property: pairIsIgnored
   name "{0}" is not a string, pair[{1},{2}] is ignored
*/
buRRRn.eden.strings.pairIsIgnored        = "name \"{0}\" is not a string, pair[{1},{2}] is ignored";

/* Property: reservedKeyword
   "{0}" is a reserved keyword
*/
buRRRn.eden.strings.reservedKeyword      = "\"{0}\" is a reserved keyword";

/* Property: futurReservedKeyword
   "{0}" is a future reserved keyword
*/
buRRRn.eden.strings.futurReservedKeyword = "\"{0}\" is a future reserved keyword";

/* Property: notValidPath
   "{0} is not a valid path
*/
buRRRn.eden.strings.notValidPath         = "\"{0}\" is not a valid path";

/* Property: unterminatedComment
   unterminated comment
*/
buRRRn.eden.strings.unterminatedComment  = "unterminated comment";

/* Property: errorComment
   syntax error (comment)
*/
buRRRn.eden.strings.errorComment         = "syntax error (comment)";

/* Property: errorIdentifier
   bad identifier
*/
buRRRn.eden.strings.errorIdentifier      = "bad identifier";

/* Property: notValidConstructor
   "{0}" is not a valid constructor
*/
buRRRn.eden.strings.notValidConstructor  = "\"{0}\" is not a valid constructor";

/* Property: doesNotExist
   "{0}" does not exists
*/
buRRRn.eden.strings.doesNotExist         = "\"{0}\" does not exists";

/* Property: errorConstructor
   bad constructor
*/
buRRRn.eden.strings.errorConstructor     = "bad constructor";

/* Property: errorLineTerminator
   bad string (found line terminator in string)
*/
buRRRn.eden.strings.errorLineTerminator  = "bad string (found line terminator in string)";

/* Property: errorString
   bad string (unterminated string)
*/
buRRRn.eden.strings.errorString          = "bad string (unterminated string)";

/* Property: errorArray
   bad array (unterminated array)
*/
buRRRn.eden.strings.errorArray           = "bad array (unterminated array)";

/* Property: errorObject
   bad object (unterminated object)
*/
buRRRn.eden.strings.errorObject          = "bad object (unterminated object)";

/* Property: malformedHexadecimal
   bad number (malformed hexadecimal)
*/
buRRRn.eden.strings.malformedHexadecimal = "bad number (malformed hexadecimal)";

/* Property: errorNumber
   bad number (not finite)
*/
buRRRn.eden.strings.errorNumber          = "bad number (not finite)";

/* Property: extRefDoesNotExist
   external reference "{0}" does not exists
*/
buRRRn.eden.strings.extRefDoesNotExist   = "external reference \"{0}\" does not exists";

/* Property: errorKeyword
   syntax error
*/
buRRRn.eden.strings.errorKeyword         = "syntax error";

/* Property: notAuthorizedConstructor
   "{0}" is not an authorized constructor
*/
buRRRn.eden.strings.notAuthorizedConstructor = "\"{0}\" is not an authorized constructor";

/* Property: notAuthorizedExternalReference
   "{0}" is not an authorized external reference
*/
buRRRn.eden.strings.notAuthorizedExternalReference = "\"{0}\" is not an authorized external reference";

/* Property: notAuthorizedPath
   "{0}" is not an authorized path
*/
buRRRn.eden.strings.notAuthorizedPath = "\"{0}\" is not an authorized path";

/* Property: notValidFunction
   "{0}" is not a valid function
*/
buRRRn.eden.strings.notValidFunction = "\"{0}\" is not a valid function";

/* Property: errorFunction
   bad function
*/
buRRRn.eden.strings.errorFunction = "bad function";

/* Property: notFunctionCallAllowed
   function call "{0}( {1} )"is not allowed
*/
buRRRn.eden.strings.notFunctionCallAllowed = "function call \"{0}( {1} )\"is not allowed";

/* Property: notAuthorizedFunction
   "{0}" is not an authorized function
*/
buRRRn.eden.strings.notAuthorizedFunction = "\"{0}\" is not an authorized function";

