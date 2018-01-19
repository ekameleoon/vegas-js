"use strict" ;

import { Align } from 'graphics/Align.js' ;
import { Task } from 'system/process/Task.js' ;
import { warn } from './warn.js' ;

/**
 * Modify the pivot alignment of the specific display.
 * @name AlignPivot
 * @memberof molecule.render.pixi.process.display
 * @class
 * @extends system.process.Task
 * @constructor
 * @param {PIXI.DisplayObject} display - The {PIXI.DisplayObject} reference to change.
 * @param {boolean} [enableErrorChecking=false] - Specifies whether errors encountered by the object are reported to the application.
 * @param {boolean} [verbose=false] - Specifies the verbose mode.
 * @example
 * var pivot = new AlignPivot( sprite , Align.CENTER );
 * pivot.run() ;
 */
export function AlignPivot( display = null , alignment = Align.TOP_LEFT , enableErrorChecking = false , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The DisplayObject reference to change.
         * @memberof molecule.render.pixi.process.display.AlignPivot
         * @instance
         */
        display : { writable : true , value : (display instanceof PIXI.DisplayObject) ? display : null }  ,

        /**
         * Specifies whether errors encountered by the object are reported to the application.
         * When enableErrorChecking is <code>true</code> methods are synchronous and can throw errors.
         * When enableErrorChecking is <code>false</code>, the default, the methods are asynchronous and errors are not reported.
         * Enabling error checking reduces parsing performance.
         * You should only enable error checking when debugging.
         * @memberof molecule.render.pixi.process.display.AlignPivot
         * @instance
         * @type Boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : enableErrorChecking } ,

        /**
         * Specifies the verbose mode.
         * @memberof molecule.render.pixi.process.display.AlignPivot
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { writable : true , value : verbose } ,

        /**
         * @private
         */
        _alignment : { writable : true , value : Align.validate(alignment) ? alignment : Align.TOP_LEFT }
    });
}

AlignPivot.prototype = Object.create( Task.prototype ,
{
    constructor : { value : AlignPivot } ,

    /**
     * The alignement value to modify the display pivot position.
     * @name alignement
     * @memberof molecule.render.pixi.process.display.AlignPivot
     * @function
     * @instance
     */
    alignement :
    {
        get : function() { return this._alignment ; } ,
        set : function( value )
        {
            this._alignment = Align.validate(value) ? value : Align.TOP_LEFT ;
        }
    },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof molecule.render.pixi.process.display.AlignPivot
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new AlignPivot( this.display , this._alignment , this.enableErrorChecking , this.verbose ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof molecule.render.pixi.process.display.AlignPivot
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        try
        {
            let x = 0 ;
            let y = 0 ;

            let d = this.display ;

            switch( this._alignment )
            {
                case Align.BOTTOM :
                {
                    x = d.width * 0.5 ;
                    y = d.height ;
                    break ;
                }
                case Align.BOTTOM_LEFT :
                {
                    y = d.height ;
                    break ;
                }
                case Align.BOTTOM_RIGHT :
                {
                    x = d.width ;
                    y = d.height ;
                    break ;
                }
                case Align.CENTER :
                {
                    x = d.width  * 0.5 ;
                    y = d.height * 0.5 ;
                    break ;
                }
                case Align.CENTER_LEFT :
                case Align.LEFT :
                {
                    y = d.height * 0.5 ;
                    break ;
                }
                case Align.CENTER_RIGHT :
                case Align.RIGHT :
                {
                    x = d.width ;
                    y = d.height * 0.5 ;
                    break ;
                }
                case Align.TOP :
                {
                    x = this.display.width * 0.5 ;
                    break ;
                }
                case Align.TOP_RIGHT :
                {
                    x = this.display.width ;
                    break ;
                }
            }

            d.pivot.set(x,y) ;
        }
        catch( er )
        {
            warn( this + " run failed with the display:" + this.display + ", " + er.toString() , this.verbose , this.enableErrorChecking ) ;
        }

        this.notifyFinished() ;
    }}
}) ;
