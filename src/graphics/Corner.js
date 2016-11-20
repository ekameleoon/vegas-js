"use strict" ;

/**
 * Determinates the corner definition.This object is use to set for example the CornerRectanglePen implementation (Bevel, RoundedComplex, etc.)
 */
export function Corner( tl = true , tr = true , br = true , bl = true )
{
    Object.defineProperties( this ,
    {
        /**
         * The bottom left flag value.
         */
        bl : { value : bl === true , writable : true , enumerable : true } ,

        /**
         * The bottom right flag value.
         */
        br : { value : br === true , writable : true , enumerable : true } ,

        /**
         * The top left flag value.
         */
        tl : { value : tl === true , writable : true , enumerable : true } ,

        /**
         * The top right flag value.
         */
        tr : { value : tr === true , writable : true , enumerable : true }
    }) ;
}

/**
 * @extends Object
 */
Corner.prototype = Object.create( Object.prototype ,
{
    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     */
    clone : { value : function()
    {
        return new Corner( this.tl , this.tr , this.br , this.bl ) ;
    }},

    /**
     * Compares the specified object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals : { value : function( o )
    {
        if ( o === this )
        {
            return true ;
        }
        else if ( o instanceof Corner )
        {
            return this.tl === o.tl && o.tr === this.tr && o.bl === this.bl && o.br === this.br ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function()
    {
        return "[Corner tl:" + this.tl + " tr:" + this.tr + " br:" + this.br  + " bl:" + this.bl + "]" ;
    }}
})
