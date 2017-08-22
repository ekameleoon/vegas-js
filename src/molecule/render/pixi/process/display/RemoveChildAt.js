"use strict" ;

import { Task } from './system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Removes a specific {Pixi.DisplayObject} object in a {Pixi.Container} reference at a specific index position.
 * @name RemoveChildAt
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {PIXI.DisplayObject} child - The {PIXI.DisplayObject} reference to evaluate.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 */
export function RemoveChildAt( container = null , index = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The container reference to evaluate.
         * @memberof molecule.render.pixi.process.display.RemoveChildAt
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null } ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.RemoveChildAt
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * The index position to insert the new child in the container.
         * @memberof molecule.render.pixi.process.display.AddChildAt
         * @instance
         * @type number
         * @default 0
         */
        index : { writable : true , value : (index > 0) ? index : 0 } ,

        /**
         * Specifies the verbose mode.
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

RemoveChildAt.prototype = Object.create( Task.prototype ,
{
    constructor : { value : RemoveChildAt } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.RemoveChildAt
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new RemoveChildAt( this.container , this.index , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.RemoveChildAt
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.container.removeChildAt( this.index ) ;
        }
        catch( er )
        {
            warn( this + " run failed with the container:" + this.container + " at the index:" + this.index + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
