"use strict" ;

import '../polyfill.js' ;

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
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
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