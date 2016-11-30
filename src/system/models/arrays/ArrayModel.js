"use strict" ;

import { ChangeModel } from "../ChangeModel.js" ;
import { Signal }      from "../../signals/Signal.js" ;

/**
 * This model use an internal <code>Array</code> to register objects.
 * @name ArrayModel
 * @extends system.models.ChangeModel
 * @implements system.data.Iterator
 * @memberof system.models.arrays
 * @class
 * @example
 * var o1 = { id : "key1" } ;
 * var o2 = { id : "key2" } ;
 * var o3 = { id : "key3" } ;
 * var o4 = { id : "key4" } ;
 * var o5 = { id : "key5" } ;
 * var o6 = { id : "key6" } ;
 *
 * var model = new ArrayModel();
 *
 * var added = function( index , value , model )
 * {
 *     trace( model + " added(" + index + ") value:" + dump(value) ) ;
 * }
 *
 * var beforeChanged = function( value , model )
 * {
 *     trace( "[-] before:" + value + " current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "[+] change:" + value + " current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + dump(model.current) + " size:" + model.length ) ;
 * }
 *
 * var removed = function( index , old , model )
 * {
 *     trace( model + " removed(" + index + ") old:" + dump(old) ) ;
 * }
 *
 * var updated = function( index , old , model )
 * {
 *     trace( model + " updated(" + index + ") old:" + dump(old) ) ;
 * }
 *
 * model.added.connect( added ) ;
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 * model.removed.connect( removed ) ;
 * model.updated.connect( updated ) ;
 *
 * model.add( o1 ) ;
 * model.add( o2 ) ;
 * model.add( o3 ) ;
 * model.add( o4 ) ;
 * model.add( o5 ) ;
 * model.add( o6 ) ;
 *
 * trace( "model length:" + model.length ) ;
 *
 * trace( "model.get(0) == o1 : " + dump( model.get(0)) ) ;
 * trace( "model.get(1) == o4 : " + dump( model.get(1)) ) ;
 *
 * model.updateAt( 0 , o4 ) ;
 * trace( "model.get(0) == o1 : " + dump( model.get(0)) ) ;
 *
 * model.current = o1 ;
 * model.current = o2 ;
 *
 * model.removeAt( 0 ) ;
 * model.removeAt( 0 , 2 ) ;
 * model.remove( o6 ) ;
 *
 * trace( "model length:" + model.length ) ;
 *
 * model.clear() ;
 */
export function ArrayModel( factory = null )
{
    ChangeModel.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Emits a message when an entry is added in the model.
         * @name added
         * @memberof system.models.arrays.ArrayModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        added : { value : new Signal() } ,

        /**
         * Emits a message when an entry is removed in the model.
         * @name removed
         * @memberof system.models.arrays.ArrayModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        removed : { value : new Signal() } ,

        /**
         * Emits a message when an entry is updated in the model.
         * @name updated
         * @memberof system.models.arrays.ArrayModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        updated : { value : new Signal() } ,

        /**
         * @private
         */
        _array : { writable : true , value : (factory instanceof Array) ? factory : [] }
    });
}

ArrayModel.prototype = Object.create( ChangeModel.prototype ,
{
    constructor : { writable : true , value : ArrayModel } ,

    /**
     * Indicates the number of elements register in the model.
     * @name length
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @type number
     * @readonly
     */
    length : { get : function() { return this._array.length ; } },

    /**
     * Inserts an entry in the model.
     * @param {*} entry - The object to register in the model.
     * @throws ReferenceError if the entry in argument is 'null' or 'undefined'.
     * @name add
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    add : { value : function ( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " add method failed, the passed-in argument not must be 'null'.") ;
        }
        this.validate( entry ) ;
        this._array.push( entry ) ;
        this.notifyAdd( this._array.length - 1 , entry ) ;
    }},

    /**
     * Inserts an entry in the model at a specific position index.
     * @throws ReferenceError if the entry in argument is 'null' or 'undefined'.
     * @name addAt
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     * @param {number} index - The index position to register the object.
     * @param {*} entry - The object to register in the model.
     */
    addAt : { value : function( index , entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " add method failed, the passed-in argument not must be 'null'.") ;
        }
        this.validate( entry ) ;
        this._array.splice( index , 0 , entry ) ;
        this.notifyAdd( index , entry ) ;
    }},

    /**
     * Removes all entries register in the model.
     * @name clear
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    clear : { value : function()
    {
        this._array.length = 0 ;
        ChangeModel.prototype.clear.call(this) ;
    }},

    /**
     * Returns the element from this model at the passed index.
     * @param {number} index - The index of the element to return.
     * @return The element from this model at the passed index.
     * @name clear
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    get : { value : function( index )
    {
        return this._array[ index ] ;
    }},

    /**
     * Returns <code>true</code> if the model contains the specified entry.
     * @param {*} entry - The entry reference to check.
     * @return <code>true</code> if the model contains the specified entry.
     * @name has
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    has : { value : function( entry )
    {
        return this._array.indexOf( entry ) > -1 ;
    }},

    /**
     * Returns <code>true</code> if this model is empty.
     * @return <code>true</code> if this model is empty.
     * @name isEmpty
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    isEmpty : { value : function()
    {
        return this._arrays.length === 0 ;
    }},

    /**
     * Notify a signal when a new entry is inserted in the model.
     * @name notifyAdd
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    notifyAdd : { value : function( index, entry )
    {
        if ( !this.isLocked() )
        {
            this.added.emit( index, entry , this ) ;
        }
    }},

    /**
     * Notify a signal when a new entry is removed in the model.
     * @name notifyRemove
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    notifyRemove : { value : function( index, entry )
    {
        if ( !this.isLocked() )
        {
            this.removed.emit( index, entry , this ) ;
        }
    }},

    /**
     * Notify a signal when a new entry is updated in the model.
     * @name notifyUpdate
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    notifyUpdate : { value : function( index, entry )
    {
        if ( !this.isLocked() )
        {
            this.updated.emit( index, entry , this ) ;
        }
    }},

    /**
     * Removes an entry in the model.
     * @name remove
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     * @param {*} entry - The object to unregister in the model.
     */
    remove : { value : function( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " remove method failed, the entry passed in argument not must be null.") ;
        }
        var index = this._array.indexOf( entry );
        if ( index > -1 )
        {
            this.removeAt( index ) ;
        }
        else
        {
            throw new ReferenceError( this + " remove method failed, the entry is not register in the model.") ;
        }
    }},

    /**
     * Removes from this model all the elements that are contained between the specific <code>id</code> position and the end of this list (optional operation).
     * @param {number} id - The index of the element or the first element to remove.
     * @param {number} [count=1] The number of elements to remove (default 1).
     * @return The Array representation of all elements removed in the original list.
     * @name removeAt
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    removeAt : { value : function( index, count = 1 )
    {
        count = count > 1 ? count : 1 ;
        var old = this._array.splice( index , count );
        if( old )
        {
            this.notifyRemove( index, old ) ;
        }
    }},

    /**
     * Removes from this model all of the elements whose index is between <code>fromIndex</code>, inclusive and <code>toIndex</code>, exclusive.
     * <p>Shifts any succeeding elements to the left (reduces their index).</p>
     * <p>This call shortens the model by (toIndex - fromIndex) elements. (If toIndex==fromIndex, this operation has no effect.)</p>
     * @param {number} fromIndex - The from index (inclusive) to remove elements in the list.
     * @param {number} toIndex - The to index (exclusive) to remove elements in the list.
     * @name removeRange
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    removeRange : { value : function( fromIndex , toIndex )
    {
        if ( fromIndex === toIndex )
        {
            return null ;
        }
        return this.removeAt( fromIndex , toIndex - fromIndex ) ;
    }},

    /**
     * Enforce to set the internal array of this model (default use a new Array instance). This method change the model without notification.
     * @name setArray
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     * @param {array} ar - The Array reference to fill the model.
     */
    setArray : { value : function( ar )
    {
        this._array = (ar instanceof Array) ? ar : [] ;
    }},

    /**
     * Update an entry in the model with the specified index.
     * @param {number} index - The index to update an entry.
     * @param {*} entry - the new value to insert in the model at the specified index.
     * @name updateAt
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    updateAt : { value : function( index , entry )
    {
        this.validate( entry ) ;
        var old = this._array[ index ] ;
        if( old )
        {
            this._array[ index ] = entry ;
            this.notifyUpdate( index , old ) ;
        }
    }},

    /**
     * Returns the internal array representation of this model.
     * @return The array representation of this model.
     * @name toArray
     * @memberof system.models.arrays.ArrayModel
     * @instance
     * @function
     */
    toArray : { value : function()
    {
        return this._array ;
    }}
}) ;