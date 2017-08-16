"use strict" ;

import { Signal } from '../../../../system/signals/Signal.js' ;

import { Element } from '../../../../molecule/render/pixi/display/Element.js' ;

/**
 * This class provides a skeletal implementation of the <code class="prettyprint">Button</code> interface,
 * to minimize the effort required to implement this interface.
 * @name CoreButton
 * @class
 * @memberof molecule.render.pixi.components
 * @extends molecule.render.pixi.display.Element
 * @constructor
 */
export function CoreButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when button is down.
         * @name down
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        down : { value : new Signal() } ,

        /**
         * This signal emit when button is out.
         * @name out
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        out : { value : new Signal() } ,

        /**
         * This signal emit when button is over.
         * @name over
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        over : { value : new Signal() } ,

        /**
         * This signal emit when button is up.
         * @name up
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        up : { value : new Signal() }
    });

    Element.call( this , texture ) ;

    // init

    this.interactive = true ;
    this.buttonMode  = true ;

    this.pointerdown = this._down ;
}

CoreButton.prototype = Object.create( Element.prototype ,
{
    constructor : { value : CoreButton } ,

    /**
     * Notify when the button is down.
     * @name notifyDown
     * @memberof molecule.render.pixi.components.CoreButton
     * @function
     * @instance
     */
    notifyDown : { writable : true , value : function()
    {
        this.down.emit( this ) ;
    }},

    _down : { value : function()
    {
        this.notifyDown() ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.components.CoreButton
     * @instance
     * @function
     */
    toString : { value : function () { return '[CoreButton]' ; }}
}) ;
