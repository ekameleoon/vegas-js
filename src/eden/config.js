"use strict" ;

/**
 * Configures the eden library.
 * @name Config
 * @class
 * @memberof eden
 * @private
 */
export function Config( init )
{
    Object.defineProperties( this ,
    {
        /**
         * Allows to use aliases in the eden parser.
         * @memberof eden.Config
         * @instance
         */
        allowAliases : { writable : true , value : false } ,

        /**
         * Allows to execute function call. if set to false it blocks any function call and return undefined.
         * @memberof eden.Config
         * @instance
         * @example
         * "titi = \"hello world\"; toto = titi.toUpperCase();"
         *
         * // allowFunctionCall = true
         * toto = "HELLO WORLD"
         *
         * // allowFunctionCall = false
         * toto = undefined
         */
        allowFunctionCall : { writable : true , value : true } ,

        /**
         * When set to <code>false</code> array index are evaluated without bracket eval( test.0 ) (ActionScript)
         * and set to <code>true</code> array index are evaluated with bracket eval( test[0] ) for JavaScript, JScript, JSDB etc.
         * @memberof eden.Config
         * @instance
         */
        arrayIndexAsBracket : { writable : true , value : false } ,

        /**
         * The list of authorized keywords, objects path and constructors that the parser is allowed to interpret.
         * <p>Note: you can add full path</p>
         * <p><b>ex:</b> "blah.foobar"</p>
         * <p>and/or starting path</p>
         * <p><b>ex:</b> "toto.titi.*"</p>
         * <p>The difference is with a full path you can only <b>create/use/define/assign</b> value to this exact path and
         * with a starting path you can create/use/define/assign value to this path and its child paths.</p>
         * <p><b>Attention:</b> special values as NaN, true, false, null, undefined are always authorized.</p>
         * @memberof eden.Config
         * @instance
         */
        authorized : { writable : true , value : null } ,

        /**
         * Parameter to remove (true) or add (false) all unecessary spaces, tabs, carriages returns, lines feeds etc.
         * to optimize (more or less) packets of datas when they are transfered.
         * <p><b>Note 1 :</b> use "compress = false" when you want to have a better view or debug packets of datas.</p>
         * <p><b>Note 2 :</b> this property is in sync with eden.prettyPrint</p>
         * @memberof eden.Config
         * @instance
         */
        compress : { writable : true , value : false } ,

        /**
         * Parameter allowing to copy objects by value if true or by reference if false.
         * @example <caption> In this case with <code>copyObjectByValue=false</code> :
         * <code>bar</code> will be a reference to the <code>foo</code> object but if <code>copyObjectByValue=true</code>
         * <code>bar</code> will be an exact copy of <code>foo</code> object</caption>
         * foo = {a:1, b:2, c:3};
         * bar = foo;
         * @memberof eden.Config
         * @instance
         */
        copyObjectByValue : { writable : true , value : true } ,

        /**
         * Allows to throw errors from the eden parser.
         * @memberof eden.Config
         * @instance
         */
        enableErrorChecking : { writable : true , value : false },

        /**
         * The list of reserved keywords.
         * Reserved words may not be used for variables, functions, methods, or object identifiers.
         * The following are existing reserved keywords defined by the ECMAScript specification.
         * @memberof eden.Config
         * @instance
         */
        reserved : { writable : true , value : null },

        /**
         * The list of future reserved keywords.
         * The following are existing future reserved keywords defined by the ECMAScript specification.
         * @memberof eden.Config
         * @instance
         */
        reservedFuture : { writable : true , value : null },

        /**
         * Parameter setting on (true) or off (false) the security.
         * If true, all object path, function or constructor will be scanned at interpretation time against the authorized list.
         * @memberof eden.Config
         * @instance
         */
        security : { writable : true , value : false },

        /**
         * Allows to define the case-sensitivy of the parsers.
         * If true, variable names that differ only in case are considered different.
         * @memberof eden.Config
         * @instance
         */
        strictMode : { writable : true , value : true },

        /**
         * Value assigned to a variable    when this one is not found or not authorized.
         * Depending on your environment you can override it with a more suitable one for exemple on C# you could set it to null.
         * @memberof eden.Config
         * @instance
         */
        undefineable : { writable : true , value : undefined },

        /**
         * This parameter allowing to trace messages in the console if the environment permit it.
         * @memberof eden.Config
         * @instance
         */
        verbose : { writable : true , value : false },
    }) ;

    if( init )
    {
        this.load( init ) ;
    }
}

Config.prototype = Object.create( Object.prototype ,
{
    load :
    {
        value : function( config ) 
        {
            for( var member in config )
            {
                if( config.hasOwnProperty(member) && (member in this) )
                {
                    this[member] = config[member] ;
                }
            }
        }
    }
}) ;

/**
 * The default eden library config.
 * @memberof eden
 * @instance
 */
export var config = new Config
({
    compress : true,
    copyObjectByValue : false,
    strictMode : true,
    undefineable : undefined,
    verbose : false,
    security : false,
    allowAliases : true,
    allowFunctionCall : true,
    arrayIndexAsBracket : false,
    authorized :
    [
        "Array.*",
        "Boolean.*",
        "Date.*",
        "Error.*",
        "Math.*",
        "Number.*",
        "Object.*",
        "String.*",
        "Infinity"
    ],
    reserved :
    [
        "break",
        "case", "catch", "continue",
        "default", "delete", "do",
        "else",
        "finally", "for", "function",
        "if", "in", "instanceof", "is",
        "new",
        "return",
        "switch",
        "this", "throw", "try", "typeof",
        "var", "void",
        "while", "with"
    ],
    reservedFuture :
    [
        "abstract" ,
        "boolean",  "byte",
        "char",  "class",  "const",
        "debugger", "double",
        "enum", "export", "extends",
        "final", "float",
        "goto",
        "implements", "import", "int", "interface",
        "long",
        "native",
        "package", "private", "protected", "public",
        "short", "static", "super", "synchronized",
        "throws", "transient",
        "volatile"
    ]
}) ;
