"use strict" ;

import { Action } from '../../process/Action.js' ;

import { MapModel } from './MapModel.js' ;

/**
 * Initialize the map model with an Array of ValueObject objects.
 * @summary Initialize the map model with an Array of ValueObject objects.
 * @name InitMapModel
 * @class
 * @memberof system.models.maps
 * @extends system.process.Action
 * @param {system.models.maps.MapModel} [model=null] The model to initialize.
 * @param {Array} [datas=null] The collection of ValueObject to fill the model.
 * @param {Boolean} [autoClear=false] Indicates if the model is auto cleared when the process start.
 * @param {Boolean} [autoSelect=false] Indicates if the first item inserted in the model must be selected.
 * @param {Boolean} [autoDequeue=false] Indicates if the datas collection is auto dequeued when the model is filled.
 * @param {Boolean} [cleanFirst=false] Indicates if the 'first' attribute must be autocleared when the process is finished.
 * @example
 * let model = new MapModel() ;
 * let datas =
 * [
 *     { id:1 , name:"test1" } ,
 *     { id:2 , name:"test2" } ,
 *     { id:3 , name:"test3" } ,
 *     { id:4 , name:"test4" } ,
 *     { id:5 , name:"test5" } ,
 *     { id:6 , name:"test6" }
 * ] ;
 *
 * let init = new InitMapModel( model , datas ) ;
 *
 * init.first = 3 ; // id = 3
 *
 * init.autoSelect  = true ; // auto select the 'first' entry
 * init.autoDequeue = true ; // dequeue the datas array collection
 * init.autoClear   = false ; // auto clear the model when the process is started
 *
 * init.run() ;
 */
export function InitMapModel ( model = null , datas = null  , autoClear = false , autoSelect = false , autoDequeue = false , cleanFirst = false )
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Indicates if the model is autocleared when the process start.
         * @memberof system.models.maps.InitMapModel
         * @type {Boolean}
         * @instance
         * @default <code>false</code>
         */
        autoClear : { value : autoClear === true , writable : true } ,

        /**
         * Indicates if the datas Array elements are dequeued during the process.
         * @memberof system.models.maps.InitMapModel
         * @type {Boolean}
         * @instance
         * @default <code>false</code>
         */
        autoDequeue : { value : autoDequeue === true , writable : true } ,

        /**
         * Indicates if the first item inserted in the model must be selected.
         * @memberof system.models.maps.InitMapModel
         * @type {Boolean}
         * @instance
         * @default <code>false</code>
         */
        autoSelect : { value : autoSelect === true , writable : true } ,

        /**
         * Indicates if the first attribute must be autocleared when the process is finished.
         * @memberof system.models.maps.InitMapModel
         * @type {Boolean}
         * @instance
         * @default <code>false</code>
         */
        cleanFirst : { value : cleanFirst === true , writable : true } ,

        /**
         * The Array representation of all ValueObject to insert in the map model.
         * @memberof system.models.maps.InitMapModel
         * @type {Array}
         * @instance
         * @default <code>null</code>
         */
        datas : { value : (datas instanceof Array) ? datas : null , writable : true } ,

        /**
         * Indicates if the first item inserted in the model must be selected.
         * @memberof system.models.maps.InitMapModel
         * @type {Object}
         * @instance
         * @default <code>null</code>
         */
        first : { value : null , writable : true } ,

        /**
         * The model reference to initialize.
         * @memberof system.models.maps.InitMapModel
         * @type {system.models.maps.MapModel}
         * @instance
         * @default <code>null</code>
         */
        model : { value : (model instanceof MapModel) ? model : null , writable : true }
    }) ;
}

InitMapModel.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : InitMapModel },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.models.maps.InitMapModel
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new InitMapModel( this.models , this.datas , this.autoClear , this.autoSelect , this.autoDequeue , this.cleanFirst ) ;
    }},

    /**
     * Transforms the passed-in value. This method is used in the run() method to filter all elements in the datas array.
     * @memberof system.models.maps.InitMapModel
     * @function
     * @instance
     */
    filterEntry : { writable : true , value : function( value )
    {
        return value ; // override to filter the entries in the model before to add it.
    }},

    /**
     * Reset the process.
     * @memberof system.models.maps.InitMapModel
     * @function
     * @instance
     */
    reset : { writable : true , value : function()
    {
        this.datas = null ;
    }},

    /**
     * Run the process.
     * @memberof system.models.maps.InitMapModel
     * @function
     * @instance
     */
    run : { writable : true , value : function( ...args )
    {
        this.notifyStarted() ;

        if( !(this.model instanceof MapModel) )
        {
            this.notifyFinished() ;
            return ;
        }

        if( (this.autoClear === true) && !(this.model.isEmpty()) )
        {
            this.model.clear() ;
        }

        if ( args.length > 0 )
        {
            this.datas = args[0] instanceof Array ? args[0] : null ;
        }

        if( !(this.datas instanceof Array) || this.datas.length === 0 )
        {
            this.notifyFinished() ;
            return ;
        }

        let entry ;
        let size = this.datas.length ;

        for( let i = 0 ; i < size ; i++ )
        {
            entry = this.filterEntry( this.datas[i] ) ;

            this.model.add( entry ) ;

            if ( this.first === null && entry !== null )
            {
                this.first = entry ;
            }
        }

        if( this.datas && (this.datas instanceof Array) && (this.autoDequeue === true) )
        {
            this.datas.length = 0 ;
        }

        if ( this.first !== null && (this.autoSelect === true) )
        {
            if ( this.model.has( this.first ) )
            {
                this.model.current = this.model.get( this.first ) ;
            }
            else
            {
                this.model.current = this.first ;
            }

            if ( this.cleanFirst === true )
            {
                this.first = null ;
            }
        }
        this.notifyFinished() ;
    }}
});