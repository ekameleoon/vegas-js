"use strict" ;

/**
 * Rotates an Array in-place. After calling this method, the element at index i will be the element previously at index (i - n) % array.length,
 * for all values of i between 0 and array.length - 1, inclusive.
 * For example, suppose list comprises [l, o, v, e]. After invoking rotate(array, 1) (or rotate(array, -3)), array will comprise [e,l,o,v].
 * @example
 * <pre>
 * var array = ["l","o","v","e"] ;
 *
 * trace( dump( rotate( array ,  1 ) ) ) ; // ["e","l","o","v"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["l","o","v","e"]
 * trace( dump( rotate( array , -1 ) ) ) ; // ["o","v","e","l"]
 * trace( dump( rotate( array ,  3 ) ) ) ; // ["v","e","l","o"]
 * </pre>
 * @param ar The array to rotate.
 * @param amount The amount to rotate.
 * @return The rotated Array reference.
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