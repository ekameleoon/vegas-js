"use strict" ;

/**
 * The enumeration of all the interactive modes in the components.
 * @summary The enumeration of all the interactive modes in the components.
 * @name InteractiveMode
 * @namespace molecule.InteractiveMode
 * @memberof molecule
 */
export var InteractiveMode = Object.defineProperties( {} ,
{
    /**
     * This mode try to register all mouse, pointer or touch events in the component.
     * @name AUTO
     * @memberof molecule.InteractiveMode
     * @static
     * @type {string}
     * @default 'auto'
     */
    AUTO : { enumerable : true , value : 'auto' } ,

    /**
     * Register only the touch events.
     * @name MOUSE
     * @memberof molecule.InteractiveMode
     * @static
     * @type {string}
     * @default 'mouse'
     */
    MOUSE : { enumerable : true , value : 'mouse' },

    /**
     * Register only the pointer events.
     * @name POINTER
     * @memberof molecule.InteractiveMode
     * @static
     * @type {string}
     * @default 'pointer'
     */
    POINTER : { enumerable : true , value : 'pointer' },

    /**
     * Register only the touch events.
     * @name TOUCH
     * @memberof molecule.InteractiveMode
     * @static
     * @type {string}
     * @default 'touch'
     */
    TOUCH : { enumerable : true , value : 'touch' }
}) ;