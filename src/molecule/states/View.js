"use strict" ;

import { Action } from './system/process/Action.js' ;
import { ValueObject } from './system/data/ValueObject.js' ;

/**
 * A View value object.
 * @summary Defines a basic state object.
 * @name View
 * @class
 * @memberof molecule.states
 * @implements system.data.ValueObject
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function View( init = null )
{
    Object.defineProperties( this ,
    {
        _closeAfter  : { writable : true , value : null } ,
        _closeBefore : { writable : true , value : null } ,
        _openAfter   : { writable : true , value : null } ,
        _openBefore  : { writable : true , value : null }
    });
    ValueObject.call( this , init ) ;
}

View.prototype = Object.create( ValueObject.prototype ,
{
    /**
     * The reference to the constructor function that created the instance's prototype.
     */
    constructor : { value : View , writable : true } ,

    /**
     * Invoked when the state is closed (after the close).
     * @name closeAfter
     * @memberof molecule.states.view
     * @instance
     */
    closeAfter :
    {
        get : function() { return this._closeAfter ; },
        set : function( action ) { this._closeAfter = action instanceof Action ? action : null ; }
    },

    /**
     * Invoked when the state is closed (before the close).
     * @name closeBefore
     * @memberof molecule.states.view
     * @instance
     */
    closeBefore :
    {
        get : function() { return this._closeBefore ; },
        set : function( action ) { this._closeBefore = action instanceof Action ? action : null ; }
    },

    /**
     * Invoked when the state is opened (after the open).
     * @name openAfter
     * @memberof molecule.states.view
     * @instance
     */
    openAfter :
    {
        get : function() { return this._openAfter ; },
        set : function( action ) { this._openAfter = (action instanceof Action) ? action : null ; }
    },

    /**
     * Invoked when the state is opened (before the open).
     * @name openBefore
     * @memberof molecule.states.view
     * @instance
     */
    openBefore :
    {
        get : function() { return this._openBefore ; },
        set : function( action ) { this._openBefore = action instanceof Action ? action : null ; }
    },

    /**
     * Attach the View.
     * @name attach
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    attach : { writable : true , value : function ()
    {
        // overrides
    }},

    /**
     * Close the View.
     * @name close
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    close : { writable : true , value : function ()
    {
        // overrides
    }},

    /**
     * Detach the View and remove the set of matched elements from the DOM or dislay list.
     * @name detach
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    detach : { writable : true , value : function ()
    {
        // overrides
    }},

    /**
     * Dispose the View to clean all elements.
     * @name dispose
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    dispose : { writable : true , value : function ()
    {
        // overrides
    }},

    /**
     * Initialize the View.
     * @name initialize
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    initialize : { writable : true , value :function ()
    {
        // overrides
    }},

    /**
     * Open the View.
     * @name open
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    open : { writable : true , value : function ()
    {
        // overrides
    }},

    /**
     * Update the View.
     * @name update
     * @memberof molecule.states.view
     * @instance
     * @function
     */
    update : { writable : true , value :function ()
    {
        // overrides
    }}
}) ;

