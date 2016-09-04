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

    var Log           = system.logging.Log ;
    var LoggerLevel   = system.logging.LoggerLevel ;
    var ConsoleTarget = system.logging.targets.ConsoleTarget ;

    var target = new ConsoleTarget
    ({
        includeChannel      : true  ,
        includeDate         : false  ,
        includeLevel        : true  ,
        includeLines        : true  ,
        includeMilliseconds : true  ,
        includeTime         : true
    }) ;

    target.filters = ['*'] ;
    target.level   = LoggerLevel.ALL ;

    var logger = Log.getLogger('channel1') ;
    var log    = Log.getLogger('channel2') ;

    logger.log( "Here is some myDebug info : {0} and {1}", 2.25 , true ) ;
    logger.debug( "Here is some debug message." ) ;
    logger.info( "Here is some info message." ) ;
    logger.warning( "Here is some warn message." ) ;
    logger.error( "Here is some error message." ) ;
    logger.critical( "Here is some critical error..." ) ;

    target.includeDate    = false ;
    target.includeTime    = false ;
    target.includeChannel = true ;

    logger.info( "test : [{0}, {1}, {2}]", 2, 4, 6 ) ;
    log.info( "test : [{0}, {1}, {2}]", 2, 4, 6 ) ;

})( vegas );

