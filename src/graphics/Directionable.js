"use strict" ;

/**
 * Indicates if the specific objet is Directionable.
 */
export function isDirectionable( target )
{
    if( target )
    {
        return (target instanceof Directionable) || ('direction' in target) ;
    }

    return false ;
}

/**
 * This interface defines a graphic object or component with a direction.
 */
export function Directionable()
{
    this.direction = null ;
}

/**
 * @extends Object
 */
Directionable.prototype = Object.create( Object.prototype );
Directionable.prototype.constructor = Directionable;

/**
 * Compares the specified object with this object for equality.
 * @return true if the the specified object is equal with this object.
 */
Directionable.prototype.direction = null ;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Directionable.prototype.toString = function () /*String*/
{
    return "[Directionable]" ;
}