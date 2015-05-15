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
 * A simple representation of the <code class="prettyprint">Action</code> interface.
 */
if ( system.process.Task == undefined) 
{
    /**
     * @requires system.process.Action
     */
    require( "system.process.Action" ) ;
    
    /**
     * Creates a new Task instance.
     */
    system.process.Task = function () 
    { 
        this._finishIt = new system.signals.Signal() ;
        this._phase    = system.process.TaskPhase.INACTIVE ;
        this.__lock__  = false ;
        this._running  = false ;
        this._startIt  = new system.signals.Signal() ;
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.Action
     */
    proto = system.process.Task.extend( system.process.Action ) ;
    
    ////////////////////////////////////
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.clone = function()
    {
        return new system.process.Task() ;
    }
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.getFinishIt = function() /*Signaler*/
    {
        return this._finishIt ;
    }
    
    /**
     * The current phase of the action.
     * @see system.process.TaskPhase
     */
    proto.getPhase = function() /*String*/
    {
        return this._phase ;
    }
    
    /**
     * Indicates <code class="prettyprint">true</code> if the process is in progress.
     */
    proto.getRunning = function() /*Boolean*/
    {
        return this._running ;
    }
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.getStartIt = function() /*Signaler*/
    {
        return this._startIt ;
    }
    
    /**
     * Returns <code class="prettyprint">true</code> if the object is locked.
     * @return <code class="prettyprint">true</code> if the object is locked.
     */
    proto.isLocked = function() /*Boolean*/
    {
        return this.__lock__ ;
    }
    
    /**
     * Locks the object.
     */
    proto.lock = function() /*void*/
    {
        this.__lock__ = true ;
    }
    
    /**
     * Notify when the process is finished.
     */
    proto.notifyFinished = function() /*void*/
    {
        this._running = false ;
        this._phase = system.process.TaskPhase.FINISHED ;
        this._finishIt.emit( this ) ;
        this._phase = system.process.TaskPhase.INACTIVE ;
    }
    
    /**
     * Notify when the process is started.
     */
    proto.notifyStarted = function() /*void*/
    {
        this._running = true ;
        this._phase  = system.process.TaskPhase.RUNNING ;
        this._startIt.emit( this ) ;
    }
    
    /**
     * This signal who emit when the notifyFinished method is invoked.
     */
    proto.setFinishIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._finishIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Sets the signal who emit when the notifyStarted method is invoked.
     */
    proto.setStartIt = function( signal /*Signaler*/ ) /*void*/
    {
        this._startIt = signal || new system.signals.Signal() ;
    }
    
    /**
     * Unlocks the object.
     */
    proto.unlock = function() /*void*/
    {
        this.__lock__ = false ;
    }
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "finishIt" , proto.getFinishIt ) ;
    proto.__defineSetter__( "finishIt" , proto.setFinishIt ) ;
    
    proto.__defineGetter__( "phase" , proto.getPhase ) ;
    
    proto.__defineGetter__( "running" , proto.getRunning ) ;
    
    proto.__defineGetter__( "startIt" , proto.getStartIt ) ;
    proto.__defineSetter__( "startIt" , proto.setStartIt ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}