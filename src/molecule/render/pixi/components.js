"use strict" ;

import { CoreProgress } from './components/CoreProgress.js' ;
import { CoreScrollbar } from './components/CoreScrollbar.js' ;

import { bars } from './components/bars.js' ;
import { buttons } from './components/buttons.js' ;
import { panes } from './components/panes.js' ;

/**
 * The {@link molecule.render.pixi.components} package.
 * @summary The {@link molecule.render.pixi.components} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi.components
 * @memberof molecule.render.pixi
 * @version 1.0.8
 * @since 1.0.8
 */
export var components = Object.assign
({
    // classes
    CoreProgress : CoreProgress ,
    CoreScrollbar : CoreScrollbar ,

    // packages
    bars,
    buttons,
    panes
});