"use strict" ;

export function isIdentifiable( target )
{
    if( target )
    {
        return target.hasOwnProperty('id') ;
    }

    return false ;
}

/**
 * This interface defines a common structure for identifiable classes (has an "id" property).
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

/**
 * @extends Object
 */
Identifiable.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  Identifiable , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return "[Identifiable]" ; } , writable : true }
}) ;