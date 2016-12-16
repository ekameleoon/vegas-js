/* globals vegas */
/* jshint unused:false */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global   = vegas.global  ; // jshint ignore:line
var trace    = vegas.trace   ; // jshint ignore:line
var core     = vegas.core    ; // jshint ignore:line
var screens  = vegas.screens ; // jshint ignore:line
var system   = vegas.system  ; // jshint ignore:line
var graphics = vegas.graphics  ; // jshint ignore:line

var Stage             = graphics.display.Stage;
var StageDisplayState = graphics.display.StageDisplayState;

var browser;
var os;
var stage;

window.onload = function()
{
    // ------

    var fullscreen = function( state )
    {
        trace( 'fullscreen ' + state ) ;
    }

    var orientation = function( stage )
    {
        trace( 'orientation type:' + stage.orientation ) ;
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
    stage.orientationChange.connect( orientation );
    stage.resize.connect( resize );

    trace( '------' ) ;

    trace( vegas ) ;
    trace( vegas.metas ) ;

    trace( '------' ) ;

    trace( 'ua: ' + navigator.userAgent ) ;
    trace( 'app version: ' + navigator.appVersion ) ;
    trace( 'os: ' + os.name ) ;
    trace( 'os type: ' + os.type ) ;
    trace( 'os version: ' + os.version ) ;
    trace( 'browser: ' + browser.name ) ;
    trace( 'browser version: ' + browser.version ) ;

    trace( '------' ) ;

    trace( 'stage pixelRatio: ' + stage.pixelRatio ) ;
    trace( 'stage allowFullscreen: ' + stage.allowFullScreen ) ;
    trace( 'stage allowFullscreenInteractive: ' + stage.allowFullScreenInteractive ) ;

    trace( 'stage displayState: ' + stage.displayState ) ;
    trace( 'stage orientation: ' + stage.orientation ) ;

    trace( 'width  : ' + stage.width ) ;
    trace( 'height : ' + stage.height ) ;

    trace( 'fullScreen width  : ' + stage.fullScreenWidth ) ;
    trace( 'fullScreen height : ' + stage.fullScreenHeight ) ;
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