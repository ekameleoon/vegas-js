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

    var alignments =
    [
        Align.TOP_LEFT , Align.TOP , Align.TOP_RIGHT ,
        Align.RIGHT , Align.CENTER, Align.LEFT ,
        Align.BOTTOM_LEFT , Align.BOTTOM, Align.BOTTOM_RIGHT
    ];

    var count = 0 ;

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;

    body.addChild( canvas );

    var cell = new Background
    ({
        w : 200 ,
        h : 200 ,
        fill : new FillStyle( 0xFF0000 ) ,
        line : new LineStyle( 2 , 0xFFFFFF)
    });

    cell.x = app.renderer.width  * 0.5 ;
    cell.y = app.renderer.height * 0.5 ;

    cell.align = Align.CENTER ; // see graphics.Align

    cell.interactive = true ;
    cell.buttonMode  = true ;

    cell.pointerdown = function()
    {
        cell.align = alignments[count++] ;
        if( count === alignments.length )
        {
            count = 0 ;
        }
    }

    stage.addChild( cell ) ;
}