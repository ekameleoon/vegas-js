"use strict" ;

import { CoreButton } from './buttons/CoreButton.js' ;
import { SimpleButton } from './buttons/SimpleButton.js' ;

/**
 * The {@link molecule.render.pixi.components.buttons} package.
 * @summary The {@link molecule.render.pixi.components} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi.components.buttons
 * @memberof molecule.render.pixi.components
 * @version 1.0.8
 * @since 1.0.8
 */
export var buttons = Object.assign
({
    CoreButton : CoreButton,
    SimpleButton : SimpleButton
});