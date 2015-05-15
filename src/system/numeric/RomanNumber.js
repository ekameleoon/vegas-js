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
 * Roman numerals are a numeral system originating in ancient Rome, adapted from Etruscan numerals.
 * <p>Roman numerals are commonly used in numbered lists (in outline format), clock faces, pages preceding the main body of a book, chord triads in music analysis, the numbering of movie publication dates, successive political leaders or children with identical names, and the numbering of some annual sport events.</p>
 * <p><b>Links :</b>
 * <li><a href="http://en.wikipedia.org/wiki/Roman_numerals">http://en.wikipedia.org/wiki/Roman_numerals</a></li>
 * <li><a href="http://netzreport.googlepages.com/online_converter_for_dec_roman.html">http://netzreport.googlepages.com/online_converter_for_dec_roman.html</a></li>
 * </p>
 */
if ( system.numeric.RomanNumber == undefined ) 
{
    /**
     * Creates a new RomanNumber instance.
     * @param value The decimal uint value of the RomanNumber or a String representation of the roman numerals object.
     */
    system.numeric.RomanNumber = function( value ) 
    {
        if( typeof(value) == "string" || value instanceof String )
        {
            this._num = system.numeric.RomanNumber.parseRomanString( value ) ;
        }
        else if( typeof(value) == "number" || value instanceof Number )
        {
            if( value > system.numeric.RomanNumber.MAX )
            {
                throw new RangeError( "Max value for a RomanNumber is " + system.numeric.RomanNumber.MAX );
            }
            if( value < system.numeric.RomanNumber.MIN )
            {
                throw new RangeError( "Min value for a RomanNumber is " + system.numeric.RomanNumber.MIN );
            }
            this._num = value;
        }
    }
    
    ///////
    
    /**
     * The maximum parsing value.
     */
    system.numeric.RomanNumber.MAX /*uint*/ = 3999;
    
    /**
     * The minimum parsing value.
     */
    system.numeric.RomanNumber.MIN /*uint*/ = 0 ;
    
    /**
     * The array representation of all numeric values.
     */
    system.numeric.RomanNumber.NUMERIC /*Array*/ = [ 1000, 500, 100,  50, 10, 5, 1 ];
    
    /**
     * The array representation of all roman expressions.
     */
    system.numeric.RomanNumber.ROMAN /*Array*/ = [ "M", "D", "C", "L", "X", "V", "I" ];
    
    ///////
    
    /**
     * @extends Object
     */
    proto = system.numeric.RomanNumber.extend( Object ) ;
    
    /**
     * Parse the specified value.
     */
    proto.parse = function ( value ) /*String*/
    {
        value = ( (typeof(value) == "number" || value instanceof Number) ) ? value : this._num  ;
        return system.numeric.RomanNumber.parse( value );
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return this.parse( this._num ) ;
    }
    
    /**
     * Returns the primitive value of this object.
     * @return the primitive value of this object.
     */
    proto.valueOf = function () /*uint*/ 
    {
        return this._num ;
    }
    
    ///////
    
    /**
     * This static method parse the specified value and return this roman numerals String representation.
     */
    system.numeric.RomanNumber.parse = function( num ) /*String*/
    {
        var MAX     = system.numeric.RomanNumber.MAX ;
        var MIN     = system.numeric.RomanNumber.MIN ;
        
        var NUMERIC = system.numeric.RomanNumber.NUMERIC ;
        var ROMAN   = system.numeric.RomanNumber.ROMAN   ;
        
        var n /*uint*/   = 0 ;
        var r /*String*/ = "";
        
        if( (typeof(num) == "number" || num instanceof Number) )
        {
            if( num > MAX )
            {
                throw new RangeError( "Max value for a RomanNumber is " + MAX );
            }
            else if( num < MIN )
            {
                throw new RangeError( "Min value for a RomanNumber is " + MIN );
            }
            n = num ;
        }
        
        var i /*int*/;
        var rank /*uint*/;
        var bellow /*uint*/;
        var roman /*String*/;
        var romansub /*String*/;
        
        var size /*int*/ = NUMERIC.length ;
        
        for( i=0 ; i<size ; i++ )
        {
            if( n == 0 )
            {
                break;
            }
            
            rank  = NUMERIC[i];
            roman = ROMAN[i]; 
            
            if( String(rank).charAt(0) == "5" )
            {
                bellow = (rank - NUMERIC[i+1]);
                romansub = ROMAN[i+1];
            }
            else
            {
                bellow = (rank - NUMERIC[i+2]);
                romansub = ROMAN[i+2];
            }
            
            if( (n >= rank) || (n >= bellow) )
            {
                while( n >= rank )
                {
                    r += roman;
                    n -= rank;
                }
            }
            
            if( n > 0 && n >= bellow )
            {
                r += romansub + roman;
                n -= bellow;
            }
        }
        
        return r;
    }
    
    /**
     * Parses a roman String representation in this uint decimal representation.
     */
    system.numeric.RomanNumber.parseRomanString = function( roman /*String*/ ) /*uint*/
    {
        var NUMERIC = system.numeric.RomanNumber.NUMERIC ;
        var ROMAN   = system.numeric.RomanNumber.ROMAN   ;
        
        if( roman == null || roman == "" )
        {
            return 0 ;
        }
        
        roman = roman.toUpperCase();
        
        var n /*uint*/ = 0;
        
        var pos /*int*/     = 0  ;
        var ch /*String*/   = "" ;
        var next /*String*/ = "" ;
        
        var ich /*uint*/ ;
        var inext /*uint*/ ;
        
        while( pos >= 0 )
        {
            ch   = roman.charAt( pos );
            next = roman.charAt( pos+1 );
            
            if( ch == "" )
            {
                break;
            }
            
            // trace( "> ch:'" + ch  + "' next:'" + next + "'" ) ;
            
            ich   = ROMAN.indexOf(ch);
            inext = ROMAN.indexOf(next);
            
            // trace( "    > ich:" + ich  + " inext:" + inext ) ;
            
            if ( ich < 0 )
            {
                return 0 ;
            }
            else if( ich <= inext || inext == -1 )
            {
                n += NUMERIC[ich];
            }
            else
            {
                n += NUMERIC[inext] - NUMERIC[ich];
                pos++;
            }
            
            // trace( "    > '" + n  + "'" ) ;
            
            pos++;
        }
        
        return n;
    }
    
    ///////
    
    proto._num /*uint*/ = 0 ;
    
    ///////
    
    delete proto ;
}
