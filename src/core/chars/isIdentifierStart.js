"use strict" ;

/**
 * Indicates if the specified character is a start identifier : <strong>UnicodeLetter, $, _ or the \ unicode escape sequence.</strong>
 * @name isIdentifierStart
 * @memberof core.chars
 * @function
 * @instance
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/Ecma-262.pdf">ECMA-262 spec 7.6 (PDF)</a>
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an identifier start character.
 */
export function isIdentifierStart( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) || ( c === "_" ) || ( c  === "$" ) ;
}
