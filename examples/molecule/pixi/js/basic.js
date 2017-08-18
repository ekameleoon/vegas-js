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

    var Tween       = system.transitions.Tween ;

    var Application = PIXI.Application ;
    var Body        = molecule.render.dom.display.Body ;
    var Canvas      = molecule.render.dom.display.Canvas ;

    var ButtonPhase = molecule.components.ButtonPhase ;
    var CoreButton  = molecule.render.pixi.components.CoreButton ;
    var MOB         = molecule.render.pixi.display.MOB ;

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
        trace( '=== complete !' ) ;

        var tween ;

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

        var update = function( )
        {
            switch( button.phase )
            {
                case ButtonPhase.DISABLE :
                {
                    button.texture = resources.button.textures.disable ;
                    break ;
                }
                case ButtonPhase.DOWN :
                {
                    button.texture = resources.button.textures.down ;
                    break ;
                }
                case ButtonPhase.OVER :
                {
                    button.texture = resources.button.textures.over ;
                    break ;
                }
                default :
                case ButtonPhase.UP :
                {
                    button.texture = resources.button.textures.up ;
                    break ;
                }
            }
        }

        button.disable.connect( update ) ;
        button.over.connect( update ) ;
        button.out.connect( update ) ;
        button.down.connect( update ) ;
        button.up.connect( update ) ;

        button.pressed.connect( function()
        {
            console.log( "pressed" ) ;
            tween.run() ;
        });

        button.select.connect( function()
        {
            console.log( "select" ) ;
            button.enabled = false ;
            tween.run() ;
        });

        button.unselect.connect( function()
        {
            console.log( "unselect" ) ;
        });

        stage.addChild( button ) ;

        // --------- Tween

        tween = new Tween
        ({
            auto       : false,
            duration   : 24 ,
            useSeconds : false ,
            easing     : core.easings.backOut,
            target     : bunny ,
            to         : { x : 600 , y : 500 }
        }) ;

        // --------- run

        //button.toggle = true ;
        //button.selected = true ;
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