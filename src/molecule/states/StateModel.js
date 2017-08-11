"use strict" ;

import { MapModel } from './system/models/maps/MapModel.js' ;
import { State }    from './State.js' ;

/**
 * The state model.
 * @summary Defines a state model.
 * @name StateModel
 * @class
 * @memberof com.ooopener.states
 * @implements system.models.maps.MapModel
 * @constructs
 */
export function StateModel()
{
    MapModel.call( this ) ;
}

StateModel.prototype = Object.create( MapModel.prototype ,
{
    constructor : { writable : true , value : StateModel } ,

    /**
     * Returns <code>true</code> if the specific value is valid.
     * @param {*} value - The value to check.
     * @return <code>true</code> if the specific value is valid.
     * @name supports
     * @memberof system.models.Model
     * @function
     * @instance
     */
    supports : { writable : true , value : function( value )
    {
        return value instanceof State ;
    }}
}) ;