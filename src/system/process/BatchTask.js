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
 * Batchs tasks and notify when all processes are finished.
 */
if ( system.process.BatchTask == undefined) 
{
    /**
     * @requires system.process.TaskGroup
     */
    require( "system.process.TaskGroup" ) ;
    
    /**
     * Creates a new BatchTask instance.
     * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
     * @param actions A dynamic object who contains Action references to initialize the chain.
     */
    system.process.BatchTask = function ( mode /*String*/ , actions /*Array*/) 
    { 
        this._currents = new system.data.maps.ArrayMap() ;
        system.process.TaskGroup.call( this , mode , actions ) ;
    }
    
    ////////////////////////////////////
    
    /**
     * Determinates the "everlasting" mode of the batch. 
     * In this mode the action register in the task-group can't be auto-remove.
     */
    system.process.BatchTask.EVERLASTING /*String*/ = "everlasting" ;
    
    /**
     * Determinates the "normal" mode of the batch. 
     * In this mode the task-group has a normal life cycle.
     */
    system.process.BatchTask.NORMAL /*String*/ = "normal" ;
    
    /**
     * Determinates the "transient" mode of the batch. 
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     */
    system.process.BatchTask.TRANSIENT /*String*/ = "transient" ;
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.TaskGroup
     */
    proto = system.process.BatchTask.extend( system.process.TaskGroup ) ;
    
    ////////////////////////////////////
    
    /**
     * Insert an action in the chain.
     * @param priority Determinates the priority level of the action in the chain.
     * @param autoRemove Apply a removeAction after the first finish notification.
     * @return <code class="prettyprint">true</code> if the insert is success.
     */
    proto.addAction = function( action /*Action*/ , priority /*uint*/ , autoRemove /*Boolean*/ ) /*Boolean*/
    {
        if ( this._running )
        {
            throw new Error( this + " addAction failed, the batch process is in progress." ) ;
        }
        return system.process.TaskGroup.prototype.addAction.call( this , action , priority , autoRemove ) ;
    }
    
    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    proto.clone = function()
    {
        return new system.process.BatchTask( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }
    
    /**
     * Invoked when a task is finished.
     */
    proto.next = function( action /*Action*/ ) /*void*/
    {
        if ( action && this._currents.containsKey( action ) )
        {
            var entry /*ActionEntry*/ = this._currents.get( action ) ;
            if ( this._mode != system.process.BatchTask.EVERLASTING )
            {
                if ( this._mode == system.process.BatchTask.TRANSIENT || (entry.auto && this._mode == system.process.BatchTask.NORMAL) )
                {
                    if ( action )
                    {
                        var e /*ActionEntry*/ ;
                        var l /*int*/ = this._actions.length ;
                        while( --l > -1 )
                        {
                            e = this._actions[l] ;
                            if ( e && e.action == action )
                            {
                                var slot = this._buffer.get( this._current ) ;
                                
                                action.finishIt.disconnect( slot ) ;
                                
                                this._actions.splice( l , 1 ) ;
                                this._buffer.remove( e ) ;
                                
                                break ;
                            }
                        }
                    }
                }
            }
            this._currents.remove( action ) ;
        }
        if ( this._current )
        {
            notifyChanged() ;
        }
        this._current = action ;
        this.notifyProgress() ;
        if ( this._currents.isEmpty() ) 
        {
            this._current = null ;
            this.notifyFinished() ;
        }
    }
    
    /**
     * Remove a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed. 
     * If the chain is running the stop() method is called.
     * @return <code class="prettyprint">true</code> if the method success.
     */
    proto.removeAction = function( action /*Action*/ ) /*Boolean*/
    {
        if ( this._running )
        {
            throw new Error( this + " removeAction failed, the batch process is in progress." ) ;
        }
        return system.process.TaskGroup.prototype.removeAction.call( this , action ) ;
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
            if ( this._actions.length > 0 )
            {
                var a /*Action*/ ;
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e )
                    {
                        a = e.action ;
                        if ( a )
                        {
                            if ( "resume" in a )
                            {
                                a.resume() ;
                            }
                            else
                            {
                                this.next( a ) ; // finalize the action to clean the batch 
                            }
                        }
                    }
                }
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
            this._stopped = false ;
            this._current  = null ;
            this._currents.clear() ;
            if ( this._actions.length > 0 )
            {
                var i /*int*/ ;
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                for( i = 0 ; i<l ; i++ )
                {
                    e = this._actions[i] ;
                    if ( e && e.action )
                    {
                        this._currents.put( e.action , e ) ;
                        e.action.run() ;
                    }
                }
            }
            else
            {
                this.notifyFinished() ;
            }
        }
    }
    
    /**
     * Stops the task group.
     */
    proto.stop = function() /*void*/
    {
        if ( this._running ) 
        {
            if ( this._actions.length > 0 )
            {
                var a /*Action*/ ;
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e )
                    {
                        a = e.action ;
                        if ( a )
                        {
                            if ( "stop" in a )
                            {
                                a.stop() ;
                            }
                        }
                    }
                }
            }
            this._running = false ;
            this._stopped = true ;
            this.notifyStopped() ;
        }
    }
    
    ////////////////////////////////////
    
    /**
     * Indicates the current Action reference when the batch process is running.
     */
    proto.getCurrent = function() /*Action*/
    {
        return this._current ;
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
        if ( this._running )
        {
            throw new Error( this + " length property can't be changed, the batch process is in progress." ) ;
        }
        system.process.TaskGroup.prototype.setLength.call( this , value ) ;
    }
    
    ////////////////////////////////////
    
    /**
     * @private
     */
    proto._current /*ActionEntry*/ = null ;
    
    /**
     * @private
     */
    proto._currents /*ArrayMap*/ = null ;
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "current" , proto.getCurrent ) ;
    
    proto.__defineGetter__( "length" , proto.getLength ) ;
    proto.__defineSetter__( "length" , proto.setLength ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}