"use strict" ;

import '../polyfill.js' ;

import { ChangeModel } from './models/ChangeModel.js' ;
import { MemoryModel } from './models/MemoryModel.js' ;
import { Model }       from './models/Model.js' ;

import { ArrayModel } from './models/arrays/ArrayModel.js' ;
import { MapModel }   from './models/maps/MapModel.js' ;

/**
 * The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @summary The {@link system.models} library provides a simple <b>MVC</b> implementation with a collection of <code>Model</code> classes to manage your applications.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.models
 * @memberof system
 */
export var models = Object.assign
({
    // classes

    ChangeModel : ChangeModel,
    MemoryModel : MemoryModel,
    Model       : Model,

    // packages

    arrays : Object.assign
    ({
        ArrayModel
    }),

    maps : Object.assign
    ({
        MapModel
    })
}) ;