"use strict" ;

import { ArrayMap } from '../data/maps/ArrayMap.js' ;
import { Task } from '../process/Task.js' ;

import { ObjectDefinition } from './ObjectDefinition.js' ;

/**
 * Creates a container to register all the Object define by the corresponding IObjectDefinition objects.
 */
export function ObjectDefinitionContainer()
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        /**
         * Indicates the numbers of object definitions registered in the container.
         */
        numObjectDefinition : { get : function() { return this._map.length ; } } ,

        /**
         * Registers a new object definition in the container.
         * @param definition The Identifiable ObjectDefinition reference to register in the container.
         * @throws ArgumentError If the specified object definition is null or if this id attribut is null.
         */
        addObjectDefinition :
        {
            value : function( definition )
            {
                if ( definition instanceof ObjectDefinition )
                {
                    this._map.set( definition.id , definition ) ;
                }
                else
                {
                    throw new ReferenceError( this + " addObjectDefinition failed, the specified object definition must be an ObjectDefinition object." ) ;
                }
            }
        },

        /**
         * Removes all the object definitions register in the container.
         */
        clearObjectDefinition :
        {
            value : function()
            {
                this._map.clear() ;
            }
        },

        /**
         * Returns a shallow copy of this object.
         * @return a shallow copy of this object.
         */
        clone :
        {
            value : function()
            {
                return new ObjectDefinitionContainer() ;
            }
        },

        /**
         * Returns the IObjectDefinition object register in the container with the specified id.
         * @param id the id name of the ObjectDefinition to return.
         * @return the IObjectDefinition object register in the container with the specified id.
         * @throws ArgumentError If the specified object definition don't exist in the container.
         */
        getObjectDefinition :
        {
            value : function( id ) /*ObjectDefinition*/
            {
                if ( this.has( id ) )
                {
                    return this._map.get( id ) ;
                }
                else
                {
                    throw new ReferenceError( this + " getObjectDefinition failed, the specified object definition don't exist : " + id ) ;
                }
            }
        },

        /**
         * Returns <code class="prettyprint">true</code> if the object defines with the specified id is register in the container.
         * @param id The id of the ObjectDefinition to search.
         * @return <code class="prettyprint">true</code> if the object defines with the specified id is register in the container.
         */
        has :
        {
            value : function( id ) /*Boolean*/
            {
                return this._map.has( id ) ;
            }
        },

        /**
         * Unregisters an object definition in the container.
         * @param id The id of the object definition to remove.
         * @throws ArgumentError If the specified object definition don't exist in the container.
         */
        removeObjectDefinition :
        {
            value : function( id )
            {
                if ( this.has( id ) )
                {
                    this._map.delete( id ) ;
                }
                else
                {
                    throw new ReferenceError( this + " removeObjectDefinition failed, the specified object definition don't exist : " + id ) ;
                }
            }
        },

        /**
         * @private
         */
        _map : { value : new ArrayMap() }
    });
}

/**
 * @extends Object
 */
ObjectDefinitionContainer.prototype = Object.create( Task.prototype ,
{
    constructor : { value : ObjectDefinitionContainer , writable : true } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ObjectDefinitionContainer]' ; } , writable : true }
});