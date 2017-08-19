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

    var SimpleButton = molecule.render.pixi.components.buttons.SimpleButton ;

    // ----------------

    var select = function( target )
    {
        trace( "select :" + target.data + " width:" + target.width + " height:" + target.height) ;
    }

    var unselect = function( target )
    {
        trace( "unselect :" + target.data ) ;
    }

    var error = function( error , loader , current )
    {
        trace( '--- error : ' + current.name + " failed !" ) ;
    }

    var complete = function( loader , resources )
    {
        trace( '=== complete !' ) ;

        // Note : The texture collection contains the disable, down, over and up PIXI.Texture references.
        var texture = resources.button.textures ;

        var area = new graphics.geom.Rectangle(25,25,texture.up.width,texture.up.height) ;

        var old ;

        for( var i = 0 ; i<3 ; i++ )
        {
            let button = new SimpleButton(); // resources.bunny.texture

            button.set
            (
                texture.up,
                texture.over,
                texture.down,
                texture.disable
            ) ;

            button.select.connect( select ) ;
            button.unselect.connect( unselect ) ;

            button.data = "button" + i ;

            trace( "button :" + button.data + " width:" + button.width + " height:" + button.height) ;

            button.useHandCursor = false ;
            button.toggle = true ;
            button.group  = true ;
            button.groupName = "button-group" ;

            button.x = old ? (old.x + area.width + 10) : area.x ;
            button.y = 25 ;

            stage.addChild( button ) ;

            old = button ;
        }
    };

    var app    = new Application();
    var body   = new Body() ;
    var canvas = new Canvas( null , app.view ) ;
    var stage  = app.stage ;
    var loader = PIXI.loader ;

    body.addChild( canvas );

    loader.add( 'button' , './images/button.json') ;

    loader.on( 'error'    , error )
          .on( 'complete' , complete )
          .load() ;
}