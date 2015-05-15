
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

/* Constructor: GenericParser
*/
buRRRn.eden.GenericParser = function( /*String*/ source, /*Object*/ callback )
    {
    if( callback == null )
        {
        callback = buRRRn.eden;
        }
    
    this.config  = buRRRn.eden.config;
    this.strings = buRRRn.eden.strings;
    
    //delegates
    this.log = function( message )
        {
        callback.log( message );
        }
    
    this.onParsed = function( value )
        {
        return callback.onParsed( value );
        }
    
    this.isAuthorized = function( value )
        {
        return callback.isAuthorized( value );
        }
    
    this.addAuthorized = function()
        {
        callback.addAuthorized.apply( callback, arguments );
        }
    
    this.removeAuthorized = function()
        {
        callback.removeAuthorized.apply( callback, arguments );
        }
    
    this.source = source;
    this.pos    = 0;
    this.ch     = "";
    }

/* Method: getCharAt
*/
buRRRn.eden.GenericParser.prototype.getCharAt = function( /*Int*/ pos )
    {
    if( pos == null )
        {
        pos = this.pos;
        }
    
    return this.source.charAt( pos );
    }

/* Method: getChar
*/
buRRRn.eden.GenericParser.prototype.getChar = function()
    {
    return this.source.charAt( this.pos );
    }

/* Method: next
*/
buRRRn.eden.GenericParser.prototype.next = function()
    {
    this.ch = this.getChar();
    this.pos++;
    return this.ch;
    }

/* Method: hasMoreChar
*/
buRRRn.eden.GenericParser.prototype.hasMoreChar = function()
    {
    return( this.pos <= (this.source.length-1) );
    }

/* Method: eval
   To override.
*/
buRRRn.eden.GenericParser.prototype.eval = function()
    {
    
    }

/* StaticMethod: evaluate
   To override.
*/
buRRRn.eden.GenericParser.evaluate = function( /*String*/ source, callback )
    {
    var parser = new buRRRn.eden.GenericParser( source, callback );
    return parser.eval();
    }

/* Method: isAlpha
*/
buRRRn.eden.GenericParser.prototype.isAlpha = function( /*char*/ c )
    {
    return( (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) );
    }

/* Method: isASCII
*/
buRRRn.eden.GenericParser.prototype.isASCII = function( /*char*/ c )
    {
    return( c.charCodeAt( 0 ) <= 255 );
    }

/* Method: isDigit
*/
buRRRn.eden.GenericParser.prototype.isDigit = function( /*char*/ c )
    {
    return( ("0" <= c) && (c <= "9") );
    }

/* Method: isHexDigit
*/
buRRRn.eden.GenericParser.prototype.isHexDigit = function( /*char*/ c )
    {
    return( this.isDigit( c ) || (("A" <= c) && (c <= "F")) || (("a" <= c) && (c <= "f")) );
    }

/* Method: isOctalDigit
*/
buRRRn.eden.GenericParser.prototype.isOctalDigit = function( /*char*/ c )
    {
    return( ("0" <= c) && (c <= "7") );
    }

/* Method: isUnicode
*/
buRRRn.eden.GenericParser.prototype.isUnicode = function( /*char*/ c )
    {
    return( c.charCodeAt( 0 ) > 255 );
    }

