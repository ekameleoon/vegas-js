"use strict" ;

import { Rule } from './system/rules/Rule.js' ;

/**
 * Indicates if a specific {Pixi.Container} contains specific {Pixi.DisplayObject} child.
 * @name Contains
 * @class
 * @memberof molecule.render.pixi.rules
 * @extends system.rules.Rule
 * @constructor
 */
export function Contains( container = null , child = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The child DisplayObject reference to evaluate.
         * @memberof molecule.render.pixi.rules.Contains
         * @instance
         */
        child : { writable : true , value : (child instanceof PIXI.DisplayObject) ? child : null }  ,

        /**
         * The container reference to evaluate.
         * @memberof molecule.render.pixi.rules.Contains
         * @instance
         */
        container : { writable : true , value : (container instanceof PIXI.Container) ? container : null }
    });
}

Contains.prototype = Object.create( Rule.prototype ,
{
    constructor : { value : Contains } ,

    /**
     * Evaluates the specified condition.
     * @name eval
     * @memberof molecule.render.pixi.rules.Contains
     * @function
     * @instance
     */
    eval : { writable : true , value : function()
    {
        if( (this.container instanceof PIXI.Container) && (this.child instanceof PIXI.DisplayObject) )
        {
            return Boolean( this.container.children.indexOf( this.child ) > -1 ) ;
        }
        return false ;
    }}
}) ;
