"use strict" ;

import '../polyfill/Object.js' ;

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
 * <p>The framework is based on a serie of interfaces. It includes implementations of these interfaces and algorithms to manipulate them.</p></br>
 * <p>An <strong>abstract data type</strong> (<b>ADT</b>) is a model for a certain class of data structures that have similar behavior; or for certain data types of one or more programming languages that have similar semantics. The collections framework is a unified architecture for representing and manipulating collections, allowing them to be manipulated independently of the details of their representation. It reduces programming effort while increasing performance.</p>
 * <p>Originaly the {@link system.data} collection framework is loosely inspired on the <b>JAVA Collections Framework</b> and the <b>Jakarta Collections Framework</b> but with the new ES6 standard we change the basic implementation of the new <b>VEGAS</b> framework in the JS version of the library.</p>
 * <p>This framework is inspired on interfaces to defines the different types of collections : * Map * Bag * Collections * Iterator * Set * Queue & Stack... </p>
 * @summary The {@link system.data} library provides a framework unified for representing and manipulating <b>collections</b>.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
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

    /**
     * This package contains all {@link system.data.Iterator|Iterator} implementations : {@link system.data.iterators.ArrayIterator|ArrayIterator}, {@link system.data.iterators.MapIterator|MapIterator}, etc.
     * @summary This package contains all {@link system.data.Iterator|Iterator} implementations : {@link system.data.iterators.ArrayIterator|ArrayIterator}, {@link system.data.iterators.MapIterator|MapIterator}, etc.
     * @namespace system.data.iterators
     * @memberof system.data
     */
    iterators :
    {
        ArrayIterator,
        MapIterator
    },

    /**
     * This package contains all {@link system.data.KeyValuePair|KeyValuePair} extended implementations : {@link system.data.maps.ArrayMap|ArrayMap}, etc.
     * @summary This package contains all {@link system.data.KeyValuePair|KeyValuePair} extended implementations : {@link system.data.maps.ArrayMap|ArrayMap}, etc.
     * @namespace system.data.maps
     * @memberof system.data
     */
    maps :
    {
        ArrayMap
    }
}) ;