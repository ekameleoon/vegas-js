"use strict" ;

import '../polyfill.js' ;

import { Iterator } from './data/Iterator.js' ;
import { Map }      from './data/Map.js' ;

import { ArrayIterator } from './data/iterators/ArrayIterator.js' ;
import { MapIterator }   from './data/iterators/MapIterator.js' ;

import { ArrayMap } from './data/maps/ArrayMap.js' ;

/**
 * The VEGAS.js framework - The system.data library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var data = Object.assign
({
    // interfaces
    Iterator : Iterator ,
    Map      : Map ,

    // packages
    iterators :
    {
        ArrayIterator,
        MapIterator
    },
    maps :
    {
        ArrayMap
    }
}) ;