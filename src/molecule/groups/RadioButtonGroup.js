"use strict" ;

import { CoreGroup } from './CoreGroup.js' ;
import { isButton } from '../components/isButton.js' ;
import { isString } from '../../core/isString.js' ;

/**
 * This singleton class defined all groups for the different RadioButton in the application.
 * @name RadioButtonGroup
 * @class
 * @memberof molecule.groups
 * @extends molecule.groups.CoreGroup
 * @constructor
 */
export function RadioButtonGroup()
{
    CoreGroup.call( this ) ;
}

RadioButtonGroup.prototype = Object.create( CoreGroup.prototype ,
{
    constructor : { writable : true , value : RadioButtonGroup } ,

    /**
     * Selects the passed-in Groupable item.
     * @param {Object} item - The item to select.
     * @memberof molecule.groups.CoreGroup
     * @instance
     * @function
     */
    select : { writable : true , value : function ( item )
    {
        let button = isButton(item) ? item : null ;
        if ( !button || ( button.toggle !== true ) )
        {
            return ;
        }
        let name = button.groupName ;
        if ( this.groups.has( name ) )
        {
            let current = this.groups.get(name) ;
            if ( current !== button )
            {
                current.setSelected ( false , 'deselect' )  ;
            }
        }
        this.groups.set( name, button ) ;
    }},

    /**
     * Unselect the specified item in argument.
     * This item can be a Groupable object or the String representation of the name's group to unselect.
     * @param {Object} item - The item to unselect.
     * @memberof molecule.groups.CoreGroup
     * @instance
     * @function
     */
    unSelect : { writable : true , value : function ( item )
    {
        let name = null ;
        if ( isString(item) )
        {
            name = item ;
        }
        else if ( 'groupName' in item && isString(item.groupName) && item.groupName.length > 0 )
        {
            name = item.groupName ;
        }
        if ( this.groups.has( name ) )
        {
            let current = this.groups.get(name) ;
            if ( current )
            {
                current.setSelected ( false, true )  ;
                this.groups.delete( name ) ;
            }
        }
    }}
}) ;
