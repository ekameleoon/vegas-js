"use strict" ;

/**
 * This {@link molecule.ScrollPolicy} enumeration of all types used to draw an Arc.
 * @summary This {@link molecule.ScrollPolicy} enumeration of all types used to draw an Arc.
 * @name ScrollPolicy
 * @namespace molecule.ScrollPolicy
 * @memberof molecule
 */
export var ScrollPolicy = Object.defineProperties( {} ,
{
    /**
     * Show the scrollbar if the children exceed the owner's dimension.
     * The size of the owner is not adjusted to account for the scrollbars when they appear
     * so this may cause the scrollbar to obscure the contents of the control or container.
     * @memberof molecule.ScrollPolicy
     * @static
     * @type {string}
     * @default 'auto'
     */
    AUTO : { enumerable : true , value : 'auto' } ,

    /**
     * Never show the scrollbar.
     * @memberof molecule.ScrollPolicy
     * @static
     * @type {string}
     * @default 'off'
     */
    OFF : { enumerable : true , value : 'off' } ,

    /**
     * Always show the scrollbar.
     * The size of the scrollbar is automatically added to the size of the owner's contents
     * to determine the size of the owner if explicit sizes are not specified.
     * @memberof molecule.ScrollPolicy
     * @static
     * @type {string}
     * @default 'on'
     */
    ON : { enumerable : true , value : 'on' }
}) ;