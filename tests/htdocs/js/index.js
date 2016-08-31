/* globals vegas */
( function( vegas )
{
    "use strict" ;

    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var trace  = vegas.trace ;
    var system = vegas.system ;
    var core   = vegas.core ;

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

    var slot1 = new Slot("slot1") ;

    var slot2 = function( message )
    {
        trace( this + " : " + message ) ;
    }

    var signal = new system.signals.Signal() ;

    //signal.proxy = slot1 ;

    signal.connect( slot1 , 0 ) ;
    signal.connect( slot2 , 2 ) ;

    console.info( "connected: " + signal.length ) ;

    var uuid = core.random.generateUUID() ;

    signal.emit( uuid ) ;

})( vegas );