"use strict" ;

import { ScrollPane } from './panes/ScrollPane.js' ;
import { ScrollPaneBuilder } from './panes/ScrollPaneBuilder.js' ;
import { ScrollPaneManager } from './panes/ScrollPaneManager.js' ;
import { ScrollPaneStyle } from './panes/ScrollPaneStyle.js' ;

/**
 * The {@link molecule.render.pixi.components.panes} package.
 * @summary The {@link molecule.render.pixi.components} package.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/)|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.pixi.components.panes
 * @memberof molecule.render.pixi.components
 * @version 1.0.8
 * @since 1.0.8
 */
export var panes = Object.assign
({
    ScrollPane : ScrollPane ,
    ScrollPaneBuilder : ScrollPaneBuilder,
    ScrollPaneManager : ScrollPaneManager,
    ScrollPaneStyle : ScrollPaneStyle
});