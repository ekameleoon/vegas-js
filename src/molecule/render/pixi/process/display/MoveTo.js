"use strict" ;

import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Move a specific {Pixi.DisplayObject} reference.
 * @name MoveTo
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.DisplayObject} display - The {PIXI.DisplayObject} reference to change.
 * @param {number} [x=NaN] - The x position of the target when the task is running. If this component is null or NaN the x position is ignored.
 * @param {number} [y=NaN] - The y position of the target when the task is running. If this component is null or NaN the y position is ignored.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var MoveTo = molecule.render.pixi.process.display.MoveTo ;
 * var move = new MoveTo( display , 50 , 50 ) ;
 * move.run() ;
 */
export function MoveTo( display = null , x = NaN , y = NaN , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The DisplayObject reference to move.
         * @memberof molecule.render.pixi.process.display.MoveTo
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.DisplayObject) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.MoveTo
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.MoveTo
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose } ,

        /**
         * The x position of the target when the task is running. If this component is null or NaN the x position is ignored.
         * @memberof molecule.render.pixi.process.display.MoveTo
         * @instance
         * @type number
         */
        x : { writable : true , value : x },

        /**
         * The y position of the target when the task is running. If this component is null or NaN the x position is ignored.
         * @memberof molecule.render.pixi.process.display.MoveTo
         * @instance
         * @type number
         */
        y : { writable : true , value : y }
    });
}

MoveTo.prototype = Object.create( Task.prototype ,
{
    constructor : { value : MoveTo } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.MoveTo
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new MoveTo( this.display , this.x , this.y , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.MoveTo
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
            if ( !( isNaN( this.x ) || this.x === null ) )
            {
                this.display.x = this.x ;
            }
            if ( !( isNaN( this.y ) || this.y === null ) )
            {
                this.display.y = this.y ;
            }
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.display + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
