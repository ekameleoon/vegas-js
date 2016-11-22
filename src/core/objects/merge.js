"use strict" ;

/**
 * Merging enumerable properties from a specific Object to a target Object.
 * @param target The target object to merge.
 * @param source The source object reference.
 * @param overwrite The optional flag to indicates if the merge function can override the already existing properties in the target reference (default true).
 * @example
 * <code>
 * var target = { a : 5 , b : 6 } ;
 * var from   = { a : 1 , b : 2 , c: 3 } ;
 * trace( core.dump( core.objects.merge( target , from ) ) ) ; // {a:1,b:2,c:3}
 * </code>
 * @return The merged target reference.
 */
export function merge( target /*Object*/ , source /*Object*/ , overwrite /*Boolean*/ ) /*Object*/
{
    if ( overwrite === null || overwrite === undefined )
    {
        overwrite = true ;
    }

    if ( source === null || source === undefined )
    {
        source = {} ;
    }

    for( var prop /*String*/ in source )
    {
        if ( !( prop in target ) || overwrite )
        {
            target[prop] = source[prop] ;
        }
    }

    return target ;
}