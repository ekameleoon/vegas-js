"use strict" ;

/**
 * The enumeration of all string expressions in the signal engine.
 */
export var strings = Object.defineProperties( {} ,
{
    INVALID_PARAMETER_TYPE :
    {
        value : "The parameter with the index {0} in the emit method is not valid." ,
        enumerable : true
    },
    INVALID_PARAMETERS_LENGTH :
    {
        value : "The number of arguments in the emit method is not valid, must be invoked with {0} argument(s) and you call it with {1} argument(s)." ,
        enumerable : true
    },
    INVALID_TYPES :
    {
        value : "Invalid types representation, the Array of types failed at index {0} should be a constructor function but was:\"{1}\"." ,
        enumerable : true
    }
});