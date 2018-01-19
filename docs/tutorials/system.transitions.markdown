The **system.transitions** package provide a simple JavaScript library for tweening and animating HTML5 and JavaScript properties.

### Basic Example

The <code>Tween.html</code> file :

```
<!doctype html>
<html>

    <head>
        <meta charset="UTF-8">
        <title>VEGAS JS - Tween</title>
        <style>
        body
        {
            margin: 0px;
            padding: 0px;
        }
        </style>
</head>
<body>
    <canvas id="canvas" width="100%" height="100%"></canvas>
    <script src="../../../dist/vegas.js"></script>
    <script src="./js/Tween.js"></script>
</body>
</html>
```

The Tween.js file :

```
/* globals vegas */
"use strict" ;
window.onload = function()
{
    if( !vegas )
    {
        throw new Error( "The VEGAS library is not found." ) ;
    }

    // ----- imports

    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line

    var Tween = system.transitions.Tween ;

    // ----- behaviors

    var change = function( tween )
    {
        trace( 'progress ' + core.dump(tween.target) ) ;
        render() ;
    }

    var finish = function()
    {
        trace( 'finish' ) ;
        // tween.duration = 120 ;
        // tween.from = null ;
        // tween.to   = tween.to === to ? from : to ;
        // tween.run() ;
    }

    var start = function()
    {
        trace( 'start' ) ;
    }

    // ----- initialize

    var canvas  = document.getElementById('canvas') ;
    var context = canvas.getContext('2d');

    canvas.width  = 800;
    canvas.height = 600;

    var color   = '#FF0000' ;
    var radius  = 25;

    var from    = { x : 100 , y : 100 } ;
    var to      = { x : 500 , y : 400 } ;
    var target  = { x : 0   , y : 0 } ;

    var easings = null ;

    // easings = { x : core.easings.backIn , y : core.easings.backOut  } ;
    // easings = { x : core.easings.backOut , y : core.easings.backIn  } ;
    // easings = { x : core.easings.circularOut , y : core.easings.circularIn  } ;
    // easings = { x : core.easings.bounceOut , y : core.easings.bounceIn } ;

    easings = { x : core.easings.backOut , y : core.easings.sineOut } ;

    var tween = new Tween
    ({
        auto       : false,
        duration   : 48 ,
        useSeconds : false ,
        easing     : core.easings.backOut,
        easings    : easings,
        from       : from ,
        target     : target ,
        to         : to
    }) ;

    //tween.easing = core.easings.cubicOut ;
    //tween.easing = core.easings.elasticOut ;
    //tween.easing = core.easings.sineOut ;

    // tween.fps = 60  ; // use the Timer class or the FrameTimer class if fps is NaN

    tween.looping = true ;

    tween.finishIt.connect( finish ) ;
    tween.changeIt.connect( change ) ;
    tween.startIt.connect( start ) ;

    // ----- render

    var render = function()
    {
        var width  = canvas.width ;
        var height = canvas.height ;

        context.clearRect(0, 0, width, height);

        context.fillStyle = '#333333' ;
        context.fillRect(0, 0, width, height );

        context.beginPath();
        context.arc( target.x, target.y, radius, 0, Math.PI * 2, false );
        context.closePath();
        context.fillStyle = color ;
        context.fill();
    }

    render() ;

    tween.run() ;
}
```

## core.easings ##

The {@link system.transitions} package use the {@link core.easings} library who contains all the easing functions to create the specific tweening effects. This package is inspired of the [Robert Penner](http://robertpenner.com/easing/) easing implementation

The aspect of time is crucial to motion—things change over time. Nothing can move in “zero time,” or be in two places at once (although quantum theory may have some strange exceptions to this rule). In other words, a position needs time to change, and it can have only one value at a specific point in time.

Because position and time have this one-to-one relationship, we can say that position is a function of time. This means that, given a specific point in time, we can find one, and only one, corresponding position.

These <code>easings</code> functions provide different flavors of math-based motion under a consistent API.

|  easing   |                         description                         |  in  | out  | inout  |
|:--------: |:----------------------------------------------------------: |:---: |:---: |:-----: |
|  linear   | simple linear tweening : no easing, no acceleration         |  -   |  -   |   -    |
|   back    | back easing : overshooting cubic easing: (s+1)*t^3 - s*t^2  | yes  | yes  |  yes   |
|  bounce   | bounce easing : exponentially decaying parabolic bounce     | yes  | yes  |  yes   |
| circular  | circular easing : sqrt(1-t^2)                               | yes  | yes  |  yes   |
|   cubic   | cubic easing : t^3                                          | yes  | yes  |  yes   |
|  elastic  | elastic easing : exponentially decaying sine wave           | yes  | yes  |  yes   |
|   expo    | exponential easing : 2^t                                    | yes  | yes  |  yes   |
| quad      | quadratic easing : t^2                                      | yes  | yes  | yes    |
|  quartic  | quartic easing : t^4                                        | yes  | yes  |  yes   |
|  quintic  | quintic easing : t^5                                        | yes  | yes  |  yes   |
|  regular  | regular easing                                              | yes  | yes  |  yes   |
|   sine    | sinusoidal easing : sin(t)                                  | yes  | yes  |  yes   |

## system.transitions.TweenUnit ##

The basic TweenUnit class interpolate in time a value between <code>0</code> and <code>1</code>. It's motion tween is very fast.

*Example :*

```
var change = function( tween )
{
  trace( 'progress ' + tween.position ) ;
}
var finish = function()
{
  trace( 'finish' ) ;
}
var start = function()
{
  trace( 'start' ) ;
}

var tween = new TweenUnit( core.easings.backOut , 48 ) ;

tween.finishIt.connect( finish ) ;
tween.changeIt.connect( change ) ;
tween.startIt.connect( start ) ;

tween.run() ;
```

## Chaining Tweens for Animation ##

All the motion tweens in the {@link system.transitions} package inherit the {@link system.process.Task} class. You can batching or chaining your tweens in a complex process in your application.

*Example :*

```
var progress = function( action )
{
   trace( 'progress' ) ;
}
var finish = function()
{
  trace( 'finish' ) ;
}
var start = function()
{
  trace( 'start' ) ;
}

var chain = new Chain() ;

chain.add(new TweenUnit( backOut , 48 ) ) ;
chain.add(new TweenUnit( backIn  , 64 ) ) ;

chain.finishIt.connect( finish ) ;
chain.progressIt.connect( progress ) ;
chain.startIt.connect( start ) ;

chain.run() ;
```
