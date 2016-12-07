"use strict" ;

import { Model }  from "./Model.js" ;
import { Signal } from "../signals/Signal.js" ;

/**
 * This model can keep an object in memory and emit messages if this object is changing.
 * @name ChangeModel
 * @class
 * @memberof system.models
 * @implements system.models.Model
 * @example
 * var beforeChanged = function( value , model )
 * {
 *     trace( "before:" + value + " current:" + model.current ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "change:" + value + " current:" + model.current ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "clear current:" + model.current ) ;
 * }
 *
 * var model = new ChangeModel() ;
 *
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * model.current = "hello" ;
 * model.current = "world" ;
 * model.current = null ;
 */
export function ChangeModel()
{
    Model.call( this );
    
    Object.defineProperties( this ,
    {
        /**
         * Emits a message before the current object in the model is changed.
         * @name beforeChanged
         * @memberof system.models.ChangeModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        beforeChanged : { value : new Signal() } ,

        /**
         * Emits a message when the current object in the model is changed.
         * @name changed
         * @memberof system.models.ChangeModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        changed : { value : new Signal() } ,

        /**
         * Emits a message when the current object in the model is cleared.
         * @name cleared
         * @memberof system.models.ChangeModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        cleared : { value : new Signal() } ,

        /**
         * This property defined if the current property can accept the same object in argument as the current one.
         * @name security
         * @memberof system.models.ChangeModel
         * @type boolean
         * @instance
         * @default true
         */
        security : { value : true , writable : true } ,

        /**
         * @private
         */
        _current : { value : null , writable : true }
    });
}

ChangeModel.prototype = Object.create( Model.prototype ,
{
    constructor : { writable : true , value : ChangeModel } ,

    /**
     * Determinates the current selected value in this model.
     * @name current
     * @memberof system.models.ChangeModel
     * @instance
     */
    current :
    {
        get : function()
        {
            return this._current ;
        },
        set : function( o )
        {
            if ( o === this._current && this.security )
            {
                return ;
            }

            if( o )
            {
                this.validate( o ) ;
            }

            if ( this._current )
            {
                this.notifyBeforeChange( this._current ) ;
            }

            this._current = o ;

            if( this._current )
            {
                this.notifyChange( this._current );
            }
        }
    },

    /**
     * Clear the model.
     * @name clear
     * @memberof system.models.ChangeModel
     * @instance
     * @function
     */
    clear : { writable : true , value : function()
    {
        this._current = null;
        this.notifyClear() ;
    }},

    /**
     * Notify a signal before the specified value is changed.
     * @name notifyBeforeChange
     * @memberof system.models.ChangeModel
     * @instance
     * @function
     */
    notifyBeforeChange : { value : function( value )
    {
        if ( !this.isLocked() )
        {
            this.beforeChanged.emit( value , this ) ;
        }
    }},

    /**
     * Notify a signal when the model is changed.
     * @name notifyChange
     * @memberof system.models.ChangeModel
     * @instance
     * @function
     */
    notifyChange : { value : function( value )
    {
        if ( !this.isLocked() )
        {
            this.changed.emit( value , this ) ;
        }
    }},

    /**
     * Notify a signal when the model is cleared.
     * @name notifyClear
     * @memberof system.models.ChangeModel
     * @instance
     * @function
     */
    notifyClear : { value : function()
    {
        if ( !this.isLocked() )
        {
            this.cleared.emit( this ) ;
        }
    }}
}) ;
