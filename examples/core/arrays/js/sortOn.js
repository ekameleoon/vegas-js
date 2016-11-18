/* globals vegas */
/*jshint bitwise: false*/
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

window.onload = function()
{
    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var echo = function( a )
    {
        var l = a.length ;
        for (var i = 0; i < l; i++)
        {
            trace( ">> " + a[i].name + " :: " + a[i].num ) ;
        }
    }

    trace ("---- Initialize") ;

    var a =
    [
        { name:"test 0" , num:6 } ,
        { name:"Test 1" , num:8 } ,
        { name:"test 2" , num:4 } ,
        { name:"test 3" , num:10 }
    ] ;

    echo(a) ;

    trace ("---- sort num Array.NUMERIC | Array.DESCENDING") ;

    core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING) ;

    echo(a) ;

    trace ("---- sort num Array.NUMERIC | Array.ASCENDING") ;

    core.arrays.sortOn( a , "num", Array.NUMERIC | Array.ASCENDING) ;

    echo(a) ;

    trace ("---- sort name") ;

    core.arrays.sortOn( a , "name" ) ;

    echo(a) ;

    trace ("---- sort name Array.CASEINSENSITIVE") ;

    core.arrays.sortOn( a , "name", Array.CASEINSENSITIVE) ;

    echo(a) ;

    trace ("---- sort name Array.RETURNINDEXEDARRAY") ;

    //var result = core.arrays.sortOn( a , "name", Array.CASESEINSENTIVE | Array.RETURNINDEXEDARRAY) ;
    //var result = core.arrays.sortOn( a , "name", Array.RETURNINDEXEDARRAY) ;
    //trace (result) :

    var result ;

    result = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY ) ;
    trace (result) ;

    result  = core.arrays.sortOn( a , "num", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
    trace (result) ;

    result  = core.arrays.sortOn( a , "name", Array.NUMERIC | Array.RETURNINDEXEDARRAY ) ;
    trace (result) ;

    trace ("---- sort name Array.UNIQUESORT") ;

    a.push({ name:"test 1" , num:60 } ) ;

    core.arrays.sortOn( a , "name", Array.UNIQUESORT ) ;

    echo(a) ;

}