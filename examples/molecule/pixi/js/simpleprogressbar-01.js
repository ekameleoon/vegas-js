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

    var Align = graphics.Align ;
    var Direction = graphics.Direction ;
    var EdgeMetrics = graphics.geom.EdgeMetrics ;
    var SimpleProgressbar = molecule.render.pixi.components.bars.SimpleProgressbar ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;

    body.addChild( canvas );

    var change = function( bar )
    {
        trace( "change position: " + bar.position ) ;
    }

    var bar = new SimpleProgressbar
    ({
        w         : 200 ,
        h         : 10  ,
        align     : Align.CENTER , // or Align.LEFT / Align.RIGHT
        direction : Direction.HORIZONTAL , // or Direction.VERTICAL
        padding   :  new EdgeMetrics(2,2,2,2) ,
        backgroundAlpha : 1,
        backgroundColor : 0xFFFFFF,
        barAlpha  : 1,
        barColor  : 0xFF0000
    });

    bar.changed.connect( change ) ;

    bar.x = (app.renderer.width - bar.w) * 0.5 ;
    bar.y = (app.renderer.height - bar.h) * 0.5 ;

    bar.position = 50 ;

    stage.addChild( bar )
}