"use strict" ;

import '../polyfill.js' ;

import { Dimension } from './geom/Dimension.js' ;

/**
 * The VEGAS.js framework - The graphics.geom library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var geom = Object.assign
({
    Dimension : Dimension
}) ;