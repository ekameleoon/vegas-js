"use strict" ;

/**
 * A tmx base object definition.
 * @summary A tmx base object definition.
 * @name Base
 * @memberof graphics.tmx
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Base( init = null )
{
    if( init )
    {
        this.setTo( init ) ;
    }
}

Base.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Base } ,

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new this.constructor( this.toObject() ) ;
    }},

    /**
     * Sets the members of the object to the specified values.
     * @param {Object} init - The generic object to initialize the object.
     * @return The current object reference.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    setTo : { writable : true , value : function( init )
    {
        if( init )
        {
            for( var prop in init )
            {
                if( prop in this )
                {
                    this[prop] = init[prop];
                }
            }
        }
        return this ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return {} ;
    }},

    /**
     * Returns the string representation of this object.
     * @return the string representation of this object.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});