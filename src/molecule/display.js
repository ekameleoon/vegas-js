"use strict" ;

import '../polyfill/Object.js' ;

import { DisplayObject }          from './display/DisplayObject.js' ;
import { DisplayObjectContainer } from './display/DisplayObjectContainer.js' ;

/**
 * The {@link molecule.display} library contains the core classes that the application uses to build visual displays.
 * @summary The {@link molecule.display} library contains the core classes that the application uses to build visual displays.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.display
 * @memberof molecule
 */
export var display = Object.assign
({
    DisplayObject          : DisplayObject,
    DisplayObjectContainer : DisplayObjectContainer
}) ;