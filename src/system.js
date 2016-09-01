"use strict" ;

import './polyfill.js' ;

import { Enum } from './system/Enum.js' ;

import { data }    from './system/data.js' ;
import { process } from './system/process.js' ;
import { signals } from './system/signals.js' ;

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var system = Object.assign
({
    Enum : Enum ,

    data    : data ,
    process : process ,
    signals : signals
}) ;