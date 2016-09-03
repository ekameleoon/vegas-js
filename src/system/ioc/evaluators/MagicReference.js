"use strict" ;

/**
 * Enumeration of all "magic reference patterns" id can be use in the object definition to create a dependency with special object reference in the factory.
 */
export var MagicReference = Object.defineProperties( {} ,
{
    /**
     * The reference pattern who represents the current config reference of the application defines in the config object in the factory.
     */
    CONFIG : { value : "#config" , enumerable : true },

    /**
     * The reference pattern who represents the init magic name used in the property definitions to change the strategy of the current member initialisation.
     */
    INIT : { value : "#init" , enumerable : true },

    /**
     * The reference pattern who represents the current locale reference of the application defines in the config object in the factory.
     */
    LOCALE : { value : "#locale" , enumerable : true },

    /**
     * The reference pattern who represents the current Parameters reference of the application defines in the config object in the factory.
     */
    PARAMS : { value : "#params" , enumerable : true },

    /**
     * The reference pattern who represents the current root reference of the application defines in the config object in the factory.
     */
    ROOT : { value : "#root" , enumerable : true },

    /**
     * The reference pattern who represents the current stage reference of the application defines in the config object in the factory.
     */
    STAGE : { value : "#stage" , enumerable : true },

    /**
     * The reference pattern who represents the current factory.
     */
    THIS : { value : "#this" , enumerable : true }
});