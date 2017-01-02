"use strict" ;

import { Image as Img } from './Image.js' ;
import { Layer } from './Layer.js' ;

/**
 * An image layer definition.
 * @summary An image layer definition.
 * @name ImageLayer
 * @memberof graphics.tmx
 * @extends graphics.tmx.Layer
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function ImageLayer( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The image definition.
         * @name image
         * @memberof graphics.tmx.ImageLayer
         * @default null
         * @type graphics.tmx.Image
         * @instance
         */
        image : { enumerable : true , value : null , writable : true }
    });

    Layer.call( this , init ) ;
}

ImageLayer.prototype = Object.create( Layer.prototype ,
{
    constructor : { writable : true , value : ImageLayer } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Layer
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object = Layer.prototype.toObject.call(this) ;
        object.image = (this.image instanceof Img) ? this.image.toObject() : this.image ;
        return object ;
    }}
});