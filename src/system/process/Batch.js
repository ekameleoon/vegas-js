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
 * A batch is a collection of <code class="prettyprint">Runnable</code> objects. 
 * All <code class="prettyprint">Runnable</code> objects are processed as a single unit.
 */
if ( system.process.Batch == undefined) 
{
    /**
     * Creates a new Batch instance.
     * @param init The optional Array of Runnable objects to fill the batch.
     */
    system.process.Batch = function ( init /*Array*/ ) 
    { 
        this._a = [] ;
        if ( init instanceof Array && init.length > 0 )
        {
            var l /*int*/ = init.length ;
            for( var i /*int*/ = 0 ; i<l ; i++ )
            {
                if ( init[i] instanceof system.process.Runnable )
                {
                    this.add( init[i] ) ;
                }
            }
        }
    }
    
    /**
     * @extends system.process.Runnable
     */
    proto = system.process.Batch.extend( system.process.Runnable ) ;
    
    /**
     * Adds the specified Runnable object in batch.
     */
    proto.add = function( command /*Runnable*/ ) /*Boolean*/ 
    {
        if ( command == null )
        {
            return false ;
        }
        if ( command instanceof system.process.Runnable )
        {
            this._a.push( command ) ;
            return true ;
        }
        return false ;
    }
    
    /**
     * Removes all of the elements from this batch.
     */
    proto.clear = function() /*void*/ 
    {
        this._a.length = 0 ;
    }
    
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    proto.clone = function()
    {
        var b = new system.process.Batch() ;
        var l = this._a.length ;
        for( var i = 0 ; i < l ; i++ )
        {
            b.add( this._a[i] ) ;
        }
        return b ;
    }
    
    /**
     * Returns {@code true} if this batch contains the specified element.
     * @return {@code true} if this batch contains the specified element.
     */
    proto.contains = function( command /*Runnable*/ ) /*Boolean*/ 
    {
        if ( command instanceof system.process.Runnable )
        {
            var l = this._a.length ;
            while( --l > -1 )
            {
                if ( this._a[l] == command )
                {
                    return true ;
                }
            }
        }
        return false ;
    }
    
    /**
     * Returns the command from this batch at the passed index.
     * @return the command from this batch at the passed index.
     */
    proto.get = function( key ) 
    {
        return this._a[ key ] ;
    }
    
    /**
     * Returns the position of the passed object in the batch.
     * @param command the Runnable object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the batch.
     */
    proto.indexOf = function( command , fromIndex /*uint*/ ) /*int*/ 
    {
        if ( isNaN( fromIndex ) )
        {
            fromIndex = 0 ;
        }
        fromIndex = ( fromIndex > 0 ) ? Math.round(fromIndex) : 0 ;
        if ( command instanceof system.process.Runnable )
        {
            var l = this._a.length ;
            var i = fromIndex ;
            for( i ; i < l ; i++ )
            {
                if ( this._a[i] == command )
                {
                    return i ;
                }
            }
        }
        return -1 ;
    }
    
    /**
     * Returns {@code true} if this batch contains no elements.
     * @return {@code true} if this batch is empty else {@code false}.
     */
    proto.isEmpty = function () /*Boolean*/ 
    {
        return this._a.length == 0 ;
    }
    
    /**
     * Returns the iterator reference of the object.
     * @return the iterator reference of the object.
     */
    proto.iterator = function() /*Iterator*/ 
    {
        return new system.data.iterators.ArrayIterator( this._a ) ;
    }
    
    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     */
    proto.remove = function ( command /*Runnable*/ ) /*Boolean*/ 
    {
        var index = this.indexOf( command ) ;
        if ( index > -1 )
        {
            this._a.splice( index , 1 ) ;
            return true ;
        }
        return false ;
    }
    
    /**
     * Run the process.
     */
    proto.run = function() /*void*/
    {
        var l = this._a.length ;
        if ( l > 0 ) 
        {
            var i = -1 ;
            while ( ++i < l ) 
            { 
                this._a[i].run() ; 
            }
        }
    }
    
    /**
     * Retrieves the number of elements in this batch.
     * @return the number of elements in this batch.
     */
    proto.size = function () /*Number*/ 
    {
        return this._a.length ;
    }
    
    /**
     * Stops all commands in the batch. 
     */
    proto.stop = function() /*void*/
    {
        var l = this._a.length ;
        if (l > 0) 
        {
            var i = -1 ;
            var s ;
            while (++i < l) 
            {
                s = this._a[i] ;
                if ( ( "stop" in s ) && ( s["stop"] instanceof Function ) )
                {
                    this._a[i].stop() ;
                }
            } 
        }
    }
    
    /**
     * Returns an array containing all of the elements in this batch.
     * @return an array containing all of the elements in this batch.
     */
    proto.toArray = function () /*Array*/ 
    {
        return this._a ;
    }
    
    /**
     * Returns the source code string representation of the object.
     * @return the source code string representation of the object.
     */
    proto.toSource = function () /*Array*/ 
    {
        var ar /*Array*/ = this.toArray() ;
        var source /*String*/ = "new " + this.getConstructorPath() ;
        source += "(" ;
        if ( ar.length > 0 )
        {
            source += core.dump( ar ) ;
        } 
        source += ")" ;
        return source ;
    }
    
    /**
     * Returns the source code string representation of the object.
     * @return the source code string representation of the object.
     */
    proto.toString = function () /*Array*/ 
    {
        var r = "{";
        if ( this._a.length > 0 ) 
        {
            var l /*int*/    = this._a.length   ;
            for ( var i /*int*/ = 0 ; i < l ; i++ ) 
            {
                r += this._a[i] ;
                if (i < (l-1)) 
                {
                    r += "," ;
                }
            }
        }
        r += "}";
        return r ;
    }
    
    // encapsulate
    
    delete proto ;
}