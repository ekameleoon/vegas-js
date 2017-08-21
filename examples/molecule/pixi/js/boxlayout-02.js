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
    var Element      = molecule.render.pixi.display.Element ;
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
    var container  = new Element() ;
    var layout     = new BoxLayout() ;

    var update = function()
    {
        background.clear() ;
        background.beginFill( 0x333333 ) ;
        background.drawRect( layout.bounds.x , layout.bounds.y , layout.bounds.width , layout.bounds.height ) ;
    }

    background.x = container.x = 10 ;
    background.y = container.y = 10 ;

    layout.padding       = new EdgeMetrics( 4 , 4 , 4 , 4 ) ;
    layout.direction     = Direction.VERTICAL ;
    layout.horizontalGap = 4 ;
    layout.verticalGap   = 4 ;
    layout.usePreferredSize = false ;

    // layout.childCount = 3 ;
    // stage.mask = background ;

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
        var numChildren = 5 ;
        var texture = resources.button.textures ;

        var click = function()
        {
            trace( "___ click" ) ;
            layout.direction = layout.direction === Direction.HORIZONTAL ? Direction.VERTICAL : Direction.HORIZONTAL ;
            container.update() ;
        }

        for( var i = 0 ; i<numChildren ; i++ )
        {
            button = new SimpleButton();
            button.set
            (
                texture.up, texture.over,
                texture.down, texture.disable
            ) ;
            button.pressed.connect( click ) ;
            container.addChild( button ) ;
        }

        container.update() ;
    };

    loader.add( 'button' , './images/button.json') ;

    loader.on( 'error'    , error )
          .on( 'complete' , complete )
          .load() ;
}