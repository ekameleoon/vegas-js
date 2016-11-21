/* globals vegas */
/*jshint bitwise: false*/
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

window.onload = function()
{
    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var count = 0 ;
    var total = 50 ;
    var cur  = performance.now() ;
    var time = performance.now() ;

    var test = function()
    {
        if( count++ < total )
        {
            cur = performance.now() - cur ;
            console.log("----- " + cur) ;
            requestAnimationFrame( test ) ;
        }
        else
        {
            time = performance.now() - time ;
            console.log( "finish time:" + time ) ;
        }
    }

    test() ;

}