"use strict" ;

/**
 * Returns a percentage value or NaN.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.percentage( 50 , 100 ) + "%" ) ; // 50%
 * trace( core.maths.percentage( 68 , 425 ) + "%" ) ; // 16%
 * </pre>
 * @param value the current value.
 * @param maximum the max value.
 * @return a percentage value or null.
 */
export var percentage = ( value , maximum ) =>
{
    var p /*Number*/ = (value / maximum) * 100 ;
    return (isNaN( p ) || ! isFinite( p )) ? NaN : p ;
}
