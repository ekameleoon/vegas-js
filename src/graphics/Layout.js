"use strict" ;

import { Task }   from '../system/process/Task.js' ;
import { Signal } from '../system/signals/Signal.js' ;

import { Align } from './Align.js' ;
import { Rectangle } from './geom/Rectangle.js' ;

class Layout extends Task
{
    /**
     * Creates a new Layout instance.
     * @constructor
     */
    constructor()
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
             * The absolute rectangle bound area calculate with the measure method.
             * @private
             */
            _align : { _bounds : new Rectangle() , writable : true }
        });
    }
    /**
     * The alignement of the layout.
     * @see graphics.Align
     */
    get align()
    {
        return this._align ;
    }

    /**
     * @private
     */
    set align( value )
    {
        this._align = value ;
    }

    /**
     * The rectangle that defines the area of the layout.
     */
    get bounds()
    {

    }

    /**
     * Indicates the container reference to change with the layout.
     */
    get container()
    {

    }

    set container( target )
    {

    }

    /**
     * The default height of the layout, in pixels.
     */
    get measuredHeight()
    {

    }

    /**
     * The default width of the layout, in pixels.
     */
    get measuredWidth()
    {

    }

    /**
     * Calculates the default sizes and minimum and maximum values.
     */
    measure()
    {

    }

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     */
    render()
    {

    }

    /**
     * Update the layout.
     */
    update()
    {

    }
}

export { Layout as default }