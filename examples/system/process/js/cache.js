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

    var Cache = system.process.Cache ;

    var object = {} ;

    object.a = 1 ;
    object.b = 2 ;
    object.c = 3 ;
    object.d = 4 ;

    Object.defineProperties( object ,
    {
        method1 :
        {
            value : function( value )
            {
                this.c = value ;
            }
        },
        method2 :
        {
            value : function( value1 , value2 )
            {
                this.d = value1 + value2 ;
            }
        }
    });

    trace( core.dump(object) ) ; // {a:1,b:2,c:3,d:4}

    var cache = new Cache() ;

    cache.addAttribute( "a" , 10 ) ;
    cache.addAttribute( "b" , 20 ) ;

    cache.addMethod( "method1" , 30 ) ;
    cache.addMethodWithArguments( "method2" , [ 40 , 50 ] ) ;

    cache.target = object ;

    cache.run() ; // flush the cache and initialize the target or invoked this methods.

    trace( core.dump(object) ) ; // {a:10,b:20,c:30,d:90}
}