/*jshint unused: false*/
"use strict" ;

import { isGroupable , Groupable } from './Groupable.js' ;

/**
 * Indicates if the specific objet is Iconifiable.
 * @function
 * @memberof molecule
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link molecule.Iconifiable|Iconifiable}.
 */
export function isIconifiable( target )
{
    if( target )
    {
        return target instanceof Iconifiable || ( 'icon' in target ) ;
    }

    return false ;
}

/**
 * This interface defines all display components with an icon.
 * @name Iconifiable
 * @memberof molecule
 * @interface
 */
export function Iconifiable()
{
    Object.defineProperties( this ,
    {
        /**
         * An icon reference.
         * @name icon
         * @memberof molecule.Iconifiable
         * @default false
         * @type {boolean}
         * @instance
         */
        icon : { value : null , configurable : true , writable : true }
    }) ;
}

Iconifiable.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Iconifiable , writable : true }
});