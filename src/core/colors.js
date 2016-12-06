"use strict" ;

import '../polyfill/Object.js' ;

import { fade }  from './colors/fade.js' ;
import { toHex } from './colors/toHex.js' ;

/**
 * The {@link core.colors} package is a modular <b>JavaScript</b> library that provides extra <b>rgb color</b> methods.
 * @summary The {@link core.colors} package is a modular <b>JavaScript</b> library that provides extra <b>rgb color</b> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.colors
 * @memberof core
 */
export var colors = Object.assign
({
    fade : fade ,
    toHex : toHex
}) ;