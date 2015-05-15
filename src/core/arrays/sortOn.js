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
 * In the sorting methods, this constant specifies case-insensitive sorting. You can use this constant for the options parameter in the sort() or sortOn() method.
 * <p>he value of this constant is 1.</p>
 */
Array.CASEINSENSITIVE = 1;

/**
 * In the sorting methods, this constant specifies descending sort order. You can use this constant for the options parameter in the sort() or sortOn() method.
 * <p>The value of this constant is 2.</p>
 */
Array.DESCENDING = 2 ;

/**
 * In the sorting methods, this constant specifies numeric (instead of character-string) sorting. Including it in the options parameter causes the sort() and sortOn() methods to sort numbers as numeric values, not as strings of numeric characters. 
 * <p>Without the NUMERIC constant, sorting treats each array element as a character string and produces the results in Unicode order.</p>
 * <p>For example, given the Array of values [2005, 7, 35], if the NUMERIC constant is not included in the options parameter, the sorted Array is [2005, 35, 7], but if the NUMERIC constant is included, the sorted Array is [7, 35, 2005].</p>
 * <p>The value of this constant is 16.</p>
 */
Array.NUMERIC = 16 ;

/**
 * Specifies that a sort returns an indexed array as a result of calling the sort() or sortOn() method. 
 * <p>You can use this constant for the options parameter in the sort() or sortOn() method. This provides preview or copy functionality by returning an array that represents the results of the sort and leaves the original array unmodified.</p>
 * <p>The value of this constant is 8.</p>
 */
Array.RETURNINDEXEDARRAY = 8 ;

/**
 * In the sorting methods, this constant specifies the unique sorting requirement. 
 * <p>You can use this constant for the options parameter in the sort() or sortOn() method. The unique sorting option aborts the sort if any two elements or fields being sorted have identical values.</p>
 * <p>The value of this constant is 4.</p>
 */
Array.UNIQUESORT = 4 ;

/**
 * Sorts the elements in an array according to one or more fields in the array. 
 * The array should have the following characteristics:
 * <ul>
 * <li>The array is an indexed array, not an associative array.</li>
 * <li>Each element of the array holds an object with one or more properties.</li>
 * <li>All of the objects have at least one property in common, the values of which can be used to sort the array. Such a property is called a field.</li>
 * </ul>
 * <p><b>Example : </b></p>
 * {@code
 * echo = function( a ) 
 * {
 *     var l = a.length ;
 *     for (var i = 0; i < l; i++) 
 *     {
 *         trace( ">> " + a[i].name + " :: " + a[i].num ) ;
 *     }
 * }
 * 
 * trace ("---- Array") ;
 * var a = 
 * [
 *     { name:"test 0" , num:6 } ,
 *     { name:"Test 1" , num:8 } ,
 *     { name:"test 2" , num:4 } ,
 *     { name:"test 3" , num:10 }
 * ] ;
 * 
 * echo(a) ;
 * 
 * trace ("---- sort num Array.NUMERIC | Array.DESCENDING") ;
 * 
 * var r = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING) ;
 * 
 * echo(a) ;
 * 
 * trace ("---- sort name") ;
 * 
 * core.arrays.sortOn( a , "name") ;
 * 
 * echo(a) ;
 * 
 * trace ("---- sort name Array.CASEINSENSITIVE") ;
 * 
 * core.arrays.sortOn( a , "name", Array.CASEINSENSITIVE) ;
 * 
 * echo(a) ;
 * 
 * trace ("---- sort name Array.RETURNINDEXEDARRAY") ;
 * 
 * //var result = core.arrays.sortOn( a , "name", Array.CASESEINSENTIVE | Array.RETURNINDEXEDARRAY) ;
 * //var result = core.arrays.sortOn( a , "name", Array.RETURNINDEXEDARRAY) ;
 * //trace (result) :
 * 
 * var result = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 * 
 * var result = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 * 
 * var result = core.arrays.sortOn( a , "name", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
 * trace (result) ;
 * 
 * trace ("---- sort name Array.UNIQUESORT") ;
 * 
 * a.push({ name:"test 1" , num:60 } ) ;
 * 
 * core.arrays.sortOn( a , "name", Array.UNIQUESORT ) ;
 * 
 * echo(a) ;
 * }
 */
core.arrays.sortOn = function ( ar /*Array*/ , propName , options ) 
{
    var sortFunction = function(o1, o2) 
    {
        var v1 = (o1[propName] != undefined) ? o1[propName].valueOf() : "" ;
        var v2 = (o2[propName] != undefined) ? o2[propName].valueOf() : "" ;
        
        function noCase() 
        {
            if (typeof(v1) == "string" || v1 instanceof String) 
            {
                v1 = v1.toLowerCase() ;
            }
            if (typeof(v2) == "string" || v2 instanceof String) 
            {
                v2 = v2.toLowerCase() ;
            }
        }
           
        function numeric() 
        {
            v1 = Number(v1) ;
            v2 = Number(v2) ;
            v1 = isNaN(v1) ? 0 : v1 ;
            v2 = isNaN(v2) ? 0 : v2 ;
        }
        
        function reverse() 
        {
            var tmp = v1 ;
            v1 = v2 ;
            v2 = tmp ;
        }
        
        switch( options ) 
        {
            case Array.CASEINSENSITIVE :
            case Array.CASEINSENSITIVE | Array.RETURNINDEXEDARRAY :
            {
                noCase() ;
                break ;
            }
            case Array.NUMERIC :
            case Array.NUMERIC | Array.RETURNINDEXEDARRAY :
            {
                numeric() ;
                break ;
            }
            case Array.DESCENDING :
            case Array.DESCENDING | Array.RETURNINDEXEDARRAY :
            {
                reverse() ;
                break ;
            }
            case Array.CASEINSENSITIVE | Array.DESCENDING :
            case Array.CASEINSENSITIVE | Array.DESCENDING | Array.RETURNINDEXEDARRAY :
            {
                noCase() ;
                reverse() ;
                break ;
            }    
            case Array.NUMERIC | Array.DESCENDING :
            case Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY :
            {
                numeric() ;
                reverse() ;
                break ;
            }
            case Array.UNIQUESORT :
            {
                if (v1 == v2) return ;
                break 
            }
        }
       
        if (v1 < v2) 
        {
            return -1 ;
        }
        else if (v1 > v2) 
        {
            return 1 ;
        }
        else 
        {
            return 0 ;
        } 
    }
    
    switch (options) 
    {
        case Array.RETURNINDEXEDARRAY : 
        case Array.RETURNINDEXEDARRAY | Array.NUMERIC :
        case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE :
        case Array.RETURNINDEXEDARRAY | Array.NUMERIC | Array.DESCENDING :
        case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE | Array.DESCENDING :
        {
            var tmp = [].concat(ar) ;
            tmp.sort(sortFunction) ;
            var result = [] ;
            var l = ar.length ;
            for ( var i = 0; i < l; i++ ) 
            {
                var index = tmp.indexOf(ar[i]) ;
                result.push(index) ;
            }
            return result  ;
        }
        default :
        {
            return ar.sort(sortFunction) ;
        }
    }
}