/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    // ------

    function Slot( name )
    {
        this.name = name ;
    }

    Slot.prototype = Object.create( system.signals.Receiver.prototype );
    Slot.prototype.constructor = Slot;

    Slot.prototype.receive = function ( message )
    {
        trace( this + " : " + message ) ;
    }

    Slot.prototype.toString = function ()
    {
        return "[Slot name:" + this.name + "]" ;
    }

    // ------

    var slot1 = new Slot("slot1") ;

    var slot2 = function( message )
    {
        trace( this + " : " + message ) ;
    }

    var signal = new system.signals.Signal() ;

    //signal.proxy = slot1 ;

    signal.connect( slot1 , 0 ) ;
    signal.connect( slot2 , 2 ) ;

    trace( "signal.connected : " + signal.connected() ) ;
    trace( "signal.length : "    + signal.length ) ;
    trace( "signal.hasReceiver(slot1) : " + signal.hasReceiver(slot1) ) ;
    trace( "signal.hasReceiver(slot2) : " + signal.hasReceiver(slot2) ) ;

    signal.emit( "hello world" ) ;

    signal.disconnect( slot1 ) ;

    signal.emit( "Bonjour monde" ) ;
}