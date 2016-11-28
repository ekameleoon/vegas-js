"use strict" ;

/**
 * @name rotate
 * @memberof core.arrays
 * @instance
 * @function
 * @instance
 * @description Rotates an Array in-place. After calling this method, the element at index i will be the element previously at <code>index(i-n)%array.length</code>, for all values of i between <code>0 and <code>array.length-1</code>, inclusive.
 * <p>For example, suppose list comprises <code>[l, o, v, e]</code>. After invoking <code>rotate(array, 1)</code> (or <code>rotate(array, -3)</code>), array will comprise <code>[e,l,o,v]</code>.</p>
 * @param {Array} ar - The array to rotate.
 * @param {number} [amount=1] The amount to rotate.
 * @return {Array} The rotated Array reference.
 * @example
 * var array = ["l","o","v","e"] ;
 *
 * trace( dump( rotate( array ,  1 ) ) ) ; // ["e","l","o","v"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["l","o","v","e"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["o","v","e","l"]
 * trace( dump( rotate( array ,  3 ) ) ) ; // ["v","e","l","o"]
 */
export function rotate( ar /*Array*/ , amount = 1 ) /*Array*/
{
    if ( ( ar instanceof Array ) && ar.length > 0 )
    {
        amount %= ar.length ;
        if ( amount > 0 )
        {
            ar.unshift.apply( ar , ar.splice(-amount, amount ) ) ;
        }
        else if ( amount < 0 )
        {
            ar.push.apply( ar , ar.splice(0, -amount ) );
        }
    }
    else
    {
        ar = null ;
    }
    return ar;
}