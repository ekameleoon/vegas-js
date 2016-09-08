/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Evaluable.
 */
export function isEvaluable( target )
{
    if( target )
    {
        return (target instanceof Evaluable) || (( 'eval' in target ) && ( target.eval instanceof Function ))  ;
    }

    return false ;
}

/**
 * An Evaluable class can interpret an object to another object.
 * <p>It's not necessary a parser, but the most common cases would be a string being evaluated to an object structure.</p>
 * <p><b>Note:</b> eval always take one and only one argument, if you need to configure the evaluator pass different arguments in the constructor.</p>
 */
export function Evaluable()
{

}

/**
 * @extends Object
 */
Evaluable.prototype = Object.create( Object.prototype );
Evaluable.prototype.constructor = Evaluable;

/**
 * Evaluates the specified object.
 */
Evaluable.prototype.eval = function( o ) /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Evaluable.prototype.toString = function () /*String*/
{
    return "[Evaluable]" ;
}