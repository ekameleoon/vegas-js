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
 * This class simplify a full implementation of the <code class="prettyprint">Action</code> interface.
 */
if ( system.process.CoreAction == undefined) 
{
    /**
     * @requires system.process.Task
     */
    require( "system.process.Task" ) ;
    
    /**
     * Creates a new CoreAction instance.
     */
    system.process.CoreAction = function () 
    { 
        system.process.Task.call( this ) ;
        var Signal = system.signals.Signal ;
        this._changeIt   = new Signal() ;
        this._clearIt    = new Signal() ;
        this._infoIt     = new Signal() ;
        this._loopIt     = new Signal() ;
        this._pauseIt    = new Signal() ;
        this._progressIt = new Signal() ;
        this._resumeIt   = new Signal() ;
        this._stopIt     = new Signal() ;
        this._timeoutIt  = new Signal() ;
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.Task
     */
    proto = system.process.CoreAction.extend( system.process.Task ) ;
    
    ////////////////////////////////////
    
    /**
     * The flag to determinate if the Action object is looped.
     */
    proto.looping /*Boolean*/ = false ;
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.clone = function()
    {
        return new system.process.CoreAction() ;
    }
    
    /**
     * This signal emit when the notifyChanged method is invoked.
     */
    proto.getChangeIt = function() /*Signaler*/
    {
        return this._changeIt ;
    }
    
    /**
     * This signal emit when the notifyCleared method is invoked. 
     */
    proto.getClearIt = function() /*Signaler*/
    {
        return this._clearIt ;
    }
    
    /**
     * This signal emit when the notifyInfo method is invoked. 
     */
    proto.getInfoIt = function() /*Signaler*/
    {
        return this._infoIt ;
    }
    
    /**
     * This signal emit when the notifyLooped method is invoked. 
     */
    proto.getLoopIt = function() /*Signaler*/
    {
        return this._loopIt ;
    }
    
    /**
     * This signal emit when the notifyPaused method is invoked. 
     */
    proto.getPauseIt = function() /*Signaler*/
    {
        return this._pauseIt ;
    }
    
    /**
     * This signal emit when the notifyProgress method is invoked. 
     */
    proto.getProgressIt = function() /*Signaler*/
    {
        return this._progressIt ;
    }
    
    /**
     * This signal emit when the notifyResumed method is invoked. 
     */
    proto.getResumeIt = function() /*Signaler*/
    {
        return this._resumeIt ;
    }
    
    /**
     * This signal emit when the notifyStopped method is invoked. 
     */
    proto.getStopIt = function() /*Signaler*/
    {
        return this._stopIt ;
    }
    
    /**
     * This signal emit when the notifyTimeOut method is invoked. 
     */
    proto.getTimeoutIt = function() /*Signaler*/
    {
        return this._timeoutIt ;
    }
    
    /**
     * Notify when the process is changed.
     */
    proto.notifyChanged = function() /*void*/
    {
        if ( !this.isLocked() )
        {
            this._changeIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is cleared.
     */
    proto.notifyCleared = function() /*void*/
    {
        if ( !this.isLocked() )
        {
            this._clearIt.emit( this ) ;
        }
    }
    
    /**
     * Notify a specific information when the process is changed.
     */
    proto.notifyInfo = function( info ) /*void*/
    {
        if ( !this.isLocked() )
        {
            this._infoIt.emit( this , info ) ;
        }
    }
    
    /**
     * Notify when the process is looped.
     */
    proto.notifyLooped = function() /*void*/
    {
        this._phase = system.process.TaskPhase.RUNNING ;
        if ( !this.isLocked() )
        {
            this._loopIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is paused.
     */
    proto.notifyPaused = function() /*void*/
    {
        this._running = false ;
        this._phase = system.process.TaskPhase.STOPPED ;
        if ( !this.isLocked() )
        {
            this._pauseIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is progress.
     */
    proto.notifyProgress = function() /*void*/
    {
        if ( !this.isLocked() )
        {
            this._progressIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is resumed.
     */
    proto.notifyResumed = function() /*void*/
    {
        this._phase = system.process.TaskPhase.RUNNING ;
        if ( !this.isLocked() )
        {
            this._resumeIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is stopped.
     */
    proto.notifyStopped = function() /*void*/
    {
        this._running = false ;
        this._phase = system.process.TaskPhase.STOPPED ;
        if ( !this.isLocked() )
        {
            this._stopIt.emit( this ) ;
        }
    }
    
    /**
     * Notify when the process is out of time.
     */
    proto.notifyTimeout = function() /*void*/
    {
        this._running = false ;
        this._phase = system.process.TaskPhase.TIMEOUT ;
        if ( !this.isLocked() )
        {
            this._timeoutIt.emit( this ) ;
        }
    }
    
    /**
     * Sets the signal who emit when the notifyChanged method is invoked.
     */
    proto.setChangeIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._changeIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyCleared method is invoked.
     */
    proto.setClearIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._clearIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyInfo method is invoked.
     */
    proto.setInfoIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._infoIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyLooped method is invoked.
     */
    proto.setLoopIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._loopIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyPaused method is invoked.
     */
    proto.setPauseIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._pauseIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyProgress method is invoked.
     */
    proto.setProgressIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._progressIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyResumed method is invoked.
     */
    proto.setResumeIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._resumeIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyStopped method is invoked.
     */
    proto.setStopIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._stopIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyTimeout method is invoked.
     */
    proto.setTimeoutIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._timeoutIt = signal || new system.signals.Signal() ;
    }
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "changeIt" , proto.getChangeIt ) ;
    proto.__defineSetter__( "changeIt" , proto.setChangeIt ) ;
    
    proto.__defineGetter__( "clearIt" , proto.getClearIt ) ;
    proto.__defineSetter__( "clearIt" , proto.setClearIt ) ;
    
    proto.__defineGetter__( "infoIt" , proto.getInfoIt ) ;
    proto.__defineSetter__( "infoIt" , proto.setInfoIt ) ;
    
    proto.__defineGetter__( "loopIt" , proto.getLoopIt ) ;
    proto.__defineSetter__( "loopIt" , proto.setLoopIt ) ;
    
    proto.__defineGetter__( "pauseIt" , proto.getPauseIt ) ;
    proto.__defineSetter__( "pauseIt" , proto.setPauseIt ) ;
    
    proto.__defineGetter__( "progressIt" , proto.getProgressIt ) ;
    proto.__defineSetter__( "progressIt" , proto.setProgressIt ) ;
    
    proto.__defineGetter__( "resumeIt" , proto.getResumeIt ) ;
    proto.__defineSetter__( "resumeIt" , proto.setResumeIt ) ;
    
    proto.__defineGetter__( "stopIt" , proto.getStopIt ) ;
    proto.__defineSetter__( "stopIt" , proto.setStopIt ) ;
    
    proto.__defineGetter__( "timeoutIt" , proto.getTimeoutIt ) ;
    proto.__defineSetter__( "timeoutIt" , proto.setTimeoutIt ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}