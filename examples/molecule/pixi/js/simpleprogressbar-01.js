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
    var FillStyle = graphics.FillStyle ;
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

    var bar1 = new SimpleProgressbar
    ({
        w         : 200 ,
        h         : 10  ,
        align     : Align.CENTER,
        barAlign  : Align.CENTER , // or Align.LEFT or Align.RIGHT
        direction : Direction.HORIZONTAL ,
        padding   : new EdgeMetrics(2,2,2,2) ,
        fill      : new FillStyle( 0xFFFFFF ) ,
        barFill   : new FillStyle( 0xFF0000 )
    });

    bar1.changed.connect( change ) ;

    bar1.x = app.renderer.width  * 0.5 ;
    bar1.y = app.renderer.height * 0.5 ;

    bar1.position = 50 ;

    stage.addChild( bar1 ) ;

    // ------- VERTICAL

    var bar2 = new SimpleProgressbar
    ({
        w         : 10 ,
        h         : 200  ,
        x         : 10 ,
        y         : 10 ,
        barAlign  : Align.BOTTOM , // or Align.TOP or Align.CENTER
        direction : Direction.VERTICAL ,
        padding   : new EdgeMetrics(2,2,2,2) ,
        position  : 50 ,
        fill      : new FillStyle( 0xFFFFFF ) ,
        barFill   : new FillStyle( 0xFF22A3 )
    });

    stage.addChild( bar2 ) ;

    // ------- TEST

    var tween1 = new system.transitions.Tween
    ({
        auto       : false,
        duration   : 100 ,
        useSeconds : false ,
        easing     : core.easings.bounceOut,
        target     : bar1 ,
        from       : { position : 0 } ,
        to         : { position : 100 }
    }) ;

    var tween2 = new system.transitions.Tween
    ({
        auto       : false,
        duration   : 100 ,
        useSeconds : false ,
        easing     : core.easings.sineOut,
        target     : bar2 ,
        from       : { position : 0 } ,
        to         : { position : 100 }
    }) ;

    tween1.run() ;
    tween2.run() ;
}