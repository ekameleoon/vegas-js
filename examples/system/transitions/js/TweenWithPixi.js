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

    var renderer = new PIXI.CanvasRenderer
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

    stage.click = function( event )
    {
        if( event && event.data )
        {
            var global = event.data.global ;
            tween.stop() ;
            tween.easings = null ;
            tween.duration = 60 ;
            tween.to = { x : global.x , y : global.y } ;
            tween.run() ;
        }
    };

    PIXI.loader
        .add( 'bunny'    , './images/bunny.png' )
        .once('complete' , complete )
        .load();

    var bunny ;
    var resources ;
    var tween ;

    function finish()
    {
        tween.easings = { x : core.easings.sineOut , y : core.easings.backOut } ;
        tween.to = { x : 50 , y : 50 } ;
        tween.run() ;
    }

    function complete( event )
    {
        resources = event.resources ;
        if( resources )
        {
            bunny = new PIXI.Sprite(resources.bunny.texture);

            bunny.anchor.set(0.5,0.5);

            bunny.x = 200;
            bunny.y = 100;

            bunny.scale.set(1.5,1.5);

            stage.addChild(bunny);

            tween = new system.transitions.Tween
            ({
                target   : bunny.position ,
                duration : 48 ,
                easing   : core.easings.backOut ,
                to       : { x : 480 , y : 480 }
            }) ;

            tween.finishIt.connect( finish , 0 , true ) ;

            tween.run() ;

            render();
        }
    }

    function render()
    {
        requestAnimationFrame(render);
        renderer.render(stage);
    }
}