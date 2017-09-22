"use strict" ;

import { AddChild } from './display/AddChild.js' ;
import { RemoveChild } from './display/RemoveChild.js' ;

/**
 * The {@link molecule.render.dom.process.display} package.
 * @summary The {@link molecule.render.dom.process.display} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.dom.process.display
 * @memberof molecule.render.dom.process
 * @version 1.0.8
 * @since 1.0.8
 */
export var display = Object.assign
({
    AddChild : AddChild,
    RemoveChild : RemoveChild
});