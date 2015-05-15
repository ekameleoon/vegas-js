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
 * This interface represents the methods implemented in the task.
 */
if ( system.process.Action == undefined) 
{
    /**
     * @requires system.process.Runnable
     */
    require( "system.process.Runnable" ) ;
    
    /**
     * Creates a new Action instance.
     */
    system.process.Action = function () 
    { 
        //
    }
    
    ////////////////////////////////////
    
    /**
     * @extends Object
     */
    proto = system.process.Action.extend( system.process.Runnable ) ;
    
    ////////////////////////////////////
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.clone = function()
    {
        return new system.process.Action() ;
    }
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.getFinishIt = function() /*Signaler*/
    {
        //
    }
    
    /**
     * The current phase of the action.
     * @see system.process.TaskPhase
     */
    proto.getPhase = function() /*String*/
    {
        //
    }
    
    /**
     * Indicates <code class="prettyprint">true</code> if the process is in progress.
     */
    proto.getRunning = function() /*Boolean*/
    {
        //
    }
    
    /**
     * This signal emit when the notifyFinished method is invoked.
     */
    proto.getStartIt = function() /*Signaler*/
    {
        //
    }
    
    /**
     * Notify when the process is finished.
     */
    proto.notifyFinished = function() /*Boolean*/
    {
        //
    }
    
    /**
     * Notify when the process is started.
     */
    proto.notifyStarted = function() /*void*/
    {
        //
    }
    
    /**
     * This signal who emit when the notifyFinished method is invoked.
     */
    proto.setFinishIt = function( signal /*Signaler*/ ) /*void*/
    {
        //
    }
    
    /**
     * Sets the signal who emit when the notifyStarted method is invoked.
     */
    proto.setStartIt = function( signal /*Signaler*/ ) /*void*/
    {
        //
    }
    
    ////////////////////////////////////
    
    delete proto ;
}