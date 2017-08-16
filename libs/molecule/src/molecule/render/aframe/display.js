"use strict" ;

import { AEntity }     from './display/AEntity.js' ;
import { Assets }      from './display/Assets.js' ;
import { Box }         from './display/Box.js' ;
import { Button }      from './display/Button.js' ;
import { Circle }      from './display/Circle.js' ;
import { Cursor }      from './display/Cursor.js' ;
import { Cylinder }    from './display/Cylinder.js' ;
import { Image }       from './display/Image.js' ;
import { Material }    from './display/Material.js' ;
import { Plane }       from './display/Plane.js' ;
import { Ring }        from './display/Ring.js' ;
import { Scene }       from './display/Scene.js' ;
import { Sky }         from './display/Sky.js' ;
import { Sound }       from './display/Sound.js' ;
import { Sphere }      from './display/Sphere.js' ;
import { Text }        from './display/Text.js' ;
import { Videosphere } from './display/Videosphere.js' ;

/**
 * The {@link molecule.render.aframe.display} package.
 * @summary The {@link molecule.render.aframe.display} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.aframe.display
 * @version 1.0.8
 * @since 1.0.8
 */
export var display = Object.assign
({
    AEntity  : AEntity,
    Assets   : Assets,
    Box      : Box,
    Button   : Button,
    Circle   : Circle,
    Cursor   : Cursor,
    Cylinder : Cylinder,
    Image    : Image,
    Material : Material,
    Plane    : Plane,
    Ring     : Ring,
    Scene    : Scene,
    Sky      : Sky,
    Sound    : Sound,
    Sphere   : Sphere,
    Text     : Text,
    Videosphere : Videosphere
});