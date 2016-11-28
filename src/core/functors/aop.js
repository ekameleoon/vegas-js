"use strict" ;

/**
 * Creates a Function who execute a specific function between two others.
 * @name aop
 * @memberof core.functors
 * @function
 * @instance
 * @example
 * var scope = { toString : function() { return "scope" ; } } ;
 *
 * var sum = function(x, y)
 * {
 *     console.info( this + " calculating...")
 *     return x + y;
 * }
 *
 * function begin()
 * {
 *     trace("--- begin");
 * }
 *
 * function end()
 * {
 *     trace("--- end");
 * }
 *
 * var result = aop(sum, begin, end, scope)(3, 5) ;
 *
 * console.log( result ) ;
 * @param {Function} func - The function to invoke.
 * @param {Function} begin - The function to invoke before the main function.
 * @param {Function} end - The function to invoke after the main function.
 * @param {Object} scope - The scope of the function to invoke after the main function.
 * @return {Function} The new function with the aop merging.
 */
export var aop = ( func , begin = null , end = null , scope = null ) =>
{
    return function( ...args )
    {
        try
        {
            if( begin !== null && begin instanceof Function )
            {
                begin();
            }
            return func.apply( scope , args );
        }
        finally
        {
            if( end !== null && end instanceof Function )
            {
                end();
            }
        }
    }
}