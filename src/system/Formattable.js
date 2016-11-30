/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Formattable.
 * @name isFormattable
 * @function
 * @memberof system
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.Formattable|Formattable}.
 */
export function isFormattable( target )
{
    if( target )
    {
        return (target instanceof Formattable) || (( 'format' in target ) && ( target.format instanceof Function ))  ;
    }

    return false ;
}

/**
 * Interface implemented by classes that can format a value in a specific string expression.
 * @name Formattable
 * @memberof system
 * @interface
 */
export function Formattable()
{

}

Formattable.prototype = Object.create( Object.prototype );
Formattable.prototype.constructor = Formattable;

/**
 * Formats the specified value.
 * @param {*} value - The object to evaluates.
 * @return the string representation of the formatted value.
 * @name eval
 * @memberof system.Formattable
 * @function
 * @instance
 */
Formattable.prototype.format = function( value ) 
{
    //
}