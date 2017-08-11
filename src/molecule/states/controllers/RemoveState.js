"use strict" ;

import { Receiver } from './system/signals/Receiver.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This controller is invoked when a state is removed from the state model.
 * @name RemoveState
 * @class
 * @memberof molecule.states.controllers
 * @constructor
 */
export function RemoveState() {}

RemoveState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : RemoveState } ,

    /**
     * Receive a message from a state model.
     * @name reveive
     * @memberof com.ooopener.states.controllers.RemoveState
     * @instance
     * @function
     */
    receive : { value : function ( state )
    {
        logger.debug( this + " receive : " + state ) ;
    }}
});