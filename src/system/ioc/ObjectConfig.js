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
 * This object contains the configuration of the IoC object factory.
 */
export function ObjectConfig( init )
{
    Object.defineProperties( this ,
    {
        /**
         * The config object reference used in the factory to register values and expressions.
         */
        config :
        {
            get : function() { return this._config ; } ,
            set : function( init )
            {
                for( var prop in init )
                {
                    if( init.hasOwnProperty(prop ))
                    {
                        this._config[prop] = init[prop] ;
                    }
                }
            }
        },

        /**
         * Returns the config evaluator reference.
         */
        configEvaluator :
        {
            get : function() { return this._configEvaluator ; }
        },

        /**
         * The default name of destroy callback method to invoke with object definition in the ObjectFactory.
         */
        defaultDestroyMethod : { value : null , writable : true , enumerable : true } ,

        /**
         * The default name of init callback method to invoke with object definition in the ObjectFactory.
         */
        defaultInitMethod : { value : null , writable : true , enumerable : true } ,

        /**
         * Indicates if the singleton objects in the ObjectFactory are identifiy if the type of the object implements the Identifiable interface.
         */
        identify : { value : false , writable : true , enumerable : true } ,

        /**
         * Indicates if the factory lock this "run" method and allow the flush of the singletons buffer who must be initialized when the process is finished.
         */
        lazyInit : { value : false , writable : true , enumerable : true } ,

        /**
         * The locale object of the factory. To evaluate locale expression in the object definitions.
         */
        locale :
        {
            get : function() { return this._locale ; } ,
            set : function( init )
            {
                for( var prop in init )
                {
                    if( init.hasOwnProperty(prop ))
                    {
                        this._locale[prop] = init[prop] ;
                    }
                }
            }
        },

        /**
         * Returns the local evaluator reference.
         */
        localeEvaluator :
        {
            get : function() { return this._localeEvaluator ; }
        },

        /**
         * Indicates if all the Lockable objects initialized in the object definitions in the factory must be locked during the invokation of this methods and the initialization of this properties.
         */
        lock : { value : false , writable : true , enumerable : true } ,

        /**
         * The optional parameters object reference.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#params".
         */
        parameters : { value : null , writable : true , enumerable : true } ,

        /**
         * Indicates the reference evaluator object.
         */
        referenceEvaluator :
        {
            get : function() { return this._referenceEvaluator ; }
        },

        /**
         * The root reference of the application.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#root".
         */
        root : { value : null , writable : true , enumerable : true } ,

        /**
         * The stage reference of the application.
         * This property is optional and can be target in the IoC factory with the "ref" attribute with the value "#stage".
         */
        stage : { value : null , writable : true , enumerable : true } ,

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        throwError :
        {
            get : function() { return this._configEvaluator.throwError && this._localeEvaluator.throwError && this._typeEvaluator.throwError && this._referenceEvaluator.throwError ; } ,
            set : function( flag /*Boolean*/ )
            {
                this._configEvaluator.throwError    = flag ;
                this._localeEvaluator.throwError    = flag ;
                this._referenceEvaluator.throwError = flag ;
                this._typeEvaluator.throwError      = flag ;
            }
        },

        /**
         * Determinates the typeAliases reference of this config object.
         * <p>The setter of this virtual property can be populated with a TypeAliases instance or an Array of typeAliases items.</p>
         * <p>This setter attribute don't remove the old TypeAliases instance but fill it with new aliases.
         * If you want cleanup the aliases of this configuration object you must use the <code class="prettyprint">typeAliases.clear()</code> method.</p>
         * <p>The typeAliases items are generic objects with 2 attributes <b>alias</b> (the alias String expression) and <b>type</b> (the type String expression).</p>
         * @example
         * <pre>
         * var ObjectConfig = system.ioc.ObjectConfig ;
         *
         * var config  = new ObjectConfig() ;
         *
         * config.typeAliases =
         * [
         *     { alias : "Sprite" , type : "flash.display.Sprite" }
         * ] ;
         * </pre>
         */
        typeAliases :
        {
            get : function() { return this._typeAliases ; } ,
            set : function( aliases )
            {
                if ( aliases instanceof ArrayMap )
                {
                    var next ;
                    var key ;
                    var it = aliases.iterator() ;
                    while( it.hasNext() )
                    {
                        next = it.next() ;
                        key  = it.key() ;
                        this._typeAliases.set(key, next) ;
                    }
                }
                else if ( aliases instanceof Array )
                {
                	var item ;
                    var len = aliases.length ;
                    if ( len > 0 )
                    {
                       while ( --len > -1 )
                       {
                            item = aliases[len] ;
                            if ( item !== null && ( ObjectAttribute.TYPE_ALIAS in item ) && ( ObjectAttribute.TYPE in item ) )
                            {
                                this._typeAliases.set( String(item[ObjectAttribute.TYPE_ALIAS]) , String(item[ObjectAttribute.TYPE]) ) ;
                            }
                       }
                    }
                }
            }
        },

        /**
         * Indicates the type evaluator reference.
         */
        typeEvaluator :
        {
            get : function() { return this._typeEvaluator ; }
        },

        /**
         * Determinates the content of the typeExpression reference in this config object.
         * @example Example 1 : basic usage
         * <pre>
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
         * </pre>
         * @example Example 2 : Use an Array of entries with the name/value members
         * <pre>
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
         * </pre>
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
                    var item ;
                    var len  = expressions.length ;
                    if ( len > 0 )
                    {
                       while ( --len > -1 )
                       {
                            item = expressions[len] ;
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
         * <p>You can use the TypePolicy.NONE, TypePolicy.ALL, TypePolicy.ALIAS, TypePolicy.EXPRESSION values.</p>
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
         * Indicates if the logger model is used in the IoC factory to log the warning and errors.
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
    this.initialize( init ) ;
}

/**
 * @extends Object
 */
ObjectConfig.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectConfig } ,

    /**
     * Initialize the config object.
     * @param init A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
     */
    initialize : { value : function( init )
    {
        if ( init === null )
        {
            return ;
        }
        for (var prop in init)
        {
            if ( this.hasOwnProperty(prop) )
            {
                this[prop] = init[prop] ;
            }
        }
    }},

    /**
     * This method is used to change the target of the internal config dynamic object.
     */
    setConfigTarget : { value : function( o = null )
    {
        this._config = o || {} ;
    }},

    /**
     * This method is used to change the target of the internal local dynamic object.
     */
    setLocaleTarget : { value : function( o = null )
    {
        this._locale = o || {} ;
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ObjectConfig]' ; } }
});