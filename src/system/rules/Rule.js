"use strict" ;

/**
 * Indicates if the specific objet is a Rule.
 */
export function isRule( target )
{
    if( target )
    {
        return (target instanceof Rule) || (( 'eval' in target ) && ( target.eval instanceof Function ))  ;
    }
    return false ;
}

/**
 * Defines the rule to evaluate a basic or complex condition.
 */
export function Rule()
{

}

/**
 * @extends Object
 */
Rule.prototype = Object.create( Object.prototype );
Rule.prototype.constructor = Rule;

/**
 * Evaluates the specified condition.
 */
Rule.prototype.eval = function() /*Boolean*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Rule.prototype.toString = function () /*String*/
{
    return "[Rule]" ;
}