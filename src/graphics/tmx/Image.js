"use strict" ;

import { Base } from './Base.js' ;

/**
 * A tmx image definition.
 * @summary A tmx image definition.
 * @name Image
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Image( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The data image informations.
         * @name data
         * @memberof graphics.tmx.Image
         * @instance
         */
        data : { value : null , writable : true }  ,

        /**
         * Used for embedded images, in combination with a data child element. Valid values are file extensions like png, gif, jpg, bmp, etc. (since 0.9)
         * @name format
         * @memberof graphics.tmx.Image
         * @instance
         * @type string
         */
        format : { value : null , writable : true } ,

        /**
         * The image height in pixels (optional).
         * @name height
         * @memberof graphics.tmx.Image
         * @instance
         * @type number
         */
        height : { value : 0 , writable : true } ,

        /**
         * Used by some versions of Tiled Java. Deprecated and unsupported by Tiled Qt.
         * @name id
         * @memberof graphics.tmx.Image
         * @instance
         * @deprecated
         */
        id : { value : null , writable : true } ,

        /**
         * The reference to the tileset image file (Tiled supports most common image formats).
         * @name source
         * @memberof graphics.tmx.Image
         * @instance
         * @type string
         */
        source : { value : null , writable : true } ,

        /**
         * Defines a specific color that is treated as transparent (example value: "#FF00FF" for magenta). Up until Tiled 0.12, this value is written out without a # but this is planned to change.
         * @name trans
         * @memberof graphics.tmx.Image
         * @instance
         * @type string
         */
        trans : { value : null , writable : true } ,

        /**
         * The image width in pixels (optional, used for tile index correction when the image changes)
         * @name width
         * @memberof graphics.tmx.Image
         * @instance
         * @type  number
         */
        width : { value : 0 , writable : true }
    });

    Base.call( this , init ) ;
}

Image.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Image } ,

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.tmx.Image
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Image( this.toObject() ) ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Image
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            id          : this.id ,
            probability : this.probability ,
            properties  : this.properties
        } ;
        return object ;
    }}
});