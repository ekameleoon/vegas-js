"use strict" ;

/**
 * The enumeration list of all object scopes.
 * @name ObjectScope
 * @namespace system.ioc.ObjectScope
 * @memberof system.ioc
 */
export var ObjectScope = Object.defineProperties( {} ,
{
    /**
     * Defines the scope of a single object definition to any number of object instances.
     * @memberof system.ioc.ObjectScope
     * @type string
     * @default prototype
     * @const
     */
    PROTOTYPE : { value : "prototype" , enumerable : true },

    /**
     * Defines the scope of a single object definition to a single object instance per IoC container.
     * @memberof system.ioc.ObjectScope
     * @type string
     * @default singleton
     * @const
     */
    SINGLETON : { value : "singleton" , enumerable : true },

    /**
     * The <code>Array</code> representation of all object scopes constants.
     * @memberof system.ioc.ObjectScope
     * @type Array
     * @default singleton
     * @const
     */
    SCOPES : { value : [ "prototype" , "singleton" ] },

    /**
     * Returns <code>true</code> if the passed value is a valid scope reference.
     * @param {string} scope - The value to evaluates.
     * @return <code>true</code> if the passed value is a valid scope reference.
     * @memberof system.ioc.ObjectScope
     * @function
     */
    validate : { value : function( scope )
    {
        return ObjectScope.SCOPES.indexOf( scope ) > -1 ;
    }}
});