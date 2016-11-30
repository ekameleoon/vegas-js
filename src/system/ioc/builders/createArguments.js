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
        var args = [] ;
        var o ;
        var evaluators ;

        var conf ;
        var i18n ;
        var ref  ;

        var value ;

        var l = a.length ;

        for ( var i = 0 ; i<l ; i++ )
        {
            o = a[i] ;
            if ( o !== null )
            {
                conf       = ( ObjectAttribute.CONFIG in o )     ? String(o[ ObjectAttribute.CONFIG ]) : null ;
                i18n       = ( ObjectAttribute.LOCALE in o )     ? String(o[ ObjectAttribute.LOCALE ]) : null ;
                ref        = ( ObjectAttribute.REFERENCE in o )  ? String(o[ ObjectAttribute.REFERENCE ]) : null ;
                value      = ( ObjectAttribute.VALUE in o )      ? o[ ObjectAttribute.VALUE ] : null ;
                evaluators = ( ObjectAttribute.EVALUATORS in o ) ? o[ ObjectAttribute.EVALUATORS ] : null ;

                if ( ref !== null && ref.length > 0 )
                {
                    args.push( new ObjectArgument( ref , ObjectAttribute.REFERENCE , evaluators ) ) ; // ref argument
                }
                else if ( conf !== null && conf.length > 0 )
                {
                    args.push( new ObjectArgument( conf , ObjectAttribute.CONFIG , evaluators ) ) ; // config argument
                }
                else if ( i18n !== null && i18n.length > 0 )
                {
                    args.push( new ObjectArgument( i18n , ObjectAttribute.LOCALE , evaluators ) ) ; // locale argument
                }
                else
                {
                    args.push( new ObjectArgument( value , ObjectAttribute.VALUE , evaluators ) ) ; // value argument
                }
            }
        }

        return args.length > 0 ? args : null ;
    }
}