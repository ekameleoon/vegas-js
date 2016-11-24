"use strict" ;

import { global } from '../global.js' ;

/**
 * Returns the instance of a public definition in a specific <code>domain</code> object.
 * @name invoke
 * @memberof core.reflect
 * @function
 * @param {string} name - The name of the full qualified path of a definition (instance, class, etc).
 * @param {Object} [domain] - A global object or namespace who contains the definition object. By default, the function use the <code>global</code> scope object where to find the reference.
 * @example
 * var definition = core.reflect.getDefinitionByName('system.signals.Signal') ;
 * trace( definition ) ;
 * </pre>
 */
export function getDefinitionByName( name , domain = null )
{
    if( ( name instanceof String ) || typeof(name) === 'string' )
    {
        name = name.split('.') ;
        if( name.length > 0 )
        {
            try
            {
                var o = domain || global ;
                name.forEach( ( element ) =>
                {
                    if(o.hasOwnProperty(element) )
                    {
                        o = o[element] ;
                    }
                    else
                    {
                        return undefined ;
                    }
                });
                return o ;
            }
            catch( e )
            {
                //
            }
        }
    }
    return undefined ;
}