"use strict" ;

import '../polyfill.js' ;

import { ChangeModel } from './models/ChangeModel.js' ;
import { MemoryModel } from './models/MemoryModel.js' ;
import { Model }       from './models/Model.js' ;

import { ArrayModel } from './models/arrays/ArrayModel.js' ;

/**
 * The VEGAS.js framework - The system.models library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var models = Object.assign
({
    ChangeModel : ChangeModel,
    MemoryModel : MemoryModel,
    Model       : Model,

    // packages

    arrays : Object.assign
    ({
        ArrayModel
    })
}) ;