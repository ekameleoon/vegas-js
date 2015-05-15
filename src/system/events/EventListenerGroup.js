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
 * Internal class used in the EventDispatcher to collect {@code EventListener} for a specific event type.
 */
if (system.events.EventListenerGroup == undefined) 
{
    /**
     * Creates a new EventListenerGroup instance.
     */
    system.events.EventListenerGroup = function () 
    {
        this._listeners = [] ;
    }
    
    ///////////////////
    
    /**
     * @extends Object
     */
    proto = system.events.EventListenerGroup.extend( Object ) ;
    
    ///////////////////
    
    /**
     * Adds an {@code EventListener} in the collection 
     * @param listener the EventListener in the collection
     * @param priority the priority value of the EventListener.
     * @param autoRemove Indicates if the listener must be removed when the listener handle the first time an event.
     */
    proto.addListener = function ( listener /*EventListener*/, priority /*uint*/ , autoRemove /*Boolean*/ ) /*Boolean*/ 
    {
        if ( listener && ( "handleEvent" in listener ) )
        {
            var entry /*EventListenerEntry*/ = new system.events.EventListenerEntry( listener , priority , autoRemove ) ;
            
            this._listeners.push( entry ) ;
            
            /////// bubble sorting
            
            var i ;
            var j ;
            
            var a = this._listeners ;
            
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
            
            ///////
            
            return true ;
        }
        return false ;
    }
    
    /**
     * Returns the number of {@code EventListener} register in this group.
     * @return the number of {@code EventListener} register in this group.
     */
    proto.numListeners = function () /*uint*/ 
    {
        return this._listeners.length ;
    }
    
    /**
     * Propagates a specific event in the event flow of all {@code EventListener} registered in this group.
     */
    proto.propagate = function( e /*Event*/ ) /*Event*/ 
    {
        var EventPhase = system.events.EventPhase ;
        
        var removes /*Array*/ = [] ;
        
        var l /*int*/ = this._listeners.length ;
        
        for ( var i /*int*/ = 0 ; i<l ; i++ ) 
        {
            if ( e.stop == EventPhase.STOP_IMMEDIATE ) 
            {
                break ;
            }
            
            var entry /*EventListenerEntry*/ = this._listeners[i] ;
            var listener /*EventListener*/   = entry.listener ;
            
            if( listener && ( "handleEvent" in listener ) ) 
            {
                listener.handleEvent( e ) ;
            }
            
            if ( entry.autoRemove ) 
            {
                removes.push( listener ) ;
            }
            
            if ( e.isCancelled() ) 
            {
                break ;
            }
        }
        
        // remove all "auto remove" listeners
        
        l = removes.length ;
        
        if (l > 0) 
        {
            while (--l > -1) 
            {
                this.removeListener( removes[l] ) ;
            }
        }
        
        return e ;
    }
    
    /**
     * Removes an {@code EventListener} in the group.
     * @param listener An EventListener to remove in the group of all EventListener objects if this argument is null.
     * @return true if the specific listener or all listeners are removed.
     */
    proto.removeListener = function ( listener ) /*Boolean*/ 
    {
        if ( listener && ( "handleEvent" in listener ) )
        {
            var e /*EventListenerEntry*/ ;
            var l /*int*/ = this._listeners.length ;
            while( --l > -1 ) 
            {
                e = this._listeners[l] ;
                if ( e.listener == listener ) 
                {
                    this._listeners.splice( l , 1 ) ;
                    return true ;
                }
            }
            return false ;
        }
        else if ( listener == null && this._listeners.length > 0 )
        {
            this._listeners = [] ; // remove all
            return true ;
        }
        return false ;
    }
    
    /**
     * Returns the Array representation of the group.
     * @return the Array representation of the group.
     */
    proto.toArray = function () /*uint*/ 
    {
        return this._listeners ;
    }
    
    /**
     * Returns the String representation of the group.
     * @return the String representation of the group.
     */
    proto.toString = function () /*uint*/ 
    {
        return "[EventListenerGroup]" ;
    }
    
    ///////////////////
    
    delete proto ;

}