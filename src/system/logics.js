"use strict" ;

import '../polyfill.js' ;

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
 * The VEGAS.js framework - The system.logics library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
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