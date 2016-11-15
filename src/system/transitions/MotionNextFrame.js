"use strict" ;

import { performance } from '../../polyfill/performance.js' ;
import { Receiver  } from '../signals/Receiver.js' ;
import { Motion }    from './Motion.js' ;

/**
 * The internal MotionNextFrame Receiver.
 */
export function MotionNextFrame( motion )
{
    this.motion = motion instanceof Motion ? motion : null ;
}

/**
 * @extends Receiver
 */
MotionNextFrame.prototype = Object.create( Receiver.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : MotionNextFrame } ,

    /**
     * Receives the signal message.
     */
    receive : { value : function()
    {
        if( this.motion )
        {
            this.motion.setTime( (this.motion.useSeconds) ? ( ( performance.now() - this.motion._startTime ) / 1000 ) : ( this.motion._time + 1 ) ) ;
        }
    }}
}) ;