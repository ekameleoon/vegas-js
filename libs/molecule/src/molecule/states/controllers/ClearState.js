"use strict" ;

import { Receiver } from './system/signals/Receiver.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * Invoked when all the elements in the the state model are removed.
 * @name ClearState
 * @class
 * @memberof molecule.states.controllers
 * @constructor
 */
export function ClearState() {}

ClearState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ClearState } ,

    /**
     * Receive a message from a state model.
     * @name reveive
     * @memberof molecule.states.controllers.ClearState
     * @instance
     * @function
     */
    receive : { value : function ( state )
    {
        logger.debug( this + " receive : " + state ) ;
    }}
});