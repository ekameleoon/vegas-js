"use strict" ;

import { Point } from './Point.js' ;

/**
 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to another.
 * <p>You can perform various graphical transformations on a display object by setting the properties of a Matrix object, applying that Matrix object to the <code>matrix</code> property of a Transform object, and then applying that Transform object as the <code>transform</code> property of the display object. These transformation functions include translation (<i>x</i> and <i>y</i> repositioning), rotation, scaling, and skewing.</p>
 * @summary The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to another.
 * @name Matrix
 * @memberof graphics.geom
 * @class
 * @param {number} [a=1] - The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
 * @param {number} [b=0] - The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
 * @param {number} [c=0] - The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
 * @param {number} [d=1] - The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
 * @param {number} [tx=0] - The distance by which to translate each point along the <i>x</i> axis.
 * @param {number} [ty=0] - The distance by which to translate each point along the <i>y</i> axis.
 * @example <caption>The following example creates <code>matrix_1</code> by sending no parameters to the <code>Matrix()</code> constructor and <code>matrix_2</code> by sending parameters to it. Notice that <code>matrix_1</code>, which was created with no parameters, results in an identity matrix with the values <code>a</code>=1, <code>b</code>=0, <code>c</code>=0, <code>d</code>=1, <code>tx</code>=0, <code>ty</code>=0.</caption>
 * trace( new Matrix() ) ;  // [Matrix a:1 b:0 c:0, d:1 tx:0 ty:0]
 * trace(new Matrix(1, 2, 3, 4, 5, 6));  // [Matrix a:1 b:2 c:3, d:4 tx:5 ty:6]
 */
export function Matrix( a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        a : { value : isNaN(a) ? 0 : a , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        b : { value : isNaN(b) ? 0 : b , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        c : { value : isNaN(c) ? 0 : c , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        d : { value : isNaN(d) ? 0 : d , writable : true } ,

        /**
         * The distance by which to translate each point along the <i>x</i> axis.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        tx : { value : isNaN(tx) ? 0 : tx , writable : true } ,

        /**
         * The distance by which to translate each point along the <i>y</i> axis.
         * @memberof graphics.geom.Matrix
         * @default 0
         * @type {Number}
         * @instance
         */
        ty : { value : isNaN(ty) ? 0 : ty , writable : true }
    });
}

Object.defineProperties( Matrix ,
{
    MAGIC_GRADIENT_FACTOR : { value : 1638.4 } // 16384/10
}) ;

Matrix.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Matrix },

    /**
     * Create a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Matrix( this.a , this.b , this.c , this.d , this.tx , this.ty ) ;
    }},

    /**
     * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical terms, concatenating two matrixes is the same as combining them using matrix multiplication.
     * <p>For example, if matrix <code>m1</code> scales an object by a factor of four, and matrix <code>m2</code> rotates an object by 1.5707963267949 radians (<code>Math.PI/2</code>), then <code>m1.concat(m2)</code> transforms <code>m1</code> into a matrix that scales an object by a factor of four and rotates the object by <code>Math.PI/2</code> radians.</p>
     * <p>This method replaces the source matrix with the concatenated matrix. If you want to concatenate two matrixes without altering either of the two source matrixes, first copy the source matrix by using the <code>clone()</code> method, as shown in the Class Examples section.</p>
     * @param {graphics.geom.Matrix|Object} matrix The matrix to be concatenated to the source matrix.
     * @name concat
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    concat : { value : function( matrix )
    {
        var a  = this.a ;
        var b  = this.b ;
        var c  = this.c ;
        var d  = this.d ;
        var tx = this.tx ;
        var ty = this.ty ;

        this.a  = matrix.a * a  + matrix.c * b;
        this.b  = matrix.b * a  + matrix.d * b;

        this.c  = matrix.a * c  + matrix.c * d;
        this.d  = matrix.b * c  + matrix.d * d;

        this.tx = matrix.a * tx + matrix.c * ty + matrix.tx;
        this.ty = matrix.b * tx + matrix.d * ty + matrix.ty;
    }},

    /**
     * Copies all of the matrix data from the source Point object into the calling Matrix object.
     * @name copyFrom
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     * @param {graphics.geom.Matrix} matrix - The Matrix object from which to copy the data.
     */
    copyFrom : { value : function( matrix )
    {
        this.a  = matrix.a ;
        this.b  = matrix.b ;
        this.c  = matrix.c ;
        this.d  = matrix.d ;
        this.tx = matrix.tx ;
        this.ty = matrix.ty ;
    }},

    /**
     * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's values based on those parameters.
     * <p>Using the <code>createBox()</code> method lets you obtain the same matrix as you would if you applied the <code>identity()</code>, <code>rotate()</code>, <code>scale()</code>, and <code>translate()</code> methods in succession. For example, <code>mat.createBox(2,2,Math.PI/4, 100, 100)</code> has the same effect as the following:</p>
     * @example
     * var mat = new Matrix();
     * mat.createBox(2,2,Math.PI/4, 100, 100)
     * // or
     * mat.identity();
     * mat.rotate(Math.PI/4);
     * mat.scale(2,2);
     * mat.translate(10,20);
     * @param {number} scaleX - The factor by which to scale horizontally.
     * @param {number} scaleY - The factor by which scale vertically.
     * @param {number} [rotation=0] - The amount to rotate, in radians.
     * @param {number} [tx=0] - The number of pixels to translate (move) to the right along the <i>x</i> axis.
     * @param {number} [ty=0] - The number of pixels to translate (move) down along the <i>y</i> axis.
     * @name createBox
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    createBox : { value : function( scaleX, scaleY, rotation = 0, tx = 0, ty = 0 )
    {
        if ( rotation === 0 )
        {
            this.a = this.d = 1 ;
            this.b = this.c = 0 ;
        }
        else
        {
            this.a = Math.cos(rotation);
            this.b = Math.sin(rotation);
            this.c = -this.b;
            this.d =  this.a;
        }

        if ( scaleX !== 1 )
        {
            this.a *= scaleX;
            this.c *= scaleX;
        }

        if (scaleY !== 1)
        {
            this.b *= scaleY ;
            this.d *= scaleY ;
        }
        this.tx = tx;
        this.ty = ty;
    }},

    /**
     * Creates the specific style of matrix expected by the <code>beginGradientFill()</code> and <code>lineGradientStyle()</code> methods of the Graphics class. Width and height are scaled to a <code>scaleX</code>/<code>scaleY</code> pair and the <code>tx</code>/<code>ty</code> values are offset by half the width and height.
     * @name createGradientBox
     * @param {number} width - The width of the box.
     * @param {number} scaleY - The height of the box.
     * @param {number} [rotation=0] - The amount to rotate, in radians.
     * @param {number} [tx=0] - The number of pixels to translate (move) to the right along the <i>x</i> axis.
     * @param {number} [ty=0] - The number of pixels to translate (move) down along the <i>y</i> axis.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    createGradientBox : { value : function( width, height, rotation = 0, tx = 0, ty = 0)
    {
        this.createBox
        (
            width  / Matrix.MAGIC_GRADIENT_FACTOR ,
            height / Matrix.MAGIC_GRADIENT_FACTOR ,
            rotation ,
            tx + width * 0.5 ,
            ty + height * 0.5
        );
    }},

    /**
     * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs.
     * <p>Unlike the standard transformation applied using the <code>transformPoint()</code> method, the <code>deltaTransformPoint()</code> method's transformation does not consider the translation parameters <code>tx</code> and <code>ty</code>.</p>
     * @name deltaTransformPoint
     * @param {graphics.geom.Point|Object} point - The point for which you want to get the result of the matrix transformation.
     * @return The point resulting from applying the matrix transformation.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    deltaTransformPoint : { value : function( point)
    {
        return new Point
        (
            this.a * point.x + this.c * point.y ,
            this.b * point.x + this.d * point.y
        );
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @name equals
     * @return <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Matrix )
        {
            return o.a  === this.a &&
                   o.b  === this.b &&
                   o.c  === this.c &&
                   o.d  === this.d &&
                   o.tx === this.tx &&
                   o.ty === this.ty
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets each matrix property to a value that causes a null transformation.
     * <p>An object transformed by applying an identity matrix will be identical to the original.</p>
     * @name identity
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    identity : { value : function()
    {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
    }},

    /**
     * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to undo the transformation performed when applying the original matrix.
     * @name invert
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    invert : { value : function()
    {
        let a  = this.a;
        let b  = this.b;
        let c  = this.c;
        let d  = this.d;
        let tx = this.tx;
        let ty = this.ty;

        let det = a * d - c * b ;

        this.a = d/det;
        this.b = -b/det;
        this.c = -c/det;
        this.d = a/det;

        this.tx = - (this.a * tx + this.c * ty);
        this.ty = - (this.b * tx + this.d * ty);
    }},

    /**
     * Applies a rotation transformation to the Matrix object.
     * @param {number} angle - The rotation angle in radians.
     * @name rotate
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    rotate : { value : function( angle )
    {
        /*
            with sin = sin(angle) and cos = cos(angle):
                          [a            c            tx           ]
                          [b            d            ty           ]
                          [0            0            1            ]
          [cos   -sin  0] [a*cos-b*sin  c*cos-d*sin  tx*cos-ty*sin]
          [sin   cos   0] [a*sin+b*cos  c*sin+d*cos  tx*sin+ty*cos]
          [0     0     1] [0            0            1            ]
        */

        if( isNaN(angle) )
        {
            angle = 0 ;
        }

        if ( angle !== 0 )
        {
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            let   a = this.a;
            let   b = this.b;
            let   c = this.c;
            let   d = this.d;
            let  tx = this.tx;
            let  ty = this.ty;

            this.a   = a * cos  - b * sin;
            this.b   = a * sin  + b * cos;
            this.c   = c * cos  - d * sin;
            this.d   = c * sin  + d * cos;
            this.tx  = tx * cos - ty * sin;
            this.ty  = tx * sin + ty * cos;
        }
    }},


    /**
     * Applies a scaling transformation to the matrix.
     * <p>The <i>x</i> axis is multiplied by <code>sx</code>, and the <i>y</i> axis it is multiplied by <code>sy</code>.</p>
     * <p>The <code>scale()</code> method alters the <code>a</code> and <code>d</code> properties of the Matrix object. In matrix notation, this is the same as concatenating the current matrix with the following matrix:</p>
     * <p><img src="http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/images/matrix_scale.jpg" /></p>
     * @param {number} sx - A multiplier used to scale the object along the <i>x</i> axis.
     * @param {number} sy - A multiplier used to scale the object along the <i>y</i> axis.
     * @name scale
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    scale : { value : function( sx , sy )
    {
        /*
                            [a     c    tx   ]
                            [b     d    ty   ]
                            [0     0    1    ]
            [sx    0     0] [a*sx  c*sx tx*sx]
            [0     sy    0] [b*sy  d*sy ty*sy]
            [0     0     1] [0     0    1    ]
        */
        if ( sx !== 1 )
        {
            this.a  *= sx ;
            this.c  *= sx ;
            this.tx *= sx ;
        }
        if ( sy !== 1 )
        {
            this.b  *= sy ;
            this.d  *= sy ;
            this.ty *= sy ;
        }
    }},

    /**
     * Sets the members of the <code>Matrix</code> to the specified values.
     * @name setTo
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     * @param {number} [a=1] - The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
     * @param {number} [b=0] - The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
     * @param {number} [c=0] - The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
     * @param {number} [d=1] - The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
     * @param {number} [tx=0] - The distance by which to translate each point along the <i>x</i> axis.
     * @param {number} [ty=0] - The distance by which to translate each point along the <i>y</i> axis.
     */
    setTo : { value : function( a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0 )
    {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.geom.Matrix
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { a:this.a , b:this.b , c:this.c , d:this.d , tx:this.tx , ty:this.ty } ;
    }},

    /**
     * Returns a text value listing the properties of the Matrix object.
     * @return The text value listing the properties of the Matrix object.
     * @name toString
     * @memberof graphics.geom.Matrix
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Matrix a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty + "]" ;
    }},

    /**
     * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
     * @param {graphics.geom.Point} point - The point for which you want to get the result of the <code>Matrix</code> transformation.
     * @return The point resulting from applying the <code>Matrix</code> transformation.
     * @name transformPoint
     * @memberof graphics.geom.Matrix
     * @name toString
     * @instance
     * @function
     */
    transformPoint : { value : function( point )
    {
        return new Point
        (
            this.a * point.x + this.c * point.y + this.tx ,
            this.b * point.x + this.d * point.y + this.ty
        );
    }},

    /**
     * Translates the matrix along the <i>x</i> and <i>y</i> axes, as specified by the <code>dx</code> and <code>dy</code> parameters.
     * @param {number} [dx=0] - The amount of movement along the <i>x</i> axis to the right, in pixels.
     * @param {number} [dy=0] - The amount of movement down along the <i>y</i> axis, in pixels.
     * @name translate
     * @memberof graphics.geom.Matrix
     * @name toString
     * @instance
     * @function
     */
    translate : { value : function( dx , dy )
    {
        /*
                            [a     c    tx   ]
                            [b     d    ty   ]
                            [0     0    1    ]
            [1     0   dx]  [a     c    tx+dx]
            [0     1   dy]  [b     d    ty+dy]
            [0     0    1]  [0     0    1    ]
        */
        this.tx += dx;
        this.ty += dy;
    }}
});