"use strict" ;

/**
 * The static enumeration list of all object scopes.
 */
export var ObjectScope = Object.defineProperties( {} ,
{
    /**
     * Defines the scope of a single object definition to any number of object instances.
     */
    PROTOTYPE : { value : "prototype" , enumerable : true },

    /**
     * Defines the scope of a single object definition to a single object instance per IoC container.
     */
    SINGLETON : { value : "singleton" , enumerable : true },

    /**
     * The Array representation of all object scopes constants.
     */
    SCOPES : { value : [ "prototype" , "singleton" ] , enumerable : true },

    /**
     * Returns true if the passed value is a valid scope reference.
     * @return true if the passed value is a valid scope reference.
     */
    validate : { value : function( scope /*String*/ ) /*Boolean*/
    {
        return ObjectScope.SCOPES.indexOf( scope ) > -1 ;
    }}
});