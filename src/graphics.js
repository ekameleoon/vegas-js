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
import { Orientation }        from './graphics/Orientation.js' ;
import { Position }           from './graphics/Position.js' ;
import { ZOrder }             from './graphics/ZOrder.js' ;

import { geom } from './graphics/geom.js' ;

/**
 * The VEGAS.js framework - The graphics library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var graphics = Object.assign
({
    isDirectionable : isDirectionable ,

    Align              : Align ,
    ArcType            : ArcType ,
    Border             : Border ,
    CardinalDirection  : CardinalDirection ,
    Corner             : Corner ,
    Direction          : Direction ,
    Directionable      : Directionable ,
    DirectionOrder     : DirectionOrder,
    Orientation        : Orientation,
    Position           : Position,
    ZOrder             : ZOrder,

    geom : geom
}) ;