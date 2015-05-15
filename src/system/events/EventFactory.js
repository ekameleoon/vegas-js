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
 * This factory class creates and returns Event's object.
 */
if ( system.events.EventFactory == undefined ) 
{
    /**
     * Creates the EventFactory singleton.
     */
    system.events.EventFactory = {} ;
    
    /**
     * Creates a new Event's object.
     * @param event If this object is a {@code String} this value is the type of the new event or this argument is an Event object or a generic object to creates a new Event.
     * @param target (optional) The scope of the target of the new Event.
     * @param context (optional) The context of the new Event.
     */
    system.events.EventFactory.create = function ( event , target /*EventTarget*/ , context /*Object*/ ) /*Event*/ 
    {
        var e /*Event*/ = null ;
        if ( event instanceof system.events.Event ) 
        {
            e = event ;
            if ( target != null ) 
            {
                e.setTarget( target ) ;
            }
            if ( context != null ) 
            {
                e.setContext( context ) ;
            }
        } 
        else if ( typeof(event) == "string" || o instanceof String ) 
        {
            e = new system.events.Event( event , target , context ) ;
        } 
        else if ( "type" in event ) 
        {
            e = new system.events.Event( event.type , event.target , event.context ) ;
        }
        if ( e && e.getCurrentTarget() == null ) 
        {
            e.setCurrentTarget( e.getTarget() ) ;
        }
        return e ;
    }
}