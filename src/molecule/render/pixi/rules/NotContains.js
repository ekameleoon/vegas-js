"use strict" ;

import { Rule } from 'system/rules/Rule.js' ;

/**
 * Indicates if a specific {Pixi.Container} not contains a specific {Pixi.DisplayObject} child.
 * @name NotContains
 * @class
 * @memberof molecule.render.pixi.rules
 * @extends system.rules.Rule
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {PIXI.DisplayObject} child - The {PIXI.DisplayObject} reference to evaluate.
 */
export function NotContains( container = null , child = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The child DisplayObject reference to evaluate.
         * @memberof molecule.render.pixi.rules.NotContains
         * @instance
         */
        child : { writable : true , value : (child instanceof PIXI.DisplayObject) ? child : null }  ,

        /**
         * The container reference to evaluate.
         * @memberof molecule.render.pixi.rules.NotContains
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null }
    });
}

NotContains.prototype = Object.create( Rule.prototype ,
{
    constructor : { value : NotContains } ,

    /**
     * Evaluates the specified condition.
     * @name eval
     * @memberof molecule.render.pixi.rules.NotContains
     * @function
     * @instance
     */
    eval : { writable : true , value : function()
    {
        if( (this.container instanceof PIXI.Container) && (this.child instanceof PIXI.DisplayObject) )
        {
            return Boolean( this.container.children.indexOf( this.child ) < 0 ) ;
        }
        return false ;
    }}
}) ;
