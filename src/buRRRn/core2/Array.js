
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

/* Constructor: Array
   Provides support for creation of arrays of any data type.
   
   attention:
   Array in ECMAScript does not have a fixed size,
   so we can dynamically add or remove elements.
   
   We deal only with 1-dimension array, if we feel the need
   we could add another constructor to deal with more than 1 dimension latter.
*/

/* Method: clone
   Creates a shallow copy of the Array.
   
   note:
   A shallow copy of an Array copies only the elements of the Array,
   whether they are reference types or value types,
   but it does not copy the objects that the references refer to.
   
   The references in the new Array point to the same objects that
   the references in the original Array point to.

   In contrast, a deep copy of an Array copies the elements and
   everything directly or indirectly referenced by the elements.
   
   attention:
   when applying this behaviour to ECMAscript a shallow copy
   will only copy primitive types and pointers to reference types.
   
   example:
   (code)
   toto = [1,{a:0,b:1},[2,3],"hello",true];
   titi = toto.clone();
   (end)
   
   memory dump:
   (code)
   toto = [object #1, class 'Array']
        [
        0:1,
        1:[object #2, class 'Object'] {
          b:1,
          a:0
        },
        2:[object #3, class 'Array'] [
          0:2,
          1:3
        ],
        3:"hello",
        4:true
        ]

   titi = [object #4, class 'Array']
        [
        0:1,
        1:[object #2, class 'Object'],
        2:[object #3, class 'Array'],
        3:"hello",
        4:true
        ]
   (end)
*/
/*!## TODO: make a schema for the memory representation */
Array.prototype.clone = function()
    {
    return this.concat();
    }

/* Method: concat
   Returns a new Array consisting of a combination of two or more arrays (*ECMA-262*).
   
   (code)
   Array.prototype.concat = function( ... )
       {
       [native code]
       }
   (end)
*/

/* Method: contains
   Returns whether the Array contains a particular item.
*/
Array.prototype.contains = function( value )
    {
    return( this.indexOf( value ) > -1 );
    }

/* Method: copy
   Creates a deep copy of the Array.
*/
Array.prototype.copy = function()
    {
    var arr, i;
    arr = [];
    
    for( i=0; i<this.length; i++ )
        {
        if( this[i] === undefined )
            {
            arr[i] = undefined;
            continue;
            }
        
        if( this[i] === null )
            {
            arr[i] = null;
            continue;
            }
        
        arr[i] = this[i].copy();
        }
    
    return arr;
    }

/* Method: copyTo
   Copies by value all the elements of the current one-dimensional Array
   to the specified one-dimensional Array.
   
   Parameters:
      destination - an array where to copy
      index       - optionnal, allow you to specify at which index
                    you want to start to copy the elements
*/
Array.prototype.copyTo = function( /*Array*/ destination, /*int*/ index )
    {
    var i;
    
    if( destination == null )
        {
        return; /* ArgumentNullException */
        }
    
    if( index == null )
        {
        index = 0;
        }
    
    for( i=0; i<this.length; i++, index++ )
        {
        if( this[i] === undefined )
            {
            destination[index] = undefined;
            continue;
            }
        
        if( this[i] === null )
            {
            destination[index] = null;
            continue;
            }
        
        destination[index] = this[i].copy();
        }
    }

/* Method: equals
   compare if two Arrays are equal by value.
*/
Array.prototype.equals = function( arrObj )
    {
    var i;
    
    if( (arrObj == null) || (GetTypeOf( arrObj ) != "array") )
        {
        return false;
        }
    
    if( this == arrObj )
        {
        return true;
        }
    
    if( this.length != arrObj.length )
        {
        return false;
        }
    
    for( i=0; i<this.length; i++ )
        {
        if( this[i] == null )
            {
            if( this[i] != arrObj[i] )
                {
                return false;
                }
            continue;
            }
        
        if( !this[i].equals( arrObj[i] ) )
            {
            return false;
            }
        }
    
    return true;
    }

if( !Array.prototype.every )
    {
    
    /* Method: every
       Tests whether all elements in the array pass the test
       implemented by the provided function.
       
       note:
       callback is invoked with three arguments:
       - the value of the element
       - the index of the element
       - the Array object being traversed
       
       example:
       (code)
       myCallback( value, index, arrObj )
           {
           //[...]
           }
       (end)
       
    */
    Array.prototype.every = function( /*Function*/ callback, thisObject )
        {
        var len, i;
        len = this.length;
        
        if( thisObject == null )
            {
            thisObject = _global;
            }
        
        for( i=0; i<len; i++ )
            {
            if( !callback.call( thisObject, this[i], i, this ) )
                {
                return false;
                }
            }
        
        return true;
        }

    }

if( !Array.prototype.filter )
    {
    
    /* Method: filter
       Creates a new array with all of the elements of the current
       array for which the provided filtering function returns true.
       
       note:
       callback is invoked with three arguments:
       - the value of the element
       - the index of the element
       - the Array object being traversed
       
       example:
       (code)
       myCallback( value, index, arrObj )
           {
           //[...]
           }
       (end)
    */
    Array.prototype.filter = function( /*Function*/ callback, thisObject )
        {
        var arr, i;
        arr = [];
        
        if( thisObject == null )
            {
            thisObject = _global;
            }
        
        for( i=0; i<this.length; i++ )
            {
            if( callback.call( thisObject, this[i], i, this ) )
                {
                if( this[i] === undefined )
                    {
                    arr.push( undefined );
                    continue;
                    }
                
                if( this[i] === null )
                    {
                    arr.push( null );
                    continue;
                    }
                            
                arr.push( this[i].copy() );
                }
            }
        
        return arr;
        }
    
    }

if( !Array.prototype.forEach )
    {
    
    /* Method: forEach
       Calls a function for each element in the array.
       
       note:
       callback is invoked with three arguments:
       - the value of the element
       - the index of the element
       - the Array object being traversed
       
       example:
       (code)
       myCallback( value, index, arrObj )
           {
           //[...]
           }
       (end)
    */
    Array.prototype.forEach = function( /*Function*/ callback, thisObject )
        {
        var len, i;
        len = this.length;
        
        if( thisObject == null )
            {
            thisObject = _global;
            }
        
        for( i=0; i<len; i++ )
            {
            callback.call( thisObject, this[i], i, this );
            }
        }
    
    }

/* StaticMethod: fromArguments
   Returns an Array object from a function Arguments object.
*/
Array.fromArguments = function( args )
    {
    var arr, i;
    
    arr = [];
    
    for( i=0; i<args.length; i++ )
        {
        arr.push( args[i] );
        }
    
    return arr;
    }

/* Method: indexOf
   Returns the index of the first occurrence of a value
   in a one-dimensional Array or in a portion of the Array.
   
   Parameters:
   startIndex - optionnal, allows to specify the starting index of the search
   count      - allows to limit the number of elements to search in the array
*/
Array.prototype.indexOf = function( value, /*int*/ startIndex, /*int*/ count )
    {
    var i;
    
    /*!## TODO: replace this.length by the length var
          var length = this.length;
    */
    
    if( startIndex == null )
        {
        startIndex = 0;
        }
    
    if( count == null  )
        {
        count = this.length - startIndex;
        }
    
    if( (startIndex < 0) || (startIndex > this.length) )
        {
        return; //ArgumentOutOfRangeException
        }
    
    if( (count < 0) || (count > (this.length - startIndex)) )
        {
        return; //ArgumentOutOfRangeException
        }
    
    /* attention:
       the null data type can't have
       properties or methods so if an index
       of the array is the null data type
       this[0] = null;
       and the argument "value" to find is also null
       doing
       null.equals( null );
       will generate an error.
       
       to correct that we transform the argument "value"
       into an object which resolve to null data type,
       a sort of nullable object, yes it's a hack ;).
    */
    if( value == null )
        {
        value = new NullObject();
        }
    
    for( i=0 ; startIndex<this.length; startIndex++, i++ )
        {
        if( value.equals( this[startIndex] ) )
            {
            return startIndex;
            }
        
        if( i == count )
            {
            break;
            }
        }
    
    return -1;
    }

/* StaticMethod: initialize
   Initializes a new Array with an arbitrary number of elements (index),
   with every element containing the passed parameter value or
   by default the null value.
   
   example:
   (code)
   test  = Array.initialize( 3 ); //define [null,null,null]
   test1 = Array.initialize( 3, 0 ); //define [0,0,0]
   test2 = Array.initialize( 3, true ); //define [true,true,true]
   test3 = Array.initialize( 3, "" ); //define ["","",""]
   (end)
*/
Array.initialize = function( /*int*/ index, value )
    {
    if( index == null )
        {
        index = 0;
        }
    
    if( value === undefined )
        {
        value = null;
        }
    
    var arr, i;
    arr = [];
    
    for( i=0; i<index; i++ )
        {
        arr.push( value );
        }
    
    return arr;
    }

/* Method: join
   Returns a string value consisting of all the elements of
   an array concatenated together and separated by the
   specified separator character (*ECMA-262*).
   
   (code)
   Array.prototype.join = function( separator )
       {
       [native code]
       }
   (end)
*/

/* Property: length
   returns an integer value one higher than the
   highest element defined in the array (*ECMA-262*).
*/

if( !Array.prototype.map )
    {
    
    /* Method: map
       Creates a new array with the results of calling a provided
       function on every element in this array.
       
       note:
       callback is invoked with three arguments:
       - the value of the element
       - the index of the element
       - the Array object being traversed
       
       example:
       (code)
       myCallback( value, index, arrObj )
           {
           //[...]
           }
       (end)
    */
    Array.prototype.map = function( /*Function*/ callback, thisObject )
        {
        var arr, i;
        arr = [];
        
        if( thisObject == null )
            {
            thisObject = _global;
            }
        
        for( i=0; i<this.length; i++ )
            {
            arr.push( callback.call( thisObject, this[i], i, this ) );
            }
        
        return arr;
        }
    
    }

/* Method: pop
   Removes the last element from an array and returns it (*ECMA-262*).
   
   (code)
   Array.prototype.pop = function()
       {
       [native code]
       }
   (end)
*/

/* Method: push
   Appends new elements to an array, and returns the new length of the array (*ECMA-262*).
   
   (code)
   Array.prototype.push = function( item1, item2, itemN )
       {
       [native code]
       }
   (end)
*/

/* Method: reverse
   Returns an Array object with the elements reversed (*ECMA-262*).
   
   note:
   The reverse method reverses the elements of an Array object in place.
   It does not create a new Array object during execution.
   
   If the array is not contiguous, the reverse method creates elements
   in the array that fill the gaps in the array.
   
   Each of these created elements has the value undefined.
   
   (code)
   Array.prototype.reverse = function()
       {
       [native code]
       }
   (end)
*/

/* Method: shift
   Removes the first element from an array and returns it (*ECMA-262*).
   
   (code)
   Array.prototype.shift = function()
       {
       [native code]
       }
   (end)
*/

/* Method: slice
   Returns a section of an array.
   
   note:
   The slice method returns an Array object containing the
   specified portion of arrayObj.
   
   The slice method copies up to, but not including,
   the element indicated by end.
   
   If start is negative, it is treated as length + start where
   length is the length of the array.
   
   If end is negative, it is treated as length + end where
   length is the length of the array.
   
   If end is omitted, extraction continues to the end of arrayObj.
   
   If end occurs before start, no elements are copied to the new array.
   
   (code)
   Array.prototype.slice = function( /Int/ start, /Int/ end )
       {
       [native code]
       }
   (end)
*/

if( !Array.prototype.some )
    {
    
    /* Method: some
       Creates a new array with the results of calling a provided
       function on every element in this array.
       
       note:
       callback is invoked with three arguments:
       - the value of the element
       - the index of the element
       - the Array object being traversed
       
       example:
       (code)
       myCallback( value, index, arrObj )
           {
           //[...]
           }
       (end)
    */
    Array.prototype.some = function( /*Function*/ callback, thisObject )
        {
        var len, i;
        len = this.length;
        
        if( thisObject == null )
            {
            thisObject = _global;
            }
        
        for( i=0; i<len; i++ )
            {
            if( callback.call( thisObject, this[i], i, this ) )
                {
                return true;
                }
            }
        
        return false;
        }
    
    }

/* Method: sort
   Returns an Array object with the elements sorted (*ECMA-262*).
   
   note:
   The sort method sorts the Array object in place;
   no new Array object is created during execution.
   
   If you supply a function in the sortFunction argument,
   it must return one of the following values
   
   - A negative value if the first argument passed is less than the second argument.
   - Zero if the two arguments are equivalent.
   - A positive value if the first argument is greater than the second argument.
   
   (code)
   Array.prototype.sort = function( sortFunction )
       {
       [native code]
       }
   (end)
*/

/* Method: splice
   Removes elements from an array and, if necessary,
   inserts new elements in their place, returning the deleted elements (*ECMA-262*).
   
   note:
   The splice method modifies arrayObj by removing the specified number
   of elements from position start and inserting new elements.
   
   The deleted elements are returned as a new array object.
   
   (code)
   Array.prototype.splice = function( start, deleteCount, ... )
       {
       [native code]
       }
   (end)
*/

/* Method: toSource
   Returns a string representing the source code of the array.
*/
Array.prototype.toSource = function( /*int*/ indent, /*String*/ indentor )
    {
    var i, source;
    source = [];
    
    if( indent != null )
        {
        indent++;
        }
    
    for( i=0; i<this.length; i++ )
        {
        
        if( this[i] === undefined )
            {
            source.push( "undefined" );
            continue;
            }
        
        if( this[i] === null )
            {
            source.push( "null" );
            continue;
            }
        
        source.push( this[i].toSource( indent, indentor ) );
        }
    
    if( indent == null )
        {
        return( "[" + source.join( "," ) + "]" );
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
    return( decal + "[" + decal + source.join( "," + decal ) + decal + "]" );
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   Array.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: unshift
   Returns an array with specified elements inserted at the beginning (*ECMA-262*).
   
   note:
   The unshift method inserts elements into the start of an array,
   so they appear in the same order in which they appear in the argument list.
   
   (code)
   Array.prototype.unshift = function( item1, item2, itemN )
       {
       [native code]
       }
   (end)
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Array.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

