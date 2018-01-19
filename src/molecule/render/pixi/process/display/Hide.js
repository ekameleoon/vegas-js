"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Hide a specific {Pixi.DisplayObject} reference.
 * @name Hide
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.DisplayObject} display - The {PIXI.DisplayObject} reference to change.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var Hide = molecule.render.pixi.process.display.Hide ;
 * var hide = new Hide( display ) ;
 * hide.run() ;
 */
export function Hide( display = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The DisplayObject reference to hide.
         * @memberof molecule.render.pixi.process.display.Hide
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.DisplayObject) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.Hide
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.Hide
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

Hide.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Hide } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.Hide
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Hide( this.display , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.Hide
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.display.visible = false ;
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.display + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
