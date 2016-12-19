"use strict" ;

import '../polyfill/Object.js' ;

import { RGB } from './colors/RGB.js' ;

/**
 * The {@link graphics.colors} library is a set of classes and utilities for color operations.
 * @summary The {@link graphics.colors} library is a set of classes and utilities for colors operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.colors
 * @memberof graphics
 */
export var colors = Object.assign
({
    RGB : RGB
}) ;