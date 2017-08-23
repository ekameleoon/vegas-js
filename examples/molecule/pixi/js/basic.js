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
    var system   = vegas.system ; // jshint ignore:line
    var molecule = vegas.molecule ; // jshint ignore:line

    var Tween = system.transitions.Tween ;

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;

    var SimpleButton = molecule.render.pixi.components.buttons.SimpleButton ;
    var MOB          = molecule.render.pixi.display.MOB ;

    // ----------------

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
        trace( '=== complete ...' ) ;

        var tween ;
        var texture ;

        // --------- bunny

        texture = resources.bunny.texture ;

        bunny = new MOB( texture ) ;

        bunny.x = app.renderer.width  * 0.5 ;
        bunny.y = app.renderer.height * 0.5 ;

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        stage.addChild( bunny ) ;

        // --------- Graphics

        var graphic = new PIXI.Graphics() ;

        graphic.beginFill(0x00ffcc)
        graphic.lineStyle(0,0xFFFFFF) ;
        graphic.drawRect(0, 0, 200, 150) ;

        graphic.x = 150 ;
        graphic.y = 150 ;
        stage.addChild( graphic ) ;

        // --------- tween

        tween = new Tween
        ({
            auto       : false,
            duration   : 24 ,
            useSeconds : false ,
            easing     : core.easings.backOut,
            target     : bunny ,
            to         : { x : 600 , y : 500 }
        }) ;

        // --------- Button

        // Note : The texture collection contains the disable, down, over and up PIXI.Texture references.
        texture = resources.button.textures ;

        button = new SimpleButton(); // resources.bunny.texture

        button.toggle = true ;

        button.x = 25 ;
        button.y = 25 ;

        // button.lock() ;
        // button.disabledState = texture.disable ;
        // button.downState     = texture.down ;
        // button.overState     = texture.over ;
        // button.upState       = texture.up ;
        // button.unlock() ;

        button.set
        (
            texture.up,
            texture.over,
            texture.down,
            texture.disable
        ) ;

        button.pressed.connect( function()
        {
            console.log( "pressed" ) ;
            tween.run() ;
        });

        button.select.connect( function()
        {
            console.log( "select" ) ;
            //button.enabled = false ;
            tween.to = { x : 600 , y : 500 } ;
            tween.run() ;
        });

        button.unselect.connect( function()
        {
            console.log( "unselect" ) ;
            tween.to =
            {
                x : app.renderer.width  * 0.5 ,
                y : app.renderer.height * 0.5
            } ;
            tween.run() ;
        });

        stage.addChild( button ) ;
    };

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