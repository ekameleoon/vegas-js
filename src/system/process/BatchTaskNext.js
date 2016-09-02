"use strict" ;

import { Receiver } from '../signals/Receiver.js' ;

import { TaskGroup } from './TaskGroup.js' ;

/**
 * The internal BatchTaskNext Receiver.
 */
export function BatchTaskNext( batch )
{
    this.batch = batch ;
}

/**
 * @extends TaskGroup
 */
BatchTaskNext.prototype = Object.create( Receiver.prototype ) ;
BatchTaskNext.prototype.constructor = BatchTaskNext;

/**
 * Receive the signal message.
 */
BatchTaskNext.prototype.receive = function( action )
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
}