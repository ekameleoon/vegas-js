"use strict" ;

/**
 * The deployment phases (OPEN or CLOSE or PROTECTED).
 * @summary The deployment phases (OPEN or CLOSE or PROTECTED).
 * @name Deployment
 * @namespace molecule.Deployment
 * @memberof molecule
 */
export var Deployment = Object.defineProperties( {} ,
{
    /**
     * The close phase.
     * @name CLOSE
     * @memberof molecule.Deployment
     * @static
     * @type {string}
     * @default 'close'
     */
    CLOSE : { enumerable : true , value : 'close' } ,

    /**
     * The open phase.
     * @name OPEN
     * @memberof molecule.Deployment
     * @static
     * @type {string}
     * @default 'open'
     */
    OPEN : { enumerable : true , value : 'open' } ,

    /**
     * The protected phase.
     * @name PROTECTED
     * @memberof molecule.Deployment
     * @static
     * @type {string}
     * @default 'on'
     */
    PROTECTED : { enumerable : true , value : 'protected' }
}) ;