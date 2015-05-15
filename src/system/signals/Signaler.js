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
 * Provides an object who communicates by signals. 
 */
if ( system.signals.Signaler == undefined ) 
{
    /**
     * Creates a new Signaler instance.
     */
    system.signals.Signaler = function () {}
    
    /**
     * @extends Object
     */
    proto = system.signals.Signaler.extend( Object ) ;
    
    /**
     * Connects a Function or a Receiver object.
     * @param receiver The receiver to connect : a Function reference or a Receiver object.
     * @param priority Determinates the priority level of the receiver.
     * @param autoDisconnect Apply a disconnect after the first trigger
     * @return <code>true</code> If the receiver is connected with the signal emitter.
     */
    proto.connect = function ( receiver , priority /*uint*/ , autoDisconnect /*Boolean*/ ) /*uint*/ 
    {
        // 
    }
    
    /**
     * Returns <code>true</code> if one or more receivers are connected.
     * @return <code>true</code> if one or more receivers are connected.
     */
    proto.connected = function () /*Boolean*/ 
    {
        // 
    }
    
    /**
     * Disconnect the specified object or all objects if the parameter is null.
     * @return <code>true</code> if the specified receiver exist and can be unregister.
     */
    proto.disconnect = function ( receiver ) /*Boolean*/ 
    {
        // 
    }
    
    /**
     * Emit the specified values to the receivers.
     * @param ...values All values to emit to the receivers.
     */
    proto.emit = function ( ) /*void*/ 
    {
        // 
    }
    
    /**
     * Indicates the number of receivers connected.
     */
    proto.getLength = function ( ) /*uint*/ 
    {
        // 
    }
    
    /**
     * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
     * @return <code class="prettyprint">true</code> if the specified receiver is connected.
     */
    proto.hasReceiver = function ( receiver ) /*Boolean*/ 
    {
        // 
    }
    
    ////////////////////////////////////
    
    delete proto ;
}