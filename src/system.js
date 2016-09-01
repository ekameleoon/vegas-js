"use strict" ;

import './polyfill.js' ;

import { signals } from './system/signals.js' ;

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var system = Object.assign
({
    signals : signals
}) ;