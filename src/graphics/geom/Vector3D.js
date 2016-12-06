"use strict" ;

import { Vector2D } from './Vector2D.js' ;

/**
 * The <code>Vector3D</code> class represents a point or a location in the three-dimensional space using the Cartesian coordinates <code>x</code>, <code>y</code>, and <code>z</code>.
 * <p>As in a two-dimensional space, the <b>x</b> property represents the horizontal axis and the <b>y</b> property represents the vertical axis. In three-dimensional space, the <b>z</b> property represents depth. The value of the x property increases as the object moves to the right. The value of the y property increases as the object moves down. The z property increases as the object moves farther from the point of view. Using perspective projection and scaling, the object is seen to be bigger when near and smaller when farther away from the screen. As in a right-handed three-dimensional coordinate system, the positive z-axis points away from the viewer and the value of the z property increases as the object moves away from the viewer's eye. The origin point (0,0,0) of the global space is the upper-left corner of the stage.</p>
 * <p>The Vector3D class can also represent a direction, an arrow pointing from the origin of the coordinates, such as (0,0,0), to an endpoint; or a floating-point component of an RGB (Red, Green, Blue) color model.</p>
 * <p>Quaternion notation introduces a fourth element, the w property, which provides additional orientation information. For example, the w property can define an angle of rotation of a Vector3D object. The combination of the angle of rotation and the coordinates x, y, and z can determine the display object's orientation. Here is a representation of Vector3D elements in matrix notation : <code>[x y z w]</code></p>
 * @summary The <code>Vector3D</code> class represents a point or a location in the three-dimensional space using the Cartesian coordinates <code>x</code>, <code>y</code>, and <code>z</code>.
 * @name Vector3D
 * @extends graphics.geom.Vector2D
 * @memberof graphics.geom
 * @class
 * @param {number} [x=0] - The first element of a Vector3D object, such as the x coordinate of a point in the three-dimensional space.
 * @param {number} [y=0] - The second element of a Vector3D object, such as the y coordinate of a point in the three-dimensional space.
 * @param {number} [z=0] - The third element of a Vector3D object, such as the z coordinate of a point in three-dimensional space.
 * @param {number} [w=0] - The fourth element of a Vector3D object (in addition to the x, y, and z properties) can hold data such as the angle of rotation.
 */
export function Vector3D( x = 0 , y = 0 , z = 0 , w = 0 )
{
    Vector2D.call( this , x, y ) ;
    Object.defineProperties( this ,
    {
        /**
         * The third element of a Vector3D object, such as the z coordinate of a point in three-dimensional space.
         * @memberof graphics.geom.Vector3D
         * @default 0
         * @type {Number}
         * @instance
         */
        z : { value : isNaN(z) ? 0 : z , writable : true } ,

        /**
         * The fourth element of a Vector3D object (in addition to the x, y, and z properties) can hold data such as the angle of rotation.
         * <p>Quaternion notation employs an angle as the fourth element in its calculation of three-dimensional rotation. The w property can be used to define the angle of rotation about the Vector3D object. The combination of the rotation angle and the coordinates (x,y,z) determines the display object's orientation.</p>
         * @memberof graphics.geom.Vector3D
         * @default 0
         * @type {Number}
         * @instance
         */
        w : { value : isNaN(w) ? 0 : w , writable : true }
    });
}

Vector3D.prototype = Object.create( Vector2D.prototype ,
{
    /**
     * The length, magnitude, of the current <code>Vector3D</code> object from the origin (0,0,0) to the object's x, y, and z coordinates. The w property is ignored. A unit vector has a length or magnitude of one.
     * @memberof graphics.geom.Vector3D
     * @type {Number}
     */
    length : { get : function()
    {
         let r = (this.x * this.x) + (this.y * this.y) + (this.z * this.z) ;
         if( r <= 0 )
         {
            return 0;
         }
         return Math.sqrt(r);
    }},

    /**
     * The square of the length of the current <code>Vector3D</code> object, calculated using the <code>x</code>, <code>y</code>, and <code>z</code> properties. The <code>w<c/ode> property is ignored. Use the <code>lengthSquared()</code> method whenever possible instead of the slower <code>Math.sqrt()</code> method call of the <code>Vector3D.length</code> property.
     * @memberof graphics.geom.Vector3D
     * @type {Number}
     */
    lengthSquared : { get : function()
    {
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z) ;
    }},

    /**
     * Adds the coordinates of another vector to the coordinates of this vector.
     * @param {graphics.geom.Vector3D|Object} vector - the vector to be added. You can use an object with the properties x, y and z.
     * @name add
     * @instance
     * @function
     * @memberof graphics.geom.Vector3D
     */
    add : { writable : true , value : function( vector )
    {
        this.x += vector.x ;
        this.y += vector.y ;
        this.z += vector.z ;
        return this ;
    }},

    /**
     * The a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Vector3D( this.x , this.y , this.z , this.w ) ;
    }},

    /**
     * Copies all of vector data from the source Vector3D object into the calling Vector3D object.
     * @param {graphics.geom.Vector3D} source - The Vector3D object from which to copy the data.
     * @return The current {@link graphics.geom.Vector3D} reference.
     * @name copyFrom
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    copyFrom : { writable : true , value : function( source )
    {
        if( !(source instanceof Vector3D) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an Vector3D object.' ) ;
        }
        this.x = source.x ;
        this.y = source.y ;
        this.z = source.z ;
        return this ;
    }},

    /**
     * Returns a new <code>Vector3D</code> object that is perpendicular (at a right angle) to the current <code>Vector3D</code> and another <code>Vector3D</code> object.
     * <p>You can use the normalized cross product of two vertices of a polygon surface with the normalized vector of the camera or eye viewpoint to get a dot product. The value of the dot product can identify whether a surface of a three-dimensional object is hidden from the viewpoint.</p>
     * @param {graphics.geom.Vector3D} vector  - The second <code>Vector3D</code> object.
     * @return The <code>Vector3D</code> resulting of the cross product.
     * @name crossProduct
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    crossProduct : { value : function( vector )
    {
        return new Vector3D
        (
            (vector.y * this.z) - (vector.z * this.y) ,
            (vector.z * this.x) - (vector.x * this.z) ,
            (vector.x * this.y) - (vector.y * this.x)
        );
    }},

    /**
     * If the current <code>Vector3D</code> object and the one specified as the parameter are unit vertices, this method returns the cosine of the angle between the two vertices. Unit vertices are vertices that point to the same direction but their length is one. They remove the length of the vector as a factor in the result. You can use the normalize() method to convert a vector to a unit vector.
     * @example
     * var v1 = new Vector3(10,20,30) ;
     * var v2 = new Vector3(40,60,70) ;
     *
     * trace( v1.dot( v2 ) ) ;
     * @param {graphics.geom.Vector3D} vector - The Vector3D object to calculates the dot value.
     * @return The dot value.
     * @name dotProduct
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    dotProduct : { writable : true , value : function( vector )
    {
        return ( this.x * vector.x ) + ( this.y * vector.y ) + ( this.z * vector.z ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Vector3D )
        {
            return o.x === this.x && o.y === this.y && o.z === this.z && o.w === this.w ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Negating the x,y and z values in the <code>Vector3D</code> object.
     * @name negate
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    negate : { writable : true , value : function()
    {
        this.x = -this.x ;
        this.y = -this.y ;
        this.z = -this.z ;
        return this ;
    }},

    /**
     * Divides the value of the x, y, and z properties of the current <code>Vector3D</code> object by the value of its <code>w</code> property.
     * @name project
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    project : { writable : true , value : function()
    {
        let t = 1 / this.w ;
        this.x *= t ;
        this.y *= t ;
        this.z *= t ;
        return this ;
    }},

    /**
     * Sets the horizontal and vertical coordinates of this object. If the <code>x</code> and the <code>y</code> parameters are <code>NaN</code> or <code>null</code> the <b>x</b> and <b>y</b> value are <code>0</code>.
     * @param {number} [x=0] - The first element of a Vector3D object, such as the x coordinate of a point in the three-dimensional space.
     * @param {number} [y=0] - The second element of a Vector3D object, such as the y coordinate of a point in the three-dimensional space.
     * @param {number} [z=0] - The third element of a Vector3D object, such as the z coordinate of a point in three-dimensional space.
     * @name setTo
     * @memberof graphics.geom.Vector3D
     * @instance
     * @function
     */
    setTo : { writable : true , value : function( x = 0 , y = 0 , z = 0 )
    {
        this.x = isNaN(x) ? 0 : x ;
        this.y = isNaN(y) ? 0 : y ;
        this.z = isNaN(z) ? 0 : z ;
    }},

    /**
     * Subtracts the coordinates of another vector from the coordinates of this vector.
     * @param {graphics.geom.Vector3D} vector - The vector to be subtracted.
     * @instance
     * @function
     * @memberof graphics.geom.Vector3D
     */
    subtract : { writable : true , value : function( vector )
    {
        this.x -= vector.x ;
        this.y -= vector.y ;
        this.z -= vector.z ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Vector3D
     * @name toObject
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { x:this.x , y:this.y , z:this.z , w:this.w } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.geom.Vector3D
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Vector3D x:" + this.x + " y:" + this.y + " z:" + this.z + "]" ;
    }}
});

Object.defineProperties( Vector3D ,
{
    /**
     * The x axis defined as a <code>Vector3D</code> object with coordinates (1,0,0).
     * @memberof graphics.geom.Vector3D
     * @name X_AXIS
     * @const
     */
    X_AXIS : { value : new Vector3D(1,0,0) } ,

    /**
     * The y axis defined as a <code>Vector3D</code> object with coordinates (0,1,0).
     * @memberof graphics.geom.Vector3D
     * @name Y_AXIS
     * @const
     */
    Y_AXIS : { value : new Vector3D(0,1,0) } ,

    /**
     * The z axis defined as a <code>Vector3D</code> object with coordinates (0,0,1).
     * @memberof graphics.geom.Vector3D
     * @name Z_AXIS
     * @const
     */
    Z_AXIS : { value : new Vector3D(0,0,1) } ,

    /**
     * Returns the angle in radians between two vectors.
     * <p>The <code>angleBetween()</code> method is a static method. You can use it directly as a method of the Vector3D class.</p>
     * <p>To convert a degree to a radian, you can use the following formula: <code>radian = Math.PI/180 * degree</code></p>
     * @param {graphics.geom.Vector3D} v1 - The first Vector3D object.
     * @param {graphics.geom.Vector3D} v2 - The second Vector3D object.
     * @return The angle between two Vector3D objects.
     * @memberof graphics.geom.Vector3D
     * @name The distance between two Vector3D objects.
     * @const
     * @function
     */
    angleBetween : { value : function( v1 , v2 )
    {
        let dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z ;
        return Math.acos( dot / (v1.length * v2.length) );
    }},

    /**
     * Returns the distance between two <code>Vector3D</code> objects.
     * <p>The <code>distance()</code> method is a static method. You can use it directly as a method of the Vector3D class to get the Euclidean distance between two three-dimensional points.</p>
     * @param {graphics.geom.Vector3D} a - The first Vector3D object.
     * @param {graphics.geom.Vector3D} b - The second Vector3D object.
     * @return he angle between two Vector3D objects.
     * @memberof graphics.geom.Vector3D
     * @name distance
     * @const
     * @function
     */
    distance : { value : function( v1 , v2 )
    {
        let x = v1.x - v2.x ;
        let y = v1.y - v2.y ;
        let z = v1.z - v2.z ;
        let r = (x * x) + (y * y) + (z * z) ;
        if( r <= 0 )
        {
            r = 0;
        }
        return Math.sqrt(r);
    }}
});