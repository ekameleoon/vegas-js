"use strict" ;

import './polyfill/Object.js' ;

import { dump    } from './core/dump.js' ;
import { global  } from './core/global.js' ;

import { cancelAnimationFrame  } from './core/cancelAnimationFrame.js' ;
import { requestAnimationFrame } from './core/requestAnimationFrame.js' ;

import { isBoolean } from './core/isBoolean.js' ;
import { isFloat   } from './core/isFloat.js' ;
import { isInt     } from './core/isInt.js' ;
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
 * The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies : arrays, strings, chars, objects, numbers, maths, etc.
 * <p>You can consider a library as a set of functions organized into classes, here with a <strong>"core"</strong> library in some cases we organize the functions in the package definitions without assembling them into a class.</p>
 * <p>Those functions are allowed to reuse the builtin types (Object, Array, etc.), the Javascript API classes and packages, but nothing else.</p>
 * @summary The {@link core} package is specialized in functions utilities that are highly reusable without creating any dependencies.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core
 * @version 1.0.7
 * @since 1.0.0
 */
export var core = Object.assign
({
    global  : global ,
    dump    : dump ,
    cancelAnimationFrame  : cancelAnimationFrame ,
    requestAnimationFrame : requestAnimationFrame ,

    isBoolean : isBoolean ,
    isFloat   : isFloat ,
    isInt     : isInt ,
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