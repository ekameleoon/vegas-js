"use strict" ;

/**
 * Determinates the corner settings to set a rectangular shape or a component, like rectangles, rounded rectangle, etc.
 * @summary Determinates the corner settings to set a rectangular shape or a component.
 * @name Corner
 * @class
 * @memberof graphics
 * @example
 * var corner = new Corner(true,true,false,false) ;
 * trace( corner ) ;
 */
export function Corner( tl = true , tr = true , br = true , bl = true )
{
    Object.defineProperties( this ,
    {
        /**
         * The bottom left flag value.
         * @name bl
         * @memberof graphics.Corner
         * @instance
         * @type boolean
         * @default true
         */
        bl : { value : bl === true , writable : true , enumerable : true } ,

        /**
         * The bottom right flag value.
         * @name br
         * @memberof graphics.Corner
         * @instance
         * @type boolean
         * @default true
         */
        br : { value : br === true , writable : true , enumerable : true } ,

        /**
         * The top left flag value.
         * @name tl
         * @memberof graphics.Corner
         * @instance
         * @type boolean
         * @default true
         */
        tl : { value : tl === true , writable : true , enumerable : true } ,

        /**
         * The top right flag value.
         * @name tr
         * @memberof graphics.Corner
         * @instance
         * @type boolean
         * @default true
         */
        tr : { value : tr === true , writable : true , enumerable : true }
    }) ;
}

Corner.prototype = Object.create( Object.prototype ,
{
    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     * @name clone
     * @memberof graphics.Corner
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new Corner( this.tl , this.tr , this.br , this.bl ) ;
    }},

    /**
     * Compares the specified object with this object for equality.
     * @param {object} o - The object to evaluates.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.Corner
     * @instance
     * @function
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
     * @name toString
     * @memberof graphics.Corner
     * @instance
     * @function
     */
    toString : { value : function()
    {
        return "[Corner tl:" + this.tl + " tr:" + this.tr + " br:" + this.br  + " bl:" + this.bl + "]" ;
    }}
})
