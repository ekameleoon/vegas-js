"use strict" ;

import { Task } from './system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Show a specific {Pixi.DisplayObject} reference.
 * @name Show
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.DisplayObject} display - The {PIXI.DisplayObject} reference to change.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var Show = molecule.render.pixi.process.display.Show ;
 * var show = new Show( display ) ;
 * show.run() ;
 */
export function Show( display = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The DisplayObject reference to show.
         * @memberof molecule.render.pixi.process.display.Show
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.DisplayObject) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.Show
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.Show
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

Show.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Show } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.Show
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Show( this.display , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.Show
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.display.visible = true ;
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.child + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
