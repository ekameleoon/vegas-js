"use strict" ;

import { Receiver  } from '../signals/Receiver.js' ;
import { TaskGroup } from './TaskGroup.js' ;

/**
 * An internal class used in the <code>Chain</code> class.
 * @summary The internal class used in the <code>Chain</code> class.
 * @name ChainNext
 * @class
 * @memberof system.process
 * @implements system.signals.Receiver
 * @private
 * @param {system.process.Chain} chain - The <code>Chain</code> reference of this receiver.
 */
export function ChainNext( chain = null )
{
    /**
     * The chain to register in this helper.
     * @memberof system.process.ChainNext
     * @type {system.process.Chain}
     * @instance
     */
    this.chain = chain ;
}

ChainNext.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ChainNext } ,

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.ChainNext
     * @function
     * @instance
     */
    receive : { value : function()
    {
        if( this.chain === null )
        {
            return ;
        }

        var chain = this.chain ;
        var mode  = chain._mode ;

        if ( chain._current )
        {
            if ( mode !== TaskGroup.EVERLASTING )
            {
                if ( mode === TaskGroup.TRANSIENT || ( mode === TaskGroup.NORMAL && chain._current.auto ) )
                {
                    chain._current.action.finishIt.disconnect( this ) ;
                    chain._position-- ;
                    chain._actions.splice( this._position , 1 ) ;
                }
            }
            chain.notifyChanged() ;
            chain._current = null ;
        }

        if ( chain._actions.length > 0 )
        {
            if ( chain.hasNext() )
            {
                chain._current = chain._actions[ chain._position++ ] ;

                chain.notifyProgress() ;

                if ( chain._current && chain._current.action )
                {
                    chain._current.action.run() ;
                }
                else
                {
                    this.receive() ;
                }
            }
            else if ( this.looping )
            {
                chain._position = 0 ;
                if( chain.numLoop === 0 )
                {
                    chain.notifyLooped() ;
                    chain._currentLoop = 0  ;
                    this.receive() ;
                }
                else if ( chain._currentLoop < chain.numLoop )
                {
                    chain._currentLoop ++ ;
                    chain.notifyLooped() ;
                    this.receive() ;
                }
                else
                {
                    chain._currentLoop = 0 ;
                    chain.notifyFinished() ;
                }
            }
            else
            {
                chain._currentLoop = 0 ;
                chain._position    = 0 ;
                chain.notifyFinished() ;
            }
        }
        else
        {
            chain.notifyFinished() ;
        }
    }}
}) ;