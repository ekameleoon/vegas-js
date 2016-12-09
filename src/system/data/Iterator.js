/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is an {@link system.data.Iterator|Iterator}.
 * @name isIterator
 * @memberof system.data
 * @function
 * @param {object} target - The target object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.Iterator|Iterator}.
 */
export function isIterator( target )
{
    if( target )
    {
        return (target instanceof Iterator) ||
               (
                    /*jshint -W069 */
                    (Boolean(target['delete'])  && (target.delete  instanceof Function)) &&
                    (Boolean(target['hasNext']) && (target.hasNext instanceof Function)) &&
                    (Boolean(target['key'])     && (target.key     instanceof Function)) &&
                    (Boolean(target['next'])    && (target.next    instanceof Function)) &&
                    (Boolean(target['reset'])   && (target.reset   instanceof Function)) &&
                    (Boolean(target['seek'])    && (target.seek    instanceof Function))
                    /*jshint +W069 */
                );
    }
    return false ;
}

/**
 * This interface defines the iterator pattern over a collection.
 * <p><b>Implementors:</b>
 * <ul>
 * <li>{@link system.data.iterators.ArrayIterator|ArrayIterator}</li>
 * <li>{@link system.data.iterators.MapIterator|MapIterator}</li>
 * </ul>
 * </p>
 * @name Iterator
 * @interface
 * @memberof system.data
 */
export function Iterator() {}

Iterator.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Iterator } ,

    /**
     * Deletes from the underlying collection the last element returned by the iterator (optional operation).
     * @name delete
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    delete : { writable : true , value : function() {} } ,

    /**
     * Returns <code>true</code> if the iteration has more elements.
     * @return <code>true</code> if the iteration has more elements.
     * @name hasNext
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    hasNext : { writable : true , value : function() {} } ,

    /**
     * Returns the current key of the internal pointer of the iterator (optional operation).
     * @return the current key of the internal pointer of the iterator (optional operation).
     * @memberof system.data.Iterator
     * @name key
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    key : { writable : true , value : function() {} } ,

    /**
     * Returns the next element in the iteration.
     * @return the next element in the iteration.
     * @name next
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    next : { writable : true , value : function() {} } ,

    /**
     * Reset the internal pointer of the iterator (optional operation).
     * @memberof system.data.Iterator
     * @name reset
     * @instance
     * @function
     */
    reset : { writable : true , value : function() {} } ,

    /**
     * Changes the position of the internal pointer of the iterator (optional operation).
     * @name seek
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    seek : { writable : true , value : function ( position ) {} } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.data.Iterator
     * @instance
     * @function
     */
    toString :
    {
        writable : true , value : function ()
        {
            if( !('__clazzname__' in this.constructor) )
            {
                Object.defineProperty( this.constructor , '__clazzname__' , { value : this.constructor.name } ) ;
            }
            return '[' + this.constructor.__clazzname__ + ']' ;
        }
    }
}) ;
