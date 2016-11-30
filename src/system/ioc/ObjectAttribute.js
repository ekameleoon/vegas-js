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
     * Defines the label of the 'configuration' top-level attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default configuration
     * @const
     */
    CONFIGURATION : { value : 'configuration' , enumerable : true },

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
     * Defines the label of the 'identify' property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default identify
     * @const
     */
    IDENTIFY : { value : 'identify' , enumerable : true },

    /**
     * Defines the label of the 'i18n' top-level attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default i18n
     * @const
     */
    I18N : { value : 'i18n' , enumerable : true },

    /**
     * Defines the label of the 'imports' top-level attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default imports
     * @const
     */
    IMPORTS : { value : 'imports' , enumerable : true },

    /**
     * Defines the label of the lazyInit name property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default lazyInit
     * @const
     */
    LAZY_INIT : { value : 'lazyInit' , enumerable : true },

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
     * The name of the 'dependsOn' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default dependsOn
     * @const
     */
    OBJECT_DEPENDS_ON : { value : 'dependsOn' , enumerable : true },

    /**
     * The name of the external object property to register the destroy method name.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default destroy
     * @const
     */
    OBJECT_DESTROY_METHOD_NAME : { value : 'destroy' , enumerable : true },

    /**
     * The name of the 'factoryLogic' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factoryLogic
     * @const
     */
    OBJECT_FACTORY_LOGIC : { value : 'factoryLogic' , enumerable : true },

    /**
     * The name of the 'factoryMethod' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factoryMethod
     * @const
     */
    OBJECT_FACTORY_METHOD : { value : 'factoryMethod' , enumerable : true },

    /**
     * The name of the 'factoryProperty' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factoryProperty
     * @const
     */
    OBJECT_FACTORY_PROPERTY : { value : 'factoryProperty' , enumerable : true },

    /**
     * The name of the 'factoryReference' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factoryReference
     * @const
     */
    OBJECT_FACTORY_REFERENCE : { value : 'factoryReference' , enumerable : true },

    /**
     * The name of the 'factoryValue' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default factoryValue
     * @const
     */
    OBJECT_FACTORY_VALUE : { value : 'factoryValue' , enumerable : true },

    /**
     * The name of the 'generates' object definition attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default generates
     * @const
     */
    OBJECT_GENERATES : { value : 'generates' , enumerable : true },

    /**
     * The name of the external object property to define the identifier of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default id
     * @const
     */
    OBJECT_ID : { value : 'id' , enumerable : true },

    /**
     * The name of the external object property to register the init method name.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default init
     * @const
     */
    OBJECT_INIT_METHOD_NAME : { value : 'init' , enumerable : true },

    /**
     * Defines the label of the 'listeners' name property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default listeners
     * @const
     */
    OBJECT_LISTENERS : { value : 'listeners' , enumerable : true },

    /**
     * The name of the external object property to register the properties.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default properties
     * @const
     */
    OBJECT_PROPERTIES : { value : 'properties' , enumerable : true },

    /**
     * Defines the label of the 'receivers' name property of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default receivers
     * @const
     */
    OBJECT_RECEIVERS : { value : 'receivers' , enumerable : true },

    /**
     * The name of the external object property to define the scope flag of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default scope
     * @const
     */
    OBJECT_SCOPE : { value : 'scope' , enumerable : true },

    /**
     * The name of the external object property to define the singleton flag of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default singleton
     * @const
     */
    OBJECT_SINGLETON : { value : 'singleton' , enumerable : true },

    /**
     * The name of the external object property to define the static factory flag of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default staticFactoryMethod
     * @const
     */
    OBJECT_STATIC_FACTORY_METHOD : { value : 'staticFactoryMethod' , enumerable : true },

    /**
     * The name of the external object property to define the static property flag of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default staticFactoryProperty
     * @const
     */
    OBJECT_STATIC_FACTORY_PROPERTY : { value : 'staticFactoryProperty' , enumerable : true },

    /**
     * Defines the label of the 'objects' top-level attribute.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default args
     * @const
     */
    OBJECTS : { value : 'objects' , enumerable : true },

    /**
     * Defines the label of the 'resource' attribute in the imports objects.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default resource
     * @const
     */
    RESOURCE : { value : 'resource' , enumerable : true },

    /**
     * Defines the label of the type of the object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default type
     * @const
     */
    TYPE : { value : 'type' , enumerable : true },

    /**
     * Defines the attribute name of the alias expression in a typeAlias object in the configuration of the ioc factory.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default alias
     * @const
     */
    TYPE_ALIAS : { value : 'alias' , enumerable : true },

    /**
     * Defines the attribute name of the 'typeAliases' Array in the configuration of the ioc factory.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default typeAliases
     * @const
     */
    TYPE_ALIASES : { value : 'typeAliases' , enumerable : true },

    /**
     * Defines the attribute name of the 'typeExpression' Array in the configuration of the ioc factory.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default typeExpression
     * @const
     */
    TYPE_EXPRESSION : { value : 'typeExpression' , enumerable : true },

    /**
     * Defines the label of the reference in a property object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default ref
     * @const
     */
    REFERENCE : { value : 'ref' , enumerable : true },

    /**
     * Defines the label of the value in a property object.
     * @memberof system.ioc.ObjectAttribute
     * @type {string}
     * @default value
     * @const
     */
    VALUE : { value : 'value' , enumerable : true }
});