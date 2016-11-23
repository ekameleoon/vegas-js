"use strict" ;

/**
 * Merging enumerable properties from a specific Object to a target Object.
 * @name merge
 * @memberof core.objects
 * @function
 * @param {Object} target - The target object to merge.
 * @param {Object} source - The source object reference.
 * @param {boolean} [overwrite=true] - The optional flag to indicates if the merge function can override the already existing properties in the target reference (default true).
 * @return The merged target reference.
 * @example
 * var target = { a : 5 , b : 6 } ;
 * var from   = { a : 1 , b : 2 , c: 3 } ;
 * trace( dump( merge( target , from ) ) ) ; // {a:1,b:2,c:3}
 */
export function merge( target , source , overwrite = true )
{
    if ( overwrite === null || overwrite === undefined )
    {
        overwrite = true ;
    }

    if ( source === null || source === undefined )
    {
        source = {} ;
    }

    for( var prop in source )
    {
        if ( !( prop in target ) || overwrite )
        {
            target[prop] = source[prop] ;
        }
    }

    return target ;
}