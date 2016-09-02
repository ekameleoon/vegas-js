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


    var ExpressionFormatter = system.formatters.ExpressionFormatter ;

    var formatter = new ExpressionFormatter() ;

    formatter.expressions.set( "root"      , "c:"                     ) ;
    formatter.expressions.set( "system"    , "{root}/project/system"  ) ;
    formatter.expressions.set( "data.maps" , "{system}/data/maps"     ) ;
    formatter.expressions.set( "map"       , "{data.maps}/HashMap.as" ) ;

    var source = "the root : {root} - the class : {map}" ;
    // the root : c: - the class : c:/project/system/data/maps/HashMap.as

    trace( formatter.length ) ;
    trace( formatter.format( source ) ) ;

    trace( "----" ) ;

    formatter.clear() ;

    formatter.expressions.set( "root"      , "c:"                     ) ;
    formatter.expressions.set( "system"    , "%root%/project/system" ) ;
    formatter.expressions.set( "data.maps" , "%system%/data/maps" ) ;
    formatter.expressions.set( "HashMap"   , "%data.maps%/HashMap.as" ) ;

    formatter.beginSeparator = "%" ;
    formatter.endSeparator   = "%" ;

    source = "the root : %root% - the class : %HashMap%" ;

    trace( formatter.length ) ;
    trace( formatter.format( source ) ) ;
    // the root : c: - the class : c:/project/system/data/maps/HashMap.as

})( vegas );

