"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Removes a specific {Pixi.DisplayObject} object in a {Pixi.Container} reference
 * @name RemoveChild
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {PIXI.DisplayObject} child - The {PIXI.DisplayObject} reference to evaluate.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var attach = new AddChild( stage , child ) ;
 * var detach = new RemoveChild( stage , child ) ;
 * var test1  = new IfNotContains( stage , child , attach , detach ) ;
 * var test2  = new IfContains( stage , child , detach , attach ) ;
 * test1.run() ;
 * test2.run() ;
 *
 * test1.run() ;
 * test2.run() ;
 * test2.run() ;
 */
export function RemoveChild( container = null , child = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The child DisplayObject reference to evaluate.
         * @memberof molecule.render.pixi.process.display.RemoveChild
         * @instance
         */
        child : { writable : true , value : (child instanceof PIXI.DisplayObject) ? child : null }  ,

        /**
         * The container reference to evaluate.
         * @memberof molecule.render.pixi.process.display.RemoveChild
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null } ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.RemoveChild
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.RemoveChild
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

RemoveChild.prototype = Object.create( Task.prototype ,
{
    constructor : { value : RemoveChild } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.RemoveChild
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new RemoveChild( this.container , this.child , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.RemoveChild
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.container.removeChild( this.child ) ;
        }
        catch( er )
        {
            warn( this + " run failed with the container:" + this.container + " and the child:" + this.child + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
