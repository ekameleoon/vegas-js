"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Removes all {Pixi.DisplayObject} children in a {Pixi.Container} reference
 * @name RemoveChildren
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 */
export function RemoveChildren( container = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The container reference to evaluate.
         * @memberof molecule.render.pixi.process.display.RemoveChildren
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null } ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.RemoveChildren
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.RemoveChildren
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

RemoveChildren.prototype = Object.create( Task.prototype ,
{
    constructor : { value : RemoveChildren } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.RemoveChildren
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new RemoveChildren( this.container , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.RemoveChildren
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.container.removeChildren() ;
        }
        catch( er )
        {
            warn( this + " run failed with the container:" + this.container + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
