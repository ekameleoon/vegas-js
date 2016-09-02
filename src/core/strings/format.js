"use strict" ;

import { pad } from './pad.js' ;

/**
 * Format a string using indexed or named parameters.
 * <p>Usage :</p>
 * <ul>
 * <li><code>format( pattern:String, ...args:Array ):String</code></li>
 * <li><code>format( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * <li><code>format( pattern:String, [arg0:*,arg1:*,arg2:*, ...], ...args:Array ):String</code></li>
 * <li><code>format( pattern:String, {name0:value0,name1:value1,name2:value2, ...} ):String</code></li>
 * <li><code>format( pattern:String, {name0:value0,name1:value1,name2:value2, ...}, ...args:Array ):String</code></li>
 * </ul>
 * <p><b>Examples:</b></p>
 * <pre>
 * trace( core.strings.format( "{0},{1},{2}" , "apples" , "oranges", "grapes" ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{0},{1},{2}" , ["apples" , "oranges", "grapes"] ) ) ; // apples,oranges,grapes
 * trace( core.strings.format( "{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) ) ; // core.strings.format()
 * </pre>
 * @see core.strings#fastformat
 * @throws Error When a token is malformed.
 */
export function format( pattern /*String*/ ) /*String*/
{
    if( (pattern === null) || (pattern === "") )
    {
        return "";
    }

    Object.setPrototypeOf( arguments , Array.prototype ) ;

    var args /*Array*/ = arguments ;

    args.shift() ;

    var formatted /*String*/ = pattern;
    var len /*uint*/         = args.length;
    var words /*Object*/     = {};

    if( (len === 1) && (args[0] instanceof Array) )
    {
        args = args[0];
    }
    else if( args[0] instanceof Array )
    {
        var a /*Array*/ = args[0];
        args.shift();
        args = a.concat( args );
    }
    else if( (args[0] instanceof Object) && (String( args[0] ) === "[object Object]") )
    {
        words = args[0];
        if( len > 1 )
        {
            args.shift();
        }
    }

    /* note:
       don't use the global flag here as we want the search
       to be iterative and starting at index 0 of the string

       but do use the multiline flag if a token can be replaced
       by a \n, \r, etc.
    */
    var search /*RegExp*/ = new RegExp( "{([a-z0-9,:\\-]*)}", "m" );
    var result /*Array*/  = search.exec( formatted );

    var part /*String*/;
    var token /*String*/;
    var c /*String*/;

    var pos /*int*/ ;

    var dirty /*Boolean*/ = false ;

    var padding /*int*/ = 0;

    /* note:
       the buffer will store special string parts of the form
       buffer[0] = "{a:1,b:2,c:3}"
       the fromatted string will replace it by the form
       \uFFFC0 , \uFFFC+N , N being an integer from 0 to N
    */
    var buffer /*Array*/ = [];

    while( result !== null )
    {
        part = result[0];

        /////// pad the token expression

        token = result[1] ;

        pos = token.indexOf( "," );

        if( pos > 0 )
        {
            padding = Number( token.substr( pos + 1 ) );
            token   = token.substring( 0, pos );
        }

        ////////////

        c = token.charAt( 0 ) ;

        if( ("0" <= c) && (c <= "9") )
        {
            formatted = formatted.replace( part, pad( String( args[token] ) , padding ) );
        }
        else if( ( token === "" ) || ( token.indexOf( ":" ) > -1 ) ) // if the token is not valid
        {
            /* note:
               this is to deal with eden/json strings inside a format string
               if you do a format( "expected: <{a:1,b:2,c:3}> but was: <{a:1,b:2,c:4}>", "test" )
               this will collide of the legit parsing of
               format( "hello {x,-8} and nhello {y,-8}" )
            */

            buffer.push( part );

            formatted = formatted.replace( new RegExp(part,"g"), "\uFFFC"+ ( buffer.length - 1 ) ) ;
            dirty     = true;
        }
        else if( ( "a" <= c ) && ( c <= "z" ) )
        {
            if( token in words || words.hasOwnProperty( token ) )
            {
                /* note:
                   here you want the part to have a global flag to replace all token instances
                */
                formatted = formatted.replace( new RegExp(part,"g"), pad( String( words[token] ) , padding ) );
            }
        }
        else
        {
            /* note:
               don't use format() within itself
             */
            throw new Error( "core.strings.format failed, malformed token \"" + part + "\", can not start with \"" + c + "\"" ) ;
        }

        result = search.exec( formatted );
    }

    if( dirty )
    {
        var i /*int*/ ;
        var bl /*int*/ = buffer.length ;
        for( i = 0 ; i < bl ; i++ )
        {
            formatted = formatted.replace( new RegExp( "\uFFFC" + i , "g" ) , buffer[i] );
        }
    }

    return formatted;
}