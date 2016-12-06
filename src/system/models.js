"use strict" ;

import '../polyfill/Object.js' ;

import { ChangeModel } from './models/ChangeModel.js' ;
import { MemoryModel } from './models/MemoryModel.js' ;
import { Model }       from './models/Model.js' ;

import { ArrayModel } from './models/arrays/ArrayModel.js' ;
import { MapModel }   from './models/maps/MapModel.js' ;

/**
 * The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @summary The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.models
 * @memberof system
 * @example
 * var beforeChanged = function( value , model )
 * {
 *     trace( "before:" + value + " current:" + model.current ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "change:" + value + " current:" + model.current ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "clear current:" + model.current ) ;
 * }
 *
 * var model = new ChangeModel() ;
 *
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * model.current = "hello" ;
 * model.current = "world" ;
 * model.current = null ;
 */
export var models = Object.assign
({
    // classes

    ChangeModel : ChangeModel,
    MemoryModel : MemoryModel,
    Model       : Model,

    // packages

    /**
     * @namespace system.models.arrays
     * @memberof system.models
     */
    arrays : Object.assign
    ({
        ArrayModel
    }),

    /**
     * @namespace system.models.maps
     * @memberof system.models
     */
    maps : Object.assign
    ({
        MapModel
    })
}) ;