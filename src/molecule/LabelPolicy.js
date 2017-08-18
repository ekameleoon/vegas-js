"use strict" ;

/**
 * The policy enumeration of the label areas.
 * @summary The policy enumeration of the label areas.
 * @name LabelPolicy
 * @namespace molecule.LabelPolicy
 * @memberof molecule
 */
export var LabelPolicy = Object.defineProperties( {} ,
{
    /**
     * The label area take the height of the field to defines automatically this height.
     * @name AUTO
     * @memberof molecule.LabelPolicy
     * @static
     * @type {string}
     * @default 'auto'
     */
    AUTO : { enumerable : true , value : 'auto' } ,

    /**
     * The normal policy, the field take the size of the area.
     * @name NORMAL
     * @memberof molecule.LabelPolicy
     * @static
     * @type {string}
     * @default 'normal'
     */
    NORMAL : { enumerable : true , value : 'normal' }
}) ;