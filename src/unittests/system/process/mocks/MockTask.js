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
 * This mock simulate an Action object who increments a static counter "COUNT" when the run method of all instance of this class are called.
 */
if( system.process.mocks.MockTask == undefined )
{
    /**
     * Creates a new MockTask instance.
     */
    system.process.mocks.MockTask = function ( id , verbose ) 
    {
        system.process.Task.call(this) ;
        this.id      = id ;
        this.verbose = Boolean( verbose ) ;
    }
    
    ////////////////////////////////////
    
    system.process.mocks.MockTask.COUNT = 0 ;
    
    system.process.mocks.MockTask.reset = function() /*void*/
    {
        system.process.mocks.MockTask.COUNT = 0 ;
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.Task
     */
    proto = system.process.mocks.MockTask.extend( system.process.Task ) ;
    
    ////////////////////////////////////
    
    /**
     * The id of the object.
     */
    proto.id = null ;
    
    /**
     * The verbose flag.
     */
    proto.verbose = false ;
    
    ////////////////////////////////////
    
    proto.clone = function() /*void*/
    {
        return new MockTask( this.id, this.verbose) ;
    }
    
    proto.run = function( action /*CoreAction*/ )
    {
        this.notifyStarted() ;
        if ( this.verbose )
        {
            trace( this + " run :: " + system.process.mocks.MockTask.COUNT + (this.id != null ? " id:" + this.id : "" ) ) ;
        }
        system.process.mocks.MockTask.COUNT ++ ;
        this.notifyFinished() ;
    }
    
    proto.toString = function() /*String*/
    {
        var str = "[MockTask" ;
        if ( this.id != null )
        {
            str += " " + this.id ;
        } 
        str += "]" ;
        return str ;
    }
    
    ////////////////////////////////////
    
    delete proto ;
}