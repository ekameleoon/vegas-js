'use strict' ;

/**
 * The enumeration of all object attributes.
 * @name ObjectAttribute
 * @namespace system.ioc.ObjectAttribute
 * @memberof system.ioc
 */
export var ObjectAttribute = Object.defineProperties( {} ,
{
    /**
     * Defines the label of the arguments in a method or a constructor object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default args
     * @const
     */
    ARGUMENTS : { value : 'args' , enumerable : true }, // The Javascript keyword 'arguments' is reserved, use 'args' !

    /**
     * Defines the attribute name of the 'config' object in the configuration of the ioc factory.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default config
     * @const
     */
    CONFIG : { value : 'config' , enumerable : true },

    /**
     * The name of the 'dependsOn' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default dependsOn
     * @const
     */
    DEPENDS_ON : { value : 'dependsOn' , enumerable : true },

    /**
     * The 'destroy' method name attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default destroy
     * @const
     */
    DESTROY_METHOD_NAME : { value : 'destroy' , enumerable : true },

    /**
     * Defines the label of the 'evaluators' attribure.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default evaluators
     * @const
     */
    EVALUATORS : { value : 'evaluators' , enumerable : true },

    /**
     * Defines the label of the 'factory' attribure.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factory
     * @const
     */
    FACTORY : { value : 'factory' , enumerable : true },

    /**
     * The name of the 'generates' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default generates
     * @const
     */
    GENERATES : { value : 'generates' , enumerable : true },

    /**
     * The 'id' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default id
     * @const
     */
    ID : { value : 'id' , enumerable : true },

    /**
     * Defines the label of the 'identify' property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default identify
     * @const
     */
    IDENTIFY : { value : 'identify' , enumerable : true },

    /**
     * The name of the external object property to register the init method name.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default init
     * @const
     */
    INIT_METHOD_NAME : { value : 'init' , enumerable : true },

    /**
     * Defines the label of the lazyInit name property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default lazyInit
     * @const
     */
    LAZY_INIT : { value : 'lazyInit' , enumerable : true },

    /**
     * Defines the 'lazyType' attribute of the object definition.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default lazyInit
     * @const
     */
    LAZY_TYPE : { value : 'lazyType' , enumerable : true },

    /**
     * Defines the 'listeners' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default listeners
     * @const
     */
    LISTENERS : { value : 'listeners' , enumerable : true },

    /**
     * Defines the attribute name of the 'locale' object in the configuration of the ioc factory and the object definition 'arguments' and 'properties'.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default locale
     * @const
     */
    LOCALE : { value : 'locale' , enumerable : true },

    /**
     * Defines the label of the 'lock' property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default lock
     * @const
     */
    LOCK : { value : 'lock' , enumerable : true },

    /**
     * Defines the label of the name in a property object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default name
     * @const
     */
    NAME : { value : 'name' , enumerable : true },

    /**
     * The 'properties' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default properties
     * @const
     */
    PROPERTIES : { value : 'properties' , enumerable : true },

    /**
     * Defines the 'receivers' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default receivers
     * @const
     */
    RECEIVERS : { value : 'receivers' , enumerable : true },

    /**
     * Defines the label of the reference in a property object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default ref
     * @const
     */
    REFERENCE : { value : 'ref' , enumerable : true },

    /**
     * Defines the 'scope' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default scope
     * @const
     */
    SCOPE : { value : 'scope' , enumerable : true },

    /**
     * Defines the 'singleton' attribute in the object definitions.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default singleton
     * @const
     */
    SINGLETON : { value : 'singleton' , enumerable : true },

    /**
     * Defines the label of the type of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default type
     * @const
     */
    TYPE : { value : 'type' , enumerable : true },

    /**
     * Defines the label of the value in a property object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default value
     * @const
     */
    VALUE : { value : 'value' , enumerable : true }
});