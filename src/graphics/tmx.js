"use strict" ;

import '../polyfill/Object.js' ;

import { Base } from './tmx/Base.js' ;
import { Frame } from './tmx/Frame.js' ;
import { Image } from './tmx/Image.js' ;
import { Property } from './tmx/Property.js' ;
import { PropertyType } from './tmx/PropertyType.js' ;
import { Terrain } from './tmx/Terrain.js' ;
import { Tile } from './tmx/Tile.js' ;
import { TileMap } from './tmx/TileMap.js' ;
import { TileMapOrientation } from './tmx/TileMapOrientation.js' ;
import { TileMapRenderOrder } from './tmx/TileMapRenderOrder.js' ;
import { TileSet } from './tmx/TileSet.js' ;

/**
 * The {@link graphics.tmx} library is a set of classes and utilities for Tile Maps Operations. Based on the TMX (Tile Map XML) map format used by <b>Tiled</b> is a flexible way to describe a tile based map. It can describe maps with any tile size, any amount of layers, any number of tile sets and it allows custom properties to be set on most elements. Beside tile layers, it can also contain groups of objects that can be placed freely.
 * @summary The {@link graphics.tmx} library is a set of classes and utilities for GTile Maps Operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.tmx
 * @memberof graphics
 */
export var tmx = Object.assign
({
    Base : Base ,
    Frame : Frame ,
    Image : Image ,
    Property : Property ,
    PropertyType : PropertyType ,
    Terrain : Terrain ,
    Tile : Tile ,
    TileMap : TileMap ,
    TileMapOrientation : TileMapOrientation ,
    TileMapRenderOrder : TileMapRenderOrder ,
    TileSet : TileSet
}) ;