"use strict" ;

import { Motion }     from './transitions/Motion.js' ;
import { Transition } from './transitions/Transition.js' ;
import { Tween }      from './transitions/Tween.js' ;
import { TweenUnit }  from './transitions/TweenUnit.js' ;

/**
 * The {@link system.transitions} library is a simple animations toolkit to use in your projects, your games, your websites.
 * @summary The {@link system.transitions} library is a simple animations toolkit to use in your projects, your games, your websites.
 * @namespace system.transitions
 * @memberof system
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @see For more usage, read the {@tutorial system.transitions} tutorial.
 * @example <caption>Javascript script</caption>
 * "use strict" ;
 *
 * window.onload = function()
 * {
 *     if( !vegas )
 *     {
 *         throw new Error( "The VEGAS library is not found." ) ;
 *     }
 *
 *     // ----- imports
 *
 *     var global   = vegas.global ; // jshint ignore:line
 *     var trace    = vegas.trace  ; // jshint ignore:line
 *     var core     = vegas.core   ; // jshint ignore:line
 *     var system   = vegas.system ; // jshint ignore:line
 *
 *     var Tween = system.transitions.Tween ;
 *
 *     // ----- behaviors
 *
 *     var change = function( tween )
 *     {
 *         trace( 'progress ' + core.dump(tween.target) ) ;
 *         render() ;
 *     }
 *
 *     var finish = function()
 *     {
 *         trace( 'finish' ) ;
 *         // tween.duration = 120 ;
 *         // tween.from = null ;
 *         // tween.to   = tween.to === to ? from : to ;
 *         // tween.run() ;
 *     }
 *
 *     var start = function()
 *     {
 *         trace( 'start' ) ;
 *     }
 *
 *     // ----- initialize
 *
 *     var canvas  = document.getElementById('canvas') ;
 *     var context = canvas.getContext('2d');
 *
 *     canvas.width  = 800;
 *     canvas.height = 600;
 *
 *     var color   = '#FF0000' ;
 *     var radius  = 25;
 *
 *     var from    = { x : 100 , y : 100 } ;
 *     var to      = { x : 500 , y : 400 } ;
 *     var target  = { x : 0   , y : 0 } ;
 *
 *     var easings = null ;
 *
 *     easings = { x : core.easings.backOut , y : core.easings.sineOut } ;
 *
 *     var tween = new Tween
 *     ({
 *         auto       : false,
 *         duration   : 48 ,
 *         useSeconds : false ,
 *         easing     : core.easings.backOut,
 *         easings    : easings,
 *         from       : from ,
 *         target     : target ,
 *         to         : to
 *     }) ;
 *
 *     //tween.easing = core.easings.cubicOut ;
 *     //tween.easing = core.easings.elasticOut ;
 *     //tween.easing = core.easings.sineOut ;
 *
 *     // tween.fps = 60  ; // use an internal Timer instance or a FrameTimer instance if fps is NaN
 *
 *     tween.looping = true ;
 *
 *     tween.finishIt.connect( finish ) ;
 *     tween.changeIt.connect( change ) ;
 *     tween.startIt.connect( start ) ;
 *
 *     // ----- render
 *
 *     var render = function()
 *     {
 *         var width  = canvas.width ;
 *         var height = canvas.height ;
 *
 *         context.clearRect(0, 0, width, height);
 *
 *         context.fillStyle = '#333333' ;
 *         context.fillRect(0, 0, width, height );
 *
 *         context.beginPath();
 *         context.arc( target.x, target.y, radius, 0, Math.PI * 2, false );
 *         context.closePath();
 *         context.fillStyle = color ;
 *         context.fill();
 *     }
 *
 *     render() ;
 *
 *     tween.run() ;
 * }
 */
export var transitions = Object.assign
({
    Motion     : Motion,
    Transition : Transition,
    Tween      : Tween,
    TweenUnit  : TweenUnit
}) ;