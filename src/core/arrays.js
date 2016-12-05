"use strict" ;

import '../polyfill/Object.js' ;

import { contains }   from './arrays/contains.js' ;
import { initialize } from './arrays/initialize.js' ;
import { pierce }     from './arrays/pierce.js' ;
import { repeat }     from './arrays/repeat.js' ;
import { rotate }     from './arrays/rotate.js' ;
import { shuffle }    from './arrays/shuffle.js' ;
import { sortOn }     from './arrays/sortOn.js' ;
import { spliceInto } from './arrays/spliceInto.js' ;
import { swap }       from './arrays/swap.js' ;

/**
 * The {@link core.arrays} package is a modular <b>JavaScript</b> library that provides extra <code>Array</code> methods.
 * @summary The {@link core.arrays} package is a modular <b>JavaScript</b> library that provides extra <code>Array</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.arrays
 * @memberof core
 */
export var arrays = Object.assign
({
    contains : contains ,
    initialize : initialize ,
    pierce : pierce ,
    repeat : repeat ,
    rotate : rotate ,
    shuffle : shuffle ,
    sortOn : sortOn ,
    spliceInto : spliceInto,
    swap : swap
}) ;