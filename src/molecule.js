"use strict" ;

import './polyfill.js' ;

import { easings } from './molecule/easings.js' ;

/**
 * The VEGAS.js framework - The molecule library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var molecule = Object.assign
({
    easings : easings
}) ;