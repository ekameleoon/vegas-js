"use strict" ;

import { Base } from './Base.js' ;
import { Point } from '../geom/Point.js' ;
import { Property } from './Property.js' ;

/**
 * A main layer definition.
 * @summary A main layer definition.
 * @name Layer
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Layer( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The height of the object, in tiles.
         * @name height
         * @memberof graphics.tmx.Layer
         * @default 0
         * @type number
         * @instance
         */
        height : { value : 0 , writable : true } ,

        /**
         * The name of the object. An arbitrary string.
         * @name name
         * @memberof graphics.tmx.Layer
         * @instance
         * @type string
         * @default null
         */
        name : { value : null , writable : true } ,

        /**
         * The rendering offset for this layer in pixels. Defaults to new Point(0,0).
         * @name offset
         * @memberof graphics.tmx.Layer
         * @instance
         * @type graphics.geom.Point
         * @const
         */
        offset : { value : new Point() } ,

        /**
         * The opacity of the layer as a value from 0 to 1. Defaults to 1.
         * @name opacity
         * @memberof graphics.tmx.Layer
         * @instance
         * @type number
         * @default 0
         */
        opacity : { value : 1 , writable : true } ,

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
         * Whether the layer is shown (<code>true</code>) or hidden (<code>false</code>). Defaults to <code>true</code>. (since 0.9)
         * @name visible
         * @memberof graphics.tmx.Layer
         * @default true
         * @type boolean
         * @instance
         */
        visible : { value : true , writable : true } ,

        /**
         * The width of the layer, in tiles.
         * @name width
         * @memberof graphics.tmx.Layer
         * @default 0
         * @type number
         * @instance
         */
        width : { value : 0 , writable : true } ,

        /**
         * The x coordinate of the layer in tiles. Defaults to 0 and can no longer be changed in Tiled Qt.
         * @name x
         * @memberof graphics.tmx.Layer
         * @instance
         * @type number
         * @default 0
         */
        x : { value : 0 , writable : true } ,

        /**
         * The y coordinate of the layer in tiles. Defaults to 0 and can no longer be changed in Tiled Qt.
         * @name y
         * @memberof graphics.tmx.Layer
         * @instance
         * @type number
         * @default 0
         */
        y : { value : 0 , writable : true }
    });

    Base.call( this , init ) ;
}

Layer.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Layer } ,

    /**
     * Rendering offset for this layer in pixels. Defaults to 0. (since 0.14)
     * @name offsetx
     * @memberof graphics.tmx.Layer
     * @instance
     * @type number
     * @default 0
     */
    offsetx :
    {
        get : function() { return this.offset.x ; } ,
        set : function( value )
        {
            this.offset.x = (typeof(value) === 'number') || (value instanceof Number ) ? value : 0 ;
        }
    },

    /**
     * Rendering offset for this layer in pixels. Defaults to 0. (since 0.14)
     * @name offsety
     * @memberof graphics.tmx.Layer
     * @instance
     * @type number
     * @default 0
     */
    offsety :
    {
        get : function() { return this.offset.y ; } ,
        set : function( value )
        {
            this.offset.y = (typeof(value) === 'number') || (value instanceof Number ) ? value : 0 ;
        }
    },

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Layer
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            height     : this.height ,
            name       : this.name ,
            offsetx    : this.offset.x ,
            offsety    : this.offset.y ,
            opacity    : this.opacity ,
            properties : this.properties ,
            visible    : this.visible === true ,
            width      : this.width ,
            x          : this.x ,
            y          : this.y
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