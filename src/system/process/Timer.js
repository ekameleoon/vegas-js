/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * The Timer class is the interface to timers, which let you run code on a specified time sequence.
 * <p><b>Example :</b></p>
 * <pre>
 * var finish = function( action )
 * {
 *     trace( "finish" ) ;
 * }
 * 
 * var resume = function( action )
 * {
 *     trace( "resume" ) ;
 * }
 * 
 * var start = function( action )
 * {
 *     trace( "start" ) ;
 * }
 * 
 * var stop = function( action )
 * {
 *     trace( "stop" ) ;
 * }
 * 
 * var timer = function( action )
 * {
 *     trace( "timer currentCount:" + action.currentCount + " repeatCount:" + action.repeatCount ) ;
 *     if ( action.currentCount == 5 )
 *     {
 *         // action.reset() ;
 *         // trace( "timer stopped:" + action.stopped ) ;
 *     }
 * }
 * 
 * var process = new system.process.Timer( 1000 , 10 ) ;
 * 
 * process.finishIt.connect( finish ) ;
 * process.timerIt.connect( timer ) ;
 * process.resumeIt.connect( resume ) ;
 * process.startIt.connect( start ) ;
 * process.stopIt.connect( stop ) ;
 * 
 * process.run() ;
 * </pre>
 */
if ( system.process.Timer == undefined ) 
{
    /**
     * Creates a new Timer object with the specified delay and repeat state. 
     * The timer does not start automatically; you much call the start() or run() method to start it.
     * @param delay the delay between two intervals in this timer.
     * @param repeatCount the number of repetitions of this timer.
     */
    system.process.Timer = function( delay /*uint*/ , repeatCount /*uint*/ ) 
    {
        system.process.CoreAction.call(this) ; // super() ;
        this._count   = 0 ; 
        this._stopped = false ;
        this._timer   = new system.signals.Signal() ;
        this.setDelay( isNaN(delay) ? 0 : delay ) ;
        this.setRepeatCount( isNaN(repeatCount) ? 0 : repeatCount ) ;
    }
    
    /**
     * @extends system.process.CoreAction
     */
    proto = system.process.Timer.extend( system.process.CoreAction ) ;
    
    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    proto.clone = function() /*Timer*/
    {
        return new system.process.Timer( this._delay , this._repeatCount ) ;
    }
    
    /**
     * Restarts the timer. The timer is stopped, and then started.
     */
    proto.resume = function() /*void*/ 
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this._itv = setInterval( this, "_next" , this._delay ) ;
            this.notifyResumed() ;
        }
    }
    
    /**
     * Reset the timer and stop it before if it's running.
     */
    proto.reset = function() /*Void*/ 
    {
        this.stop() ;
        this._count = 0 ;
    }
    
    /**
     * Run the timer.
     */
    proto.run = function () 
    {
        if( !this._running )
        {
            this._count   = 0 ;
            this._stopped = false ;
            this.notifyStarted() ;
            this._itv = setInterval( this , "_next" , this._delay ) ;
        }
    }
    
    /**
     * Starts the timer.
     */
    proto.start = function() /*Void*/ 
    {
        this.run() ;
    }
    
    /**
     * Stops the timer.
     */
    proto.stop = function() /*Void*/ 
    {
        if ( this._running && !this._stopped )
        {
            this._running = false ;
            this._stopped = true ;
            clearInterval( this._itv ) ;
            this.notifyStopped() ;
        }
    }
    
    /**
     * Returns the String representation of this object.
     * @return the String representation of this object.
     */
    proto.toString = function () 
    {
        return "[Timer]" ;
    }
    
    /////////////// getter / setters
    
    /**
     * The total number of times the timer has fired since it started at zero.
     */
    proto.getCurrentCount = function() /*uint*/
    {
        return this._count ;
    }
    
    /**
     * Returns the delay between timer events, in milliseconds.
     * @return the delay between timer events, in milliseconds.
     */
    proto.getDelay = function () 
    {
        return this._delay ;
    }
    
    /**
     * Sets the delay between timer events, in milliseconds.
     * @throws Error if the user want change the delay of the timer during the running phase.
     */
    proto.setDelay = function ( delay /*Number*/ ) /*Void*/ 
    {
        if ( this._running ) 
        {
            throw new Error( this + " change delay property is impossible during the running phase.") ;
        }
        this._delay = ( delay > 0 ) ? delay : 0 ;
    }
    
    /**
     * Returns the number of repetitions. If zero, the timer repeats infinitely. If nonzero, the timer runs the specified number of times and then stops.
     * @return the number of repetitions. If zero, the timer repeats infinitely. If nonzero, the timer runs the specified number of times and then stops.
     */
    proto.getRepeatCount = function () 
    {
        return this._repeatCount ;
    }
    
    /**
     * Sets the number of repetitions. 
     * If zero, the timer repeats infinitely. 
     * If nonzero, the timer runs the specified number of times and then stops.
     */
    proto.setRepeatCount = function( value /*uint*/ )/*void*/ 
    {
        this._repeatCount = (value > 0) ? value : 0 ;
    }
    
    /**
     * Returns true if the timer is stopped.
     * @return true if the timer is stopped.
     */
    proto.getStopped = function () /*Boolean*/ 
    {
        return this._stopped ;
    }
    
    /**
     * This signal emit when the timer emit a new interval.
     */
    proto.getTimerIt = function() /*Signaler*/
    {
        return this._timer ;
    }
    
    /**
     * Sets the timer signal.
     */
    proto.setTimerIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._timer = signal || new system.signals.Signal() ;
    }
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "currentCount" , proto.getCurrentCount ) ;
    
    proto.__defineGetter__( "stopped" , proto.getStopped ) ;
    
    proto.__defineGetter__( "timerIt" , proto.getTimerIt ) ;
    proto.__defineSetter__( "timerIt" , proto.setTimerIt ) ;
    
    proto.__defineGetter__( "delay" , proto.getDelay ) ;
    proto.__defineSetter__( "delay" , proto.setDelay ) ;
    
    proto.__defineGetter__( "repeatCount" , proto.getRepeatCount ) ;
    proto.__defineSetter__( "repeatCount" , proto.setRepeatCount ) ;
    
    ////////////////////////////////////
    
    /**
     * @private
     */
    proto._count /*Number*/ = null ;
    
    /**
     * @private
     */
    proto._delay /*Number*/ = null ;
    
    /**
     * @private
     */
    proto._itv /*Number*/ = null ;
    
    /**
     * @private
     */
    proto._repeatCount /*Number*/ = null ;
    
    /**
     * @private
     */
    proto._next = function() /*void*/ 
    {
        this._count ++ ;
        this._timer.emit( this ) ;
        if ( this._repeatCount > 0 && this._repeatCount == this._count ) 
        {
            clearInterval( this._itv ) ;
            this.notifyFinished() ;
        }
    }
    
    ////////////////////////////////////
    
    delete proto ;
}