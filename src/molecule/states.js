"use strict" ;

import '../polyfill/Object.js' ;

import { State }      from './states/State.js' ;
import { StateModel } from './states/StateModel.js' ;

/**
 * The {@link molecule.states} library contains the core classes of the application state engine.
 * @summary The {@link molecule.render} library contains the core classes of the application state engine.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.states
 * @memberof molecule
 */
export var states = Object.assign
({
    State      : State,
    StateModel : StateModel
}) ;