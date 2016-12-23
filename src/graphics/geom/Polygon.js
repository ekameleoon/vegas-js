"use strict" ;

import { Point } from './Point.js' ;

/**
 * The Polygon class represents a simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * <p>In the constructor of the Polygon class, the points can be set from a variety of formats:
 * <ul>
 * <li>An array of Vector2D or Point objects : <code>[new Point(x1,y1),new Vector2D(x2,y2)]</code>.</li>
 * <li>An array of objects with public x/y properties.</li>
 * <li>An array of paired numbers that represent point coordinates: <code>[x1,y1,x2,y2,...]</code>.</li>
 * <li>An array of arrays with two elements representing x/y coordinates: <code>[[x1, y1], [x2, y2], ...]</code>.</li>
 * </ul>
 * </p>
 * @summary A simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @name Polygon
 * @memberof graphics.geom
 * @class
 * @param {*} [...] - The optional points to register the polygon representation.
 * @example
 * var p1 = new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
 * var p2 = new Polygon(10,10,20,20,20,20,10,20) ;
 * var p3 = new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
 * var p4 = new Polygon([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)]) ;
 */
export function Polygon()
{
    Object.defineProperties( this ,
    {
        _area      : { writable : true , value : 0     } ,
        _closed    : { writable : true , value : true  } ,
        _flattened : { writable : true , value : false } ,
        _points    : { value : [] }
    });

    if ( arguments.length > 0 )
    {
        this.setTo.apply( this , arguments );
    }
}

Polygon.prototype = Object.create( Object.prototype ,
{
    /**
     * Indicates the area measure of the polygon.
     * @name area
     * @memberof graphics.geom.Polygon
     * @instance
     * @readonly
     * @type number
     */
    area : { get : function() { return this._area ; }},

    /**
     * Indicates if the polygon is closed or not.
     * @name closed
     * @memberof graphics.geom.Polygon
     * @instance
     * @type boolean
     */
    closed :
    {
        get : function() { return this._closed ; } ,
        set : function( value )
        {
            this._closed = value === true ;
        }
    },

    /**
     * Indicates if the polygon collection is flattened.
     * @name flattened
     * @memberof graphics.geom.Polygon
     * @instance
     * @readonly
     * @type boolean
     */
    flattened : { get : function() { return this._flattened ; }},

    /**
     * Indicates the number of elements registered in the points collection.
     * @name flattened
     * @memberof graphics.geom.Polygon
     * @instance
     * @readonly
     * @type number
     */
    length : { get : function() { return this._points.length ; }},

    /**
     * The array collection reference of all points who defines the polygon.
     * @name flattened
     * @memberof graphics.geom.Polygon
     * @instance
     * @readonly
     * @type Array
     */
    points :
    {
        get : function() { return this._points ; } ,
        set : function( points ) { this.setTo( points ) ; }
    },

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Polygon( this._points.slice() ) ;
    }},

    /**
     * Checks whether the specified x and y coordinates are contained within this polygon.
     * @name contains
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     * @param {number} x - The X value of the coordinate to evaluates.
     * @param {number} y - The Y value of the coordinate to evaluates.
     * @return {boolean} True if the coordinates are within this polygon, otherwise false.
     * @see {@link http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html|algorithm by Jonas Raoni Soares Silva}.
     */
    contains : { value : function( x , y )
    {
        let flag = false ;
        if (this._flattened)
        {
            for( var i = -2 , j = this._points.length - 2 ; (i += 2) < this._points.length ; j = i )
            {
                let ix = this._points[i];
                let iy = this._points[i + 1];
                let jx = this._points[j];
                let jy = this._points[j + 1];
                if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
                {
                    flag = !flag;
                }
            }
        }
        else
        {
            for (let i = -1 , j = this._points.length - 1 ; ++i < this._points.length ; j = i )
            {
                let ix = this._points[i].x;
                let iy = this._points[i].y;
                let jx = this._points[j].x;
                let jy = this._points[j].y;
                if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
                {
                    flag = !flag;
                }
            }
        }
        return flag ;
    }},

    /**
     * Copies all of vector data from the source Polygon object into the calling Polygon object.
     * @param {graphics.geom.Polygon} source - The Polygon object from which to copy the data.
     * @return The current {@link graphics.geom.Polygon} reference.
     * @name copyFrom
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     */
    copyFrom : { writable : true , value : function( source )
    {
        if( !(source instanceof Polygon) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an Polygon object.' ) ;
        }
        this.points = source.points ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if( o === this )
        {
            return true ;
        }
        if ( o instanceof Polygon )
        {
            let ar1 = this.toArray() ;
            let ar2 = o.toArray() ;

            if( ar1.length !== ar2.length )
            {
                return false ;
            }

            for( let i = 0 , len = ar1.length ; i<len ; i++ )
            {
                if( (typeof(ar1[i]) === 'number' || ar1[i] instanceof Number) && ar1[i] !== ar2[i]  )
                {
                    return false ;
                }
                else
                {
                    try
                    {
                        if( ar1[i].x !== ar2[i].x || ar1[i].y !== ar2[i].y )
                        {
                            return false ;
                        }
                    }
                    catch (e)
                    {
                        return false ;
                    }
                }
            }

            return true ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Flattens this polygon so the points are a sequence of numbers. Any Point objects found are removed and replaced with two numbers and set the <code>flattened</code> property to <code>true</code>.
     * @name flatten
     * @instance
     * @function
     * @memberof graphics.geom.Polygon
     * @example
     * var polygon = new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
     * polygon.flatten() ;
     * trace(polygon.points) ; // 10,10,20,20,20,20,10,20
     * trace(polygon.flattened) ; // true
     */
    flatten : { value : function ()
    {
        if( this._points.length > 0 )
        {
            let ar = this.toArray();
            this._points.length = 0 ;
            for( let i = 0 , len = ar.length ; i<len ; i++ )
            {
                this._points.push(ar[i]) ;
            }
            this._flattened = true;
        }
        return this;
    }},

    /**
     * Sets this Polygon to the given points.
     * <p>All the points can be set from a variety of formats:
     * <ul>
     * <li>An array of Vector2D or Point objects : <code>[new Point(x1,y1),new Vector2D(x2,y2)]</code>.</li>
     * <li>An array of objects with public x/y properties.</li>
     * <li>An array of paired numbers that represent point coordinates: <code>[x1,y1,x2,y2,...]</code>.</li>
     * <li>An array of arrays with two elements representing x/y coordinates: <code>[[x1, y1], [x2, y2], ...]</code>.</li>
     * </ul>
     * </p>
     * @param {*} [points] - All the points to defines the polygon representation.
     * @name setTo
     * @instance
     * @function
     * @memberof graphics.geom.Polygon
     * @example
     * var polygon = new Polygon() ;
     *
     * polygon.setTo({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
     * trace( polygon.points ) ;
     *
     * polygon.setTo(10,10,20,20,20,20,10,20) ;
     * trace( polygon.points ) ;
     *
     * polygon.setTo([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
     * trace( polygon.points ) ;
     *
     * polygon.setTo([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)]) ;
     * trace( polygon.points ) ;
     */
    setTo : { writable : true , value : function( points )
    {
        this._area = 0;
        this._points.length = 0 ;
        this._flattened = false ;
        if ( arguments.length > 0 )
        {
            if( !(points instanceof Array) )
            {
                points = Array.prototype.slice.call( arguments ) ;
            }

            let pos ;
            let min = Number.MAX_VALUE;
            let len = points.length ;
            for ( let i=0 ; i < len ; i++ )
            {
                pos = points[i] ;
                if ( typeof(pos) === 'number' || (pos instanceof Number) )
                {
                    pos = new Point(pos, points[i+1] ) ;
                    i++ ;
                }
                else if( pos instanceof Array )
                {
                    pos = new Point(points[i][0], points[i][1]);
                }
                else if( 'x' in pos && 'y' in pos )
                {
                    pos = new Point( pos.x, pos.y );
                }
                else
                {
                    pos = null ;
                }

                if( pos !== null )
                {
                    this._points.push(pos);
                    if ( pos.y < min )
                    {
                        min = pos.y;
                    }
                }
            }
            this.calculateArea(min);
        }

        return this;
    }},

    /**
     * Export all the points as an array of flat numbers, following the sequence <code>[x1,y1,x2,y2,x3,y3,...]</code>.
     * @return The Array representation of this Polygon.
     * @name toArray
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     * @param {Array} [output=null] - The optional Array to fill, if this argument is null, a new Array is created.
     */
    toArray : { value : function ( output = null )
    {
        if ( !(output instanceof Array) )
        {
            output = [];
        }
        let pos ;
        let len = this._points.length ;
        for( let i = 0 ; i < len ; i++ )
        {
            pos = this._points[i] ;
            if( typeof(pos) === 'number' || (pos instanceof Number) )
            {
                output.push(pos) ;
            }
            else
            {
                output.push(pos.x);
                output.push(pos.y);
            }
        }
        return output;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.geom.Polygon
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return [].concat(this._points) ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.geom.Polygon
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Polygon]" ;
    }},

    /**
     * Calculates the area measure of the Polygon.
     * @private
     * @param {number} min - The lowest boundary
     */
    calculateArea : { value : function( min )
    {
        this._area = 0 ;
        if( this._points.length )
        {
            let p1, p2 ;
            let height, width ;
            for ( let i = 0 , len = this._points.length ; i < len ; i++ )
            {
                p1 = this._points[i];
                if (i === len - 1)
                {
                    p2 = this._points[0];
                }
                else
                {
                    p2 = this._points[i + 1];
                }
                height = ((p1.y - min) + (p2.y - min)) / 2;
                width  = p1.x - p2.x;
                this._area += height * width ;
            }
        }
        return this._area ;
    }}
});