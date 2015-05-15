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
 * A pseudo random number generator (PRNG) is an algorithm for generating a sequence of numbers that approximates the properties of random numbers.
 * Implementation of the Park Miller (1988) "minimal standard" linear congruential pseudo-random number generator.
 * For a full explanation visit: http://www.firstpr.com.au/dsp/rand31/
 * The generator uses a modulus constant ((m) of 2^31 - 1) which is a Mersenne Prime number and a full-period-multiplier of 16807.
 * Output is a 31 bit unsigned integer. The range of values output is 1 to 2147483646 (2^31-1) and the seed must be in this range too.
 */
if (system.numeric.PRNG == undefined) 
{
    /**
     * Creates a new PRNG instance.
     * use <code>var r = new PRNG(min, max) ;</code>
     */ 
    system.numeric.PRNG = function( value /*Number*/ ) 
    {
        if ( isNaN( value ) ) 
        {
            value = 0 ;
        }
        value = Math.round( value ) ;
        this.setValue( (value > 0) ? value : Math.random() * 0X7FFFFFFE ) ;
    }
    
    /**
     * @extends Object
     */
    proto = system.numeric.PRNG.extend( Object ) ;
    
    /**
     * Returns the current random value with a 31 bit unsigned integer between 1 and 0X7FFFFFFE inclusive (don't use 0).
     * @return the current random value with a 31 bit unsigned integer between 1 and 0X7FFFFFFE inclusive (don't use 0).
     */
    proto.getValue = function() /*uint*/
    {
        return this._value ;
    }
    
    /**
     * Provides the next pseudorandom number as an unsigned integer (31 bits)
     */
    proto.randomInt = function() /*int*/
    {
        this._value = (this._value * 16807) % 2147483647 ;
        return this._value ;
    }
    
    /**
     * Provides the next pseudorandom number as an unsigned integer (31 bits) betweeen a minimum value and maximum value.
     */
    proto.randomIntByMinMax = function( min /*Number*/ , max /*Number*/ ) /*int*/
    {
        if ( isNaN( min ) )
        {
            min = 0 ;
        }
        if ( isNaN( max ) )
        {
            max = 1 ;
        }
        min -= .4999;
        max += .4999;
        this._value = (this._value * 16807) % 2147483647 ;
        return Math.round(min + ( ( max - min ) * this._value / 2147483647 ) );
    }
    
    /**
     * Provides the next pseudorandom number as an unsigned integer (31 bits) betweeen a given range.
     */
    proto.randomIntByRange = function( r /*Range*/ ) /*int*/
    {
        var min /*Number*/ = r.min - .4999;
        var max /*Number*/ = r.max + .4999;
        this._value = (this._value * 16807) % 2147483647 ;
        return Math.round(min + ( ( max - min ) * this._value / 2147483647 ) );
    }
    
    /**
     * Provides the next pseudo random number as a float between nearly 0 and nearly 1.0.
     */
    proto.randomNumber = function() /*Number*/
    {
        this._value = (this._value * 16807) % 2147483647 ;
        return this._value / 2147483647 ;
    }
    
    /**
     * Provides the next pseudo random number as a float between a minimum value and maximum value.
     */
    proto.randomNumberByMinMax = function( min /*Number*/ , max /*Number*/ ) /*Number*/
    {
        if ( isNaN( min ) )
        {
            min = 0 ;
        }
        if ( isNaN( max ) )
        {
            max = 1 ;
        }
        this._value = (_value * 16807) % 2147483647 ;
        return min + ((max - min) * this._value / 2147483647 ) ;
    }
    
    /**
     * Provides the next pseudo random number as a float between a given range.
     */
    proto.randomNumberByRange = function( r /*Range*/ ) /*Number*/
    {
        this._value = (_value * 16807) % 2147483647 ;
        return r.min + ((r.max - r.min) * this._value / 2147483647 ) ;
    }
    
    /**
     * Sets the current random value with a 31 bit unsigned integer between 1 and 0X7FFFFFFE inclusive (don't use 0).
     */
    proto.setValue = function( value /*uint*/ ) /*void*/
    {
        value = value > 1 ? value : 1 ;
        value = value > 0X7FFFFFFE ? 0X7FFFFFFE : value ;
        this._value = value ; 
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return String( this._value ) ;
    }
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.valueOf = function () /*int*/ 
    {
        return this._value ;
    }
    
    ///////
    
    proto._value = -1 ;
    
    //////////////////////////////////// Virtual properties
    
    proto.__defineGetter__( "value" , proto.getValue ) ;
    proto.__defineSetter__( "value" , proto.setValue ) ;
    
    ////////////////////////////////////
    
    delete proto ;
}
