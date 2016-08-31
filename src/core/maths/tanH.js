"use strict" ;

import { cosH } from './cosH.js' ;
import { sinH } from './sinH.js' ;

/**
 * Calculates the Hyperbolic tangent.
 */
export var tanH = ( x ) => sinH(x) / cosH(x) ;
