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

if( system.process.mocks.MockTaskReceiver == undefined )
{
    system.process.mocks.MockTaskReceiver = function ( task /*Task*/ ) 
    {
        this.finishCalled  = false ;
        this.startCalled   = false ;
        
        this.phase         = null ;
        this.running       = false ;
        
        if ( task )
        {
            this.register( task ) ;
        }
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.Receiver
     */
    proto = system.process.mocks.MockTaskReceiver.extend( system.process.Receiver ) ;
    
    ////////////////////////////////////
    
    proto.finish = function( task /*Task*/ )
    {
        this.finishCalled = true ;
        this.phase        = task.phase   ;
    }
    
    proto.start = function( task /*Task*/ )
    {
        this.startCalled = true ;
        this.phase       = task.phase   ;
        this.running     = true ;
    }
    
    proto.register = function( task /*Task*/ ) /*void*/
    {
        this.task = task ;
        this.task.finishIt.connect( this.finish.bind( this ) ) ;
        this.task.startIt.connect( this.start.bind( this ) ) ;
    }
    
    proto.unregister = function() /*void*/
    {
        if ( this.task )
        {
            this.task.finishIt.disconnect() ;
            this.task.startIt.disconnect() ;
            this.task = null  ;
        }
    }
    
    ////////////////////////////////////
    
    delete proto ;
}