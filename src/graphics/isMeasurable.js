/*jshint unused: false*/
"use strict" ;

import { isNumber }  from '../core/isNumber.js' ;

/**
 * Indicates if the specific objet is a Measurable object.
 * @function
 * @memberof graphics
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is a Measurable object.
 */
export function isMeasurable( target )
{
    if( target )
    {
        return (( 'h' in target ) && isNumber(target.h) ) &&
               (( 'w' in target ) && isNumber(target.w) ) &&
               (( 'maxHeight' in target ) && isNumber(target.maxHeight) ) &&
               (( 'maxWidth' in target ) && isNumber(target.maxWidth) ) &&
               (( 'minHeight' in target ) && isNumber(target.minHeight) ) &&
               (( 'minWidth' in target ) && isNumber(target.minWidth) ) &&
               (( 'setPreferredSize' in target ) && (target.setPreferredSize instanceof Function)) &&
               (( 'setSize' in target ) && (target.setSize instanceof Function));
    }
    return false ;
}