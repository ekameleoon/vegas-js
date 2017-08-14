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
    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line
    var molecule = vegas.molecule ; // jshint ignore:line

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;
    var MOB         = molecule.render.pixi.display.MOB ;

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;

    body.addChild( canvas );

    PIXI.loader.add( 'bunny', './images/bunny.png')
               .load( function( loader , resources )
    {
        var bunny = new MOB( resources.bunny.texture );

        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        stage.addChild(bunny);

        app.ticker.add( function()
        {
            bunny.rotation += 0.01;
        });
    });
}