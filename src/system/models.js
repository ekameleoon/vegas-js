"use strict" ;

import '../polyfill.js' ;

import { ChangeModel } from './models/ChangeModel.js' ;
import { Model }       from './models/Model.js' ;

/**
 * The VEGAS.js framework - The system.models library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var models = Object.assign
({
    ChangeModel : ChangeModel,
    Model       : Model
}) ;