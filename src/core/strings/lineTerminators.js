"use strict" ;

/**
 * Like white space characters, line terminator characters are used to improve source text readability and to separate tokens (indivisible lexical units) from each other.
 * However, unlike white space characters, line terminators have some influence over the behaviour of the syntactic grammar.
 * In general, line terminators may occur between any two tokens, but there are a few places where they are forbidden by the syntactic grammar.
 * A line terminator cannot occur within any token, not even a string.
 * Line terminators also affect the process of automatic semicolon insertion.
 * <p>ECMAScript specification.</p>
 */
export var lineTerminators =
[
    "\u000A" /*LF : Line Feed*/ ,
    "\u000D" /*CR : Carriage Return*/,
    "\u2028" /*LS : Line Separator*/ ,
    "\u2929" /*PS : Paragraphe Separator*/
];