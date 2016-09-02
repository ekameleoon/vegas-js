"use strict" ;

/**
 * The enumeration of all type policies in the ObjectConfig object of the ioc factory.
 */
export var TypePolicy = Object.defineProperties( {} ,
{
    /**
     * Defines the 'alias' TypePolicy value.
     * Use it if you want use only type "alias" evaluation when a new object is created in the factory.
     */
    ALIAS : { value : "alias" , enumerable : true },

    /**
     * Defines the 'all' TypePolicy value.
     * Use it if you want use only all evaluation filters when a new object is created in the factory.
     */
    ALL : { value : "all" , enumerable : true },

    /**
     * Defines the 'expression' TypePolicy value.
     * Use it if you want use only type "expression" evaluation when a new object is created in the factory.
     */
    EXPRESSION : { value : "expression" , enumerable : true },

    /**
     * Defines the 'none' TypePolicy value.
     * Use it if you want no evaluation filter when a new object is created in the factory.
     */
    NONE : { value : "none" , enumerable : true }
});