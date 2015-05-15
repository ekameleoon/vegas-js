/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * An iterator page by page over an array who return an new array of elements.
 * If the step size value is {@code 1} the next and previous methods returns the single value element in the data array.
 * <p><b>Example :</b></p>
 * {@code
 * var ar = [1, 2, 3, 4, 5, 6, 7, 8] ;
 * 
 * var it = new system.data.iterators.PageByPageIterator( ar , 2 ) ;
 *
 * var next = function()
 * {
 *     if ( !it.hasNext() )
 *     {
 *         it.reset() ;
 *     }
 *     var next = it.next()
 *     trace( "> " + next + " : " + it.currentPage() ) ;
 * }
 * 
 * var prev = function()
 * {
 *     if ( !it.hasPrevious() )
 *     {
 *         it.lastPage() ;
 *     }
 *     var prev = it.previous() ;
 *     trace( "> " + prev + " : " + it.currentPage() ) ;
 * }
 * 
 * next() ; // > 1,2 : 1
 * next() ; // > 3,4 : 2
 * next() ; // > 5,6 : 3
 * next() ; // > 7,8 : 4
 * next() ; // > 1,2 : 1
 * prev() ; // > 7,8 : 4
 * 
 * }
 */
if (system.data.iterators.PageByPageIterator == undefined) 
{
    /**
     * Creates a new PageByPageIterator.
     * @param data the array to enumerate.
     * @param stepSize the step size value.
     * @throws Error if the data array is null or empty.
     */
    system.data.iterators.PageByPageIterator = function ( data  /*Array*/ , stepSize /*Number*/  ) 
    { 
        if ( data == null ) 
        {
            throw new Error( "PageByPageIterator constructor failed, data argument not must be null." ) ;
        }
        else if ( data.length == 0 ) 
        {
            throw new Error( "PageByPageIterator constructor failed, data argument not must be empty." ) ;
        }
        else
        {
            var len /*Number*/ = data.length ;
            this._data = data ;
            this._key = 0 ;
            this._currentPage = 0 ;
            this._step = (stepSize > 1) ? stepSize : system.data.iterators.PageByPageIterator.DEFAULT_STEP ; 
            this._pageCount =  Math.ceil( len / this._step ) ;
        }
    }
    
    /**
     * The default step value in all the PageByPageIterators.
     */
    system.data.iterators.PageByPageIterator.DEFAULT_STEP /*Number*/ = 1 ;
    
    /**
     * @extends system.dat.OrderedIterator
     */
    proto = system.data.iterators.PageByPageIterator.extend( system.data.OrderedIterator  ) ;
        
    /**
     * Returns the current value.
     * @return the current value.
     */
    proto.current = function()
    {
        return this._current ;
    }
    
    /**
     * Returns the current page value.
     * @return the number of the current page.
     */
    proto.currentPage = function () /*Number*/ 
    {
        return this._currentPage ;
    }
    
    /**
     * Seek the iterator in the first page of this object.
     */
    proto.firstPage = function () /*void*/ 
    {
        return this.seek(1) ;
    }
    
    /**
     * Returns the step size of this PageByPageIterator.
     * @return the step size of this PageByPageIterator.
     */
    proto.getStepSize = function() /*Number*/
    {
        return this._step ;
    }
    
    /**
     * Returns {@code true} if the iteration has more elements.
     * @return {@code true} if the iterator has more elements.
     */
    proto.hasNext = function () 
    {
        return this._key < this._pageCount ;
    }
    
    /**
     * Checks to see if there is a previous element that can be iterated to.
     * @return {@code true} if the iterator has more elements.
     */
    proto.hasPrevious = function () 
    {
        return this._key > 1 ;
    }
    
    /**
     * Returns the current page number.
     * @return the current page number.
     */
    proto.key = function() 
    {
        return this._currentPage ;
    }
    
    /**
     * Seek the iterator in the last page of this object.
     */
    proto.lastPage = function() /*void*/
    {
        this.seek( this._pageCount ) ;
    }
    
    /**
     * Returns the next Array page of elements or the next element in the Array if the getStepSize() value is 1.
     * @return the next Array page of elements or the next element in the Array if the getStepSize() value is 1.
     */
    proto.next = function () 
    {
        var index /*Number*/ = this._step * this._key++ ;
        this._currentPage = this._key ;
        if ( this._step > 1 )
        {
            this._current = this._data.slice( index, index + this._step ) ;
        }
        else
        {
            this._current = this._data[ index ] ;
        }
        return this._current ;
    }
    
    /**
     * Returns the numbers of page of this iterator.
     * @return the numbers of page of this iterator.
     */
    proto.pageCount = function() 
    {
        return this._pageCount ;
    }
    
    /**
     * Returns the previous Array page of elements or the previous element in the Array if the getStepSize() value is 1.
     * @return the previous element from the collection.
     */
    proto.previous = function () 
    {
        this._currentPage -- ;
        this._key -- ;
        var index /*Number*/ = this._step * ( this._key - 1 ) ;
        if (this._step > 1)
        {
            this._current = this._data.slice(index, index + this._step) ;
        }
        else
        {
            this._current = this._data[ index ] ;
        }
        return this._current ;
    }
    
    /**
     * Unsupported operation in a PageByPageIterator.
     * @throws Error the method remove() in this iterator is unsupported. 
     */
    proto.remove = function() 
    {
        throw new Error( "The PageByPageIterator remove method is unsupported." ) ;
    }
    
    /**
     * Resets the key pointer of the iterator.
     */
    proto.reset = function() 
    {
        this._key = 0 ;
        this._currentPage = 0 ;
        this._current = undefined ;
    }
    
    /**
     * Seek the key pointer of the iterator.
     */
    proto.seek = function ( position ) 
    {
        this._key = Math.max( Math.min( position++ , this._pageCount + 1 ) , 0 ) ;
        this._currentPage = this._key ;
        var index = this._step * ( this._key - 1 ) ;
        if (this._step > 1)
        {
            this._current = this._data.slice( index , index + this._step ) ;
        }
        else
        {
            this._current = this._data[ index ] ;
        }
    }
    
    /////////// encapsulate
    
    delete proto ;
}