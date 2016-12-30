"use strict" ;

import { Base } from './Base.js' ;

/**
 * A tile animation frame entity.
 * @summary A basic terrain definition.
 * @name Frame
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Frame( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * How long (in milliseconds) this frame should be displayed before advancing to the next frame.
         * @name duration
         * @memberof graphics.tmx.Frame
         * @default 0
         * @instance
         * @type number
         */
        duration : { value : 0 , writable : true } ,

        /**
         * The local ID of a tile within the parent tileset.
         * @name tileid
         * @memberof graphics.tmx.Frame
         * @instance
         */
        tileid : { value : null , writable : true }
    });

    Base.call( this , init ) ;
}

Frame.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Frame } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Frame
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            duration : this.duration ,
            tileid   : this.tileid
        } ;
        return object ;
    }}
});