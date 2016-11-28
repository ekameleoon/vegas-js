"use strict" ;

import { Receiver } from '../signals/Receiver.js' ;

import { TaskGroup } from './TaskGroup.js' ;

/**
 * The internal BatchTaskNext Receiver.
 * @summary The internal class used in the <code>BatchTask</code> class.
 * @name BatchTaskNext
 * @memberof system.process
 * @class
 * @private
 * @implements system.signals.Receiver
 * @param {system.process.BatchTask} BatchTask - The <code>BatchTask</code> reference of this receiver.
 */
export function BatchTaskNext( batch )
{
    /**
     * The batch to register in this helper.
     * @memberof system.process.BatchTaskNext
     * @type {system.process.BatchTask}
     * @instance
     */
    this.batch = batch ;
}

BatchTaskNext.prototype = Object.create( Receiver.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : BatchTaskNext } ,

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.BatchTaskNext
     * @function
     * @instance
     * @param {system.process.Action} action - The <code>Action</code> reference received in this slot.
     */
    receive : { value : function( action )
    {
        var batch    = this.batch ;
        var mode     = batch.mode ;
        var actions  = batch._actions ;
        var currents = batch._currents ;

        if ( action && currents.has( action ) )
        {
            var entry = currents.get( action ) ;

            if ( mode !== TaskGroup.EVERLASTING )
            {
                if ( mode === TaskGroup.TRANSIENT || ( entry.auto && mode === TaskGroup.NORMAL ) )
                {
                    var e ;
                    var l = actions.length ;
                    while( --l > -1 )
                    {
                        e = actions[l] ;
                        if( e && e.action === action )
                        {
                            action.finishIt.disconnect( this ) ;
                            actions.splice( l , 1 ) ;
                            break ;
                        }
                    }
                }
            }

            currents.delete( action ) ;
        }

        if( batch._current !== null )
        {
            batch.notifyChanged() ;
        }

        batch._current = action ;

        batch.notifyProgress() ;

        if( currents.length === 0 )
        {
            batch._current = null ;
            batch.notifyFinished();
        }
    }}
}) ;