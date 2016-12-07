"use strict" ;

import { ChangeModel } from "./ChangeModel.js" ;
import { NoSuchElementError }  from "../errors/NoSuchElementError.js" ;

/**
 * This model can keep an object in memory and emit messages if this object is changing.
 * @name MemoryModel
 * @class
 * @memberof system.models
 * @extends system.models.ChangeModel
 * @example
 * var beforeChanged = function( value , model )
 * {
 *     trace( "[-] before:" + value + " current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * var changed = function( value , model )
 * {
 *     trace( "[+] change:" + value + " current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * var cleared = function( model )
 * {
 *     trace( "[x] clear current:" + model.current + " size:" + model.size ) ;
 * }
 *
 * var model = new MemoryModel();
 *
 * model.beforeChanged.connect( beforeChanged ) ;
 * model.changed.connect( changed ) ;
 * model.cleared.connect( cleared ) ;
 *
 * trace( "-- history" ) ;
 *
 * model.current = "home" ;
 * model.current = "near" ;
 * model.current = "search" ;
 * model.current = "place" ;
 * model.current = "events" ;
 * model.current = "map" ;
 * model.current = "test" ;
 *
 * trace( "-- back" ) ;
 *
 * trace( "back() : " + model.back() ) ;
 *
 * trace( "-- backTo(3)" ) ;
 *
 * trace( "backTo(3) : " + model.backTo( 3 ) ) ;
 *
 * trace( "-- home" ) ;
 *
 * trace( 'home() : ' + model.home() ) ;
 *
 * trace( "--" ) ;
 *
 * model.clear() ;
 */
export function MemoryModel()
{
    ChangeModel.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Indicates if the model throws errors.
         * @name enableErrorChecking
         * @memberof system.models.MemoryModel
         * @instance
         * @type boolean
         * @default false
         */
        enableErrorChecking : { writable : true , value : false } ,

        /**
         * @private
         */
        header : { value : new MemoryEntry() , writable : true } ,

        /**
         * @private
         */
        _reduced : { value : false , writable : true } ,

        /**
         * @private
         */
        size : { value : 0 , writable : true }
    });

    this.header.next = this.header.previous = this.header ;
}

MemoryModel.prototype = Object.create( ChangeModel.prototype ,
{
    constructor : { writable : true , value : MemoryModel } ,

    /**
     * Determinates the selected value in this model.
     * @name current
     * @memberof system.models.MemoryModel
     * @instance
     */
    current :
    {
        get : function()
        {
            return this._current ;
        },
        set : function( o )
        {
            if ( o === this._current && this.security )
            {
                return ;
            }

            if( o )
            {
                this.validate( o ) ;
            }

            if ( this._current )
            {
                this.notifyBeforeChange( this._current ) ;
            }

            this._current = o ;

            if( this._current )
            {
                this.add( this._current ) ;
                this.notifyChange( this._current );
            }
        }
    },

    /**
     * Indicates the number of elements in memory model.
     * @name length
     * @memberof system.models.MemoryModel
     * @instance
     * @readonly
     */
    length : { get : function() { return this.size ; } },

    /**
     * Indicates in the beforeChange signal if the model is reduced (use the back or the backTo method).
     * This property is true only before the change of the new position in the model.
     * @name reduced
     * @memberof system.models.MemoryModel
     * @instance
     * @readonly
     */
    reduced : { get : function() { return this._reduced ; } } ,

    /**
     * Go back in the memory and removes the last element in the memory model.
     * @return The last removed element in the memory.
     * @name back
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    back : { value : function()
    {
        const old = this.last() ;

        if ( old )
        {
            this._reduced = true ;
            this.notifyBeforeChange( old ) ;
            this._reduced = false ;
        }

        this.removeLast() ;

        this._current = this.last() ;

        if( this._current )
        {
            this.notifyChange( this._current );
        }

        return old ;
    }},

    /**
     * Go back in the memory and removes the all the element in the memory model to a specific position.
     * @param {number} [pos=1] - The position to back in memory.
     * @return The last removed element in the memory.
     * @name backTo
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    backTo : { value : function( pos = 1 )
    {
        if( pos < 1 )
        {
            pos = 1 ;
        }
        if( this.size > 1 )
        {
            if( pos < this.size )
            {
                this._reduced = true ;

                var old = this.last() ;

                if ( old )
                {
                    this.notifyBeforeChange( old ) ;
                }

                while( pos !== this.size )
                {
                    this.removeLast() ;
                }

                this._reduced = false ;

                this._current = this.last() ;

                if ( this._current )
                {
                    this.notifyChange( this._current );
                }

                return old ;
            }
            else
            {
                if( this.enableErrorChecking )
                {
                    throw new RangeError( this + " backTo failed, the passed-in index '" + pos + "' is out of bounds (" + this.size + "." ) ;
                }
                else
                {
                    return null ;
                }
            }
        }
        else
        {
            if( this.enableErrorChecking )
            {
                throw new NoSuchElementError( this + " backTo failed, the length of the memory model must be greater than 1 element.");
            }
            else
            {
                return null ;
            }
        }
    }},

    /**
     * Clear the model.
     * @name clear
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    clear : { value : function()
    {
        if( this.size > 0 )
        {
            var e = this.header.next;
            var next ;
            while ( e !== this.header )
            {
                next = e.next ;
                e.next = e.previous = null ;
                e.element = null ;
                e = next ;
            }
            this.header.next = this.header.previous = this.header ;
            this.size = 0 ;
        }
        ChangeModel.prototype.clear.call(this) ;
    }},

    /**
     * Returns the first element in memory.
     * @return the first element in this list.
     * @throws NoSuchElementError if this list is empty.
     * @name first
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    first : { value : function()
    {
        if( this.size > 0 )
        {
            return this.header.next.element ;
        }
        else
        {
            if( this.enableErrorChecking )
            {
                throw new NoSuchElementError( this + " first method failed, the memory is empty.") ;
            }
            else
            {
                return null ;
            }
        }
    }},

    /**
     * Go home, select the first element in the memory and remove all other elements. This method work only if the memory length is greater than <code>1</code>.
     * @return The last removed element in the memory.
     * @name home
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    home : { value : function()
    {
        if( this.size > 1 )
        {
            var old = this.header.previous.element ;

            if ( old )
            {
                this.notifyBeforeChange( old ) ;
            }

            var top = this.header.next ;

            while( this.header.previous !== top )
            {
                this.removeEntry( this.header.previous ) ;
            }

            this._current = this.last() ;

            if ( this._current )
            {
                this.notifyChange( this._current );
            }

            return old ;
        }
        else
        {
            if( this.enableErrorChecking )
            {
                throw new NoSuchElementError( this + " home failed, the length of the memory model must be greater than 1 element.");
            }
            else
            {
                return null ;
            }
        }
    }},

    /**
     * Returns <code>true</code> if this memory model is empty.
     * @return <code>true</code> if this memory model is empty.
     * @name isEmpty
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    isEmpty : { value : function()
    {
        return this.size === 0 ;
    }} ,

    /**
     * Returns the last element in memory.
     * @return the last element in this list.
     * @throws NoSuchElementError if this list is empty.
     * @name last
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    last : { value : function()
    {
        if ( this.size > 0 )
        {
            return this.header.previous.element ;
        }
        else
        {
            if( this.enableErrorChecking )
            {
                throw new NoSuchElementError( this + " last method failed, the memory is empty." ) ;
            }
            else
            {
                return null ;
            }
        }
    }},

    // ------- protected

    /**
     * Appends the specified element to the end of this list.
     * @param {*} element - The element to be appended to this list.
     * @name add
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     * @private
     */
    add : { value : function( element )
    {
        this.addBefore( element , this.header ) ;
        return element ;
    }} ,

    /**
     * Inserts the given element in the memory before the given entry.
     * @name addBefore
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     * @param {*} element - The element to insert.
     * @param {*} entry - The entry to target.
     * @private
     */
    addBefore : { value : function( element , entry )
    {
        var e = new MemoryEntry( element, entry, entry.previous ) ;
        e.previous.next = e ;
        e.next.previous = e ;
        this.size++ ;
        return e ;
    }},

    /**
     * Removes a specific entry in memory.
     * @private
     * @name removeEntry
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     */
    removeEntry : { value : function( entry )
    {
        if ( entry === this.header )
        {
            if( this.enableErrorChecking )
            {
                throw new NoSuchElementError( this + " removeEntry failed." );
            }
            else
            {
                return null ;
            }
        }

        var result = entry.element ;

        entry.previous.next = entry.next ;
        entry.next.previous = entry.previous ;
        entry.next = entry.previous = null ;
        entry.element = null ;

        this.size-- ;

        return result ;
    }},

    /**
     * Removes and returns the last element from this list.
     * @return The last removed element from this list.
     * @name removeLast
     * @memberof system.models.MemoryModel
     * @instance
     * @function
     * @private
     */
    removeLast : { value : function()
    {
        return this.removeEntry( this.header.previous );
    }}
}) ;

// internal

/**
 * Internal class in the <code>MemoryModel</code> class to defined all entries in the internal memory and the links betweens alls.
 * @name MemoryEntry
 * @class
 * @memberof system.models
 * @private
 */
function MemoryEntry( element = null , next /*MemoryEntry*/ = null , previous /*MemoryEntry*/ = null )
{
    /**
     * The element of this entry.
     * @memberof system.models.MemoryModel
     */
    this.element = element ;

    /**
     * The next entry.
     * @memberof system.models.MemoryModel
     */
    this.next = next ;

    /**
     * The previous entry.
     * @memberof system.models.MemoryModel
     */
    this.previous = previous ;
}
