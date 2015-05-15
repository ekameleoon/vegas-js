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

if( system.process.mocks.MockActionReceiver == undefined )
{
    /**
     * @requires system.process.mocks.MockTaskReceiver
     */
    require( "system.process.mocks.MockTaskReceiver" ) ;
    
    system.process.mocks.MockActionReceiver = function ( action /*CoreAction*/ ) 
    {
        this.changeCalled   = false ;
        this.clearCalled    = false ;
        this.infoCalled     = false ;
        this.infoObject     = null ;
        this.loopCalled     = false ;
        this.pauseCalled    = false ;
        this.progressCalled = false ;
        this.resumeCalled   = false ;
        this.stopCalled     = false ;
        this.timeoutCalled  = false ;
        
        system.process.mocks.MockTaskReceiver.call( this , action ) ;
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.process.mocks.MockTaskReceiver
     */
    proto = system.process.mocks.MockActionReceiver.extend( system.process.mocks.MockTaskReceiver ) ;
    
    ////////////////////////////////////
    
    proto.change = function( action /*CoreAction*/ )
    {
        this.changeCalled = true ;
        this.phase        = action.phase   ;
        this.runnin       = action.running ;
    }
    
    proto.clear = function( action /*CoreAction*/ )
    {
        this.clearCalled = true ;
        this.phase       = action.phase   ;
        this.running     = action.running ;
    }
    
    proto.info = function( action /*CoreAction*/ , info )
    {
        this.infoCalled = true ;
        this.infoObject = info ;
        this.phase      = action.phase   ;
        this.running    = action.running ;
    }
    
    proto.loop = function( action /*CoreAction*/ )
    {
        this.loopCalled = true ;
        this.phase      = action.phase   ;
        this.running    = action.running ;
    }
    
    proto.pause = function( action /*CoreAction*/ )
    {
        this.pauseCalled = true ;
        this.phase       = action.phase   ;
        this.running     = action.running ;
    }
    
    proto.progress = function( action /*CoreAction*/ )
    {
        this.progressCalled = true ;
        this.phase          = action.phase   ;
        this.running        = action.running ;
    }
    
    proto.resume = function( action /*CoreAction*/ )
    {
        this.resumeCalled = true ;
        this.phase        = action.phase   ;
        this.running      = action.running ;
    }
    
    proto.stop = function( action /*CoreAction*/ )
    {
        this.stopCalled = true ;
        this.phase      = action.phase   ;
        this.running    = action.running ;
    }
    
    proto.timeout = function( action /*CoreAction*/ )
    {
        this.timeoutCalled = true ;
        this.phase         = action.phase   ;
        this.running       = action.running ;
    }
    
    ////////////////////////////////////
    
    proto.register = function( action /*CoreAction*/ ) /*void*/
    {
        system.process.mocks.MockTaskReceiver.prototype.register.call(this, action) ;
        if ( this.task )
        {
            this.task.changeIt.connect( this.change.bind( this ) ) ;
            this.task.clearIt.connect( this.clear.bind( this ) ) ;
            this.task.infoIt.connect( this.info.bind( this ) ) ;
            this.task.loopIt.connect( this.loop.bind( this ) ) ;
            this.task.pauseIt.connect( this.pause.bind( this ) ) ;
            this.task.progressIt.connect( this.progress.bind( this ) ) ;
            this.task.resumeIt.connect( this.resume.bind( this ) ) ;
            this.task.stopIt.connect( this.stop.bind( this ) ) ;
            this.task.timeoutIt.connect( this.timeout.bind( this ) ) ;
        }
    }
    
    proto.unregister = function() /*void*/
    {
        if ( this.task )
        {
            this.task.changeIt.disconnect() ;
            this.task.clearIt.disconnect() ;
            this.task.infoIt.disconnect() ;
            this.task.loopIt.disconnect() ;
            this.task.pauseIt.disconnect() ;
            this.task.progressIt.disconnect() ;
            this.task.resumeIt.disconnect() ;
            this.task.stopIt.disconnect() ;
            this.task.timeoutIt.disconnect() ;
        }
        system.process.mocks.MockTaskReceiver.prototype.unregister.call(this) ;
    }
    
    ////////////////////////////////////
    
    delete proto ;
}