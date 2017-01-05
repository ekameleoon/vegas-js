/* globals vegas */
/* jshint -W086 */
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

var Accelerometer     = screens.sensors.Accelerometer;
var Stage             = graphics.display.Stage;
var StageDisplayState = graphics.display.StageDisplayState;
var StageOrientation  = graphics.display.StageOrientation;

var stage;

window.onload = function()
{
    // ------

    var x = 0;
    var y = 0;
    var sphere = document.getElementById("sphere");

    var orientation = function( event )
    {
        trace( 'accelerometer changed to:' + event ) ;

        document.getElementById("ax").innerHTML = event.acceleration.x;
        document.getElementById("ay").innerHTML = event.acceleration.y;
        document.getElementById("az").innerHTML = event.acceleration.z;

        document.getElementById("agx").innerHTML = event.accelerationIncludingGravity.x;
        document.getElementById("agy").innerHTML = event.accelerationIncludingGravity.y;
        document.getElementById("agz").innerHTML = event.accelerationIncludingGravity.z;

        document.getElementById("alpha").innerHTML = event.rotationRate.alpha;
        document.getElementById("beta").innerHTML  = event.rotationRate.beta;
        document.getElementById("gamma").innerHTML = event.rotationRate.gamma;

        document.getElementById("interval").innerHTML = event.interval;

        var shW = ( stage.width - 50 ) / 2;
        var shH = ( stage.height - 50 ) / 2;

        var hs = shW / 10;
        var vs = shH / 10;

        // handle device orientation
        switch ( stage.orientation ) {
            case StageOrientation.ROTATED_LEFT :
            {
                x = shW + ( - event.accelerationIncludingGravity.y * hs );
                y = shH + ( event.accelerationIncludingGravity.x * vs );
                break;
            }
            case StageOrientation.ROTATED_RIGHT :
            {
                x = shW + ( event.accelerationIncludingGravity.y * hs );
                y = shH + ( - event.accelerationIncludingGravity.x * vs );
                break;
            }
            case StageOrientation.UPSIDE_DOWN :
            {
                x = shW + ( - event.accelerationIncludingGravity.x * hs );
                y = shH + ( - event.accelerationIncludingGravity.y * vs );
                break;
            }
            case StageOrientation.DEFAULT :
            default :
                x = shW + ( event.accelerationIncludingGravity.x * hs );
                y = shH + ( event.accelerationIncludingGravity.y * vs );
        }

        sphere.style.left = x + "px";
        sphere.style.top = y + "px";
    }

    var orientationDevice = function( stage )
    {
        trace( 'orientation changed to:' + stage.orientation ) ;
    }

    // ------

    trace( '------' ) ;

    trace( vegas ) ;
    trace( vegas.metas ) ;

    trace( '------' ) ;

    stage = new Stage();
    stage.orientationChange.connect( orientationDevice );

    sphere.style.left = stage.width / 2 + "px";
    sphere.style.top = stage.height / 2 + "px";

    var accelerometer = new Accelerometer();

    trace( "Accelerometer is supported? => " + accelerometer.isSupported );

    if( accelerometer.isSupported )
    {
        accelerometer.update.connect( orientation );
    }

}
