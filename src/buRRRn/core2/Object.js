
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

/* Constructor: Object
   Provides functionality common to all ECMAScript objects.
   
   Object is the primitive ECMAScript object type, and so
   all ECMAScript objects are descended from Object.
   
   that means, all the methods and properties of the
   Object object are available in all other objects.
   
   note:
   the Object object and all other objects implements
   ICloneable, IConvertible, ICopyable, IEquality, IFormattable and ISerializable.
*/

/* Method: clone
   Returns a copy by reference of this object.
   
   see: <ICloneable>
*/
Object.prototype.clone = function()
    {
    return this;
    }

/* Property: constructor
   Specifies the function that creates an object (*ECMA-262*).
   
   note:
   The constructor property contains a reference
   to the function that constructs instances of that particular object.
   
   (code)
   Object.prototype.constructor = [native code]
   (end)
*/

/* Method: copy
   Returns a copy by value of this object.
   
   see: <ICopyable>
*/
Object.prototype.copy = function()
    {
    var obj, member;
    obj = {};
    
    for( member in this )
        {
        if( !this.hasOwnProperty( member ) )
            {
            continue;
            }
        
        if( this[member] === undefined )
            {
            obj[member] = undefined;
            continue;
            }
        
        if( this[member] === null )
            {
            obj[member] = null;
            continue;
            }
        
        obj[member] = this[member].copy();
        }
    
    return obj;
    }

/* Method: equals
   Determines whether two Object instances are equal.
   
   Compare if two objects are equal by value.
   
   see: <IEquality>
*/
Object.prototype.equals = function( obj )
    {
    var member;
    
    if( GetTypeOf( obj ) == "function" )
        {
        return obj.equals( this );
        }
    
    if( (this.valueOf() == null) && (obj == null) )
        {
        return true;
        }
    
    if( (obj == null) || (GetTypeOf( obj ) != "object") )
        {
        return false;
        }
    
    if( this == obj )
        {
        return true;
        }
    
    for( member in this )
        {
        /* note:
           by convention we consider members starting with __
           to be internal properties which should not be compared.
        */
        if( member.startsWith( "__" ) )
            {
            continue;
            }
        
        if( !this[member].equals( obj[member] ) )
            {
            return false;
            }
        }
    
    return true;
    }

/* Method: getConstructorPath
   Returns the constructor path of the current instance as string.
*/
Object.prototype.getConstructorPath = function()
    {
    switch( this.constructor )
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
    
    var path = GetObjectPath( this.constructor );
    
    if( path == undefined )
        {
        path = "Object"; //by default any ECMAScript objects inherit from object Object
        }
    
    return path;
    }

/* Method: getConstructorName
   Returns the constructor name of the current instance as string.
*/
Object.prototype.getConstructorName = function()
    {
    var path = this.getConstructorPath();
    
    if( path.indexOf( "." ) > -1 )
        {
        path = path.split( "." );
        return path.pop();
        }
    
    return path;
    }

/* Method: hasOwnProperty
   Returns a Boolean value indicating whether an object
   has a property with the specified name (*ECMA-262*).
   
   attention:
   This method does not check if the property exists
   in the object's prototype chain.
   
   The property must be a member of the object itself.
   
   (code)
   Object.prototype.hasOwnProperty = function( /String/ name )
       {
       [native code]
       }
   (end)
*/

/* Method: hasProperty
   Returns a Boolean value indicating whether an object
   has a property with the specified name (*ECMA-262*).
   
   Returns true whether the property is in the prototype chain or not.
*/
Object.prototype.hasProperty = function( /*String*/ name )
    {
    return( this[name] != undefined );
    }

if( !Object.prototype.isPrototypeOf )
    {
    
    /* Method: isPrototypeOf
       Returns a Boolean value indicating whether an object exists
       in another object's prototype chain.
       
       (code)
       Object.prototype.isPrototypeOf = function( /Object/ value )
           {
           [native code]
           }
       (end)
       
       attention:
       First implemented in
         - Mozilla JavaScript v? (anyone know ?)
         - Microsoft JScript v5.5
         - Macromedia Flash Player v5.0
       so we provide a patch for earlier versions,
       mainly for JScript v5.0 and for Safari.
       
       note:
       We will not support hosts not implementing
       the "instanceof" operator.
       First, because it's impossible to implement
       an operator, and second to implement the functionality
       as a function will be based on the non-standard
       "__proto__" property and can not work everywhere,
       third, "instanceof" is a reserved keyword since
       ECMA-262 2nd edition.
       
    */
    Object.prototype.isPrototypeOf = function( /*Object*/ value )
        {
        var self = this.constructor;
        
        if( typeof value != "object" )
            {
            return false;
            }
        
        if( value instanceof self )
            {
            return true;
            }
        else
            {
            return false;
            }
        }
    
    }


/* Method: memberwiseClone
   Creates a shallow copy of the current Object.
   
   note:
   primitives are copied by value
   and constructible objects are copied by reference.
   
   attention:
   We could have make memberwiseClone a copy of the clone method
   but we didn't because we want only the members to be copied
   by reference, not the container object itself.
*/
Object.prototype.memberwiseClone = function()
    {
    var obj, member;
    obj = {};
    
    for( member in this )
        {
        obj[member] = this[member];
        }
    
    return obj;
    }

/* Method: memberwiseCopy
   Returns a copy by value of this object.
   
   note:
   We want to define this method in the Object prototype
   to inherit it in all the others objects,
   that way if the Object prototype *copy* method get overrided
   we will still be able to use *memberwiseCopy*.
*/
Object.prototype.memberwiseCopy = Object.prototype.copy;

if( !Object.prototype.propertyIsEnumerable )
    {
    
    /* Method: propertyIsEnumerable
       Returns a Boolean value indicating whether
       a specified property is part of an object and if it is enumerable.
       
       (code)
       Object.prototype.propertyIsEnumerable = function( /String/ name )
           {
           [native code]
           }
       (end)
       
       attention:
       First implemented in
         - Mozilla JavaScript v? (anyone know ?)
         - Microsoft JScript v5.5
       so we provide a patch for earlier versions,
       mainly for JScript v5.0 and for Safari.
       
       The patch will not work for JScript version earlier than v5.0
       (no for..in statement).
    */
    Object.prototype.propertyIsEnumerable = function( /*String*/ name )
        {
        
        for( var member in this )
            {
            /* note:
               see ECMA-262
               15.2.4.7 Object.prototype.propertyIsEnumerable
               "This method does not consider objects in the prototype chain."
            */
            if( this.hasOwnProperty( name ) && (member == name) )
                {
                return true;
                }
            }
        
        return false;
        }
    
    }

/* Method: referenceEquals
   Determines whether the specified Object instance
   is the same instance as the current object.
*/
Object.prototype.referenceEquals = function( obj )
    {
    if( (this.valueOf() === null) && (obj === null) )
        {
        return true;
        }

    if( this === obj )
        {
        return true;
        }
    
    if( (obj == null) || (GetTypeOf( obj ) != "object") )
        {
        return false;
        }
    
    if( this !== obj )
        {
        return false;
        }

    return true;
    }

/* Method: toBoolean
   Converts to an equivalent Boolean value.
*/
Object.prototype.toBoolean = function()
    {
    return new Boolean( this.valueOf() ).valueOf(); //should always return true
    }

/* Method: toNumber
   Converts to an equivalent Number value.
*/
Object.prototype.toNumber = function()
    {
    return new Number( this.valueOf() ).valueOf();
    }

/* Method: toObject
   Converts to an equivalent Object value.
   
   note:
   Don't start saying WTF seeing that,
   think about an instance from a custom constructor
   that you want to cast to an object ;).
*/
Object.prototype.toObject = function()
    {
    return new Object( this.valueOf() );
    }

/* Method: toSource
   Returns a string representing the source code of the object.
   
   Parameters:
   indent   - optionnal, the starting amount of indenting
   indentor - optionnal, the string value used to do the indentation
*/
Object.prototype.toSource = function( /*int*/ indent, /*String*/ indentor )
    {
    var member, source;
    source = [];
    
    if( indent != null )
        {
        indent++;
        }
    
    for( member in this )
        {
        if( this.hasOwnProperty( member ) )
            {
            if( this[member] === undefined )
                {
                source.push( member + ":" + "undefined" );
                continue;
                }
            
            if( this[member] === null )
                {
                source.push( member + ":" + "null" );
                continue;
                }
            
            source.push( member + ":" + this[member].toSource( indent, indentor ) );
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

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   Object.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Object.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

