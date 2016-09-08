/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Formattable.
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
 */
export function Formattable()
{

}

/**
 * @extends Object
 */
Formattable.prototype = Object.create( Object.prototype );
Formattable.prototype.constructor = Formattable;

/**
 * Formats the specified value.
 * @param value The object to format.
 * @return the string representation of the formatted value.
 */
Formattable.prototype.format = function( value ) /*String*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Formattable.prototype.toString = function () /*String*/
{
    return "[Formattable]" ;
}