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

    var logger = Log.getLogger('channel') ;

    var ExpressionFormatter = system.formatters.ExpressionFormatter ;

    var formatter = new ExpressionFormatter() ;

    formatter.set( "root"      , "c:"                     ) ;
    formatter.set( "system"    , "{root}/project/system"  ) ;
    formatter.set( "data.maps" , "{system}/data/maps"     ) ;
    formatter.set( "map"       , "{data.maps}/HashMap.as" ) ;

    var source = "the root : {root} - the class : {map}" ;
    // the root : c: - the class : c:/project/system/data/maps/HashMap.as

    logger.debug( formatter.length ) ;
    logger.debug( formatter.format( source ) ) ;

    logger.debug( "----" ) ;

    formatter.clear() ;

    formatter.set( "root"      , "c:"                     ) ;
    formatter.set( "system"    , "%root%/project/system" ) ;
    formatter.set( "data.maps" , "%system%/data/maps" ) ;
    formatter.set( "HashMap"   , "%data.maps%/HashMap.as" ) ;

    formatter.beginSeparator = "%" ;
    formatter.endSeparator   = "%" ;

    source = "the root : %root% - the class : %HashMap%" ;

    logger.debug( formatter.format( source ) ) ;
    // the root : c: - the class : c:/project/system/data/maps/HashMap.as

})( vegas );

