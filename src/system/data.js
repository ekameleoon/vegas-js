"use strict" ;

import '../polyfill.js' ;

import { Map } from './data/Map.js' ;

import { ArrayMap } from './data/maps/ArrayMap.js' ;

/**
 * The VEGAS.js framework - The system.data library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var data = Object.assign
({
    Map  : Map ,
    maps :
    {
        ArrayMap
    }
}) ;