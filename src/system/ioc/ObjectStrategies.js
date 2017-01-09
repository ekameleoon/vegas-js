'use strict' ;

/**
 * The enumeration of all object attributes.
 * @name ObjectStrategies
 * @namespace system.ioc.ObjectStrategies
 * @memberof system.ioc
 */
export var ObjectStrategies = Object.defineProperties( {} ,
{
    /**
     * The name of the 'factoryMethod' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default factoryMethod
     * @const
     */
    FACTORY_METHOD : { value : 'factoryMethod' , enumerable : true },

    /**
     * The name of the 'factoryProperty' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default factoryProperty
     * @const
     */
    FACTORY_PROPERTY : { value : 'factoryProperty' , enumerable : true },

    /**
     * The name of the 'factoryReference' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default factoryReference
     * @const
     */
    FACTORY_REFERENCE : { value : 'factoryReference' , enumerable : true },

    /**
     * The name of the 'factoryValue' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default factoryValue
     * @const
     */
    FACTORY_VALUE : { value : 'factoryValue' , enumerable : true },

    /**
     * The name of the 'staticFactoryMethod' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default staticFactoryMethod
     * @const
     */
    STATIC_FACTORY_METHOD : { value : 'staticFactoryMethod' , enumerable : true },

    /**
     * The name of the 'staticFactoryProperty' object definition attribute.
     * @memberof system.ioc.ObjectStrategies
     * @type {string}
     * @default staticFactoryProperty
     * @const
     */
    STATIC_FACTORY_PROPERTY : { value : 'staticFactoryProperty' , enumerable : true },
});