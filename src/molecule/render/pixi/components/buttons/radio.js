"use strict" ;

import './polyfill/Object.js' ;

import { RadioButtonGroup } from '../../../../groups/RadioButtonGroup.js' ;

/**
 * The RadioButtonGroup singleton.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @memberof molecule.render.pixi.components.buttons
 * @static
 * @private
 * @version 1.0.8
 * @since 1.0.8
 */
export var radio = new RadioButtonGroup() ;