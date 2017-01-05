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

var Accelerometer = screens.sensors.Accelerometer;

window.onload = function()
{
    // ------

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
    }

    // ------

    trace( '------' ) ;

    trace( vegas ) ;
    trace( vegas.metas ) ;

    trace( '------' ) ;

    var accelerometer = new Accelerometer();

    trace( "Accelerometer is supported? => " + accelerometer.isSupported );

    if( accelerometer.isSupported )
    {
        accelerometer.update.connect( orientation );
    }

}
