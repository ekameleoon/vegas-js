"use strict" ;

import './polyfill.js' ;

import { dump    } from './core/dump.js' ;
import { global  } from './core/global.js' ;

import { cancelAnimationFrame  } from './core/cancelAnimationFrame.js' ;
import { requestAnimationFrame } from './core/requestAnimationFrame.js' ;

import { isBoolean } from './core/isBoolean.js' ;
import { isNumber  } from './core/isNumber.js' ;
import { isString  } from './core/isString.js' ;

import { arrays   } from './core/arrays.js' ;
import { chars    } from './core/chars.js' ;
import { easings  } from './core/easings.js' ;
import { functors } from './core/functors.js' ;
import { maths    } from './core/maths.js' ;
import { numbers  } from './core/numbers.js' ;
import { objects  } from './core/objects.js' ;
import { random   } from './core/random.js' ;
import { reflect  } from './core/reflect.js' ;
import { strings  } from './core/strings.js' ;

/**
 * The VEGAS.js framework - The core library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace
 */
export var core = Object.assign
({
    global  : global ,
    dump    : dump ,
    cancelAnimationFrame  : cancelAnimationFrame ,
    requestAnimationFrame : requestAnimationFrame ,

    isBoolean : isBoolean ,
    isNumber  : isNumber ,
    isString  : isString ,

    arrays   : arrays ,
    chars    : chars ,
    easings  : easings,
    functors : functors,
    maths    : maths ,
    numbers  : numbers,
    objects  : objects ,
    random   : random ,
    reflect  : reflect ,
    strings  : strings
}) ;