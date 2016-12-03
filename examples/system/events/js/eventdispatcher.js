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

    var Event = system.events.Event;
    var EventDispatcher = system.events.EventDispatcher;
    var EventListener = system.events.EventListener;

    // ------ Click event listener

    var Click = function( name )
    {
        this.name = name ;
    }

    Click.prototype = Object.create( EventListener.prototype ,
    {
        constructor : { value : Click } ,
        handleEvent : { value : function( event )
        {
            trace( this + ' ' + this.name + ' event:' + event ) ;
        }}
    });

    var click1 = new Click( '#1') ;
    var click2 = new Click( '#2') ;

    // ------

    var select = function( event )
    {
        trace( "select event:" + event ) ;
    };

    // ------

    var dispatcher = new EventDispatcher() ;

    dispatcher.addEventListener( Event.CLICK , click1 ) ;
    dispatcher.addEventListener( Event.CLICK , click2 ) ;
    dispatcher.addEventListener( Event.CLICK , select , false , 100 ) ;

    // ------

    dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;

    // ------

    dispatcher.removeEventListener( Event.CLICK , click2 ) ;
    dispatcher.removeEventListener( Event.CLICK , select ) ;

    // ------

    dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
}