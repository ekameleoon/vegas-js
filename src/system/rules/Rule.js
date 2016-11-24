"use strict" ;

/**
 * Indicates if the specific objet is a Rule.
 * @memberof system.rules
 * @function
 * @param {Object} target - The object to validate.
 * @return <code>true</code> if the object is a {@link system.rules.Rule} instance.
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
 * @name Rule
 * @memberof system.rules
 * @interface
 * @extends Object
 */
export function Rule()
{

}

Rule.prototype = Object.create( Object.prototype );
Rule.prototype.constructor = Rule;

/**
 * Evaluates the specified condition.
 * @name eval
 * @memberof system.rules.Rule
 * @function
 * @instance
 */
Rule.prototype.eval = function()
{
    //
}

/**
 * Returns the string representation of this instance.
 * @name toString
 * @memberof system.rules.Rule
 * @function
 * @instance
 * @return the string representation of this instance.
 */
Rule.prototype.toString = function () /*String*/
{
    return "[Rule]" ;
}