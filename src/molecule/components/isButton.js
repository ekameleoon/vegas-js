/*jshint unused: false*/
"use strict" ;

import { isBoolean }   from '../../core/isBoolean.js' ;

/**
 * Indicates if the specific objet is a button.
 * A button is an object who contains the selected:Boolean, toggle:Boolean, group:Boolean, groupName:String properties and the setSelected method.
 * @function
 * @memberof molecule.components
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is a button.
 */
export function isButton( target )
{
    if( target )
    {
        return (( 'group' in target ) && isBoolean(target.group) ) &&
               ( 'groupName' in target ) &&
               (( 'selected' in target ) && isBoolean(target.selected) ) &&
               (( 'toggle' in target ) && isBoolean(target.toggle) ) &&
               (( 'setSelected' in target ) && (target.setSelected instanceof Function));
    }
    return false ;
}