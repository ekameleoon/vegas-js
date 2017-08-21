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

    var GridLayout     = molecule.render.pixi.layouts.GridLayout ;
    var Element        = molecule.render.pixi.display.Element ;
    var Direction      = graphics.Direction ;
    var DirectionOrder = graphics.DirectionOrder ;
    var Orientation    = graphics.Orientation ;
    var EdgeMetrics    = graphics.geom.EdgeMetrics ;
    var SimpleButton   = molecule.render.pixi.components.buttons.SimpleButton ;

    // ----------------

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;
    var loader = PIXI.loader ;

    var background = new PIXI.Graphics() ;
    var container  = new Element() ;
    var layout     = new GridLayout() ;

    var update = function()
    {
        background.clear() ;
        background.beginFill( 0xFFFFFF , 0.7 ) ;
        background.drawRect( layout.bounds.x , layout.bounds.y , layout.bounds.width , layout.bounds.height ) ;
    }

    background.x = container.x = 10 ;
    background.y = container.y = 10 ;

    layout.padding       = new EdgeMetrics( 8 , 8 , 8 , 8 ) ;
    layout.columns       = 4 ;
    layout.lines         = 4 ;
    layout.horizontalGap = 8 ;
    layout.verticalGap   = 8 ;

    // Direction.HORIZONTAL or Direction.VERTICAL
    layout.direction = Direction.HORIZONTAL ;

    // DirectionOrder.NORMAL or DirectionOrder.REVERSE
    layout.order = DirectionOrder.NORMAL ;

    // Orientation, default : Orientation.NONE
    // - BOTTOM_TO_TOP / TOP_TO_BOTTOM
    // - RIGHT_TO_LEFT / RIGHT_TO_LEFT_BOTTOM_TO_TOP / RIGHT_TO_LEFT_TOP_TO_BOTTOM
    // - LEFT_TO_RIGHT / LEFT_TO_RIGHT_BOTTOM_TO_TOP
    layout.orientation = Orientation.NONE ;

    // layout.usePreferredSize = false ;

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

        var button ;
        var text ;
        var format = { font: '12px Arial', fill: 'white', align: 'left' } ;

        var numChildren = 16 ;
        var texture = resources.button.textures ;

        var click = function( target )
        {
            trace( "> click : " + target.data ) ;
        }

        for( var i = 0 ; i<numChildren ; i++ )
        {
            button = new SimpleButton();
            button.data = '#' + (i+1) ;
            button.set
            (
                texture.up, texture.over,
                texture.down, texture.disable
            ) ;
            button.pressed.connect( click ) ;

            text = new PIXI.Text( button.data , format ) ;
            text.color = 0xFFFFFF ;
            text.x = 10 ;
            text.y = 10 ;
            button.addChild( text )

            container.addChild( button ) ;
        }

        container.update() ;
    };

    loader.add( 'button' , './images/button.json') ;

    loader.on( 'error'    , error )
          .on( 'complete' , complete )
          .load() ;
}