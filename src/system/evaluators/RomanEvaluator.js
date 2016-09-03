"use strict" ;

import { Evaluable }   from '../Evaluable.js' ;
import { RomanNumber } from '../numeric/RomanNumber.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * <p><b>Example :</b></p>
 * <pre>
 * var RomanEvaluator=  system.evaluators.RomanEvaluator ;
 *
 * var evaluator = new RomanEvaluator() ;
 *
 * trace( evaluator.eval( 1 ) ) ; // I
 * trace( evaluator.eval( 2 ) ) ; // II
 * trace( evaluator.eval( 3 ) ) ; // III
 * trace( evaluator.eval( 4 ) ) ; // IV
 * trace( evaluator.eval( 5 ) ) ; // V
 * trace( evaluator.eval( 9 ) ) ; // IX
 * trace( evaluator.eval( 10 ) ) ; // X
 * trace( evaluator.eval( 50 ) ) ; // L
 * trace( evaluator.eval( 2459 ) ) ; // MMCDLIX
 * trace( evaluator.eval( 3999 ) ) ;  // MMMCMXCIX
 *
 * // roman string to number
 *
 * trace( evaluator.eval( "I" ) ) ; // 1
 * trace( evaluator.eval( "II" ) ) ; // 2
 * trace( evaluator.eval( "III" ) ) ; // 3
 * trace( evaluator.eval( "IV" ) ) ; // 4
 * trace( evaluator.eval( "V" ) ) ; // 5
 * trace( evaluator.eval( "IX" ) ) ; // 9
 * trace( evaluator.eval( "X" ) ) ; // 10
 * trace( evaluator.eval( "L" ) ) ; // 50
 * trace( evaluator.eval( "MMCDLIX" ) ) ; // 2459
 * trace( evaluator.eval( "MMMCMXCIX" ) ) ; // 3999
 *
 * try
 * {
 *     evaluator.eval( 4000 ) ;
 * }
 * catch( e )
 * {
 *     trace( e.message ) ;  // Max value for a RomanNumber is 3999
 * }
 *
 * try
 * {
 *     evaluator.eval( -1 ) ;
 * }
 * catch( e )
 * {
 *     trace( e.message ) ; // Min value for a RomanNumber is 0
 * }
 * </pre>
 */
export function RomanEvaluator()
{

}

/**
 * @extends Evaluable
 */
RomanEvaluator.prototype = Object.create( Evaluable.prototype );
RomanEvaluator.prototype.constructor = RomanEvaluator;

/**
 * Evaluates the specified object.
 */
RomanEvaluator.prototype.eval = function ( o )
{
    if( typeof(o) === 'string' || o instanceof String )
    {
       return RomanNumber.parseRomanString( o );
    }
    else if ( typeof(o) == 'number' || o instanceof Number )
    {
        return RomanNumber.parse( o );
    }
    else
    {
        return null ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
RomanEvaluator.prototype.toString = function () /*String*/
{
    return "[RomanEvaluator]" ;
}