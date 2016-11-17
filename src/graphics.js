"use strict" ;

import './polyfill.js' ;

import { Align } from './graphics/Align.js' ;

/**
 * The VEGAS.js framework - The graphics library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var graphics = Object.assign
({
    // main

    Align : Align
}) ;