"use strict" ;

/**
 * The enumeration of all string expressions in the logging engine.
 * @name strings
 * @memberof system.logging
 * @const
 * @instance
 */
export var strings = Object.defineProperties( {} ,
{
    // LoggerTarget

    /**
     * The static field used when throws an Error when a character is invalid.
     */
    CHARS_INVALID : { value : "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\" , enumerable : true } ,

    /**
     * The static field used when throws an Error when the character placement failed.
     */
    CHAR_PLACEMENT : { value : "'*' must be the right most character." , enumerable : true } ,

    /**
     * The static field used when throws an Error if the filter is empty or null.
     */
    EMPTY_FILTER : { value : "filter must not be null or empty." , enumerable : true },

    /**
     * The static field used when throws an Error when filter failed.
     */
    ERROR_FILTER : { value : "Error for filter '{0}'." , enumerable : true },

    // Log

    /**
     * The default channel of the <code class="prettyprint">Logger</code> instances returns with the <code class="prettyprint">getLogger</code> method.
     */
    DEFAULT_CHANNEL : { value : "" , enumerable : true },

    /**
     * The string representation of all the illegal characters.
     */
    ILLEGALCHARACTERS : { value : "[]~$^&/\\(){}<>+=`!#%?,:;'\"@" , enumerable : true },

    /**
     * The static field used when throws an Error when a character is invalid.
     */
    INVALID_CHARS : { value : "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" , enumerable : true },

    /**
     * The static field used when throws an Error when the length of one character is invalid.
     */
    INVALID_LENGTH : { value : "Channels must be at least one character in length." , enumerable : true },

    /**
     * The static field used when throws an Error when the specified target is invalid.
     */
    INVALID_TARGET : { value : "Log, Invalid target specified." , enumerable : true }

});