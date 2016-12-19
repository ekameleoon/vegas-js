"use strict" ;

import { Rectangle } from './Rectangle.js' ;
import { Point }     from './Point.js' ;
import { Vector2D }  from './Vector2D.js' ;

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
         * @private
         */
        _diameter : { value : 0 , writable : true } ,

        /**
         * @private
         */
        _radius : { value : radius > 0 ? radius : 0 , writable : true } ,

        /**
         * @private
         */
        _radiusSquared : { value : 0 , writable : true }
    });
    this._diameter = 2 * this._radius ;
    this._radiusSquared = this._radius * this._radius ;
}

Circle.prototype = Object.create( Vector2D.prototype ,
{
    /**
     * The area of the circle.
     * @name area
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    area : { get : function()
    {
        return ( this._radius > 0 ) ? (Math.PI * this._radius * this._radius) : 0 ;
    }} ,

    /**
     * The bottom value of the circle.
     * @name bottom
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    bottom : { get : function() { return this.y + this._radius ; } } ,

    /**
     * The circumference of the circle.
     * @name circumference
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    circumference : { get : function() { return 2 * Math.PI * this._radius ; }} ,

    /**
     * The diameter value of the circle.
     * @name diameter
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    diameter :
    {
        get : function() { return this._diameter } ,
        set : function( value )
        {
            this._diameter = value > 0 ? value : 0 ;
            this._radius = this._diameter * 0.5 ;
            this._radiusSquared = this._radius * this._radius ;
        }
    },

    /**
     * The left value of the circle.
     * @name left
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    left : { get : function() { return this.x - this._radius ; } } ,

    /**
     * The radius value of the circle.
     * @name radius
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    radius :
    {
        get : function() { return this._radius } ,
        set : function( value )
        {
            this._radius = value > 0 ? value : 0 ;
            this._diameter = 2 * this._radius ;
            this._radiusSquared = this._radius * this._radius ;
        }
    },

    /**
     * The radius squared value of the circle.
     * @name radiusSquared
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    radiusSquared : { get : function() { return this._radiusSquared ; }} ,

    /**
     * The right value of the circle.
     * @name right
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    right : { get : function() { return this.x + this._radius ; } } ,

    /**
     * The top value of the circle.
     * @name top
     * @memberof graphics.geom.Circle
     * @default 0
     * @type {Number}
     * @instance
     */
    top : { get : function() { return this.y - this._radius ; } } ,

    /**
     * Returns a circumference point on the circle with a specific angle.
     * @return circumference point on the circle with a specific angle.
     * @name circumferencePoint
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     * @param {number} angle - The angle in radian to find the point on a circle.
     * @param {graphics.geom.Vector2|Vector2D} [point=null] - The optional point to populates (if null a new Vector2D instance is created).
     */
    circumferencePoint : { value : function( angle , point = null)
    {
        if( !point )
        {
            point = new Point() ;
        }

        point.x = this.x + this._radius * Math.cos(angle);
        point.y = this.y + this._radius * Math.sin(angle);

        return point ;
    }} ,

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
     * Indicates if the specific x,y position is inside the circle.
     * @return <code>true</code> if the x,y position is inside the circle.
     * @name contains
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     * @param {number} x - The x value of the coordinate to check.
     * @param {number} y - The y value of the coordinate to check.
     */
    contains : { writable : true , value : function( x , y )
    {
        if( this._radius <= 0 ||
            x < (this.x - this._radius) || // left
            x > (this.x + this._radius) || // right
            y < (this.y - this._radius) || // top
            y > (this.y + this._radius)    // bottom
        )
        {
            return false ;
        }
        else
        {
            let dx = (this.x - x) * (this.x - x);
            let dy = (this.y - y) * (this.y - y);
            return (dx + dy) <= this._diameter ;
        }
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
     * Returns a {graphics.geom.Rectangle|Rectangle} area of the circle.
     * @return A {graphics.geom.Rectangle|Rectangle} area of the circle.
     * @name getBounds
     * @memberof graphics.geom.Circle
     * @instance
     * @function
     */
    getBounds : { writable : true , value : function()
    {
        return new Rectangle
        (
            this.x - this._radius ,
            this.y - this._radius ,
            this._diameter ,
            this._diameter
        ) ;
    }},

    /**
     * Calculates the result of the typical equation for a circle metaball.
     * <p>Metaballs are, in computer graphics, organic-looking n-dimensional objects. The technique for rendering metaballs was invented by Jim Blinn in the early 1980s.</p>
     * <p>Each metaball is defined as a function in n-dimensions (ie. for three dimensions, f(x,y,z); three-dimensional metaballs tend to be most common, with two-dimensional implementations as well). A thresholding value is also chosen, to define a solid volume.</p>
     * @name metaball
     * @instance
     * @function
     * @memberof graphics.geom.Circle
     * @example
     * var bgColor = '#333333' ;
     * var color   = '#FF0000' ;
     *
     * var area   = new Rectangle( 0 , 0 , 340 , 260 ) ;
     * var spot   = new Circle( area.x + (area.width/2) , area.y + (area.height / 2) , 60 ) ;
     *
     * var metaballs =
     * [
     *     new Circle(  20 ,  20 , 10 ) ,
     *     new Circle(  70 ,  80 , 30 ) ,
     *     new Circle( 250 , 100 , 35 ) ,
     *     new Circle( 220 , 130 , 30 ) ,
     *     new Circle( 60  , 180 , 20 ) ,
     *     new Circle( 90  , 200 , 25 ) ,
     *     spot
     * ];
     *
     * var canvas = document.getElementById('canvas') ;
     * var context = canvas.getContext('2d');
     *
     * canvas.width  = area.width;
     * canvas.height = area.height ;
     *
     * // ----- render
     *
     * var maxThreshold = 4 ;
     * var minThreshold = 3 ;
     *
     * var cpt = 0 ;
     * var i   = 0 ;
     * var tx  = 0 ;
     * var ty  = 0 ;
     *
     * var len = metaballs.length ;
     *
     * var render = function()
     * {
     *     context.clearRect(0, 0, area.width, area.height );
     *
     *     context.fillStyle = bgColor ;
     *     context.fillRect(0, 0, area.width, area.height );
     *
     *     cpt = 0 ;
     *
     *     for( tx = 0 ; tx < area.width ; tx++ )
     *     {
     *         for( ty = 0 ; ty < area.height ; ty++ )
     *         {
     *             cpt = 0 ;
     *             for( i = 0 ; i < len ; i++ )
     *             {
     *                 cpt += metaballs[i].metaball( tx , ty ) ;
     *             }
     *             if( cpt >= minThreshold && cpt <= maxThreshold)
     *             {
     *                 context.fillStyle = color ;
     *                 context.fillRect( tx , ty , 1 , 1 ) ;
     *             }
     *         }
     *     }
     *
     *     window.requestAnimationFrame( render ) ;
     * }
     *
     * var move = function( event )
     * {
     *     spot.x = event.clientX ;
     *     spot.y = event.clientY ;
     * }
     *
     * canvas.addEventListener( "mousemove", move ) ;
     *
     * render() ;
     * @param {number} tx - The x value of the coordinate to check.
     * @param {number} ty - The y value of the coordinate to check.
     */
    metaball : { value : function( tx , ty )
    {
        return this._radiusSquared / ( ( this.x - tx ) * ( this.x - tx) + ( this.y - ty ) * ( this.y - ty ) ) ;
    }},

    /**
     * Sets the horizontal and vertical coordinates of this object. If the <code>x</code>, the <code>y</code> and the <code>radius</code> parameters are <code>NaN</code> or <code>null</code> the <b>x</b>, <b>y</b> and <b>radius</b> value are <code>0</code>.
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
     * Translate the horizontal and the vertical coordinates of this object.
     * @param {number} x - The value to increment the horizontal coordinate of the circle.
     * @param {number} y - The value to increment the vertical coordinate of the circle.
     * @name translate
     * @instance
     * @function
     * @memberof graphics.geom.Circle
     */
    translate : { writable : true , value : function( x , y )
    {
        this.x += x ;
        this.y += y ;
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