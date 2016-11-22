"use strict" ;

import { Task }   from '../system/process/Task.js' ;
import { Signal } from '../system/signals/Signal.js' ;

import { Align } from './Align.js' ;
import { LayoutBufferMode } from './LayoutBufferMode.js' ;
import { Rectangle } from './geom/Rectangle.js' ;

/**
 * Creates a new Layout instance.
 * @constructor
 */
export function Layout()
{
    Object.defineProperties( this ,
    {
        /**
         * The signal invoked when the render method is called.
         */
        renderer : { value : new Signal() } ,

        /**
         * The signal invoked when the update method is called.
         */
        updater : { value : new Signal() } ,

        /**
         * @private
         */
        _align : { value : Align.TOP_LEFT , writable : true },

        /**
         * @private
         */
        _bufferMode : { value : LayoutBufferMode.AUTO , writable : true },

        /**
         * The absolute rectangle bound area calculate with the measure method.
         * @private
         */
        _bounds : {  value : new Rectangle() } ,

        /**
         * @private
         */
        _container : {  value : null , writable : true }
    });
}

/**
 * @extends Task
 */
Layout.prototype = Object.create( Task.prototype ,
{
    // ------------- getters/setters

    /**
     * The alignement of the layout.
     * @see graphics.Align
     */
    align :
    {
        get : function() { return this._align ; },
        set : function( value ) { this._align = value ; }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @readonly
     */
    bounds :
    {
        get : function()
        {
            return this._bounds ;
        }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @readonly
     */
    bufferMode :
    {
        get : function() { return this._bufferMode ; },
        set : function( value )
        {
            if( this._bufferMode === value )
            {
                return ;
            }
            this._bufferMode = value === LayoutBufferMode.AUTO ? LayoutBufferMode.AUTO : LayoutBufferMode.NORMAL ;
        }
    },

    /**
     * Indicates the container reference to change with the layout.
     */
    container :
    {
        get : function()
        {
            return this._container ;
        },
        set : function( target )
        {
            this._container = target ;
        }
    },

    /**
     * The default height of the layout, in pixels.
     * @readonly
     */
    measuredHeight : { get : function() { return this._bounds.height } } ,

    /**
     * The default width of the layout, in pixels.
     * @readonly
     */
    measuredWidth : { get : function() { return this._bounds.width } } ,

    // ------------- public methods

    /*jshint -W098 */
    /**
     * Initialize the layout container with the specific elements. This method flush the layout container and remove all old elements register in the collection before initialize it.
     * @param children an Array, a container or a list of element references to register. If this argument is null the layout is only flushed.
     */
    initialize : { writable : true  , value : ( children = null ) => {} } ,
    /*jshint +W098 */

    /**
     * Calculates the default sizes and minimum and maximum values.
     * You can overrides this method in the specific layouts.
     */
    measure : { writable : true  , value : () => {} } ,

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     */
    render : { writable : true , value : () => {} } ,

    /**
     * Run the process.
     */
    run : { writable : true , value : function()
    {
        if ( this.isLocked() )
        {
            return ;
        }

        this.notifyStarted() ;

        if ( this._bufferMode === LayoutBufferMode.AUTO && this._container )
        {
            this.initialize( this._container ) ;
        }

        this.measure() ;
        this.render() ;
        this.update() ;
    }},

    /**
     * This method is invoked when the rendering is finished to finalize the it after the measure invokation.
     */
    update : { writable : true , value : () => {} }
}) ;