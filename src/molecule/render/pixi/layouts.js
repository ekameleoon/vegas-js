"use strict" ;

import { BoxLayout } from './layouts/BoxLayout.js' ;
import { LayoutContainer } from './layouts/LayoutContainer.js' ;

/**
 * The {@link molecule.render.pixi.layouts} package.
 * @summary The {@link molecule.render.pixi.layouts} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi.layouts
 * @memberof molecule.render.pixi
 * @version 1.0.8
 * @since 1.0.8
 */
export var layouts = Object.assign
({
    BoxLayout : BoxLayout,
    LayoutContainer : LayoutContainer
});