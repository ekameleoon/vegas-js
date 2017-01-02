"use strict" ;

import { Base } from './Base.js' ;
import { Image } from './Image.js' ;

/**
 * A basic tile definition.
 * @summary A basic tile definition.
 * @name Tile
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Tile( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Contains a list of animation frames.
         * @name animations
         * @memberof graphics.tmx.Tile
         * @default null
         * @instance
         * @type Array
         */
        animations : { value : null , writable : true } ,

        /**
         * The local tile-id of the tile that represents the terrain visually.
         * @name id
         * @memberof graphics.tmx.Tile
         * @instance
         */
        id : { enumerable : true , value : null , writable : true } ,

        /**
         * An tmx image information object.
         * @name image
         * @memberof graphics.tmx.Tile
         * @instance
         */
        image : { value : null , writable : true } ,

        /**
         * Contains a list of object group.
         * @name objectgroups
         * @memberof graphics.tmx.Tile
         * @default null
         * @instance
         * @type Array
         */
        objectgroups : { value : null , writable : true } ,

        /**
         * A percentage indicating the probability that this tile is chosen when it competes with others while editing with the terrain tool. (optional) (since 0.9)
         * @name probability
         * @memberof graphics.tmx.Tile
         * @instance
         */
        probability : { value : null , writable : true } ,

        /**
         * An array of all user-defined properties of the tile.
         * @name properties
         * @memberof graphics.tmx.Tile
         * @default null
         * @instance
         * @type Array
         */
        properties : { value : null , writable : true } ,

        /**
         * Defines the terrain type of each corner of the tile, given as comma-separated indexes in the terrain types array in the order top-left, top-right, bottom-left, bottom-right. Leaving out a value means that corner has no terrain. (optional) (since 0.9)
         * @name terrain
         * @memberof graphics.tmx.Tile
         * @default null
         * @instance
         * @type string
         */
        terrain : { value : null , writable : true }
    });

    Base.call( this , init ) ;
}

Tile.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Tile } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Tile
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            animations   : this.animations ,
            id           : this.id ,
            image        : this.image ,
            objectgroups : this.objectgroups ,
            probability  : this.probability ,
            properties   : this.properties ,
            terrain      : this.terrain
        } ;

        if( (object.animations instanceof Array) && (object.animations.length > 0) )
        {
            object.animations = object.animations.map( ( element ) =>
            {
                return element instanceof Base ? element.toObject() : element ;
            });
        }

        if( object.image instanceof Image )
        {
            object.image = object.image.toObject();
        }

        if( (object.objectgroups instanceof Array) && (object.objectgroups.length > 0) )
        {
            object.objectgroups = object.objectgroups.map( ( element ) =>
            {
                return element instanceof Base ? element.toObject() : element ;
            });
        }

        return object ;
    }}
});