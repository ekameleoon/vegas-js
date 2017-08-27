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

    var Direction    = graphics.Direction ;
    var EdgeMetrics  = graphics.geom.EdgeMetrics ;
    var FillStyle    = graphics.FillStyle ;
    var MOB          = molecule.render.pixi.display.MOB ;
    var ScrollPane   = molecule.render.pixi.components.panes.ScrollPane ;
    var ScrollPolicy = molecule.ScrollPolicy ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var loader = PIXI.loader ;
    var stage  = app.stage ;

    // ----------------

    body.addChild( canvas );

    // ----------------

    var pane = new ScrollPane
    ({
        w         : 600 ,
        h         : 480  ,
        padding   : new EdgeMetrics(2,2,2,2)
    });

    pane.style.map
    ({
        hScrollbarPolicy : ScrollPolicy.AUTO ,
        scrollDirection  : Direction.BOTH ,
        scrollDuration   : 24,
        scrollEasing     : core.easings.backOut,
        smoothing        : true ,
        useHandCursor    : false,
        vScrollbarPolicy : ScrollPolicy.AUTO
    });

    pane.x = 10 ;
    pane.y = 10 ;

    pane.hScrollbar.fill = new FillStyle(0x000000,0.5) ;
    pane.hScrollbar.thumbFill = new FillStyle(0x0101DF) ;

    pane.vScrollbar.fill = new FillStyle(0x000000,0.5) ;
    pane.vScrollbar.thumbFill = new FillStyle(0xFE2E64) ;

    stage.addChild( pane ) ;

    // ----------------

    var error = function( error , loader , current )
    {
        trace( '--- error : ' + current.name + " failed !" ) ;
    }

    var progress = function( loader )
    {
        trace('>>> progress : ' + loader.progress ) ;
    }

    var complete = function( loader , resources )
    {
        trace('+++ complete' ) ;

        var wallpaper = new MOB( resources.wallpaper.texture ) ;

        pane.content = wallpaper ;

        pane.scrollH = pane.w * 0.5;
        pane.scrollV = pane.h * 0.5;

        pane.update() ;
    }

    // Photo by Scott Walsh on Unsplash
    loader.add( 'wallpaper' , './images/wallpaper.jpg') ;

    loader.on( 'error'    , error )
          .on( 'progress' , progress )
          .on( 'complete' , complete )
          .load() ;

}