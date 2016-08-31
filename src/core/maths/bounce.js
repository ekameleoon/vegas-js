"use strict" ;

/**
 * Returns a value between 0 and 1 that can be used to easily make bouncing GUI items (a la OS X's Dock)
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * import core.maths.bounce ;
 * trace( bounce( 0.5 ) ) ;
 * </pre>
 * @param amount The amount to bounce a value between 0 and 1.
 * @return a value between 0 and 1 that can be used to easily make bouncing GUI items (a la OS X's Dock)
 */
export var bounce = ( amount ) => Math.abs( Math.sin( 6.28 * ( amount + 1 ) * ( amount + 1 ) ) * ( 1 - amount ) ) ;