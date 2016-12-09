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

    var ArrayIterator = system.data.iterators.ArrayIterator ;

    var ar = ["item1", "item2", "item3", "item4"] ;

    var it = new ArrayIterator(ar) ;

    while (it.hasNext())
    {
        trace (it.next()) ;
    }

    trace ("--- it reset") ;

    it.reset() ;

    while (it.hasNext())
    {
        trace (it.next() + " : " + it.key()) ;
    }

    trace ("--- it seek 2") ;

    trace( ar.length ) ;
    it.seek(2) ;
    while (it.hasNext())
    {
        trace (it.next()) ;
        it.delete() ;
    }
    trace( ar.length ) ;

    trace ("---") ;

}