"use strict" ;

import { logger } from '../../logging/logger.js' ;

import { ObjectFactory } from './system/ioc/ObjectFactory.js' ;
import { Call }          from './system/process/Call.js' ;
import { Chain }         from './system/process/Chain.js' ;
import { TaskGroup }     from './system/process/TaskGroup.js' ;

import { State }     from '../State.js' ;
import { StateTask } from './StateTask.js' ;
import { View }      from '../View.js' ;

/**
 * Open a specific state.
 * @summary Open a specific state.
 * @name OpenState
 * @class
 * @memberof molecule.states.process
 * @implements molecule.states.process.StateTask
 * @constructs
 */
export function OpenState( state = null , factory = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _chain : { value : new Chain() }
    });

    StateTask.call( this , state , factory ) ;
    this._chain.mode = TaskGroup.TRANSIENT ;
    this._chain.finishIt.connect( this.notifyFinished.bind(this) ) ;
}

OpenState.prototype = Object.create( StateTask.prototype ,
{
    constructor : { writable : true , value : OpenState } ,

    /**
     * Run the process.
     * @memberof molecule.states.process.OpenState
     * @instance
     * @function
     */
    run : { value : function( )
    {
        logger.debug( this + " run " + this.state ) ;

        this.notifyStarted() ;

        if ( !(this.state instanceof State) )
        {
            logger.warn(this + " failed, the State reference of this process not must be 'null'.") ;
            this.notifyFinished() ;
            return ;
        }

        let view = this.state.view ;

        if ( view instanceof String || (typeof(view) === 'string') && (this.factory instanceof ObjectFactory) )
        {
            view = this.factory.getObject( view ) ;
        }
        else
        {
            logger.warn( this + " run failed, the display of the state:" + this.state + " isn't register in the ioc factory with the view id : " + view  ) ;
        }

        if ( view instanceof View )
        {
            if ( view.openBefore )
            {
                this._chain.add( view.openBefore ) ;
            }

            this._chain.add( new Call( view.open , view ) ) ;

            if ( view.openAfter )
            {

                this._chain.add( view.openAfter ) ;
            }
        }
        else
        {
            logger.warn( this + " failed, we can't find no View in the State : " + this.state ) ;
        }

        if ( ( this._chain.length > 0 ) && !this._chain.running )
        {
            this._chain.run() ;
        }
        else
        {
            this.notifyFinished() ;
        }
    }}
}) ;