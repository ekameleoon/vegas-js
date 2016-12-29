"use strict" ;

import { Base } from './Base.js' ;
import { TileMapOrientation } from './TileMapOrientation.js' ;
import { TileMapRenderOrder } from './TileMapRenderOrder.js' ;

/**
 * A flexible standard implementation to describe a tile based map.
 * <p>The <code>tilewidth</code> and <code>tileheight</code> properties determine the general grid size of the map. The individual tiles may have different sizes. Larger tiles will extend at the top and right (anchored to the bottom left).</p>
 * <p>A map contains three different kinds of layers. Tile layers were once the only type, and are simply called layer, object layers have the objectgroup tag and image layers use the imagelayer tag. The order in which these layers appear is the order in which the layers are rendered by Tiled.</p>
 * <p>Can contain: properties, tileset, layer, objectgroup, imagelayer</p>
 * </p>
 * @summary A flexible standard implementation to describe a tile based map.
 * @name TileMap
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function TileMap( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The background color of the map. (since 0.9, optional, may include alpha value since 0.15 in the form <code>#AARRGGBB</code>).
         * @name backgroundcolor
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type string
         */
        backgroundcolor : { value : null , writable : true } ,

        /**
         * The TMX height in tiles.
         * @name height
         * @memberof graphics.tmx.TileMap
         * @default 0
         * @instance
         * @type number
         */
        height : { value : 0 , writable : true } ,

        /**
         * Only for hexagonal maps. Determines the width or height (depending on the staggered axis) of the tile's edge, in pixels.
         * @name hexsidelength
         * @memberof graphics.tmx.TileMap
         * @default 0
         * @instance
         * @type number
         */
        hexsidelength : { value : 0 , writable : true } ,

        /**
         * An array of objects with layers data. Structure of each object can vary, basing on layer type.
         * @name layers
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type Array
         */
        layers : { value : null , writable : true } ,

        /**
         * Stores the next available ID for new objects. This number is stored to prevent reuse of the same ID after objects have been removed. (since 0.11)
         * @name nextobjectid
         * @memberof graphics.tmx.TileMap
         * @instance
         */
        nextobjectid : { value : null , writable : true } ,

        /**
         * An array of all user-defined properties of map.
         * @name properties
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type Array
         */
        properties : { value : null , writable : true } ,

        /**
         * For staggered and hexagonal maps, determines which axis (<code>"x"</code> or <code>"y"</code>) is staggered. (since 0.11)
         * @name staggeraxis
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type string
         */
        staggeraxis : { value : null , writable : true } ,

        /**
         * For staggered and hexagonal maps, determines whether the <code>"even"</code> or <code>"odd"</code> indexes along the staggered axis are shifted. (since 0.11)
         * @name staggerindex
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type string
         */
        staggerindex : { value : null , writable : true } ,

        /**
         * The TMX height of a tile.
         * @name tileheight
         * @memberof graphics.tmx.TileMap
         * @default 0
         * @instance
         * @type number
         */
        tileheight : { value : 0 , writable : true } ,

        /**
         * An array of objects with description of used tiles in the map.
         * @name tilesets
         * @memberof graphics.tmx.TileMap
         * @default null
         * @instance
         * @type Array
         */
        tilesets : { value : null , writable : true } ,

        /**
         * The TMX width of a tile.
         * @name tilewidth
         * @memberof graphics.tmx.TileMap
         * @default 0
         * @instance
         * @type number
         */
        tilewidth : { value : 0 , writable : true } ,

        /**
         * The TMX format version, generally 1.0.
         * @name version
         * @memberof graphics.tmx.TileMap
         * @default 1
         * @instance
         * @type number
         */
        version : { value : 1  , writable : true } ,

        /**
         * The TMX width in tiles.
         * @name width
         * @memberof graphics.tmx.TileMap
         * @default 0
         * @instance
         * @type number
         */
        width : { value : 0 , writable : true } ,

        /**
         * @private
         */
        _orientation : { value : TileMapOrientation.ORTHOGONAL , writable : true } ,

        /**
         * @private
         */
        _renderorder : { value : TileMapRenderOrder.RIGHT_DOWN , writable : true }
    });

    Base.call( this , init ) ;
}

TileMap.prototype = Object.create( Base.prototype ,
{
    /**
     * The <code>tmx.TileMap</code> orientation. Tiled supports <code>"orthogonal"</code>, <code>"isometric"</code>, <code>"staggered"</code> (since 0.9) and <code>"hexagonal"</code> (since 0.11).
     * @name orientation
     * @memberof graphics.tmx.TileMap
     * @instance
     * @type string
     * @see graphics.tmx.TileMapOrientation
     */
    orientation :
    {
        get : function() { return this._orientation ; } ,
        set : function( value )
        {
            this._orientation = value === TileMapOrientation.HEXAGONAL  ||
                                value === TileMapOrientation.ISOMETRIC  ||
                                value === TileMapOrientation.ORTHOGONAL ||
                                value === TileMapOrientation.STAGGERED  ?
                                value                               :
                                TileMapOrientation.ORTHOGONAL ;
        }
    },

    /**
     * The order in which tiles on tile layers are rendered. Valid values are <code>right-down</code> (the default), <code>right-up</code>, <code>left-down</code> and <code>left-up</code>. In all cases, the map is drawn row-by-row. (since 0.10, but only supported for orthogonal maps at the moment).
     * @name renderorder
     * @memberof graphics.tmx.TileMap
     * @instance
     * @type string
     * @default TileMapRenderOrder.RIGHT_DOWN
     * @see graphics.tmx.TileMapRenderOrder
     */
    renderorder :
    {
        get : function() { return this._renderorder ; } ,
        set : function( value )
        {
            this._renderorder = value === TileMapRenderOrder.LEFT_DOWN  ||
                                value === TileMapRenderOrder.LEFT_UP    ||
                                value === TileMapRenderOrder.RIGHT_DOWN ||
                                value === TileMapRenderOrder.RIGHT_UP   ?
                                value                               :
                                TileMapOrientation.RIGHT_DOWN ;
        }
    },

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.tmx.TileMap
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new TileMap( this.toObject() ) ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.TileMap
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            backgroundcolor : this.backgroundcolor ,
            height          : this.height ,
            hexsidelength   : this.hexsidelength ,
            nextobjectid    : this.nextobjectid ,
            staggeraxis     : this.staggeraxis ,
            staggerindex    : this.staggerindex ,
            tileheight      : this.tileheight ,
            tilewidth       : this.tilewidth ,
            orientation     : this._orientation ,
            renderorder     : this._renderorder ,
            version         : this.version ,
            width           : this.width
        } ;
        return object ;
    }}
});