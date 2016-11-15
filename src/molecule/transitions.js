"use strict" ;

import { Motion }     from './transitions/Motion.js' ;
import { Transition } from './transitions/Transition.js' ;
import { TweenUnit }  from './transitions/TweenUnit.js' ;

/**
 * The VEGAS.js framework - The molecule.transitions library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var transitions = Object.assign
({
    Motion     : Motion,
    Transition : Transition,
    TweenUnit  : TweenUnit
}) ;