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
 * Delegate the scope of an EventListener or a specific Function. 
 * <p>You can instantiate and keep in memory a reference of a Delegate instance.</p>
 * <p>Note :
 * <li>The {@code Delegate} class implements {@code EventListener} interface. you can use a Delegate instances in the {@code addEventListener} method for all {@code EventTarget} implementations.</li>
 * <li>The {@code Delegate} class implements {@code Runnable} interface</li>
 * </p>
 * <p><b>Example 1</b></p>
 * {@code
 * var o = {} ;
 * o.toString = function () 
 * {
 *     return "[myObject]" ;
 * }
 * 
 * var action = function () 
 * {
 *     trace( this + " action : " + Array.fromArguments( arguments ) ) ;
 * }
 * 
 * var proxy = system.events.Delegate.create(o, action, "arg3") ;
 * proxy("arg1", "arg2") ; // [myObject] action : arg1,arg2,arg3
 * }
 * <p><b>Example 2</b></p>
 * {@code
 * var proxy = new system.events.Delegate(o, action, "arg3") ;
 * proxy.run("arg1", "arg2") ; // [myObject] action : arg3,arg1,arg2
 * }
 */
if ( system.events.Delegate == undefined ) 
{
    /**
     * @requires system.events.EventListener
     */
    require("system.events.EventListener") ;
    
    /**
     * Creates a new Delegate instance.
     * @param scope the scope to be used by calling this method.
     * @param method the method to be executed.
     */
    system.events.Delegate = function( scope , method /*, [arg1, arg2, ..., argN]*/ ) 
    {
        if ( scope == null )
        {
            throw new Error( "Delegate constructor failed, the scope argument not must be null.") ;
        }
        
        if ( method == null && !( method instanceof Function) )
        {
            throw new Error( "Delegate constructor failed, the method argument not must be null and must be a Function." ) ;
        }
        
        this._s = scope ;
        this._m = method ;
        
        this._a = Array.fromArguments(arguments) ;
        this._a.splice( 0 , 2 )  ;
        
        this._p = this._m.bind.apply( this._m , [this._s].concat(this._a) ) ;
    }
    
    /////////////
    
    /**
     * Creates a method that delegates its arguments to a specified scope.
     * <p><b>Example :</b></p>
     * <pre>
     * var scope =
     * {
     *     toString : function(){ return "scope" } 
     * }
     * 
     * var method = function()
     * {
     *     trace( this + " method [" + Array.fromArguments(arguments) + "]" ) ;
     * }
     * 
     * var action = system.events.Delegate.create( scope , method , 4 , 5 , 6 ) ;
     * 
     * action(1,2,3) ; // scope method [4,5,6,1,2,3]
     * </pre>
     * @param scope this scope to be used by calling this method.
     * @param method the method to be called.
     * @return A Function that delegates its call to a custom scope, method and arguments.
     */
    system.events.Delegate.create = function ( scope /*Object*/ , method /*Function*/ ) /*Function*/ 
    {
        var args = Array.fromArguments( arguments ) ;
        args.splice( 1 , 1 )  ;
        return method.bind.apply( method , args ) ;
    }
    
    /////////////
    
    /**
     * @extends system.events.EventListener
     */ 
    proto = system.events.Delegate.extend( system.events.EventListener ) ;
    
    /**
     * Add arguments to proxy method.
     */
    proto.addArguments = function (/*[arg1, arg2, ..., argN]*/) 
    {
        var args = Array.fromArguments(arguments) ;
        if (args.length > 0) 
        {
            this._a = this._a.concat( args ) ;
            this._p = this._m.bind.apply( this._m , [this._s].concat(this._a) ) ;
        }
    }
    
    /**
     * Returns a shallow copy of the instance. 
     * @return a shallow copy of the instance.
     */
    proto.clone = function () 
    {
        var delegate = new system.events.Delegate( this._s , this._m ) ;
        delegate.setArguments.call( delegate , this._a ) ;
        return delegate ;
    }
    
    /**
     * Returns the array of all arguments called in the proxy method.
     * @return the array of all arguments called in the proxy method.
     */
    proto.getArguments = function () /*Array*/ 
    {
        return this._a ;
    }
    
    /**
     * Returns the proxy method reference.
     * @return the proxy method reference.
     */
    proto.getMethod = function () /*Function*/ 
    {
        return this._m ;
    }
    
    /**
     * Returns the scope reference.
     * @return the scope reference.
     */
    proto.getScope = function () /*Object*/ 
    {
        return this._s ;
    }
    
    /**
     * Handles the event.
     */
    proto.handleEvent = function ( e /*Event*/ ) 
    {
        var args = [e] ;
        if( this._a && this._a.length > 0 )
        {
            args = args.concat( this._a ) ;
        }
        this._m.apply( this._s, args ) ;
    }
    
    /**
     * Run the proxy method in the provided context. 
     */
    proto.run = function() 
    {
        var args = Array.fromArguments(arguments) ;
        if ( args.length > 0 )
        {
            this.addArguments.apply( this , args ) ;
        }
        this._p() ;
    }
    
    /**
     * Sets or change arguments of proxy method.
     */
    proto.setArguments = function() 
    {
        this._a = [] ;
        var args = Array.fromArguments(arguments) ;
        if (args.length > 0) 
        {
            this._a = this._a.concat( args ) ;
        }
        this._p = this._m.bind.apply( this._m , [ this._s ].concat( this._a ) ) ;
    }
    
    ////////////////////
    
    proto.__defineGetter__( "arguments" , proto.getArguments ) ;
    
    proto.__defineGetter__( "method"    , proto.getMethod    ) ;
    
    proto.__defineGetter__( "scope"     , proto.getScope     ) ;
    
    ////////////////////
    
    delete proto ;
}
