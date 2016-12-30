"use strict" ;

import { Layer } from './Layer.js' ;

/**
 * A basic tile layer definition.
 * @summary A basic tile layer definition.
 * @name TileLayer
 * @memberof graphics.tmx
 * @extends graphics.tmx.Layer
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function TileLayer( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The tile layer data.
         * @name data
         * @memberof graphics.tmx.TileLayer
         * @instance
         */
        data : { value : null , writable : true }
    });
    Layer.call( this , init ) ;
}

TileLayer.prototype = Object.create( Layer.prototype ,
{
    constructor : { writable : true , value : TileLayer } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.TileLayer
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object = Layer.prototype.toObject.call( this ) ;
        object.data = this.data ;
        return object ;
    }}
});