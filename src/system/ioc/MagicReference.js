"use strict" ;

/**
 * Enumeration of all "magic reference patterns" id can be use in the object definition to create a dependency with special object reference in the factory.
 * @name MagicReference
 * @namespace system.ioc.MagicReference
 * @memberof system.ioc
 */
export var MagicReference = Object.defineProperties( {} ,
{
    /**
     * The reference pattern who represents the current config reference of the application defines in the config object in the factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #config
     * @const
     */
    CONFIG : { value : "#config" , enumerable : true },

    /**
     * The reference pattern who represents the init magic name used in the property definitions to change the strategy of the current member initialisation.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #init
     * @const
     */
    INIT : { value : "#init" , enumerable : true },

    /**
     * The reference pattern who represents the current locale reference of the application defines in the config object in the factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #locale
     * @const
     */
    LOCALE : { value : "#locale" , enumerable : true },

    /**
     * The reference pattern who represents the current Parameters reference of the application defines in the config object in the factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #params
     * @const
     */
    PARAMS : { value : "#params" , enumerable : true },

    /**
     * The reference pattern who represents the current root reference of the application defines in the config object in the factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #root
     * @const
     */
    ROOT : { value : "#root" , enumerable : true },

    /**
     * The reference pattern who represents the current stage reference of the application defines in the config object in the factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #stage
     * @const
     */
    STAGE : { value : "#stage" , enumerable : true },

    /**
     * The reference pattern who represents the current factory.
     * @memberof system.ioc.MagicReference
     * @type {string}
     * @default #this
     * @const
     */
    THIS : { value : "#this" , enumerable : true }
});