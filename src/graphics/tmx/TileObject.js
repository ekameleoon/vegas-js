"use strict" ;

import { Base } from './Base.js' ;
import { Polygon } from '../geom/Polygon.js' ;

/**
 * A basic tile object definition.
 * <p>While tile layers are very suitable for anything repetitive aligned to the tile grid, sometimes you want to annotate your map with other information, not necessarily aligned to the grid. Hence the objects have their coordinates and size in pixels, but you can still easily align that to the grid when you want to.</p>
 * <p>You generally use objects to add custom information to your tile map, such as spawn points, warps, exits, etc.</p>
 * <p>When the object has a gid set, then it is represented by the image of the tile with that global ID. The image alignment currently depends on the map orientation. In orthogonal orientation it's aligned to the bottom-left while in isometric it's aligned to the bottom-center.</p>
 * @summary A basic tile object definition.
 * @name TileObject
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function TileObject( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Used to mark an object as an ellipse. The existing <code>x</code>, <code>y</code>, <code>width</code> and <code>height</code> attributes are used to determine the size of the ellipse.
         * @name ellipse
         * @memberof graphics.tmx.TileObject
         * @default false
         * @type boolean
         * @instance
         */
        ellipse : { value : false , writable : true } ,

        /**
         * A reference to a tile (optional).
         * @name gid
         * @memberof graphics.tmx.TileObject
         * @instance
         */
        gid : { value : null , writable : true } ,

        /**
         * The height of the object, in pixels.
         * @name height
         * @memberof graphics.tmx.TileObject
         * @default 0
         * @type number
         * @instance
         */
        height : { value : 0 , writable : true } ,

        /**
         * Unique ID of the object. Each object that is placed on a map gets a unique id. Even if an object was deleted, no object gets the same ID. Can not be changed in Tiled Qt. (since Tiled 0.11)
         * @name id
         * @memberof graphics.tmx.TileObject
         * @instance
         */
        id : { value : null , writable : true } ,

        /**
         * The name of the object. An arbitrary string.
         * @name name
         * @memberof graphics.tmx.TileObject
         * @instance
         * @type string
         * @default null
         */
        name : { value : null , writable : true },

        /**
         * Each polygon object is made up of a space-delimited list of x,y coordinates. The origin for these coordinates is the location of the parent object. By default, the first point is created as 0,0 denoting that the point will originate exactly where the object is placed. This object contains a list of x,y coordinates in pixels.
         * @name polygon
         * @memberof graphics.tmx.TileObject
         * @default null
         * @type graphics.geom.Polygon
         * @instance
         */
        polygon : { value : null , writable : true } ,

        /**
         * A polyline follows the same placement definition as a polygon object. This object contains a list of x,y coordinates in pixels.
         * @name polyline
         * @memberof graphics.tmx.TileObject
         * @default null
         * @type graphics.geom.Polygon
         * @instance
         */
        polyline : { value : null , writable : true } ,

        /**
         * The rotation of the object in degrees clockwise (default to 0). (since 0.10)
         * @name rotation
         * @memberof graphics.tmx.TileObject
         * @instance
         * @type number
         * @default 0
         */
        rotation : { value : 0 , writable : true } ,

        /**
         * The type of the object. An arbitrary string.
         * @name type
         * @memberof graphics.tmx.TileObject
         * @instance
         * @type string
         * @default null
         */
        type : { value : null , writable : true } ,

        /**
         * Whether the object is shown (<code>true</code>) or hidden (<code>false</code>). Defaults to <code>true</code>. (since 0.9)
         * @name visible
         * @memberof graphics.tmx.TileObject
         * @default true
         * @type boolean
         * @instance
         */
        visible : { value : true , writable : true } ,

        /**
         * The width of the object, in pixels.
         * @name width
         * @memberof graphics.tmx.TileObject
         * @default 0
         * @type number
         * @instance
         */
        width : { value : 0 , writable : true } ,

        /**
         * The x coordinate of the object in pixels.
         * @name x
         * @memberof graphics.tmx.TileObject
         * @instance
         * @type number
         * @default 0
         */
        x : { value : 0 , writable : true } ,

        /**
         * The y coordinate of the object in pixels.
         * @name y
         * @memberof graphics.tmx.TileObject
         * @instance
         * @type number
         * @default 0
         */
        y : { value : 0 , writable : true }
    });

    if( init )
    {
        this.setTo( init ) ;
    }
}

TileObject.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : TileObject } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.TileObject
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            ellipse  : this.ellipse,
            gid      : this.gid,
            height   : this.height,
            id       : this.id,
            name     : this.name,
            polygon  : (this.polygon  instanceof Polygon) ? this.polygon.toObject()  : this.polygon ,
            polyline : (this.polyline instanceof Polygon) ? this.polyline.toObject() : this.polyline ,
            rotation : this.rotation,
            type     : this.type,
            visible  : this.visible === true,
            width    : this.width,
            x        : this.x,
            y        : this.y
        } ;
        return object ;
    }}
});