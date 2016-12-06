"use strict" ;

import '../polyfill/Object.js' ;

import { ColorTransform } from './geom/ColorTransform.js' ;
import { Dimension }      from './geom/Dimension.js' ;
import { Matrix }         from './geom/Matrix.js' ;
import { Point }          from './geom/Point.js' ;
import { Rectangle }      from './geom/Rectangle.js' ;
import { Vector2D }       from './geom/Vector2D.js' ;
import { Vector3D }       from './geom/Vector3D.js' ;

/**
 * The {@link graphics.geom} library is a set of classes and utilities for Geometry Operations.
 * @summary The {@link graphics.geom} library is a set of classes and utilities for Geometry Operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.geom
 * @memberof graphics
 */
export var geom = Object.assign
({
    ColorTransform : ColorTransform ,
    Dimension : Dimension ,
    Matrix    : Matrix ,
    Point     : Point ,
    Rectangle : Rectangle ,
    Vector2D  : Vector2D ,
    Vector3D  : Vector3D
}) ;