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
 * The EventPhase class provides values for the eventPhase property of the Event class.
 */
if ( system.events.EventPhase == undefined ) 
{
    /**
     * Creates the EventPhase singleton.
     */
    system.events.EventPhase = {} ;
    
    /**
     * The target phase, which is the second phase of the event flow (2).
     */
    system.events.EventPhase.AT_TARGET /*Number*/ = 2 ;
    
    /**
     * The bubbling phase, , which is the third phase of the event flow (3).
     */
    system.events.EventPhase.BUBBLING_PHASE /*Number*/ = 3 ;
    
    /**
     * The capturing phase, which is the first phase of the event flow (1).
     */
    system.events.EventPhase.CAPTURING_PHASE /*Number*/ = 1 ;
    
    /**
     * The default phase(0)
     */
    system.events.EventPhase.NONE /*Number*/ = 0 ;
    
    /**
     * Stop the phase in progress (4). Use only by the Event and EventDispatcher class.
     */
    system.events.EventPhase.STOP /*Number*/ = 8 ;
    
    /**
     * Stop the phase immediately (4). Use only by the Event and EventDispatcher class.
     */
    system.events.EventPhase.STOP_IMMEDIATE /*Number*/ = 10 ;
}