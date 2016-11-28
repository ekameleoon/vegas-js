"use strict" ;

import { ArrayMap }     from "../../data/maps/ArrayMap.js" ;
import { ChangeModel }  from "../ChangeModel.js" ;
import { KeyValuePair } from "../../data/KeyValuePair.js" ;
import { Signal }       from "../../signals/Signal.js" ;

/**
 * This model use an internal {@link system.data.KeyValuePair|KeyValuePair} map to register objects.
 * @name MapModel
 * @extends system.models.ChangeModel
 * @implements system.data.Iterator
 * @memberof system.models.maps
 * @class
 * @example
 * var o1 = { id : "key1" } ;
 * var o2 = { id : "key2" } ;
 * var o3 = { id : "key3" } ;
 * var o4 = { id : "key1" } ;
 *
 * var added = function( entry , model )
 * {
 *     trace( "[+] added entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * var beforeChanged = function( entry , model )
 * {
 *     trace( "[--] before:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var changed = function( entry , model )
 * {
 *     trace( "[++] change:" + dump(entry) + " current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + model.current + " size:" + model.length ) ;
 * }
 *
 * var removed = function( entry , model )
 * {
 *     trace( "[-] removed entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * var updated = function( entry , model )
 * {
 *     trace( "[u] update entry:" + dump(entry) + " size:" + model.length ) ;
 * }
 *
 * var model = new MapModel() ;
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
 *
 * trace( "#  model.get('key1') == o1 : " + ( model.get("key1") === o1 ) ) ;
 * trace( "#  model.get('key1') == o4 : " + ( model.get("key1") === o4 ) ) ;
 *
 * model.update( o4 ) ;
 *
 * model.current = o1 ;
 * model.current = o2 ;
 */
export function MapModel( factory = null , key = "id" )
{
    ChangeModel.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Emits a message when an entry is added in the model.
         * @name added
         * @memberof system.models.maps.MapModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        added : { value : new Signal() } ,

        /**
         * Emits a message when an entry is removed in the model.
         * @name removed
         * @memberof system.models.maps.MapModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        removed : { value : new Signal() } ,

        /**
         * Emits a message when an entry is updated in the model.
         * @name updated
         * @memberof system.models.maps.MapModel
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        updated : { value : new Signal() } ,

        /**
         * @private
         */
        _map : { writable : true , value : (factory instanceof KeyValuePair) ? factory : new ArrayMap() } ,

        /**
         * @private
         */
        _primaryKey :
        {
            value    : ( !(key instanceof String || typeof(key) === 'string') || key === "" ) ? MapModel.DEFAULT_PRIMARY_KEY : key ,
            writable : true
        }
    });
}

/**
 * Indicates the default primary key value ("id").
 * @name DEFAULT_PRIMARY_KEY
 * @memberof system.models.maps.MapModel
 * @type {string}
 * @default <code>"id"</code>
 * @const
 */
Object.defineProperty( MapModel , 'DEFAULT_PRIMARY_KEY' , { value : "id" } ) ;

MapModel.prototype = Object.create( ChangeModel.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : MapModel } ,

    /**
     * Indicates the number of elements register in the model.
     * @name length
     * @memberof system.models.maps.MapModel
     * @instance
     * @type number
     * @readonly
     */
    length : { get : function() { return this._map.length ; } },

    /**
     * Indicates the name of the primary key used to map all objects in the model and identifies each record in the table.
     * By default the model use the "id" primary key in the objects.
     * <p><b>Note:</b> If you use this property and if the model contains entries, all entries will be removing.</p>
     * @see MapModel.DEFAULT_PRIMARY_KEY
     * @name primaryKey
     * @memberof system.models.maps.MapModel
     * @instance
     */
    primaryKey :
    {
        get : function()
        {
            return this._primaryKey ;
        },
        set : function( key )
        {
            if( key === this._primaryKey )
            {
                return ;
            }
            this._primaryKey = ( !(key instanceof String || typeof(key) === 'string') || key === "" ) ? MapModel.DEFAULT_PRIMARY_KEY : key ;
            if ( this._map.length > 0 )
            {
                this._map.clear() ;
            }
        }
    },

    /**
     * Inserts an entry in the model, must be identifiable and contains an id property.
     * @throws ReferenceError if the argument of this method is 'null' or 'undefined'.
     * @throws ReferenceError if the passed-in entry is already register in the model.
     * @name add
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     * @param {system.data.Identifiable} entry - The identifiable object to register in the model.
     */
    add : { value : function ( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " add method failed, the passed-in argument not must be 'null'.") ;
        }
        this.validate( entry ) ;
        if ( this._primaryKey in entry )
        {
            if ( !this._map.has( entry[ this._primaryKey ] ) )
            {
                this._map.set( entry[this._primaryKey] , entry ) ;
                this.notifyAdd( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " add method failed, the passed-in entry is already register in the model with the specified primary key, you must remove this entry before add a new entry.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " add method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},

    /**
     * Removes all entries register in the model.
     * @name clear
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    clear : { value : function()
    {
        this._map.clear() ;
        ChangeModel.prototype.clear.call(this) ;
    }},

    /**
     * Returns the entry defined by the key passed-in argument.
     * @return The entry defined by the key passed-in argument.
     * @name add
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     * @param {*} key - The key to search a specific entry in the model.
     */
    get : { value : function( key )
    {
        return this._map.get( key );
    }},

    /**
     * Returns an entry defines in the model with the specified member.
     * @return an entry defines in the model with the specified member.
     * @name getByProperty
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    getByProperty : { value : function( propName , value )
    {
        if ( propName === null || !(propName instanceof String || typeof(propName) === 'string') )
        {
            return null ;
        }
        var datas = this._map.values() ;
        var size  = datas.length ;
        try
        {
            if (size > 0)
            {
                while ( --size > -1 )
                {
                    if ( datas[size][propName] === value )
                    {
                        return datas[size] ;
                    }
                }
            }
        }
        catch( er )
        {
            //
        }
        return null ;
    }},

    /**
     * Returns <code>true</code> if the model contains the specified entry.
     * @param {system.data.Identifiable} entry - The entry reference to verify.
     * @return <code>true</code> if the model contains the specified entry.
     * @name has
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    has : { value : function( entry )
    {
        return this._map.hasValue( entry ) ;
    }},

    /**
     * Returns <code>true</code> if the model contains the specified attribute value.
     * @return <code>true</code> if the model contains the specified key in argument
     * @name hasByProperty
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    hasByProperty : { value : function( propName , value )
    {
        if ( propName === null || !(propName instanceof String || typeof(propName) === 'string') )
        {
            return false ;
        }
        var datas = this._map.values() ;
        var size  = datas.length ;
        if (size > 0)
        {
            while ( --size > -1 )
            {
                if ( datas[size][propName] === value )
                {
                    return true ;
                }
            }
        }
        return false ;
    }},

    /**
     * Returns <code>true</code> if the model contains the specified id key in argument.
     * @return <code>true</code> if the model contains the specified id key in argument
     * @name hasKey
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    hasKey : { value : function( key )
    {
        return this._map.has( key ) ;
    }},

    /**
     * Returns <code>true</code> if this model is empty.
     * @return <code>true</code> if this model is empty.
     * @name isEmpty
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    isEmpty : { value : function()
    {
        return this._map.isEmpty() ;
    }},

    /**
     * Returns the iterator of this model.
     * @return the iterator of this model.
     * @name iterator
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    iterator : { value : function()
    {
        return this._map.iterator() ;
    }},

    /**
     * Returns the keys iterator of this model.
     * @return the keys iterator of this model.
     * @name keyIterator
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    keyIterator : { value : function()
    {
        return this._map.keyIterator() ;
    }},

    /**
     * Notify a signal when a new entry is inserted in the model.
     * @name notifyAdd
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    notifyAdd : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.added.emit( entry , this ) ;
        }
    }},

    /**
     * Notify a signal when a new entry is removed in the model.
     * @name notifyRemove
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    notifyRemove : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.removed.emit( entry , this ) ;
        }
    }},

    /**
     * Notify a signal when a new entry is updated in the model.
     * @name notifyUpdate
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    notifyUpdate : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.updated.emit( entry , this ) ;
        }
    }},

    /**
     * Removes an entry in the model.
     * @name remove
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    remove : { value : function( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " remove method failed, the entry passed in argument not must be null.") ;
        }
        if ( this._primaryKey in entry )
        {
            if ( this._map.has( entry[this._primaryKey] ) )
            {
                this._map.delete( entry[this._primaryKey] ) ;
                this.notifyRemove( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " remove method failed, no entry register in the model with the specified primary key.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " remove method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},

    /**
     * Enforce to set the internal KeyValuePair collection of this model (default use a new Array instance). This method change the model without notification.
     * @name setMap
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     * @param {system.data.KeyValuePair} map - The map reference to initialize this model.
     */
    setMap : { value : function( map )
    {
        this._map = (map instanceof KeyValuePair) ? map : new ArrayMap() ;
    }},

    /**
     * Update an entry in the model.
     * @param {system.data.Identifiable} entry - The new value to insert in the model with a specific id.
     * @name update
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    update : { value : function( entry )
    {
        if ( this._primaryKey in entry )
        {
            if ( this._map.has( entry[this._primaryKey] ) )
            {
                this._map.set( entry[this._primaryKey] , entry ) ;
                this.notifyUpdate( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " update method failed, no entry register in the model with the specified primary key.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " update method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},

    /**
     * Returns the internal {@link system.data.KeyValuePair|KeyValuePair} (map) representation of this model.
     * @return The internal  {@link system.data.KeyValuePair|KeyValuePair} (map) representation of this model.
     * @name update
     * @memberof system.models.maps.MapModel
     * @instance
     * @function
     */
    toMap : { value : function()
    {
        return this._map ;
    }}
}) ;