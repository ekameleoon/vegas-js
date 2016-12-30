"use strict" ;

import { ValueObject } from "../../system/data/ValueObject.js" ;

/**
 * A tmx base object definition.
 * @summary A tmx base object definition.
 * @name Base
 * @memberof graphics.tmx
 * @extends system.data.ValueObject
 * @implements system.data.Identifiable
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Base( init = null )
{
    ValueObject.call( this , init ) ;
}

Base.prototype = Object.create( ValueObject.prototype ,
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
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { id : this.id } ;
    }}
});