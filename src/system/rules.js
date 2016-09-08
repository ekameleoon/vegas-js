"use strict" ;

import '../polyfill.js' ;

import { And }         from './rules/And.js' ;
import { BooleanRule } from './rules/BooleanRule.js' ;
import { DivBy }       from './rules/DivBy.js' ;
import { EmptyString } from './rules/EmptyString.js' ;
import { Equals }      from './rules/Equals.js' ;
import { isRule }      from './rules/Rule.js' ;
import { Rule }        from './rules/Rule.js' ;

/**
 * The VEGAS.js framework - The system.rules library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var rules = Object.assign
({
    // singletons
    isRule      : isRule ,

    // classes
    And         : And ,
    BooleanRule : BooleanRule ,
    EmptyString : EmptyString ,
    Equals      : Equals ,
    DivBy       : DivBy ,
    Rule        : Rule
}) ;