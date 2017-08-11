"use strict" ;

import { AEntity } from './display/AEntity.js' ;
import { Assets }  from './display/Assets.js' ;
import { Scene }   from './display/Scene.js' ;
import { Sky }     from './display/Sky.js' ;

/**
 * The {@link molecule.render.aframe.display} package.
 * @summary The {@link molecule.render.aframe.display} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.aframe.display
 * @version 1.0.0
 * @since 1.0.0
 */
export var display = Object.assign
({
    AEntity : AEntity,
    Assets  : Assets,
    Scene   : Scene,
    Sky     : Sky
});