"use strict" ;

import { global } from '../global.js' ;

/**
 * Returns the instance of a public definition in a specific <code>domain</code>.
 * @param name a string of the full qualified path of a definition.
 * @example (optional) the global scope object where to find the reference, default is <code>global</code>.
 * <pre class="prettyprint">
 * var definition = core.reflect.getDefinitionByName('system.signals.Signal') ;
 * trace( definition ) ;
 * </pre>
 */
export function getDefinitionByName( name /*String*/ , domain = null )
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