"use strict" ;

/**
 * This entry is an helper to encapsulate a view in a layout engine.
 * @name LayoutEntry
 * @memberof graphics
 * @class
 * @constructs
 * @param {Object} [child=null] - The child reference of the entry.
 */
export function LayoutEntry( child = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The child reference of this entry.
         * @name child
         * @memberof graphics.LayoutEntry
         * @instance
         * @type Object
         */
        child : { value : child , writable : true } ,

        /**
         * The x property of this entry.
         * @name x
         * @memberof graphics.LayoutEntry
         * @instance
         * @type number
         */
        x : { value : (child && "x" in child) ? child.x : 0 , writable : true } ,

        /**
         * The y property of this entry.
         * @name y
         * @memberof graphics.LayoutEntry
         * @instance
         * @type number
         */
        y : { value : (child && "y" in child) ? child.y : 0 , writable : true } ,

        /**
         * The delta x property of this entry.
         * @name tx
         * @memberof graphics.LayoutEntry
         * @instance
         * @type number
         */
        tx : { value : 0 , writable : true } ,

        /**
         * The delta y property of this entry.
         * @name ty
         * @memberof graphics.LayoutEntry
         * @instance
         * @type number
         */
        ty : { value : 0 , writable : true } ,
    });
}

LayoutEntry.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : LayoutEntry } ,

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.LayoutEntry
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[LayoutEntry]' ;
    }}
});