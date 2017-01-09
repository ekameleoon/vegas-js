/* globals PIXI */
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
    var graphics = vegas.graphics ; // jshint ignore:line

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

    var logger = Log.getLogger( 'channel' ) ;

    logger.info('---------- Start Example');

    // -----------------------

    var Point = function( x , y )
    {
        this.x = x ;
        this.y = y ;
    };

    Point.prototype.destroy = function()
    {
        logger.info( this + " destroy" ) ;
    }

    Point.prototype.init = function()
    {
        logger.info( this + " init" ) ;
    }

    Point.prototype.test = function( message = null )
    {
        logger.info( this + ' test message: ' + message ) ;
    }

    Point.prototype.toString = function()
    {
        return "[Point x:" + this.x + " y:" + this.y + "]" ;
    } ;

    // -----------------------

    var Slot = function()
    {
        logger.debug( this + ' constructor invoked') ;
    }

    Slot.prototype = Object.create( system.signals.Receiver.prototype ,
    {
        constructor : { value : Slot } ,
        receive : { value : function( message )
        {
            logger.info( 'slot receive ' + (message || 'an unknow message...') ) ;
        }},
        toString : { value : function() { return '[Slot]' ; } }
    })

    // -----------------------

    var ObjectFactory = system.ioc.ObjectFactory ;

    var factory = new ObjectFactory();
    var config  = factory.config ;

    //config.domain = vegas ;

    config.setConfigTarget({

        'origin'  : { x : 10 , y : 20 } ,
        'nirvana' : { x : 0  , y : 0  } ,
        area : new graphics.geom.Rectangle(0,0,700,200) ,
        renderer :
        {
            autoResize      : true ,
            backgroundColor : 0xA9A988,
            antialias       : false,
            transparent     : false,
            resolution      : 1
        }
    });

    config.setLocaleTarget({

        messages :
        {
            test : 'test'
        }
    });

    config.typePolicy = system.ioc.TypePolicy.ALL ;

    config.typeAliases =
    [
        { alias : "Signal" , type : "{signals}.Signal" }
    ];

    config.typeExpression =
    [
        { name : "system"  , value : "system"           } ,
        { name : "signals" , value : "{system}.signals" }
    ];

    var objects =
    [
        {
            id        : "signal" ,
            type      : system.signals.Signal ,
            dependsOn : [ 'slot' ] ,
            singleton : true ,
            lazyInit  : true
        },
        {
            id        : "slot" ,
            type      : Slot ,
            singleton : true ,
            lazyInit  : true ,
            receivers : [ { signal : "signal" } ]
        },
        {
            id   : "position" ,
            type : Point ,
            args : [ { value : 2 } , { ref : 'origin.y' }],
            sigleton   : true ,
            lazyInit   : true ,
            init       : 'init' ,
            properties :
            [
                { name : "x"     , ref   :'origin.x' } ,
                { name : "y"     , value : 100       } ,
                { name : '#init' , config : 'nirvana' }
            ]
        },
        {
            id         : "origin" ,
            type       : Point ,
            singleton  : true ,
            lazyInit   : true ,
            args       : [ { config : 'origin.x' } , { value : 20 }] ,
            properties :
            [
                { name : 'test' , args : [ { locale : 'messages.test' } ] }
            ]
        },
        {
            id : "renderer" ,
            type : Object ,
            staticFactoryMethod :
            {
                type : PIXI , name : 'autoDetectRenderer' , args :
                [
                    { config : "area.width"  } , { config : "area.height" } , { config : "renderer"    }
                ]
            },
            singleton : true ,
            lazyInit  : true
        }
    ];

    factory.run( objects );

    trace( factory.getObject('position') ) ;

    trace( factory.getObject('renderer') ) ;

    var signal = factory.getObject('signal') ;
    if( signal )
    {
        signal.emit( 'hello world' ) ;
    }
    else
    {
        logger.warning( 'The slot reference not must be null or undefined.' );
    }
}