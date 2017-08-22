"use strict" ;

import { AddChild } from './AddChild.js' ;
import { warn } from './warn.js' ;

/**
 * Adds a specific {Pixi.DisplayObject} object in a {Pixi.Container} reference at a specific index position.
 * @name AddChildAt
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends molecule.render.pixi.process.display.AddChild
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {PIXI.DisplayObject} child - The {PIXI.DisplayObject} reference to evaluate.
 * @param {number} [index=0] - The index position to insert the new child in the container.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 */
export function AddChildAt( container = null , child = null , index = 0 , enableErrorChecking = false , verbose = false )
{
    AddChild.call( this , container , child , enableErrorChecking , verbose ) ;
    Object.defineProperties( this ,
    {
        /**
         * The index position to insert the new child in the container.
         * @memberof molecule.render.pixi.process.display.AddChildAt
         * @instance
         * @type number
         * @default 0
         */
        index : { writable : true , value : (index > 0) ? index : 0 }
    });
}

AddChildAt.prototype = Object.create( AddChild.prototype ,
{
    constructor : { value : AddChildAt } ,

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.AddChildAt
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new AddChildAt( this.container , this.child , this.index , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.AddChildAt
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
           this.container.addChildAt( this.child , this.index ) ;
        }
        catch( er )
        {
            warn( this + " run failed with the container:" + this.container + " and the child:" + this.child + " at the position: " + this.index + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }
        this.notifyFinished() ;
    }}
}) ;
