"use strict" ;

import '../polyfill.js' ;

import { backIn }      from './easings/backIn.js' ;
import { backInOut }   from './easings/backInOut.js' ;
import { backOut }     from './easings/backOut.js' ;
import { bounceIn }    from './easings/bounceIn.js' ;
import { bounceInOut } from './easings/bounceInOut.js' ;
import { bounceOut }   from './easings/bounceOut.js' ;
import { linear }      from './easings/linear.js' ;

/**
 * The VEGAS.js framework - The graphics.easings library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var easings = Object.assign
({
    backIn      : backIn ,
    backInOut   : backInOut ,
    backOut     : backOut ,
    bounceIn    : bounceIn ,
    bounceInOut : bounceInOut ,
    bounceOut   : bounceOut ,
    linear      : linear
}) ;