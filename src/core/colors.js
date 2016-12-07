"use strict" ;

import '../polyfill/Object.js' ;

import { distance } from './colors/distance.js' ;
import { equals }   from './colors/equals.js' ;
import { fade }     from './colors/fade.js' ;
import { fromARGB } from './colors/fromARGB.js' ;
import { getAlpha } from './colors/getAlpha.js' ;
import { getBlue }  from './colors/getBlue.js' ;
import { getGreen } from './colors/getGreen.js' ;
import { getRed }   from './colors/getRed.js' ;
import { isUnique } from './colors/isUnique.js' ;
import { toHex }    from './colors/toHex.js' ;
import { uniques }  from './colors/uniques.js' ;

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
    distance : distance ,
    equals   : equals ,
    fade     : fade ,
    fromARGB : fromARGB ,
    getAlpha : getAlpha ,
    getBlue  : getBlue ,
    getGreen : getGreen ,
    getRed   : getRed ,
    isUnique : isUnique ,
    toHex    : toHex ,
    uniques  : uniques
}) ;