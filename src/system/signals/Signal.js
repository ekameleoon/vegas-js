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
 * This class provides the concrete Signaler implementation, an object who communicates by signals.
 */
if ( system.signals.Signal == undefined ) 
{
    /**
     * @requires system.signals.Signaler
     */
    require( "system.signals.Signaler" ) ;
    
    /**
     * @requires system.signals.Receiver
     */
    require( "system.signals.Receiver" ) ;
    
    /**
     * Creates a new Signal instance.
     * <p><b>Example :</b></p>
     * <pre>
     * Slot = function( name )
     * {
     *     this.name = name ;
     * }
     * 
     * Slot.extend( system.signals.Receiver ) ;
     * 
     * Slot.prototype.receive = function ( message ) 
     * {
     *     trace( this + " : " + message ) ;
     * }
     * 
     * Slot.prototype.toString = function () 
     * {
     *     return "[Slot name:" + this.name + "]" ;
     * }
     * 
     * slot1 = new Slot("slot1") ;
     * 
     * slot2 = function( message )
     * {
     *     trace( this + " : " + message ) ;
     * }
     * 
     * var signal = new system.signals.Signal() ;
     * 
     * //signal.proxy = slot1 ;
     * 
     * signal.connect( slot1 , 0 ) ;
     * signal.connect( slot2 , 2 ) ;
     * 
     * signal.emit( "hello world" ) ;
     * </pre>
     * @param types An optional Array who contains any number of class references that enable type checks in the "emit" method. 
     * If this argument is null the "emit" method not check the types of the parameters in the method.
     * @param receivers The Array collection of receiver objects to connect with this signal.
     */
    system.signals.Signal = function ( types /*Array*/ , receivers /*Array*/ ) 
    {
        this.receivers = [] ;
        this.setTypes( types ) ;
        if ( receivers != null )
        {
            var l = receivers.length ;
            for( var i = 0 ; i<l ; i++ )
            {
                this.connect( receivers[i] );
            }
        }
    }
    
    ////////////////////////////////////
    
    /**
     * @extends system.signals.Signaler
     */
    proto = system.signals.Signal.extend( system.signals.Signaler ) ;
    
    ////////////////////////////////////
    
    /**
     * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
     */
    proto.proxy = null ;
    
    /**
     * Checks all values passed-in the emit method.
     */
    proto.checkValues = function( values /*Array*/ ) /*void*/
    {
        if ( this._types )
        {
            if ( values.length == this._types.length )
            {
                var val ;
                var tof /*String*/;
                var l = values.length ;
                if ( l == 0 )
                {
                    return ;
                }
                for( var i = 0 ; i<l ; i++ )
                {
                    if ( !this._typesMatch( values[i] , this._types[i] ) )
                    {
                        throw new Error( String.format( system.signals.SignalStrings.INVALID_PARAMETER_TYPE , i, this._types[i] , getConstructorPath( values[i] ) ) ) ;
                    }
                }
            }
            else
            {
                 throw new Error( String.format( system.signals.SignalStrings.INVALID_PARAMETERS_LENGTH , this._types.length , values.length ) ) ;
            }
        }
    }
    
    /**
     * Connects a Function or a Receiver object.
     * @param receiver The receiver to connect : a Function reference or a Receiver object.
     * @param priority Determinates the priority level of the receiver.
     * @param autoDisconnect Apply a disconnect after the first trigger
     * @return <code>true</code> If the receiver is connected with the signal emitter.
     */
    proto.connect = function ( receiver , priority /*uint*/ , autoDisconnect /*Boolean*/ ) /*Boolean*/ 
    {
        if ( receiver == null )
        {
            return false ;
        }
        
        autoDisconnect = Boolean( autoDisconnect ) ;
        priority       = priority > 0 ? Math.ceil(priority) : 0 ;
        
        if ( ( typeof(receiver) == "function" ) || ( receiver instanceof Function ) || ( receiver instanceof system.signals.Receiver ) || ( "receive" in receiver ) ) 
        {
            if ( this.hasReceiver( receiver ) )
            {
                return false ;
            }
            
            this.receivers.push( new system.signals.SignalEntry( receiver , priority , autoDisconnect ) ) ;
            
            /////// bubble sorting
            
            var i ;
            var j ;
            
            var a = this.receivers ;
            
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
     * Returns <code>true</code> if one or more receivers are connected.
     * @return <code>true</code> if one or more receivers are connected.
     */
    proto.connected = function () /*Boolean*/ 
    {
        return this.receivers.length > 0 ;
    }
    
    /**
     * Disconnect the specified object or all objects if the parameter is null.
     * @return <code>true</code> if the specified receiver exist and can be unregister.
     */
    proto.disconnect = function ( receiver ) /*Boolean*/ 
    {
        if ( receiver == null )
        {
            if ( this.receivers.length > 0 )
            { 
                this.receivers = [] ;
                return true ;
            }
            else
            {
                return false ;
            }
        }
        if ( this.receivers.length > 0 )
        {
            var l /*int*/ = this.receivers.length ;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver == receiver )
                {
                    this.receivers.splice( l , 1 ) ;
                    return true ;
                }
            }
        }
        return false ;
    }
    
    /**
     * Emit the specified values to the receivers.
     * @param ...values All values to emit to the receivers.
     */
    proto.emit = function( /*Arguments*/ ) /*void*/
    {
        var values = Array.fromArguments( arguments ) ;
        
        if ( this.receivers.length == 0 )
        {
            return ;
        }
        
        this.checkValues( values ) ;
        
        var i /*int*/ ;
        var l /*int*/ = this.receivers.length ;
        var r /*Array*/ = [] ;
        var a /*Array*/ = this.receivers.slice() ;
        var e /*SignalEntry*/ ;
        
        var slot ;
        
        for ( i = 0 ; i < l ; i++ ) 
        {
            e = a[i] ;
            if ( e.auto )
            {
                r.push( e )  ;
            }
        }
        if ( r.length > 0 )
        {
            l = r.length ;
            while( --l > -1 )
            {
                i = this.receivers.indexOf( r[l] ) ;
                if ( i > -1 )
                {
                    this.receivers.splice( i , 1 ) ;
                }
            }
        }
        l = a.length ;
        for ( i = 0 ; i<l ; i++ ) 
        {
            slot = a[i].receiver ;
            
            if( slot instanceof Function || typeof(receiver) == "function" )
            {
                slot.apply( this.proxy , values ) ;
            }
            else if ( slot instanceof system.signals.Receiver || "receive" in slot )
            {
                slot.receive.apply( this.proxy || slot , values ) ;
            }
        }
    }
    
    
    /**
     * Indicates the number of receivers connected.
     */
    proto.getLength = function () /*uint*/ 
    {
        return this.receivers.length ;
    }
    
    /**
     * Determinates the optional Array representation of all valid types of this signal. 
     * If this property is null the signal don't use type validation. 
     */
    proto.getTypes = function() /*Array*/
    {
        return this._types ;
    }
    
    /**
     * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
     * @return <code class="prettyprint">true</code> if the specified receiver is connected.
     */
    proto.hasReceiver = function ( receiver ) /*Boolean*/ 
    {
        if ( receiver == null )
        {
            return false ;
            
        }
        if ( this.receivers.length > 0 )
        {
            var l /*int*/ = this.receivers.length ;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver == receiver )
                {
                    return true ;
                }
            }
        }
        return false ;
    }
    
    /**
     * Sets the optional Array representation of all valid types of this signal. 
     * If the passed-in Array in argument is null or empty the signal don't use type validation. 
     */
    proto.setTypes = function( ar /*Array*/ ) /*void*/
    {
        this._types = null ;
        if ( ar )
        {
            var l /*int*/ = ar.length ;
            for( var i /*int*/ = 0 ; i<l ; i++ )
            {
                if
                ( 
                    ar[i] instanceof Function 
                    || ar[i] == "string" 
                    || ar[i] == "number" 
                    || ar[i] == "boolean" 
                )
                {
                    continue ;
                }
                throw new Error( String.format( system.signals.SignalStrings.INVALID_TYPES , i , ar[i] ) ) ;
            }
            this._types = ar.slice() ;
        }
    }
    
    /**
     * Returns the Array representation of all receivers connected with the signal.
     * @return the Array representation of all receivers connected with the signal.
     */
    proto.toArray = function() /*Array*/
    {
        var r /*Array*/ = [] ;
        if ( this.receivers.length > 0 )
        {
            var l /*int*/ = this.receivers.length ;
            for( var i /*int*/ = 0 ; i<l ; i++ )
            {
                r.push( this.receivers[i].receiver ) ;
            }
        }
        return r ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return "[" + this.getConstructorName() + "]" ;
    }
    
    //////////////////////////////////// private
    
    /**
     * The Array representation of all receivers.
     * @private
     */
    proto.receivers /*Array*/ = null ;
    
    /**
     * @private
     */
    proto._types /*Array*/ = null ;
    
    /**
     * @private
     */
    proto._typesMatch = function( o , type ) /*Boolean*/
    {
        if ( type == String || type == "string" )
        {
            return typeof(o) == "string" || o instanceof String ;
        }
        else if ( type == Boolean || type == "boolean" )
        {
            return typeof(o) == "boolean" || o instanceof Boolean ;
        }
        else if ( type == Number || type == "number" )
        {
            return typeof(o) == "number" || o instanceof Number ;
        }
        else
        {
            return o instanceof type ; 
        }
    }
    
    //////////////////////////////////// Virtual properties
    
    proto.__defineGetter__( "length" , proto.getLength ) ;
    
    proto.__defineGetter__( "types" , proto.getTypes ) ;
    proto.__defineSetter__( "types" , proto.setTypes ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}