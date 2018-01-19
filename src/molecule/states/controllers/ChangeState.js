"use strict" ;

import { Chain }     from '../../../system/process/Chain.js' ;
import { OpenState } from '../process/OpenState.js' ;
import { Receiver }  from '../../../system/signals/Receiver.js' ;
import { logger }    from '../../logging/logger.js' ;

/**
 * Invoked when the state model is changed.
 * @name ChangeState
 * @class
 * @memberof molecule.states.controllers
 * @constructor
 */
export function ChangeState( chain = null , factory = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The state Chain reference of the state engine.
         * @name chain
         * @memberof molecule.states.controllers.ChangeState
         * @instance
         */
        chain : { writable : true , value : (chain instanceof Chain) ? chain : null } ,

        /**
         * The factory reference.
         * @name factory
         * @memberof molecule.states.controllers.ChangeState
         * @instance
         */
        factory : { writable : true , value : factory }
    });
}

ChangeState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ChangeState } ,

    /**
     * Receive a message from a state model.
     * @name reveive
     * @memberof molecule.states.controllers.ChangeState
     * @instance
     * @function
     */
    receive : { value : function ( state )
    {
        logger.info( this + " receive " + state ) ;

        if ( this.chain && state )
        {
            this.chain.add( new OpenState( state , this.factory ) , 0 , true ) ;
            if( !this.chain.running )
            {
                this.chain.run() ;
            }
        }
        else
        {
            logger.warning( this + " failed with the state:" + state + " and the chain:" + this.chain ) ;
        }
    }}
});