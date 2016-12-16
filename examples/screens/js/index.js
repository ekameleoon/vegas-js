/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

// use the skipHello method to skip the vegas library prompt message.
// vegas.skipHello() ;

var global   = vegas.global  ; // jshint ignore:line
var trace    = vegas.trace   ; // jshint ignore:line
var core     = vegas.core    ; // jshint ignore:line
var screens  = vegas.screens ; // jshint ignore:line
var system   = vegas.system  ; // jshint ignore:line
var graphics = vegas.graphics  ; // jshint ignore:line

var Stage             = graphics.display.Stage;
var StageDisplayState = graphics.display.StageDisplayState;

var os;
var browser;
var stage;

window.onload = function()
{
    // ------

    var fullscreen = function( state )
    {
        trace( 'fullscreen ' + state ) ;
    }

    var resize = function( stage )
    {
        trace( 'resize viewPort:' + core.dump( stage.getViewportSize() ) ) ;
    }

    // ------

    os      = new screens.Os();
    browser = new screens.Browser();
    stage   = new Stage();

    stage.fullScreen.connect( fullscreen );
    stage.resize.connect( resize );

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

