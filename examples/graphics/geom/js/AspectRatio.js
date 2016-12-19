/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    // ----- imports

    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var graphics = vegas.graphics ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line

    var AspectRatio = graphics.geom.AspectRatio ;

    var ar ;

    trace("------ AspectRatio(320,240)") ;

    ar = new AspectRatio(320,240) ;
    trace('> ' + ar) ; // 4:3

    ar.verbose = true ;
    trace('> ' + ar) ; // [AspectRatio width:320, height:240, ratio:[4:3]]

    ar.lock() ;

    ar.width = 640 ;
    trace('> ' + ar) ; // [AspectRatio width:640, height:480, ratio:[4:3]]

    ar.height = 120 ;
    trace('> ' + ar) ; // [AspectRatio width:160, height:120, ratio:[4:3]]

    ar.unlock() ;

    ar.width = 320 ;
    trace('> ' + ar) ; // [AspectRatio width:320, height:120, ratio:[8:3]]

    trace("------ AspectRatio(1680,1050)") ;

    ar = new AspectRatio(1680,1050) ;

    trace('> ' + ar) ; // 8:5

    ar.verbose = true ;

    trace('> ' + ar) ; // [AspectRatio width:1680, height:1050, ratio:[8:5]]

    trace("------ AspectRatio(0,0)") ;

    ar = new AspectRatio(0) ;

    trace('> ' + ar) ; // 0:0

    ar.verbose = true ;

    trace('> ' + ar) ; // [AspectRatio width:0, height:0, ratio:[0:0]]
}


