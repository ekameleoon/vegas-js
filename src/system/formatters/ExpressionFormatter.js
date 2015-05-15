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
 * This object register formattable expression and format a String with all expressions register in this internal dictionnary.
 * <p><b>Example :</b></p>
 * <pre>
 * ExpressionFormatter = system.formatters.ExpressionFormatter ;
 * 
 * formatter = new ExpressionFormatter() ;
 * 
 * formatter.expressions.put( "root"      , "c:"                     ) ;
 * formatter.expressions.put( "system"    , "{root}/project/system"  ) ;
 * formatter.expressions.put( "data.maps" , "{system}/data/maps"     ) ;
 * formatter.expressions.put( "map"       , "{data.maps}/HashMap.as" ) ;
 * 
 * source = "the root : {root} - the class : {map}" ; 
 * // the root : c: - the class : c:/project/system/data/maps/HashMap.as
 * 
 * trace( formatter.format( source ) ) ;
 * 
 * trace( "----" ) ;
 * 
 * formatter.expressions.put( "system"    , "%root%/project/system" ) ;
 * formatter.expressions.put( "data.maps" , "%system%/data/maps" ) ;
 * formatter.expressions.put( "HashMap"   , "%data.maps%/HashMap.as" ) ;
 * 
 * formatter.beginSeparator = "%" ;
 * formatter.endSeparator   = "%" ;
 * 
 * source = "the root : %root% - the class : %HashMap%" ;
 * 
 * trace( formatter.format( source ) ) ;
 * // the root : c: - the class : c:/project/system/data/maps/HashMap.as
 * </pre>
 */
if ( system.formatters.ExpressionFormatter == undefined ) 
{
    /**
     * @requires system.data.maps.ArrayMap
     */
    require( "system.data.maps.ArrayMap" ) ;
    
    /**
     * @requires system.formatters.Formattable
     */
    require( "system.formatters.Formattable" ) ;
    
    /**
     * Creates a new ExpressionFormatter instance.
     */
    system.formatters.ExpressionFormatter = function () 
    {
        this._reset() ;
    }
    
    //////// static
    
    system.formatters.ExpressionFormatter.MAX_RECURSION /*uint*/ = 200 ;
    
    //////// inherit
    
    /**
     * @extends
     */
    proto = system.formatters.ExpressionFormatter.extend( system.formatters.Formattable ) ;
    
    //////// public
    
    /**
     * The dictionary of all expressions register in the formatter.
     */
    proto.expressions = new system.data.maps.ArrayMap() ;
    
    /**
     * Formats the specified value.
     * @param value The object to format.
     * @return the string representation of the formatted value. 
     */
    proto.format = function ( value ) /*String*/ 
    {
        return this._format( value.toString() , 0 ) ;
    }
    
    //////// getter/setter
    
    /**
     * The begin separator of the expression to format (default "{").
     */
    proto.getBeginSeparator = function() /*String*/
    {
        return this._beginSeparator ;
    }
    
    /**
     * @private
     */
    proto.setBeginSeparator = function( str /*String*/ ) /*void*/
    {
        this._beginSeparator = str || "{" ;
        this._reset() ;
    }
    
    /**
     * The end separator of the expression to format (default "}").
     */
    proto.getEndSeparator = function() /*String*/
    {
        return this._endSeparator ;
    }
    
    /**
     * @private
     */
    proto.setEndSeparator = function( str /*String*/ ) /*void*/
    {
        this._endSeparator = str || "}" ;
        this._reset() ;
    }
    
    //////// virtual properties
    
    proto.__defineGetter__( "beginSeparator" , proto.getBeginSeparator ) ;
    proto.__defineSetter__( "beginSeparator" , proto.setBeginSeparator ) ;
    
    proto.__defineGetter__( "endSeparator" , proto.getEndSeparator ) ;
    proto.__defineSetter__( "endSeparator" , proto.setEndSeparator ) ;
    
    //////// private
    
    /**
     * @private
     */
    proto._beginSeparator /*String*/ = "{" ;
    
    /**
     * @private
     */
    proto._endSeparator /*String*/ = "}" ;
    
    /**
     * @private
     */
    proto._pattern /*String*/ = "{0}((\\w+\)|(\\w+)((.\\w)+|(.\\w+))){1}" ;
    
    /**
     * @private
     */
    proto._reg /*RegExp*/ = null ;
    
    /**
     * @private
     */
    proto._format = function( str /*String*/ , depth /*uint*/ ) /*void*/
    {
        if ( depth >= system.formatters.ExpressionFormatter.MAX_RECURSION )
        {
            return str ;
        } 
        
        var m /*Array*/ = str.match( this._reg ) ;
        
        if ( m == null )
        {
            return str ;
        }
        var l /*int*/   = m.length ;
        
        if ( l > 0 )
        {
            var exp /*String*/ ;
            var key /*String*/ ;
            for ( var i /*int*/ = 0 ; i<l ; i++ )
            {
                key = m[i].substr(1) ;
                key = key.substr( 0 , key.length-1 ) ;
                if ( this.expressions.containsKey( key ) )
                {
                    exp = this._format( this.expressions.get(key) , depth + 1 ) ;
                    this.expressions.put( key , exp ) ;
                    str = str.replace( m[i] , exp ) || exp ;
                }
            }
        }
        return str ;
    }
    
    /**
     * @private
     */
    proto._reset = function() /*void*/
    {
        this._reg = new RegExp( core.strings.fastformat( this._pattern , this.beginSeparator , this.endSeparator ), "g" ) ;
    }
}