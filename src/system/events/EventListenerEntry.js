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
 * Internal class in the {@code EventDispatcher} class to register in an {@code EventCollection} an {@code EventListener}.
 */
if (system.events.EventListenerEntry == undefined) 
{
    /**
     * Creates a new EventListenerEntry instance.
     * @param listener The EventListener reference.
     * @param capture Indicates if the listener use capture flow event or not.
     * @param priority The priority value of the entry.
     * @param autoRemove Indicates if the listener must be removed when the listener handle the first time an event.
     */
    system.events.EventListenerEntry = function ( listener /*EventListener*/ , priority /*uint*/ , autoRemove /*Boolean*/ , capture /*Boolean*/  ) 
    {
        this.listener   = listener ;
        this.autoRemove = Boolean( autoRemove ) ;
        this.capture    = Boolean( capture ) ;
        this.priority   = priority > 0 ? Math.ceil( priority ) : 0 ;
    }
    
    ///////////////////
    
    /**
     * @extends Object
     */
    proto = system.events.EventListenerEntry.extend( Object ) ;
    
    ///////////////////
    
    /**
     * Indicates if the listener must be removed when the listener handle the first time an event.
     */
    proto.autoRemove /*Boolean*/ = false ;
    
    /**
     * Determinates if the listener use capture flow event or not.
     */
    proto.capture /*Boolean*/ = false ;
    
    /**
     * The listener reference of this entry.
     */
    proto.listener /*EventListener*/ ;
    
    /**
     * Determinates the priority value of the entry.
     */
    proto.priority /*uint*/ =  0 ;
    
    ///////////////////
    
    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    proto.toString = function() /*String*/
    {
        return "[EventListenerEntry listener:" + (this.listener || "null") + " capture:" + this.capture + " priority:" + this.priority + " autoRemove:" + this.autoRemove + "]" ;
    }
    
    ///////////////////
    
    delete proto ;
}