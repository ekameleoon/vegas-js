"use strict" ;

import { fastformat }  from '../../core/strings/fastformat.js' ;
import { ArrayMap }    from '../data/maps/ArrayMap.js' ;
import { Formattable } from '../Formattable.js' ;

/**
 * This object register formattable expression and format a String with all expressions register in this internal dictionnary.
 * <p><b>Example :</b></p>
 * <pre>
 * var ExpressionFormatter = system.formatters.ExpressionFormatter ;
 *
 * var formatter = new ExpressionFormatter() ;
 *
 * formatter.set( "root"      , "c:"                     ) ;
 * formatter.set( "system"    , "{root}/project/system"  ) ;
 * formatter.set( "data.maps" , "{system}/data/maps"     ) ;
 * formatter.set( "map"       , "{data.maps}/HashMap.as" ) ;
 *
 * source = "the root : {root} - the class : {map}" ;
 * // the root : c: - the class : c:/project/system/data/maps/HashMap.as
 *
 * trace( formatter.length ) ;
 * trace( formatter.format( source ) ) ;
 *
 * trace( "----" ) ;
 *
 * formatter.clear() ;
 *
 * formatter.set( "root"      , "c:"                     ) ;
 * formatter.set( "system"    , "%root%/project/system" ) ;
 * formatter.set( "data.maps" , "%system%/data/maps" ) ;
 * formatter.set( "HashMap"   , "%data.maps%/HashMap.as" ) ;
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
export function ExpressionFormatter()
{
    Object.defineProperties( this ,
    {
        /**
         * The expressions reference
         */
        expressions : { value : new ArrayMap() },

        /**
         * @private
         */
        _beginSeparator : { value : '{' , writable : true } ,

        /**
         * @private
         */
        _endSeparator : { value : '}' , writable : true } ,

        /**
         * @private
         */
        _pattern : { value : "{0}((\\w+\)|(\\w+)((.\\w)+|(.\\w+))){1}" } ,

        /**
         * @private
         */
        _reg : { value : null , writable : true }
    }) ;

    this._reset() ;
}

Object.defineProperties( ExpressionFormatter ,
{
    /**
     * The limit of the recursions in the formatter.
     */
    MAX_RECURSION : { value : '200' , enumerable : true }
}) ;

/**
 * @extends Formattable
 */
ExpressionFormatter.prototype = Object.create( Formattable.prototype ,
{
    constructor : { value : ExpressionFormatter } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ExpressionFormatter]' ; } } ,

    /**
     * The begin separator of the expression to format (default "{").
     */
    beginSeparator :
    {
        get : function()
        {
            return this._beginSeparator ;
        },
        set : function( str )
        {
            this._beginSeparator = str || "{" ;
            this._reset() ;
        }
    },

    /**
     * The end separator of the expression to format (default "}" ).
     */
    endSeparator :
    {
        get : function()
        {
            return this._endSeparator ;
        },
        set : function( str )
        {
            this._endSeparator = str || "}" ;
            this._reset() ;
        }
    },

    /**
     * Indicates the size of the expression dictionary.
     */
    length :
    {
        get : function()
        {
            return this.expressions.length ;
        }
    },

    /**
     * Clear the expression formatter dictionary.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    clear :
    {
        value : function ()
        {
            this.expressions.clear() ;
        }
    },

    /**
     * Formats the specified value.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    format :
    {
        value : function ( value ) /*String*/
        {
            return this._format( String(value) , 0 ) ;
        }
    },

    /**
     * Sets a new expression in the formatter. If the expression already exist, the value in the collector is replaced.
     * @param value The object to format.
     * @return the string representation of the formatted value.
     */
    set :
    {
        value : function ( key /*String*/ , value /*String*/ ) /*Boolean*/
        {
            if ( key === '' || !(key instanceof String || typeof(key) === 'string') )
            {
                return false ;
            }

            if ( value === '' || !(value instanceof String || typeof(value) === 'string') )
            {
                return false ;
            }

            this.expressions.set( key , value ) ;
            return true ;
        }
    },

    /**
     * @private
     */
    _reset :
    {
        value : function()
        {
            this._reg = new RegExp( fastformat( this._pattern , this.beginSeparator , this.endSeparator ) , "g" ) ;
        }
    },

    /**
     * @private
     */
    _format :
    {
        value : function( str , depth )
        {
            if ( depth >= ExpressionFormatter.MAX_RECURSION )
            {
                return str ;
            }

            var m /*Array*/ = str.match( this._reg ) ;

            if ( m === null )
            {
                return str ;
            }

            var l = m.length ;

            if ( l > 0 )
            {
                var exp ;
                var key ;
                for ( var i = 0 ; i<l ; i++ )
                {
                    key = m[i].substr(1) ;
                    key = key.substr( 0 , key.length-1 ) ;

                    if ( this.expressions.has( key ) )
                    {
                        exp = this._format( this.expressions.get(key) , depth + 1 ) ;
                        this.expressions.set( key , exp ) ;
                        str = str.replace( m[i] , exp ) || exp ;
                    }
                }
            }
            return str ;
        }
    }
}) ;