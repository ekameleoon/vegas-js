'use strict' ;

/**
 * A basic trace() function based on the console.log method.
 * @static
 */
export function trace( context )
{
    if( console )
    {
        console.log( context ) ;
    }
}