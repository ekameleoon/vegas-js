/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

// use the skipHello method to skip the vegas library prompt message.
// vegas.skipHello() ;

window.onload = function()
{
    // ---------------- Dependencies

    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var graphics = vegas.graphics   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line
    var molecule = vegas.molecule ; // jshint ignore:line

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;

    var Align      = graphics.Align ;
    var Background = molecule.render.pixi.display.Background ;
    var FillStyle  = graphics.FillStyle ;
    var LineStyle  = graphics.LineStyle ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;

    body.addChild( canvas );

    var background = new Background
    ({
        w : 200 ,
        h : 200 ,
        fill : new FillStyle( 0xFF0000 ) ,
        line : new LineStyle( 2 , 0xFFFFFF)
    });

    background.x = app.renderer.width  * 0.5 ;
    background.y = app.renderer.height * 0.5 ;

    background.align = Align.CENTER ; // see graphics.Align

    stage.addChild( background ) ;
}