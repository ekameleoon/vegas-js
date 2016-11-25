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
import { Property  }       from './data/Property.js' ;
import { Validator }       from './data/Validator.js' ;

import { Attribute } from './data/Attribute.js' ;
import { Method    } from './data/Method.js' ;

import { ArrayIterator } from './data/iterators/ArrayIterator.js' ;
import { MapIterator }   from './data/iterators/MapIterator.js' ;

import { ArrayMap } from './data/maps/ArrayMap.js' ;

/**
 * The {@link system.data} library provides a framework unified for representing and manipulating <b>collections</b>, enabling them to be manipulated independently of the details of their representation.
 * <p>It reduces programming effort while increasing performance. It enables interoperability among unrelated APIs, reduces effort in designing and learning new APIs, and fosters software reuse.</p>
 * <p>The framework is based on a serie of interfaces. It includes implementations of these interfaces and algorithms to manipulate them.</p>
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
    Property        : Property ,
    Validator       : Validator ,

    // classes
    Attribute : Attribute ,
    Method    : Method ,

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