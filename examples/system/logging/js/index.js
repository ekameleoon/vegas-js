/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var Log = system.logging.Log ;
    var LoggerLevel = system.logging.LoggerLevel ;
    var ConsoleTarget = system.logging.targets.ConsoleTarget ;

    var logger = Log.getLogger('application') ;

    var target = new ConsoleTarget
    ({
        includeChannel      : false  ,
        includeDate         : false ,
        includeLevel        : true  ,
        includeLines        : true  ,
        includeMilliseconds : true  ,
        includeTime         : true
    }) ;

    target.filters = ['*'] ;
    target.level   = LoggerLevel.ALL ;

    logger.debug( 'hello {0}, love it.'  , 'VEGAS' ) ;
    logger.info( 'hello, my name is {0}' , 'VEGAS' ) ;

    logger.log( 'hello {0}, simple log.' , 'VEGAS' ) ;
    logger.wtf( 'hello {0} ! WHAT ??'    , 'VEGAS' ) ;

    logger.critical( 'hello {0}, it\'s critical.'   , 'VEGAS' ) ;
    logger.error( 'hello {0}, an error is invoked.' , 'VEGAS' ) ;
    logger.warning( 'hello {0}, don\'t forget me.'  , 'VEGAS' ) ;

}