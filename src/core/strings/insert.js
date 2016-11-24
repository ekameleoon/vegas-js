"use strict" ;

/**
 * Inserts a specified instance of String at a specified index position in this instance.
 * <p><b>Note :</b>
 * <ul>
 * <li>if <code>index >= source.length</code>, we directly append the value to the end of the string.</li>
 * <li>if <code>index == 0</code>, we directly insert it to the begining of the string.</li>
 * <li>if <code>index < 0</code>, we directly insert but searching backwards from the <code>source.length - index</code> position.</li>
 * </ul>
 * </p>
 * @name insert
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to change.
 * @param {number} [index=0] The position to insert the new characters.
 * @param {string} value The expression to insert in the source.
 * @return the modified string expression.
 * @example
 * trace( insert("hello",  0, "a" ) ) ; // ahello
 * trace( insert("hello",  1, "a" ) ) ; // haello
 * trace( insert("hello", 10, "a" ) ) ; // helloa
 * trace( insert("hello", -1, "a" ) ) ; // helloa
 * trace( insert("hello", -2, "a" ) ) ; // hellao
 */
export function insert( source , index = 0 , value = "" )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    if( !(value instanceof String || typeof(value) === 'string' ) || value === "" )
    {
        return source ;
    }

    var strA = "";
    var strB = "";

    if( index < 0 )
    {
        index = source.length - Math.abs(index) + 1 ;
    }
    else if( index === 0 )
    {
        return value + source ;
    }
    else if( index >= source.length )
    {
        return source + value ;
    }

    strA = source.substr( 0, index );
    strB = source.substr( index );

    return strA + value + strB;
}