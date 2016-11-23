"use strict" ;

import { performance } from '../../polyfill/performance.js' ;
import { Receiver  } from '../signals/Receiver.js' ;
import { Motion }    from './Motion.js' ;

/**
 * The internal MotionNextFrame Receiver.
 * @name MotionNextFrame
 * @memberof system.transitions
 * @class
 * @implements Receiver
 * @constructor
 * @param {system.transitions.Motion} motion - The Motion reference who emit the messages.
 */
export function MotionNextFrame( motion )
{
    this.motion = motion instanceof Motion ? motion : null ;
}

MotionNextFrame.prototype = Object.create( Receiver.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : MotionNextFrame } ,

    /**
     * Receives the signal message.
     * @name receive
     * @memberof system.transitions.MotionNextFrame
     * @function
     * @instance
     */
    receive : { value : function()
    {
        if( this.motion )
        {
            this.motion.setTime( (this.motion.useSeconds) ? ( ( performance.now() - this.motion._startTime ) / 1000 ) : ( this.motion._time + 1 ) ) ;
        }
    }}
}) ;