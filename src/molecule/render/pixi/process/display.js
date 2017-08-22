"use strict" ;

import { AddChild } from './display/AddChild.js' ;
import { AddChildAt } from './display/AddChildAt.js' ;
import { IfContains } from './display/IfContains.js' ;
import { IfNotContains } from './display/IfNotContains.js' ;
import { RemoveChild } from './display/RemoveChild.js' ;
import { RemoveChildAt } from './display/RemoveChildAt.js' ;

/**
 * The {@link molecule.render.pixi.process.display} package.
 * @summary The {@link molecule.render.pixi.process.display} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi.process.display
 * @memberof molecule.render.pixi.process
 * @version 1.0.8
 * @since 1.0.8
 */
export var display = Object.assign
({
    AddChild : AddChild,
    AddChildAt : AddChildAt,
    IfContains : IfContains,
    IfNotContains : IfNotContains,
    RemoveChild : RemoveChild,
    RemoveChildAt : RemoveChildAt
});