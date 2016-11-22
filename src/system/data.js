"use strict" ;

import '../polyfill.js' ;

import { isIdentifiable }    from './data/Identifiable.js' ;
import { isIterator }        from './data/Iterator.js' ;
import { isOrderedIterator } from './data/OrderedIterator.js' ;
import { isValidator }       from './data/Validator.js' ;

import { Identifiable }    from './data/Identifiable.js' ;
import { Iterator }        from './data/Iterator.js' ;
import { KeyValuePair }    from './data/KeyValuePair.js' ;
import { OrderedIterator } from './data/OrderedIterator.js' ;
import { Validator }       from './data/Validator.js' ;

import { ArrayIterator } from './data/iterators/ArrayIterator.js' ;
import { MapIterator }   from './data/iterators/MapIterator.js' ;

import { ArrayMap } from './data/maps/ArrayMap.js' ;

/**
 * The VEGAS.js framework - The system.data library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.data
 * @memberof system
 */
export var data = Object.assign
({
    // singletons
    isIdentifiable    : isIdentifiable,
    isIterator        : isIterator,
    isOrderedIterator : isOrderedIterator,
    isValidator       : isValidator,

    // interfaces
    Identifiable    : Identifiable ,
    Iterator        : Iterator ,
    KeyValuePair    : KeyValuePair ,
    OrderedIterator : OrderedIterator ,
    Validator       : Validator ,

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