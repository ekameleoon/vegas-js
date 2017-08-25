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
    var ScrollIndicator = molecule.render.pixi.components.bars.ScrollIndicator ;

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

    var bar1 = new ScrollIndicator
    ({
        w         : 200 ,
        h         : 10  ,
        align     : Align.CENTER,
        direction : Direction.HORIZONTAL ,
        invert    : false ,
        padding   : new EdgeMetrics(2,2,2,2) ,
        fill      : new FillStyle( 0xFFFFFF ) ,
        thumbFill : new FillStyle( 0xFF2CA0 ) ,
        thumbSize : 60
    });

    bar1.changed.connect( change ) ;

    bar1.x = app.renderer.width  * 0.5 ;
    bar1.y = app.renderer.height * 0.5 ;

    bar1.position = 50;

    stage.addChild( bar1 ) ;

    // ------- VERTICAL

    var bar2 = new ScrollIndicator
    ({
        w         : 10 ,
        h         : 200  ,
        direction : Direction.VERTICAL ,
        invert    : true ,
        padding   : new EdgeMetrics(2,2,2,2) ,
        fill      : new FillStyle( 0xCCCCCC ) ,
        thumbFill : new FillStyle( 0xAA2CA0 ) ,
        thumbSize : 60
    });

    bar2.x = 20 ;
    bar2.y = 20 ;

    bar2.position = 50;

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

    tween1.run() ;

    var tween2 = new system.transitions.Tween
    ({
        auto       : false,
        duration   : 100 ,
        useSeconds : false ,
        easing     : core.easings.bounceOut,
        target     : bar2 ,
        from       : { position : 0 } ,
        to         : { position : 100 }
    }) ;

    tween2.run() ;
}