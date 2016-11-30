"use strict" ;

import { ArrayMap } from '../data/maps/ArrayMap.js' ;
import { Task } from '../process/Task.js' ;

import { ObjectDefinition } from './ObjectDefinition.js' ;

/**
 * Creates a container to register all the Object define by the corresponding {@link system.ioc.ObjectDefinition|ObjectDefinition} objects.
 * @name ObjectDefinitionContainer
 * @class
 * @memberof system.ioc
 * @extends system.process.Task
 */
export function ObjectDefinitionContainer()
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        _map : { value : new ArrayMap() , writable : true }
    });
}

ObjectDefinitionContainer.prototype = Object.create( Task.prototype ,
{
    constructor : { value : ObjectDefinitionContainer , writable : true } ,

    /**
     * Indicates the numbers of object definitions registered in the container.
     * @name numObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @readonly
     * @instance
     */
    numObjectDefinition : { get : function() { return this._map.length ; } } ,

    /**
     * Registers a new object definition in the container.
     * @param definition The Identifiable ObjectDefinition reference to register in the container.
     * @throws ArgumentError If the specified object definition is null or if this id attribut is null.
     * @name addObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
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
     * @name clearObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
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
     * @name clone
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
     */
    clone :
    {
        value : function()
        {
            return new ObjectDefinitionContainer() ;
        }
    },

    /**
     * Returns the ObjectDefinition object register in the container with the specified id.
     * @param {string} id - The id name of the ObjectDefinition to return.
     * @return the ObjectDefinition object register in the container with the specified id.
     * @throws ArgumentError If the specified object definition don't exist in the container.
     * @name getObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
     */
    getObjectDefinition :
    {
        value : function( id ) /*ObjectDefinition*/
        {
            if ( this._map.has( id ) )
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
     * Returns <code>true</code> if the object defines with the specified id is register in the container.
     * @param {string} id - The id of the ObjectDefinition to search.
     * @return <code>true</code> if the object defines with the specified id is register in the container.
     * @name hasObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
     */
    hasObjectDefinition :
    {
        value : function( id )
        {
            return this._map.has( id ) ;
        }
    },

    /**
     * Unregisters an object definition in the container.
     * @param id The id of the object definition to remove.
     * @throws ArgumentError If the specified object definition don't exist in the container.
     * @name removeObjectDefinition
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
     */
    removeObjectDefinition :
    {
        value : function( id )
        {
            if ( this._map.has( id ) )
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
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof system.ioc.ObjectDefinitionContainer
     * @function
     * @instance
     */
    toString : { value : function() { return '[ObjectDefinitionContainer]' ; } , writable : true }
});