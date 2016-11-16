/* globals vegas*/
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

    //vegas.skipHello();

    var o1 = { id : "key1" } ;
    var o2 = { id : "key2" } ;
    var o3 = { id : "key3" } ;
    var o4 = { id : "key1" } ;

    var dump  = core.dump ;
    var model = new system.models.maps.MapModel();

    var added = function( entry , model )
    {
        trace( "[+] added entry:" + dump(entry) + " size:" + model.length ) ;
    }

    var beforeChanged = function( entry , model )
    {
        trace( "[--] before:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
    }

    var changed = function( entry , model )
    {
        trace( "[++] change:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
    }

    var cleared = function( model )
    {
        trace( "[x] clear current:" + model.current + " size:" + model.length ) ;
    }

    var removed = function( entry , model )
    {
        trace( "[-] removed entry:" + dump(entry) + " size:" + model.length ) ;
    }

    var updated = function( entry , model )
    {
        trace( "[u] update entry:" + dump(entry) + " size:" + model.length ) ;
    }

    model.added.connect( added ) ;
    model.beforeChanged.connect( beforeChanged ) ;
    model.changed.connect( changed ) ;
    model.cleared.connect( cleared ) ;
    model.removed.connect( removed ) ;
    model.updated.connect( updated ) ;

    model.add( o1 ) ;
    model.add( o2 ) ;
    model.add( o3 ) ;

    trace( "#  model.get('key1') == o1 : " + ( model.get("key1") === o1 ) ) ;
    trace( "#  model.get('key1') == o4 : " + ( model.get("key1") === o4 ) ) ;

    model.update( o4 ) ;

    model.current = o1 ;
    model.current = o2 ;

    model.remove( o1 ) ;

    model.clear() ;
}