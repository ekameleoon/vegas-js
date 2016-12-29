"use strict" ;

/**
 * The {@link graphics.tmx.TileMapOrientation|TileMapOrientation} enumeration provides valid values for the <code>tmx.Map.orientation</code> property.
 * @summary The {@link graphics.tmx.TileMapOrientation|TileMapOrientation} enumeration provides valid values for the <code>tmx.Map.orientation</code> property.
 * @name TileMapOrientation
 * @namespace graphics.tmx.TileMapOrientation
 * @memberof graphics.tmx
 */
export var TileMapOrientation = Object.defineProperties( {} ,
{
    /**
     * The 'hexagonal' map orientation.
     * @memberof graphics.tmx.TileMapOrientation
     * @type string
     * @default hexagonal
     */
    HEXAGONAL : { enumerable : true , value : 'hexagonal' } ,

    /**
     * The 'isometric' map orientation.
     * @memberof graphics.tmx.TileMapOrientation
     * @type string
     * @default isometric
     */
    ISOMETRIC : { enumerable : true , value : 'isometric' } ,

    /**
     * The 'orthogonal' map orientation.
     * @memberof graphics.tmx.TileMapOrientation
     * @type string
     * @default orthogonal
     */
    ORTHOGONAL : { enumerable : true , value : 'orthogonal' } ,

    /**
     * The 'staggered' map orientation.
     * @memberof graphics.tmx.TileMapOrientation
     * @type string
     * @default staggered
     */
    STAGGERED : { enumerable : true , value : 'staggered' }
}) ;
