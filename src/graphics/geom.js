"use strict" ;

import '../polyfill/Object.js' ;

import { Dimension } from './geom/Dimension.js' ;
import { Matrix }    from './geom/Matrix.js' ;
import { Point }     from './geom/Point.js' ;
import { Rectangle } from './geom/Rectangle.js' ;

/**
 * The VEGAS.js framework - The graphics.geom library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace
 */
export var geom = Object.assign
({
    Dimension : Dimension ,
    Matrix    : Matrix ,
    Point     : Point ,
    Rectangle : Rectangle
}) ;