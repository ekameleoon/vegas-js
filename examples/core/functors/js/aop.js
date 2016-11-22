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

    var scope = { toString : function() { return "scope" ; } } ;

    var sum = function(x, y)
    {
        console.info( this + " calculating...")
        return x + y;
    }

    function begin()
    {
        trace("--- begin") ;
    }

    function end()
    {
        trace("--- end") ;
    }

    var result = core.functors.aop(sum, begin, end, scope)(3, 5) ;

    console.log( "--- result : " + result ) ;
}