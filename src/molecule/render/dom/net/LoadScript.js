"use strict" ;

import { fastformat } from './core/strings/fastformat.js' ;

import { Task } from './system/process/Task.js' ;

import { logger } from '../../../logging/logger.js' ;
import { Node } from '../display/Node.js' ;
import { Script } from '../display/Script.js' ;

/**
 * Register a specific script element to be loaded in a specific location.
 * @name LoadScript
 * @memberof molecule.render.dom.net
 * @class
 * @constructor
 * @example
 * var body = new Body() ;
 * var script = new Script
 * ({
 *     async    : true ,
 *     defer    : true ,
 *     chartset : 'UTF-8' ,
 *     src      : 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
 * }) ;
 *
 * var loader = new LoadScript( script , body ) ;
 *
 * loader.errorIt.connect( function()
 * {
 *     console.log( 'error, failed to load ' + script.src ) ;
 * }) ;
 *
 * loader.finishIt.connect( function()
 * {
 *     console.log( 'finish done:' + loader.done ) ;
 *     console.log( WebFont ) ;
 * }) ;
 *
 * loader.startIt.connect( function()
 * {
 *     console.log( 'start' ) ;
 * }) ;
 *
 * loader.run() ;
 */
export function LoadScript( script = null , location = null , verbose = false )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The verbose mode.
         * @name verbose
         * @memberof molecule.render.aframe.net.LoadScript
         * @instance
         * @type boolean
         */
        verbose : { writable : true , value : verbose === true } ,

        /**
         * @private
         */
        _done     : { writable : true , value : false } ,
        _error    : { writable : true , value : this.____error.bind(this) } ,
        _load     : { writable : true , value : this.____load.bind(this) } ,
        _location : { writable : true , value : null } ,
        _script   : { writable : true , value : null } ,
    });

    this.location = location ;
    this.script = script ;
}

LoadScript.prototype = Object.create( Task.prototype ,
{
    constructor : { value : LoadScript } ,

    /**
     * Indicates if the loading is done.
     * @name done
     * @memberof molecule.render.aframe.net.LoadScript
     * @instance
     * @type boolean
     */
    done :
    {
        get : function() { return this._done ; }
    },

    /**
     * The location target to register the script node.
     * @name location
     * @memberof molecule.render.aframe.net.LoadScript
     * @instance
     * @type molecule.render.dom.display.Node
     */
    location :
    {
        get : function() { return this._location ; },
        set : function( value )
        {
            this._location = value instanceof Node ? value : null ;
        }
    },

    /**
     * The script reference to load.
     * @name script
     * @memberof molecule.render.aframe.net.LoadScript
     * @instance
     * @type molecule.render.dom.display.Node
     */
    script :
    {
        get : function() { return this._script ; },
        set : function( value )
        {
            this._script = value instanceof Script ? value : null ;
        }
    },

    /**
     * Run the process.
     * @name run
     * @memberof mq.process.net.Preload
     * @instance
     * @function
     */
    run : { value : function ()
    {
        ///////////

        this._done = false ;

        this.notifyStarted();

        ///////////

        try
        {
            /* jshint -W116*/
            if( !this._location ) throw new Error( 'location' ) ;
            if( !this._script )   throw new Error( 'script' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            if( this.verbose === true )
            {
                logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
            }
            this.notifyFinished() ;
            return ;
        }

        ///////////

        if( this.verbose === true )
        {
            logger.debug( this + " run " + this._script.src ) ;
        }

        ///////////

        this._registerScript() ;

        this._location.addChild( this._script ) ;

        ///////////
    }},

    /**
     * @private
     */
    _registerScript : { value : function()
    {
        if( this._script )
        {
            this._script.element.onerror = this._error ;
            this._script.element.onload  = this._load ;
        }
    }},

    /**
     * @private
     */
    _unregisterScript : { value : function()
    {
        if( this._script )
        {
            this._script.element.onerror = null ;
            this._script.element.onload  = null ;
            if( this._script.parent )
            {
                this._script.parent.removeChild( this._script ) ;
            }
        }
    }},

    /**
     * @private
     */
    ____error : { value : function()
    {
        this._done = false ;
        this._unregisterScript() ;
        this.notifyError( this + " loading failed with the script: " + this._script.src ) ;
        this.notifyFinished() ;
    }},

    /**
     * @private
     */
    ____load : { value : function()
    {
        this._unregisterScript() ;
        this._done = true ;
        this.notifyFinished() ;
    }}
});