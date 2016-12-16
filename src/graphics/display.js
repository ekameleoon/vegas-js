"use strict" ;

import '../polyfill/Object.js' ;

import { Stage }             from './display/Stage.js' ;
import { StageAspectRatio }  from './display/StageAspectRatio.js' ;
import { StageDisplayState } from './display/StageDisplayState.js' ;

/**
 * The {@link graphics.display} library is a set of classes and utilities for display Operations.
 * @summary The {@link graphics.display} library is a set of classes and utilities for Geometry Operations.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace graphics.display
 * @memberof graphics
 */
export var display = Object.assign
({
    Stage             : Stage,
    StageAspectRatio  : StageAspectRatio,
    StageDisplayState : StageDisplayState
}) ;