'use strict' ;

/**
 * The static enumeration list of all object attributes.
 */
export var ObjectAttribute = Object.defineProperties( {} ,
{
    /**
     * Defines the label of the arguments in a method or a constructor object.
     */
    ARGUMENTS : { value : 'args' , enumerable : true }, // The Javascript keyword 'arguments' is reserved, use 'args' !

    /**
     * Defines the attribute name of the 'config' object in the configuration of the ioc factory.
     */
    CONFIG : { value : 'config' , enumerable : true },

    /**
     * Defines the label of the 'configuration' top-level attribute.
     */
    CONFIGURATION : { value : 'configuration' , enumerable : true },

    /**
     * Defines the label of the 'evaluators' attribure.
     */
    EVALUATORS : { value : 'evaluators' , enumerable : true },

    /**
     * Defines the label of the 'factory' attribure.
     */
    FACTORY : { value : 'factory' , enumerable : true },

    /**
     * Defines the label of the 'identify' property of the object.
     */
    IDENTIFY : { value : 'identify' , enumerable : true },

    /**
     * Defines the label of the 'i18n' top-level attribute.
     */
    I18N : { value : 'i18n' , enumerable : true },

    /**
     * Defines the label of the 'imports' top-level attribute.
     */
    IMPORTS : { value : 'imports' , enumerable : true },

    /**
     * Defines the label of the lazyInit name property of the object.
     */
    LAZY_INIT : { value : 'lazyInit' , enumerable : true },

    /**
     * Defines the attribute name of the 'locale' object in the configuration of the ioc factory and the object definition 'arguments' and 'properties'.
     */
    LOCALE : { value : 'locale' , enumerable : true },

    /**
     * Defines the label of the 'lock' property of the object.
     */
    LOCK : { value : 'lock' , enumerable : true },

    /**
     * Defines the label of the name in a property object.
     */
    NAME : { value : 'name' , enumerable : true },

    /**
     * The name of the 'dependsOn' object definition attribute.
     */
    OBJECT_DEPENDS_ON : { value : 'dependsOn' , enumerable : true },

    /**
     * The name of the external object property to register the destroy method name.
     */
    OBJECT_DESTROY_METHOD_NAME : { value : 'destroy' , enumerable : true },

    /**
     * The name of the 'factoryLogic' object definition attribute.
     */
    OBJECT_FACTORY_LOGIC : { value : 'factoryLogic' , enumerable : true },

    /**
     * The name of the 'factoryMethod' object definition attribute.
     */
    OBJECT_FACTORY_METHOD : { value : 'factoryMethod' , enumerable : true },

    /**
     * The name of the 'factoryProperty' object definition attribute.
     */
    OBJECT_FACTORY_PROPERTY : { value : 'factoryProperty' , enumerable : true },

    /**
     * The name of the 'factoryReference' object definition attribute.
     */
    OBJECT_FACTORY_REFERENCE : { value : 'factoryReference' , enumerable : true },

    /**
     * The name of the 'factoryValue' object definition attribute.
     */
    OBJECT_FACTORY_VALUE : { value : 'factoryValue' , enumerable : true },

    /**
     * The name of the 'generates' object definition attribute.
     */
    OBJECT_GENERATES : { value : 'generates' , enumerable : true },

    /**
     * The name of the external object property to define the identifier of the object.
     */
    OBJECT_ID : { value : 'id' , enumerable : true },

    /**
     * The name of the external object property to register the init method name.
     */
    OBJECT_INIT_METHOD_NAME : { value : 'init' , enumerable : true },

    /**
     * Defines the label of the 'listeners' name property of the object.
     */
    OBJECT_LISTENERS : { value : 'listeners' , enumerable : true },

    /**
     * The name of the external object property to register the properties.
     */
    OBJECT_PROPERTIES : { value : 'properties' , enumerable : true },

    /**
     * Defines the label of the 'receivers' name property of the object.
     */
    OBJECT_RECEIVERS : { value : 'receivers' , enumerable : true },

    /**
     * The name of the external object property to define the scope flag of the object.
     */
    OBJECT_SCOPE : { value : 'scope' , enumerable : true },

    /**
     * The name of the external object property to define the singleton flag of the object.
     */
    OBJECT_SINGLETON : { value : 'singleton' , enumerable : true },

    /**
     * The name of the external object property to define the static factory flag of the object.
     */
    OBJECT_STATIC_FACTORY_METHOD : { value : 'staticFactoryMethod' , enumerable : true },

    /**
     * The name of the external object property to define the static property flag of the object.
     */
    OBJECT_STATIC_FACTORY_PROPERTY : { value : 'staticFactoryProperty' , enumerable : true },

    /**
     * Defines the label of the 'objects' top-level attribute.
     */
    OBJECTS : { value : 'objects' , enumerable : true },

    /**
     * Defines the label of the 'resource' attribute in the imports objects.
     */
    RESOURCE : { value : 'resource' , enumerable : true },

    /**
     * Defines the label of the type of the object.
     */
    TYPE : { value : 'type' , enumerable : true },

    /**
     * Defines the attribute name of the alias expression in a typeAlias object in the configuration of the ioc factory.
     */
    TYPE_ALIAS : { value : 'alias' , enumerable : true },

    /**
     * Defines the attribute name of the 'typeAliases' Array in the configuration of the ioc factory.
     */
    TYPE_ALIASES : { value : 'typeAliases' , enumerable : true },

    /**
     * Defines the attribute name of the 'typeExpression' Array in the configuration of the ioc factory.
     */
    TYPE_EXPRESSION : { value : 'typeExpression' , enumerable : true },

    /**
     * Defines the label of the reference in a property object.
     */
    REFERENCE : { value : 'ref' , enumerable : true },

    /**
     * Defines the label of the value in a property object.
     */
    VALUE : { value : 'value' , enumerable : true }
});