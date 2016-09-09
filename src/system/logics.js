"use strict" ;

import '../polyfill.js' ;


import { ElseIf } from './logics/ElseIf.js' ;
import { ElseIfEmptyString } from './logics/ElseIfEmptyString.js' ;

import { IfTask } from './logics/IfTask.js' ;
import { IfEmptyString } from './logics/IfEmptyString.js' ;

/**
 * The VEGAS.js framework - The system.logics library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var logics = Object.assign
({
    ElseIf : ElseIf ,
    ElseIfEmptyString : ElseIfEmptyString ,

    IfTask : IfTask,
    IfEmptyString : IfEmptyString
}) ;