"use strict" ;

import { fastformat }  from '../../core/strings/fastformat.js' ;
import { ArrayMap }    from '../data/maps/ArrayMap.js' ;
import { Formattable } from '../Formattable.js' ;

/**
 * This object register formattable expression and format a String with all expressions register in this internal dictionnary.
 * @name ExpressionFormatter
 * @memberof system.formatters
 * @implements system.Formattable
 * @class
 * @example
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
 */
export function ExpressionFormatter()
{
    Object.defineProperties( this ,
    {
        /**
         * The expressions reference
         * @memberof system.formatters.ExpressionFormatter
         * @instance
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
     * The limit of the recursions in the formatter (<code>200</code>).
     * @memberof system.formatters.ExpressionFormatter
     * @const
     * @type number
     */
    MAX_RECURSION : { value : 200 , enumerable : true }
}) ;

ExpressionFormatter.prototype = Object.create( Formattable.prototype ,
{
    constructor : { value : ExpressionFormatter } ,

    /**
     * The begin separator of the expression to format (default <code>"{"</code>).
     * @name beginSeparator
     * @memberof system.formatters.ExpressionFormatter
     * @instance
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
     * The end separator of the expression to format (default <code>"}"</code> ).
     * @name endSeparator
     * @memberof system.formatters.ExpressionFormatter
     * @instance
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
     * @name length
     * @memberof system.formatters.ExpressionFormatter
     * @instance
     * @readonly
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
     * @name clear
     * @memberof system.formatters.ExpressionFormatter
     * @function
     * @instance
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
     * @param {string} value - The string expression to format.
     * @return the string representation of the formatted value.
     * @name format
     * @memberof system.formatters.ExpressionFormatter
     * @function
     * @instance
     */
    format :
    {
        value : function ( value )
        {
            return this._format( String(value) , 0 ) ;
        }
    },

    /**
     * Sets a new expression in the formatter. If the expression already exist, the value in the collector is replaced.
     * @param {string} key - The key of the element to register.
     * @param {string} value - The value of the element to register.
     * @return {boolean} <code>true</code> if the value is register.
     * @name set
     * @memberof system.formatters.ExpressionFormatter
     * @function
     * @instance
     */
    set :
    {
        value : function ( key , value )
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
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof system.formatters.ExpressionFormatter
     * @function
     * @instance
     */
    toString : { value : function() { return '[ExpressionFormatter]' ; } } ,

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
    _format : { value : function( str , depth = 0 )
    {
        if ( depth >= ExpressionFormatter.MAX_RECURSION )
        {
            return str ;
        }

        let m = str.match( this._reg ) ;

        if ( m === null )
        {
            return str ;
        }

        let l = m.length ;

        if ( l > 0 )
        {
            let exp ;
            let key ;
            for ( let i = 0 ; i<l ; i++ )
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
    }}
}) ;