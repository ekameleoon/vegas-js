/*jshint -W089 */
"use strict" ;

import { ArrayMap }            from '../data/maps/ArrayMap.js' ;
import { ExpressionFormatter } from '../formatters/ExpressionFormatter.js' ;

import { ConfigEvaluator }    from './evaluators/ConfigEvaluator.js' ;
import { LocaleEvaluator }    from './evaluators/LocaleEvaluator.js' ;
import { ReferenceEvaluator } from './evaluators/ReferenceEvaluator.js' ;
import { TypeEvaluator }      from './evaluators/TypeEvaluator.js' ;
import { ObjectAttribute }    from './ObjectAttribute.js' ;
import { TypePolicy }         from './TypePolicy.js' ;

/**
 * This object contains the configuration of the <b>IoC</b> factory.
 * @name ObjectConfig
 * @class
 * @memberof system.ioc
 * @param {Object} init - A generic object containing properties with which to populate the newly instance. If this argument is <code>null</code>, it is ignored.
 */
export function ObjectConfig( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The default name of destroy callback method to invoke with object definition in the ObjectFactory.
         * @name defaultDestroyMethod
         * @memberof system.ioc.ObjectConfig
         * @type string
         */
        defaultDestroyMethod : { value : null , writable : true , enumerable : true } ,

        /**
         * The default name of init callback method to invoke with object definition in the ObjectFactory.
         * @name defaultInitMethod
         * @memberof system.ioc.ObjectConfig
         * @type string
         */
        defaultInitMethod : { value : null , writable : true , enumerable : true } ,

        /**
         * The optional domain used in the factory to creates the objects (by default use core.global if this property is not defined).
         * @name domain
         * @memberof system.ioc.ObjectConfig
         * @type Object
         */
        domain : { value : null , writable : true , enumerable : true } ,

        /**
         * Indicates if the singleton objects in the <code>ObjectFactory</code> are identifiy if the type of the object implements the {@link system.data.Identifiable} interface.
         * @name identifiy
         * @memberof system.ioc.ObjectConfig
         * @type boolean
         * @default false
         */
        identify : { value : false , writable : true , enumerable : true } ,

        /**
         * Indicates if the factory lock this <code>run</code> method and allow the flush of the singletons buffer who must be initialized when the process is finished.
         * @name lazyInit
         * @memberof system.ioc.ObjectConfig
         * @type boolean
         * @default false
         */
        lazyInit : { value : false , writable : true , enumerable : true } ,

        /**
         * Indicates if all the {@link system.process.Lockable} objects initialized in the <b>object definitions</b> in the <b>factory</b> must be locked during the invokation of this methods and the initialization of this properties.
         * @name lock
         * @memberof system.ioc.ObjectConfig
         * @type boolean
         * @default false
         */
        lock : { value : false , writable : true , enumerable : true } ,

        /**
         * The optional parameters object reference.
         * <p>This property is optional and can be target in the <b>IoC factory</b> with the <code>"ref"</code> attribute with the value <code>"#params"</code>.</p>
         * @name parameters
         * @memberof system.ioc.ObjectConfig
         */
        parameters : { value : null , writable : true , enumerable : true } ,

        /**
         * The <code>root</code> reference of the application.
         * <p>This property is optional and can be target in the <b>IoC factory</b> with the <code>"ref"</code> attribute with the value <code>"#root"</code>.</p>
         * @name root
         * @memberof system.ioc.ObjectConfig
         */
        root : { value : null , writable : true , enumerable : true } ,

        /**
         * The stage reference of the application.
         * <p>This property is optional and can be target in the <b>IoC factory</b> with the <code>"ref"</code> attribute with the value <code>"#stage"</code>.</p>
         * @name stage
         * @memberof system.ioc.ObjectConfig
         */
        stage : { value : null , writable : true , enumerable : true } ,

        /**
         * Indicates if a {@link system.logging.Logger|Logger} is used in the <b>IoC factory</b> to log the warning and errors.
         * @name useLogger
         * @memberof system.ioc.ObjectConfig
         * @type boolean
         * @default false
         */
        useLogger : { value : false , writable : true , enumerable : true } ,

        /**
         * @private
         */
        _config             : { value : {} , writable : true } ,
        _configEvaluator    : { value : new ConfigEvaluator( this ) , writable : true } ,
        _locale             : { value : {} , writable : true } ,
        _localeEvaluator    : { value : new LocaleEvaluator( this ) , writable : true } ,
        _referenceEvaluator : { value : new ReferenceEvaluator() , writable : true } ,
        _typeAliases        : { value : new ArrayMap() , writable : true } ,
        _typeEvaluator      : { value : new TypeEvaluator( this ) , writable : true } ,
        _typeExpression     : { value : new ExpressionFormatter() , writable : true } ,
        _typePolicy         : { value : TypePolicy.NONE , writable : true }
    });

    this.throwError = false ;
    if( init )
    {
        this.initialize( init ) ;
    }
}

Object.defineProperties( ObjectConfig ,
{
    /**
     * Defines the attribute name of the alias expression in a typeAlias object in the configuration of the ioc factory.
     * @memberof system.ioc.ObjectConfig
     * @type {string}
     * @default alias
     * @const
     */
    TYPE_ALIAS : { value : 'alias' , enumerable : true }
});

ObjectConfig.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectConfig } ,

    /**
     * The config object reference used in the factory to register values and expressions.
     * @name config
     * @memberof system.ioc.ObjectConfig
     * @type Object
     */
    config :
    {
        get : function() { return this._config ; } ,
        set : function( init )
        {
            for( let prop in init )
            {
                this._config[prop] = init[prop] ;
            }
        }
    },

    /**
     * Returns the config evaluator reference.
     * @name configEvaluator
     * @memberof system.ioc.ObjectConfig
     * @type system.ioc.evaluators.ConfigEvaluator
     * @readonly
     */
    configEvaluator :
    {
        get : function() { return this._configEvaluator ; }
    },

    /**
     * The locale object of the factory. To evaluate locale expression in the object definitions.
     * @name locale
     * @memberof system.ioc.ObjectConfig
     * @type Object
     */
    locale :
    {
        get : function() { return this._locale ; } ,
        set : function( init )
        {
            for( let prop in init )
            {
                this._locale[prop] = init[prop] ;
            }
        }
    },

    /**
     * Returns the local evaluator reference.
     * @name locale
     * @memberof system.ioc.ObjectConfig
     * @type system.ioc.evaluators.LocaleEvaluator
     * @readonly
     */
    localeEvaluator :
    {
        get : function() { return this._localeEvaluator ; }
    },

    /**
     * Indicates the reference evaluator object.
     * @name referenceEvaluator
     * @memberof system.ioc.ObjectConfig
     * @type system.ioc.evaluators.ReferenceEvaluator
     * @readonly
     */
    referenceEvaluator :
    {
        get : function() { return this._referenceEvaluator ; }
    },

    /**
     * Indicates if the class throws errors or return null when an error is throwing.
     * @name throwError
     * @memberof system.ioc.ObjectConfig
     * @type boolean
     */
    throwError :
    {
        get : function() { return this._configEvaluator.throwError && this._localeEvaluator.throwError && this._typeEvaluator.throwError && this._referenceEvaluator.throwError ; } ,
        set : function( flag )
        {
            this._configEvaluator.throwError    = flag ;
            this._localeEvaluator.throwError    = flag ;
            this._referenceEvaluator.throwError = flag ;
            this._typeEvaluator.throwError      = flag ;
        }
    },

    /**
     * Determinates the <code>typeAliases</code> reference of this <b>config</b> object.
     * <p>The setter of this virtual property can be populated with a TypeAliases instance or an Array of typeAliases items.</p>
     * <p>This setter attribute don't remove the old TypeAliases instance but fill it with new aliases. If you want cleanup the aliases of this configuration object you must use the <code>typeAliases.clear()</code> method.</p>
     * <p>The <code>typeAliases</code> items are generic objects with 2 attributes <code>alias</code> (the alias String expression) and <code>type</code> (the type String expression).</p>
     * @name typeAliases
     * @memberof system.ioc.ObjectConfig
     * @example
     * var ObjectConfig = system.ioc.ObjectConfig ;
     *
     * var config  = new ObjectConfig() ;
     *
     * config.typeAliases =
     * [
     *     { alias : "Sprite" , type : "flash.display.Sprite" }
     * ] ;
     */
    typeAliases :
    {
        get : function() { return this._typeAliases ; } ,
        set : function( aliases )
        {
            if ( aliases instanceof ArrayMap )
            {
                let it = aliases.iterator() ;
                while( it.hasNext() )
                {
                    let next = it.next() ;
                    let key  = it.key() ;
                    this._typeAliases.set(key, next) ;
                }
            }
            else if ( aliases instanceof Array )
            {
                let len = aliases.length ;
                if ( len > 0 )
                {
                   while ( --len > -1 )
                   {
                        let item = aliases[len] ;
                        if ( item !== null && ( ObjectConfig.TYPE_ALIAS in item ) && ( ObjectAttribute.TYPE in item ) )
                        {
                            this._typeAliases.set( String(item[ObjectConfig.TYPE_ALIAS]) , String(item[ObjectAttribute.TYPE]) ) ;
                        }
                   }
                }
            }
        }
    },

    /**
     * Indicates the type evaluator reference.
     * @name typeEvaluator
     * @memberof system.ioc.ObjectConfig
     * @type system.ioc.evaluators.TypeEvaluator
     * @readonly
     */
    typeEvaluator :
    {
        get : function() { return this._typeEvaluator ; }
    },

    /**
     * Determinates the content of the <code>typeExpression</code> reference in this config object.
     * @name typeExpression
     * @memberof system.ioc.ObjectConfig
     * @example <caption>Example 1 : basic usage</caption>
     * var ObjectConfig = system.ioc.ObjectConfig ;
     * var ExpressionFormatter = system.formatters.ExpressionFormatter ;
     *
     * var exp = new ExpressionFormatter() ;
     *
     * exp.set( "data"    , "system.data" ) ;
     * exp.set( "maps"    , "{data}.maps" ) ;
     * exp.set( "HashMap" , "{maps}.HashMap" ) ;
     *
     * var config  = new ObjectConfig() ;
     *
     * config.typeExpression = exp ;
     * @example <caption>Example 2 : Use an Array of entries with the name/value members</caption>
     * var ObjectConfig = system.ioc.ObjectConfig ;
     *
     * var expressions =
     * [
     *     { name : "data"    , value : "system.data"    } ,
     *     { name : "maps"    , value : "{data}.maps"    } ,
     *     { name : "HashMap" , value : "{maps}.HashMap" }
     * ];
     *
     * var config = new ObjectConfig() ;
     *
     * config.typeExpression = expressions ;
     */
    typeExpression :
    {
        get : function() { return this._typeExpression ; } ,
        set : function( expressions /*ExpressionFormatter|Array*/ )
        {
            if ( expressions instanceof ExpressionFormatter )
            {
                this._typeExpression = expressions ;
            }
            else if ( expressions instanceof Array )
            {
                if ( this._typeExpression === null )
                {
                    this._typeExpression = new ExpressionFormatter() ;
                }
                let len = expressions.length ;
                if ( len > 0 )
                {
                   while ( --len > -1 )
                   {
                        let item = expressions[len] ;
                        if ( item !== null && ( ObjectAttribute.NAME in item ) && ( ObjectAttribute.VALUE in item ) )
                        {
                            this._typeExpression.set( String(item[ObjectAttribute.NAME]) , String(item[ObjectAttribute.VALUE]) ) ;
                        }
                   }
                }
            }
            else
            {
                this._typeExpression = new ExpressionFormatter() ;
            }
        }
    },

    /**
     * Indicates the type policy of the object factory who use this configuration object.
     * The default value of this attribute is <code>TypePolicy.NONE</code>.
     * <p>You can use the <code>TypePolicy.NONE</code>, <code>TypePolicy.ALL</code>, <code>TypePolicy.ALIAS</code>, <code>TypePolicy.EXPRESSION</code> values.</p>
     * @name typePolicy
     * @memberof system.ioc.ObjectConfig
     * @see system.ioc.TypePolicy
     */
    typePolicy :
    {
        get : function() { return this._typePolicy ; } ,
        set : function( policy )
        {
            switch( policy )
            {
                case TypePolicy.ALIAS      :
                case TypePolicy.EXPRESSION :
                case TypePolicy.ALL        :
                {
                    this._typePolicy = policy ;
                    break ;
                }
                default :
                {
                    this._typePolicy = TypePolicy.NONE ;
                }
            }
        }
    },

    /**
     * Initialize the config object.
     * @name initialize
     * @memberof system.ioc.ObjectConfig
     * @function
     * @instance
     * @param {Object} init - A generic object containing properties with which to populate the newly instance. If this argument is <code>null</code>, it is ignored.
     */
    initialize : { value : function( init )
    {
        if ( init === null )
        {
            return ;
        }
        for (let prop in init)
        {
            if ( prop in this )
            {
                this[prop] = init[prop] ;
            }
        }
    }},

    /**
     * This method is used to change the target of the internal config dynamic object.
     * @name setConfigTarget
     * @memberof system.ioc.ObjectConfig
     * @function
     * @instance
     * @param {object} o - The object to target the configuration object of the <b>factory</b>.
     */
    setConfigTarget : { value : function( o = null )
    {
        this._config = o || {} ;
    }},

    /**
     * This method is used to change the target of the internal local dynamic object.
     * @name setLocaleTarget
     * @memberof system.ioc.ObjectConfig
     * @function
     * @instance
     * @param {object} o - The object to target the i18n object of the <b>factory</b>.
     */
    setLocaleTarget : { value : function( o = null )
    {
        this._locale = o || {} ;
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof system.ioc.ObjectConfig
     * @function
     * @instance
     */
    toString : { value : function() { return '[ObjectConfig]' ; } }
});