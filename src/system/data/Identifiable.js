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
    //
}

/**
 * @extends Object
 */
Identifiable.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  Identifiable },

    /**
     * Indicates the unique identifier value of this object.
     */
    id : { value : null , enumerable : true , writable : true }
}) ;