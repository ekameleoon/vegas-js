"use strict" ;

import '../polyfill.js' ;

import { MagicReference }  from './ioc/MagicReference.js' ;
import { ObjectArgument }  from './ioc/ObjectArgument.js' ;
import { ObjectAttribute } from './ioc/ObjectAttribute.js' ;
import { ObjectListener }  from './ioc/ObjectListener.js' ;
import { ObjectMethod }    from './ioc/ObjectMethod.js' ;
import { ObjectOrder }     from './ioc/ObjectOrder.js' ;
import { ObjectScope }     from './ioc/ObjectScope.js' ;
import { ObjectProperty }  from './ioc/ObjectProperty.js' ;
import { ObjectReceiver }  from './ioc/ObjectReceiver.js' ;
import { Parameters }      from './ioc/Parameters.js' ;
import { TypePolicy }      from './ioc/TypePolicy.js' ;

/**
 * The VEGAS.js framework - The system.errors library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var ioc = Object.assign
({
    MagicReference  : MagicReference,
    ObjectArgument  : ObjectArgument,
    ObjectAttribute : ObjectAttribute,
    ObjectListener  : ObjectListener,
    ObjectMethod    : ObjectMethod,
    ObjectOrder     : ObjectOrder,
    ObjectProperty  : ObjectProperty,
    ObjectReceiver  : ObjectReceiver,
    ObjectScope     : ObjectScope,
    Parameters      : Parameters,
    TypePolicy      : TypePolicy
}) ;