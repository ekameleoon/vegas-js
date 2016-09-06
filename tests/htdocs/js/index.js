"use strict" ;

var trace  ; // jshint ignore:line
var system ; // jshint ignore:line
var core   ; // jshint ignore:line
var global ; // jshint ignore:line

var Point = function( x , y )
{
    this.x = x ;
    this.y = y ;
    console.log("constructor:" + this.toString() ) ;
};

Point.prototype.test = function( message = null )
{
    console.log( 'test:' + this.toString() + " message:" + message ) ;
}

Point.prototype.toString = function()
{
    return "[Point x:" + this.x + " y:" + this.y + "]" ;
} ;

/* globals vegas */
( function( vegas )
{
    //"use strict" ;

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
    var config  = factory.config ;

    config.setConfigTarget({

        'origin' : { x : 10 , y : 20 }
    });

    config.setLocaleTarget({

        messages :
        {
            test : 'test'
        }
    });

    var objects =
    [
        {
            id   : "position" ,
            type : "Point" ,
            args : [ { value : 2 } , { ref : 'origin.y' }],
            properties :
            [
                { name : "x" , ref   :'origin.x' } ,
                { name : "y" , value : 100       }
            ]
        },
        {
            id         : "origin" ,
            type       : "Point" ,
            singleton  : true ,
            args       : [ { config : 'origin.x' } , { value : 20 }] ,
            properties :
            [
                { name : 'test' , args : [ { locale : 'messages.test' } ] }
            ]
        }
    ];

    factory.run( objects );

    var pos = factory.getObject('position') ;

    logger.info( pos ) ;

})( vegas );