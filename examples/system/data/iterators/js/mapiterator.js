/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var trace  = vegas.trace  ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var map = new system.data.maps.ArrayMap() ;

    map.set("key1", "value1") ;
    map.set("key2", "value2") ;
    map.set("key3", "value3") ;

    trace( '> ' + map ) ;

    var it = map.iterator() ;
    while( it.hasNext() )
    {
        trace (it.next() + " : " + it.key()) ;
        if( it.key() === "key2" )
        {
            it.delete() ;
        }
    }

    trace( '> ' + map ) ;
}