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
    var bunny ;
    var button ;

    var error = function( error , loader , current )
    {
        trace( '--- error : ' + current.name + " failed !" ) ;
    }

    var load = function( loader , current )
    {
        trace( '+++ load : ' + current.name + " loaded !" ) ;
    }

    var progress = function( loader )
    {
        trace('>>> progress : ' + loader.progress ) ;
    }

    var complete = function( loader , resources )
    {
        trace( '=== complete !' ) ;

        // --------- bunny

        bunny = new MOB( resources.bunny.texture ) ;

        bunny.x = app.renderer.width  * 0.5 ;
        bunny.y = app.renderer.height * 0.5 ;

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        stage.addChild( bunny );

        // --------- Button

        button = new CoreButton( resources.button.textures.up ); // resources.bunny.texture

        button.x = 25 ;
        button.y = 25 ;

        button.down.connect( function()
        {
            trace( "down" ) ;
            button.texture = resources.button.textures.down ;
            tween.run() ;
        });

        stage.addChild( button ) ;

        // --------- Tween

        var tween = new Tween
        ({
            auto       : false,
            duration   : 24 ,
            useSeconds : false ,
            easing     : core.easings.backOut,
            target     : bunny ,
            to         : { x : 600 , y : 500 }
        }) ;
    };

    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line
    var molecule = vegas.molecule ; // jshint ignore:line

    var Tween       = system.transitions.Tween ;

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;

    var CoreButton = molecule.render.pixi.components.CoreButton ;
    var MOB        = molecule.render.pixi.display.MOB ;

    var app       = new Application();
    var body      = new Body() ;
    var canvas    = new Canvas( null , app.view ) ;
    //var resources = PIXI.loader.resources ;
    var stage     = app.stage ;
    var loader    = PIXI.loader ;

    body.addChild( canvas );

    loader.add( 'bunny'  , './images/bunny.png') ;
    loader.add( 'button' , './images/button.json') ;

    loader.on( 'error'    , error )
          .on( 'load'     , load )
          .on( 'progress' , progress )
          .on( 'complete' , complete )
          .load() ;
}