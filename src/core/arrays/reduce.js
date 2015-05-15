/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
 * <p>The <code class="prettyprint">reduce</code> method executes the callback function once for each element present in the array, excluding holes in the array, receiving four arguments: the initial value (or value from the previous callback call), the value of the current element, the current index, and the array over which iteration is occurring.</p> 
 * <p>This method reduce is an extension to the ECMA-262 standard; (see Javascript 1.8 new implementation) as such it may not be present in other implementations of the standard.</p> 
 * <p>The call to the reduce callback would look something like this:</p>
 * <pre class="prettyprint">
 * function callback( previousValue:* , currentValue:* , index:uint , array:Array ):*
 * {
 *     // ...
 * }
 * </pre>
 * <p>The first time the function is called, the <code class="prettyprint">previousValue</code> and <code class="prettyprint">currentValue</code> can be one of two values. 
 * If an <code class="prettyprint">initialValue</code> was provided in the call to reduce, then <code class="prettyprint">previousValue</code> will be equal to <code class="prettyprint">initialValue</code> and <code class="prettyprint">currentValue</code> will be equal to the first value in the array. 
 * If no initialValue was provided, then <code class="prettyprint">previousValue</code> will be equal to the first value in the array and <code class="prettyprint">currentValue</code> will be equal to the second.</p>
 * <p><b>Basic example : </b></p> 
 * <p><b>Example : </b></p>
 * <pre class="prettyprint">
 * var ar ;
 * var result ;
 * var callback ;
 * 
 * ////// only to debug in the the Array trace message
 * 
 * Array.prototype.toString = function()
 * {
 *     return "[" + this.join(",") + "]" ;
 * }
 * 
 * //////
 *  
 * ar = [0,1,2,3,4] ;
 * 
 * callback = function( previousValue , currentValue , index, array )
 * {
 *     trace( "previousValue = " + previousValue + ", currentValue = " + currentValue + ", index = " + index ) ;
 *     return previousValue + currentValue ;
 * } ;
 * 
 * ////
 * 
 * result = core.arrays.reduce( ar , callback ) ;
 *  
 * // previousValue = 0, currentValue = 1, index = 1 // First call
 * // previousValue = 1, currentValue = 2, index = 2 // Second call
 * // previousValue = 3, currentValue = 3, index = 3 // Third call
 * // previousValue = 6, currentValue = 4, index = 4 // Fourth call
 *  
 * trace( "value : " + result ) ;  // value : 10
 * 
 * ////
 * 
 * result = core.arrays.reduce( ar , callback , 10 ) ;
 *  
 * // previousValue = 10, currentValue = 0, index = 0
 * // previousValue = 10, currentValue = 1, index = 1
 * // previousValue = 11, currentValue = 2, index = 2
 * // previousValue = 13, currentValue = 3, index = 3
 * // previousValue = 16, currentValue = 4, index = 4
 * 
 * trace( "value : " + result ) ;  // value : 20
 * 
 * ////
 * 
 * // array is always the object [0,1,2,3,4] upon which reduce was called
 * 
 * trace( "ar : " + ar ) ; // ar : 0,1,2,3,4
 * 
 * trace("--- Example: Sum up all values within an array") ;
 * 
 * ar = [0, 1, 2, 3] ;
 * 
 * callback = function( a , b )
 * {
 *     return a + b ; 
 * }
 * 
 * result = core.arrays.reduce( ar , callback );
 * 
 * trace("total : " + result ) ; // total == 6
 * 
 * trace("--- Example: Flatten an array of arrays") ;
 * 
 * ar = [[0,1], [2,3], [4,5]] ;
 * 
 * callback = function( a , b )
 * {
 *     return a.concat( b ) ;
 * }
 * 
 * result = core.arrays.reduce( ar , callback , [] ) ;
 * 
 * trace("flattened is " + result ) ; // flattened is [0, 1, 2, 3, 4, 5]
 * </pre>
 * @param callback Function to execute on each value in the Array.
 * @param initialValue The object to use as the first argument to the first call of the callback. 
 */
core.arrays.reduce = function( ar /*Array*/ , callback /*Function*/ , initialValue )
{
    var size /*int*/ = ar.length ;
    if ( callback == null )
    {
        throw new Error("core.arrays.reduce() function failed, the callback method not must be null.") ;
    }
    if ( size == 0 )
    {
        throw new Error("core.arrays.reduce() function failed, the passed-in array is empty.") ;
    }
    var i /*int*/ = 0 ;
    var r ;
    if ( initialValue != undefined )
    {
        r = initialValue ;
    }
    else
    {
        do
        {
            if ( i in ar )
            {
                r = ar[i++] ;
                break ;
            }
            if ( ++i > size )
            {
                throw new Error("core.arrays.reduce() function failed, if array contains no values, no initial value to return.") ;
            }
        }
        while( true ) ;
    }
    for ( ; i < size ; i++ )
    {
        if (i in ar)
        {
            r = callback.call( null , r , ar[i] , i , ar ) ;
        }
    }
    return r;
}
