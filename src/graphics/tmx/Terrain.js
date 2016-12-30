"use strict" ;

import { Base } from './Base.js' ;

/**
 * A basic terrain definition.
 * @summary A basic terrain definition.
 * @name Terrain
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Terrain( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The name of the terrain type.
         * @name name
         * @memberof graphics.tmx.Terrain
         * @default null
         * @instance
         * @type string
         */
        name : { value : null , writable : true } ,

        /**
         * An array of all user-defined properties of the terrain.
         * @name properties
         * @memberof graphics.tmx.Terrain
         * @default null
         * @instance
         * @type Array
         */
        properties : { value : null , writable : true } ,

        /**
         * The local tile-id of the tile that represents the terrain visually.
         * @name tile
         * @memberof graphics.tmx.Terrain
         * @instance
         */
        tile : { value : 0 , writable : true }
    });

    Base.call( this , init ) ;
}

Terrain.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Terrain } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Terrain
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            name : this.name ,
            properties : this.properties ,
            tile : this.tile
        } ;
        return object ;
    }}
});