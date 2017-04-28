"use strict" ;

import { ObjectArgument } from '../ObjectArgument.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;

/**
 * Creates the Array of all arguments.
 * @return the Array of all arguments.
 * @memberof system.ioc.builders
 * @function
 * @private
 */
export function createArguments( a )
{
    if ( !(a instanceof Array) || a.length === 0 )
    {
        return null ;
    }
    else
    {
        let args = [] ;
        let l = a.length ;
        for ( let i = 0 ; i<l ; i++ )
        {
            let o = a[i] ;
            if ( o !== null )
            {
                let call       = ( ObjectAttribute.CALLBACK in o )   ? o[ ObjectAttribute.CALLBACK ]  : null ;
                let conf       = ( ObjectAttribute.CONFIG in o )     ? String(o[ ObjectAttribute.CONFIG ]) : null ;
                let i18n       = ( ObjectAttribute.LOCALE in o )     ? String(o[ ObjectAttribute.LOCALE ]) : null ;
                let ref        = ( ObjectAttribute.REFERENCE in o )  ? String(o[ ObjectAttribute.REFERENCE ]) : null ;
                let value      = ( ObjectAttribute.VALUE in o )      ? o[ ObjectAttribute.VALUE ] : null ;
                let evaluators = ( ObjectAttribute.EVALUATORS in o ) ? o[ ObjectAttribute.EVALUATORS ] : null ;

                if ( ref !== null && ref.length > 0 )
                {
                    args.push( new ObjectArgument( ref , ObjectAttribute.REFERENCE , evaluators ) ) ;
                }
                else if ( conf !== null && conf.length > 0 )
                {
                    args.push( new ObjectArgument( conf , ObjectAttribute.CONFIG , evaluators ) ) ;
                }
                else if ( i18n !== null && i18n.length > 0 )
                {
                    args.push( new ObjectArgument( i18n , ObjectAttribute.LOCALE , evaluators ) ) ;
                }
                else if ( call instanceof Function || ( (call instanceof String || typeof(call) === 'string') && (call !== '') ) )
                {
                    let def = new ObjectArgument( call , ObjectAttribute.CALLBACK , evaluators ) ;
                    if( ObjectAttribute.SCOPE in o )
                    {
                        def.scope = o[ObjectAttribute.SCOPE] ;
                    }
                    if( ( ObjectAttribute.ARGUMENTS in o ) && (o[ ObjectAttribute.ARGUMENTS ] instanceof Array) )
                    {
                        def.args = createArguments( o[ ObjectAttribute.ARGUMENTS ] ) ; // warn with a recursive call of the function
                    }
                    args.push( def ) ;
                }
                else
                {
                    args.push( new ObjectArgument( value , ObjectAttribute.VALUE , evaluators ) ) ;
                }
            }
        }
        return args.length > 0 ? args : null ;
    }
}