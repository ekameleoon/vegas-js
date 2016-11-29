"use strict" ;

/**
 * Indicates if the specific objet is {@link graphics.Directionable} and contains the <code>direction</code> property.
 * @name isDirectionable
 * @function
 * @instance
 * @memberof graphics
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link graphics.Directionable}.
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
 * @summary This interface defines a graphic object or component with a direction.
 * @name Directionable
 * @memberof graphics
 * @interface
 */
export function Directionable()
{
    /**
     * The direction of the object.
     * @name direction
     * @memberof graphics.Directionable
     * @instance
     * @default null
     */
    this.direction = null ;
}

Directionable.prototype = Object.create( Object.prototype );
Directionable.prototype.constructor = Directionable;