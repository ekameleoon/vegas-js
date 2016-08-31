"use strict" ;

/**
 * Inserts a specified instance of String at a specified index position in this instance.
 * <p>note : </p>
 * if index is null, we directly append the value to the end of the string.
 * if index is zero, we directly insert it to the begining of the string.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * result = core.strings.insert("hello", 0, "a" );  // ahello
 * trace(result) ;
 *
 * result = core.strings.insert("hello", -1, "a" ); // hellao
 * trace(result) ;
 *
 * result = core.strings.insert("hello", 10, "a" ); // helloa
 * trace(result) ;
 *
 * result = core.strings.insert("hello", 1, "a" );  // haello
 * trace(result) ;
 * </pre>
 * @param source The String to transform.
 * @param index The position to insert the new characters.
 * @param value The expression to insert in the source.
 * @return the string modified by the method.
 */
export function insert( source /*String*/ , index /*int*/ , value /*String*/ ) /*String*/
{
    var strA = "";
    var strB = "";

    if( index === 0 )
    {
        return value + source ;
    }
    else if( index === source.length )
    {
        return source + value ;
    }

    /* TODO:
    review the logic when startIndex == -1
     */
    strA = source.substr( 0, index );
    strB = source.substr( index );

    return strA + value + strB;
}