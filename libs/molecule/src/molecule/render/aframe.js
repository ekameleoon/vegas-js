"use strict" ;

import './polyfill/Object.js' ;

import { components } from './aframe/components.js' ;
import { display } from './aframe/display.js' ;

/**
 * The {@link molecule.render.aframe} library contains the rendering classes that the application uses to AFRAME library to display 3D/VR elements.
 * @summary The {@link molecule.render.aframe} library contains the rendering classes that the application uses to AFRAME library to display 3D/VR elements.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.aframe
 * @memberof molecule.render
 */
export var aframe = Object.assign
({
    // singleton
    components : components,

    // package
    display : display
}) ;