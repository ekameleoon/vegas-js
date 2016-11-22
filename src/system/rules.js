"use strict" ;

import '../polyfill.js' ;

import { And }                 from './rules/And.js' ;
import { BooleanRule }         from './rules/BooleanRule.js' ;
import { DivBy }               from './rules/DivBy.js' ;
import { EmptyString }         from './rules/EmptyString.js' ;
import { Equals }              from './rules/Equals.js' ;
import { Even }                from './rules/Even.js' ;
import { False }               from './rules/False.js' ;
import { GreaterOrEqualsThan } from './rules/GreaterOrEqualsThan.js' ;
import { GreaterThan }         from './rules/GreaterThan.js' ;
import { IsBoolean }           from './rules/IsBoolean.js' ;
import { IsNumber }            from './rules/IsNumber.js' ;
import { IsString }            from './rules/IsString.js' ;
import { LessOrEqualsThan }    from './rules/LessOrEqualsThan.js' ;
import { LessThan }            from './rules/LessThan.js' ;
import { Not }                 from './rules/Not.js' ;
import { NotEquals }           from './rules/NotEquals.js' ;
import { Null }                from './rules/Null.js' ;
import { Odd }                 from './rules/Odd.js' ;
import { Or }                  from './rules/Or.js' ;
import { Rule }                from './rules/Rule.js' ;
import { True }                from './rules/True.js' ;
import { Undefined }           from './rules/Undefined.js' ;
import { Zero }                from './rules/Zero.js' ;

import { isRule } from './rules/Rule.js' ;

/**
 * The VEGAS.js framework - The system.rules library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.rules
 * @memberof system
 */
export var rules = Object.assign
({
    // singletons
    isRule : isRule ,

    // classes
    And                 : And ,
    BooleanRule         : BooleanRule ,
    DivBy               : DivBy ,
    EmptyString         : EmptyString ,
    Equals              : Equals ,
    Even                : Even ,
    False               : False ,
    GreaterOrEqualsThan : GreaterOrEqualsThan ,
    GreaterThan         : GreaterThan ,
    IsBoolean           : IsBoolean ,
    IsNumber            : IsNumber ,
    IsString            : IsString ,
    LessOrEqualsThan    : LessOrEqualsThan ,
    LessThan            : LessThan ,
    Odd                 : Odd ,
    Not                 : Not ,
    NotEquals           : NotEquals ,
    Null                : Null ,
    Or                  : Or ,
    Rule                : Rule,
    True                : True,
    Undefined           : Undefined,
    Zero                : Zero
}) ;