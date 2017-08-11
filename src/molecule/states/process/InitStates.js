"use strict" ;

import { InitMapModel } from './system/models/maps/InitMapModel.js' ;
import { State } from '../State.js' ;

/**
 * This process is invoked to initialize all states in the application.
 * @summary Invoked to initialize all states in the application.
 * @name InitStates
 * @class
 * @memberof molecule.states.process
 * @implements system.models.maps.InitMapModel
 * @constructs
 * @param {system.models.maps.MapModel} [model=null] The model to initialize.
 * @param {Array} [datas=null] The collection of ValueObject to fill the model.
 * @param {Boolean} [autoClear=false] Indicates if the model is auto cleared when the process start.
 * @param {Boolean} [autoSelect=false] Indicates if the first item inserted in the model must be selected.
 * @param {Boolean} [autoDequeue=false] Indicates if the datas collection is auto dequeued when the model is filled.
 * @param {Boolean} [cleanFirst=false] Indicates if the 'first' attribute must be autocleared when the process is finished.
 */
export function InitStates( model = null , datas = null  , autoClear = false , autoSelect = false , autoDequeue = false , cleanFirst = false )
{
    InitMapModel.call( this , model , datas , autoClear , autoSelect , autoDequeue , cleanFirst ) ;
}

InitStates.prototype = Object.create( InitMapModel.prototype ,
{
    constructor : { writable : true , value : InitStates } ,

    /**
     * Transforms the passed-in value in a State or a null object.
     * @name run
     * @memberof vr.states.process
     * @instance
     * @function
     */
    filterEntry : { value : function ( value )
    {
        return (value instanceof State) ? value : null ;
    }}
}) ;