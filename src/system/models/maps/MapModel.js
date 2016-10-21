"use strict" ;

import { ArrayMap }     from "../../data/maps/ArrayMap.js" ;
import { ChangeModel }  from "../ChangeModel.js" ;
import { KeyValuePair } from "../../data/KeyValuePair.js" ;
import { Signal }       from "../../signals/Signal.js" ;

/**
 * This model use an internal <code>KeyValuePair</code> map to register objects.
 * @example
 * <pre>
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
 * </pre>
 */
export function MapModel( factory = null , key = "id" )
{
    ChangeModel.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Emits a message when an entry is added in the model.
         */
        added : { value : new Signal() } ,

        /**
         * Emits a message when an entry is removed in the model.
         */
        removed : { value : new Signal() } ,

        /**
         * Emits a message when an entry is updated in the model.
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
 */
Object.defineProperty( MapModel , 'DEFAULT_PRIMARY_KEY' , { value : "id" } ) ;

/**
 * @extends ChangeModel
 */
MapModel.prototype = Object.create( ChangeModel.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : MapModel } ,

    /**
     * Indicates the number of elements register in the model.
     */
    length : { get : function() { return this._map.length ; } },

    /**
     * Indicates the name of the primary key used to map all objects in the model and identifies each record in the table.
     * By default the model use the "id" primary key in the objects.
     * <p><b>Note:</b> If you use this property and if the model contains entries, all entries will be removing.</p>
     * @see MapModel.DEFAULT_PRIMARY_KEY
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
     */
    clear : { value : function()
    {
        this._map.clear() ;
        ChangeModel.prototype.clear.call(this) ;
    }},

    /**
     * Returns the entry defined by the key passed-in argument.
     * @return the entry defined by the key passed-in argument.
     */
    get : { value : function( key )
    {
        return this._map.get( key );
    }},

    /**
     * Returns an entry defines in the model with the specified member.
     * @return an entry defines in the model with the specified member.
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
     * @param entry The entry reference to verify.
     * @return <code>true</code> if the model contains the specified entry.
     */
    has : { value : function( entry )
    {
        return this._map.hasValue( entry ) ;
    }},

    /**
     * Returns <code>true</code> if the model contains the specified attribute value.
     * @return <code>true</code> if the model contains the specified key in argument
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
     * Returns <code class="prettyprint">true</code> if the model contains the specified id key in argument.
     * @return <code class="prettyprint">true</code> if the model contains the specified id key in argument
     */
    hasKey : { value : function( key )
    {
        return this._map.has( key ) ;
    }},

    /**
     * Returns <code class="prettyprint">true</code> if this model is empty.
     * @return <code class="prettyprint">true</code> if this model is empty.
     */
    isEmpty : { value : function()
    {
        return this._map.isEmpty() ;
    }},

    /**
     * Returns the iterator of this model.
     * @return the iterator of this model.
     */
    iterator : { value : function()
    {
        return this._map.iterator() ;
    }},

    /**
     * Returns the keys iterator of this model.
     * @return the keys iterator of this model.
     */
    keyIterator : { value : function()
    {
        return this._map.keyIterator() ;
    }},

    /**
     * Notify a signal when a new entry is inserted in the model.
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
     */
    setMap : { value : function( map )
    {
        this._map = (map instanceof KeyValuePair) ? map : new ArrayMap() ;
    }},

    /**
     * Update an entry in the model.
     * @param entry the new value to insert in the model.
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
     * Returns the internal KeyValuePair (map) representation of this model.
     * @return the internal KeyValuePair (map) representation of this model.
     */
    toMap : { value : function()
    {
        return this._map ;
    }}
}) ;