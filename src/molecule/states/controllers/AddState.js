"use strict" ;

import { Receiver } from './system/signals/Receiver.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This controller is invoked when a state is inserted in the state model.
 * @name AddState
 * @class
 * @memberof molecule.states.controllers
 * @constructor
 */
export function AddState() {}

AddState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : AddState } ,

    /**
     * Receive a message from a state model.
     * @name reveive
     * @memberof com.ooopener.states.controllers.AddState
     * @instance
     * @function
     */
    receive : { value : function ( state )
    {
        logger.debug( this + " receive : " + state ) ;
    }}
});