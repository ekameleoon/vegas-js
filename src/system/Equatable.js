/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Equatable.
 * @function
 * @memberof system
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
 * @name Equatable
 * @memberof system
 * @interface
 */
export function Equatable()
{

}

Equatable.prototype = Object.create( Object.prototype );
Equatable.prototype.constructor = Equatable;

/**
 * Compares the specified object with this object for equality.
 * @memberof system.Equatable
 * @function
 * @param {*} object - The object to evaluates.
 * @return {boolean} true if the the specified object is <b>equal to</b> this object.
 */
Equatable.prototype.equals = function( object )
{
    //
}

/**
 * Returns the string representation of this instance.
 * @function
 * @memberof system.Equatable
 * @return the string representation of this instance.
 */
Equatable.prototype.toString = function ()
{
    return "[Equatable]" ;
}