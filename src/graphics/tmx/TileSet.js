"use strict" ;

import { Base } from './Base.js' ;
import { Property } from './Property.js' ;

/**
 * A flexible standard implementation to describe a tile based map.
 * <p>The <code>tilewidth</code> and <code>tileheight</code> properties determine the general grid size of the map. The individual tiles may have different sizes. Larger tiles will extend at the top and right (anchored to the bottom left).</p>
 * <p>A map contains three different kinds of layers. Tile layers were once the only type, and are simply called layer, object layers have the objectgroup tag and image layers use the imagelayer tag. The order in which these layers appear is the order in which the layers are rendered by Tiled.</p>
 * <p>Can contain: properties, tileset, layer, objectgroup, imagelayer</p>
 * </p>
 * @summary A flexible standard implementation to describe a tile based map.
 * @name TileSet
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function TileSet( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The number of tile columns in the tileset. For image collection tilesets it is editable and is used when displaying the tileset. (since 0.15)
         * @name columns
         * @memberof graphics.tmx.TileSet
         * @default 0
         * @instance
         * @type number
         */
        columns : { value : 0 , writable : true } ,

        /**
         * The first global tile ID of this tileset (this global ID maps to the first tile in this tileset).
         * @name firstgid
         * @memberof graphics.tmx.TileSet
         * @instance
         */
        firstgid : { value : null , writable : true } ,

        /**
         * An tmx image information object.
         * @name image
         * @memberof graphics.tmx.TileSet
         * @instance
         */
        image : { value : null , writable : true } ,

        /**
         * The margin around the tiles in this tileset (applies to the tileset image).
         * @name margin
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type number
         * @default 0
         */
        margin : { value : 0 , writable : true } ,

        /**
         * The name of this tileset.
         * @name name
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type string
         */
        name : { value : null , writable : true } ,

        /**
         * An array of all user-defined properties of map.
         * @name properties
         * @memberof graphics.tmx.TileSet
         * @default null
         * @instance
         * @type Array
         */
        properties : { value : null , writable : true } ,

        /**
         * If this tileset is stored in an external TSX (Tile Set XML) file, this attribute refers to that file. That TSX file has the same structure as the <tileset> element described here. (There is the firstgid attribute missing and this source attribute is also not there. These two attributes are kept in the TMX map, since they are map specific.)
         * @name source
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type string
         */
        source : { value : null , writable : true } ,

        /**
         * The spacing in pixels between the tiles in this tileset (applies to the tileset image).
         * @name spacing
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type number
         * @default 0
         */
        spacing : { value : 0 , writable : true } ,

        /**
         * This element defines an array of terrain types, which can be referenced from the terrain attribute of the tile element.
         * @name terraintypes
         * @memberof graphics.tmx.TileSet
         * @default null
         * @instance
         * @type Array
         * @see graphics.tmx.Terrain
         */
        terraintypes : { value : null , writable : true } ,

        /**
         * The number of tiles in this tileset (since 0.13).
         * @name tilecount
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type number
         * @default 0
         */
        tilecount : { value : 0 , writable : true } ,

        /**
         * The (maximum) height of the tiles in this tileset.
         * @name tileheight
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type number
         * @default 0
         */
        tileheight : { value : 0 , writable : true } ,

        /**
         * This element is used to specify an offset in pixels, to be applied when drawing a tile from the related tileset. When not present, no offset is applied.
         * @name tileoffset
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type Object
         * @default null
         */
        tileoffset : { value : null , writable : true } ,

        /**
         * This element defines an array of tiles definitions.
         * @name tiles
         * @memberof graphics.tmx.TileSet
         * @default null
         * @instance
         * @type Array
         */
        tiles : { value : null , writable : true } ,

        /**
         * The (maximum) width of the tiles in this tileset.
         * @name tilewidth
         * @memberof graphics.tmx.TileSet
         * @instance
         * @type number
         * @default 0
         */
        tilewidth : { value : 0 , writable : true }
    });

    Base.call( this , init ) ;
}

TileSet.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : TileSet } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.TileSet
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            columns      : this.columns ,
            firstgid     : this.firstgid ,
            image        : this.image ,
            margin       : this.margin ,
            name         : this.name ,
            source       : this.source ,
            spacing      : this.spacing ,
            terraintypes : this.terraintypes ,
            tilecount    : this.tilecount ,
            tileheight   : this.tileheight ,
            tileoffset   : this.tileoffset ,
            tilewidth    : this.tilewidth ,
        } ;

        if( (object.properties instanceof Array) && (object.properties.length > 0) )
        {
            object.properties = object.properties.map( ( element ) =>
            {
                return element instanceof Property ? element.toObject() : element ;
            });
        }

        return object ;
    }}
});