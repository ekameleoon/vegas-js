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
 * A chain is a sequence with a finite or infinite number of actions. All actions registered in the chain can be executed one by one with different strategies (loop, auto remove, etc).
 */
if ( system.process.Chain == undefined) 
{
    /**
     * @requires system.process.TaskGroup
     */
    require( "system.process.TaskGroup" ) ;
    
    /**
     * Creates a new Chain instance.
     * @param looping Specifies whether playback of the clip should continue, or loop (default false). 
     * @param numLoop Specifies the number of the times the presentation should loop during playback.
     * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
     * @param actions A dynamic object who contains Action references to initialize the chain.
     */
    system.process.Chain = function ( looping /*Boolean*/ , numLoop /*uint*/ , mode /*String*/ , actions /*Array*/) 
    { 
        this.looping = Boolean( looping ) ;
        this.numLoop = ( numLoop > 0 ) ? Math.round( numLoop ) : 0 ;
        
        this._current     = null ;
        this._currentLoop = 0 ;
        this._position    = 0 ;
        
        system.process.TaskGroup.call( this , mode , actions ) ;
    }
    
    ////////////////////////////////////
    
    /**
     * Determinates the "everlasting" mode of the chain. 
     * In this mode the action register in the task-group can't be auto-remove.
     */
    system.process.Chain.EVERLASTING /*String*/ = "everlasting" ;
    
    /**
     * Determinates the "normal" mode of the chain. 
     * In this mode the task-group has a normal life cycle.
     */
    system.process.Chain.NORMAL /*String*/ = "normal" ;
    
    /**
     * Determinates the "transient" mode of the chain. 
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     */
    system.process.Chain.TRANSIENT /*String*/ = "transient" ;
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.TaskGroup
     */
    proto = system.process.Chain.extend( system.process.TaskGroup ) ;
    
    ////////////////////////////////////
    
    proto.looping /*Boolean*/ = false ;
    
    proto.numLoop /*uint*/ = 0 ;
    
    ////////////////////////////////////
    
    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    proto.clone = function()
    {
        return new system.process.Chain( this.looping , this.numLoop , this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }
    
    /**
     * Retrieves the next action reference in the chain with the current position.
     */
    proto.element = function() 
    {
        return this.hasNext() ? ( this._actions[ this._position ] ).action : null ;
    }
    
    /**
     * Retrieves the next action reference in the chain with the current position.
     */
    proto.hasNext = function() 
    {
        return this._position < this._actions.length ;
    }
    
    /**
     * Invoked when a task is finished.
     */
    proto.next = function( action /*Action*/ ) /*void*/
    {
        if ( this._current )
        {
            if ( this._mode != system.process.Chain.EVERLASTING )
            {
                if ( this._mode == system.process.Chain.TRANSIENT || ( this._current.auto && this._mode == system.process.Chain.NORMAL) )
                {
                    var slot = this._buffer.get( this._current ) ;
                    this._current.action.finishIt.disconnect( slot ) ;
                    this._position -- ;
                    this._actions.splice( this._position , 1 ) ;
                    this._buffer.remove( this._current ) ;
                }
            }
            this.notifyChanged() ;
            this._current = null ;
        }
        if ( this._actions.length > 0 ) 
        {
            if ( this.hasNext() )
            {
                this._current = this._actions[ this._position++ ] ;
                this.notifyProgress() ;
                if ( this._current && this._current.action )
                {
                    this._current.action.run() ;
                }
                else
                {
                    this.next() ;
                }
            }
            else if ( this.looping )
            {
                this._position = 0 ;
                if( this.numLoop == 0 )
                {
                    this.notifyLooped() ;
                    this._currentLoop = 0  ;
                    this.next() ;
                }
                else if ( this._currentLoop < this.numLoop )
                {
                    this._currentLoop ++ ;
                    this.notifyLooped() ;
                    this.next() ;
                }
                else
                {
                    this._currentLoop = 0 ;
                    this.notifyFinished() ; 
                }
            }
            else
            {
                this._currentLoop = 0 ;
                this._position    = 0 ;
                this.notifyFinished() ;
            }
        }
        else 
        {
            this.notifyFinished() ;
        }
    }
    
    /**
     * Resume the chain.
     */
    proto.resume = function() /*void*/
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this.notifyResumed() ;
            if ( this._current && this._current.action )
            {
                if ( "resume" in this._current.action )
                {
                    this._current.action.resume() ;
                }
            }
            else
            {
                this.next() ;
            } 
        }
        else
        {
            this.run() ; 
        }
    }
    
    /**
     * Launchs the chain process.
     */
    proto.run = function() /*void*/
    {
        if ( !this._running )
        {
            this.notifyStarted() ;
            this._current     = null  ;
            this._stopped     = false ;
            this._position    = 0 ;
            this._currentLoop = 0 ;
            this.next() ;
        }
    }
    
    /**
     * Stops the task group.
     */
    proto.stop = function() /*void*/
    {
        if ( this._running ) 
        {
            if ( this._current && this._current.action )
            {
                if ( "stop" in this._current.action )
                {
                    this._current.action.stop() ;
                }
            }
            this._running = false ;
            this._stopped = true ;
            this.notifyStopped() ;
        }
    }
    
    ////////////////////////////////////
    
    /**
     * Indicates the current Action reference when the chain process is running.
     */
    proto.getCurrent = function() /*Action*/
    {
        return this._current ? this._current.action : null ;
    }
    
    /**
     * Indicates the current countdown loop value.
     */
    proto.getCurrentLoop = function() /*uint*/
    {
        return this._currentLoop ;
    }
    
    /**
     * Indicates the numbers of actions register in the group.
     */
    proto.getLength = function() /*uint*/
    {
        return this._actions.length ;
    }
    
    /**
     * Sets the numbers of actions register in the group.
     */
    proto.setLength = function( value /*uint*/ ) /*void*/
    {
        this._current = null ;
        system.process.TaskGroup.prototype.setLength.call( this , value ) ;
    }
    
    /**
     * Indicates the current numeric position of the chain.
     */
    proto.getPosition = function() /*uint*/
    {
        return this._position ;
    }
    
    ////////////////////////////////////
    
    /**
     * @private
     */
    proto._current /*ActionEntry*/ = null ;
    
    /**
     * @private
     */
    proto._currentLoop /*uint*/ = 0 ;
    
    /**
     * @private
     */
    proto._position /*int*/ = 0 ;
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "current" , proto.getCurrent ) ;
    
    proto.__defineGetter__( "currentLoop" , proto.getCurrentLoop ) ;
    
    proto.__defineGetter__( "length" , proto.getLength ) ;
    proto.__defineSetter__( "length" , proto.setLength ) ;
    
    proto.__defineGetter__( "position" , proto.getPosition ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}