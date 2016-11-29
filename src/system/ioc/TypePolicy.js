"use strict" ;

/**
 * The enumeration of all type policies in the ObjectConfig object of the ioc factory.
 * @name TypePolicy
 * @namespace system.ioc.TypePolicy
 * @memberof system.ioc
 */
export var TypePolicy = Object.defineProperties( {} ,
{
    /**
     * Defines the <code>'alias'</code> policy value. Use it if you want use only type "alias" evaluation when a new object is created in the factory.
     * @memberof system.ioc.TypePolicy
     * @type string
     * @default alias
     * @const
     */
    ALIAS : { value : "alias" , enumerable : true },

    /**
     * Defines the <code>'all'</code> policy value. Use it if you want use only all evaluation filters when a new object is created in the factory.
     * @memberof system.ioc.TypePolicy
     * @type string
     * @default all
     * @const
     */
    ALL : { value : "all" , enumerable : true },

    /**
     * Defines the <code>'expression'</code> policy value. Use it if you want use only type "expression" evaluation when a new object is created in the factory.
     * @type string
     * @default expression
     * @const
     */
    EXPRESSION : { value : "expression" , enumerable : true },

    /**
     * Defines the <code>'none'</code> policy value. Use it if you want no evaluation filter when a new object is created in the factory.
     * @type string
     * @default none
     * @const
     */
    NONE : { value : "none" , enumerable : true }
});