"use strict" ;

import { Task }   from '../system/process/Task.js' ;
import { Signal } from '../system/signals/Signal.js' ;

import { Align } from './Align.js' ;
import { LayoutBufferMode } from './LayoutBufferMode.js' ;
import { Rectangle } from './geom/Rectangle.js' ;

/**
 * A base class that manages layouts in visual elements on the screen of your applications.
 * @summary A base class that manages the layout rendering in visual elements on the screen of your applications.
 * @name Layout
 * @memberof graphics
 * @extends system.process.Task
 * @class
 */
export function Layout()
{
    Object.defineProperties( this ,
    {
        /**
         * The signal invoked when the render method is called.
         * @memberof graphics.Layout
         * @type {system.signals.Signal}
         * @const
         * @instance
         */
        renderer : { value : new Signal() } ,

        /**
         * The signal invoked when the update method is called.
         * @memberof graphics.Layout
         * @type {system.signals.Signal}
         * @const
         * @instance
         */
        updater : { value : new Signal() } ,

        /**
         * @private
         */
        _align      : { writable :  true , value : Align.TOP_LEFT  },
        _bufferMode : { writable :  true , value : LayoutBufferMode.AUTO },
        _bounds     : { writable : false , value : new Rectangle() } ,
        _container  : { writable :  true , value : null }
    });
    Task.call( this ) ;
}

Layout.prototype = Object.create( Task.prototype ,
{
    constructor : { writable : true , value : Layout },

    /**
     * The alignement of the layout.
     * @memberof graphics.Layout
     * @type {number}
     * @default graphics.Align.TOP_LEFT
     * @see graphics.Align
     * @instance
     */
    align :
    {
        get : function() { return this._align ; },
        set : function( value ) { this._align = value ; }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @memberof graphics.Layout
     * @type {graphics.geom.Rectangle}
     * @readonly
     * @instance
     */
    bounds :
    {
        get : function() { return this._bounds ; }
    },

    /**
     * A rectangle that defines the current visible area of the layout.
     * @memberof graphics.Layout
     * @type {graphics.LayoutBufferMode}
     * @default LayoutBufferMode.AUTO
     * @readonly
     * @instance
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
     * @memberof graphics.Layout
     * @instance
     */
    container :
    {
        get : function() { return this._container ; },
        set : function( target ) { this._container = target ; }
    },

    /**
     * The default height of the layout, in pixels.
     * @memberof graphics.Layout
     * @readonly
     * @instance
     * @type {number}
     */
    measuredHeight : { get : function() { return this._bounds.height } } ,

    /**
     * The default width of the layout, in pixels.
     * @memberof graphics.Layout
     * @readonly
     * @instance
     * @type {number}
     */
    measuredWidth : { get : function() { return this._bounds.width } } ,

    // ------------- public methods

    /*jshint -W098 */
    /**
     * Initialize the layout container with the specific elements. This method flush the layout container and remove all old elements register in the collection before initialize it.
     * @param {Array} [children=null] - An Array, a container or a list of element references to register. If this argument is null the layout is only flushed.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    initialize : { writable : true  , value : ( children = null ) => {} } ,
    /*jshint +W098 */

    /**
     * Calculates the default sizes and minimum and maximum values.
     * You can overrides this method in the specific layouts.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    measure : { writable : true  , value : () => {} } ,

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    render : { writable : true , value : () => {} } ,

    /**
     * Run the process.
     * @memberof graphics.Layout
     * @function
     * @instance
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
     * @memberof graphics.Layout
     * @function
     * @instance
     */
    update : { writable : true , value : () => {} }
}) ;