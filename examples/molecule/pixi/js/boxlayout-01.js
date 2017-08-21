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

    var BoxLayout    = molecule.render.pixi.layouts.BoxLayout ;
    var Direction    = graphics.Direction ;
    var EdgeMetrics  = graphics.geom.EdgeMetrics ;
    var SimpleButton = molecule.render.pixi.components.buttons.SimpleButton ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;
    var loader = PIXI.loader ;

    var background = new PIXI.Graphics() ;

    var container  = new PIXI.Container() ;
    var layout     = new BoxLayout() ;

    background.x = container.x = 10 ;
    background.y = container.y = 10 ;

    body.addChild( canvas );
    stage.addChild( background );
    stage.addChild( container );

    // layout.childCount = 3 ;
    // stage.mask = background ;

    // --------

    var error = function( error , loader , current )
    {
        trace( '--- error : ' + current.name + " failed !" ) ;
    }

    var click = function( target )
    {
        trace( "click : " + target ) ;
        layout.direction = layout.direction === Direction.HORIZONTAL ? Direction.VERTICAL : Direction.HORIZONTAL ;
        layout.run() ;
    }

    var complete = function( loader , resources )
    {
        trace( '=== complete !' ) ;

        // --------- texture

        var numChildren = 5 ;
        var texture = resources.button.textures ;

        for( var i = 0 ; i<numChildren ; i++ )
        {
            var button = new SimpleButton(); // resources.bunny.texture

            button.set
            (
                texture.up,
                texture.over,
                texture.down,
                texture.disable
            ) ;

            button.pressed.connect( click ) ;

            //button.pressed.connect( function() { console.log( "pressed" ) ; });

            container.addChild( button ) ;
        }

        // --------- layout

        layout.updater.connect( update ) ;

        layout.initialize( container ) ;

        layout.padding       = new EdgeMetrics( 4 , 4 , 4 , 4 ) ;
        layout.direction     = Direction.VERTICAL ;
        layout.horizontalGap = 4 ;
        layout.verticalGap   = 4 ;
        layout.usePreferredSize = false ;

        layout.run() ;
    };

    var update = function( layout )
    {
        background.clear() ;
        background.beginFill( 0x333333 ) ;
        background.drawRect( layout.bounds.x , layout.bounds.y , layout.bounds.width , layout.bounds.height ) ;
    }

    loader.add( 'button' , './images/button.json') ;

    loader.on( 'error'    , error )
          .on( 'complete' , complete )
          .load() ;
}