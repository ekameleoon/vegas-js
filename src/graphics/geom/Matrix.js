"use strict" ;

/**
 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to another. You can perform various graphical transformations on a display object by setting the properties of a Matrix object, applying that Matrix object to the <code>matrix</code> property of a Transform object, and then applying that Transform object as the <code>transform</code> property of the display object. These transformation functions include translation (<i>x</i> and <i>y</i> repositioning), rotation, scaling, and skewing.
 * @constructor
 * @param a The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
 * @param b The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
 * @param c The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
 * @param d The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
 * @param tx The distance by which to translate each point along the <i>x</i> axis.
 * @param ty The distance by which to translate each point along the <i>y</i> axis.
 */
export function Matrix( a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when scaling or rotating an image.
         */
        a : { value : isNaN(a) ? 0 : a , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when rotating or skewing an image.
         */
        b : { value : isNaN(b) ? 0 : b , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>x</i> axis when rotating or skewing an image.
         */
        c : { value : isNaN(c) ? 0 : c , writable : true } ,

        /**
         * The value that affects the positioning of pixels along the <i>y</i> axis when scaling or rotating an image.
         */
        d : { value : isNaN(d) ? 0 : d , writable : true } ,

        /**
         * The distance by which to translate each point along the <i>x</i> axis.
         */
        tx : { value : isNaN(tx) ? 0 : tx , writable : true } ,

        /**
         * The distance by which to translate each point along the <i>y</i> axis.
         */
        ty : { value : isNaN(ty) ? 0 : ty , writable : true }
    });
}

/**
 * @extends Object
 */
Matrix.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Matrix( this.a , this.b , this.c , this.d , this.tx , this.ty ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
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
     * Applies a rotation transformation to the Matrix object.
     * <p>The <code>rotate()</code> method alters the <code>a</code>, <code>b</code>, <code>c</code>, and <code>d</code> properties of the Matrix object. In matrix notation, this is the same as concatenating the current matrix with the following:</p>
     * <p><img src="http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/images/matrix_rotate.jpg" /></p>
     * @param angle The rotation angle in radians.
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
        if ( angle!== 0 )
        {
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            let   a = this.a;
            let   b = this.b;
            let   c = this.c;
            let   d = this.d;
            let  tx = this.tx;
            let  ty = this.ty;

            this.a   = a*cos  - b*sin;
            this.b   = a*sin  + b*cos;
            this.c   = c*cos  - d*sin;
            this.d   = c*sin  + d*cos;
            this.tx  = tx*cos - ty*sin;
            this.ty  = tx*sin + ty*cos;
        }
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     */
    toObject : { writable : true , value : function()
    {
        return { a:this.a , b:this.b , c:this.c , d:this.d , tx:this.tx , ty:this.ty } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { writable : true , value : function()
    {
        return "[Matrix a:" + this.a + " b:" + this.b + " c:" + this.c + " d:" + this.d + " tx:" + this.tx + " ty:" + this.ty + "]" ;
    }}
});