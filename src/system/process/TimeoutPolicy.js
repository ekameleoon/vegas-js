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
 * Defines the policy of the timeout states in the application.
 */
if ( system.process.TimeoutPolicy == undefined ) 
{
    /**
     * @requires system.Enum
     */
    require( "system.Enum" ) ;
    
    /**
     * Creates a new TimeoutPolicy instance.
     * @param value The value of the enumeration.
     * @param name The name key of the enumeration.
     */
    system.process.TimeoutPolicy = function ( value /*int*/ , name /*String*/ ) 
    {
        system.Enum.call( this , value , name ) ;
    }
    
    /**
     * @extends system.Enum
     */
    proto = system.process.TimeoutPolicy.extend( system.Enum ) ;
    
    /**
     * Compares the specified object with this object for equality.
     * @return <code class="prettyprint">true</code> if the the specified object is equal with this object.
     */
    proto.equals = function ( o ) /*Boolean*/ 
    {
        if ( o == this )
        {
            return true ;
        }
        else if ( o instanceof system.process.TimeoutPolicy )
        {
            return ( o._name == this._name ) && ( o._value == this._value) ;
        }
        else
        {
            return false ;
        }
    }
    
    //////////////
    
    delete proto ;
    
    //////////////
    
    /**
     * Designates the infinity timeout policy (0).
     */
    system.process.TimeoutPolicy.INFINITY /*TimeoutPolicy*/ = new system.process.TimeoutPolicy( 0 , "INFINITY" ) ;
    
    /**
     * Designates the limited timeout policy (1).
     */
    system.process.TimeoutPolicy.LIMIT /*TimeoutPolicy*/ = new system.process.TimeoutPolicy( 1 , "LIMIT" ) ;
}