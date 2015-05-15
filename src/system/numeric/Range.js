/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * Represents an immutable range of values.
 * <p><b>Example :</b></p>
 * {@code
 * Range = system.numeric.Range ;
 * 
 * var r1 = new Range(10, 120) ;
 * var r2 = new Range(100, 150) ;
 * 
 * trace ("r1 : " + r1) ; // r1 : [Range min:10 max:120]
 * trace ("r2 : " + r2) ; // r2 : [Range min:100 max:150]
 * 
 * trace ("r2.toSource()     : " + r2.toSource()) ; // r2.toSource() : new system.numeric.Range(100,150)
 * trace ("r1 contains 50    : " + r1.contains(50)) ; // r1 contains 50 : true
 * trace ("r1 isOutOfRange 5 : " + r1.isOutOfRange(5)) ; // r1 isOutOfRange 5 : true
 * trace ("r1 overlap r2     : " + r1.overlap(r2)) ; // r1 overlap r2 : true
 * trace ("r1 clamp 5        : " + r1.clamp(5)) ; // r1 clamp 5 : 10
 * trace ("r1 clamp 121      : " + r1.clamp(121)) ; // r1 clamp 121 : 120
 * }
 */
if (system.numeric.Range == undefined) 
{
    /**
     * Creates a new Range instance.
     * use <code>var r = new Range(min, max) ;</code>
     */ 
    system.numeric.Range = function( min /*Number*/ , max /*Number*/ ) 
    {
        if ( max < min) 
        {
            throw new RangeError( "Range constructor : 'max' argument is < of 'min' argument" ) ;
        }
        this.min = min ;
        this.max = max ;
    }
    
    /**
     * @extends Object
     */
    proto = system.numeric.Range.extend( Object ) ;
    
    /**
     * Range between -255 and 255.
     */
    system.numeric.Range.COLOR /*Range*/ = new system.numeric.Range(-255, 255) ;
    
    /**
     * Range between 0 and 360.
     */
    system.numeric.Range.DEGREE /*Range*/ = new system.numeric.Range( 0 , 360 ) ;
    
    /**
     * Range between 0 and 100.
     */
    system.numeric.Range.PERCENT /*Range*/ = new system.numeric.Range( 0 , 100 ) ;
    
    /**
     * Range between 0 and 1.
     */
    system.numeric.Range.UNITY /*Range*/ = new system.numeric.Range( 0 , 1 ) ;
    
    /**
     * The max value of the range.
     */
    proto.max /*Number*/ = NaN ;

    /**
     * The min value of the range.
     */
    proto.min /*Number*/ = NaN ;
    
    /**
     * Clamp a value in the current range.
     */
    proto.clamp = function ( value /*Number*/ ) /*Number*/ 
    {
        if (isNaN( value )) 
        {
            return NaN ;
        }
        var mi = this.min ;
        var ma = this.max ;
        if (isNaN( mi )) 
        {
            mi = value ;
        }
        if (isNaN( ma )) 
        {
            ma = value ;
        }
        return Math.max( Math.min( value, ma ), mi ) ;
    }
     
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    proto.clone = function () 
    {
        return new system.numeric.Range( this.min , this.max ) ;
    }
    
    /**
     * Creates a new range by combining two existing ranges.
     * @param range the range to combine, <code class="prettyprint">null</code> permitted.
     */
    proto.combine = function ( range /*Range*/ ) /*Range*/
    {
        if (range == null)
        {
            return this.clone() ;
        }
        else
        {
            var lower = Math.min( this.min , range.min ) ;
            var upper = Math.max( this.max , range.max ) ;
            return new system.numeric.Range( lower , upper ) ;
        }
    }
    
    /**
     * Returns {@code true} if the Range instance contains the value passed in argument.
     * @return {@code true} if the Range instance contains the value passed in argument.
     */
    proto.contains = function (value /*Number*/) /*Boolean*/ 
    {
        return !this.isOutOfRange(value) ;
    }
    
    /**
     * Indicates whether some other object is "equal to" this one.
     */
    proto.equals = function (o) /*Boolean*/ 
    {
        if ( o instanceof system.numeric.Range )
        {
            return  ( o.min == this.min ) && ( o.max == this.max ) ;
        }
        else
        {
            return false ;
        } 
    }
    
    /**
     * Creates a new range by adding margins to an existing range.
     * @param range the range {@code null} not permitted.
     * @param lowerMargin the lower margin (expressed as a percentage of the range length).
     * @param upperMargin the upper margin (expressed as a percentage of the range length).
     * @return The expanded range.
     * @throws IllegalArgumentError if the range argument is {@code null}
     */
    proto.expand = function ( lowerMargin /*Number*/, upperMargin/*Number*/ ) /*Range*/
    {
        if ( isNaN(lowerMargin) )
        {
            lowerMargin = 1 ;
        }
        if ( isNaN(upperMargin) )
        {
            upperMargin = 1 ;
        }
        var l  /*Number*/ = this.max - this.min ;
        var lower /*Number*/ = l * lowerMargin ;
        var upper /*Number*/ = l * upperMargin ;
        return new system.numeric.Range( this.min - lower , this.max + upper ) ;
    }
    
    /**
     * Filters the passed-in Number value, if the value is NaN the return value is the default value in second argument.
     * @param value The Number value to filter, if this value is NaN the value is changed.
     * @param defaultValue The default value to apply over the specified value if this value is NaN (default 0).
     * @return The filter Number value.
     */
    /*static*/ system.numeric.Range.filterNaNValue = function ( value /*Number*/ , defaultValue /*Number*/ ) /*Number*/
    {
        if ( isNaN(defaultValue) )
        {
            defaultValue = 0 ;
        }
        return isNaN( value ) ? defaultValue : value ;
    }
    
    /**
     * Returns the central value for the range.
     * @return The central value.
     */
    proto.getCentralValue = function() /*Number*/
    {
        return (this.min + this.max) / 2 ;
    }
    
    /**
     * Returns a random floating-point number between two numbers.
     * @return a random floating-point number between two numbers.
     */
    proto.getRandomFloat = function() /*Number*/
    {
        return Math.random() * ( this.max - this.min ) + this.min ;
    }
    
    /**
     * Returns a random floating-point number between two numbers.
     * @return a random floating-point number between two numbers.
     */
    proto.getRandomInteger = function() /*Number*/
    {
        return Math.floor( this.getRandomFloat() ) ;
    }
    
    /**
     * Returns {@code true} if the value is out of the range.
     * @return {@code true} if the value is out of the range.
     */
    proto.isOutOfRange = function (value /*Number*/) 
    {
        return (value > this.max ) || (value < this.min) ;
    }
    
    /**
     * Returns {@code true} if the range in argument overlap the current range.
     * @return {@code true} if the range in argument overlap the current range.
     */
    proto.overlap = function ( r /*Range*/ ) /*Boolean*/ 
    {
        return ( (this.max >= r.min) && (r.max >= this.min) ) ;
    }
    
    /**
     * Returns the length of the range.
     * @return the length of the range.
     */
    proto.size = function() /*Number*/
    {
        return this.max - this.min ;
    }
    
    /**
     * Returns the source represensation of the object.
     * @return the source represensation of the object.
     */
    proto.toSource = function ( indent/*Number*/, indentor/*String*/ )/*String*/ 
    {
        return "new system.numeric.Range(" + this.min + "," + this.max + ")";
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return "[Range min:" + this.min + " max:" + this.max + "]";
    }
    
    ///////
    
    delete proto ;
}
