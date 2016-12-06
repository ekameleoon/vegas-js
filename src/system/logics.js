"use strict" ;

import '../polyfill/Object.js' ;

import { ElseIf } from './logics/ElseIf.js' ;
import { ElseIfEmptyString } from './logics/ElseIfEmptyString.js' ;
import { ElseIfEquals } from './logics/ElseIfEquals.js' ;
import { ElseIfFalse } from './logics/ElseIfFalse.js' ;
import { ElseIfNull } from './logics/ElseIfNull.js' ;
import { ElseIfTrue } from './logics/ElseIfTrue.js' ;
import { ElseIfUndefined } from './logics/ElseIfUndefined.js' ;
import { ElseIfZero } from './logics/ElseIfZero.js' ;

import { IfEmptyString } from './logics/IfEmptyString.js' ;
import { IfEquals } from './logics/IfEquals.js' ;
import { IfFalse } from './logics/IfFalse.js' ;
import { IfNull } from './logics/IfNull.js' ;
import { IfTask } from './logics/IfTask.js' ;
import { IfTrue } from './logics/IfTrue.js' ;
import { IfUndefined } from './logics/IfUndefined.js' ;
import { IfZero } from './logics/IfZero.js' ;

/**
 * The {@link system.logics} library perform some tasks based on whether a given condition holds <code>true</code> or not.
 * <p>This task is heavily based on the Condition framework that can be found in the {@link system.rules} library.</p>
 * <p>In addition to the {@link system.rules.Rule|Rule} condition, you can specify three different child actions based on the {@link system.process.Action|Action} :  <code>elseif</code>, <code>then</code> and <code>else</code>. All three subelements are optional. Both <code>then</code> and <code>else</code> must not be used more than once inside the if task. Both are containers for tasks, just like {@link system.process.BatchTask|BatchTask} and {@link system.process.Chain|Chain} tasks.</p>
 * @summary The {@link system.logics} library perform some tasks based on whether a given condition holds <code>true</code> or not.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.logics
 * @memberof system
 * @example
 * // -------- Imports
 *
 * var IfTask      = system.logics.IfTask ;
 * var Do          = system.process.Do ;
 * var ElseIf      = system.logics.ElseIf ;
 * var EmptyString = system.rules.EmptyString ;
 * var Equals      = system.rules.Equals ;
 *
 * // -------- init
 *
 * var task ;
 *
 * var do1 = new Do() ;
 * var do2 = new Do() ;
 * var do3 = new Do() ;
 * var do4 = new Do() ;
 *
 * do1.something = function() { trace("do1 ###") } ;
 * do2.something = function() { trace("do2 ###") } ;
 * do3.something = function() { trace("do3 ###") } ;
 * do4.something = function() { trace("do4 ###") } ;
 *
 * // -------- behaviors
 *
 * var error = function( message , action  )
 * {
 *     trace( "error:" + action + " message:" + message ) ;
 * };
 *
 * var finish = function( action )
 * {
 *     trace( "finish: " + action ) ;
 * };
 *
 * var start = function( action )
 * {
 *     trace( "start: " + action ) ;
 * };
 *
 * trace(' -------- test 1');
 *
 * task = new IfTask( new EmptyString('') , do1 , do2 ) ;
 *
 * task.finishIt.connect(finish) ;
 * task.errorIt.connect(error) ;
 * task.startIt.connect(start) ;
 *
 * task.run() ;
 *
 * task.clear() ;
 *
 * trace(' -------- test 2');
 *
 * task.clear() ;
 *
 * task.rule = new Equals(1,2) ;
 *
 * task.addThen( do1 )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 3 : <elseIf>');
 *
 * task.clear() ;
 *
 * task.addRule( new Equals(1,2) )
 *     .addThen( do1 )
 *     .addElseIf
 *     (
 *         new ElseIf( new Equals(2,1) , do3 ) ,
 *         new ElseIf( new Equals(2,2) , do4 )
 *     )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 4 : <then> is already register');
 *
 * task.clear() ;
 * task.throwError = true ;
 *
 * try
 * {
 *     task.addThen( do1 )
 *         .addElse( do2 )
 *         .addThen( do3 )
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 5 : <rule> is not defined');
 *
 * try
 * {
 *     task.run() ;
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 6 : <rule> is not defined and throwError = false');
 *
 * task.throwError = false ;
 *
 * task.run() ;
 */
export var logics = Object.assign
({
    ElseIf : ElseIf ,
    ElseIfEmptyString : ElseIfEmptyString ,
    ElseIfEquals : ElseIfEquals ,
    ElseIfFalse : ElseIfFalse ,
    ElseIfNull : ElseIfNull ,
    ElseIfTrue : ElseIfTrue ,
    ElseIfUndefined : ElseIfUndefined ,
    ElseIfZero : ElseIfZero ,

    IfEmptyString : IfEmptyString,
    IfEquals : IfEquals,
    IfFalse : IfFalse,
    IfNull : IfNull,
    IfTask : IfTask,
    IfTrue : IfTrue,
    IfUndefined : IfUndefined,
    IfZero : IfZero
}) ;