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

    trace ("map : " + map) ;

    trace ("------ iterator") ;

    var iterator = map.iterator() ;
    while (iterator.hasNext())
    {
        trace (iterator.next() + " : " + iterator.key()) ;
    }

    trace( 'values : ' + map.values()) ;
    trace( map.has('key2')) ;
    trace( map.get('key2') ) ;
    trace( map.indexOfKey('key2')) ;

    map.delete( 'key2' ) ;

    trace ("------ forEach") ;

    map.forEach( function( value , key , map )
    {
        trace( "map[" + key + "] = " + value + " in " + map );
    });
}