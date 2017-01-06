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
        addTa( 'fullscreen ' + state ) ;
    }

    var orientation = function( stage )
    {
        addTa( 'orientation changed to:' + stage.orientation ) ;
    }

    var resize = function( stage )
    {
        addTa( 'resize viewPort:' + core.dump( stage.getViewportSize() ) ) ;
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

    document.getElementById("ta").value = "";

    addTa( 'ua: ' + navigator.userAgent ) ;
    addTa( 'app version: ' + navigator.appVersion ) ;
    addTa( 'os: ' + os.name ) ;
    addTa( 'os type: ' + os.type ) ;
    addTa( 'os version: ' + os.version ) ;
    addTa( 'browser: ' + browser.name ) ;
    addTa( 'browser version: ' + browser.version ) ;

    addTa( '------' ) ;

    addTa( 'stage pixelRatio: ' + stage.pixelRatio ) ;
    addTa( 'stage allowFullscreen: ' + stage.allowFullScreen ) ;
    if( stage.allowFullScreen === true )
    {
        document.getElementById("full").style.display = "initial";
        document.getElementById("normal").style.display = "none";
    }
    addTa( 'stage allowFullscreenInteractive: ' + stage.allowFullScreenInteractive ) ;

    addTa( 'stage displayState: ' + stage.displayState ) ;
    addTa( 'stage orientation: ' + stage.orientation ) ;
    addTa( 'stage aspectRatio: ' + stage.aspectRatio ) ;

    addTa( 'launch from Home Screen: ' + stage.launchedFromHomeScreen ) ;

    addTa( 'width  : ' + stage.width ) ;
    addTa( 'height : ' + stage.height ) ;

    addTa( 'fullScreen width  : ' + stage.fullScreenWidth ) ;
    addTa( 'fullScreen height : ' + stage.fullScreenHeight ) ;
}

var addTa = function( txt )
{
    trace( txt );
    document.getElementById("ta").value += txt + '\n';
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
