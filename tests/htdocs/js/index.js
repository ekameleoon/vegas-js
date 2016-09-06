/* globals vegas */
"use strict" ;

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

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global = vegas.global ; // jshint ignore:line
var trace  = vegas.trace  ; // jshint ignore:line
var core   = vegas.core   ; // jshint ignore:line
var system = vegas.system ; // jshint ignore:line

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

//config.domain = vegas ;

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
        id   : "signal" ,
        type : "system.signals.Signal" ,
        properties :
        [
        ]
    },
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

console.log( factory.getObject('position') ) ;
console.log( factory.getObject('signal') ) ;
//logger.info( pos ) ;
