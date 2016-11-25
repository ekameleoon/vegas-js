"use strict" ;

/**
 * Indicates if the specific <code>target</code> is an {@link system.data.Identifiable|Identifiable} object.
 * @name isIdentifiable
 * @memberof system.data
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.Identifiable|Identifiable} object.
 */
export function isIdentifiable( target )
{
    if( target )
    {
        return (target instanceof Identifiable) || ('id' in target) ;
    }
    return false ;
}

/**
 * This interface defines a common structure for <strong>identifiable</strong> classes (has an <code>id<code> property).
 * @name Identifiable
 * @interface
 * @memberof system.data
 */
export function Identifiable()
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates the unique identifier value of this object.
         */
        id : { value : null , enumerable : true , writable : true }
    }) ;
}

Identifiable.prototype = Object.create( Object.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value :  Identifiable , writable : true }
}) ;