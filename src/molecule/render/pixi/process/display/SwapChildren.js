"use strict" ;

import { Task } from './system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Swaps the z-order (front-to-back order) of the specified child objects at the two specified children.
 * All other child objects in the display object container remain in the same index positions.
 * @name SwapChildren
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference.
 * @param {PIXI.DisplayObject} child1 - The first child object.
 * @param {PIXI.DisplayObject} child2 - The the second child object.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 */
export function SwapChildren( container = null , child1 = null , child2 = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The {PIXI.Container} reference.
         * @memberof molecule.render.pixi.process.display.SwapChildren
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null }  ,

        /**
         * The the first child object.
         * @memberof molecule.render.pixi.process.display.SwapChildren
         * @instance
         * @type {PIXI.DisplayObject}
         */
        child1 : { writable : true , value : child1 },

        /**
         * The the second child object.
         * @memberof molecule.render.pixi.process.display.SwapChildren
         * @instance
         * @type {PIXI.DisplayObject}
         */
        child2 : { writable : true , value : child2 },

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.SwapChildren
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.SwapChildren
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

SwapChildren.prototype = Object.create( Task.prototype ,
{
    constructor : { value : SwapChildren } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.SwapChildren
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new SwapChildren( this.container , this.child1 , this.child2 , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.SwapChildren
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
            this.container.swapChildren( this.child1 , this.child2 ) ;
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.container + " and to swap the children first:" + this.child1 + " and the second:" + this.child2 + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
