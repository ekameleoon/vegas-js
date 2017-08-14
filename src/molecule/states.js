"use strict" ;

import '../polyfill/Object.js' ;

import { State }      from './states/State.js' ;
import { StateModel } from './states/StateModel.js' ;
import { View }       from './states/View.js' ;

import { AddState } from './states/controllers/AddState.js' ;
import { BeforeChangeState } from './states/controllers/BeforeChangeState.js' ;
import { ChangeState } from './states/controllers/ChangeState.js' ;
import { ClearState } from './states/controllers/ClearState.js' ;
import { RemoveState } from './states/controllers/RemoveState.js' ;

import { CloseState } from './states/process/CloseState.js' ;
import { InitStates } from './states/process/InitStates.js' ;
import { OpenState }  from './states/process/OpenState.js' ;
import { StateTask }  from './states/process/StateTask.js' ;

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
    // classes and interfaces
    State      : State,
    StateModel : StateModel ,
    View       : View ,

    /**
     * This package contains a set of controllers in the molecule.states package.
     * @summary This package contains a set of controllers in the molecule.states package.
     * @namespace molecule.states.controllers
     * @memberof molecule.states
     */
    controllers :
    {
        AddState : AddState,
        BeforeChangeState : BeforeChangeState,
        ChangeState : ChangeState,
        ClearState : ClearState,
        RemoveState : RemoveState
    },

    /**
     * This package contains a set of tasks in the molecule.states package.
     * @summary This package contains a set of tasks in the molecule.states package.
     * @namespace molecule.states.process
     * @memberof molecule.states
     */
    process :
    {
        CloseState : CloseState,
        InitStates : InitStates,
        OpenState : OpenState,
        StateTask : StateTask
    }
}) ;