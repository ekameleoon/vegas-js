"use strict" ;

/**
 * The Dimension encapsulates the width and height of an object.
 * @constructor
 * @param width the width value of the object.
 * @param height the height value of the object.
 */
export function Dimension( width = 0 , height = 0)
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the height value of this instance.
         */
        height : { value : 0 , writable : true } ,

        /**
         * Determinates the width value of this instance.
         */
        width : { value : 0 , writable : true }
    });

    if( arguments[0] instanceof Dimension )
    {
        this.width  = arguments[0].width ;
        this.height = arguments[0].height ;
    }
    else
    {
        this.width  = width  > 0 ? width  : 0 ;
        this.height = height > 0 ? height : 0 ;
    }
}

/**
 * @extends Object
 */
Dimension.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { value : function()
    {
        return new Dimension( this.width , this.height ) ;
    }},

    /**
     * Decreases the size by s and return its self(this).
     * @param s an other Dimension reference to decreases the current Dimension.
     * @return the current reference of this object.
     */
    decrease : { value : function( width = 0 , height = 0 )
    {
        if( arguments[0] instanceof Dimension )
        {
            this.width  -= arguments[0].width ;
            this.height -= arguments[0].height ;
        }
        else if
        (
            ( width instanceof Number  || typeof(width) === 'number'  ) &&
            ( height instanceof Number || typeof(height) === 'number' )
        )
        {
            this.width  -= width ;
            this.height -= height ;
        }
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals : { value : function( o )
    {
        if ( o instanceof Dimension )
        {
            return o.width === this.width && o.height=== this.height ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns a new bounds area with a specific position.
     * @return a new bounds area with a specific position.
     */
    getBounds : { value : function( x = 0 , y = 0)
    {
        return new Dimension( x , y , this.width , this.height ) ;
    }},

    /**
     * Increases the size by a specific width/height values and return its self(this).
     * @param width An other Dimension reference to increase the current Dimension or a number to defines the width value of the object.
     * @param height A number value to inscrease the height component of the object (if width is defined).
     * @return the current reference of this object.
     */
    increase : { value : function( width = 0 , height = 0 )
    {
        if( arguments[0] instanceof Dimension )
        {
            this.width  += arguments[0].width ;
            this.height += arguments[0].height ;
        }
        else if
        (
            ( width instanceof Number  || typeof(width) === 'number'  ) &&
            ( height instanceof Number || typeof(height) === 'number' )
        )
        {
            this.width  += width ;
            this.height += height ;
        }
        return this ;
    }},

    /**
     * Sets the size of this instance.
     * @param {number} width The width component value to change (default 0).
     * @param {number} height The height component value to change (default 0).
     * @return The object reference.
     */
    setSize : { value : function( width = 0 , height = 0 )
    {
        this.width  = width ;
        this.height = height ;
        return this ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     */
    toObject : { value : function()
    {
        return { width:this.width , height:this.height } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function()
    {
        return "[Dimension width:" + this.width + " height:" + this.height + "]" ;
    }}
});