/* globals vegas */
( function( vegas )
{
    "use strict" ;

    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var trace  = vegas.trace  ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line

    var LoggerLevel = system.logging.LoggerLevel ;

    for( var level in LoggerLevel )
    {
        if( LoggerLevel.hasOwnProperty(level) )
        {
            trace( level + ' ' + LoggerLevel[level] + ' ' + LoggerLevel.getLevelString(LoggerLevel[level]) ) ;
        }
    }

})( vegas );

