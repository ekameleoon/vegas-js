/*jshint unused: false*/
"use strict" ;

import { isGroupable , Groupable } from './Groupable.js' ;

/**
 * Indicates if the specific objet is Groupable.
 * @function
 * @memberof molecule
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link molecule.Groupable|Groupable}.
 */
export function isFocusable( target )
{
    if( target )
    {
        return target instanceof Focusable ||
               ( isGroupable(target) && ( 'selected' in target ) ) ;
    }

    return false ;
}

/**
 * This interface defines an object groupable and focusable in the application.
 * @name Focusable
 * @memberof molecule
 * @interface
 */
export function Focusable()
{
    Groupable.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * A flag that indicates whether this control is selected.
         * @name selected
         * @memberof molecule.Groupable
         * @default false
         * @type {boolean}
         * @instance
         */
        selected : { value : false , configurable : true , writable : true }
    }) ;
}

Focusable.prototype = Object.create( Groupable.prototype ,
{
    constructor : { value : Focusable , writable : true }
});