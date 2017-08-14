"use strict" ;

import '../polyfill/Object.js' ;

import { dom } from './render/dom.js' ;

/**
 * The {@link molecule.render} library contains the rendering classes that the application uses to build visual displays with a specific graphic 2D or 3D engine.
 * @summary The {@link molecule.render} library contains the rendering classes that the application uses to build visual displays with a specific graphic 2D or 3D engine.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render
 * @memberof molecule
 */
export var render = Object.assign
({
    // packages

    dom : dom
}) ;