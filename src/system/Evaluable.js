/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is {@link system.Evaluable|Evaluable}.
 * @name isEvaluable
 * @function
 * @memberof system
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.Evaluable|Evaluable}.
 */
export function isEvaluable( target )
{
    if( target )
    {
        return (target instanceof Evaluable) ||
               (( 'eval' in target ) && ( target.eval instanceof Function ))  ;
    }
    return false ;
}

/**
 * An Evaluable class can interpret an object to another object.
 * <p>It's not necessary a parser, but the most common cases would be a string being evaluated to an object structure.</p>
 * <p><b>Note:</b> eval always take one and only one argument, if you need to configure the evaluator pass different arguments in the constructor.</p>
 * @name Evaluable
 * @memberof system
 * @interface
 */
export function Evaluable() {}

Evaluable.prototype = Object.create( Object.prototype );
Evaluable.prototype.constructor = Evaluable;

/**
 * Evaluates the specified object.
 * @param {*} value - The object to evaluates.
 * @return The result of the evaluation.
 * @name eval
 * @memberof system.Evaluable
 * @function
 * @instance
 */
Evaluable.prototype.eval = function( value ) {}