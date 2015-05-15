
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

    - eKameleon (ekameleon@gmail.com) [2006-06-13]
    
        in SSAS version, add _global.$GLOBAL_PRIVATE_POLICY property.
        I use this hack in _global.GetObjectPath method with FCS(1). 
        
        Protected all private objects if _global.$GLOBAL_PRIVATE_POLICY is 'true'.

*/

/* NameSpace: _global
   An intrinsic object whose purpose is to collect
   global methods into one object.
   
   The Global object has no syntax.
   
   You call its methods directly.
   
   note:
   The Global object is never used directly, and cannot be
   created using the new operator.
   
   It is created when the scripting engine is initialized,
   thus making its methods and properties available immediately.
   
   attention:
   The implementation and use of the Global object is different
   depending the environment, here we have chosen to name it
   *_global* to signify its hidden nature.
*/

/* GlobalFunction: escape
   Encodes String objects so they can be read on all computers (*ECMA-262*).
   
   note:
   The escape method returns a string value (in Unicode format)
   that contains the contents of charstring.
   
   All spaces, punctuation, accented characters, and any other
   non-ASCII characters are replaced with %xx encoding, where
   xx is equivalent to the hexadecimal number representing the character.
   
   For example, a space is returned as "%20."
   
   Characters with a value greater than 255 are stored using the %uxxxx format.
   
   (code)
   _global.escape = function( /String/ value )
       {
       [native code]
       }
   (end)
*/

/* GlobalFunction: eval
   Evaluates ECMAScript code and executes it (*ECMA-262*).
   
   note:
   The eval function allows dynamic execution of ECMAScript source code.
   
   In some environment this function is not fully implemented,
   for example: ActionScript.
   
   (code)
   _global.eval = function( /String/ codeString )
       {
       [native code]
       }
   (end)
*/

/* GlobalFunction: GetObjectPath
   Returns the string path of the target object.
   
   Parameters:
     target - un object target path 
     scope  - optional, allow you to scan members in an object scope
   
   note:
   You can only retrieve path of enumerable objects defined in _global,
   objects marked as DontEnum are not resolved,
   internal and build-in objects are in general marked as DontEnum.
   
   You will not be able to resolve path of local variable in function scope.
*/
_global.GetObjectPath = function( /*Object*/ target, scope )
{
    var name, ref, scopePath ;
    var isCoreObject /*Boolean*/
    var m, mm;
    var maxRecursion = 200; //better if < 0xFF
    var commands     = [];
    var values       = [];
    var refs         = [];
    
    scopePath    = "" ;
    
    if( target == null )
        {
        return undefined;
        }
    
    /* internalFunction: getCoreObjectPath
    */
    var getCoreObjectPath = function( obj )
    {
        switch( obj )
        {
            case Array:    return "Array";
            case Boolean:  return "Boolean";
            case Date:     return "Date";
            case Error:    return "Error";
            case Function: return "Function";
            case Number:   return "Number";
            case String:   return "String";
            case Object:   return "Object";
        }
        return undefined;
    }
    
    if( isCoreObject != undefined )
    {
        return isCoreObject;
    }
    
    if( scope == null )
    {
        scope = _global ; //by default the scope to scan is global
    }
    else
    {
        scopePath = getCoreObjectPath( scope );
        
        if( scopePath == undefined )
        {
            scopePath = GetObjectPath( scope );
        }
    }
    
    //path already found
    
    if( target.__path__ )
    {
        return target.__path__;
    }
    
    var list ;
    
    /* internalFunction: list
    */
    list = function()
    {
        name = values.pop();
        ref  = refs.pop();
        
        if (ref == null)
        {
            values.push( "" );
        }
        else
        {
            for( m in ref )
            {
                /* attention:
                   if the host does not mark "prototype"
                   as DontEnum (as it should be!)
                   this can cause recursions errors,
                   so we want to avoid that.
                */
                
                if( m == "prototype" )
                {
                    continue;
                }
                
                /* attention:
                   we do not want to iterate trough Array indexes,
                   especially with Mozilla JavaScript as
                   <http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:String>
                   indicate that string can be accessed as array
                   ex: 'cat'[1] // returns "a"
                */
                if( (ref[m] != null) && (ref[m].constructor == Array) )
                {
                    continue;
                }
                
                /**
                 * ### WARNING - not original Core2 script !!! 
                 * @see $GLOBAL_PRIVATE_POLICY in core2.asc file.
                 */
                if ($GLOBAL_PRIVATE_POLICY && m.indexOf("_") == 0)  // fix private attributes, begin with "_" 
                {
                    continue ;
                }
                
                /* note:
                   We want to scan only objects and functions,
                   the only type being able to contain child members.
                */
                if( 
                    ((typeof(ref[m]) == "object") 
                        || (typeof(ref[m]) == "function")) &&
                            (ref.hasOwnProperty( m )) 
                )
                {
                    commands.push( list );
                    values.push( name + "." + m );
                    refs.push( ref[m] );
                }
                
            }
        }
    }
    
    for( mm in scope )
    {
        
        /* attention:
           We do not want to scan global reserved objects,
           especially for browsers where it cause recursion errors.
        */
        if( isGlobalReserved( mm ) )
        {
            continue;
        }
        
        commands.push( list );
        values.push( mm );
        refs.push( scope[mm] );
    }
    
    if( scope == _global )
    {
        var i /*Number*/ ;
        var coreObject;
        
        var coreObjects /*Array*/ = 
        [
            "Array",
            "Boolean",
            "Date",
            "Error",
            "Function",
            "Number",
            "String",
            "Object"
        ]
        
        for( i=0; i<coreObjects.length; i++ )
        {
            coreObject = coreObjects[i];
            
            commands.push( list );
            values.push( coreObject );
            refs.push( scope[coreObject] );
        }
    }
    
    while( (commands.length != 0) && (commands.length < maxRecursion ) )
    {
        commands.pop()();
        
        /// trace(name) ;
        
        if( ref === target ) // we want to test identity !!!
        {
            /* note:
               Here we save the result of the path
               to not recompute it later.
               see: <http://www.nist.gov/dads/HTML/memoize.html>
            */
            
            ///trace(">>> " + name) ;
            
            if( scope == _global )
            {
                target.__path__ = name;
            }
            else
            {
                scopePath += ".";
            }
            
            return scopePath + name;
        }
    }
    
    return undefined;
}

/* GlobalFunction: GetTypeOf
   Returns the type of the passed object.
*/
_global.GetTypeOf = function( obj )
{
    if( obj === undefined )
    {
        return "undefined";
    }
    
    if( obj === null )
    {
        return "null";
    }
    
    switch( obj.constructor )
    {
        case Array:    return "array";
        case Boolean:  return "boolean";
        case Date:     return "date";
        case Error:    return "error";
        case Function: return "function";
        case Number:   return "number";
        case String:   return "string";
        case Object:   return "object";
        default:       return( typeof obj );
    }
}

/* GlobalFunction: hasOwnProperty
   _global scope does not inherit from the Object scope
   the hasOwnProperty method so we create it.
   
   see: <Object.hasOwnProperty>
*/
_global.hasOwnProperty = Object.prototype.hasOwnProperty;

/* GlobalProperty: Infinity
   Returns an initial value of Number.POSITIVE_INFINITY (*ECMA-262*).
   
   (code)
   _global.Infinity = [native code];
   (end)
*/

/* GlobalFunction: isFinite
   Returns a Boolean value that indicates
   if a supplied number is finite (*ECMA-262*).
   
   note:
   The isFinite method returns true if number is any value
   other than NaN, negative infinity, or positive infinity.
   
   In those three cases, it returns false.
   
   (code)
   _global.isFinite = function( /Number/ value )
       {
       [native code]
       }
   (end)
*/

/* GlobalFunction: isGlobalReserved
   Returns a Boolean that indicates if the
   supplied name keyword is reserved or not.
*/
_global.isGlobalReserved = function( /*String*/ name )
{
    for( var i=0; i < $GLOBAL_RESERVED.length; i++ )
    {
        if( $GLOBAL_RESERVED[i] == name )
        {
            return true;
        }
    }
    
    return false;
}

/* GlobalFunction: isNaN
   Returns a Boolean value that indicates whether
   a value is the reserved value NaN (not a number) (*ECMA-262*).
   
   note:
   The isNaN function returns true if the value is NaN,
   and false otherwise.
   
   You typically use this function to test return values
   from the parseInt and parseFloat methods.
   
   Alternatively, a variable could be compared to itself.
   
   If it compares as unequal, it is NaN. This is because NaN
   is the only value that is not equal to itself.
   
   (code)
   _global.isNaN = function( value )
       {
       [native code]
       }
   (end)
*/

/* GlobalProperty: NaN
   Returns the special value NaN indicating that
   an expression is not a number (*ECMA-262*).
   
   (code)
   _global.NaN = [native code];
   (end)
*/

/* GlobalFunction: parseFloat
   Returns a floating-point number converted from a string (*ECMA-262*).
   
   note:
   The parseFloat method returns a numerical value equal to
   the number contained in numString.
   
   If no prefix of numString can be successfully parsed
   into a floating-point number, NaN (not a number) is returned.
   
   (code)
   _global.parseFloat = function( /String/ value )
       {
       [native code]
       }
   (end)
*/

/* GlobalFunction: parseInt
   Returns an integer converted from a string (*ECMA-262*).
   
   note:
   The parseInt method returns an integer value equal to the number
   contained in numString.
   
   If no prefix of numString can be successfully parsed into an integer,
   NaN (not a number) is returned.
   
   attention:
   Radix can be a value between 2 and 36 indicating the base of the
   number contained in numString.
   
   If not supplied, strings with a prefix of '0x' are considered hexadecimal
   and strings with a prefix of '0' are considered octal.
   
   All other strings are considered decimal.
   
   (code)
   _global.parseInt = function( /String/ value, /int/ radix )
       {
       [native code]
       }
   (end)
*/

/* GlobalFunction: propertyIsEnumerable
   _global scope does not inherit from the Object scope
   the propertyIsEnumerable method so we create it.
   
   see: <Object.propertyIsEnumerable>
*/
_global.propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/* GlobalFunction: ToSource
   Allow you to dump the source of the Global Object scope.
   
   example:
   (code)
   trace( ToSource( 0 ) );
   (end)
   
   see: <Object.toSource>
*/
_global.ToSource = function( /*int*/ indent, /*String*/ indentor )
    {
    var target, member, source;
    source = [];
    
    if( indent != null )
        {
        indent++;
        }
    
    for( member in _global )
        {
        if( isGlobalReserved( member ) )
            {
            continue;
            }
        
        if( member == "__path__" )
            {
            continue;
            }
        
        if( _global.hasOwnProperty( member ) )
            {
            
            if( _global[member] === undefined )
                {
                source.push( member + ":" + "undefined" );
                continue;
                }
            
            if( _global[member] === null )
                {
                source.push( member + ":" + "null" );
                continue;
                }
            
            source.push( member + ":" + _global[member].toSource( indent, indentor ) );
            }
        }
    
    if( indent == null )
        {
        return( "{" + source.join( "," ) + "}" );
        }

    if( indentor == null )
        {
        indentor = "    ";
        }
    
    if(indent == null )
        {
        indent = 0;
        }
    
    var decal = "\n" + Array.initialize( indent, indentor ).join( "" );
    return( decal + "{" + decal + source.join( "," + decal ) + decal + "}" );
    }


/* GlobalFunction: trace
   Outputs text to either a message box or a console window.
   
   note:
   Here we force a cast to string to allways return the string
   representation of the object.
   
   attention:
   This function is dependent on the ECMAScript host.
   
   For browsers it will trace either in an alert window or a DIV layer.
   
   For flash it will trace to the output window.
   
   For tools as WSH/JSDB it will trace to the prompt.
   
   Look at the core2.HOST_EXTENSION file to see the implementation.
*/

/* GlobalFunction: unescape
   Decodes String objects encoded with the escape method (*ECMA-262*).
   
   (code)
   _global.unescape = function( /String/ value )
       {
       [native code]
       }
   (end)
*/

