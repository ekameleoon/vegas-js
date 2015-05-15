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
 * Wraps the function in another, locking its execution scope to an object specified by the specified first argument.
 * <pre>
 * var action = function()
 * {
 *     trace( this + " :: " + core.dump(Array.fromArguments(arguments)) ) ;
 * }
 * 
 * var proxy ;
 * 
 * var scope = {} ;
 * scope.toString = function()
 * {
 *     return "scope" ;
 * }
 * 
 * action( 1 , 2 , 3 ) ; // [object global] :: [1,2,3]
 * 
 * proxy = action.bind( scope ) ;
 * proxy( 1 , 2 , 3 ) ; //  scope :: [1,2,3]
 * 
 * proxy = action.bind( scope , 4, 5, 6) ;
 * proxy( 1 , 2 , 3 ) ; //  scope :: [4,5,6,1,2,3]
 * </pre>
 */
if ( Function.prototype.bind == undefined )
{
    Function.prototype.bind = function( o )
    {
        var self      = this ;
        var boundArgs = arguments ;
        return function()
        {
            var i ;
            var l ;
            
            var args = [] ;
            
            l = boundArgs.length ;
            for( i = 1 ; i<l ; i++ )
            {
                args.push( boundArgs[i] ) ;
            }
            
            l = arguments.length ;
            for( i = 0 ; i<l ; i++ )
            {
                args.push( arguments[i] ) ;
            }
            
            return self.apply( o , args ) ;
        }
    }
}

/**
 * This function apply an inherit of the current constructor with the constructor passed in argument.
 * <p><b>Example :</b></p>
 * {@code
 * 
 * ConstructorA = function (a) 
 * {
 *     this.a = a ;
 * }
 * 
 * ConstructorA.prototype.methodA = function () 
 * {
 *     trace ("methodA") ;
 * }
 * 
 * ConstructorA.prototype.toString = function () 
 * {
 *     return "{" + this.a + "}" ;
 * }
 * 
 * ConstructorB = function (a, b) 
 * {
 *     this.__constructor__.call(this, a) ; // super
 *     this.b = b ;
 * }
 * 
 * proto = ConstructorB.extend(ConstructorA) ;
 * 
 * ConstructorB.prototype.toString = function () 
 * {
 *     return "{" + this.a + "," + this.b + "}" ;
 * }
 * 
 * }
 * @param superConstructor the function to extend the current constructor.
 * @return the prototype of the constructor.
 */
Function.prototype.extend = function ( superConstructor ) 
{
    if ( typeof(superConstructor) == "function" ) 
    {
        if( this.prototype.__proto__ )
        {
            this.prototype.__proto__ = superConstructor.prototype ;
        }
        else
        {
            this.prototype = new superConstructor() ;
        }
        this.prototype.__constructor__ = superConstructor ;
    }
    setPropFlags(this.prototype, ["__proto__", "__constructor__" ], false , null , null  ) ; 
    return this.prototype ;
}

/**
 * Returns the string representation of the object.
 * @return the string representation of the object.
 */
Function.prototype.toString = function () 
{
    return "[Type Function]" ;
}

// encapsulate

setPropFlags( Function.prototype, ["bind", "extend", "toString" ], false , null , null  ) ;