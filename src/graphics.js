"use strict" ;

import './polyfill.js' ;

import { isDirectionable } from './graphics/Directionable.js' ;

import { Align }              from './graphics/Align.js' ;
import { ArcType }            from './graphics/ArcType.js' ;
import { Border }             from './graphics/Border.js' ;
import { CardinalDirection }  from './graphics/CardinalDirection.js' ;
import { Corner }             from './graphics/Corner.js' ;
import { Direction }          from './graphics/Direction.js' ;
import { Directionable }      from './graphics/Directionable.js' ;
import { DirectionOrder }     from './graphics/DirectionOrder.js' ;
import { Layout }             from './graphics/Layout.js' ;
import { LayoutBufferMode }   from './graphics/LayoutBufferMode.js' ;
import { Orientation }        from './graphics/Orientation.js' ;
import { Position }           from './graphics/Position.js' ;
import { ZOrder }             from './graphics/ZOrder.js' ;

import { geom } from './graphics/geom.js' ;

/**
 * The {@link graphics} package is an intuitive graphics API to manipulate all display objects in your applications. Offers a lot of powerful functionality to create and work with graphics, colors and geometrics objects, all neatly wrapped up in a well designed, consistent and clean programming interface.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics
 */
export var graphics = Object.assign
({
    // ----- Singletons

    isDirectionable : isDirectionable ,

    // ----- Classes and enumerations

    Align              : Align ,
    ArcType            : ArcType ,
    Border             : Border ,
    CardinalDirection  : CardinalDirection ,
    Corner             : Corner ,
    Direction          : Direction ,
    Directionable      : Directionable ,
    DirectionOrder     : DirectionOrder ,
    Layout             : Layout ,
    LayoutBufferMode   : LayoutBufferMode ,
    Orientation        : Orientation ,
    Position           : Position ,
    ZOrder             : ZOrder ,

    // ----- packages

    geom : geom
}) ;