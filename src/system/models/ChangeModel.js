"use strict" ;

import { Model }  from "./Model.js" ;
import { Signal } from "../signals/Signal.js" ;

/**
 * This model can keep an object in memory and emit messages if this object is changing.
 * @example
 * <pre>
 * <code class="prettyprint">
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
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * model.current = "hello" ;
 * model.current = "world" ;
 * model.current = null ;
 * </pre>
 */
export function ChangeModel()
{
    Object.defineProperties( this ,
    {
        /**
         * Emits a message before the current object in the model is changed.
         */
        beforeChanged : { value : new Signal() } ,

        /**
         * Emits a message when the current object in the model is changed.
         */
        changed : { value : new Signal() } ,

        /**
         * Emits a message when the current object in the model is cleared.
         */
        cleared : { value : new Signal() } ,

        /**
         * This property defined if the current property can accept the same object in argument as the current one.
         */
        security : { value : true , writable : true } ,

        /**
         * @private
         */
        _current : { value : null , writable : true } ,
    });
}

/**
 * @extends Lockable
 */
ChangeModel.prototype = Object.create( Model.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : ChangeModel } ,

    /**
     * Determinates the selected value in this model.
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

            const old = this._current ;

            this._current = o ;

            if ( old !== null )
            {
                this.notifyBeforeChange( old ) ;
            }

            if ( this._current !== null )
            {
                this.notifyChange( this._current );
            }
        }
    },

    /**
     * Clear the model.
     */
    clear : { writable : true , value : function()
    {
        this._current = null;
        this.notifyClear() ;
    }},


    /**
     * Notify a signal before the specified value is changed.
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
     */
    notifyChange : { value : function( value  )
    {
        if ( !this.isLocked( ) )
        {
            this.changed.emit( value , this ) ;
        }
    }},

    /**
     * Notify a signal when the model is cleared.
     */
    notifyClear : { value : function()
    {
        if ( !this.isLocked( ) )
        {
            this.cleared.emit( this ) ;
        }
    }}
}) ;