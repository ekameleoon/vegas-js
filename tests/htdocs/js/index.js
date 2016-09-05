var trace  ; // jshint ignore:line
var system ; // jshint ignore:line
var core   ; // jshint ignore:line

/* globals vegas */
( function( vegas )
{
    "use strict" ;

    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    trace  = vegas.trace  ; // jshint ignore:line
    system = vegas.system ; // jshint ignore:line
    core   = vegas.core   ; // jshint ignore:line

    var Log           = system.logging.Log ;
    var LoggerLevel   = system.logging.LoggerLevel ;
    var ConsoleTarget = system.logging.targets.ConsoleTarget ;

    var target = new ConsoleTarget
    ({
        includeChannel      : true  ,
        includeDate         : false ,
        includeLevel        : true  ,
        includeLines        : true  ,
        includeMilliseconds : true  ,
        includeTime         : true
    }) ;

    target.filters = ['*'] ;
    target.level   = LoggerLevel.ALL ;

    var logger = Log.getLogger('channel') ;

    logger.info('hello info');

    var definition = core.reflect.getDefinitionByName('system.signals.Signal') ;

    var signal = core.reflect.invoke( definition ) ;
    trace( signal ) ;

})( vegas );