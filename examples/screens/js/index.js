/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

// use the skipHello method to skip the vegas library prompt message.
// vegas.skipHello() ;
var global;
var trace;
var core;
var screens;
var system;
var molecule;

var os;
var browser;
var StageDisplayState;
var stage;

window.onload = function()
{
    global   = vegas.global  ; // jshint ignore:line
    trace    = vegas.trace   ; // jshint ignore:line
    core     = vegas.core    ; // jshint ignore:line
    screens  = vegas.screens ; // jshint ignore:line
    system   = vegas.system  ; // jshint ignore:line
    molecule = vegas.molecule ; // jshint ignore:line

    var Os = screens.Os;
    var Browser = screens.Browser;
    StageDisplayState = screens.StageDisplayState;
    var Stage = screens.Stage;

    // ------

    function Slot( name )
    {
        this.name = name ;
    }

    Slot.prototype = Object.create( system.signals.Receiver.prototype );
    Slot.prototype.constructor = Slot;

    Slot.prototype.receive = function ( message )
    {
        trace( this + " : " + message ) ;
    }

    Slot.prototype.toString = function ()
    {
        return "[Slot name:" + this.name + "]" ;
    }

    // ------

    os = new Os();
    browser = new Browser();
    stage = new Stage();

    var fullScreenReceiver = new Slot("fullscreen");
    var resizeReceiver = new Slot("resize");

    stage.fullScreen.connect( fullScreenReceiver );
    stage.resize.connect( resizeReceiver );

    trace( vegas ) ;
    trace( vegas.metas ) ;
    trace( 'version: ' + vegas.version ) ;
    trace( 'ua: ' + navigator.userAgent ) ;
    trace( 'app version: ' + navigator.appVersion ) ;
    trace( 'os: ' + os.name ) ;
    trace( 'os type: ' + os.type ) ;
    trace( 'os version: ' + os.version ) ;
    trace( 'browser: ' + browser.name ) ;
    trace( 'browser version: ' + browser.version ) ;

    trace( 'stage pixelRatio: ' + stage.pixelRatio ) ;
    trace( 'stage allowFullscreen: ' + stage.allowFullScreen ) ;
    trace( 'stage allowFullscreenInteractive: ' + stage.allowFullScreenInteractive ) ;

    trace( 'stage displayState: ' + stage.displayState ) ;

    trace( 'width: ' + stage.width ) ;
    trace( 'height: ' + stage.height ) ;

    trace( 'width fullScreen: ' + stage.fullScreenWidth ) ;
    trace( 'height fullScreen: ' + stage.fullScreenHeight ) ;


}

var goFullScreen = function()
{
    stage.displayState = StageDisplayState.FULL_SCREEN;
    document.getElementById("full").style.display = "none";
    document.getElementById("normal").style.display = "initial";
}

var goNormalScreen = function()
{
    stage.displayState = StageDisplayState.NORMAL;
    document.getElementById("full").style.display = "initial";
    document.getElementById("normal").style.display = "none";
}
