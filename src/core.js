"use strict" ;

import './polyfill.js' ;

import { arrays  } from './core/arrays.js' ;
import { chars   } from './core/chars.js' ;
import { dump    } from './core/dump.js' ;
import { global  } from './core/global.js' ;
import { maths   } from './core/maths.js' ;
import { numbers } from './core/numbers.js' ;
import { objects } from './core/objects.js' ;
import { random  } from './core/random.js' ;
import { reflect } from './core/reflect.js' ;
import { strings } from './core/strings.js' ;

/**
 * The VEGAS.js framework - The core library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var core = Object.assign
({
    global  : global ,
    dump    : dump ,
    arrays  : arrays ,
    chars   : chars ,
    maths   : maths ,
    numbers : numbers,
    objects : objects ,
    random  : random ,
    reflect : reflect ,
    strings : strings
}) ;