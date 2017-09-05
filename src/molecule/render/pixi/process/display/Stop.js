"use strict" ;

import { Task } from './system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Stop a specific {PIXI.extras.AnimatedSprite} reference.
 * @name Stop
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.extras.AnimatedSprite} display - The {PIXI.DisplayObject} reference to change.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var Stop = molecule.render.pixi.process.display.Stop ;
 * var stop = new Stop( sprite ) ;
 * stop.run() ;
 */
export function Stop( display = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The AnimatedSprite reference to stop.
         * @memberof molecule.render.pixi.process.display.Stop
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.extras.AnimatedSprite) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.Stop
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.Stop
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

Stop.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Stop } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.Stop
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Stop( this.display , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.Stop
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.display.stop();
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.child + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
