"use strict" ;

import '../../polyfill/Object.js' ;

import { components } from './pixi/components.js' ;
import { display } from './pixi/display.js' ;
import { layouts } from './pixi/layouts.js' ;
import { process } from './pixi/process.js' ;
import { rules } from './pixi/rules.js' ;

/**
 * The {@link molecule.render.pixi} library contains the rendering classes that the application uses the PIXI JS library to display 3D/VR elements.
 * @summary The {@link molecule.render.pixi} library contains the rendering classes that the application uses the PIXI JS library to display 3D/VR elements.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi
 * @memberof molecule.render
 */
export var pixi = Object.assign
({
    components : components,
    display    : display,
    layouts    : layouts,
    process    : process,
    rules      : rules
}) ;