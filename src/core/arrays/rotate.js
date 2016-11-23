"use strict" ;

/**
 * @name rotate
 * @memberof core.arrays
 * @instance
 * @function
 * @description Rotates an Array in-place. After calling this method, the element at index i will be the element previously at <strong>index (i - n) % array.length</strong>,
 * for all values of i between 0 and array.length - 1, inclusive.
 * For example, suppose list comprises [l, o, v, e]. After invoking rotate(array, 1) (or rotate(array, -3)), array will comprise [e,l,o,v].
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