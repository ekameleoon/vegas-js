"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Determines if the children to the displayObject can be clicked/touched Setting this to false allows PixiJS to bypass a recursive hitTest function.
 * @name InteractiveChildren
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.Container} [container=null] - The {PIXI.Container} reference to change.
 * @param {boolean} [value=true] - The boolean value to apply over the interactiveChildren property of the container.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var InteractiveChildren = molecule.render.pixi.process.display.InteractiveChildren ;
 * var activate = new InteractiveChildren( container , true ) ;
 * var deactivate = new InteractiveChildren( container , false ) ;
 * activate.run() ; // touchable
 * deactivate.run() ; // untouchable
 */
export function InteractiveChildren( container = null , value = true , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The container to change.
         * @memberof molecule.render.pixi.process.display.InteractiveChildren
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.InteractiveChildren
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the boolean value mode of the interactiveChildren property of the container.
         * @memberof molecule.render.pixi.process.display.InteractiveChildren
         * @instance
         * @type Boolean
         * @default false
         */
        value : { writable : true , value : (value === true) } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.InteractiveChildren
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

InteractiveChildren.prototype = Object.create( Task.prototype ,
{
    constructor : { value : InteractiveChildren } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.InteractiveChildren
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new InteractiveChildren( this.container , this.value , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.InteractiveChildren
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.container.interactiveChildren = (this.value === true) ;
        }
        catch( er )
        {
            warn( this + " run failed with the container:" + this.container + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
