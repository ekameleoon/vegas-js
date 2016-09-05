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

    var ObjectFactory = system.ioc.ObjectFactory ;

var factory = new ObjectFactory();

var objects =
[
    {
        id         : "signal" ,
        type       : "system.signals.Signal" ,
        singleton  : true,
        lazyInit   : true ,
        properties :
        [
            // { name:"defaultTextFormat" , value:new TextFormat("Verdana", 11) } ,
            // { name:"selectable"        , value:false                         } ,
            // { name:"text"              , value:"hello world"                 } ,
            // { name:"textColor"         , value:0xF7F744                      } ,
            // { name:"x"                 , value:100                           } ,
            // { name:"y"                 , value:100                           }
        ]
    }
];

factory.run( objects );

var signal = factory.getObject('signal') ;

console.log( signal ) ;

})( vegas );