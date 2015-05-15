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
if ( system.process.TaskGroup == undefined) 
{
    /**
     * @requires system.process.CoreAction
     */
    require( "system.process.CoreAction" ) ;
    
    /**
     * Creates a new TaskGroup instance.
     * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
     * @param actions A dynamic object who contains Action references to initialize the chain.
     */
    system.process.TaskGroup = function ( mode /*String*/ , actions /*Array*/) 
    { 
        system.process.CoreAction.call(this) ;
        this._actions  = [] ;
        this._buffer   = new system.data.maps.ArrayMap() ;
        this.setMode( mode ) ;
        if ( actions && ( actions instanceof Array ) && ( actions.length > 0 ) )
        {
            var action ;
            var len /*int*/ = actions.length ;
            for ( var i /*int*/ = 0 ; i < len ; i++ )
            {
                action = actions[i] ;
                if( action instanceof system.process.Action )
                {
                    addAction( actions[member] ) ;
                }
            }
        }
    }
    
    ////////////////////////////////////
    
    /**
     * Determinates the "everlasting" mode of the group. 
     * In this mode the action register in the task-group can't be auto-remove.
     */
    system.process.TaskGroup.EVERLASTING /*String*/ = "everlasting" ;
    
    /**
     * Determinates the "normal" mode of the group. 
     * In this mode the task-group has a normal life cycle.
     */
    system.process.TaskGroup.NORMAL /*String*/ = "normal" ;
    
    /**
     * Determinates the "transient" mode of the group. 
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     */
    system.process.TaskGroup.TRANSIENT /*String*/ = "transient" ;
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.CoreAction
     */
    proto = system.process.TaskGroup.extend( system.process.CoreAction ) ;
    
    ////////////////////////////////////
    
    /**
     * Insert an action in the chain.
     * @param priority Determinates the priority level of the action in the chain.
     * @param autoRemove Apply a removeAction after the first finish notification.
     * @return <code class="prettyprint">true</code> if the insert is success.
     */
    proto.addAction = function( action /*Action*/ , priority /*uint*/ , autoRemove /*Boolean*/ ) /*Boolean*/
    {
        if ( action && ( action instanceof system.process.Action ) )
        {
            autoRemove = Boolean( autoRemove ) ;
            priority   = ( priority > 0 ) ? Math.round(priority) : 0 ;
            
            var entry = new system.process.ActionEntry( action , priority , autoRemove ) ;
            
            var slot  = this.next.bind( this ) ;
            
            action.finishIt.connect( slot ) ;
            
            this._buffer.put( entry , slot ) ;
            
            this._actions.push( entry ) ;
            
            /////// bubble sorting
            
            var i ;
            var j ;
            
            var a = this._actions ;
            
            var swap = function( j , k ) 
            {
                var temp = a[j] ;
                a[j]     = a[k] ;
                a[k]     = temp ;
                return true ;
            }
            
            var swapped = false;
            
            var l = a.length ;
            
            for( i = 1 ; i < l ; i++ ) 
            {
                for( j = 0 ; j < ( l - i ) ; j++ ) 
                {
                    if ( a[j+1].priority > a[j].priority ) 
                    {
                        swapped = swap(j, j+1) ;
                    }
                }
                if ( !swapped ) 
                {
                    break;
                }
            }
            
            //////
            
            return true ;
        }
        return false ;
    }
    
    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    proto.clone = function()
    {
        return new system.process.TaskGroup( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }
    
    /**
     * Dispose the chain and disconnect all actions but don't remove them.
     */
    proto.dispose = function() /*void*/
    {
        var l /*int*/ = this._actions.length ;
        if ( l > 0 )
        {
            var slot ;
            var entry /*ActionEntry*/ ;
            while( --l > -1 )
            {
                entry = this._actions[l] ;
                if ( entry )
                {
                    slot = this._buffer.get( entry ) ;
                    if ( slot )
                    {
                        entry.action.finishIt.disconnect( slot ) ;
                        this._buffer.remove( entry ) ;
                    }
                }
            }
        }
    }
    
    /**
     * Returns the action register in the chain at the specified index value or <code>null</code>.
     * @return the action register in the chain at the specified index value or <code>null</code>.
     */
    proto.getActionAt = function( index /*uint*/ ) /*Action*/
    {
        if ( this._actions.length > 0 && index < this._actions.length )
        {
            var entry = this._actions[index] ;
            if ( entry )
            {
                return entry.action ;
            }
        }
        return null ;
    }
    
    /**
     * Returns <code class="prettyprint">true</code> if the specified Action is register in the chain.
     * @return <code class="prettyprint">true</code> if the specified Action is register in the chain.
     */
    proto.hasAction = function( action /*Action*/ ) /*Action*/
    {
        if ( action && action instanceof system.process.Action )
        {
            if ( this._actions.length > 0 )
            {
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e && e.action == action )
                    {
                        return true ;
                    }
                }
            }
        }
        return false ;
    }
    
    /**
     * Returns <code>true</code> if the chain is empty.
     * @return <code>true</code> if the chain is empty.
     */
    proto.isEmpty = function() /*Boolean*/
    {
        return this._actions.length == 0 ;
    }
    
    /**
     * Invoked when a task is finished.
     */
    proto.next = function( action /*Action*/ ) /*void*/
    {
        //
    }
    
    /**
     * Remove a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed. 
     * If the chain is running the stop() method is called.
     * @return <code class="prettyprint">true</code> if the method success.
     */
    proto.removeAction = function( action /*Action*/ ) /*Boolean*/
    {
        this.stop() ;
        if ( this._actions.length > 0 )
        {
            if ( action && action instanceof system.process.Action )
            {
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e && e.action == action )
                    {
                        slot = this._buffer.get( e ) ;
                        if ( slot )
                        {
                            e.action.finishIt.disconnect( slot ) ;
                            this._buffer.remove( e ) ;
                        }
                        this._actions.splice( l , 1 ) ;
                        return true ;
                    }
                }
            }
            else
            {
                this.dispose() ;
                this._actions.length = 0 ;
                this._buffer.clear() ;
                this.notifyCleared() ;
                return true ;
            }
        }
        return false ;
    }
    
    /**
     * Resume the chain.
     */
    proto.resume = function() /*void*/
    {
        // overrides
    }
    
    /**
     * Starts the chain.
     */
    proto.start = function() /*void*/
    {
        this.run() ;
    }
    
    /**
     * Stops the task group.
     */
    proto.stop = function() /*void*/
    {
        // overrides
    }
    
    /**
     * Returns the Array representation of the chain.
     * @return the Array representation of the chain.
     */
    proto.toArray = function() /*Array*/
    {
        if ( this._actions.length > 0 )
        {
            var i /*int*/ ;
            var e /*ActionEntry*/ ;
            var r /*Array*/ = [] ;
            var l /*int*/ = this._actions.length ;
            for( i = 0 ; i<l ; i++ )
            {
                e = this._actions[i] ;
                if ( e && e.action )
                {
                    r.push( e.action ) ;
                }
            }
            return r ;
        }
        else
        {
            return [] ;
        }
    }
    
    /**
     * Returns the String representation of the chain.
     * @return the String representation of the chain.
     */
    proto.toString = function( verbose /*Boolean*/ ) /*String*/
    {
        var s /*String*/ = "[" + this.getConstructorName() ;
        if ( Boolean(verbose) )
        {
            if ( this._actions.length > 0 )
            {
                s += "<" ;
                var i /*int*/ ;
                var e /*ActionEntry*/ ;
                var l /*int*/ = this._actions.length ;
                var r /*Array*/ = [] ;
                for( i = 0 ; i < l ; i++ )
                {
                    e = this._actions[i] ;
                    r.push( ( e && e.action ) ? e.action : null ) ;
                }
                s += r.toString() ;
                s += ">" ;
            }
        }
        s += "]" ;
        return s ;
    }
    
    ////////////////////////////////////
    
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
        this.dispose() ;
        var old /*uint*/  = this._actions.length ;
        this._actions.length = value ;
        var l /*int*/ = this._actions.length ;
        if ( l > 0 )
        {
            var e /*ActionEntry*/ ;
            while( --l > -1 )
            {
                e = this._actions[l] ;
                if ( e && e.action )
                {
                    var slot = this.next.bind(this) ;
                    this._buffer.put( e , slot ) ;
                    e.action.finishIt.connect( slot ) ;
                }
            }
        }
        else if ( old > 0 ) 
        { 
            this.notifyCleared() ; // clear notification
        }
    }
    
    /**
     * Determinates the mode of the chain. The mode can be "normal", "transient" or "everlasting".
     * @see TaskGroup.NORMAL, TaskGroup.EVERLASTING, TaskGroup.TRANSIENT
     */
    proto.getMode = function() /*String*/
    {
        return this._mode ;
    }
    
    /**
     * Sets the mode of the chain. The mode can be "normal", "transient" or "everlasting".
     * @see TaskGroup.NORMAL, TaskGroup.EVERLASTING, TaskGroup.TRANSIENT
     */
    proto.setMode = function( value /*uint*/ ) /*void*/
    {
        var TaskGroup = system.process.TaskGroup ;
        this._mode = ( value == TaskGroup.TRANSIENT || value == TaskGroup.EVERLASTING ) ? value : TaskGroup.NORMAL ;
    }
    
    /**
     * Indicates if the chain is stopped.
     */
    proto.getStopped = function() /*Boolean*/
    {
        return this._stopped ;
    }
    
    ////////////////////////////////////
    
    /**
     * @private
     */
    proto._actions /*Array*/ = null ;
    
    /**
     * @private
     */
    proto._buffer /*ArrayMap*/ = null ;
    
    /**
     * @private
     */
    proto._stopped /*Boolean*/ = false ;
    
    ////////////////////////////////////
    
    proto.__defineGetter__( "length" , proto.getLength ) ;
    proto.__defineSetter__( "length" , proto.setLength ) ;
    
    proto.__defineGetter__( "mode" , proto.getMode ) ;
    proto.__defineSetter__( "mode" , proto.setMode ) ;
    
    proto.__defineGetter__( "stopped" , proto.getStopped ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}