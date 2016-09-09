/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global = vegas.global ; // jshint ignore:line
var trace  = vegas.trace  ; // jshint ignore:line
var core   = vegas.core   ; // jshint ignore:line
var system = vegas.system ; // jshint ignore:line

// -------- Imports

var IfTask      = system.logics.IfTask ;
var Do          = system.process.Do ;
var ElseIf      = system.logics.ElseIf ;
var EmptyString = system.rules.EmptyString ;
var Equals      = system.rules.Equals ;

// -------- init

var task ;

var do1 = new Do() ;
var do2 = new Do() ;
var do3 = new Do() ;
var do4 = new Do() ;

do1.something = function() { trace("do1 ###") } ;
do2.something = function() { trace("do2 ###") } ;
do3.something = function() { trace("do3 ###") } ;
do4.something = function() { trace("do4 ###") } ;

// -------- behaviors

var error = function( message , action  )
{
    trace( "error:" + action + " message:" + message ) ;
};

var finish = function( action )
{
    trace( "finish: " + action ) ;
};

var start = function( action )
{
    trace( "start: " + action ) ;
};

trace(' -------- test 1');

task = new IfTask( new EmptyString('') , do1 , do2 ) ;

task.finishIt.connect(finish) ;
task.errorIt.connect(error) ;
task.startIt.connect(start) ;

task.run() ;

task.clear() ;

trace(' -------- test 2');

task.clear() ;

task.rule = new Equals(1,2) ;

task.addThen( do1 )
    .addElse( do2 )
    .run() ;

trace(' -------- test 3 : <elseIf>');

task.clear() ;

task.addRule( new Equals(1,2) )
    .addThen( do1 )
    .addElseIf
    (
        new ElseIf( new Equals(2,1) , do3 ) ,
        new ElseIf( new Equals(2,2) , do4 )
    )
    .addElse( do2 )
    .run() ;

trace(' -------- test 4 : <then> is already register');

task.clear() ;
task.throwError = true ;

try
{
    task.addThen( do1 )
        .addElse( do2 )
        .addThen( do3 )
}
catch (e)
{
    trace( e ) ;
}

trace(' -------- test 5 : <rule> is not defined');

try
{
    task.run() ;
}
catch (e)
{
    trace( e ) ;
}

trace(' -------- test 6 : <rule> is not defined and throwError = false');

task.throwError = false ;

task.run() ;