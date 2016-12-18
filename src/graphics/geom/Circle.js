"use strict" ;

import { Vector2D } from './Vector2D.js' ;

/**
 * The Circle class represents a simple circle definition in a two-dimensional coordinate system, where x represents the horizontal center coordinate and y represents the vertical center coordinate.
 * @summary A simple circle definition in a two-dimensional coordinate system.
 * @name Circle
 * @memberof graphics.geom
 * @extends graphics.geom.Vector2D
 * @class
 * @param {number} [x=0] - The x value of the object.
 * @param {number} [y=0] - The y value of the object.
 * @param {number} [radius=0] - The radius value of the object.
 */
export function Circle( x = 0 , y = 0 , radius = 0 )
{
    Vector2D.call(this,x,y);
    Object.defineProperties( this ,
    {
        /**
         * The horizontal coordinate of the point.
         * @name radius
         * @memberof graphics.geom.Circle
         * @default 0
         * @type {Number}
         * @instance
         */
        radius : { value : radius > 0 ? radius : 0 , writable : true } ,
    });
}

Circle.prototype = Object.create( Vector2D.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Circle( this.x , this.y , this.radius ) ;
    }},

    /**
     * Copies all of vector data from the source Circle object into the calling Circle object.
     * @param {graphics.geom.Circle} source - The Circle object from which to copy the data.
     * @return The current {@link graphics.geom.Circle} reference.
     * @name copyFrom
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     */
    copyFrom : { writable : true , value : function( source )
    {
        if( !(source instanceof Circle) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an Circle object.' ) ;
        }
        this.x = source.x ;
        this.y = source.y ;
        this.radius = source.radius ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Circle )
        {
            return o.x === this.x && o.y === this.y && o.radius === this.radius ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the horizontal and vertical coordinates of this object. If the <code>x</code> and the <code>y</code> parameters are <code>NaN</code> or <code>null</code> the <b>x</b> and <b>y</b> value are <code>0</code>.
     * @param {number} [x=0] - The horizontal coordinate of the circle.
     * @param {number} [y=0] - The vertical coordinate of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     * @name setTo
     * @instance
     * @function
     * @memberof graphics.geom.Circle
     */
    setTo : { writable : true , value : function( x = 0 , y = 0 , radius = 0 )
    {
        this.x = isNaN(x) ? 0 : x ;
        this.y = isNaN(y) ? 0 : y ;
        this.radius = radius > 0 ? radius : 0 ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { x:this.x , y:this.y , radius:this.radius } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.geom.Circle
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Circle x:" + this.x + " y:" + this.y + " radius:" + this.radius + "]" ;
    }}
});