/* globals vegas */
/* globals PIXI */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

window.onload = function()
{
    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var renderer = new PIXI.autoDetectRenderer
    (
        800, 600,
        {
            backgroundColor : 0x061639,
            antialias       : false,
            transparent     : false,
            resolution      : 1
        }
    );

    renderer.view.style.position = "absolute";
    renderer.view.style.display  = "block";
    renderer.view.style.left = '50%';
    renderer.view.style.top  = '50%';
    renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';

    renderer.autoResize = true;

    document.body.appendChild( renderer.view );

    var stage = new PIXI.Container();

    stage.hitArea     = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
    stage.interactive = true ;

    trace( '> click the screen...' ) ;

    stage.click = function( event )
    {
        if( event && event.data )
        {
            var global = event.data.global ;
            tween.to = { x : global.x , y : global.y } ;
            tween.run() ;
        }
    };

    PIXI.loader
        .add( 'sprite'      , './images/bunny.png' )
        .add( 'spritesheet' , './images/mc.json')
        .once('complete'    , complete )
        .load();

    var sprite ;
    var resources ;
    var tween ;

    function finish()
    {
        trace( '¬ finish' ) ;
    }

    function start()
    {
        trace( '¬ start' ) ;
    }

    function createExplosion()
    {
        var textures = [] ;

        for ( var i = 0; i < 26 ; i++ )
        {
            textures.push( PIXI.Texture.fromImage( 'frame' + (i+1) + '.png') );
        }

        return new PIXI.extras.MovieClip(textures);
    }

    function complete( event )
    {
        resources = event.resources ;
        if( resources )
        {
            sprite = createExplosion() ;
            sprite.play() ;

            //sprite = new PIXI.Sprite(resources.sprite.texture);

            sprite.anchor.set(0.5,0.5);

            sprite.x = 200;
            sprite.y = 100;

            //sprite.scale.set(1.5,1.5);

            stage.addChild(sprite);

            tween = new system.transitions.Tween
            ({
                target   : sprite.position ,
                duration : 24 ,
                easing   : core.easings.backOut ,
                to       : { x : 480 , y : 480 }
            }) ;

            tween.easings = { x : core.easings.elasticOut , y : core.easings.backOut } ;
            tween.fps = 60 ;

            tween.startIt.connect( start ) ;
            tween.finishIt.connect( finish ) ;

            tween.run() ;

            render();
        }
    }

    function render()
    {
        renderer.render(stage);
        requestAnimationFrame(render);
    }
}