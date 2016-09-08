/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Equatable.
 */
export function isEquatable( target )
{
    if( target )
    {
        return ( target.equals && ( target.equals instanceof Function ) ) || (target instanceof Equatable)   ;
    }

    return false ;
}

/**
 * This interface is implemented by classes that can compare an object with their objects.
 */
export function Equatable()
{

}

/**
 * @extends Object
 */
Equatable.prototype = Object.create( Object.prototype );
Equatable.prototype.constructor = Equatable;

/**
 * Compares the specified object with this object for equality.
 * @return true if the the specified object is equal with this object.
 */
Equatable.prototype.equals = function( o ) /*Boolean*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Equatable.prototype.toString = function () /*String*/
{
    return "[Equatable]" ;
}