"use strict" ;

import { Chain }      from './system/process/Chain.js' ;
import { CloseState } from '../process/CloseState.js' ;
import { Receiver }   from './system/signals/Receiver.js' ;
import { logger }     from '../../logging/logger.js' ;

/**
 * Invoked before the state model is full changed.
 * @name BeforeChangeState
 * @class
 * @memberof molecule.states.controllers
 * @constructor
 */
export function BeforeChangeState( chain = null , factory = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The state Chain reference of the state engine.
         * @name chain
         * @memberof com.ooopener.states.controllers.BeforeChangeState
         * @instance
         */
        chain : { writable : true , value : chain instanceof Chain ? chain : null } ,

        /**
         * The factory reference.
         * @name factory
         * @memberof com.ooopener.states.controllers.BeforeChangeState
         * @instance
         */
        factory : { writable : true , value : factory }
    });
}

BeforeChangeState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : BeforeChangeState } ,

    /**
     * Receive a message from a state model.
     * @name reveive
     * @memberof com.ooopener.states.controllers.BeforeChangeState
     * @instance
     * @function
     */
    receive : { value : function ( state , model )
    {
        logger.info( this + " receive " + state ) ;

        if ( this.chain && state )
        {
            this.chain.add( new CloseState( state , this.factory ) , 0 , true ) ;

            if( model && model.current === null && !this.chain.running )
            {
                this.chain.run() ;
            }
        }
        else
        {
            logger.warn( this + " failed with the state:" + state + " and the chain:" + this.chain ) ;
        }
    }}
});