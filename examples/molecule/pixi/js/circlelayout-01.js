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
    var graphics = vegas.graphics ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line
    var molecule = vegas.molecule ; // jshint ignore:line

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;

    var CircleLayout   = molecule.render.pixi.layouts.CircleLayout ;
    var Element        = molecule.render.pixi.display.Element ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;
    var loader = PIXI.loader ;

    var background = new PIXI.Graphics() ;
    var container  = new Element() ;
    var layout     = new CircleLayout() ;

    var update = function()
    {
        background.clear() ;
        background.beginFill( 0x333333 , 0.1 ) ;
        background.drawRect( layout.bounds.x , layout.bounds.y , layout.bounds.width , layout.bounds.height ) ;
    }

    background.x = container.x = app.renderer.width  * 0.5 ;
    background.y = container.y = app.renderer.height * 0.5 ;

    layout.align      = graphics.Align.CENTER ;
    layout.childAngle = 120 ;
    layout.childCount = 10 ;
    layout.childOrientation = true ;
    layout.radius     = 150 ;
    layout.startAngle = 90 ;

    layout.usePreferredSize = false ;

    app.ticker.add(function(delta)
    {
        layout.childAngle  += 0.02 * delta;
        container.rotation += (0.01 * delta)%360 ;
        layout.run() ;
    });

    container.layout = layout ;
    container.updater.connect( update ) ;

    body.addChild( canvas );
    stage.addChild( background );
    stage.addChild( container );

    // --------

    var error = function( error , loader , current )
    {
        trace( '--- error : ' + current.name + " failed !" ) ;
    }

    var complete = function( loader , resources )
    {
        trace( '=== complete' ) ;

        var icon ;
        var numChildren = 10 ;

        for( var i = 0 ; i<numChildren ; i++ )
        {
            icon = new Element(resources.bunny.texture);
            icon.pivot.set(icon.width*0.5,icon.height*0.5) ;
            container.addChild( icon ) ;
        }

        container.update() ;
    };

    loader.add( 'bunny' , './images/bunny.png') ;

    loader.on( 'error'    , error )
          .on( 'complete' , complete )
          .load() ;
}