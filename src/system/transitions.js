"use strict" ;

import { Motion }     from './transitions/Motion.js' ;
import { Transition } from './transitions/Transition.js' ;
import { Tween }      from './transitions/Tween.js' ;
import { TweenUnit }  from './transitions/TweenUnit.js' ;

/**
 * The VEGAS.js framework - The system.transitions library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.transitions
 * @memberof system
 */
export var transitions = Object.assign
({
    Motion     : Motion,
    Transition : Transition,
    Tween      : Tween,
    TweenUnit  : TweenUnit
}) ;