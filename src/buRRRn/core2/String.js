
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

/* Constructor: String
   An object representing a series of characters in a text string.
   
   attention:
   Some methods of the String object have been intentionally
   ignored because it feels like they should relate to a custom
   HTMLString object.
   
   here the list: anchor, big, blink, bold, fixed, fontcolor,
   fontsize, italics, link, small, strike, sub, and sup.
   
   attention:
   Some other methods have been ignored because of
   their relation with the RegExp object (match, search).
*/

/* Method: charAt
   Returns the character at the specified index (*ECMA-262*).
   
   note:
   Values of index out of valid range return an empty string.
   
   (code)
   String.prototype.charAt = function( index )
       {
       [native code]
       }
   (end)
*/

/* Method: charCodeAt
   Returns a number indicating the Unicode value of
   the character at the given index (*ECMA-262*).
   
   note:
   If there is no character at the specified index,
   NaN is returned.
   
   (code)
   String.prototype.charCodeAt = function( index )
       {
       [native code]
       }
   (end)
*/

/* Method: clone
   Returns a copy by reference of this string.
   
   attention:
   If the instance is a primitive the behaviour
   is to return a copy by value.
   
   exemple:
   (code)
   str1 = new String( "hello world" );
   str2 = str1.clone(); //reference copy
   
   str3 = "hello world";
   str4 = str3.clone(); //not a reference but a primitive value copy
   (end)
*/
String.prototype.clone = function()
    {
    return this;
    }

/* StaticMethod: compare
   Compares the two specified String objects.
   
   Parameters:
     strA       - first string to compare
     strB       - with second string
     ignoreCase - optionnal, allow to take into account the case for comparison
*/
String.compare = function( /*String*/ strA, /*String*/ strB, /*Boolean*/ ignoreCase )
    {
    if( (strA == null) || (strB == null) )
        {
        if( strA == strB )
            {
            return 0; //both null
            }
        else if( strA == null )
            {
            return -1; //strA is null -1
            }
        else
            {
            return 1; //strB is null 1
            }
        //return (strA == null) ? -1 : 1; // a is null -1, B is null 1
        }
    
    if( (GetTypeOf( strA ) != "string") || (GetTypeOf( strB ) != "string") )
        {
        return; //ArgumentStringExpected
        }
    
    //we force conversion to a string primitive type
    /*!## TODO: use valueOf method ? */
    strA = strA.toString();
    strB = strB.toString();
    
    if( ignoreCase == true )
        {
        strA = strA.toLowerCase();
        strB = strB.toLowerCase();
        }
    
    if( strA == strB )
        {
        return 0;
        }
    else if( strA.length > strB.length )
        {
        return 1;
        }
    else
        {
        return -1;
        }
    }

/* Method: compareTo
   Compares this instance with a specified Object.
   
   note:
   returns value are
   less than zero       -  this instance is less than value
   zero                 -  this instance is equal to value
   greater than zero    -  this instance is greater than value (or value is null)
*/
String.prototype.compareTo = function( value )
    {
    
    if( value == null )
        {
        return 1;
        }
    
    if( GetTypeOf( value ) != "string" )
        {
        return; //ArgumentException - value must be string
        }
    
    return String.compare( this.valueOf(), value.valueOf() );
    }

/* Method: concat
   Returns a string value containing the concatenation
   of two or more supplied strings (*ECMA-262*).
   
   note:
   If any of the arguments are not strings, they are first
   converted to strings before being concatenated.
   
   (code)
   String.prototype.concat = function( ... )
       {
       [native code]
       }
   (end)
*/

/* Method: copy
   Returns a copy by value of this object.
   
   note:
   this method always return a primitive.
*/
String.prototype.copy = function()
    {
    return this.valueOf();
    }

/* Method: equals
   Determines if this instance is equal to a String value.
*/
String.prototype.equals = function( strObj )
    {
    if( (strObj == null) || (GetTypeOf( strObj ) != "string") )
        {
        return false;
        }
    
    /* note: we force a string primitive type */
    /*!## TODO: use valueOf ? */
    if( this.toString() == strObj.toString() )
        {
        return true;
        }
    
    return false;
    }

/* StaticProperty: empty
   Represents the empty string.
   
   This property should be read-only.
*/
String.empty = "";

/* Method: endsWith
   Determines whether the end of this instance matches the specified String.
*/
String.prototype.endsWith = function( /*String*/ value )
    {
    if( value == null )
        {
        return false;
        }
    
    if( this.length < value.length )
        {
        return false;
        }
    
    return String.compare( this.substr( this.length-value.length ), value) == 0;
    }

/* StaticMethod: format
   Replaces the format item in a specified String with
   the text equivalent of the value of a specified Object instance.
   
   usage:
   (code)
   String.format( "...", obj )
   String.format( "...", [obj0, obj1, obj2, obj3, ...] )
   String.format( "...", obj0, obj1, obj2, obj3, ... )
   (end)
   
   Parameters:
   about the format parameters *{index[,alignment][:formatString]}*
         
     index       -  a zero-based integer
                    (if equal null or undefined will be replaced by
                    the empty string).
     
     alignment   -  optionnal, integer which specify the minimum width
                    of the region to contain the formated value.
                    if the length of the value is less than the alignment
                    then the region is padded with spaces.
                    if alignment is negative then the value is left justified.
                    if alignment is positive then the value is right justified.
                    the comma *,* is required if alignment is specified.
                    
     formatString - optional, string of formating code.
                    the colon *:* is required if formatString is specified.
                    the default formatString is the space chars.
         
   exemple:
   (code)
   var test = String.Format( "Brad's dog has {0,-8:_} fleas.", 42 );
   trace( test ); //output: "Brad's dog has 42______ fleas."
   
   var test = String.Format( "Brad's dog has {0,-8:.} fleas.", 42 );
   trace( test ); //output: "Brad's dog has 42...... fleas."
   
   var test = String.Format( "Brad's dog has {0,8:.} fleas.", 42 );
   trace( test ); //output: "Brad's dog has ......42 fleas."
   
   var test = String.Format( "Brad's dog has {0,-8} fleas.", 42 );
   trace( test ); //output: "Brad's dog has 42       fleas."
   (end)
   
   note:
   if the format is malformed as
   (code)
   String.Format( "Brad's dog has {0:_} fleas.", 42 );
   (end)
   the malformed part is ignored and interpreted as
   (code)
   String.Format( "Brad's dog has {0} fleas.", 42 );
   (end)
   
   except if the chars after the colon can be converted to a number
   (code)
   String.Format( "Brad's dog has {0:10} fleas.", 42 );
   (end)
   
   in this case the format is interpreted as
   (code)
   String.Format( "Brad's dog has {0,10} fleas.", 42 );
   (end)
*/
String.format = function( /*String*/ format, /*...*/ argN )
    {
    if( format == null )
        {
        return; //ArgumentNullException
        }
    
    var formated, args, str, ch, pos;
    formated = "";
    args     = Array.fromArguments( arguments );
    args.shift();
    
    if( format.indexOf( "{" ) == -1 )
        {
        return format;
        }
    
    str = ch = "";
    pos = 0;
    
    /* innerFunction: next
    */
    var next = function()
        {
        ch = format.charAt( pos );
        pos++;
        return ch;
        }
    
    /* innerFunction: getIndexValue
    */
    var getIndexValue = function( /*Int*/ index )
        {
//         if( args[ index ] != undefined )
//             {
//             return args[ index ].toString();
//             }
//         
//         return "";
        switch( args[ index ] )
            {
            case undefined:
            return "";
            
            case null:
            return "null";
            
            default:
            return args[ index ].toString();
            }
        }
    
    var expression, run, index, expValue, paddingChar, spaceAlign;
    
    while( pos < format.length )
        {
        next();
        
        if( ch == "{" )
            {
            expression = next();
            run        = true;
            
            while( run )
                {
                next();
                
                if( ch != "}" )
                    {
                    expression += ch;
                    }
                else
                    {
                    run = false;
                    }
                }
            
            index       = null;
            paddingChar = " "; //default char is SPC
            expValue    = "";
            
            if( expression.indexOfAny( [ ",", ":" ] ) == -1 )
                {
                index    = parseInt( expression );
                expValue = getIndexValue( index );
                str     += expValue;
                }
            else
                {
                var vPos = expression.indexOf( "," );
                var fPos = expression.indexOf( ":" );
                
                if( vPos == -1 )
                    {
                    vPos = fPos;
                    fPos = -1;
                    }
                
                index    = parseInt( expression.substring( 0, vPos ) );
                expValue = getIndexValue( index );
                
                if( fPos == -1 )
                    {
                    spaceAlign = parseInt( expression.substr( vPos+1 ) );
                    }
                else
                    {
                    spaceAlign  = parseInt( expression.substring( vPos+1, fPos ) );
                    paddingChar = expression.substr( fPos+1 );
                    }
                
                if( isNaN( spaceAlign ) )
                    {
                    //do nothing
                    }
                else if( spaceAlign > 0 )
                    {
                    expValue = expValue.padLeft( spaceAlign, paddingChar );
                    }
                else
                    {
                    expValue = expValue.padRight( -spaceAlign, paddingChar );
                    }
                
                str += expValue;
                }
            
            }
        else
            {
            str += ch;
            }
        }
    
    return str;
    }

/* StaticMethod: fromCharCode
   Returns a string from a number of Unicode character values (*ECMA-262*).
   
   (code)
   String.fromCharCode = function( ... )
       {
       [native code]
       }
   (end)
*/

/* Method: indexOf
   Returns the character position where the first
   occurrence of a substring occurs within a String object,
   or -1 if not found (*ECMA-262*).
   
   note:
   If startindex is negative, startindex is treated as zero.
   If it is larger than the greatest character position index,
   it is treated as the largest possible index.
   
   (code)
   String.prototype.indexOf = function( /String/ subString, /Int/ startIndex )
       {
       [native code]
       }
   (end)
*/

/* Method: indexOfAny
   Reports the index of the first occurrence in this instance
   of any character in a specified array of characters (or Strings).
   
   Parameters;
     startIndex - optionnal, allow to specifiy the starting index for the search
     count      - optionnal, allow to specify the count of index before ending the search
*/
String.prototype.indexOfAny = function( /*Array*/ anyOf, /*int*/ startIndex, /*int*/ count )
    {
    var i, endIndex;
    
    if( anyOf == null )
        {
        return; //ArgumentNullException
        }
    
    if( this.length == 0 )
        {
        return -1;
        }
    
    if( (startIndex == null) || (startIndex < 0) )
        {
        startIndex = 0;
        }
    
    if( (count == null) || (count < 0) || (count > anyOf.length - startIndex) )
        {
        endIndex =  anyOf.length - 1;
        }
    else
        {
        endIndex = startIndex + count - 1;
        }
    
    for( i=startIndex; i<=endIndex ; i++ )
        {
        if( this.indexOf( anyOf[i] ) > -1 )
            {
            return i;
            }
        }
    
    return -1;
    }

/* Method: insert
   Inserts a specified instance of String at
   a specified index position in this instance.
   
   note:
   if index is null, we directly append the value to the end of the string.
   
   if index is zero, we directly insert it to the begining of the string.
*/
String.prototype.insert = function( /*int*/ startIndex, /*String*/ value )
    {    
    var str, strA, strB;
    str = this.copy();
    
    if( value == null )
        {
        return str;
        }
    
    if( str == "" )
        {
        return value;
        }
    
    if( startIndex == 0 )
        {
        return value + str;
        }
    else if( (startIndex == null) || (startIndex == str.length) )
        {
        return str + value;
        }
    
    strA = str.substr( 0, startIndex );
    strb = str.substr( startIndex );
    
    return strA + value + strB;
    }

/* Method: lastIndexOf
   Returns the last occurrence of a substring within a String object,
   or -1 if not found (*ECMA-262*).
   
   note:
   If startindex is negative, startindex is treated as zero.
   
   If it is larger than the greatest character position index,
   it is treated as the largest possible index.
   
   (code)
   String.prototype.lastIndexOf = function( /String/ subString, /Int/ startIndex )
       {
       [native code]
       }
   (end)
*/

/* Method: lastIndexOfAny
   Reports the index position of the last occurrence in this
   instance of one or more characters specified in an array (*ECMA-262*).
*/
String.prototype.lastIndexOfAny = function( /*Array*/ anyOf, /*Int*/ startIndex, /*Int*/ count )
    {
    var i, endIndex;
    
    if( anyOf == null )
        {
        return; //ArgumentNullException
        }
    
    if( this.length == 0 )
        {
        return -1;
        }
    
    if( (startIndex == null) || (startIndex < 0) || (startIndex > anyOf.length) )
        {
        startIndex = anyOf.length - 1; //ArgumentOutOfRangeException
        }
    
    if( (count == null) || (count < 0) || (count > startIndex+1) )
        {
        endIndex = 0; //ArgumentOutOfRangeException
        }
    else
        {
        endIndex = startIndex - count + 1;
        }
    
    for( i=startIndex; i>= endIndex; i-- )
        {
        if( this.lastIndexOf( anyOf[i] ) > -1 )
            {
            return i;
            }
        }
    
    return -1;
    }

/* Property: length
   Reflects the length of the string (*ECMA-262*).
*/

/*!## Method: localeCompare
   see ECMA-262 specification (ch. 15.5.4.9)
   
   note:
   this method is not implemented in
   most of ECMAScript implementation.
   The compareTo method is an equivalent.
*/

/* PrivateMethod: _PadHelper
   Helper method for the padLeft and padRight method.
*/
String.prototype._padHelper = function( /*int*/ totalWidth, /*char*/ paddingChar, /*Boolean*/ isRightPadded )
    {
    var str, SPC;
    str = this.copy();
    SPC = " ";
    
    if( (totalWidth < str.length) || (totalWidth < 0) )
        {
        return str;
        }
    
    if( paddingChar == null )
        {
        paddingChar = SPC;
        }
    
    /* note:
       we want to limit the string to ONLY ONE char
    */
    if( paddingChar.length > 1 )
        {
        paddingChar = paddingChar.charAt( 0 );
        }
    
    while( str.length != totalWidth )
        {
        if( isRightPadded == true )
            {
            str += paddingChar;
            }
        else
            {
            str = paddingChar + str;
            }
        }
    
    return str;
    }

/* Method: padLeft
   Right-aligns the characters in this instance,
   padding with paddingChar (or spaces if not precised)
   on the left for a specified total length.
*/
String.prototype.padLeft = function( /*int*/ totalWidth, /*char*/ paddingChar )
    {
    return this._padHelper( totalWidth, paddingChar, false);
    }

/* Method: padRight
   Left-aligns the characters in this string,
   padding with paddingChar (or spaces if not precised)
   on the right for a specified total length.
*/
String.prototype.padRight = function( /*int*/ totalWidth, /*char*/ paddingChar )
    {
    return this._padHelper( totalWidth, paddingChar, true);
    }

if( !String.prototype.replace )
    {
    
    /* Method: replace
       Replaces all occurrences of a specified String
       in this instance, with another specified String (*ECMA-262*).
       
       note:
       the result of the replace method is a copy of the string
       object after the specified replacement has been made.
       
       attention:
       First implemented in
         - Mozilla JavaScript v1.2
         - Microsoft JScript v1.0
       so we provide a patch for flash ActionScript.
    */
    String.prototype.replace = function( /*String*/ oldValue , /*String*/ newValue )
        {
        if( (oldValue == null) || (oldValue.length == 0) )
            {
            return this.toString();
            }
        
        if( newValue == null )
            {
            newValue = "";
            }
        
        if( this.indexOf( oldValue ) > -1 )
            {
            return this.split( oldValue ).join( newValue );
            }
        
        return this;
        }

    }

/* Method: slice
   Extracts a section of a string and returns a new string (*ECMA-262*).
   
   note:
   The slice method copies up to, but not including,
   the element indicated by end.
   
   If start is negative, it is treated as length + start
   where length is the length of the string.
   
   If end is negative, it is treated as length + end
   where length is the length of the string.
   
   If end is omitted, extraction continues to the end
   of the string object.
   
   If end occurs before start,
   no characters are copied to the new string.
   
   (code)
   String.prototype.slice = function( /int/ start, /int/ end )
       {
       [native code]
       }
   (end)
*/

/* Method: split
   Returns the array of strings that results when
   a string is separated into substrings (*ECMA-262*).
   
   (code)
   String.prototype.split = function( /String/ separator, /int/ limit )
       {
       [native code]
       }
   (end)
*/

/* Method: startsWith
   Determines whether a specified string is a prefix
   of the current instance.
*/
String.prototype.startsWith = function( /*String*/ value )
    {
    if( value == null )
        {
        return false;
        }
    
    if( this.length < value.length )
        {
        return false;
        }
    
    if( this.charAt( 0 ) != value.charAt( 0 ) )
        {
        return false;
        }
    
    return( String.compare( this.substr( 0, value.length), value) == 0);
    }

/* Method: substr
   Returns a substring beginning at a specified location
   and having a specified length 
   (not defined in the ECMA-262 specifications).
   
   note:
   If length is zero or negative, an empty string is returned.
   If not specified, the substring continues to the end of
   the current string.
   
   (code)
   String.prototype.substr = function( /int/ start, /int/ length )
       {
       [native code]
       }
   (end)
*/

/* Method: substring
   Returns the characters in a string between two
   indexes into the string (*ECMA-262*).
   
   note:
   The substring method returns a string containing the
   substring from start up to, but not including, end.
   
   If either start or end is NaN or negative,
   it is replaced with zero.
   
   (code)
   String.prototype.substring = function( /int/ start, /int/ end )
       {
       [native code]
       }
   (end)
*/

/* Method: toBoolean
   Converts to an equivalent Boolean value.
*/
String.prototype.toBoolean = function()
    {
    if( this.length == 0 )
        {
        return false;
        }
    
    return true;
    }

/* Method: toCharArray
   Copies the characters in this instance to
   a character array.
   
   note:
   we don't have yet a *char* constructor so we build
   an Array composed of String.
*/
String.prototype.toCharArray = function( /*int*/ startIndex, /*int*/ count )
    {
    var arr;
    arr = [];
    
    if( this == "" )
        {
        return arr;
        }
    
    if( (startIndex < 0) || (startIndex == null) ||
        (startIndex > this.length) || (startIndex > this.length - count) )
        {
        startIndex = 0;
        }
    
    if( (count <= 0) || (count == null) )
        {
        startIndex = 0;
        count      = this.length;
        }
    
    arr = this.split( "" );
    
    if( (startIndex != 0) || (count != this.length) )
        {
        arr = arr.splice( startIndex, count )
        }
    
    return arr;
    }

/* Method: toLowerCase
   Returns a string where all alphabetic characters
   have been converted to lowercase.
   
   (code)
   String.prototype.toLowerCase = function()
       {
       [native code]
       }
   (end)
*/

/* Method: toNumber
   Converts to an equivalent Number value.
*/
String.prototype.toNumber = function()
    {
    return Number( this.trim() );
    }

/* Method: toObject
   Converts to an equivalent Object value.
*/
String.prototype.toObject = function()
    {
    return new String( this.valueOf() );
    }

/* Method: toSource
   Returns a string representing the source code of the object.
*/
String.prototype.toSource = function()
    {
    var quote, str, pos, ch, code;
    quote = "\"";
    str   = "";
    pos   = 0;
    
    /* InternalFunction: toUnicode
    */
    var toUnicode = function( /*int*/ num )
        {
        var hex = num.toString( 16 );
        
        while( hex.length < 4 )
            {
            hex = "0"+hex;
            }
        
        return hex;
        }
    
    while( pos < this.length )
        {
        ch   = this.charAt( pos );
        code = this.charCodeAt( pos );
        
        if( code > 0xFF )
            {
            str += "\\u" + toUnicode( code );
            pos++;
            continue;
            }
        
        switch( ch )
            {
            case "\u0008": //backspace
            str += "\\b";
            break;
            
            case "\u0009": //horizontal tab
            str += "\\t";
            break;
            
            case "\u000A": //line feed
            str += "\\n";
            break;
            
            case "\u000B": //vertical tab
            str += "\\v";
            /*!## TODO: check the VT bug found in eden */
            //str += "\\u000B";
            break;
            
            case "\u000C": //form feed
            str += "\\f";
            break;
            
            case "\u000D": //carriage return
            str += "\\r";
            break;
            
            case "\u0022": //double quote
            str += "\\\"";
            break;
            
            case "\u0027": //single quote
            str += "\\\'";
            break;
            
            case "\u005c": //backslash
            str += "\\\\";
            break;
            
            default:
            str += ch;
            }
        
        pos++;
        }
    
    return( quote + str + quote );
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   String.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: toUpperCase
   Returns a string where all alphabetic characters
   have been converted to uppercase (*ECMA-262*).
   
   (code)
   String.prototype.toUpperCase = function()
       {
       [native code]
       }
   (end)
*/

/* PrivateMethod: _trimHelper
   Helper method used by trim, trimStart and trimEnd methods.
*/
String.prototype._trimHelper = function( /*Array*/ trimChars, /*Boolean*/ trimStart, /*Boolean*/ trimEnd )
    {
    if( trimStart == null )
        {
        trimStart = false;
        }
    
    if( trimEnd == null )
        {
        trimEnd = false;
        }
    
    var str, iLeft, iRight;
    str = this.copy();
    
    if( trimStart )
        {
        for( iLeft=0; (iLeft<str.length) && (trimChars.contains( str.charAt( iLeft ) )); iLeft++ )
            {
            }
        
        str = str.substr( iLeft );
        }
    
    if( trimEnd )
        {
        for( iRight=str.length-1; (iRight>=0) && (trimChars.contains( str.charAt( iRight ) )); iRight-- )
            {            
            }
        
        str = str.substring( 0, iRight+1 );
        }
    
    return str;
    }

/* Method: trim
   Removes all occurrences of a set of specified characters (or strings)
   from the beginning and end of this instance.
*/
String.prototype.trim = function( /*Array*/ trimChars )
    {
    if( (trimChars == null) || (trimChars.length == 0) )
        {
        trimChars = String.whiteSpaceChars;
        }
    
    return this._trimHelper( trimChars, true, true );
    }

/* Method: trimEnd
   Removes all occurrences of a set of characters specified
   in an array from the end of this instance.
*/
String.prototype.trimEnd = function( /*Array*/ trimChars )
    {
    if( (trimChars == null) || (trimChars.length == 0) )
        {
        trimChars = String.whiteSpaceChars;
        }
    
    return this._trimHelper( trimChars, null, true );
    }

/* Method: trimStart
   Removes all occurrences of a set of characters specified
   in an array from the beginning of this instance.
*/
String.prototype.trimStart = function( /*Array*/ trimChars )
    {
    if( (trimChars == null) || (trimChars.length == 0) )
        {
        trimChars = String.whiteSpaceChars;
        }
    
    return this._trimHelper( trimChars, true );
    }

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   String.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

/* StaticProperty: whiteSpaceChars
   Contains a list of white space chars.
   
   This property should be read-only.
*/
String.whiteSpaceChars = [ "\u0009", "\u000A", "\u000B", "\u000C", "\u000D",
                           "\u0020", "\u00A0", "\u2000", "\u2001", "\u2002",
                           "\u2003", "\u2004", "\u2005", "\u2006", "\u2007",
                           "\u2008", "\u2009", "\u200A", "\u200B", "\u3000",
                           "\uFEFF" ];

