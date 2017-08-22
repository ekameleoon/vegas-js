/*jshint unused: false*/
"use strict" ;

import { isString } from '../core/isString.js' ;
import { Signal }   from '../system/signals/Signal.js' ;

/**
 * The Style interface defines a setting object in all component elements.
 * @name Style
 * @memberof molecule
 * @class
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Style( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit a message when the style in changed.
         * @name changed
         * @memberof molecule.Style
         * @instance
         */
        changed : { value : new Signal() }
    }) ;
    this.initialize() ;
    this.map( init ) ;
}

Style.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Style , writable : true } ,

    /**
     * Invoked in the constructor of the  instance.
     * @name initialize
     * @memberof molecule.Style
     * @instance
     * @function
     */
    initialize : { writable : true , value : function()
    {
        // override
    }},

    /**
     * Copy all properties in the specified passed-in object in the {molecule.Style} reference.
     * @name map
     * @memberof molecule.Style
     * @instance
     * @function
     * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
     */
    map : { value : function( init )
    {
        if( init )
        {
            for( var member in init )
            {
                if( member in this )
                {
                    this[member] = init[member] ;
                }
            }
            if( this.changed.connected() )
            {
                this.changed.emit( this ) ;
            }
        }
    }},

    /**
     * This method is invoked to populate and change the style attributes with a generic object or a key(String)/value pair of arguments.
     * @name set
     * @memberof molecule.Style
     * @instance
     * @function
     */
    set : { value : function( ...args )
    {
        if ( args.length === 0 )
        {
            return ;
        }
        if ( args.length === 2 && isString(args[0]) )
        {
            if ( args[0] in this )
            {
                this[ args[0] ] = args[1] ;
                if( this.changed.connected())
                {
                    this.changed.emit( this ) ;
                }
            }
        }
        else
        {
            this.map( args[0] ) ;
        }
    }}
});