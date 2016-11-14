"use strict" ;

import './polyfill.js' ;
import './molecule/polyfill/index.js' ;

import { cancelAnimationFrame }  from './molecule/cancelAnimationFrame.js' ;
import { requestAnimationFrame } from './molecule/requestAnimationFrame.js' ;

import { easings }     from './molecule/easings.js' ;
import { transitions } from './molecule/transitions.js' ;

/**
 * The VEGAS.js framework - The molecule library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var molecule = Object.assign
({
    cancelAnimationFrame  : cancelAnimationFrame ,
    requestAnimationFrame : requestAnimationFrame ,

    easings     : easings,
    transitions : transitions
}) ;