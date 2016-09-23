"use strict" ;

/**
 * The enumeration of all string expressions in the eden library.
 */
export var strings = Object.defineProperties( {} ,
{
    addAuthorizedFailed            : { enumerable : true , value : "addAuthorized failed with a null 'authorized' Array to configurate the eden parser." },
    assignWithoutRHS               : { enumerable : true , value : "equal assignement without RHS" },
    doesNotExist                   : { enumerable : true , value : "\"{0}\" does not exists" },
    errorArray                     : { enumerable : true , value : "bad array (unterminated array)" },
    errorComment                   : { enumerable : true , value : "syntax error (comment)" },
    errorConstructor               : { enumerable : true , value : "bad constructor" },
    errorFunction                  : { enumerable : true , value : "bad function" },
    errorIdentifier                : { enumerable : true , value : "bad identifier" },
    errorKeyword                   : { enumerable : true , value : "syntax error" },
    errorLineTerminator            : { enumerable : true , value : "bad string (found line terminator in string)" },
    errorNumber                    : { enumerable : true , value : "bad number (not finite)" },
    errorObject                    : { enumerable : true , value : "bad object (unterminated object)" },
    errorString                    : { enumerable : true , value : "bad string (unterminated string)" },
    extRefDoesNotExist             : { enumerable : true , value : "external reference \"{0}\" does not exists" },
    futureReservedKeyword          : { enumerable : true , value : "\"{0}\" is a future reserved keyword" },
    malformedCtor                  : { enumerable : true , value : "malformed constructor \"{0}( {1} )\": {2}" },
    malformedHexadecimal           : { enumerable : true , value : "bad number (malformed hexadecimal)" },
    notAuthorizedConstructor       : { enumerable : true , value : "\"{0}\" is not an authorized constructor" },
    notAuthorizedExternalReference : { enumerable : true , value : "\"{0}\" is not an authorized external reference" },
    notAuthorizedFunction          : { enumerable : true , value : "\"{0}()\" is not an authorized function on type \"{1}\"" },
    notAuthorizedPath              : { enumerable : true , value : "\"{0}\" is not an authorized path" },
    notFoundInMemory               : { enumerable : true , value : "definition \"{0}\" not found in memory (both global and local pool)" },
    notFunctionCallAllowed         : { enumerable : true , value : "function call \"{0}( {1} )\"is not allowed" },
    notValidConstructor            : { enumerable : true , value : "\"{0}\" is not a valid constructor" },
    notValidFunction               : { enumerable : true , value : "\"{0}\" is not a valid function" },
    notValidPath                   : { enumerable : true , value : "\"{0}\" is not a valid path" },
    pairIsIgnored                  : { enumerable : true , value : "name \"{0}\" is not a string, pair[{1},{2}] is ignored" },
    requirePairValue               : { enumerable : true , value : "multiSerialize require pairs of values" },
    reservedKeyword                : { enumerable : true , value : "\"{0}\" is a reserved keyword" },
    RHSmissing                     : { enumerable : true , value : "RHS is missing" },
    unterminatedParenthesis        : { enumerable : true , value : "unterminated parenthesis, check your function/constructor \"{0}\"" },
    separator                      : { enumerable : true , value : "----------------------------------------------------------------" } ,
    unterminatedComment            : { enumerable : true , value : "unterminated comment" }
});


