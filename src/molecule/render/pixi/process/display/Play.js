"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Play a specific {PIXI.extras.AnimatedSprite} reference.
 * @name Play
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.extras.AnimatedSprite} display - The {PIXI.DisplayObject} reference to change.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var Play = molecule.render.pixi.process.display.Play ;
 * var play = new Play( sprite ) ;
 * play.run() ;
 */
export function Play( display = null , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The AnimatedSprite reference to play.
         * @memberof molecule.render.pixi.process.display.Play
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.extras.AnimatedSprite) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.Play
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.Play
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose }
    });
}

Play.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Play } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.Play
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Play( this.display , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.Play
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.display.play();
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.display + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
