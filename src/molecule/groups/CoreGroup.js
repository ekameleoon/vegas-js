"use strict" ;

import { ArrayMap }  from '../../system/data/maps/ArrayMap.js' ;
import { isGroupable } from '../Groupable.js' ;
import { Receiver }  from '../../system/signals/Receiver.js' ;

/**
 * This display is used to create a background in your application or in an other display of the application.
 * @name Background
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.Element
 * @constructor
 */
export function CoreGroup()
{
    Object.defineProperties( this ,
    {
        /**
         * The internal Map reference of this manager.
         * @memberof molecule.groups.CoreGroup
         * @instance
         */
        groups : { writable : true , value : new ArrayMap() }
    });

    Receiver.call( this ) ;
}

CoreGroup.prototype = Object.create( Receiver.prototype ,
{
    constructor : { writable : true , value : CoreGroup } ,

    /**
     * Returns <code>true</code> if the specified group name exist.
     * @return <code>true</code> if the specified group name exist.
     * @memberof system.signals.Receiver
     * @function
     */
    contains : { value : function ( name )
    {
        return this.groups.has( name ) ;
    }},

    /**
     * Returns the current Groupable object selected with the passed-in group name.
     * @memberof system.signals.Receiver
     * @function
     */
    get : { value : function( name )
    {
        return this.groups.get( name ) ;
    }},

    /**
     * This method is called when the receiver is connected with a Signal object.
     * @memberof system.signals.Receiver
     * @function
     */
    receive : { writable : true , value : function( group )
    {
        let target = isGroupable(group) ? group : null ;
        if ( target )
        {
            this.select( target ) ;
        }
    }} ,

    /**
     * Selects the passed-in Groupable item.
     * @param {Object} item - The item to select.
     * @memberof molecule.groups.CoreGroup
     * @instance
     * @function
     */
    select : { writable : true , value : function ( item )
    {
        return item ;
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
        return item ;
    }}
}) ;
