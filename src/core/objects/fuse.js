"use strict" ;

/**
 * Copies an array or vector from the specified source (array or vector), beginning at the specified position, to the specified position of the destination object.
 * A subsequence of array components are copied from the source referenced by src to the destination referenced by dest.
 * The number of components copied is equal to the length argument. The components at positions srcPos through srcPos+length-1 in the source array are copied into positions
 * destPos through destPos+length-1, respectively, of the destination object. If the src and dest arguments refer to the same array object, then the copying is performed as
 * if the components at positions srcPos through srcPos+length-1 were first copied to a temporary object with length components and then the contents of the temporary array were
 * copied into positions destPos through destPos+length-1 of the destination array.
 * <p>If src is null, then a ArgumentError is thrown and the destination array is not modified.</p>
 * <p>If dest is null, then dest is the src reference.</p>
 * @name fuse
 * @memberof core.objects
 * @function
 * @instance
 * @param {Array|Object} src - The source array or vector to copy.
 * @param {number} srcPos - The starting position in the source array.
 * @param {Array|Object} dest - The destination array or vector.
 * @param {number} destPos - The starting position in the destination data.
 * @param {number} length - The number of array elements to be copied.
 * @return The copy reference.
 * @example
 * var ar1 = [1,2,3,4] ;
 * var ar2 = [5,6,7,8] ;
 * fuse( ar1 , 2 , ar2 , 2 , 2 ) ;
 * trace( dump( ar2 ) ) ; // [5,6,3,4]
 */
export function fuse( src , srcPos , dest , destPos , length )
{
    if ( !src )
    {
        throw new ReferenceError( "fuse failed, if either src is null." ) ;
    }
    if ( !dest )
    {
        dest = src ;
    }
    if ( destPos < 0 )
    {
        destPos = dest.length ;
    }
    while (length > 0)
    {
        dest[destPos] = src[srcPos];
        srcPos++;
        destPos++;
        length--;
    }
}