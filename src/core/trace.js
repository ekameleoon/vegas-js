'use strict' ;

/**
 * A basic <code>trace()</code> function based on the console.log method.
 * @name trace
 * @function
 * @example
 * trace( 'hello world' ) ;
 */
export function trace( context )
{
    if( console )
    {
        console.log( context ) ;
    }
}